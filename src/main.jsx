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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/my-exports",
        element: <PrivateRoute><MyExports /></PrivateRoute>,
      },
      {
        path: "/my-imports",
        element: <PrivateRoute><MyImports /></PrivateRoute>,
      },
      {
        path: "/add-export",
        element: <PrivateRoute><AddExport /></PrivateRoute>,
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
