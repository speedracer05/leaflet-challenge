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
var mymap = L.map("map", {
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

var baseMaps = {
  "Street Map": streetmap,
  "Satellite": satellite
};

// Add 'baseMaps' tile layer to the map
baseMaps.addTo(map);

// Create overlay object
var overlayMaps = {
  Earthquakes: earthquakes
};



// Perform API call to USGS endpoint
// All Earthquakes in the past week. Retrieved data on 09-04-2021 
var link =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Get link data with d3
d3.json(link, function(response) {
  console.log(response.features[0])

  
}
