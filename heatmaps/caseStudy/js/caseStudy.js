mapboxgl.accessToken = 'pk.eyJ1Ijoia213ZW56ZWwiLCJhIjoiY2o3NnkwaTk3MXUybTMzbDh1NXN2b3J0ZCJ9.wfH3ovobwI2b0J1KT2DiSg';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
  center: [-93.414776, 38.236225], // starting position 38.236225, -93.414776
  zoom: 5 // starting zoom
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

map.on('load', function(){
  var point = turf.point([-93.322847, 37.141639]);
  var buffered = turf.buffer(point, 75, {units: 'miles'});

  var point2 = turf.point([-93.322847, 37.141639]);
  var buffered2 = turf.buffer(point2, 150, {units: 'miles'});
  
  
    map.addLayer({
    id: "radius2",
    type: "fill",
    source: {
      type: 'geojson',
      data: buffered2
    },
    layout: {
      "visibility": 'visible',
    },
    paint: {
      'fill-color': 'rgba(33,102,172,0)',
      'fill-outline-color': '#FF0000',
      'fill-opacity': 0.4
    }
  });
  map.addLayer({
    id: "radius",
    type: "fill",
    source: {
      type: 'geojson',
      data: buffered
    },
    layout: {
      "visibility": 'visible',
    },
    paint: {
      'fill-color': 'rgba(33,102,172,0)',
      'fill-outline-color': '#FF0000',
      'fill-opacity': 0.4
    }
  });

  map.addSource('flowMeter', {
    "type": "geojson",
    "data": "https://web.fulcrumapp.com/shares/f434e2bf2b1d6b0c.geojson"
});
  map.addLayer({
    "id": "flowMeter-heat",
    "type": "heatmap",
    "source": "flowMeter",
    "maxzoom": 16,
    "paint": {
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(33,102,172,0)",
            0.2, "#FF940C",
            0.4, "#FF6D0F",
            0.6, "#FF410A",
            0.8, "#FF190C",
            1, "#D00100"
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": 10,
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": 0.8
    }
});
map.addSource('smoke', {
  "type": "geojson",
  "data": "https://web.fulcrumapp.com/shares/2fbb81035b7d2673.geojson"
});
map.addLayer({
  "id": "smoke-heat",
  "type": "heatmap",
  "source": "smoke",
  "maxzoom": 16,
  "paint": {
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(33,102,172,0)",
          0.2, "#FF940C",
          0.4, "#FF6D0F",
          0.6, "#FF410A",
          0.8, "#FF190C",
          1, "#D00100"
      ],
      // Adjust the heatmap radius by zoom level
      "heatmap-radius": 10,
      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": 0.8
  }
});
map.addSource('acoustic', {
  "type": "geojson",
  "data": "https://web.fulcrumapp.com/shares/4eacaf197b6e3c93.geojson"
});
map.addLayer({
  "id": "acoustic-heat",
  "type": "heatmap",
  "source": "acoustic",
  "maxzoom": 16,
  "paint": {
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(33,102,172,0)",
          0.2, "#FF940C",
          0.4, "#FF6D0F",
          0.6, "#FF410A",
          0.8, "#FF190C",
          1, "#D00100"
      ],
      // Adjust the heatmap radius by zoom level
      "heatmap-radius": 10,
      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": 0.8
  }
});
    map.addSource("clientPoint", {
    type: "geojson",
    data: 'https://web.fulcrumapp.com/shares/df38f5edb35fb25e.geojson',
  });
  map.addLayer({
    id: "Clients",
    type: "circle",
    source: "clientPoint",
    layout: {
      'visibility': 'visible',
    },
    paint: {
      'circle-color': [
        'match',
        ['get', 'past_client'],
        'Yes', '#000000',
        /* other */ '#D1C7B7'
      ],
      "circle-radius": [
        'match',
        ['get', 'past_client'],
        'Yes', 4,
        'No', 3,
        1
      ],
      "circle-opacity": [
        'match',
        ['get', 'past_client'],
        'Yes', 1,
        'No', 0.8,
        1
      ],
    }
  });  
  
  map.on('click', 'Clients', function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = "<strong>Client Name: </strong>" + e.features[0].properties.client_name
      + "<br>" + "<strong>Population: </strong>" + e.features[0].properties.population
      + "<br>" + "<strong>Top Needs: </strong>" + e.features[0].properties.top_needs;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'Clients', function () {
      map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'Clients', function () {
      map.getCanvas().style.cursor = '';
  });
});

var toggleableLayer = ['Clients', 'acoustic-heat','flowMeter-heat', 'smoke-heat'];

for (var i = 0; i < toggleableLayer.length; i++) {
  var id = toggleableLayer[i];

  var link = document.createElement('button');
  link.href = '#';
  link.classId = 'btn-sm';
  link.className = 'btn btn-info btn-sm';
  link.textContent = id;

  link.onclick = function (e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.className = 'btn btn-info btn-sm';
    } else {
      this.className = 'btn btn-info btn-sm';
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
  };

  var layers = document.getElementById('content');
  layers.appendChild(link);
};
