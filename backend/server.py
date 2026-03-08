from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection - require env in production; allow defaults for dev
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME')
if not mongo_url or not db_name:
    if os.environ.get('ENV') == 'production':
        raise SystemExit('MONGO_URL and DB_NAME must be set in production')
    mongo_url = mongo_url or 'mongodb://localhost:27017'
    db_name = db_name or 'adukes_kitchen_db'

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects; default if missing or unparseable
    for check in status_checks:
        if 'timestamp' not in check:
            check['timestamp'] = datetime.now(timezone.utc)
        elif isinstance(check['timestamp'], str):
            try:
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
            except (ValueError, TypeError):
                check['timestamp'] = datetime.now(timezone.utc)
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

# CORS: normalize origins (strip, drop empty); default to allow all if empty
_cors_raw = os.environ.get('CORS_ORIGINS', '*')
_cors_origins = [o.strip() for o in _cors_raw.split(',') if o.strip()]
if not _cors_origins:
    _cors_origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=_cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db_validation():
    """Verify MongoDB is reachable at startup."""
    try:
        await client.admin.command('ping')
    except Exception as e:
        logger.error("MongoDB connection failed at startup: %s", e)
        raise


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()