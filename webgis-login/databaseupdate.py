import os
import json
import psycopg2
from shapely.geometry import shape

# Database connection details
db_config = {
    "dbname": "webgis",
    "user": "postgres",
    "password": "1234",
    "host": "localhost",
    "port": "5432"
}

# Base directory containing GeoJSON files
base_dir = "D:/Pondicherry/Topomap/pondicherry geojson"
folders = ["buildings", "fencewall", "hydro", "landuse", "transportation", "utilities", "vegetation","cadastrial"]

def insert_geojson(file_path, connection):
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

# Main process
try:
    connection = psycopg2.connect(**db_config)
    for folder in folders:
        dir_path = os.path.join(base_dir, folder)
        for file in os.listdir(dir_path):
            if file.endswith(".geojson"):
                file_path = os.path.join(dir_path, file)
                print(f"Processing: {file_path}")
                insert_geojson(file_path, connection)
finally:
    connection.close()

