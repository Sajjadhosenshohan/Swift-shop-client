import moment from "moment"
import { useEffect, useState } from "react"
import '../../App.css';
import { CiEdit } from "react-icons/ci";
import UserRole from "./UserRole";
const AllUser = () => {
  const [allUser, setAllUser] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)

  // update user
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  })

  console.log(updateUserDetails)



  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/all-user", {
      method: "GET",
      credentials: "include"
    })
    const { data } = await response.json()
    setAllUser(data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  // console.log(allUser)
  return (
    <div className="p-6 ">
      <table className="w-full text-sm text-left text-gray-500 bg-white">
        <thead className="tableStyle text-xs text-gray-700 uppercase ">
          <tr>
            <th scope="col" className="px-2 py-4">#</th>
            <th scope="col" className="px-2 py-4">Name</th>
            <th scope="col" className="px-2 py-4">Profile</th>
            <th scope="col" className="px-2 py-4">Email</th>
            <th scope="col" className="px-2 py-4">Role</th>
            <th scope="col" className="px-2 py-4">createdAt</th>
            <th scope="col" className="px-2 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map(({ _id, role, profilePicture, createdAt, name, email }, index) => (
            <tr key={_id} className="bg-white border-b space-y-4 hover:bg-gray-50">
              <td className="text-center">{index}</td>
              <td>{name}</td>
              <th scope="row" className="flex items-center justify-center text-gray-900 ">
                <img className="w-10 h-10 rounded-full object-contain" src={profilePicture} alt={`${name} image`} />
              </th>

              <td>{email}</td>
              <td >

                <div
                  className={` rounded-full ${role === "user" ? "bg-green-500" : "bg-red-500"
                    } me-2`}
                ></div>
                {role}

              </td>
              <td >{moment(createdAt).format('ll')}</td>

              <td >
                <button onClick={() => {
                  setOpenUpdateRole(true)
                  setUpdateUserDetails({email,name,role,_id})
                }
                } type="button" className="text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white  focus:outline-none font-medium rounded-full text-sm p-2 text-center inline-flex items-center ">
                  <CiEdit className="text-xl" />
                  <span className="sr-only">Icon description</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        {/* modal */}
        {
          openUpdateRole && <UserRole callFunc={fetchData} updateUserDetails={updateUserDetails} onClose={() => setOpenUpdateRole(false)} />
        }
      </table>
    </div>
  )
}

export default AllUser
