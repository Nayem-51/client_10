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
        console.log('Imports data:', data.data);
        data.data?.forEach(item => {
          console.log('Import item productId:', item.productId);
        });
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
    <div className="py-4 px-2 sm:px-4 md:py-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">My Imports</h1>

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
                <th>1. Product Image</th>
                <th>2. Product Name</th>
                <th>3. Price</th>
                <th>4. Rating</th>
                <th>5. Origin Country</th>
                <th>6. Remove</th>
                <th>7. Imported Quantity</th>
                <th>8. See Details</th>
              </tr>
            </thead>
            <tbody>
              {imports.map((importItem, index) => (
                <tr key={importItem._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-base-200 shrink-0">
                      <img 
                        src={importItem.productImage || 'https://via.placeholder.com/64x64?text=No+Image'} 
                        alt={importItem.productName}
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
                  <td className="font-semibold">{importItem.productName}</td>
                  <td className="text-primary font-bold">${importItem.price}</td>
                  <td>⭐ {importItem.rating}</td>
                  <td>{importItem.originCountry}</td>
                  <td>
                    <button 
                      className="btn btn-xs btn-error"
                      onClick={() => handleRemove(importItem._id)}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <span className="badge badge-success">{importItem.importedQuantity} units</span>
                  </td>
                  <td>
                    <Link 
                      to={`/product/${importItem.productId}`}
                      className="btn btn-xs btn-info"
                      onClick={(e) => {
                        console.log('Clicking See Details for productId:', importItem.productId);
                        if (!importItem.productId) {
                          e.preventDefault();
                          toast.error('Product ID not found. Please contact support.');
                        }
                      }}
                    >
                      See Details
                    </Link>
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
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-base-200">
                    <img 
                      src={importItem.productImage || 'https://via.placeholder.com/96x96?text=No+Image'} 
                      alt={importItem.productName}
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
                    <h3 className="font-bold text-lg">{importItem.productName}</h3>
                    <p className="text-primary font-bold text-xl">${importItem.price}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">4. Rating:</span>
                    <span>⭐ {importItem.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">5. Country:</span>
                    <span className="font-semibold">{importItem.originCountry}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <button 
                    className="btn btn-sm btn-error w-full"
                    onClick={() => handleRemove(importItem._id)}
                  >
                    6. Remove
                  </button>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-70">7. Imported:</span>
                    <span className="badge badge-success">{importItem.importedQuantity} units</span>
                  </div>
                  <Link 
                    to={`/product/${importItem.productId}`}
                    className="btn btn-sm btn-info w-full"
                    onClick={(e) => {
                      console.log('Mobile - Clicking See Details for productId:', importItem.productId);
                      if (!importItem.productId) {
                        e.preventDefault();
                        toast.error('Product ID not found. Please contact support.');
                      }
                    }}
                  >
                    8. See Details
                  </Link>
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

