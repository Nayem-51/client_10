import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_ENDPOINTS, API_URL } from '../config/api';

function MyExports() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Exports - Export Hub';
    fetchMyExports();
  }, []);

  const fetchMyExports = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!user.email) {
        navigate('/signin');
        return;
      }

      const response = await fetch(API_ENDPOINTS.EXPORTS(user.email));
      const data = await response.json();

      if (response.ok) {
        setProducts(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching exports:', err);
      setError('Network error. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`${API_URL}/products/${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Product deleted successfully!');
        setDeleteId(null);
        fetchMyExports(); // Refresh list
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('Network error. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.target);
      const updateData = {
        productName: formData.get('productName'),
        productImage: formData.get('productImage'),
        price: parseFloat(formData.get('price')),
        originCountry: formData.get('originCountry'),
        rating: parseFloat(formData.get('rating')),
        availableQuantity: parseInt(formData.get('availableQuantity'))
      };

      const response = await fetch(`${API_URL}/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        toast.success('Product updated successfully!');
        setEditingProduct(null);
        fetchMyExports(); // Refresh list
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      toast.error('Network error. Please try again.');
    }
  };

  const downloadCSV = () => {
    if (products.length === 0) {
      toast.warning('No data to download');
      return;
    }

    const headers = ['Product Name', 'Price', 'Origin Country', 'Rating', 'Available Quantity', 'Product Image'];
    
    const csvRows = products.map(product => [
      product.productName,
      product.price,
      product.originCountry,
      product.rating,
      product.availableQuantity,
      product.productImage
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `my-exports-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="py-4 px-2 sm:px-4 md:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Exports</h1>
        <div className="flex gap-2">
          <button 
            onClick={downloadCSV} 
            className="btn btn-success btn-sm"
            disabled={products.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CSV
          </button>
          <Link to="/add-export" className="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Export
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-4">No exports yet</p>
          <Link to="/add-export" className="btn btn-primary">
            Create Your First Export
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>1. Product Image</th>
                <th>2. Product Name</th>
                <th>3. Price</th>
                <th>4. Origin Country</th>
                <th>5. Rating</th>
                <th>6. Delete</th>
                <th>7. Available Quantity</th>
                <th>8. Update</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>
                  {/* 1. Product Image */}
                  <td>
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-base-200 shrink-0">
                      <img 
                        src={product.productImage || 'https://via.placeholder.com/64x64?text=No+Image'} 
                        alt={product.productName}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/64x64/3b82f6/ffffff?text=No+Image';
                        }}
                      />
                    </div>
                  </td>
                  {/* 2. Product Name */}
                  <td className="font-semibold">{product.productName}</td>
                  {/* 3. Price */}
                  <td className="text-primary font-bold">${product.price}</td>
                  {/* 4. Origin Country */}
                  <td>{product.originCountry}</td>
                  {/* 5. Rating */}
                  <td>⭐ {product.rating}</td>
                  {/* 6. Delete Button */}
                  <td>
                    <button 
                      className="btn btn-xs btn-error"
                      onClick={() => confirmDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                  {/* 7. Available Quantity */}
                  <td>
                    <span className="badge badge-info">{product.availableQuantity} units</span>
                  </td>
                  {/* 8. Update Button */}
                  <td>
                    <button 
                      className="btn btn-xs btn-success"
                      onClick={() => handleEdit(product)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden grid grid-cols-1 gap-4">
          {products.map((product, index) => (
            <div key={product._id} className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-base-200">
                    <img 
                      src={product.productImage || 'https://via.placeholder.com/96x96?text=No+Image'} 
                      alt={product.productName}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/96x96/3b82f6/ffffff?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{product.productName}</h3>
                    <p className="text-primary font-bold text-xl">${product.price}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">Country:</span>
                    <span className="font-semibold">{product.originCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Rating:</span>
                    <span>⭐ {product.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Available:</span>
                    <span className="badge badge-info">{product.availableQuantity} units</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    className="btn btn-sm btn-success flex-1"
                    onClick={() => handleEdit(product)}
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-sm btn-error flex-1"
                    onClick={() => confirmDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )}

      {/* Update Modal */}
      {editingProduct && (
        <dialog open className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Update Product</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Product Name</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  defaultValue={editingProduct.productName}
                  className="input input-bordered input-sm sm:input-md"
                  required
                />
              </div>

              <div className="form-control mt-3 sm:mt-4">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Image URL</span>
                </label>
                <input
                  type="url"
                  name="productImage"
                  defaultValue={editingProduct.productImage}
                  className="input input-bordered input-sm sm:input-md"
                  required
                />
              </div>

              <div className="form-control mt-3 sm:mt-4">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Price</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={editingProduct.price}
                  className="input input-bordered input-sm sm:input-md"
                  required
                />
              </div>

              <div className="form-control mt-3 sm:mt-4">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Country</span>
                </label>
                <input
                  type="text"
                  name="originCountry"
                  defaultValue={editingProduct.originCountry}
                  className="input input-bordered input-sm sm:input-md"
                  required
                />
              </div>

              <div className="form-control mt-3 sm:mt-4">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Rating</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  defaultValue={editingProduct.rating}
                  className="input input-bordered input-sm sm:input-md"
                  required
                />
              </div>

              <div className="form-control mt-3 sm:mt-4">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Available Quantity</span>
                </label>
                <input
                  type="number"
                  name="availableQuantity"
                  defaultValue={editingProduct.availableQuantity}
                  className="input input-bordered input-sm sm:input-md"
                  required
                />
              </div>

              <div className="modal-action flex-col sm:flex-row gap-2 mt-4 sm:mt-6">
                <button type="submit" className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto order-1">
                  <span className="text-xs sm:text-sm">Submit</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-sm sm:btn-md w-full sm:w-auto order-2"
                  onClick={() => setEditingProduct(null)}
                >
                  <span className="text-xs sm:text-sm">Cancel</span>
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setEditingProduct(null)}>close</button>
          </form>
        </dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="modal-action">
              <button 
                className="btn btn-error"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button 
                className="btn"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setDeleteId(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default MyExports;

