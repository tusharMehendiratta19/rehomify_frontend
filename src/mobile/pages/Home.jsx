import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "../components/Carousel";
import ProductRow from "../components/ProductRow";
import CategoryButtons from "../components/CategoryButtons";
import BulkRequestForm from "../components/BulkRequestForm";
import Header from "../components/Header";
import "../../App.css"; // 👈 CSS included here as requested
import Footer from "../components/Footer";
import ExploreMore from "../components/ExploreMore";
import Blogs from "../components/Blogs";
import Testimonials from "../components/Testimonials";
import TopBlogs from "../components/TopBlogs";
import ExploreCategories from "../components/ExploreCategories";
import SpecialFurnitureOffer from "../components/SpecialFurnitureOffer";

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

   const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      const fetchHomepageData = async () => {
        try {
          const res = await axios.get('http://localhost:5000/v1/home/getHomePage');
          // console.log("response: ",res.data.products)
          setProducts(res.data.products);
          setReviews(res.data.reviews);
        } catch (err) {
          console.error('Error fetching homepage data:', err);
        }
      };
  
      fetchHomepageData();
    }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <Carousel />
      <div className="section">
        <ExploreMore />
      </div>

      <div className="section product-row-wrapper">
        {/* <ProductRow title="Products of the day" type="Products of the day" /> */}
        <ProductRow title="New Arrivals" type="New Arrivals" allproducts={products}/>
        <SpecialFurnitureOffer />
        <ExploreCategories />
      </div>

      {/* <div className="section">
        <h2><b>Categories</b></h2>
        <CategoryButtons />
      </div> */}
      <div className="section">
        <TopBlogs />
      </div>

      {/* <div className="section">
        <Blogs />
      </div> */}

        <Testimonials reviews={reviews} />

      {/* <div id="bulk-request" className="section">
        <h2>Bulk Request</h2>
        <BulkRequestForm isLoggedIn={isLoggedIn} />
      </div> */}
      <Footer />
    </div>
  );
};

export default Home;
