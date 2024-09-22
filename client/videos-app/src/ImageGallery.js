// src/ImageGallery.js
import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images, onClose, index, referrerPolicy = "no-referrer" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(index);

  useEffect(() => {
    setCurrentImageIndex(index);
  }, [index]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('gallery-overlay')) {
      onClose();
    }
  };

  return (
    <div className="gallery-overlay" onClick={handleOverlayClick}>
      <button className="close-button" onClick={onClose}>
        <i className="fas fa-close"></i>
      </button>
      <button className="prev-button" onClick={prevImage}>
        <i className="fas fa-angle-left"></i>
      </button>
      <img
        src={images[currentImageIndex]}
        alt={`${currentImageIndex + 1}`}
        referrerPolicy={referrerPolicy}
      />
      <button className="next-button" onClick={nextImage}>
        <i className="fas fa-angle-right"></i>
      </button>
    </div>
  );
};

export default ImageGallery;