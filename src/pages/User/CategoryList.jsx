import { useState } from "react"
import { useEffect } from "react"

const CategoryList = () => {
    const [productCategory, setProductCategory] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const response = await fetch('http://localhost:8000/api/get-category-product', {
            method: "GET",
            credentials: "include",
        })

        const { data } = await response.json()
        setLoading(false)
        setProductCategory(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    // console.log(productCategory)

    if (loading) {
        <p>loading....</p>
    }
    return (
        <div className="p-4">

            <div className="flex justify-center gap-5 overflow-auto scrollbar-none">
                {
                    productCategory?.map((p, idx) => {
                        return (
                            <div key={idx} >
                                <div className="bg-slate-200  w-14 h-14 md:w-20 md:h-20 p-3 rounded-full flex cursor-pointer justify-center items-center overflow-hidden group hover:bg-red-100 duration-200 transition">
                                    <img className=" duration-75  w-full object-scale-down mix-blend-multiply hover:scale-125" src={p?.productImage[0]} alt="img" />

                                </div>
                                <p className="text-xs md:text-base text-center">{p?.productName}</p>
                            </div>
                        )
                    }
                    )
                }


            </div>
        </div>
    )
}

export default CategoryList
