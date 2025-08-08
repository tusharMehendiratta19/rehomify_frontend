import React, { useState } from 'react';
import axios from 'axios';
import '../sellerstyles/sellerAddProduct.css';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        color: '',
        isRefurbished: false,
        width: '',
        length: '',
        height: '',
        woodMaterial: '',
    });

    const [mainImage, setMainImage] = useState(null);
    const [optionalImages, setOptionalImages] = useState([]);
    const [status, setStatus] = useState('');

    const colorOptions = [
        "Natural Wood", "Walnut", "Mahogany", "Teak", "Oak",
        "Espresso", "Black", "White", "Gray"
    ];

    const categoryOptions = [
        "Table", "Chair", "Single Bed", "Double Bed", "Cupboard"
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleMainImageChange = (e) => {
        setMainImage(e.target.files[0]);
    };

    const handleOptionalImagesChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4); // max 4
        setOptionalImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'sellerId') {
                data.append(key, value);
            }
        });

        const sellerId = localStorage.getItem('custId');
        if (sellerId) data.append('sellerId', sellerId);

        if (mainImage) {
            data.append('mainImage', mainImage);
        }

        optionalImages.forEach((img, index) => {
            data.append('optionalImages', img);
        });

        try {
            const res = await axios.post('https://rehomify.in/v1/products/addProduct', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setStatus(`✅ Product added: ${res.data.data.name}`);
        } catch (err) {
            setStatus(`❌ Error: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form" encType="multipart/form-data">
                <label>Main Image</label>
                <input type="file" accept="image/*" onChange={handleMainImageChange} required />

                <label>Optional Images (max 4)</label>
                <input type="file" accept="image/*" multiple onChange={handleOptionalImagesChange} />

                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />

                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categoryOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>

                <select name="color" value={formData.color} onChange={handleChange} required>
                    <option value="">Select Color</option>
                    {colorOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>

                <label className='isRefurbished'>
                    <input type="checkbox" name="isRefurbished" checked={formData.isRefurbished} onChange={handleChange} />
                    Refurbished
                </label>

                <input type="number" name="width" placeholder="Width (in foot)" value={formData.width} onChange={handleChange} required />
                <input type="number" name="length" placeholder="Length (in foot)" value={formData.length} onChange={handleChange} required />
                <input type="number" name="height" placeholder="Height (in foot)" value={formData.height} onChange={handleChange} required />
                <input type="text" name="woodMaterial" placeholder="Wood Material" value={formData.woodMaterial} onChange={handleChange} required />

                <button type="submit">Add Product</button>
            </form>
            <p>{status}</p>
        </div>
    );
};

export default AddProductForm;
