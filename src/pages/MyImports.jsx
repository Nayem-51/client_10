import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function MyImports() {
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Imports - Export Hub';
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
        toast.success('Import removed successfully!');
        fetchMyImports(); // Refresh list
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to remove import');
      }
    } catch (err) {
      console.error('Error removing import:', err);
      toast.error('Network error. Please try again.');
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
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Origin Country</th>
                <th>Imported Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {imports.map((importItem, index) => (
                <tr key={importItem._id}>
                  <th>{index + 1}</th>
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
                  <td className="font-semibold">{importItem.productName}</td>
                  <td className="text-primary font-bold">${importItem.price}</td>
                  <td>⭐ {importItem.rating}</td>
                  <td>{importItem.originCountry}</td>
                  <td>
                    <span className="badge badge-success">{importItem.importedQuantity} units</span>
                  </td>
                  <td>
                    <div className="flex flex-col gap-2">
                      <button 
                        className="btn btn-xs btn-error"
                        onClick={() => handleRemove(importItem._id)}
                      >
                        Remove
                      </button>
                      <Link 
                        to={`/product/${importItem.productId}`}
                        className="btn btn-xs btn-info"
                      >
                        See Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden grid grid-cols-1 gap-4">
          {imports.map((importItem, index) => (
            <div key={importItem._id} className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img 
                    src={importItem.productImage || 'https://via.placeholder.com/80x80?text=No+Image'} 
                    alt={importItem.productName}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{importItem.productName}</h3>
                    <p className="text-primary font-bold text-xl">${importItem.price}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">Rating:</span>
                    <span>⭐ {importItem.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Country:</span>
                    <span className="font-semibold">{importItem.originCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Imported:</span>
                    <span className="badge badge-success">{importItem.importedQuantity} units</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link 
                    to={`/product/${importItem.productId}`}
                    className="btn btn-sm btn-info flex-1"
                  >
                    See Details
                  </Link>
                  <button 
                    className="btn btn-sm btn-error flex-1"
                    onClick={() => handleRemove(importItem._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
}

export default MyImports;

