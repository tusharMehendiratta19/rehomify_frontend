import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../allStyles/productpage.css';
import Header from './Header';
import Footer from './Footer';
// import dummyProducts from '../../data/dummyProductData';
import EMIPanel from './EMIPanel';
import { useCart } from "../../data/CartContext";

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
  const [pincode, setPincode] = useState("")
  const [message, setMessage] = useState("");
  const { addToCart, removeFromCart } = useCart();

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

  const addToCarts = async (productId) => {
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
        addToCart(productId)
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

  const buyNow = async (productId, price, qty) => {
    if (!isLoggedIn) {
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Please login to buy products", type: "error" }
      }));
      // showSnackbar("Please login to buy products");
      return;
    }
    try {
      console.log("productId: ", productId)
      console.log("price: ", price)
      console.log("quantity: ", qty)
      navigate('/checkout', { state: { productId, fromCart: false, total: price, qty: qty } });
    } catch (error) {
      console.error('Error proceeding to Buy Now:', error);
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Error proceeding to Buy Now", type: "error" }
      }));
      // showSnackbar("Error proceeding to Buy Now");
    }
  }

  const checkDelivery = async () => {
    try {
      if (pincode === "") {
        setMessage("Please Enter Pin code!")
      } else {
        const res = await axios.post("https://rehomify.in/v1/products/pincodeCheck", {
          pincode,
        });

        if (res.data.success) {
          setMessage("✅ Delivery available to your location!");
        } else {
          setMessage("❌ Delivery not available at this pincode.");
        }
      }

    } catch (err) {
      console.error("Error checking pincode:", err);
      setMessage("⚠️ Something went wrong. Please try again.");
    }
  };


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
            <h3 className="mobile-product-title">{product.name}</h3>
            <p className="mobile-product-description">{product.description}</p>



            <div className="mobile-price-section">
              <p className="mobile-original-price">
                Price: <s>₹{(selectedVariety?.price || 0) + 2000}</s>
              </p>
              <p className="mobile-offer-price">
                Offer Price: ₹{selectedVariety?.price || 0}
              </p>
              <span className="mobile-limited-deal-tag">Limited time deal</span>
            </div>

            <div className='sizeAndQty'>
              {product.varieties && product.varieties.length > 0 && (
                <div className="mobile-variety-section">
                  <label>Size:</label>
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
              <div className="mobile-quantity-section">
                <label htmlFor="quantity">Quantity:</label>
                <select
                  id="quantity"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  className="mobile-quantity-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(qty => <option key={qty} value={qty}>{qty}</option>)}
                </select>
              </div>
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
                    addToCarts(product.id);
                  }}
                >
                  Add to cart
                </button>
              )}

              <button
                className="mobile-proceed-to-payment"
                onClick={(e) => {
                  e.stopPropagation();
                  buyNow(product.id, selectedVariety.price, selectedQuantity);
                }}
              >
                Proceed to payment
              </button>
              {/* <button className="mobile-easy-emis" onClick={() => setShowEMI(true)}>
                EMIs
              </button> */}

            </div>
            <div className='delivery-container'>
              <div className="deliveryCheck">
                <input
                  type="tel"
                  placeholder="Enter Your Pincode"
                  className="pincode-input"
                  maxLength={6}
                  minLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <button className="pincode-check" onClick={checkDelivery}>
                  Check
                </button>
              </div>
              <div>
                {message && <p>{message}</p>}
              </div>
            </div>
            <div className='hgltsAndAction'>
              <div className="mobile-highlights-section">
                <h4>Product Highlights</h4>
                <ul>
                  <li><strong>Material</strong>: {product.woodMaterial}</li>
                  <li><strong>Width</strong>: {product.width} foot</li>
                  <li><strong>Length</strong>: {product.length} foot</li>
                  <li><strong>Height</strong>: {product.height} foot</li>
                  <li><strong>Color</strong>: {product.color}</li>
                  {/* <li><strong>Ratings</strong>: 4★</li> */}
                </ul>
              </div>
              <div className='offerImage'>
                <img src='../buyBack.jpeg' />
              </div>
            </div>

            {/* <div className="mobile-ratings-section">
              <h4>Ratings & Reviews</h4>
              <p><strong>4★</strong> (2,007 Ratings & 301 Reviews)</p>
              <div className="mobile-rating-breakdown">
                <div>Quality: 4.0</div>
                <div>Design: 4.2</div>
                <div>Storage: 4.1</div>
                <div>Service: 4.0</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="mobile-suggestions">
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
      </div> */}

      {showEMI && <EMIPanel onClose={() => setShowEMI(false)} />}
      <Footer />
    </>
  );
};

export default ProductPage;
