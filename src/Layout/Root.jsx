import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary font-semibold' : '';
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-lg px-6">
        {/* Left Side - Logo and Navigation */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            <span className="text-primary">📦</span> Export Hub
          </Link>
          
          <nav className="hidden md:flex ml-8 gap-2">
            <Link 
              to="/all-products" 
              className={`btn btn-ghost ${isActive('/all-products')}`}
            >
              All Products
            </Link>
            <Link 
              to="/my-exports" 
              className={`btn btn-ghost ${isActive('/my-exports')}`}
            >
              My Exports
            </Link>
            <Link 
              to="/my-imports" 
              className={`btn btn-ghost ${isActive('/my-imports')}`}
            >
              My Imports
            </Link>
            <Link 
              to="/add-export" 
              className={`btn btn-ghost ${isActive('/add-export')}`}
            >
              Add Export
            </Link>
          </nav>
        </div>

        {/* Right Side - Login/Register or User Profile */}
        <div className="flex-none">
          {user ? (
            <div className="flex items-center gap-3">
              {/* User Avatar with Dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar cursor-pointer">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name || 'User'} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center text-xl font-bold">
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
                  <li className="menu-title px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          {user.image ? (
                            <img 
                              src={user.image} 
                              alt={user.name || 'User'} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center text-lg font-bold">
                              {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-base">{user.name || user.email?.split('@')[0]}</span>
                        <span className="text-xs opacity-60 truncate max-w-[150px]">{user.email}</span>
                      </div>
                    </div>
                  </li>
                  <div className="divider my-0"></div>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/my-exports">My Exports</Link></li>
                  <li><Link to="/my-imports">My Imports</Link></li>
                </ul>
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout} 
                className="btn btn-outline btn-error btn-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/signin" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden bg-base-100 shadow-sm">
        <nav className="flex overflow-x-auto gap-2 p-2">
          <Link 
            to="/all-products" 
            className={`btn btn-sm btn-ghost ${isActive('/all-products')}`}
          >
            All Products
          </Link>
          <Link 
            to="/my-exports" 
            className={`btn btn-sm btn-ghost ${isActive('/my-exports')}`}
          >
            My Exports
          </Link>
          <Link 
            to="/my-imports" 
            className={`btn btn-sm btn-ghost ${isActive('/my-imports')}`}
          >
            My Imports
          </Link>
          <Link 
            to="/add-export" 
            className={`btn btn-sm btn-ghost ${isActive('/add-export')}`}
          >
            Add Export
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-base-100 text-base-content mt-12">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">📦</span>
                <h3 className="text-xl font-bold text-primary">Export Hub</h3>
              </div>
              <p className="text-sm leading-relaxed opacity-80">
                Your trusted platform for managing global exports and imports. 
                Connecting businesses worldwide with seamless trade solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h6 className="text-base font-bold uppercase tracking-wider">Quick Links</h6>
              <nav className="flex flex-col space-y-2">
                <Link to="/all-products" className="link link-hover text-sm hover:text-primary transition-colors">
                  All Products
                </Link>
                <Link to="/my-exports" className="link link-hover text-sm hover:text-primary transition-colors">
                  My Exports
                </Link>
                <Link to="/my-imports" className="link link-hover text-sm hover:text-primary transition-colors">
                  My Imports
                </Link>
                <Link to="/add-export" className="link link-hover text-sm hover:text-primary transition-colors">
                  Add Export
                </Link>
              </nav>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h6 className="text-base font-bold uppercase tracking-wider">Support</h6>
              <nav className="flex flex-col space-y-2">
                <a className="link link-hover text-sm hover:text-primary transition-colors">Help Center</a>
                <a className="link link-hover text-sm hover:text-primary transition-colors">Terms of Service</a>
                <a className="link link-hover text-sm hover:text-primary transition-colors">Privacy Policy</a>
                <a className="link link-hover text-sm hover:text-primary transition-colors">FAQ</a>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h6 className="text-base font-bold uppercase tracking-wider">Contact Us</h6>
              <div className="flex flex-col space-y-3">
                <a href="mailto:info@exporthub.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors group">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>info@exporthub.com</span>
                </a>
                <a href="tel:+8801234567890" className="flex items-center gap-3 text-sm hover:text-primary transition-colors group">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>+880 1234-567890</span>
                </a>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Social Links and Copyright */}
        <div className="border-t border-base-300 bg-base-200/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Copyright */}
              <div className="text-sm text-center md:text-left order-2 md:order-1">
                <p className="opacity-80">
                  Copyright © {new Date().getFullYear()} 
                  <span className="font-semibold text-primary mx-1">Export Hub</span>
                  - All rights reserved.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2 order-1 md:order-2">
                <span className="text-sm font-medium mr-2 hidden sm:inline">Follow Us:</span>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Root;

