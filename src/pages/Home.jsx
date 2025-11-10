import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="py-6">
      {/* Hero Section */}
      <div className="hero bg-base-100 rounded-lg shadow-xl mb-8">
        <div className="hero-content text-center py-16">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Export Hub</h1>
            <p className="py-6">
              Manage your exports and imports efficiently. Track your products, manage shipments, and grow your business globally.
            </p>
            <Link to="/all-products" className="btn btn-primary mr-2">
              Browse Products
            </Link>
            <Link to="/add-export" className="btn btn-outline btn-primary">
              Add Export
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-8">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-primary">25</div>
          <div className="stat-desc">Available for export</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div className="stat-title">Active Exports</div>
          <div className="stat-value text-secondary">8</div>
          <div className="stat-desc">In progress</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="stat-title">Total Imports</div>
          <div className="stat-value text-accent">12</div>
          <div className="stat-desc">Completed</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/all-products" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">📦</div>
            <h2 className="card-title">All Products</h2>
            <p>Browse all available products</p>
          </div>
        </Link>

        <Link to="/my-exports" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">🚀</div>
            <h2 className="card-title">My Exports</h2>
            <p>View your export history</p>
          </div>
        </Link>

        <Link to="/my-imports" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">📥</div>
            <h2 className="card-title">My Imports</h2>
            <p>Track your imports</p>
          </div>
        </Link>

        <Link to="/add-export" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">➕</div>
            <h2 className="card-title">Add Export</h2>
            <p>Create new export entry</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;

