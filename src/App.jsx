import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { Toaster } from "react-hot-toast";
import Context from "./Context/Context";

function App() {
  const dispatch = useDispatch();
  const [cartProduct, setCartProduct] = useState([]);
  const [cartProductCount, setCartProductCount] = useState(0);

  // Fetch user details
  const userDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user-details`, {
        method: "GET",
        credentials: "include"
      });

      const dataApi = await response.json();

      if (dataApi?.success) {
        dispatch(setUserDetails(dataApi?.data));
      }

      return dataApi; // Return the fetched data if needed

    } catch (error) {
      console.error("Error fetching user details:", error);
      return null; // Return null or an appropriate value on error
    }
  };

  // Fetch user's cart data
  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/AddToCartData`, {
        method: "GET",
        credentials: "include"
      });

      const dataApi = await response.json();

      if (dataApi?.data) {
        if (dataApi?.data?.count) {
          setCartProductCount(dataApi.data.count);
        }

        if (dataApi?.data?.AddedProduct) {
          setCartProduct(dataApi.data.AddedProduct); // Update cart products here
        }
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Fetch both user details and cart data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const userFetchedData = await userDetails(); // Wait for user details to load
      if (userFetchedData?.success) { // Only fetch cart data if user details fetched successfully
        await fetchUserAddToCart(); // Then load the cart data
      }
    };

    fetchData(); // Call the async function
  }, [dispatch]); // Ensure dispatch is included in the dependency array



  const info = {
    userDetails,
    fetchUserAddToCart,
    cartProduct,
    cartProductCount
  };

  return (
    <>

      <Context.Provider value={info}>
        <Toaster position="top-center" />

        <Header />
        <div className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </div>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App;
