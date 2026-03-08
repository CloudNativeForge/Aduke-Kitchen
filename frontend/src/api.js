/**
 * Backend API base URL. Set REACT_APP_BACKEND_URL in .env for production.
 * Use this for all API requests (e.g. fetch(`${API_BASE_URL}/api/...`)).
 */
export const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
