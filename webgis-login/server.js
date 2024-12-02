const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg'); // PostgreSQL client
const app = express();

// Middlewares
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Static login details
const USERNAME = 'root';
const PASSWORD = '1234';

// PostgreSQL client setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'webgis', // Your database name
  password: '1234', // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

client.connect();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the WebGIS API');
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check credentials
    if (username === USERNAME && password === PASSWORD) {
        return res.status(200).json({ message: 'Login successful' });
    }

    // If credentials are incorrect, send a 401 response
    return res.status(401).json({ message: 'Invalid credentials' });
});

// GeoJSON route
app.get('/geojson', async (req, res) => {
    try {
        // Query to get geojson data
        const result = await client.query('SELECT layer_name, ST_AsGeoJSON(geometry) as geometry, properties FROM geojson_layers');

        // Convert the result into a GeoJSON FeatureCollection
        const geojson = {
            type: 'FeatureCollection',
            features: result.rows.map(row => ({
                type: 'Feature',
                properties: row.properties,
                geometry: JSON.parse(row.geometry),
            })),
        };

        // Send the GeoJSON data as response
        res.json(geojson);
    } catch (error) {
        console.error('Error fetching GeoJSON data', error);
        res.status(500).json({ message: 'Error fetching GeoJSON data' });
    }
});

// Route to get available GeoJSON layer names
app.get('/geojson/layers', async (req, res) => {
    try {
        // Query to get the distinct layer names from the geojson_layers table
        const result = await client.query('SELECT DISTINCT layer_name FROM geojson_layers');

        // If there are no layers, send an empty array
        if (result.rows.length === 0) {
            return res.json([]);
        }

        // Return the list of layer names
        const layerNames = result.rows.map(row => row.layer_name);
        res.json(layerNames);
    } catch (error) {
        console.error('Error fetching layer data', error);
        res.status(500).json({ message: 'Error fetching layer data' });
    }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
