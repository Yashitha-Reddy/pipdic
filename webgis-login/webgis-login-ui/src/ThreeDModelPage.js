// src/ThreeDModelPage.js
import React from 'react';

const ThreeDModelPage = () => {
  return (
    <div>
      <h1></h1>
      <div style={{ width: '100%', height: '100vh' }}>
        <iframe
          
          src="/indexx.html" // Points to the indexx.html file in the public folder
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default ThreeDModelPage;



