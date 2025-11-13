import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyImports() {
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyImports();
  }, []);

  const fetchMyImports = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!user.email) {
        navigate('/signin');
        return;
      }

      const response = await fetch(`http://localhost:3000/imports/${user.email}`);
      const data = await response.json();

      if (response.ok) {
        setImports(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch imports');
      }
    } catch (err) {
      console.error('Error fetching imports:', err);
      setError('Network error. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this import?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/imports/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Import removed successfully!');
        fetchMyImports(); // Refresh list
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to remove import');
      }
    } catch (err) {
      console.error('Error removing import:', err);
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
      <h1 className="text-3xl font-bold mb-6">My Imports</h1>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}
      
      {imports.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-4">No imports yet</p>
          <p className="text-gray-600">Start importing products from the All Products page</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Origin</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {imports.map((importItem, index) => (
                <tr key={importItem._id}>
                  <th>{index + 1}</th>
                  <td>{importItem.productName}</td>
                  <td>
                    <img 
                      src={importItem.productImage || 'https://via.placeholder.com/48x48?text=No+Image'} 
                      alt={importItem.productName}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                      }}
                    />
                  </td>
                  <td>${importItem.price}</td>
                  <td>{importItem.importedQuantity}</td>
                  <td>{importItem.originCountry}</td>
                  <td>⭐ {importItem.rating}</td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-xs btn-error"
                        onClick={() => handleRemove(importItem._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyImports;

