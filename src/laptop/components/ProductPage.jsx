import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../allStyles/productpage.css';
import Header from './Header';
import Footer from './Footer';
import dummyProducts from '../../data/dummyProductData';
import EMIPanel from './EMIPanel';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showEMI, setShowEMI] = useState(false);

  const similarProducts = [
    {
      id: 1,
      name: 'Product A',
      price: 999,
      description: 'Description A',
      image: 'https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      name: 'Product B',
      price: 1299,
      description: 'Description B',
      image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      name: 'Product C',
      price: 899,
      description: 'Description C',
      image: 'https://images.pexels.com/photos/7602930/pexels-photo-7602930.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      name: 'Product D',
      price: 699,
      description: 'Description D',
      image: 'https://media.istockphoto.com/id/1691922005/photo/cozy-stylish-living-room-with-a-round-dining-table-chairs-and-shelf-with-decorative.jpg?b=1&s=612x612&w=0&k=20&c=wzbAUSq5Y870qieKnpD-DOkU7I7l1WudiE-DcTVMMdg=',
    },
  ];

  const products = {
    images: [
      'https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7602930/pexels-photo-7602930.jpeg?auto=compress&cs=tinysrgb&w=600',
    ]
  }

  useEffect(() => {
    const allProducts = Object.values(dummyProducts).flat();
    const found = allProducts.find((p) => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
    }
  }, [id]);

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
              <p className="original-price">Price: <s>₹6999</s></p>
              <p className="offer-price">Offer Price: ₹{product.price}</p>
              <span className="limited-deal-tag">Limited time deal</span>
              <p className="vendor">Vendor: <strong>Rober Enterprises</strong> <span className="vendor-rating">★ 4</span></p>
            </div>
            <div className="quantity-section">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                className="quantity-select"
              >
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>

            <div className="offers-section">
              <h4>Available Offers</h4>
              <ul>
                <li>Special Price: Get extra ₹500 off (price inclusive of cashback/coupon)</li>
                <li>Special Price: Get extra ₹350 off (price inclusive of cashback/coupon)</li>
                <li>Special Price: Get at ₹{product.price} (price inclusive of cashback/coupon)</li>
              </ul>
            </div>

            <div className="highlights-section">
              <h4>Product Highlights</h4>
              <ul>
                <li><strong>Primary Material</strong>: Engineered Wood</li>
                <li><strong>Width x Height</strong>: 75 cm x 183 cm (2 ft 5 in x 6 ft)</li>
                <li><strong>Number Of Doors</strong>: 2</li>
                <li><strong>Number Of Shelves</strong>: 2</li>
              </ul>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart">Add to cart</button>
              <button className="proceed-to-payment">Proceed to payment</button>
              <button className="easy-emis" onClick={() => setShowEMI(true)}>Easy EMIs</button>
            </div>
            <div className="ratings-section">
              <h4>Ratings & Reviews</h4>
              <p><strong>4★</strong> (2,007 Ratings & 301 Reviews)</p>
              <div className="rating-breakdown">
                <div>Quality: 4.0</div>
                <div>Design & Finish: 4.2</div>
                <div>Storage Space: 4.1</div>
                <div>Service: 4.0</div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="suggestions">
        <h3>You might like</h3>
        <div className="suggestion-row">
          {similarProducts.map(product => (
            <div key={product.id} className="suggestion-card">
              <img src={product.image} alt={product.name} className="suggestion-image" />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p><strong>₹{product.price}</strong></p>
              <div className="card-actions">
                <button className="buy-now">Buy Now</button>
                <button className="add-to-cart">Add to Cart</button>
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
