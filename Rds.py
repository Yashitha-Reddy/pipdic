import os
import json
import psycopg2
from shapely.geometry import shape

# Database connection details for RDS
db_config = {
    "dbname": "webgis",  # Make sure this is the correct database
    "user": "postgres",  # Your RDS username
    "password": "Plasicard1",  # Your RDS password
    "host": "database-1.crwqygwa2tl6.us-east-1.rds.amazonaws.com",  # RDS endpoint
    "port": "5432"  # Default PostgreSQL port
}

# Base directory containing GeoJSON files
base_dir = "D:/Pondicherry/Topomap/pondicherry geojson"
folders = ["buildings", "fencewall", "hydro", "landuse", "transportation", "utilities", "vegetation", "cadastrial"]

def insert_geojson(file_path, connection):
    """Insert GeoJSON data into PostgreSQL database."""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Extract features from the GeoJSON file
    features = data.get("features", [])
    if not features:
        print(f"No features found in {file_path}")
        return

    # Insert each feature into the database
    with connection.cursor() as cursor:
        for feature in features:
            geometry = shape(feature["geometry"])  # Convert to Shapely geometry
            properties = json.dumps(feature.get("properties", {}))  # Convert properties to JSONB
            layer_name = os.path.splitext(os.path.basename(file_path))[0]  # Use filename as layer name

            cursor.execute(
                """
                INSERT INTO geojson_layers (layer_name, geometry, properties)
                VALUES (%s, ST_GeomFromText(%s, 4326), %s)
                """,
                (layer_name, geometry.wkt, properties)
            )
        connection.commit()
        print(f"Inserted {len(features)} features from {file_path}")

# Ensure geojson_layers table exists
def create_geojson_table(connection):
    """Create the geojson_layers table if it doesn't exist."""
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS geojson_layers (
        id SERIAL PRIMARY KEY,
        layer_name TEXT NOT NULL,
        geometry GEOMETRY NOT NULL,
        properties JSONB
    );
    """
    with connection.cursor() as cursor:
        cursor.execute(create_table_sql)
        connection.commit()
    print("geojson_layers table is ready.")

# Main process
try:
    # Connect to the RDS PostgreSQL database
    connection = psycopg2.connect(**db_config)
    create_geojson_table(connection)  # Ensure table exists

    # Process all GeoJSON files in the specified folders
    for folder in folders:
        dir_path = os.path.join(base_dir, folder)
        for file in os.listdir(dir_path):
            if file.endswith(".geojson"):
                file_path = os.path.join(dir_path, file)
                print(f"Processing: {file_path}")
                insert_geojson(file_path, connection)

finally:
    if connection:
        connection.close()
    print("Connection closed.")
