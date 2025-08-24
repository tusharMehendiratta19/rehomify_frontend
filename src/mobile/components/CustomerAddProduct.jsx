import React, { useState } from 'react';
import axios from 'axios';
import '../allStyles/customerAddProduct.css';

const CustomerAddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        suggestion: true,
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

    const handleVarietyChange = (index, field, value) => {
        setFormData((prevData) => {
            const updatedVarieties = [...prevData.varieties];
            updatedVarieties[index][field] = value;
            return { ...prevData, varieties: updatedVarieties };
        });
    };

    const handleMainImageChange = (e) => {
        setMainImage(e.target.files[0]);
    };

    const handleOptionalImagesChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4);
        setOptionalImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    data.append(`${key}[${i}][name]`, v.name);
                    data.append(`${key}[${i}][price]`, v.price);
                });
            } else {
                data.append(key, value);
            }
        });

        const sellerId = localStorage.getItem('custId');
        if (sellerId) data.append('sellerId', sellerId);

        if (mainImage) {
            data.append('mainImage', mainImage);
        }

        optionalImages.forEach((img) => {
            data.append('optionalImages', img);
        });

        try {
            const res = await axios.post('http://localhost:5000/v1/products/addCustomerProduct', data, {
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


                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categoryOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>

                <button type="submit">Add Product</button>
            </form>
            <p>{status}</p>
        </div>
    );
};

export default CustomerAddProductForm;
