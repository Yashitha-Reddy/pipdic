import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Information = () => {
    const navigate = useNavigate();
    const mapRef = useRef(null); // Reference to store the map instance

    const handleProceed = () => {
        navigate('/webgis');
    };

    useEffect(() => {
        // Only initialize the map if it hasn't been already
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([11.955, 79.778], 13);

            // Set OpenStreetMap tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapRef.current);

            // Add a marker for Sedarapet
            

            // Define coordinates of the polygon for Sedarapet area
            const polygonCoordinates = [
                [11.958, 79.776], // Coordinate 1
                [11.956, 79.780], // Coordinate 2
                [11.954, 79.779], // Coordinate 3
                [11.953, 79.775], // Coordinate 4
                [11.955, 79.773], // Coordinate 5
            ];

            // Add a polygon to highlight the Sedarapet area
            L.polygon(polygonCoordinates, {
                color: 'blue',
                fillColor: '#1abc9c',
                fillOpacity: 0.4,
            }).addTo(mapRef.current)
              .bindPopup('Sedarapet Village Area')
              .openPopup();
        }
    }, []);

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <img src="https://th.bing.com/th/id/OIP.GeQ-ye7WlYGy0SXKqJEH0wHaHa?rs=1&pid=ImgDetMain" alt="Geokno Logo" style={styles.logo} />
                <h1 style={styles.companyName}>Geokno India Private Limited</h1>
            </nav>

            <aside style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Sedarapet</h2>
                <p style={styles.sidebarText}>Puducherry, India</p>
                <button onClick={handleProceed} style={styles.sidebarButton}>
                    Proceed to WebGIS
                </button>
            </aside>

            <div style={styles.mainContent}>
                <header style={styles.header}>
                    <h1 style={styles.heading}>Pondicherry Industrial Promotion Development and Investment Corporation LTD</h1>
                    <p style={styles.description}>
                        Sedarapet, located 10 km from Pondicherry, was recently surveyed by Geokno India Pvt. Ltd. under a contract by the Pondicherry Industrial Promotion Development and Investment Corporation Ltd. The survey focused on capturing detailed geospatial data for the Industrial development and planning.
                    </p>
                </header>

                <section style={styles.section}>
                    <h2 style={styles.subheading}>Location Map</h2>
                    <div id="map" style={styles.mapContainer}></div>
                    <p onClick={handleProceed} style={styles.clickableText}>
                        Proceed to WebGIS
                    </p>
                </section>
                    

                <section style={styles.section}>
                <p style={styles.description}>
                PIPDIC (Pondicherry Industrial Promotion Development & Investment Corporation Ltd.) is a government-established corporation aimed at boosting industrial development in the Union Territory of Puducherry. Founded in 1974, PIPDIC has played a key role in promoting various industrial sectors such as textiles, food processing, tourism, and logistics, as well as fostering small and medium-sized enterprises.PIPDIC has developed industrial estates in locations like Sedarapet, Kirumambakkam, and Mettupalayam, providing essential infrastructure for businesses. It also assists in land acquisition, setting up factories, and offering investment support </p>
                    
                </section>

                <section style={styles.section}>
                    <h2 style={styles.subheading}>Location and Administration</h2>
                    <div style={styles.infoGrid}>
                        <p><strong>Block/Taluka:</strong> Villianur Taluk</p>
                        <p><strong>District:</strong> Puducherry</p>
                        <p><strong>State:</strong> Puducherry</p>
                        <p><strong>Pincode:</strong> 605111</p>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.subheading}>Population Statistics</h2>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Particulars</th>
                                <th>Total</th>
                                <th>Male</th>
                                <th>Female</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Population</td>
                                <td>4,756</td>
                                <td>2,376</td>
                                <td>2,380</td>
                            </tr>
                            <tr>
                                <td>Literate Population</td>
                                <td>3,507</td>
                                <td>1,900</td>
                                <td>1,607</td>
                            </tr>
                            <tr>
                                <td>Illiterate Population</td>
                                <td>1,249</td>
                                <td>476</td>
                                <td>773</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        fontFamily: '"Arial", sans-serif',
        backgroundColor: '#f4f4f9',
    },
    navbar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '10px 20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
    },
    logo: {
        width: '50px',
        height: '50px',
        marginRight: '15px',
    },
    companyName: {
        fontSize: '22px',
        fontWeight: 'bold',
    },
    sidebar: {
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        marginTop: '60px',
    },
    sidebarTitle: {
        fontSize: '22px',
        marginBottom: '8px',
        fontWeight: 'bold',
    },
    sidebarText: {
        fontSize: '14px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    sidebarButton: {
        padding: '10px 18px',
        fontSize: '14px',
        backgroundColor: '#1abc9c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    mainContent: {
        flex: 1,
        padding: '40px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '60px',
    },
    header: {
        marginBottom: '20px',
        maxWidth: '800px',
    },
    heading: {
        fontSize: '26px',
        color: '#333',
    },
    description: {
        fontSize: '16px',
        color: '#555',
        lineHeight: '1.6',
    },
    section: {
        width: '100%',
        maxWidth: '800px',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        textAlign: 'left',
    },
    subheading: {
        fontSize: '20px',
        color: '#2c3e50',
        marginBottom: '12px',
    },
    mapContainer: {
        width: '100%',
        height: '300px',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
    },
};

export default Information;


