
import BannerProduct from "./BannerProduct"
import CategoryProductCard from "./CategoryProductCard"
import CategoryList from "./User/CategoryList"
import VerticalCategoryProduct from "./VerticalCategoryProduct"


const Home = () => {

  return (
    <div className="container mx-auto py-4">

      {/* category list */}
      <CategoryList />
      {/* banner */}
      <div className="container mx-auto overflow-hidden">
        <BannerProduct />
      </div>

      {/* category wise card */}
      <CategoryProductCard category={"watches"} heading={"Top's watches"} />
      <CategoryProductCard category={"tv"} heading={"Popular's Tv"} />

      <VerticalCategoryProduct category={"camera"} heading={"Camera"}/>
      <VerticalCategoryProduct category={"speakers"} heading={"Speakers"}/>

    </div>
  )
}

export default Home