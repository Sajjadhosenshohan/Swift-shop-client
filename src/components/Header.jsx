import { Link } from "react-router-dom";
import Logo from "./Logo"
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full  container mx-auto  flex justify-between items-center px-4">
        <div>
          <Link to=""><Logo /></Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow '>

          <input type='text' placeholder='search product here...' className='w-full py-2 outline-none bg-slate-100 border-none rounded-full rounded-r-none' />


          <div className='text-lg min-w-[50px] h-10 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>


            <div className='text-3xl cursor-pointer relative flex justify-center'>
              <FaRegCircleUser />
            </div>




            {/* {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }

                  </nav>
                </div>
              )
            } */}

          </div>


          <Link to={"/cart"} className='text-2xl relative'>
            <span><FaShoppingCart /></span>

            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </Link>

            

          <div>

            {/* <button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button> */}

            <Link to={"/login"}>
              <button className='px-3 py-1 text-center rounded-full text-white bg-red-600 hover:bg-red-700 ease-in-out duration-200'>
                Login
              </button>
            </Link>

          </div>

        </div>

      </div>
    </header>
  )
}

export default Header