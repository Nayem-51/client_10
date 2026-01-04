import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-toastify';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign Up - Export Hub';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push('At least 6 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(formData.password)) {
      setError('Please fix password issues.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.USERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          photoURL: formData.photoURL,
          password: formData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token || 'user-token');
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          image: formData.photoURL
        }));
        toast.success(`Welcome aboard, ${formData.name}!`);
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email,
        image: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}`
      };
      
      localStorage.setItem('token', user.accessToken || 'google-auth-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      try {
        await fetch(API_ENDPOINTS.USERS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: user.displayName || user.email,
            email: user.email,
            photoURL: user.photoURL,
            googleAuth: true,
            uid: user.uid
          }),
        });
      } catch (backendError) {
        console.warn('Backend sync error:', backendError);
      }
      
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Google sign-up error:', err);
      setError('Failed to sign up with Google.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card lg:card-side bg-base-100 shadow-2xl w-full max-w-5xl overflow-hidden rounded-2xl animate-fade-in-up">
        
        {/* Left Side - Image & Branding (Reused for consistency) */}
        <div className="lg:w-1/2 relative hidden lg:block">
          <img 
            src="/auth_bg.png" 
            alt="Register Background" 
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center text-primary-content p-12 text-center backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-4">Join Export Hub</h1>
            <p className="text-lg opacity-90 max-w-md">
              Start your global trading journey today. Sign up to access exclusive features and manage your listings.
            </p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="card-body lg:w-1/2 p-8 sm:p-12 bg-white text-gray-800">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2">Fill in your details to get started</p>
          </div>

          {error && (
            <div className="alert alert-error mb-6 shadow-md rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label pl-0">
                <span className="label-text font-semibold text-gray-700">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Ex: John Doe"
                className="input input-bordered w-full focus:input-primary bg-gray-50"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label pl-0">
                <span className="label-text font-semibold text-gray-700">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Ex: john@example.com"
                className="input input-bordered w-full focus:input-primary bg-gray-50"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label pl-0">
                <span className="label-text font-semibold text-gray-700">Photo URL (Optional)</span>
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://..."
                className="input input-bordered w-full focus:input-primary bg-gray-50"
                value={formData.photoURL}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text font-semibold text-gray-700">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:input-primary bg-gray-50"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text font-semibold text-gray-700">Confirm</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:input-primary bg-gray-50"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Strength Indicators */}
            {passwordErrors.length > 0 && formData.password && (
              <div className="text-xs text-error space-y-1 mt-1">
                {passwordErrors.map((err, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    {err}
                  </div>
                ))}
              </div>
            )}
            
            {passwordErrors.length === 0 && formData.password.length > 0 && (
               <div className="text-xs text-success flex items-center gap-1 mt-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                 Strong password
               </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary w-full text-lg shadow-lg hover:shadow-primary/40 mt-4 normal-case" 
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Create Account'}
            </button>
          </form>

          <div className="divider text-gray-400">OR</div>

          <button 
            type="button" 
            className="btn btn-outline w-full hover:bg-gray-50 hover:text-gray-900 border-gray-300 normal-case"
            onClick={handleGoogleSignUp}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Sign up with Google</span>
              </div>
            )}
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="link link-primary font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

