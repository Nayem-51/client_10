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
        element: <MyExports />,
      },
      {
        path: "/my-imports",
        element: <MyImports />,
      },
      {
        path: "/add-export",
        element: <AddExport />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
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
