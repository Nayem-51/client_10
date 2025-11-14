// API Configuration
// For development, use localhost
// For production, use your deployed Vercel API URL

export const API_URL = import.meta.env.VITE_API_URL || 'https://server-10-livid.vercel.app';

export const API_ENDPOINTS = {
  // Auth
  USERS: `${API_URL}/users`,
  LOGIN: `${API_URL}/login`,
  
  // Products
  PRODUCTS: `${API_URL}/products`,
  PRODUCTS_LATEST: `${API_URL}/products/latest`,
  
  // Exports & Imports
  EXPORTS: (email) => `${API_URL}/exports/${email}`,
  IMPORTS: (email) => `${API_URL}/imports/${email}`,
  IMPORT_PRODUCT: `${API_URL}/imports`,
  
  // Single Product
  PRODUCT_BY_ID: (id) => `${API_URL}/products/${id}`,
};

