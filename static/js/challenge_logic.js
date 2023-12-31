// Add console.log to check to see if our code is working
console.log("zzworking");


const API_KEY='pk.eyJ1IjoiZmhzYWx2byIsImEiOiJjbDNocTRhZHgxNHMyM3FvNDB2YjZtNHJ5In0.jUQlA_xeJtGnR3S8CazpLQ'


// We create the tile layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map
  let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// We create the second tile layer that will be the background of our map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map
    let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });
  
// Create a base layer that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark,
    Light: light,
    Satellite: satelliteStreets,
  };


// Create the map object with a center and zoom level
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
  });

var testData
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
// Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {

// We turn each feature into a circleMarker on the map
    
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },

        style: styleInfo,
// We create a popup for each circleMarker to display the magnitude and
//  location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }

        }).addTo(earthquakes);
        
// then we add earthquake layer to our map 
    earthquakes.addTo(map);
});


// get major earthquaqe data 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {


  // 4. Use the same style as the earthquake data
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor2(feature.properties.mag),
      color: "#000000",
      radius: getRadius2(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

// Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
// sets the style of the circle, and displays the magnitude and location of the earthquake
//  after the marker has been created and styled
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    style: styleInfo2,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }

// add major earthquakes layer to the map
}).addTo(majorEarthquakes);
  
  majorEarthquakes.addTo(map);
  });

// get tectonic plate data 
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
// Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {

    color: "red",
    weight: 2

  }).addTo(tectonicPlates);

tectonicPlates.addTo(map);

});

let myStyle = {
    color: "#ffffa1",
    weight: 2
    }

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// modify the style so it can overlay the earthquake data
  function styleInfo2(feature) {
    return {
      opacity: 1,
      fillOpacity: .5,
      fillColor: getColor2(feature.properties.mag),
      color: "#000000",
      radius: getRadius2(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake
    function getColor2(magnitude) {
        if (magnitude > 5) {
          return "#ea2c2c";
        }
        if (magnitude > 4) {
          return "#ea822c";
        }
        return "#98ee00";
      }

// This function determines the radius of the earthquake marker based on its magnitude
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
  }

// update the radius so the major earthquakes can overlay the earthquake markers 
    function getRadius2(magnitude) {
        if (magnitude === 0) {
          return 1;
        }
        return magnitude * 5;
      }

// Create the earthquake layer for our map
let earthquakes = new L.layerGroup();
let tectonicPlates = new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();

// We define an object that contains the overlays
// This overlay will be visible all the time
let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates,
    "Major Earthquakes": majorEarthquakes
  };

// Here we create a legend control object
  let legend = L.control({
    position: "bottomright"
  });
  
// Then add all the details for the legend
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
  
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
  
// Looping through our intervals to generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
// Finally, we our legend to the map.
    legend.addTo(map);




// Then we add a control to the map that will allow the user to change
// which layers are visible
L.control.layers(baseMaps, overlays).addTo(map);