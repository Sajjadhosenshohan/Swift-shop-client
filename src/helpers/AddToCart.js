import toast from "react-hot-toast"

const AddToCart = async (e, id) => {
  e?.preventDefault()
  e?.stopPropagation()

  const response = await fetch('http://localhost:8000/api/addToCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    
    body: JSON.stringify(
      { productId: id }
    )
  })

  const responseData = await response.json()

  if (responseData?.success) {
    toast.success(responseData.message)
  }

  if (responseData?.error) {
    toast.error(responseData.message)
  }


  return responseData
}

export default AddToCart;
