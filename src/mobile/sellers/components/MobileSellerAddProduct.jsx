import React, { useState } from 'react';
import axios from 'axios';
import '../sellerstyles/sellerAddProduct.css'; // Adjust the path as necessary

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

    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        const data = new FormData();

        // Exclude sellerId from the loop
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'sellerId') {
                data.append(key, value);
            }
        });

        // Add sellerId explicitly from localStorage
        const sellerId = localStorage.getItem('custId');
        if (sellerId) data.append('sellerId', sellerId);

        if (image) {
            data.append('image', image);
        }

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
                <input type="file" accept="image/*" onChange={handleImageChange} required />
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
                <label className='isRefurbished'>
                    <input type="checkbox" name="isRefurbished" checked={formData.isRefurbished} onChange={handleChange} />
                    Refurbished
                </label>
                <input type="number" name="width" placeholder="Width (cm)" value={formData.width} onChange={handleChange} required />
                <input type="number" name="length" placeholder="Length (cm)" value={formData.length} onChange={handleChange} required />
                <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required />
                <input type="text" name="woodMaterial" placeholder="Wood Material" value={formData.woodMaterial} onChange={handleChange} required />

                <button type="submit">Add Product</button>
            </form>
            <p>{status}</p>
        </div>
    );
};

export default AddProductForm;
