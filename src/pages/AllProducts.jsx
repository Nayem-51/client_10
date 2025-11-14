import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/api';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    document.title = 'All Products - Export Hub';
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/products?page=${page}&limit=12&search=${search}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const result = await response.json();
        setProducts(result.data || result);
        setPagination(result.pagination || {});
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

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-warning" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>
      );
    }
    
    const emptyStars = 5 - fullStars;
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
    <div className="py-4 px-2 sm:px-4 md:py-6">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">All Products</h1>
        <span className="text-xs sm:text-sm opacity-70">
          {pagination.total ? `${pagination.total} products` : ''}
        </span>
      </div>

      {/* Search Bar */}
      <div className="mb-4 md:mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered input-sm sm:input-md flex-1 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm sm:btn-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline ml-2">Search</span>
          </button>
        </form>
      </div>

      {/* Loading State */}
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
          <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or add new products</p>
          <Link to="/add-export" className="btn btn-primary">
            Add Product
          </Link>
        </div>
      ) : (
        <>
          {/* Products Grid - 3 Column Layout as per requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-full flex flex-col">
                <figure className="h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-base-300 flex-shrink-0 rounded-t-2xl">
                  <img 
                    src={product.productImage || product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&h=300&fit=crop'} 
                    alt={product.productName || product.name || 'Product'}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=' + encodeURIComponent(product.productName || 'Product');
                    }}
                  />
                </figure>
                <div className="card-body p-3 sm:p-4 flex flex-col flex-grow">
                  <h2 className="card-title text-sm sm:text-base md:text-lg flex-wrap">
                    <span className="break-words">{product.productName || product.name}</span>
                    {product.availableQuantity < 10 && (
                      <div className="badge badge-warning badge-sm">Low Stock</div>
                    )}
                  </h2>
                  
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary text-lg sm:text-xl">
                        ${product.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="opacity-80 truncate">{product.originCountry}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="flex items-center">
                        {renderStars(product.rating || 0)}
                      </div>
                      <span className="text-xs sm:text-sm opacity-80">({product.rating || 0})</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="opacity-80 truncate">
                        {product.availableQuantity} units
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-actions justify-end mt-auto pt-2">
                    <Link 
                      to={`/product/${product._id}`} 
                      className="btn btn-primary btn-xs sm:btn-sm w-full"
                    >
                      <span className="text-xs sm:text-sm">See Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <div className="join">
                <button 
                  className="join-item btn btn-xs sm:btn-sm md:btn-md"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  aria-label="Previous page"
                >
                  «
                </button>
                <button className="join-item btn btn-xs sm:btn-sm md:btn-md pointer-events-none">
                  <span className="hidden sm:inline">Page {page} of {pagination.totalPages}</span>
                  <span className="sm:hidden">{page}/{pagination.totalPages}</span>
                </button>
                <button 
                  className="join-item btn btn-xs sm:btn-sm md:btn-md"
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  aria-label="Next page"
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllProducts;

