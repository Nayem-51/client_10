import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [importQuantity, setImportQuantity] = useState(1);
  const [importing, setImporting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product) {
      document.title = `${product.productName} - Export Hub`;
    } else {
      document.title = 'Product Details - Export Hub';
    }
  }, [product]);

  const fetchProductDetails = async () => {
    try {
      console.log('Fetching product with ID:', id);
      const response = await fetch(`http://localhost:3000/products/${id}`);
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Product data received:', result);
        setProduct(result.data || result);
      } else {
        const errorData = await response.json();
        console.error('Product fetch failed:', errorData);
        setError(errorData.error || 'Product not found');
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const openImportModal = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user.email) {
      toast.error('Please login first to import products');
      navigate('/signin');
      return;
    }

    setImportQuantity(1);
    setShowModal(true);
  };

  const handleImport = async () => {
    if (importQuantity < 1 || importQuantity > product.availableQuantity) {
      toast.warning(`Please enter a valid quantity between 1 and ${product.availableQuantity}`);
      return;
    }

    setImporting(true);
    
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const importData = {
        productId: product._id,
        productName: product.productName,
        productImage: product.productImage,
        price: product.price,
        rating: product.rating,
        originCountry: product.originCountry,
        importedQuantity: importQuantity,
        userEmail: user.email,
        userName: user.name
      };

      const response = await fetch('http://localhost:3000/imports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(importData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Product imported successfully!');
        setShowModal(false); // Close modal
        fetchProductDetails(); // Refresh to show updated quantity
        setImportQuantity(1);
      } else {
        toast.error(data.error || 'Failed to import product');
      }
    } catch (err) {
      console.error('Error importing product:', err);
      toast.error('Network error. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-warning" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-warning" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" fillOpacity="0.5"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-warning" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Product not found</h2>
          <p className="text-base-content/70 mb-6 text-sm sm:text-base">
            This product may have been removed by the seller or is no longer available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/all-products" className="btn btn-primary btn-sm sm:btn-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Browse All Products
            </Link>
            <Link to="/my-imports" className="btn btn-ghost btn-sm sm:btn-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to My Imports
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 px-2 sm:px-4 md:py-6">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm breadcrumbs mb-3 md:mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-products">Products</Link></li>
          <li className="hidden sm:inline truncate max-w-[150px] sm:max-w-none">{product.productName || product.name}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
        <div className="w-full">
          <figure className="rounded-lg overflow-hidden shadow-xl bg-base-300 aspect-square max-h-[400px] w-full">
            <img 
              src={product.productImage || product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&h=600&fit=crop'} 
              alt={product.productName || product.name || 'Product'}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x600/3b82f6/ffffff?text=' + encodeURIComponent(product.productName || 'Product');
              }}
            />
          </figure>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">{product.productName || product.name}</h1>
          
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="flex items-center">
              {renderStars(product.rating || 0)}
            </div>
            <span className="text-base md:text-lg font-semibold">({product.rating || 0})</span>
          </div>

          <div className="mb-4 md:mb-6">
            <span className="text-3xl md:text-4xl font-bold text-primary">${product.price}</span>
            <span className="text-sm md:text-lg opacity-70 ml-2">per unit</span>
          </div>

          <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-base-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs md:text-sm opacity-70">Origin Country</p>
                <p className="text-base md:text-lg font-semibold">{product.originCountry}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-base-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <div>
                <p className="text-xs md:text-sm opacity-70">Available Quantity</p>
                <p className="text-base md:text-lg font-semibold">
                  {product.availableQuantity} units
                  {product.availableQuantity < 10 && (
                    <span className="badge badge-warning ml-2">Low Stock</span>
                  )}
                </p>
              </div>
            </div>

            {product.category && (
              <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              <div>
                <p className="text-xs md:text-sm opacity-70">Category</p>
                <p className="text-base md:text-lg font-semibold">{product.category}</p>
              </div>
              </div>
            )}
          </div>

          {product.description && (
            <div className="mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Description</h3>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div className="bg-base-200 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Want to Import This Product?</h3>
            <p className="mb-3 md:mb-4 opacity-80 text-sm md:text-base">
              Available Quantity: <span className="font-bold text-primary">{product.availableQuantity} units</span>
            </p>
            <button 
              className="btn btn-primary btn-sm md:btn-md w-full"
              onClick={openImportModal}
              disabled={product.availableQuantity === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Import Now
            </button>
            {product.availableQuantity === 0 && (
              <div className="alert alert-warning mt-3 md:mt-4 text-sm">
                <span>This product is currently out of stock</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-auto">
            <button className="btn btn-outline btn-primary btn-sm md:btn-md flex-1">
              Contact Supplier
            </button>
            <Link to="/my-imports" className="btn btn-ghost btn-sm md:btn-md">
              View My Imports
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {product.userEmail && (
            <div>
              <p className="text-xs md:text-sm opacity-70">Seller Email</p>
              <p className="text-sm md:text-base font-semibold break-all">{product.userEmail}</p>
            </div>
          )}
          {product.createdAt && (
            <div>
              <p className="text-xs md:text-sm opacity-70">Listed On</p>
              <p className="text-sm md:text-base font-semibold">{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm md:btn-md">
          ← Back to Products
        </button>
      </div>

      {/* Import Modal */}
      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box w-11/12 max-w-lg">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Import Product</h3>
            
            <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
              <p className="text-xs sm:text-sm opacity-70">Product: <span className="font-semibold">{product.productName}</span></p>
              <p className="text-xs sm:text-sm opacity-70">Price: <span className="font-semibold text-primary">${product.price}</span></p>
              <p className="text-xs sm:text-sm opacity-70">Available: <span className="font-semibold text-success">{product.availableQuantity} units</span></p>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base font-semibold">Enter Quantity to Import</span>
              </label>
              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={importQuantity}
                onChange={(e) => setImportQuantity(parseInt(e.target.value) || 1)}
                className="input input-bordered input-sm sm:input-md w-full"
                placeholder={`Max: ${product.availableQuantity}`}
              />
              <label className="label">
                <span className="label-text-alt text-xs text-warning">
                  ⚠️ You can import maximum {product.availableQuantity} units
                </span>
              </label>
            </div>

            {/* Import Limit Warning */}
            {importQuantity > product.availableQuantity && (
              <div className="alert alert-error mt-2 sm:mt-3 py-2 sm:py-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm">Quantity exceeds available stock! Maximum: {product.availableQuantity}</span>
              </div>
            )}

            <div className="modal-action flex-col sm:flex-row gap-2 mt-4 sm:mt-6">
              <button 
                type="button"
                className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto order-1"
                onClick={handleImport}
                disabled={importing || importQuantity < 1 || importQuantity > product.availableQuantity}
              >
                {importing ? (
                  <>
                    <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                    <span className="text-xs sm:text-sm">Importing...</span>
                  </>
                ) : (
                  <span className="text-xs sm:text-sm">Submit</span>
                )}
              </button>
              <button 
                type="button"
                className="btn btn-sm sm:btn-md w-full sm:w-auto order-2"
                onClick={() => setShowModal(false)}
                disabled={importing}
              >
                <span className="text-xs sm:text-sm">Cancel</span>
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default ProductDetails;


