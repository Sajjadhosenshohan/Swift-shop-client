import { useEffect, useState } from "react"
import AddProducts from "./AddProducts"
import AllProductCard from "./AllProduct"

const Products = () => {

  const [modal, setModal] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const onClose = () => {
    setModal(false)
  }

  const fetchAllProduct = async () => {
    const response = await fetch("http://localhost:8000/api/get-all-product", {
      method: "GET",
      credentials: "include",
    })

    const getData = await response.json()
    setAllProduct(getData.data)
    console.log(getData.data)
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])


  return (
    <div className="p-6">
      <div className="bg-white  rounded flex justify-between items-center p-2">
        <h2>All Products: 40</h2>
        <button onClick={() => setModal(true)} className="border-2 border-[rgb(224,36,36)]  px-6 py-2 rounded-full  block  transition-all text-red-600 hover:text-white hover:bg-red-600">
          Add Product
        </button>
      </div>


      {/**all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct?.map((product, index) => {
            return (
              <AllProductCard data={product} key={index} fetchAllProduct={fetchAllProduct}/>

            )
          })
        }
      </div>



      {/* upload product */}
      {
        modal && <AddProducts onClose={onClose} fetchAllProduct={fetchAllProduct}/>
      }
    </div>
  )
}

export default Products
