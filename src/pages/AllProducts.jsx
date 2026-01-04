import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { API_URL } from '../config/api';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  
  // URL Params State
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const [pagination, setPagination] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = 'All Products - Export Hub';
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, sort, minPrice, maxPrice]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const result = await response.json();
      if (result.success) setCategories(result.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = `page=${page}&limit=12&search=${encodeURIComponent(search)}&sort=${sort}`;
      if (category) query += `&category=${encodeURIComponent(category)}`;
      if (minPrice) query += `&minPrice=${minPrice}`;
      if (maxPrice) query += `&maxPrice=${maxPrice}`;

      const response = await fetch(`${API_URL}/products?${query}`);
      console.log(`📡 Fetching products: ${API_URL}/products?${query}`); // Debug Log
      
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

  const updateParams = (newParams) => {
    const nextParams = { 
      search, page: 1, category, sort, minPrice, maxPrice, 
      ...newParams 
    };
    
    // Remove empty keys
    Object.keys(nextParams).forEach(key => {
      if (!nextParams[key]) delete nextParams[key];
    });

    setSearchParams(nextParams);
    // Scroll to top on filter change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateParams({ search: e.target.search.value });
  };

  const handleClearFilters = () => {
    setSearchParams({ page: 1, sort: 'newest' });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 fill-warning" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Mobile Filter Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Explore Products</h1>
          <p className="opacity-70 text-sm">Find the best export deals worldwide</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            className="btn btn-outline md:hidden flex-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
          
          <select 
            className="select select-bordered w-full md:w-48"
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-full lg:w-64 flex-shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          {/* Search */}
          <div>
            <h3 className="font-bold mb-3">Search</h3>
            <form onSubmit={handleSearch}>
              <div className="join w-full">
                <input 
                  name="search"
                  defaultValue={search}
                  className="input input-bordered input-sm join-item w-full" 
                  placeholder="Keyword..." 
                />
                <button type="submit" className="btn btn-sm btn-square join-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" opacity="0.7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </form>
          </div>

          {/* Categories */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Categories</h3>
              {category && (
                <button 
                  onClick={() => updateParams({ category: '' })} 
                  className="text-xs text-error hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {categories.map((cat) => (
                <label key={cat.name} className="label cursor-pointer justify-start gap-3 py-1 hover:bg-base-200 rounded-lg px-2 -mx-2 transition-colors">
                  <input 
                    type="radio" 
                    name="category" 
                    className="radio radio-xs radio-primary" 
                    checked={category === cat.name}
                    onChange={() => updateParams({ category: cat.name })}
                  />
                  <span className="label-text flex-1 truncate">{cat.name}</span>
                  <span className="badge badge-sm badge-ghost">{cat.count}</span>
                </label>
              ))}
              {categories.length === 0 && <p className="text-xs opacity-50">No categories found</p>}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-bold mb-3">Price Range</h3>
            <div className="flex gap-2 items-center">
              <input 
                type="number" 
                placeholder="Min" 
                className="input input-bordered input-sm w-full no-spinners"
                value={minPrice}
                onChange={(e) => updateParams({ minPrice: e.target.value })}
              />
              <span className="opacity-50">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                className="input input-bordered input-sm w-full no-spinners"
                value={maxPrice}
                onChange={(e) => updateParams({ maxPrice: e.target.value })}
              />
            </div>
          </div>

          <button onClick={handleClearFilters} className="btn btn-outline btn-block btn-sm">
            Reset All Filters
          </button>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card bg-base-100 shadow-xl animate-pulse h-96">
                  <div className="bg-base-300 h-48 w-full rounded-t-2xl"></div>
                  <div className="card-body p-4 space-y-3">
                    <div className="h-4 bg-base-300 rounded w-3/4"></div>
                    <div className="h-3 bg-base-300 rounded w-full"></div>
                    <div className="h-3 bg-base-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-2xl border border-base-200 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold">No products found</h3>
              <p className="opacity-60 max-w-xs mx-auto mt-2">Try adjusting your search or filters to find what you're looking for.</p>
              <button onClick={handleClearFilters} className="btn btn-primary btn-sm mt-6">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link 
                    to={`/product/${product._id}`} 
                    key={product._id} 
                    className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group border border-base-200"
                  >
                    <figure className="h-48 overflow-hidden bg-base-200 relative">
                      <img 
                    src={product.productImage || product.image || 'https://placehold.co/400x300?text=Product'} 
                    alt={product.productName || product.name || 'Product'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = 'https://placehold.co/400x300?text=No+Image';
                    }}
                  />    
                      <div className={`absolute top-2 right-2 badge ${product.availableQuantity > 0 ? 'badge-success text-white' : 'badge-error text-white'} shadow-sm text-xs`}>
                        {product.availableQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </figure>
                    
                    <div className="card-body p-4 flex flex-col flex-grow">
                      <h2 className="font-bold text-base line-clamp-1" title={product.productName}>
                        {product.productName}
                      </h2>
                      
                      <p className="text-xs opacity-70 line-clamp-2 min-h-[2.5em] mb-2">
                        {product.description || `Premium ${product.category || 'product'} from ${product.originCountry}`}
                      </p>
                      
                      <div className="mt-auto space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-primary">${product.price}</span>
                          <div className="flex items-center gap-1 text-xs">
                             <div className="flex text-yellow-500 text-xs">
                                {renderStars(product.rating || 0)}
                             </div>
                             <span>({product.rating || 0})</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs opacity-60 pt-2 border-t border-base-200">
                          <span className="truncate max-w-[100px]">{product.originCountry}</span>
                          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                        </div>

                        <button className="btn btn-primary btn-sm w-full btn-outline group-hover:btn-active">
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <div className="join">
                    <button 
                      className="join-item btn btn-sm hover:btn-primary"
                      disabled={page === 1}
                      onClick={() => updateParams({ page: page - 1 })}
                    >
                      «
                    </button>
                    <button className="join-item btn btn-sm bg-base-100 pointer-events-none">
                      Page {page} of {pagination.totalPages}
                    </button>
                    <button 
                      className="join-item btn btn-sm hover:btn-primary"
                      disabled={page === pagination.totalPages}
                      onClick={() => updateParams({ page: page + 1 })}
                    >
                      »
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AllProducts;
