import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Check if 'Login' exists in the same directory
import Information from './Information';
import WebGIS from './WebGIS';
import ThreeDModelPage from './ThreeDModelPage';
import Dem from './Dem';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/information" element={<Information />} />
                <Route path="/webgis" element={<WebGIS />} />
                <Route path="/3d-model" element={<ThreeDModelPage />} /> {/* Add route for 3D model page */}
                <Route path="/dem" element={<Dem />} /> {/* Add route for 3D model page */}
            </Routes>
        </Router>
    );
}

export default App;



