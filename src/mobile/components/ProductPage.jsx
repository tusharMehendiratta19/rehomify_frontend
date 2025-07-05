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
    { id: 1, name: 'Product A', price: 999, description: 'Description A', image: 'https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg' },
    { id: 2, name: 'Product B', price: 1299, description: 'Description B', image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg' },
    { id: 3, name: 'Product C', price: 899, description: 'Description C', image: 'https://images.pexels.com/photos/7602930/pexels-photo-7602930.jpeg' },
    { id: 4, name: 'Product D', price: 699, description: 'Description D', image: 'https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg' }
  ];

  const products = {
    images: [
      'https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg',
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg',
      'https://images.pexels.com/photos/7602930/pexels-photo-7602930.jpeg',
      
    ]
  };

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
              <button className="mobile-add-to-cart">Add to cart</button>
              <button className="mobile-proceed-to-payment">Proceed to payment</button>
              <button className="mobile-easy-emis" onClick={() => setShowEMI(true)}>Easy EMIs</button>
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
