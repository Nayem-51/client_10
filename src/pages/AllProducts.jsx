import React from 'react';

function AllProducts() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder product cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="card bg-base-100 shadow-xl">
            <figure className="h-48 bg-base-300">
              <div className="flex items-center justify-center h-full text-4xl">
                📦
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Product {item}</h2>
              <p>This is a sample product description.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;

