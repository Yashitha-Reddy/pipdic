import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ImageOverlay, useMap,useMapEvents } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navbar, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-measure/dist/leaflet-measure.css'; // Import Leaflet Measure CSS
import { Modal } from 'react-bootstrap';


const WebGIS = () => {
    const overlayCenter = [11.994464833, 79.746170417];
    const imageBounds = new LatLngBounds(
        [11.97664850, 79.72526322], // Lower Left Corner
        [12.012279861, 79.767080389] // Upper Right Corner
    );
    const [orthoVisible, setOrthoVisible] = useState(false); 
    const [demVisible, setdemVisible] = useState(false); 
    

    const [clickedLocation, setClickedLocation] = useState(null);
    


    // Categories and Subcategories
    const [categories, setCategories] = useState({
        "Buildings": [
            "Building Commercial",
            "Building Industrial",
            "Building Residential",
            "Building Ruin",
            "Building UC",
            "Petrol Pump",
            "School",
            "Shed"
        ],
        "Fence": [
            "Fence",
            "Gate",
            "Wall"
        ],
        "Hydro": [
            "Canal",
            "Check Dam",
            "Culvert",
            "Drain",
            "Overhead Tank",
            "Pond",
            "Swamp Area",
            "Water Tank",
            "Well"
        ],
        "Landuse": [
            "Barren Land",
            "Buildup_Area",
            "Cultivation Land",
            "Industrial_Area",
            "Open_Area",
            "Play Ground",
        ],

        "Transportation": [
            "Bridge",
            "Cart Tracks",
            "Metalled Road",
            "Road Barrier",
            "Sign Board",
            "Unmetalled Road",
        ],

        "Utilities":[
            //"Electric Line",
            //"Electric Pole",
            "Electrical_Substation",
            "High Mast Light",
            "High Transmission Line",
            "Lamp Post",
            "Microwave Tower",
            "Transformer",
        ],

        "Vegetation":[
            "Group of Trees",
            "Tree Plantation",
        ],
        "Cadastrial": [
        "Karasoor_Hissa_No",
        "New Estate",
        "Pondicherry_AOI",
        "Sedarapet_Hissa_No",
        "Village_Boundary"
    ]



    });

    const [layerVisibility, setLayerVisibility] = useState({
        "Building Commercial": false,
        "Building Industrial": false,
        "Building Residential": false,
        "Building Ruin": false,
        "Building UC": false,
        "Petrol Pump": false,
        "School": false,
        "Shed": false,
        "Fence": false,
        "Gate": false,
        "Wall": false,
        "Canal": false,
        "Check Dam": false,
        "Culvert": false,
        "Drain": false,
        "Overhead Tank": false,
        "Pond": false,
        "Swamp Area": false,
        "Water Tank": false,
        "Well": false,
        "Barren Land": false,
        "Buildup_Area": false,
        "Cultivation Land": false,
        "Industrial_Area": false,
        "Open_Area": false,
        "Play Ground": false,
        "Bridge":false,
        "Cart Tracks":false,
        "Metalled Road":false,
        "Road Barrier":false,
        "Sign Board":false,
        "Unmetalled Road":false,
        "Electric Pole":false,
        "High Transmission Line":false,
        "Group of Trees":false,
        "Tree Plantation":false,
        "Karasoor_Hissa_No":false,
        "New Estate":false,
        "Pondicherry_AOI":false,
        "Sedarapet_Hissa_No":false,
        "Village_Boundary":true,
        
        
    });
    

    const [expandedCategory, setExpandedCategory] = useState(null); // To track expanded parent
    const [geojsonData, setGeojsonData] = useState([]);
    const [panelOpen, setPanelOpen] = useState(false);

    const getIconForLayer = (layerName) => {
        const iconMapping = {
            "Sign Board": L.icon({
                iconUrl:'https://e7.pngegg.com/pngimages/734/928/png-clipart-brown-wooden-signage-arrow-sign-direction-sign-board-angle-brown.png', // URL of the image
                iconSize: [16, 16], // Adjust the size as needed
                iconAnchor: [16, 32], // Adjust the anchor as needed
            }),
            // "Electric Pole": L.icon({
            //     iconUrl:'https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX16824513.jpg',
            //     iconSize: [5, 5],  // Increased size
            //     iconAnchor: [16, 32], // Adjust anchor accordingly
            // }),
            "High Mast Light": L.icon({
                    iconUrl:'https://e7.pngegg.com/pngimages/773/535/png-clipart-light-fixture-high-mast-lighting-light-emitting-diode-light-light-fixture-street-light-thumbnail.png',
                    iconSize: [16, 16],  // Increased size
                    iconAnchor: [16, 32], // Adjust anchor accordingly
                }),
            "Lamp Post": L.icon({
                    iconUrl:'https://cdn-icons-png.flaticon.com/512/900/900510.png',
                    iconSize: [16, 16],  // Increased size
                    iconAnchor: [16, 32], // Adjust anchor accordingly
                }),
            "Microwave Tower": L.icon({
                    iconUrl:'https://cdn.pixabay.com/photo/2012/04/15/19/13/tower-34981_960_720.png',
                    iconSize: [16, 16],  // Increased size
                    iconAnchor: [16, 32], // Adjust anchor accordingly
                }),
            "Transformer": L.icon({
                    iconUrl:'https://th.bing.com/th/id/OIP.xUVA3t8SqTKTTVgm9ynf9AAAAA?rs=1&pid=ImgDetMain',
                    iconSize: [16, 16],  // Increased size
                    iconAnchor: [16, 32], // Adjust anchor accordingly
                }),

            



            // Add more icons for other point features if needed
        };

        
        return iconMapping[layerName] || null; // Default to null if no icon is found
    };
    
    
    // Fetch GeoJSON data
    useEffect(() => {
        axios.get('http://localhost:5001/geojson')
            .then(response => {
                const features = response.data.features || [];
                features.forEach(feature => {
                    console.log('LAYER:', feature.properties.LAYER); // Check the LAYER values
                });
                setGeojsonData(features);
            })
            .catch(error => {
                console.error('Error fetching GeoJSON data:', error);
            });
    }, []);
    
    
    const MapEvents = () => {
        useMapEvents({
            click(event) {
                const { lat, lng } = event.latlng; // Capture latitude and longitude
                setClickedLocation({ lat, lng });
            },
        });
        return null;
    };

    // Add the measurement control
    const addMeasurementControl = (map) => {
        console.log('Map instance created:', map); // Debugging the map instance
        L.control.measure({
            position: 'topright',
            primaryLengthUnit: 'kilometers',
            secondaryLengthUnit: 'meters',
            primaryAreaUnit: 'sqmeters',
            secondaryAreaUnit: 'acres',
        }).addTo(map);
    };
    

    // Toggle layer visibility
    const toggleLayerVisibility = (layerName) => {
        setLayerVisibility(prev => ({ ...prev, [layerName]: !prev[layerName] }));
    };

    const getFilteredGeoJSON = (layerName) => {
        const filtered = geojsonData.filter(feature => {
            const layerValueUpper = (feature.properties.LAYER || "").trim().toLowerCase();
            const layerValueLower = (feature.properties.layer || "").trim().toLowerCase();
            
            // Match `layerName` with both properties
            return (
                layerValueUpper === layerName.toLowerCase() || 
                layerValueLower === layerName.toLowerCase()
            );
        });
    
        console.log(`Filtered features for ${layerName}:`, filtered);
        return filtered;
    };

    

    

    const AddGeoJSONToMap = () => {
        const map = useMap();
    
        useEffect(() => {
            const layers = {};
    
            Object.keys(layerVisibility).forEach(layerName => {
                if (layerVisibility[layerName]) {
                    const filteredGeoJSON = getFilteredGeoJSON(layerName);
    
                    // Add the GeoJSON layer with custom icons for point features
                    layers[layerName] = L.geoJSON(filteredGeoJSON, {
                        pointToLayer: (feature, latlng) => {
                            const icon = getIconForLayer(layerName);
                            if (icon) {
                                return L.marker(latlng, { icon });
                            } else {
                                return L.circleMarker(latlng, {
                                    color: getColorForLayer(layerName),
                                    weight: 2,
                                    opacity: 1,
                                    fillOpacity: 0.4,
                                    fillColor: getColorForLayer(layerName),
                                });
                            }
                        },
                        style: (feature) => {
                            return feature.geometry.type !== "Point" ? {
                                color: getColorForLayer(layerName),
                                weight: 2,
                                opacity: 1,
                                fillOpacity: 0.4,
                                fillColor: getColorForLayer(layerName),
                            } : {}; // Skip styling for point features
                        },
                        onEachFeature: (feature, layer) => {
                            // Create the content for the popup
                            const properties = feature.properties;
                            let popupContent = '<div style="font-size: 14px;">';
    
                            // Iterate through all properties and display them
                            for (const property in properties) {
                                if (properties.hasOwnProperty(property)) {
                                    popupContent += `
                                        <b>${property}:</b> ${properties[property] || 'Not Available'}<br>
                                    `;
                                }
                            }
    
                            popupContent += '</div>';
    
                            // Bind the popup to the layer
                            layer.bindPopup(popupContent);
                        }
                    }).addTo(map);
                }
            });
    
            return () => {
                Object.values(layers).forEach(layer => map.removeLayer(layer));
            };
        }, [layerVisibility, geojsonData, map]);
    
        return null;
    };
    
    
    
    
    const getColorForLayer = (layerName) => {
        const colorMapping = {
            "Building Commercial": 'blue',
            "Building Industrial": 'red',
            "Building Residential": 'pink',
            "Building Ruin": 'black',
            "Building UC": 'green',
            "Petrol Pump": 'orange',
            "School": 'magenta',
            "Shed": 'cyan',
            "Fence": 'brown',
            "Gate": 'gray',
            "Wall": 'yellow',
            "Canal": 'blue',
            "Check Dam": 'blue',
            "Culvert": 'blue',
            "Drain": 'blue',
            "Overhead Tank": 'blue',
            "Pond": 'blue',
            "Swamp Area": 'blue',
            "Water Tank": 'blue',
            "Well": 'blue',
            "Barren Land": 'Sienna',
            "Buildup_Area": 'OrangeRed',
            "Cultivation Land": 'ForestGreen',
            "Industrial_Area": 'SlateGray',
            "Open_Area": 'SkyBlue',
            "Play Ground": 'Gold',
            "Bridge": '#A52A2A',  // Brown
            "Cart Tracks": '#D2B48C',  // Tan
            "Metalled Road": '#808080',  // Gray
            "Road Barrier": '#0000FF',  // Blue
            "Sign Board": 'https://img.lovepik.com/element/40140/8767.png_300.png',  // Gold
            "Unmetalled Road": '#BDB76B',  // Dark Khaki
            "High Transmission Line":'black',
            "Group of Trees": '#006400', // Dark Green
            "Tree Plantation": '#32CD32', // Medium Green
            "Karasoor_Hissa_No":'orange',
            "New Estate":'green',
            "Pondicherry_AOI":'pink',
            "Sedarapet_Hissa_No":'blue',
            "Village_Boundary":'skyblue',
            
        };
        return colorMapping[layerName] || 'gray';
    };

    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Navbar */}
            <Navbar expand="lg" style={{ backgroundColor: '#003366', color: 'white', padding: '10px 15px' }}>
                <Container>
                    <Navbar.Brand
                        href="#"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        <img
                            src="https://latrics.com/wp-content/uploads/2022/12/geoeno-logo.png"
                            alt="Company Logo"
                            style={{ height: '40px', marginRight: '15px' }}
                        />
                        Pondicherry Industrial Promotion Development and Investment Corporation LTD
                    </Navbar.Brand>
                </Container>
            </Navbar>

            {/* Map Container */}
            <div style={{ flex: 1, position: 'relative' }}>
                <MapContainer
                    center={overlayCenter}
                    zoom={14}
                    maxZoom={22}
                    style={{ width: '100%', height: '100%' }}
                    whenCreated={addMeasurementControl} // Add the measurement control after the map is created
           
                >
                    {/* OSM Base Layer */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={19}
                    />

                    

                    {/* Conditionally render Image Overlay */}
                    {orthoVisible && (
                        <ImageOverlay
                            url="/ortho_no_bg.png"
                            bounds={imageBounds}
                            opacity={1}
                        />
                    )}

                    {demVisible && (
                        <ImageOverlay
                            url="/dem.png"
                            bounds={imageBounds}
                            opacity={1}
                        />
                    )}

                    {/* Custom Map Events */}
                    <MapEvents />

                    {/* Add GeoJSON Layers */}
                    <AddGeoJSONToMap />
                </MapContainer>

                {/* Display Latitude and Longitude */}
                {clickedLocation && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            zIndex: 1000,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: 'white',
                            padding: '5px 10px',
                            borderRadius: '8px',
                        }}
                    >
                        Latitude: {clickedLocation.lat.toFixed(6)}, Longitude: {clickedLocation.lng.toFixed(6)}
                    </div>
                )}

                

                {/* Toggle Button for Panel */}
                <button
                    onClick={() => setPanelOpen(!panelOpen)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        zIndex: 1001,
                        padding: '10px',
                        backgroundColor: '#003366',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    {panelOpen ? 'Close Layers' : 'Open Layers'}
                </button>

                {/* View 3D Model Button */}
                <button
                    onClick={() => window.location.href = "/3d-model"} // Navigate to the 3D model page
                    style={{
                        position: 'absolute',
                        bottom: '20px',  // Adjust as needed
                        left: '20px',
                        zIndex: 1001,
                        padding: '5px 8px',  // Reduced padding for a smaller size
                        fontSize: '12px',  // Smaller font size
                        backgroundColor: '#003366',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',  // Slightly smaller border radius
                        cursor: 'pointer',
                    }}
                >
                    View 3D Model
                </button>

                {/* View DEM Button */}
                {/* <button
                    onClick={() => window.location.href = "/dem"} // Navigate to the DEM page
                    style={{
                        position: 'absolute',
                        bottom: '60px',  // Adjust as needed
                        left: '30px',
                        zIndex: 1001,
                        padding: '5px 8px',  // Reduced padding for a smaller size
                        fontSize: '12px',  // Smaller font size
                        backgroundColor: '#003366',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    View DEM
                </button> */}

                {/* Layer Panel */}
                {panelOpen && (
                    <div
                        style={{
                            
                                position: 'absolute',
                                top: '70px',
                                right: '20px',
                                zIndex: 1000,
                                width: '200px',
                                backgroundColor: 'rgba(255, 255, 255, 1)', // Transparent white
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.7)',
                                padding: '15px',
                                maxHeight: '80%',
                                overflowY: 'auto',
                            
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#003366', // Light transparent background
                                padding: '8px',
                                borderRadius: '5px',
                                marginBottom: '5px', // Add spacing between items
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Optional shadow for better visibility
                            }}
                        >
                            {/* Ortho Photo Toggle */}
                            <Form.Check
                                type="checkbox"
                                id="ortho-toggle"
                                label="Show Ortho Photo"
                                checked={orthoVisible}
                                onChange={() => setOrthoVisible(!orthoVisible)}
                                style={{
                                    fontSize: '12px', // Smaller font size for the label
                                    marginBottom: '4px', // Reduce space below each toggle
                                    color: 'white',
                                }}
                            />
                        </div>

                        <div
                            style={{
                                backgroundColor: '#003366', // Light transparent background
                                padding: '8px',
                                borderRadius: '6px',
                                marginBottom: '10px', // Add spacing between items
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Optional shadow for better visibility
                            }}
                        >
                            {/* DEM Toggle */}
                            <Form.Check
                                type="checkbox"
                                id="dem-toggle"
                                label="Show DEM Photo"
                                checked={demVisible}
                                onChange={() => setdemVisible(!demVisible)}
                                style={{
                                    fontSize: '12px', // Smaller font size for the label
                                    marginBottom: '4px', // Reduce space below each toggle
                                    color: 'white',
                                }}
                            />
                        </div>


                        {Object.keys(categories).map((parent) => {
                            const allSelected = categories[parent].every(layerName => layerVisibility[layerName]);
                            const someSelected = categories[parent].some(layerName => layerVisibility[layerName]);

                            return (
                                <div key={parent} style={{ marginBottom: '15px' }}>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setExpandedCategory(
                                                expandedCategory === parent ? null : parent
                                            )
                                        }
                                        style={{
                                            marginBottom: '5px',
                                            width: '100%',
                                            backgroundColor: '#003366',
                                            color: 'white',
                                        }}
                                    >
                                        {parent}
                                    </button>

                                    {expandedCategory === parent && (
                                        <div className="dropdown-menu" style={{ display: 'block', padding: '10px' }}>
                                            {/* Select All Toggle */}
                                            <div className="dropdown-item">
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`${parent}-select-all`}
                                                    label="Select All"
                                                    checked={allSelected}
                                                    indeterminate={someSelected && !allSelected} // Mixed state
                                                    onChange={() => {
                                                        const newState = !allSelected; // Toggle between select/deselect all
                                                        const updatedVisibility = { ...layerVisibility };

                                                        // Update all layers in this category
                                                        categories[parent].forEach(layerName => {
                                                            updatedVisibility[layerName] = newState;
                                                        });

                                                        setLayerVisibility(updatedVisibility);
                                                    }}
                                                />
                                            </div>
                                            {/* Individual Layer Toggles */}
                                            {categories[parent].map((layerName) => (
                                                <div className="dropdown-item" key={layerName}>
                                                    <Form.Check
                                                        type="switch"
                                                        id={`${layerName}-switch`}
                                                        label={layerName}
                                                        checked={layerVisibility[layerName]}
                                                        onChange={() => toggleLayerVisibility(layerName)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};



export default WebGIS;


