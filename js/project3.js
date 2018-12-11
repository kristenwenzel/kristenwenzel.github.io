/* overview code | K Wenzel 2018 */

mapboxgl.accessToken = 'pk.eyJ1Ijoia213ZW56ZWwiLCJhIjoiY2o3NnkwaTk3MXUybTMzbDh1NXN2b3J0ZCJ9.wfH3ovobwI2b0J1KT2DiSg';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/kmwenzel/cjp2tu6fa2bfl2ro7boje4q3o', // stylesheet location
  center: [-92.329961, 38.838261], // starting position
  zoom: 6 // starting zoom
});

$(function () {
  $('[data-toggle="popover"]').popover()
})

map.on('load', function(){
  map.addSource("flowMeter", {
    type: "geojson",
    data: 'https://web.fulcrumapp.com/shares/f434e2bf2b1d6b0c.geojson',
    cluster: true,
    clusterMaxZoom: 10,
    clusterRadius: 50,
  })

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "flowMeter",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#FFDF4C",
        10,
        "#FFD200",
        20,
        "#CCA800",
        30,
        "#7F6900",
        35,
        "#FFD200"
      ],
      "circle-radius": [
        "step",
        ["get", "point_count"],
        8,
        10,
        16,
        20,
        24,
        30,
        32,
      ],
      "circle-opacity": 0.8
    }
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "flowMeter",
    filter: ["has", "point_count"],
    layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 10,
    }
});
map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "flowMeter",
    filter: ["!", ["has", "point_count"]],
    paint: {
        "circle-color": "#860F2E",
        "circle-radius": 5,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
        "circle-opacity": 0.6
    },
    minzoom: 8
});


// inspect a cluster on click
map.on('click', 'clusters', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('flowMeter').getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err)
            return;

        map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
        });
    });
});

map.on('mouseenter', 'clusters', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'clusters', function () {
    map.getCanvas().style.cursor = '';
});

map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-94.602724, 39.086922]
                },
                "properties": {
                    "title": "",
                    "icon": "monument"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-92.335375, 38.938696]
                },
                "properties": {
                    "title": "Columbia, MO",
                    "icon": "monument"
                }
            },
             {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-90.265383, 38.615239]
            },
            "properties": {
                "title": "St. Louis, MO",
                "icon": "monument"
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-93.300319, 37.159554]
            },
            "properties": {
                "title": "Springfield, MO",
                "icon": "monument"
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-90.029398, 35.114795]
            },
            "properties": {
                "title": "Memphis, TN",
                "icon": "monument"
            }
        },
         {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-95.257801, 38.965710]
        },
        "properties": {
            "title": "Lawrence, KS",
            "icon": "harbor"
        }
    }]
        }
    },
    "layout": {
        "icon-image": "{icon}-15",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-size": 10,
        "text-offset": [0, 0.6],
        "text-anchor": "top"
    },
    minzoom: 7
});
// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on('click', 'points', function (e) {
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 16
    });
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map.on('mouseenter', 'points', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
});
});
