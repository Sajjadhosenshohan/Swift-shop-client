import { useContext, useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import Context from '../../Context/Context';

const AddToCartProduct = () => {
    const [loading, setLoading] = useState(true); // Start loading true
    const context = useContext(Context) || {}; // Get cart data from context
    const loadingCart = new Array(4).fill(null);
    console.log(context?.cartProductCount, context?.cartProduct);

    // Simulate loading data when the component mounts
    useEffect(() => {
        const loadData = async () => {
            // Simulate fetching data here if needed
            setLoading(false); // Set loading to false after fetching data
        };
        loadData();
    }, []);

    // Function to delete a product
    const deleteCartProduct = (productId) => {
        // removeProduct(productId); // Call the remove function from context
    };

    // Functions to increase/decrease quantity
    const increaseQty = (productId) => {
        // updateQuantity(productId, 1); // Call the update quantity function from context
    };

    const decreaseQty = (productId) => {
        // updateQuantity(productId, -1); // Call the update quantity function from context
    };

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {context?.cartProductCount === 0 && <p className='bg-white py-5'>No Data</p>}
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* View Products */}
                <div className='w-full max-w-3xl'>
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        context?.cartProduct?.map((product) => (
                            <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    {product?.productId?.productImage?.length > 0 ? (
                                        <img
                                            src={product.productId.productImage[0]}
                                            className='w-full h-full object-scale-down mix-blend-multiply'
                                            alt={product?.productId?.productName}
                                        />
                                    ) : (
                                        <div className='flex items-center justify-center h-full'>No Image</div>
                                    )}
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/* Delete Product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                        <MdDelete />
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>{product?.productId?.sellingPrice}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>{product?.productId?.sellingPrice * product?.quantity}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button
                                            className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                            onClick={() => decreaseQty(product?._id)}
                                        >
                                            -
                                        </button>
                                        <span>{product?.quantity}</span>
                                        <button
                                            className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                            onClick={() => increaseQty(product?._id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Quantity</p>
                                <p>{context?.cartProductCount}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{context?.cartProduct?.reduce((total, product) => total + (product?.productId?.sellingPrice * product?.quantity || 0), 0)}</p>
                            </div>
                            <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddToCartProduct;
