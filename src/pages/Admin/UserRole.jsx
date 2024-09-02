/* eslint-disable react/prop-types */
import { useState } from "react"
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io"

const UserRole = ({ onClose, updateUserDetails, callFunc }) => {

    const { _id, email, name, role } = updateUserDetails;
    const [userRole, setUserRole] = useState(role)

    // console.log(userRole)
    // console.log(name)
    const updateUserRole = async () => {
        const fetchData = await fetch("http://localhost:8000/api/update-user", {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: _id,
                role: userRole
            })
        })
        const updatedData = await fetchData.json()
        console.log(updatedData)
        if (updatedData.success) {
            toast.success(updatedData.message)
            onClose()
            callFunc()
        }

        console.log("role updated", updatedData)

    }


    return (
        <div className="fixed z-20 top-0 bottom-0 left-0 right-0  w-full h-full flex items-center justify-center ">
            <div className="bg-white w-full  max-w-sm p-5 shadow-md  mx-auto text-slate-700">

                <div onClick={onClose} className="flex justify-end">
                    <IoMdClose className="w-8 h-8 border border-slate-400 rounded-full bg-[#F1F5F9]" />
                </div>

                <h1 className="pb-4 text-2xl font-medium text-slate-900">Update User Role</h1>

                <div className="space-y-1">
                    <p className="text-base font-medium">Name: {name}</p>
                    <p className="text-base font-medium">Email: {email}</p>

                    <div className="flex justify-between items-center">
                        <p className="text-base font-medium">Role:</p>
                        <select onChange={(e) => setUserRole(e.target.value)} value={userRole} className="border-2 rounded border-red-600">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 ">
                    <button onClick={updateUserRole} className='mx-auto w-1/3 block px-3 py-2 text-center rounded-full text-white bg-red-600 hover:bg-red-700 ease-in-out duration-200'>
                        Login
                    </button>
                </div>


            </div>
        </div>
    )
}

export default UserRole
