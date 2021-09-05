// Create the tile layer for map
var baseMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
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
    baseMap,
    earthquakes]
});

var baseMaps = {
  "Street Map": streetmap,
  "Satellite": satellite
};

// Add 'baseMap' tile layer to the map
baseMap.addTo(map);

// Create overlay object
var overlayMaps = {
  Earthquakes: earthquakes
};

// var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// });

// var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "satellite-v9",
//   accessToken: API_KEY
// });


// Create a control for layers, adding overlay layers to it
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});


// Perform API call to USGS endpoint
// All Earthquakes in the past week. Retrieved data on 09-04-2021 
var getURL =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Get link data with d3
d3.json(getURL, function(response) {
)
