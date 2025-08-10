import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../allStyles/productpage.css';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import EMIPanel from './EMIPanel';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showEMI, setShowEMI] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const isLoggedIn = !!localStorage.getItem("token") && !!localStorage.getItem("custId");
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState('');
  const [optionalImages, setOptionalImages] = useState([]);
  const alltheproducts = location.state?.allProducts || [];
  const [selectedVariety, setSelectedVariety] = useState(null);


  const similarProducts = [
    { id: 1, name: 'Product A', price: 999, description: 'Description A', image: 'https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg' },
    { id: 2, name: 'Product B', price: 1299, description: 'Description B', image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg' },
    { id: 3, name: 'Product C', price: 899, description: 'Description C', image: 'https://images.pexels.com/photos/7602930/pexels-photo-7602930.jpeg' },
    { id: 4, name: 'Product D', price: 699, description: 'Description D', image: 'https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg' }
  ];

  const products = {
    images: [
      mainImage,
      ...optionalImages.map(img => img.url || img)
    ]
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("https://rehomify.in/v1/products/");
        const allProducts = Object.values(res.data).flat();
        const found = allProducts.find(p => p.id === id);

        if (found) {
          setProduct(found);
          setSelectedImage(found.image);
          setMainImage(found.image);
          setOptionalImages(found.optionalImages || []);

          // ✅ Default to first variety if price is null
          if (found.varieties && found.varieties.length > 0) {
            setSelectedVariety(found.varieties[0]);
          }
        } else {
          console.warn("Product not found for id:", id);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    const fetchCustomerDetails = async () => {
      try {
        const res = await axios.get(
          `https://rehomify.in/v1/auth/getCustomerDetails/${localStorage.getItem("custId")}`
        );
        if (res.data?.status) {
          const { cart = [], wishlist = [] } = res.data.data;
          setCartItems(cart.map(p => p.productId));
          setWishlist(wishlist.map(p => p.productId));
        }
      } catch (err) {
        console.error("Error fetching customer details:", err);
      }
    };

    fetchProduct();
    if (isLoggedIn) {
      fetchCustomerDetails();
    }
  }, [id]);


  // const showSnackbar = (message) => {
  //   setSnackbarMessage(message);
  //   setSnackbarOpen(true);
  //   setTimeout(() => setSnackbarOpen(false), 3000); // auto hide in 3s
  // };

  const addToCart = async (productId) => {
    if (!localStorage.getItem("token") || !localStorage.getItem("custId")) {
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Please login to add products to cart", type: "error" }
      }));
      return;
    }
    try {
      const response = await axios.post('https://rehomify.in/v1/cart/addToCart', {
        custId: localStorage.getItem("custId"),
        productId: productId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status) {
        window.dispatchEvent(new CustomEvent("snackbar", {
          detail: { message: "Added to Cart", type: "success" }
        }));
        setTimeout(() => window.location.reload(), 1000); // reload to update cart
        // showSnackbar("Added to Cart");
      } else {
        window.dispatchEvent(new CustomEvent("snackbar", {
          detail: { message: "Error adding to Cart", type: "error" }
        }));
        //
        // showSnackbar("Error adding to Cart");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Error adding to Cart", type: "error" }
      }));
      //
      // showSnackbar("Error adding to Cart");
    }
  }

  const buyNow = async (productId) => {
    if (!isLoggedIn) {
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Please login to buy products", type: "error" }
      }));
      // showSnackbar("Please login to buy products");
      return;
    }
    try {
      const response = await axios.post('https://rehomify.in/v1/cart/addToCart', {
        custId: localStorage.getItem("custId"),
        productId: productId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status) {
        navigate('/checkout', { state: { productId, fromCart: true } });
      } else {
        window.dispatchEvent(new CustomEvent("snackbar", {
          detail: { message: "Error proceeding to Buy Now", type: "error" }
        }));
        // showSnackbar("Error proceeding to Buy Now");
      }
    } catch (error) {
      console.error('Error proceeding to Buy Now:', error);
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Error proceeding to Buy Now", type: "error" }
      }));
      // showSnackbar("Error proceeding to Buy Now");
    }
  }


  if (!product) return <p></p>;

  return (
    <>
      <Header />
      <div className="product-page">
        <div className="product-details-container">
          {/* Left Side - Images */}
          <div className="product-images-column">
            <div className="thumbnail-column">
              {products.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`thumbnail-vertical ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <img className="main-product-image" src={selectedImage} alt="Product" />
          </div>

          {/* Right Side - Details */}
          <div className="product-info-column">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <div className="price-section">
              <p className="offer-price">
                Price: ₹{selectedVariety ? selectedVariety.price : product.price}
              </p>
              <span className="limited-deal-tag">Limited time deal</span>
            </div>

            {product.varieties && product.varieties.length > 0 && (
              <div className="variety-section">
                <label htmlFor="variety">Size:</label>
                <div className="variety-buttons">
                  {product.varieties.map((v, idx) => (
                    <button
                      key={idx}
                      className={`variety-btn ${selectedVariety?.name === v.name ? 'active' : ''}`}
                      onClick={() => setSelectedVariety(v)}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quantity-section">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                className="quantity-select"
              >
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart">Add to cart</button>
              <button className="proceed-to-payment">Proceed to payment</button>
              <button className="easy-emis" onClick={() => setShowEMI(true)}>Easy EMIs</button>
            </div>
          </div>
        </div>
      </div>
      {showEMI && <EMIPanel onClose={() => setShowEMI(false)} />}
      <Footer />
    </>
  );
};

export default ProductPage;
