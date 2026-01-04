import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './Layout/Root.jsx'
import Home from './pages/Home.jsx'
import AllProducts from './pages/AllProducts.jsx'
import MyExports from './pages/MyExports.jsx'
import MyImports from './pages/MyImports.jsx'
import AddExport from './pages/AddExport.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import SignIn from './component/SignIn.jsx'
import SignUp from './component/SignUp.jsx'
import PrivateRoute from './component/PrivateRoute.jsx'
import DashboardLayout from './Layout/DashboardLayout.jsx'
import DashboardHome from './pages/DashboardHome.jsx'
import Profile from './pages/Profile.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import About from './pages/About.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/product/:id",
        element: <PrivateRoute><ProductDetails /></PrivateRoute>,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "my-exports",
        element: <MyExports />,
      },
      {
        path: "my-imports",
        element: <MyImports />,
      },
      {
        path: "add-export",
        element: <AddExport />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
