// src/components/Gallery.js
import React, { useState } from 'react';

const Gallery = () => {
  const [showGallery, setShowGallery] = useState(false);

  const images = [
    'path_to_image1.jpg', // Replace with your actual image paths
    'path_to_image2.jpg',
    'path_to_image3.jpg',
  ];

  const toggleGallery = () => setShowGallery(!showGallery);

  return (
    <div className="gallery-container">
      <button onClick={toggleGallery} className="gallery-toggle">
        📸 Gallery
      </button>
      {showGallery && (
        <div className="gallery-images">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`gallery-img-${index}`} className="gallery-image" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
