# Aduke's Kitchen - Integration Contracts

## Current State: Frontend Only with Mock Data

### Mock Data Location
All mock data is currently stored in `/app/frontend/src/mockData.js`

## API Contracts for Future Backend Integration

### 1. Menu Items API

#### GET /api/menu/items
Get all menu items with optional filtering
```json
Query Parameters:
- category: string (optional) - Filter by category
- search: string (optional) - Search in name/description
- popular: boolean (optional) - Filter popular items

Response: 200 OK
[
  {
    "id": "string",
    "name": "string",
    "category": "string",
    "description": "string",
    "price": number,
    "image": "string",
    "sizes": ["string"],
    "popular": boolean
  }
]
```

#### GET /api/menu/items/:id
Get single menu item by ID
```json
Response: 200 OK
{
  "id": "string",
  "name": "string",
  "category": "string",
  "description": "string",
  "price": number,
  "image": "string",
  "sizes": ["string"],
  "popular": boolean
}
```

### 2. Categories API

#### GET /api/categories
Get all categories
```json
Response: 200 OK
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "icon": "string"
  }
]
```

### 3. Orders API (Cart/Checkout)

#### POST /api/orders
Create new order
```json
Request Body:
{
  "customer": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string"
  },
  "items": [
    {
      "itemId": "string",
      "quantity": number,
      "size": "string"
    }
  ],
  "totalAmount": number
}

Response: 201 Created
{
  "orderId": "string",
  "status": "pending",
  "estimatedDelivery": "ISO date string",
  "orderNumber": "string"
}
```

#### GET /api/orders/:id
Get order by ID
```json
Response: 200 OK
{
  "orderId": "string",
  "status": "string",
  "customer": {...},
  "items": [...],
  "totalAmount": number,
  "createdAt": "ISO date string"
}
```

### 4. Contact Form API

#### POST /api/contact
Submit contact form
```json
Request Body:
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string"
}

Response: 200 OK
{
  "success": true,
  "message": "We'll get back to you soon!"
}
```

### 5. Testimonials API

#### GET /api/testimonials
Get all testimonials
```json
Response: 200 OK
[
  {
    "id": "string",
    "name": "string",
    "location": "string",
    "rating": number,
    "text": "string",
    "date": "ISO date string"
  }
]
```

## MongoDB Collections

### 1. menuItems
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  description: String,
  price: Number,
  image: String,
  sizes: [String],
  popular: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. categories
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  icon: String,
  order: Number
}
```

### 3. orders
```javascript
{
  _id: ObjectId,
  orderNumber: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [{
    itemId: ObjectId,
    itemName: String,
    quantity: Number,
    size: String,
    price: Number
  }],
  totalAmount: Number,
  status: String, // pending, confirmed, preparing, delivered, cancelled
  createdAt: Date,
  updatedAt: Date
}
```

### 4. contacts
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  message: String,
  status: String, // new, read, replied
  createdAt: Date
}
```

### 5. testimonials
```javascript
{
  _id: ObjectId,
  name: String,
  location: String,
  rating: Number,
  text: String,
  approved: Boolean,
  createdAt: Date
}
```

## Frontend Components Using Mock Data

### Files to Update for Backend Integration:

1. **Menu.jsx** - Replace mock data with API calls
   - Current: `import { menuItems, categories } from '../mockData'`
   - Change to: `fetch('/api/menu/items')` and `fetch('/api/categories')`

2. **Home.jsx** - Replace mock data with API calls
   - Current: `import { menuItems, categories, testimonials } from '../mockData'`
   - Change to: API calls for popular items and testimonials

3. **Contact.jsx** - Add real form submission
   - Current: Mock toast notification
   - Change to: `POST /api/contact` with actual form data

4. **Cart functionality** (currently non-functional)
   - Implement cart state management (Context API or Redux)
   - Add persistence (localStorage or backend)
   - Connect to checkout flow

## Current Mocked Functionality

⚠️ **The following features are MOCKED and don't persist data:**

1. **Shopping Cart**
   - Add to Cart buttons show toast notifications
   - Cart count remains at 0
   - No actual cart persistence

2. **Contact Form**
   - Form submission shows success message
   - Data is not saved anywhere
   - Form resets after submission

3. **Search & Filter**
   - Works with frontend mock data only
   - Results are filtered client-side

4. **User Authentication**
   - Login/signup buttons present but non-functional
   - No user sessions

## Implementation Steps for Backend

1. **Phase 1: Setup**
   - Create MongoDB models
   - Seed database with mock data
   - Set up API routes

2. **Phase 2: Core Features**
   - Implement menu items CRUD
   - Categories management
   - Contact form handling

3. **Phase 3: E-commerce**
   - Shopping cart backend
   - Order management
   - Payment integration (future)

4. **Phase 4: Admin Panel** (future enhancement)
   - Menu management
   - Order tracking
   - Customer management
   - Testimonials approval

## Notes

- All prices in mock data are in CAD ($)
- Images are using Unsplash URLs (consider hosting own images)
- Phone number format: +1 (437) 410-5630
- Email: akinsolaolufunmilola@gmail.com
- Location: Durham Region, Ontario
- TikTok: https://www.tiktok.com/@adukehkitchen
