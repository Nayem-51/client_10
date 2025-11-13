import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Home - Export Hub';
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products/latest');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-warning" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-warning" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" fillOpacity="0.5"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-warning" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="py-6">
      {/* Banner/Slider Section */}
      <div className="carousel w-full h-64 md:h-96 rounded-lg shadow-xl mb-8">
        <div id="slide1" className="carousel-item relative w-full bg-gradient-to-r from-primary to-secondary">
          <div className="hero-content text-center w-full">
            <div className="max-w-2xl text-primary-content">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Export Hub</h1>
              <p className="text-lg mb-6">
                Discover premium products from around the world. Quality exports for your business needs.
              </p>
              <Link to="/all-products" className="btn btn-accent">
                Browse All Products
              </Link>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide2" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full bg-gradient-to-r from-secondary to-accent">
          <div className="hero-content text-center w-full">
            <div className="max-w-2xl text-secondary-content">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Trade Made Easy</h1>
              <p className="text-lg mb-6">
                Connect with suppliers worldwide. Manage your exports and imports efficiently.
              </p>
              <Link to="/add-export" className="btn btn-primary">
                Add Your Product
              </Link>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide3" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full bg-gradient-to-r from-accent to-info">
          <div className="hero-content text-center w-full">
            <div className="max-w-2xl text-accent-content">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Businesses</h1>
              <p className="text-lg mb-6">
                Join thousands of exporters and importers growing their business globally.
              </p>
              <Link to="/signup" className="btn btn-primary">
                Get Started Today
              </Link>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide1" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>
      </div>

      {/* Latest Products Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest Products</h2>
          <Link to="/all-products" className="btn btn-ghost btn-sm text-primary">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold mb-2">No Products Available</h3>
            <p className="text-gray-600 mb-6">Be the first to add a product!</p>
            <Link to="/add-export" className="btn btn-primary">
              Add Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-full flex flex-col">
                <figure className="h-48 overflow-hidden bg-base-300 flex-shrink-0">
                  {(product.productImage || product.image) ? (
                    <img 
                      src={product.productImage || product.image} 
                      alt={product.productName || product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-6xl">
                      📦
                    </div>
                  )}
                </figure>
                <div className="card-body flex flex-col flex-grow">
                  <h2 className="card-title text-lg">
                    {product.productName || product.name}
                    {product.availableQuantity < 10 && (
                      <div className="badge badge-warning">Low Stock</div>
                    )}
                  </h2>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary text-xl">
                        ${product.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="opacity-80">{product.originCountry}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {renderStars(product.rating || 0)}
                      </div>
                      <span className="text-sm opacity-80">({product.rating || 0})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="opacity-80">
                        {product.availableQuantity} units available
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-actions justify-end mt-auto">
                    <Link 
                      to={`/product/${product._id}`} 
                      className="btn btn-primary btn-sm w-full"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Categories Section */}
      <div className="mb-8 py-8 bg-base-200 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Categories</h2>
          <p className="text-lg opacity-70">Explore our diverse range of product categories</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 h-full">
            <div className="card-body items-center text-center p-6">
              <div className="text-5xl mb-3">🍎</div>
              <h3 className="card-title text-lg">Food & Beverages</h3>
              <p className="text-sm opacity-70">Fresh & Quality</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 h-full">
            <div className="card-body items-center text-center p-6">
              <div className="text-5xl mb-3">👕</div>
              <h3 className="card-title text-lg">Textiles</h3>
              <p className="text-sm opacity-70">Premium Fabrics</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 h-full">
            <div className="card-body items-center text-center p-6">
              <div className="text-5xl mb-3">💻</div>
              <h3 className="card-title text-lg">Electronics</h3>
              <p className="text-sm opacity-70">Latest Tech</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 h-full">
            <div className="card-body items-center text-center p-6">
              <div className="text-5xl mb-3">🛠️</div>
              <h3 className="card-title text-lg">Industrial</h3>
              <p className="text-sm opacity-70">Heavy Equipment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Why Choose Export Hub?</h2>
          <p className="text-lg opacity-70">Your trusted partner in global trade</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Global Reach</h3>
            <p className="opacity-70">
              Connect with suppliers and buyers from over 100 countries worldwide. Expand your business globally with ease.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Transactions</h3>
            <p className="opacity-70">
              Advanced security measures and verified sellers ensure safe and reliable transactions for all your business needs.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Fast & Efficient</h3>
            <p className="opacity-70">
              Streamlined processes and 24/7 support ensure quick turnaround times and efficient service delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

