import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddExport() {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Update image preview when image URL changes
    if (name === 'productImage') {
      setImagePreview(value || 'https://via.placeholder.com/400x300?text=Product+Image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Get user data from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!user.email) {
        setError('Please login first');
        setLoading(false);
        navigate('/signin');
        return;
      }

      // Prepare data for backend
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

      // Send data to backend
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Export added successfully to database!');
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
    <div className="py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Export</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
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
                <span className="label-text font-semibold">Product Name</span>
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
                <span className="label-text font-semibold">Product Image URL</span>
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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
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
                </div>
              </div>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">Quantity</span>
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                className="input input-bordered w-full"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">Destination Country</span>
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Enter destination"
                className="input input-bordered w-full"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">Price (USD)</span>
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
                <span className="label-text font-semibold">Rating</span>
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
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Adding to database...
                  </>
                ) : (
                  'Add Export/Product'
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

