import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to load product details');
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold mb-4">{error || 'Product Not Found'}</h2>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-products">Products</Link></li>
          <li>{product.name}</li>
        </ul>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="w-full">
          <figure className="rounded-lg overflow-hidden shadow-xl bg-base-300 h-96 lg:h-[500px]">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-9xl">
                📦
              </div>
            )}
          </figure>
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              {renderStars(product.rating || 0)}
            </div>
            <span className="text-lg font-semibold">({product.rating || 0})</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">${product.price}</span>
            <span className="text-lg opacity-70 ml-2">per unit</span>
          </div>

          {/* Key Information */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm opacity-70">Origin Country</p>
                <p className="text-lg font-semibold">{product.originCountry}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <div>
                <p className="text-sm opacity-70">Available Quantity</p>
                <p className="text-lg font-semibold">
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
                  <p className="text-sm opacity-70">Category</p>
                  <p className="text-lg font-semibold">{product.category}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Description</h3>
              <p className="text-base opacity-80 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto">
            <button className="btn btn-primary flex-1">
              Contact Supplier
            </button>
            <button className="btn btn-outline btn-primary">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-base-200 rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.userEmail && (
            <div>
              <p className="text-sm opacity-70">Seller Email</p>
              <p className="font-semibold">{product.userEmail}</p>
            </div>
          )}
          {product.createdAt && (
            <div>
              <p className="text-sm opacity-70">Listed On</p>
              <p className="font-semibold">{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <button onClick={() => navigate(-1)} className="btn btn-ghost">
          ← Back to Products
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;

