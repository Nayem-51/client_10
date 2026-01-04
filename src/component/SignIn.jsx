import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-toastify';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    document.title = 'Sign In - Export Hub';
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDemoLogin = (role) => {
    if (role === 'user') {
      setFormData({ email: 'demo123@gmail.com', password: 'Nayem1234@' });
    } else {
      setFormData({ email: 'admin@demo.com', password: 'Password123!' });
    }
    toast.info(`Credentials filled for ${role === 'user' ? 'Demo User' : 'Demo Admin'}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token || 'dummy-token');
        localStorage.setItem('user', JSON.stringify(data.user || { email: formData.email, name: formData.email.split('@')[0] }));
        toast.success(`Welcome back, ${data.user.name || 'User'}!`);
        navigate(from, { replace: true });
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
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
      
      // Sync with backend
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
        console.warn('Backend sync failed:', backendError);
      }
      
      toast.success('Google sign-in successful!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card lg:card-side bg-base-100 shadow-2xl w-full max-w-5xl overflow-hidden rounded-2xl animate-fade-in-up">
        
        {/* Left Side - Image & Branding */}
        <div className="lg:w-1/2 relative hidden lg:block">
          <img 
            src="/auth_bg.png" 
            alt="Login Background" 
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center text-primary-content p-12 text-center backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-4">Export Hub</h1>
            <p className="text-lg opacity-90 max-w-md">
              Connecting global markets. Secure, efficient, and reliable trading platform for exporters and importers.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="card-body lg:w-1/2 p-8 sm:p-12 bg-white text-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-500 mt-2">Access your account to manage trades</p>
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
              <label className="label pl-0 justify-between">
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
               <label className="label pl-0 pt-1">
                <a href="#" className="label-text-alt link link-primary hover:text-primary-focus">Forgot password?</a>
              </label>
            </div>

            {/* Demo Credentials Buttons */}
            <div className="flex gap-2 mb-2">
              <button 
                type="button"
                onClick={() => handleDemoLogin('user')}
                className="btn btn-xs btn-outline btn-info flex-1"
              >
                Demo User
              </button>
              <button 
                type="button"
                onClick={() => handleDemoLogin('admin')} 
                className="btn btn-xs btn-outline btn-warning flex-1"
              >
                Demo Admin
              </button>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full text-lg shadow-lg hover:shadow-primary/40 normal-case" 
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Login'}
            </button>
          </form>

          <div className="divider text-gray-400">OR</div>

          <button 
            type="button" 
            className="btn btn-outline w-full hover:bg-gray-50 hover:text-gray-900 border-gray-300 normal-case"
            onClick={handleGoogleSignIn}
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
                <span>Continue with Google</span>
              </div>
            )}
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="link link-primary font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
