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
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline">Welcome, {user.name || user.email}!</span>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {user.image ? (
                      <img src={user.image} alt={user.name} />
                    ) : (
                      <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center text-xl font-bold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="menu-title">
                    <span>{user.name || user.email}</span>
                  </li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/my-exports">My Exports</Link></li>
                  <li><Link to="/my-imports">My Imports</Link></li>
                  <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/signin" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
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
      <footer className="footer footer-center p-4 bg-base-100 text-base-content mt-8">
        <div>
          <p>Copyright © 2024 - Export Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Root;

