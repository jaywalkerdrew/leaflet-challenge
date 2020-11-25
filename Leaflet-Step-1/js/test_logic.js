// Never quite initialized on the map. Switched to geoJson instead.

// quakes.forEach(function(quake) {
    //     var data = quake.geometry.coordinates;

    //     var lat = data[0];
    //     var long = data[1];
    //     var depth = data[2];
    //     var mag = quake.properties.mag;
    //     var lat_long = L.latLng(lat, long);

    //     L.circle(L.latLng(lat, long), {
    //         color: "black",
    //         fillColor: depthColor(depth),
    //         fillOpacity: 0.5,
    //         radius: mag * 5
    //     }).addTo(myMap);

    //     L.circle(lat_long)
    //         .bindPopup("<h3>Location: " + quake.properties.place + 
    //         "</h3><hr><p>Magnitude: " + quake.properties.mag + 
    //         "</p><hr><p>" + lat_long + "</p>").addTo(myMap);
    // })