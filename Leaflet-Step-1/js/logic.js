var API_KEY = "pk.eyJ1IjoiYmVuamFtZW5hbGZvcmQiLCJhIjoiY2toN3M4NGE5MDdsaDJybXpwcnd5ZTd2bCJ9.egqvokJx96RNTj-CL0rOkw"

var usgs_link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

 // Create the base map
 var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

// Create the tile layer that will be the background of the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

d3.json(usgs_link, function(data) {
    var quakes = data.features;

    quakes.forEach(function(quake){
        var data = quake.geometry.coordinates;
        var depth = data[2];
        var mag = quake.properties.mag;

        L.geoJSON(quake, {
            pointToLayer: function(quake, layer) {
                return L.circleMarker(layer, {
                    color: "black",
                    fillColor: depthColor(depth),
                    weight: 1,
                    fillOpacity: 0.75,
                    radius: mag * 5
                })
                //.addTo(myMap);
                .bindPopup("Location: " + quake.properties.place + 
                "<br>Magnitude: " + quake.properties.mag +
                "<br>Depth: " + depth + "<br>" +
                "<br>Latitude: " + data[0] + " | Longitude: " + data[1]).addTo(myMap);
            }
        })
    })

    
});

var color_list = ['#DAF7A6', '#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845']

function depthColor(depth) {

    var color = 'white';

    if (depth < 5) {color = color_list[0];
    } else if (depth < 10) {color = color_list[1];
    } else if (depth < 20) {color = color_list[2];
    } else if (depth < 50) {color = color_list[3];
    } else if (depth < 100) {color = color_list[4];
    } else {color = color_list[5];
    }

    return color;
}

var legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var depths = [0, 5, 10, 20, 50, 100];
    var labels = [];

    div.innerHTML = "<h3>Quake Depth</h3>"

    for (var i = 0; i < depths.length; i++){
        div.innerHTML +=
          '<i style="background:' + color_list[i] + '"></i>' +
          depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
      }
      return div;
  };
// legend.onAdd = function() {
//     var div = L.DomUtil.create('div', 'info legend')
//     var depths = ["<5", "5-10", "10-20", "20-50", "50-100", "100+"];
//     var labels = [];
//     var color_list = ['#DAF7A6', '#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845']

//     div.innerHTML = "<h3>Quake Depth</h3";
//     // for (var i = 0; i < depths.length; i++) {
//     //     div.innerHTML += '<i style="background: ' + color_list[i] + '"></i>' + 
//     //     depths[i] + (depths[i + 1 ] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
//     // } 
//     // return div;

// };

legend.addTo(myMap);