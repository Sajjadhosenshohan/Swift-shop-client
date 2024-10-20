import { useContext, useState } from "react"
import loginLogo from "../assest/signin.gif"
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Context from "../Context/Context";
const Login = () => {
    const navigate = useNavigate()
    const { userDetails,fetchUserAddToCart } = useContext(Context)

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({ email: "", password: "" })

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const signInResponse = await fetch("http://localhost:8000/api/signIn", {
            credentials: 'include',
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await signInResponse.json()

        if (dataApi?.success) {
            toast.success(dataApi.message)
            navigate('/')
            userDetails()
            fetchUserAddToCart()

        }

        if (dataApi?.error) {
            toast.error(dataApi.message)
        }

    }

    console.log(`data getting ${data.email}`)
    // [name]: value একটি JavaScript এর ES6 ফিচার, যাকে Computed Property Name বলা হয়। এটি অবজেক্ট লিটারেলে ডাইনামিকভাবে প্রপার্টির নাম সেট করার জন্য ব্যবহৃত হয়।
    return (
        <section id="login">
            <div className="bg-white container max-w-lg my-10 mx-auto">
                <div className="p-4">
                    {/* logo */}
                    <div className="w-20 h-20 mx-auto my-5 rounded-full overflow-hidden">
                        <img src={loginLogo} alt="" className="w-full h-full" />
                    </div>

                    {/* form */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3">
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
                                <Link to="/forget-password">
                                    <span className="underline transition-all hover:text-red-500">Forget password</span>
                                </Link>
                            </div>

                            <div className="">
                                <button className="btn btn-form">login</button>
                            </div>

                            <div>
                                <p className="mt-5 text-center">Don&apos;t have account? <Link to="/sign-up" className="underline hover:text-primaryColor transition-all">Sign up</Link></p>
                            </div>

                            {/* sigma rule (1) : if u use space-y-2 class in parent tag then the child element margin top will not work
                            
                            (2): margin will not work with span tag*/}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login
