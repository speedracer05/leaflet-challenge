// Create the tile layer for map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize LayerGroup
var earthquakes = new L.LayerGroup();


// Creating my map object
// Dublin, CA
var myMap = L.map("map", {
  center: [
    37.7159, 121.9101
  ],
  zoom: 4,
  layers: [
    streetmap,
    earthquakes]
});

// Optional  overlay objects to add to the layer control.
// var overlays = {
//   "Option 1": layers.COMING_SOON,
//   "Option 2": layers.EMPTY
// };

// Create a control for layers, adding overlay layers to it
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});