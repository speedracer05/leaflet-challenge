// Perform API call to USGS endpoint
// All Earthquakes in the past week. Retrieved data on 09-04-2021 
var getURL =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get link data with d3
d3.json(getURL, function(data) {
  quakeFeatures(data.features);
});

function quakeFeatures(earthquakeData) {

  function onQuakeFeature(feature, layer) {
    layer.bindPopup("<h3> Location: " + feature.properties.place +
    "<h3> Magnitude: " + feature.properties.mag +
    "<h3> Depth: " + feature.geometry.coordinates[2] +
      "</h3><hr><p> Data: " + new Date(feature.properties.time) + "</p>");
  }

  earthquakes = L.geoJSON(earthquakeData, {
    onQuakeFeature: onQuakeFeature,
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

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

// Initialize LayerGroup
var earthquakes = new L.LayerGroup();

// Creating map object
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
// baseMap.addTo(map);

  // Create overlay object
  var overlayMaps = {
    Earthquakes: earthquakes
  };


  // Create a control for layers, adding overlay layers to it
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  // Create a legend to display information about our map
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
      magnitude = [-10, 10, 30, 50, 70, 90],
      labels = [];

    for (var i = 0; i < magnitude.length; i++) {
      div.innerHTML +=
        '<i style="background:' + chooseColor(magnitude[i] + 1) + '"></i> ' +
        magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(map);
  }

  function chooseColor(d) {
  return d > 90 ? '#a50026' :
    d > 70 ? '#eb5d3c' :
      d > 50 ? '#fdc474' :
        d > 30 ? '#f5f8ac' :
          d > 10 ? '#a9da70' :
            '#38a557';
  }


