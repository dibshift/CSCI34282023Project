const attribution = new ol.control.Attribution({
  collapsible: false,
});

//source for map type
const source = new ol.source.TileJSON({
  url: `https://api.maptiler.com/maps/satellite/tiles.json?key=tQx8zFcmxYeAJ9ER3Ufz`, // source URL
  tileSize: 512,
  crossOrigin: 'anonymous'
});

//create map with the source data
const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: source
    })
  ],
  //display map centered on the coordinate of the midle point of the trail
  controls: ol.control.defaults.defaults({ attribution: false }).extend([attribution]),
  target: 'map',
  view: new ol.View({
    constrainResolution: true,
    center: ol.proj.fromLonLat([-63.923103, 44.6261]), // starting position [lng, lat]
    zoom: 19 // starting zoom
  })
});

//Trailhead marker creation
const trailHead = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([-63.923519, 44.626459])),
      })
    ]
  }),
  //create the marker's image
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      crossOrigin: 'anonymous',
      src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
    }),
    text: new ol.style.Text({ // Define text style here
      text: "Trail Head",
      scale: 1.2,
      fill: new ol.style.Fill({
        color: "#fff"
      }),
      stroke: new ol.style.Stroke({
        color: "0",
        width: 3
      })
    })
  })
});


//create a layer for the hazelnut Tree marker
const hazelnutTree = makeMarker(-63.923296, 44.626375);

//create a layer for the bent apple tree marker
const bentAppleTrees = makeMarker(-63.923206, 44.626245);

//create a layer for the pear tree
const pearTree = makeMarker(-63.923128, 44.626235);

//create a layer for the cherry arch
const cherryArch = makeMarker(-63.923098, 44.626174);

//create a layer for the begining of the spruce grove
const spruceGroveStart = makeMarker(-63.923103, 44.6261);

//create a layer for the old Foundation
const oldFoundation = makeMarker(-63.922964, 44.626089);

//create a layer for the end of the spruce grove
const spruceGroveEnd = makeMarker(-63.922846, 44.626003);

//create a layer for the big grove marker
const bigGrove = makeMarker(-63.922715, 44.625959);

//create a layer for the old well marker
const oldWell = makeMarker(-63.922742, 44.625875);

//create a layer for the big apple tree marker
const bigAppleTree = makeMarker(-63.922568, 44.625831);

//create a layer for the trail end marker
const trailEnd = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([-63.922404, 44.625837])),
      })
    ]
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      crossOrigin: 'anonymous',
      src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
    }),
    //text labelling marker
    text: new ol.style.Text({
      text: "Trail End",
      scale: 1.2,
      fill: new ol.style.Fill({
        color: "#fff"
      }),
      stroke: new ol.style.Stroke({
        color: "0",
        width: 3
      })
    })
  })
});

addAllMarkers();


/**
 * Author: Christian Sawyer
 * 
 * Adds the layer of each of the markers
 */
function addAllMarkers() {
  //add marker layers
  map.addLayer(trailHead);
  map.addLayer(hazelnutTree);
  map.addLayer(bentAppleTrees);
  map.addLayer(pearTree);
  map.addLayer(cherryArch);
  map.addLayer(spruceGroveStart);
  map.addLayer(oldFoundation);
  map.addLayer(spruceGroveEnd);
  map.addLayer(bigGrove);
  map.addLayer(oldWell);
  map.addLayer(bigAppleTree);
  map.addLayer(trailEnd);

}
/**
 * Author: Christian Sawyer
 * 
 * creates a layer for a marker and sets the location
 * at the given longitude and latitude.
 *  
 */
function makeMarker(longitude, latitude) {
  //create a layer for the hazelnut Tree marker
  const marker = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])),
        })

      ]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        crossOrigin: 'anonymous',
        src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
      }),
    })
  });

  return marker;

}