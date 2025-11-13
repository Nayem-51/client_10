import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyExports() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
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

  const downloadCSV = () => {
    if (products.length === 0) {
      alert('No data to download');
      return;
    }

    // Define CSV headers
    const headers = ['Product Name', 'Price', 'Origin Country', 'Rating', 'Available Quantity', 'Product Image'];
    
    // Convert products to CSV rows
    const csvRows = products.map(product => [
      product.productName,
      product.price,
      product.originCountry,
      product.rating,
      product.availableQuantity,
      product.productImage
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
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
    <div className="py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">My Exports</h1>
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

