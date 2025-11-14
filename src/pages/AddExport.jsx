import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';

function AddExport() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    document.title = 'Add Export - Export Hub';
    
    if (!user.email) {
      toast.error('Please login first');
      navigate('/signin');
      return;
    }
  }, []);

  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    destination: '',
    description: '',
    price: '',
    rating: '4.5',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'productImage') {
      setImagePreview(value || 'https://via.placeholder.com/400x300?text=Product+Image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!user.email) {
        setError('Please login first');
        setLoading(false);
        navigate('/signin');
        return;
      }

      const productData = {
        productName: formData.productName,
        productImage: formData.productImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        price: parseFloat(formData.price),
        originCountry: formData.destination,
        rating: parseFloat(formData.rating),
        availableQuantity: parseInt(formData.quantity),
        userEmail: user.email,
        userName: user.name || 'Anonymous'
      };

      const response = await fetch(API_ENDPOINTS.PRODUCTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Export added successfully to database!');
        navigate('/my-exports');
      } else {
        setError(data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Network error. Please make sure the server is running on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4 px-2 sm:px-4 md:py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Add New Export</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6 md:p-8">
          {error && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">a. Product Name</span>
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                className="input input-bordered w-full"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">b. Product Image (image url)</span>
              </label>
              <input
                type="url"
                name="productImage"
                placeholder="Enter product image URL"
                className="input input-bordered w-full"
                value={formData.productImage}
                onChange={handleChange}
              />
              
              {/* Image Preview */}
              <div className="mt-3">
                <p className="text-sm font-semibold mb-2">Image Preview:</p>
                <div className="w-full h-48 bg-base-200 rounded-lg overflow-hidden flex items-center justify-center">
                  <img 
                    src={imagePreview} 
                    alt="Product preview"
                    className="max-w-full max-h-full object-contain"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              </div>

              {/* Sample Images */}
              <div className="mt-3">
                <p className="text-sm font-semibold mb-2">Or choose a sample image:</p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    📦 Product 1
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    ⌚ Product 2
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    📱 Product 3
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    👔 Product 4
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    👟 Product 5
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    💼 Product 6
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    👟 Product 7
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    ⌚ Product 8
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1572635196184-84e35138cf62?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    📱 Product 9
                  </button>
                  <button 
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      const url = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop';
                      setFormData({...formData, productImage: url});
                      setImagePreview(url);
                    }}
                  >
                    📷 Product 10
                  </button>
                </div>
              </div>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">c. Price (USD)</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="Enter price"
                className="input input-bordered w-full"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">d. Origin Country</span>
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Enter origin country"
                className="input input-bordered w-full"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">e. Rating</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                placeholder="Enter rating (0-5)"
                className="input input-bordered w-full"
                value={formData.rating}
                onChange={handleChange}
                required
              />
              <label className="label">
                <span className="label-text-alt">Rating should be between 0 and 5</span>
              </label>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">f. Available Quantity</span>
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter available quantity"
                className="input input-bordered w-full"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Enter product description"
                className="textarea textarea-bordered w-full h-24"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary btn-sm sm:btn-md w-full" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="ml-2 text-sm sm:text-base">Adding...</span>
                  </>
                ) : (
                  <span className="text-sm sm:text-base">g. Add Export/Product</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExport;

