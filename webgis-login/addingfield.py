import json

# Path to your GeoJSON file
geojson_file_path = "D:\\Pondicherry\\Topomap\\pondicherry geojson\\cadastrial\\Village_Boundary.geojson"

# Load the GeoJSON data
with open(geojson_file_path, 'r') as f:
    geojson_data = json.load(f)

# The name of the layer you want to add
layer_name = "Village_Boundary"

# Loop through each feature and add the layer name in the properties
for feature in geojson_data['features']:
    feature['properties']['layer'] = layer_name

# Save the updated GeoJSON back to the file
with open(geojson_file_path, 'w') as f:
    json.dump(geojson_data, f, indent=4)

print(f"Layer name '{layer_name}' added to each feature's properties.")
