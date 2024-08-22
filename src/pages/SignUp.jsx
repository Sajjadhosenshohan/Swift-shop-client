import { useState } from "react"
import loginLogo from "../assest/signin.gif"
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageToBase64 from "../helpers/ImageToBase64";
const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePicture: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value)
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  const handleProfile = async (e) => {
    const file = e.target.files[0]

    const data = await imageToBase64(file)
    console.log(data)
    setData((prev) => {
      return {
        ...prev,
        profilePicture: data
      }
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  console.log(`data getting ${data.profilePicture}`)
  return (
    <section id="login">
      <div className="bg-white container max-w-lg my-10 mx-auto">
        <div className="p-4">

          {/* logo */}
          <div className="w-20 h-20 mx-auto my-5 rounded-full relative overflow-hidden cursor-pointer">
            <div>
              <img src={ data.profilePicture || loginLogo} alt="" className="w-full h-full" />
            </div>

            <form>
              <label>
                <div className="bg-slate-200 w-full text-center text-xs absolute pb-4 pt-2 bottom-0 bg-opacity-80">
                  Upload Photo
                </div>

                <input onChange={handleProfile} type="file" name="" className="hidden" />
              </label>
            </form>

          </div>

          {/* form */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">

              <div>
                <label htmlFor="name">Name: </label><br />
                <div id="name" className="bg-slate-200 rounded-sm p-1">
                  <input onChange={handleOnChange} value={data.name} name="name" type="text" placeholder="Enter your name" className="h-full w-full outline-none bg-transparent border-none " />
                </div>
              </div>

              <div>
                <label htmlFor="email">Email: </label><br />
                <div id="email" className="bg-slate-200 rounded-sm p-1">
                  <input onChange={handleOnChange} value={data.email} name="email" type="text" placeholder="Enter your email" className="h-full w-full outline-none bg-transparent border-none " />
                </div>
              </div>

              <div>
                <label htmlFor="password">Password: </label> <br />
                <div id="password" className="bg-slate-200 rounded-sm p-1 flex relative">
                  <input onChange={handleOnChange} value={data.password} name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="h-full w-full outline-none bg-transparent border-none" />

                  <div className="cursor-pointer absolute top-[30%] right-[5%]" onClick={() => setShowPassword(!showPassword)}>
                    {
                      showPassword ? <FaEyeSlash className="w-full h-full text-2xl" /> : <FaEye className="w-full h-full text-2xl" />
                    }
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm password: </label> <br />
                <div id="confirmPassword" className="bg-slate-200 rounded-sm p-1 flex relative">
                  <input onChange={handleOnChange} value={data.confirmPassword} name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Enter your confirm password" className="h-full w-full outline-none bg-transparent border-none" />

                  <div className="cursor-pointer absolute top-[30%] right-[5%]" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {
                      showConfirmPassword ? <FaEyeSlash className="w-full h-full text-2xl" /> : <FaEye className="w-full h-full text-2xl" />
                    }
                  </div>
                </div>
              </div>

              <div>
                <Link to="/forget-password">
                  <span className="underline transition-all hover:text-red-500">Forget password</span>
                </Link>
              </div>

              <div className="">
                <button className="primaryBgColor text-white px-6 py-2 rounded-full mt-6 w-1/2 mx-auto block  hover:scale-105 transition-all hover:bg-red-700">Sign up</button>
              </div>

              <div>
                <p className="mt-5 text-center">Already have account? <Link to="/login" className="underline hover:text-primaryColor transition-all">login</Link></p>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp

