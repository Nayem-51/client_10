import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyExports() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyExports();
  }, []);

  const fetchMyExports = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!user.email) {
        navigate('/signin');
        return;
      }

      const response = await fetch(`http://localhost:3000/exports/${user.email}`);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product deleted successfully!');
        fetchMyExports(); // Refresh list
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Network error. Please try again.');
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

      const response = await fetch(`http://localhost:3000/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        alert('Product updated successfully!');
        setEditingProduct(null);
        fetchMyExports(); // Refresh list
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Network error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Exports</h1>
        <Link to="/add-export" className="btn btn-primary">
          + Add New Export
        </Link>
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
        <div className="overflow-x-auto">
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
                    <img 
                      src={product.productImage || 'https://via.placeholder.com/48x48?text=No+Image'} 
                      alt={product.productName}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                      }}
                    />
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
                      onClick={() => handleDelete(product._id)}
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
      )}

      {/* Update Modal */}
      {editingProduct && (
        <dialog open className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Update Product</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  defaultValue={editingProduct.productName}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="url"
                  name="productImage"
                  defaultValue={editingProduct.productImage}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={editingProduct.price}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Country</span>
                </label>
                <input
                  type="text"
                  name="originCountry"
                  defaultValue={editingProduct.originCountry}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  defaultValue={editingProduct.rating}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Available Quantity</span>
                </label>
                <input
                  type="number"
                  name="availableQuantity"
                  defaultValue={editingProduct.availableQuantity}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button 
                  type="button" 
                  className="btn"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setEditingProduct(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default MyExports;

