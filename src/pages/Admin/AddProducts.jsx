/* eslint-disable react/prop-types */
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import productCategory from "../../helpers/ProductsCategory"
import { FaCloudUploadAlt } from "react-icons/fa"
import UploadImage from "../../helpers/UploadImage"
import DisplayImage from "./DisplayImage"
import { MdDelete } from "react-icons/md"
import toast from "react-hot-toast"
const initial = {
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",

}
const AddProducts = ({ onClose,fetchAllProduct }) => {

    const [data, setData] = useState(initial)
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await UploadImage(file)
        // console.log(uploadImageCloudinary)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary?.url]
            }
        })
    }

    const handleImageDelete = (index) => {
        setData((prev) => {

            const image = data?.productImage.filter((_, idx) => idx !== index)
            // console.log(`index : ${index}, image: ${image}`)
            return {
                ...prev,

                productImage: image
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const productName = form.productName.value;
        const brandName = form.brandName.value;
        const category = form.category.value;
        const productImage = data?.productImage;
        const description = form.description.value;
        const price = form.price.value;
        const sellingPrice = form.sellingPrice.value;

        const info = { productName, brandName, category, productImage, description, price, sellingPrice }

        // console.log(info)

        const response = await fetch("http://localhost:8000/api/upload-product", {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        })

        const uploadRes =  await response.json()
        // console.log(uploadRes?.data)

        if(uploadRes.success){
            toast.success(uploadRes.message)
            onClose()
            fetchAllProduct()
        }
        if(uploadRes.error){
            toast.error(uploadRes.message)

        }

    }

    
    return (
        <div className="fixed bg-slate-200 bg-opacity-70 z-20 top-0 right-0 left-0 bottom-0 flex justify-center items-center">
            <div className="bg-white p-5 rounded-sm w-full max-w-[80%] h-full max-h-[80%]  text-slate-700">

                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg text-slate-900">Add Products</h2>

                    <div onClick={onClose} className="flex justify-end">
                        <IoMdClose className="w-8 h-8  hover:bg-red-100 hover:text-red-500 rounded-full bg-[#F1F5F9]" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="overflow-y-auto h-full pt-4 pb-10">
                    <div className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="productName">Product Name: </label><br />
                            <div className="bg-slate-200 rounded-sm p-1">
                                <input id="productName" defaultValue={data?.productName} name="productName" type="text" placeholder="Enter your productName" className="h-full w-full outline-none bg-transparent border-none " />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="brandName">Brand Name: </label><br />
                            <div id="brandName" className="bg-slate-200 rounded-sm p-1">
                                <input defaultValue={data?.brandName} name="brandName" type="text" placeholder="Enter your brandName" className="h-full w-full outline-none bg-transparent border-none " />
                            </div>
                        </div>

                        <div>

                            <label htmlFor="category">Category: </label><br />
                            <select id="category" required defaultValue={data?.category} name='category' className='p-2 bg-slate-200 rounded-sm h-full w-full outline-none border-none '>
                                <option defaultValue={""}>Select Category</option>
                                {
                                    productCategory.map((el, index) => {
                                        return (
                                            <option value={el.value} key={index}>{el.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <label htmlFor="productImage">Product Image: </label><br />
                            <div id="productImage" className="bg-slate-200 rounded-sm p-1">

                                <label htmlFor='uploadImageInput'>
                                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                            <span className='text-4xl'><FaCloudUploadAlt /></span>
                                            <p className='text-sm'>Upload Product Image</p>
                                            <input onChange={handleUploadProduct} type='file' id='uploadImageInput' name="productImage" className='hidden' />
                                        </div>
                                    </div>
                                </label>
                            </div>


                        </div>
                        {/* preview image */}
                        <div>
                            {
                                data?.productImage ? (
                                    <div className="flex  gap-4">
                                        {
                                            data.productImage.map((img, index) => {

                                                return <div className="relative group" key={index}>
                                                    <img
                                                        width={80}
                                                        height={80}

                                                        src={img}
                                                        alt="image"
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(img)
                                                        }}

                                                    />

                                                    <div onClick={() => handleImageDelete(index)} className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'>
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                ) : (
                                    <p className="text-red-600 text-xs">* upload image</p>
                                )
                            }
                        </div>
                        <div>
                            <label htmlFor="description">Description: </label><br />
                            <div id="description" className="bg-slate-200 rounded-sm p-1">
                                {/* <input name="description" type="text" placeholder="Enter your description" className="h-full w-full outline-none bg-transparent border-none " /> */}
                                <textarea
                                    className='h-28 bg-slate-100 border resize-none  w-full outline-none bg-transparent border-none  '
                                    placeholder='enter product description'
                                    rows={3}
                                    name='description'
                                    defaultValue={data?.description}
                                >
                                </textarea>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="price">Price: </label><br />
                            <div id="price" className="bg-slate-200 rounded-sm p-1">

                                <input
                                    type='number'

                                    placeholder='enter price'
                                    defaultValue={data?.price}
                                    name='price'
                                    className='h-full w-full outline-none bg-transparent border-none '
                                    required
                                />
                            </div>



                        </div>
                        <div>
                            <label htmlFor="selling">Selling: </label><br />
                            <div id="selling" className="bg-slate-200 rounded-sm p-1">
                                {/* <input name="selling" type="text" placeholder="Enter your selling" className="h-full w-full outline-none bg-transparent border-none " /> */}
                                <input
                                    type='number'
                                    id='sellingPrice'
                                    placeholder='enter selling price'
                                    defaultValue={data?.sellingPrice}
                                    name='sellingPrice'
                                    className='h-full w-full outline-none bg-transparent border-none '
                                    required
                                />
                            </div>

                        </div>


                        <div>
                            <button type="submit" className="btn btn-form">Add Product</button>
                        </div>

                    </div>
                </form>
            </div>

            {/***display image full screen */}
            {
                openFullScreenImage && (
                    <DisplayImage setOpenFullScreenImage={setOpenFullScreenImage} imgUrl={fullScreenImage} />
                )
            }

            

        </div>
    )
}

export default AddProducts
