import { Link } from "react-router-dom";
import Logo from "./Logo"
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import { useCallback, useContext, useState } from "react";
import Context from "../Context/Context";

// import { setUserDetails } from "../store/userSlice";
const Header = () => {
  const dispatch = useDispatch()
  const [menu, setShowMenu] = useState(false)

  const { cartProductCount } = useContext(Context) || {};
  console.log('Cart Product:',cartProductCount );

  const user = useSelector(state => state?.usersSlice.user)

  // useCallback to memoize the handleLogout function
  const handleLogout = useCallback(async () => {
    const response = await fetch("http://localhost:8000/api/logout", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    } else if (data.error) {
      toast.error(data.message);
    }
  }, [dispatch]);

  // useCallback for toggling menu
  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  return (
    <header className="h-16 fixed w-full z-40 shadow-md bg-white">
      <div className="h-full  container mx-auto  flex justify-between items-center px-4">
        <div>
          <Link to="/"><Logo /></Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow '>

          <input type='text' placeholder='search product here...' className='w-full py-2 outline-none bg-slate-100 border-none rounded-full rounded-r-none' />


          <div className='text-lg min-w-[50px] h-10 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>



          <div onClick={toggleMenu} className='relative group  flex justify-center items-center'>

            {
              user?._id && <div className='text-3xl cursor-pointer relative flex justify-center w-8 h-8'>
                {
                  user?.profilePicture ? (
                    <img src={user?.profilePicture} className='h-full w-full rounded-full' alt={user?.name} />
                  ) : (
                    <FaRegCircleUser />
                  )
                }
              </div>
            }

            {
              menu && (
                <div className="absolute  bg-white p-2 top-11 rounded shadow-md">
                  <nav>

                    {
                      user?.role === 'admin' &&
                      <Link to="/admin-panel/products" className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'>
                        Admin panel
                      </Link>
                    }
                  </nav>
                </div>
              )
            }


          </div>
          {
            user?._id &&
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart /></span>

              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{cartProductCount || 0}</p>
              </div>
            </Link>
          }



          <div>
            {
              user ? <>
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              </> : <>
                <Link to={"/login"}>
                  <button className='px-3 py-1 text-center rounded-full text-white bg-red-600 hover:bg-red-700 ease-in-out duration-200'>
                    Login
                  </button>
                </Link>
              </>
            }


          </div>

        </div>

      </div>
    </header>
  )
}

export default Header