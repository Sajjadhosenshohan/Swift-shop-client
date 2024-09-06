/* eslint-disable react/prop-types */
// import { useState } from 'react'
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import EditProduct from "./EditProduct";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';

const AllProductCard = ({ data , fetchAllProduct}) => {
    const [editProduct,setEditProduct] = useState(false)
    // console.log(data?.productImage)

    return (
        <div className='bg-white p-4 rounded group'>
            <div className='w-40 space-y-1'>

                <div className='flex justify-center items-center hover:scale-105 transition-all duration-100  '>
                    <img src={data?.productImage[0]} className=' w-32 h-32 object-fill ' />
                </div>

                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>

                    <p className='font-semibold'>
                        $ {data.sellingPrice}
                    </p>

                    <div onClick={()=>setEditProduct(true)} className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-500 rounded-full hover:text-white cursor-pointer' >
                        <MdModeEditOutline />
                    </div>

                </div>


            </div>

            {
                editProduct && (
                    <EditProduct productData={data} onClose={() => setEditProduct(false)} fetchAllProduct={fetchAllProduct} />
                )
            }

        </div>
    )
}

export default AllProductCard