import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const categories = [
  'Single Bed',
  'Double Bed',
  'Cup board',
  'Tables',
  'Chairs',
  'Sofas',
];

const CategoryButtons = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/products?category=${category.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div className="category-buttons-container">
      {categories.map((category, idx) => (
        <button
          key={idx}
          className="category-button"
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
