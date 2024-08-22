import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import ForgetPassword from "../pages/ForgetPassword";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children:[
        {
          path: "",
          element: <Home/>
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "sign-up",
          element: <SignUp/>
        },
        {
          path: "forget-password",
          element: <ForgetPassword/>
        }
      ]
    },
]);

export default router;