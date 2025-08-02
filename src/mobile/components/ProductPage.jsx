import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../allStyles/productpage.css';
import Header from './Header';
import Footer from './Footer';
// import dummyProducts from '../../data/dummyProductData';
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

        // Flatten all products into one array
        const allProducts = Object.values(res.data).flat();

        // Find the product by ID (important: use `===` if both are strings)
        const found = allProducts.find(p => p.id === id);

        if (found) {
          setProduct(found);
          setSelectedImage(found.image);
          setMainImage(found.image);
          setOptionalImages(found.optionalImages || []);
        } else {
          console.warn("Product not found for id:", id);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    const fetchCustomerDetails = async () => {
      try {
        const res = await axios.get(`https://rehomify.in/v1/auth/getCustomerDetails/${localStorage.getItem("custId")}`);
        if (res.data?.status) {
          const { cart = [], wishlist = [] } = res.data.data;
          setCartItems(cart.map(p => p.productId));
          setWishlist(wishlist.map(p => p.productId));
          console.log("Customer wishlist:", wishlist);
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
      <div className="mobile-product-page">
        <div className="mobile-product-details-container">
          <div className="mobile-product-images-column">
            <div className="mobile-thumbnail-column">
              {products.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`mobile-thumbnail-vertical ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <img className="mobile-main-product-image" src={selectedImage} alt="Product" />
          </div>

          <div className="mobile-product-info-column">
            <h2 className="mobile-product-title">{product.name}</h2>
            <p className="mobile-product-description">{product.description}</p>

            <div className="mobile-price-section">
              <p className="mobile-original-price">Price: <s>₹6999</s></p>
              <p className="mobile-offer-price">Offer Price: ₹{product.price}</p>
              <span className="mobile-limited-deal-tag">Limited time deal</span>
              <p className="mobile-vendor">Vendor: <strong>Rober Enterprises</strong> <span className="mobile-vendor-rating">★ 4</span></p>
            </div>

            <div className="mobile-quantity-section">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                className="mobile-quantity-select"
              >
                {[1, 2, 3, 4, 5].map(qty => <option key={qty} value={qty}>{qty}</option>)}
              </select>
            </div>

            <div className="mobile-offers-section">
              <h4>Available Offers</h4>
              <ul>
                <li>Special Price: Get extra ₹500 off</li>
                <li>Special Price: Get extra ₹350 off</li>
                <li>Get at ₹{product.price}</li>
              </ul>
            </div>

            <div className="mobile-highlights-section">
              <h4>Product Highlights</h4>
              <ul>
                <li><strong>Primary Material</strong>: Engineered Wood</li>
                <li><strong>Dimensions</strong>: 75 cm x 183 cm</li>
                <li><strong>Doors</strong>: 2</li>
                <li><strong>Shelves</strong>: 2</li>
              </ul>
            </div>

            <div className="mobile-action-buttons">
              {cartItems.includes(product.id) ? (
                <button
                  className="mobile-add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cart");
                  }}
                >
                  Go To Cart
                </button>
              ) : (
                <button
                  className="mobile-add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id);
                  }}
                >
                  Add to cart
                </button>
              )}

              <button
                className="mobile-proceed-to-payment"
                onClick={(e) => {
                  e.stopPropagation();
                  buyNow(product.id);
                }}
              >
                Proceed to payment
              </button>
              <button className="mobile-easy-emis" onClick={() => setShowEMI(true)}>
                Easy EMIs
              </button>
            </div>


            <div className="mobile-ratings-section">
              <h4>Ratings & Reviews</h4>
              <p><strong>4★</strong> (2,007 Ratings & 301 Reviews)</p>
              <div className="mobile-rating-breakdown">
                <div>Quality: 4.0</div>
                <div>Design: 4.2</div>
                <div>Storage: 4.1</div>
                <div>Service: 4.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-suggestions">
        <span className="mobile-suggestions-title">You might like</span>
        <div className="mobile-suggestion-row">
          {similarProducts.map(product => (
            <div key={product.id} className="mobile-suggestion-card">
              <img src={product.image} alt={product.name} className="mobile-suggestion-image" />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p><strong>₹{product.price}</strong></p>
              <div className="mobile-card-actions">
                <button className="mobile-buy-now">Buy Now</button>
                <button className="mobile-add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEMI && <EMIPanel onClose={() => setShowEMI(false)} />}
      <Footer />
    </>
  );
};

export default ProductPage;
