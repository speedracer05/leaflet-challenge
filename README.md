# Leaflet-Challenge
## University of California Davis Data Analytics and Visualization Boot Camp 2021

![](https://github.com/speedracer05/leaflet-challenge/blob/main/Leaflet-Step-1/images/USGS_logo.png)
## Description
The Leaflet Challenge project visualizes earthquakes around the world in real-time. The project' objective was to create a map that plots earthquakes in real-time, using data from the United States Geological Survey (USGS) Earthquakes feed. For this challenge, I created an interactive tool that visualizes earthquake data for the past 7-days.  

#### Webpage Level 1: [https://speedracer05.github.io/leaflet-challenge/Leaflet-Step-1/](https://speedracer05.github.io/leaflet-challenge/)

![](https://github.com/speedracer05/leaflet-challenge/blob/main/Leaflet-Step-2/images/global_map_tec.png)

# Table of Contents
-   [Description](#description)
-   [Key Features](#key-features)
-   [Development](#development)
-   [The Output](#the-ouput)
-   [Resources](#resources)
-   [Contact](#contact)

## Key Features
1. Data is updated every minute
2. Earthquake markers are sized and colored according to magnitude of the earthquake
3. Map layer tool toggles between street and satellite views
4. Popups provide detail on the location, time and magnitude when a marker is clicked
5. Tectonic boundries map

## Development
A basic `html` page was created and a div map, Leaflet JS and D3 scripts were inserted into the body. Next, a basic style.css was written to provide formating for the map and legend. Lastly, I built my map using [Leaflet](https://leafletjs.com/) and [Mapbox](https://docs.mapbox.com/).  

The USGS data utilizes a GeoJSON format. Access to their API was achieved by using `d3.json` to read the file and parse the required information for the map, e.g. latitude, longitude, and magnitude of the earthquake. I then created two map layers; street map and a satellite map. The maps provide base map options for the earthquake markers to be overlayed on top. The control layers were created for the base map and overlay maps. 

The finishing touches included the addition of a [tectonic plates layer](http://peterbird.name/oldFTP/PB2002/2001GC000252_readme.txt), which shows the geographic locations of the plats, a legend for the magnitude of the earthquake, as well as a function to color the earthquake markers based on the magnitude.  

## The Output
The whole project is loaded into github.io so it can be viewed over a web browser.

## Resources
- [USGS GeoJSON Summary](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- [Mapbox Static Tiles API](https://docs.mapbox.com/api/maps/static-tiles/)
- [Tectonic Plates](https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json)
- [Color Palette for Markers](https://www.schemecolor.com/red-sunset.php)
- Used Google Maps to [Select lat-lng Coordinates](https://www.google.com/maps/) to center my map
- [Resloved "404 FAvicon Not Found" Error](https://www.tutsandtips.com/web-design/how-to-fix-404-favicon-not-found-error/)
- [JavaScript: Switch vs. If Else](https://medium.com/@michellekwong2/switch-vs-if-else-1d458e7b0711)
- [JavaScript Swich Statement - With Example Code](https://www.freecodecamp.org/news/javascript-switch-statement-with-js-switch-case-example-code/)

## Contact
[John Chan](https://github.com/speedracer05)
