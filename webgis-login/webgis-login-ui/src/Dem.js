import React from 'react';
import { MapContainer, ImageOverlay, ZoomControl, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DemMapPage = () => {
  // Define the bounds of the DEM image from the GDAL output (converted to lat/lng)
  const bounds = [
    [11.9833, 79.7256], // Lower Left (Lat, Long)
    [12.0122, 79.7834], // Upper Right (Lat, Long)
  ];

  const imageUrl = '/dem.png'; // Path to the DEM PNG image in the public folder

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav
        style={{
          background: '#343a40',
          color: 'white',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>DEM Viewer</h2>
      </nav>

      {/* Content Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            background: '#f1f1f1',
            width: '250px',
            padding: '20px',
            boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '16px', marginBottom: '10px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>
            What is a DEM?
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
            A Digital Elevation Model (DEM) represents the terrain's surface elevation in 3D. It's a grid of elevation values
            that helps in understanding the shape, slope, and elevation of the Earth's surface.
          </p>

          <h3 style={{ fontSize: '16px', margin: '20px 0 10px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>
            How is it Useful?
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
            DEMs are critical in fields like hydrology, urban planning, and geospatial analysis. They help identify
            watersheds, design drainage systems, and assess terrain for construction or natural hazard management.
          </p>

          <h3 style={{ fontSize: '16px', margin: '20px 0 10px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>
            Legend
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '20px', height: '20px', background: '#0000ff' }}></div>
              <span style={{ fontSize: '14px' }}>Low Elevation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '20px', height: '20px', background: '#00ffff' }}></div>
              <span style={{ fontSize: '14px' }}>Moderate Elevation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '20px', height: '20px', background: '#ffff00' }}></div>
              <span style={{ fontSize: '14px' }}>High Elevation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '20px', height: '20px', background: '#ff0000' }}></div>
              <span style={{ fontSize: '14px' }}>Very High Elevation</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '20px' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <header
              style={{
                background: '#007bff',
                color: 'white',
                padding: '15px 20px',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              Digital Elevation Model (DEM)
            </header>
            <MapContainer
              center={[11.9995, 79.7545]} // Center of the image (adjust if necessary)
              zoom={14} // Adjust zoom level as needed
              style={{ width: '100%', height: '500px' }}
              zoomControl={false}
            >
              {/* Image Overlay to show DEM on map */}
              <ImageOverlay url={imageUrl} bounds={bounds} opacity={0.9} />
              <ZoomControl position="topright" />
              <ScaleControl position="bottomleft" />
            </MapContainer>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer
        style={{
          background: '#343a40',
          color: 'white',
          textAlign: 'center',
          padding: '10px',
          fontSize: '12px',
        }}
      >
        © 2024 DEM Viewer. All rights reserved.
      </footer>
    </div>
  );
};

export default DemMapPage;


