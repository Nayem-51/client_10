import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddExport() {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    destination: '',
    description: '',
    price: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Export data:', formData);
    alert('Export added successfully!');
    navigate('/my-exports');
  };

  return (
    <div className="py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Export</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
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
              <button type="submit" className="btn btn-primary w-full">
                Add Export
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExport;

