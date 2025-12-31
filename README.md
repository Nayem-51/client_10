# 🌍 Export Hub - Global Trade Management Platform

**Live Site:** [https://exporthub-nayem.web.app/]

**Demo Credentials (If needed):**
- Email: demo@exporthub.com
- Password: Demo123

A modern web platform where users can manage exports, browse global products, and import any product into their personal "My Imports" section with one click. Clean UI, real-time sync, and secure user data.

---

## ✨ Key Features

1. **🔐 Secure Authentication System**
   - Email/password registration and login with robust validation
   - Google Sign-In integration for quick access
   - Password must contain uppercase, lowercase, and minimum 6 characters
   - Protected private routes with automatic redirection to login

2. **📦 Product Management**
   - Browse all products in a responsive 3-column grid layout
   - View detailed product information including price, rating, origin country, and availability
   - Real-time inventory tracking with automatic quantity updates
   - Search functionality to find products by name instantly

3. **🚀 Import/Export Operations**
   - Add products for export with comprehensive form (name, image, price, country, rating, quantity)
   - Import products with quantity validation (prevents over-importing)
   - Manage personal imports and exports in dedicated dashboards
   - Update or delete your exported products with pre-filled modal forms
   - Backend protection prevents deletion of products that others have imported

4. **🎨 Modern & Responsive Design**
   - Beautiful UI with DaisyUI components and Tailwind CSS
   - Fully responsive design for mobile, tablet, and desktop devices
   - Dark mode and light mode toggle with persistent theme preference
   - Smooth animations, hover effects, and professional visual feedback

5. **⚡ Real-Time Sync & User Experience**
   - Toast notifications for all actions (no default alerts)
   - Dynamic page titles for better navigation
   - Loading states for all async operations
   - Image preview on registration
   - Latest 6 products showcase on home page
   - Pagination on All Products page
   - Featured categories and "Why Choose Us" sections on home

---

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Firebase Authentication** - User authentication
- **React Toastify** - Toast notifications
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

---

## 📋 Pages

### Public Pages
- **Home** - Banner, Latest 6 Products, Featured Categories, Why Choose Us
- **All Products** - Browse all products with search and pagination
- **Sign In** - Login with email/password or Google
- **Sign Up** - Register with validation and image preview

### Private Pages (Login Required)
- **Product Details** - Full product information with "Import Now" functionality
- **My Exports** - Manage your exported products (view, update, delete)
- **My Imports** - View all products you've imported with "Remove" option
- **Add Export** - Add new products for export with comprehensive form

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database (local or Atlas)
- Firebase project for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd client_10
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🚀 Deployment Guide

### Deploy Client to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Create account at [Netlify](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod
     ```

3. **Add Firebase domain to authorized domains**
   - Go to Firebase Console → Authentication → Settings
   - Add your Netlify domain (e.g., `your-app.netlify.app`)

4. **Set environment variables in Netlify**
   - Go to Site settings → Environment variables
   - Add `VITE_API_URL` with your Vercel backend URL
   - Add Firebase configuration variables

### Deploy Server to Vercel

1. **Navigate to server directory**
   ```bash
   cd server_10
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Add environment variables**
   - Go to Vercel dashboard → Settings → Environment Variables
   - Add `MONGODB_URI` with your MongoDB Atlas connection string

5. **Update client API_URL**
   - Update your Netlify environment variable `VITE_API_URL` with the Vercel URL
   - Redeploy the client

---

## 📱 Features in Detail

### Authentication
- **Registration:** Name, Email, Photo URL (with live preview), Password (with validation), Confirm Password
- **Login:** Email, Password, Forgot Password link
- **Google Sign-In:** One-click authentication
- **Password Requirements:** Minimum 6 characters, at least 1 uppercase, at least 1 lowercase
- **Smart Redirect:** Returns to intended page after login

### Product Features
- **Add Product:** Complete form with all details and image URL selection
- **Update Product:** Pre-filled modal with all existing data
- **Delete Product:** Protected (can't delete if others imported)
- **Import Product:** Modal with quantity validation and limit checks
- **Search:** Real-time search by product name
- **Pagination:** Navigate through large product lists

### UI/UX Features
- **Toast Notifications:** Professional feedback for all actions
- **Loading States:** Spinners for all async operations
- **Error Handling:** Clear error messages with helpful suggestions
- **Responsive Tables:** Convert to cards on mobile devices
- **Theme Toggle:** Dark/Light mode with icon indicators
- **Dynamic Titles:** Page-specific titles in browser tab
- **Image Fallbacks:** Multiple fallback levels for missing images
- **Sticky Navbar:** Always accessible navigation
- **Mobile Menu:** Hamburger menu with smooth drawer

---

## 🎯 Assignment Requirements Met

✅ All 8 main pages implemented  
✅ Private route protection  
✅ Password validation (uppercase, lowercase, 6+ chars)  
✅ Google authentication  
✅ Import quantity validation  
✅ $inc operator for quantity updates  
✅ Toast notifications (no default alerts)  
✅ Search functionality  
✅ Dark/Light mode toggle  
✅ Dynamic page titles  
✅ Fully responsive design  
✅ Social links with new X logo  
✅ Latest 6 products from database  
✅ 2 extra sections on home  
✅ Update modal with prefilled data  
✅ Delete protection for imported products  

---

## 📞 Support

For any questions or issues:
- Email: info@exporthub.com
- Phone: +880 1234-567890
- Location: Dhaka, Bangladesh

---

## 👤 Developer

**Export Hub Team**  
© 2025 Export Hub - All rights reserved

---

## 📄 License

This project is created for educational purposes as part of a programming assignment.

---

**Built with ❤️ using React, Tailwind CSS, and MongoDB**
