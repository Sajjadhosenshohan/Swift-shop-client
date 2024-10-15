import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import ForgetPassword from "../pages/ForgetPassword";
import Admin from "../pages/Admin/Admin";
import AllUser from "../pages/Admin/AllUser";
import Products from "../pages/Admin/Products";
import ProductDetails from "../pages/User/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "forget-password",
        element: <ForgetPassword />
      },
      {
        path: "/product/:id",
        element: <ProductDetails />
      },
      {
        path: "/admin-panel",
        element: <Admin />,
        children: [
          {
            path: "all-user",
            element: <AllUser />
          },
          {
            path: "products",
            element: <Products />
          },
        ]
      },
    ]
  },
]);

export default router;