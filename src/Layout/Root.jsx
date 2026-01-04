import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsMobileMenuOpen(false);
    navigate('/signin');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary font-semibold' : '';
  };

  return (
    <div className="min-h-screen bg-base-200">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
      {/* Header - Logo + Navigation with Hamburger Menu */}
      <header className="bg-primary text-primary-content shadow-lg sticky top-0 z-50">
        <div className="navbar px-3 sm:px-4 lg:px-8 py-2 sm:py-3 max-w-[1920px] mx-auto">
          {/* Left Side - Logo (Desktop Only) */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img 
                src="/export_logo.jpeg" 
                alt="Export Hub Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg border-2 border-primary-content/20"
              />
              <span className="text-lg sm:text-xl font-bold">Export Hub</span>
            </Link>
          </div>

          {/* Center - Desktop Navigation (Middle) */}
          <div className="flex-1 hidden lg:flex justify-center">
            <nav className="flex items-center gap-1">
              <Link 
                to="/" 
                className={`btn btn-ghost btn-sm text-primary-content hover:bg-primary-focus ${isActive('/')}`}
              >
                Home
              </Link>
              <Link 
                to="/all-products" 
                className={`btn btn-ghost btn-sm text-primary-content hover:bg-primary-focus ${isActive('/all-products')}`}
              >
                All Products
              </Link>
              
              {!user && (
                <>
                  <Link 
                    to="/about" 
                    className="btn btn-ghost btn-sm text-primary-content hover:bg-primary-focus"
                  >
                    About
                  </Link>
                  <Link 
                    to="/contact" 
                    className={`btn btn-ghost btn-sm text-primary-content hover:bg-primary-focus ${isActive('/contact')}`}
                  >
                    Contact
                  </Link>
                  <Link 
                    to="/blog" 
                    className={`btn btn-ghost btn-sm text-primary-content hover:bg-primary-focus ${isActive('/blog')}`}
                  >
                    Blog
                  </Link>
                </>
              )}

              {user && (
                <Link 
                  to="/dashboard" 
                  className={`btn btn-ghost btn-sm text-primary-content hover:bg-primary-focus ${isActive('/dashboard')}`}
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>

          {/* Right Side - Desktop Actions */}
          <div className="flex-none hidden lg:flex">
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle btn-sm text-primary-content hover:bg-primary-focus"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 h-10 rounded-full border-2 border-primary-content">
                      {user.image ? (
                        <img src={user.image} alt={user.name} referrerPolicy="no-referrer" />
                      ) : (
                        <div className="bg-primary-focus text-primary-content w-full h-full flex items-center justify-center text-lg font-bold">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-base-content">
                    <li>
                      <Link to="/dashboard/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/signin" className="btn btn-ghost btn-sm text-primary-content hover:bg-primary-focus">
                    Login
                  </Link>
                  <Link to="/signup" className="btn bg-white text-primary btn-sm border-none hover:bg-gray-100">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile - Right Side with Hamburger */}
          <div className="flex-none lg:hidden">
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle btn-sm text-primary-content"
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              <button 
                onClick={toggleMobileMenu}
                className="btn btn-ghost btn-square btn-sm text-primary-content"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
          <div 
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeMobileMenu}
          ></div>
          
          <div className={`absolute right-0 top-0 h-full w-72 bg-base-100 shadow-2xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-4 border-b border-base-300 bg-primary text-primary-content">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={closeMobileMenu} className="btn btn-ghost btn-circle btn-sm text-primary-content">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {user && (
              <div className="p-4 border-b border-base-300 bg-base-100 text-base-content">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                       {user.image ? (
                        <img src={user.image} alt={user.name} referrerPolicy="no-referrer" />
                      ) : (
                        <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center text-xl font-bold">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{user.name || 'User'}</p>
                    <p className="text-xs opacity-70 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <nav className="p-4 space-y-2 text-base-content overflow-y-auto max-h-[calc(100vh-180px)]">
              <Link to="/" onClick={closeMobileMenu} className={`btn btn-ghost w-full justify-start gap-3 ${isActive('/')}`}>
                Home
              </Link>
              <Link to="/all-products" onClick={closeMobileMenu} className={`btn btn-ghost w-full justify-start gap-3 ${isActive('/all-products')}`}>
                All Products
              </Link>
              
              {!user && (
                <>
                  <Link to="/about" onClick={closeMobileMenu} className="btn btn-ghost w-full justify-start gap-3">
                    About
                  </Link>
                  <Link to="/contact" onClick={closeMobileMenu} className={`btn btn-ghost w-full justify-start gap-3 ${isActive('/contact')}`}>
                    Contact
                  </Link>
                  <Link to="/blog" onClick={closeMobileMenu} className={`btn btn-ghost w-full justify-start gap-3 ${isActive('/blog')}`}>
                    Blog
                  </Link>
                </>
              )}

              {user && (
                <Link to="/dashboard" onClick={closeMobileMenu} className={`btn btn-ghost w-full justify-start gap-3 ${isActive('/dashboard')}`}>
                  Dashboard
                </Link>
              )}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300 bg-base-100">
              {user ? (
                <button onClick={handleLogout} className="btn btn-error w-full gap-2 text-white">
                  Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/signin" onClick={closeMobileMenu} className="btn btn-outline btn-primary">Login</Link>
                  <Link to="/signup" onClick={closeMobileMenu} className="btn btn-primary">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-[1920px]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-base-100 text-base-content mt-8 sm:mt-12">
        {/* Main Footer Content */}
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <img 
                  src="/export_logo.jpeg" 
                  alt="Export Hub Logo" 
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded"
                />
                <h3 className="text-lg sm:text-xl font-bold text-primary">Export Hub</h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-80">
                Your trusted platform for managing global exports and imports. 
                Connecting businesses worldwide with seamless trade solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 sm:space-y-4">
              <h6 className="text-sm sm:text-base font-bold uppercase tracking-wider">Quick Links</h6>
              <nav className="flex flex-col space-y-1.5 sm:space-y-2">
                <Link to="/all-products" className="link link-hover text-xs sm:text-sm hover:text-primary transition-colors">
                  All Products
                </Link>
                <Link to="/dashboard" className="link link-hover text-xs sm:text-sm hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/blog" className="link link-hover text-xs sm:text-sm hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link to="/contact" className="link link-hover text-xs sm:text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Support */}
            <div className="space-y-3 sm:space-y-4">
              <h6 className="text-sm sm:text-base font-bold uppercase tracking-wider">Support</h6>
              <nav className="flex flex-col space-y-1.5 sm:space-y-2">
                <a href="/#faq" className="link link-hover text-xs sm:text-sm hover:text-primary transition-colors">FAQ</a>
                <Link to="/terms" className="link link-hover text-xs sm:text-sm hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/privacy" className="link link-hover text-xs sm:text-sm hover:text-primary transition-colors">Privacy Policy</Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4">
              <h6 className="text-sm sm:text-base font-bold uppercase tracking-wider">Contact Us</h6>
              <div className="flex flex-col space-y-2 sm:space-y-3">
                <a href="nayem20talukdar@gmail.com" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:text-primary transition-colors group">
                  <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="break-all">nayem20talukdar@gmail.com</span>
                </a>
                <a href="tel:+8801903912471" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:text-primary transition-colors group">
                  <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>+880 1903912471</span>
                </a>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              
              {/* Copyright */}
              <div className="text-xs sm:text-sm text-center md:text-left order-2 md:order-1">
                <p className="opacity-80">
                  Copyright © {new Date().getFullYear()} 
                  <span className="font-semibold text-primary mx-1">Export Hub</span>
                  - All rights reserved.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-1.5 sm:gap-2 order-1 md:order-2">
                <span className="text-xs sm:text-sm font-medium mr-1 sm:mr-2 hidden sm:inline">Follow Us:</span>
                <a 
                  href="https://www.facebook.com/md.nayemislam.9693001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs sm:btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs sm:btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="X (formerly Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/nayem-talukdar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs sm:btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs sm:btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs sm:btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-all"
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
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

