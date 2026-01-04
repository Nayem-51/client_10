import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [formData, setFormData] = useState({
    name: user?.name || '',
    photoURL: user?.image || user?.photoURL || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Note: We need to use specific endpoint for update. 
      // Assuming we added PUT /users/:email or using a generic one.
      // If not, we might need to rely on the backend being updated. 
      // For now, let's try the users endpoint with PUT.
      const response = await fetch(`${API_ENDPOINTS.USERS}/${user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        const updatedUser = { ...user, name: formData.name, image: formData.photoURL };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile updated successfully!');
        // Trigger a reload or event to update navbar avatar if needed, 
        // but for now local state in dashboard layout might not update without context/refresh.
        // A simple window.location.reload() ensures consistency across the app.
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-base-100 shadow-xl overflow-hidden">
        {/* Cover / Header */}
        <div className="h-32 bg-primary/10 w-full relative">
           <div className="absolutet top-4 right-4"></div>
        </div>
        
        <div className="card-body pt-0 relative">
          {/* Avatar - Negative Margin to overlap header */}
          <div className="-mt-16 mb-4 flex justify-between items-end">
             <div className="avatar">
                <div className="w-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                  <img src={formData.photoURL || `https://ui-avatars.com/api/?name=${formData.name}`} alt="Profile" />
                </div>
             </div>
             <div className="badge badge-primary">{user?.email === 'admin@demo.com' ? 'Admin' : 'User'}</div>
          </div>

          <h2 className="card-title text-2xl">{formData.name}</h2>
          <p className="text-gray-500">{user?.email}</p>

          <div className="divider"></div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Display Name</span>
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="input input-bordered w-full" 
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input 
                type="url" 
                name="photoURL" 
                value={formData.photoURL} 
                onChange={handleChange}
                className="input input-bordered w-full" 
                placeholder="https://..."
              />
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
