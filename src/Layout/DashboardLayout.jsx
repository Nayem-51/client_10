import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
    navigate('/signin');
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  // Redirect if not logged in (basic protection, PrivateRoute handles the rest)
  React.useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  if (!user) return null;

  const navLinks = [
    { name: 'Overview', path: '/dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    { name: 'My Exports', path: '/dashboard/my-exports', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
    { name: 'My Imports', path: '/dashboard/my-imports', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> },
    { name: 'Add Export', path: '/dashboard/add-export', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg> },
    { name: 'Profile', path: '/dashboard/profile', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  ];

  return (
    <div className="drawer lg:drawer-open font-sans bg-base-200">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" checked={isSidebarOpen} onChange={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-30 px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl text-primary font-bold">Export Hub</Link>
          </div>
          <div className="flex-none gap-2">
             <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.image || `https://ui-avatars.com/api/?name=${user.name}`} alt="avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><Link to="/dashboard/profile" className="justify-between">Profile <span className="badge">New</span></Link></li>
                <li><Link to="/">Home</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-10 flex-1 overflow-x-hidden">
          <Outlet />
        </div>
      </div> 

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-72 h-full bg-base-100 text-base-content border-r border-base-200">
          {/* Logo in Sidebar */}
          <li className="mb-6 z-20">
            <Link to="/" className="flex items-center gap-3 px-2 hover:bg-transparent">
               <img src="/export_logo.jpeg" alt="Logo" className="w-10 h-10 rounded-xl shadow-lg" />
               <div className="flex flex-col">
                  <span className="text-xl font-bold text-primary">Export Hub</span>
                  <span className="text-xs text-gray-400">Dashboard</span>
               </div>
            </Link>
          </li>
          
          {/* Links */}
          {navLinks.map((link) => (
            <li key={link.path} className="mb-1">
              <NavLink 
                to={link.path}
                end={link.path === '/dashboard'} 
                className={({ isActive }) => isActive ? 'active font-semibold shadow-sm' : ''}
                onClick={closeSidebar}
              >
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* Admin Section (Demo) */}
          <div className="divider my-4"></div>
          <li className="menu-title">Admin Zone</li>
          <li>
            <a className="opacity-50 cursor-not-allowed tooltip tooltip-right" data-tip="Coming soon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Manage Users
            </a>
          </li>

          <div className="mt-auto">
             <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm w-full gap-2 mt-8">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               Logout
             </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
