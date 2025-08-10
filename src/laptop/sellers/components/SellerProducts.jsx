import React, { useEffect, useState } from "react";
import axios from "axios";
import "../sellerstyles/sellerProducts.css";

const categories = ["All", "Chair", "Table", "Single Bed", "Double Bed", "Cupboard"];

const categoryMapping = {
  Chair: ["chair"],
  Table: ["table"],
  Sofa: ["sofa"],
  "Single Bed": ["single_bed"],
  "Double Bed": ["double_bed"],
  Cupboard: ["cupboard"],
};

const MobileSellerProducts = () => {
  const [activeBtn, setActiveBtn] = useState("All");
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const colorOptions = [
    "Natural Wood", "Walnut", "Mahogany", "Teak", "Oak",
    "Espresso", "Black", "White", "Gray"
  ];

  const categoryOptions = [
    "Table", "Chair", "Single Bed", "Double Bed", "Cupboard"
  ];

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://rehomify.in/v1/products/");
      const productsByCategory = res.data;

      const flatProducts = Object.entries(productsByCategory).flatMap(
        ([key, items]) => items.map((item) => ({ ...item, tag: key }))
      );

      setAllProducts(flatProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.get(`https://rehomify.in/v1/products/delete/${productId}`);
      await fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const handleEdit = async (product) => {
    try {
      const res = await axios.get(`http://localhost:5000/v1/products/edit/${product.id}`);
      setEditProduct(res.data);
      setEditModalVisible(true);
    } catch (err) {
      console.error("Failed to fetch product for edit:", err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVarietyChange = (index, field, value) => {
    setEditProduct(prev => {
      const updated = [...prev.varieties];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, varieties: updated };
    });
  };

  const handleUpdate = async () => {
    try {
      const {
        id,
        name,
        description,
        category,
        color,
        width,
        length,
        height,
        woodMaterial,
        varieties
      } = editProduct;

      const payload = {
        name,
        description,
        category,
        color,
        width,
        length,
        height,
        woodMaterial,
        varieties
      };

      await axios.post(`http://localhost:5000/v1/products/updatedProduct/${id}`, payload);
      setEditModalVisible(false);
      setEditProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setEditProduct(null);
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      activeBtn === "All" ||
      (categoryMapping[activeBtn] &&
        categoryMapping[activeBtn].includes(product.tag));
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="laptop-seller-products-container">
      <div className="laptop-category-grid">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`laptop-seller-nav-btn ${activeBtn === cat ? "laptop-active" : ""}`}
            onClick={() => setActiveBtn(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="laptop-search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="laptop-products-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="laptop-product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p style={{ color: "#777" }}>{p.color}</p>
            <p>
              Price: ₹
              {p.varieties && p.varieties.length > 0
                ? p.varieties[0].price
                : p.price}
            </p>

            <div className="laptop-card-actions">
              <button className="laptop-edit-btn" onClick={() => handleEdit(p)}>Edit</button>
              <button className="laptop-delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModalVisible && editProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <div className="flex-edit-model">
              <img src={editProduct.image} alt="Preview" className="modal-img" />

              <div className="editable-content">
                <div className="edit-input">
                  <label>Name:</label>
                  <input type="text" name="name" value={editProduct.name} onChange={handleInputChange} />
                </div>

                <div className="edit-input">
                  <label>Description:</label>
                  <textarea name="description" value={editProduct.description} onChange={handleInputChange} />
                </div>

                <div className="edit-input">
                  <label>Varieties:</label>
                  {editProduct.varieties?.map((v, i) => (
                    <div className="variety-row" key={i}>
                      <input
                        type="text"
                        placeholder="Variety Name"
                        value={v.name}
                        onChange={(e) => handleVarietyChange(i, "name", e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={v.price}
                        onChange={(e) => handleVarietyChange(i, "price", e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="edit-input">
                  <label>Color:</label>
                  <select name="color" value={editProduct.color} onChange={handleInputChange}>
                    <option value="">Select Color</option>
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div className="edit-input">
                  <label>Category:</label>
                  <select name="category" value={editProduct.category} onChange={handleInputChange}>
                    <option value="">Select Category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="edit-input">
                  <label>Width:</label>
                  <input type="number" name="width" value={editProduct.width} onChange={handleInputChange} />
                </div>

                <div className="edit-input">
                  <label>Length:</label>
                  <input type="number" name="length" value={editProduct.length} onChange={handleInputChange} />
                </div>

                <div className="edit-input">
                  <label>Height:</label>
                  <input type="number" name="height" value={editProduct.height} onChange={handleInputChange} />
                </div>

                <div className="edit-input">
                  <label>Wood:</label>
                  <input type="text" name="woodMaterial" value={editProduct.woodMaterial} onChange={handleInputChange} />
                </div>

                <div className="modal-btns">
                  <button onClick={handleUpdate}>Update</button>
                  <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MobileSellerProducts;
