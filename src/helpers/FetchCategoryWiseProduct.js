
const FetchCategoryWiseProduct = async (category) => {
  const response = await fetch('http://localhost:8000/api/get-category-wise-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category: category })
  })

  const dataResponse = await response.json()
  console.log(dataResponse)

  return dataResponse
}

export default FetchCategoryWiseProduct
