import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import '../../App.css';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserPen } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { useEffect } from "react";
const Admin = () => {
    const user = useSelector(state => state?.usersSlice.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user?.role !== 'admin'){
            navigate("/")
        }
    },[user])
    // console.log(user)
    return (
        <div className="flex min-h-[calc(100vh-120px)]">

            <aside className="bg-white  p-4 max-w-60 w-full min-h-full customShadow">
                {/* profile logo */}
                <div className=" h-20 flex gap-3 items-center">
                    <div className='text-[40px] w-14 h-14 rounded-full  border-2 border-red-600 cursor-pointer relative flex justify-center items-center'>
                        {
                            user?.profilePicture ? (
                                <img src={user?.profilePicture} className='h-full w-full rounded-full object-contain' alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800 text-base capitalize">{user?.name}</h2>
                        <p className="text-slate-500 text-sm ">{user?.role}</p>
                    </div>

                </div>

                {/* navigation link */}
                <nav className="mt-4 text-slate-800">
                    <Link to='all-user'>
                        <p className="hover:bg-red-100 hover:text-red-500 p-2 rounded-md flex items-center gap-3">
                            <span ><FaUserPen className="text-xl"/></span>
                            <span>All user</span>
                        </p>
                    </Link>
                    
                    <Link to='products'>
                        <p className="hover:bg-red-100 hover:text-red-500 p-2 rounded-md flex items-center gap-3">
                            <span className="text-xl"><TiShoppingCart/></span>
                            <span>Products</span>
                        </p>
                    </Link>
                </nav>
            </aside>

            <main className=" flex-1">
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default Admin
