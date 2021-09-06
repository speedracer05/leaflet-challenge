// Initialize LayerGroup
var earthquakes = new L.LayerGroup();

// Perform API call to USGS endpoint
// All Earthquakes in the past week. Retrieved data on 09-04-2021 
var getURL =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get link data with d3
d3.json(getURL, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3> Location: " + feature.properties.place +
    "<h3> Magnitude: " + feature.properties.mag +
    "<h3> Depth: " + feature.geometry.coordinates[2] +
      "</h3><hr><p> Data: " + new Date(feature.properties.time) + "</p>");
  }

  earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.mag * 4,
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      });
    }
  });

  createMap(earthquakes);
}

// Create the tile layers for map
function createMap(earthquakes) {

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    // "light-v10",
    accessToken: API_KEY
  });

  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  // Creating map object
  // Dublin, CA
  var myMap = L.map("map", {
    center: [
      37.7159, -121.9101
    ],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });

  var baseMaps = {
    "Street Map": streetmap,
    "Satellite": satellite
  };

// Add 'baseMap' tile layer to the map
// baseMap.addTo(map);

  // Create overlay object
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create a control for layers, adding overlay layers to it
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Create a legend to display information about my map
  var legend = L.control({position: "bottomright"});
  
  legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'info legend'),
      magnitude = [0, 1, 2, 3, 4, 5],
      labels = [];

    for (var i = 0; i < magnitude.length; i++) {
      div.innerHTML +=
        '<i style="background:' + chooseColor(magnitude[i] + 1) + '"></i> ' +
        magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(myMap);
}

  // Selects marker color based on magnitude size
  // Link source: https://www.freecodecamp.org/news/javascript-switch-statement-with-js-switch-case-example-code/
  function chooseColor(magnitude) {
    switch (true) { 
    case magnitude < 1:
      return "#F0CE7C";
    case magnitude < 2:
      return "#E0AA3D";
    case magnitude < 3:
      return "#E18515";
    case magnitude < 4:
      return "#FC4E2A";
    case magnitude < 5:
      return "#E31A1C";
    default:
      return "#B10026";
    }
  }
