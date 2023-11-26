/*
  File: mapScript.js

  Description: This file contains JavaScript code for the map2.html for
  mobilemap geolocation app first. The file uses OpenLayers API for the map generation and 
  maker display. The file also uses maptiler for the map that is displayed and for the markers
  that are on it. Abandoned at this stage to work with geolocation that group member figured out.

  resources: https://cloud.maptiler.com/maps/satellite/ - for the map itself
            https://docs.maptiler.com/openlayers/default-marker/marker-icon.png - for the marker icon
            https://docs.maptiler.com/openlayers/default-marker/ - for help with creation
            https://www.youtube.com/watch?v=eusybY8qAac&t=111s - for help with creation
            chat.openai.com - for help debugging and commenting

  Author: Christian Sawyer A00428578
  Commenting: Christian Sawyer A00428578
  Testing: Christian Sawyer A00428578
  Date: November 2023
*/

/**
 *
 * This control displays attribution information about the map data. It is part of the OpenLayers library.
 * The created instance is configured with the following options:
 *
 * @param {boolean} collapsible - If set to false, the attribution control will not be collapsible.
 *                                If set to true, it allows collapsing the attribution control.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_control_Attribution.html|OpenLayers Attribution Control}
 */
const attribution = new ol.control.Attribution({
  // Set the 'collapsible' option to false, preventing the attribution control from being collapsible
  collapsible: false,
});

/**
 *
 * This source represents a TileJSON source in OpenLayers, which is used to load map tiles.
 * TileJSON is a format for describing tilesets and is often used for configuring map layers.
 * The created instance is configured with the following options:
 *
 * @param {string} url - The URL from which to load the TileJSON data.
 * @param {number} tileSize - The size of the tiles in pixels.
 * @param {string} crossOrigin - The crossOrigin setting for loading tiles. Set to 'anonymous' for cross-origin requests without credentials.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_source_TileJSON-TileJSON.html|OpenLayers TileJSON Source}
 */
const source = new ol.source.TileJSON({
  // Set the URL from which to load the TileJSON data. This URL points to a MapTiler service for satellite imagery.
  url: `https://api.maptiler.com/maps/satellite/tiles.json?key=tQx8zFcmxYeAJ9ER3Ufz`,

  // Set the size of the tiles. In this case, the tileSize is set to 512 pixels.
  tileSize: 512,

  // Set the crossOrigin option to 'anonymous' to indicate that cross-origin requests should be made without credentials.
  crossOrigin: 'anonymous'
});

/**
 *
 * This code initializes an OpenLayers map with specific configurations.
 * It includes a single Tile layer with a TileJSON source, custom map controls, and a specific initial view
 * at the center most checkpoint of the trail checkpoint's.
 *
 * @param {Array} layers - An array of map layers. In this case, a Tile layer with the TileJSON source.
 * @param {Array} controls - An array of map controls. The default attribution control is disabled, and a custom attribution control is added.
 * @param {string} target - The ID of the HTML element where the map will be rendered.
 * @param {ol.View} view - The view configuration for the map, including the initial center and zoom level.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map.html|OpenLayers Map}
 */

const map = new ol.Map({
  // Define the layers for the map. In this case, a single Tile layer with the previously created TileJSON source.
  layers: [
    new ol.layer.Tile({
      source: source
    })
  ],

  // Set up map controls. In this case, disable the default attribution control and add a custom attribution control.
  controls: ol.control.defaults.defaults({ attribution: false }).extend([attribution]),

  // Specify the target HTML element where the map will be rendered. In this case, an element with the ID 'map'.
  target: 'map',

  // Set up the view for the map, including the center and initial zoom level.
  view: new ol.View({
    constrainResolution: true,

    // Set the initial center of the map using the OpenLayers projection from longitude and latitude coordinates.
    center: ol.proj.fromLonLat([-63.923103, 44.6261]), // starting position [lng, lat]

    // Set the initial zoom level of the map.
    zoom: 19 // starting zoom
  })
});


/**
 *
 * This code creates a Vector layer for the trailhead marker on the map using OpenLayers.
 * The layer includes a Point feature at the Trail Head location and is styled with an icon and text 
 * saying "Trail Head".
 *
 * @param {ol.source.Vector} source - The source for the vector layer containing the trailhead marker feature.
 * @param {ol.style.Style} style - The style configuration for the vector layer, including the marker's image and text.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Text-Text.html|OpenLayers Text Style}
 */
const trailHead = new ol.layer.Vector({
  // Set the source for the vector layer, which contains a single Point feature representing the trailhead location
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        // Specify the geometry of the feature as a Point with coordinates converted from longitude and latitude
        geometry: new ol.geom.Point(ol.proj.fromLonLat([-63.923519, 44.626459])),
      })
    ]
  }),

  // Define the style for the vector layer, including the image and text for the marker
  style: new ol.style.Style({
    // Create the marker's image using an Icon style with a specified anchor, crossOrigin, and image source URL
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      crossOrigin: 'anonymous',
      src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
    }),

    // Define text style for the marker, including the text content, scale, fill color, and stroke color
    text: new ol.style.Text({
      text: "Trail Head", // Text content for the marker
      scale: 1.2, // Scale factor for the text
      fill: new ol.style.Fill({
        color: "#fff" // Fill color for the text
      }),
      stroke: new ol.style.Stroke({
        color: "0", // Stroke color for the text
        width: 3 // Stroke width for the text
      })
    })
  })
});

/**
 * Hazelnut Tree Marker Layer
 *
 * This Vector layer represents the hazelnut tree marker on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const hazelnutTree = makeMarker(-63.923296, 44.626375);

/**
 * Bent Apple Trees Marker Layer
 *
 * This Vector layer represents a marker for the bent apple trees on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const bentAppleTrees = makeMarker(-63.923206, 44.626245);


/**
 * Pear Tree Marker Layer
 *
 * This Vector layer represents a marker for the pear tree on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const pearTree = makeMarker(-63.923128, 44.626235);


/**
 * Cherry Arch Marker Layer
 *
 * This Vector layer represents a marker for the cherry arch on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const cherryArch = makeMarker(-63.923098, 44.626174);

/**
 * Spruce Grove Start Marker Layer
 *
 * This Vector layer represents a marker for the start of the spruce grove on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const spruceGroveStart = makeMarker(-63.923103, 44.6261);


/**
 * Old Foundation Marker Layer
 *
 * This Vector layer represents a marker for the old foundation on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const oldFoundation = makeMarker(-63.922964, 44.626089);


/**
 * Spruce Grove End Marker Layer
 *
 * This Vector layer represents a marker for the end of the spruce grove on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const spruceGroveEnd = makeMarker(-63.922846, 44.626003);

/**
 * Big Grove Marker Layer
 *
 * This Vector layer represents a marker for the location of the big grove on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const bigGrove = makeMarker(-63.922715, 44.625959);

/**
 * Old Well Marker Layer
 *
 * This Vector layer represents a marker for the location of the old well on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const oldWell = makeMarker(-63.922742, 44.625875);


/**
 * Big Apple Tree Marker Layer
 *
 * This Vector layer represents a marker for the location of the big apple tree on the map, created using the makeMarker function.
 * The marker is positioned at the specified longitude and latitude coordinates.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const bigAppleTree = makeMarker(-63.922568, 44.625831);


/**
 * Trail End Marker Layer
 *
 * This Vector layer represents a marker for the end of the trail on the map, created using the OpenLayers library.
 * The marker is positioned at the specified longitude and latitude coordinates and includes an image and text label.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Text-Text.html|OpenLayers Text Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
const trailEnd = new ol.layer.Vector({
  // Set the source for the vector layer, which contains a single Point feature representing the trail end location
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        // Specify the geometry of the feature as a Point with coordinates converted from longitude and latitude
        geometry: new ol.geom.Point(ol.proj.fromLonLat([-63.922404, 44.625837])),
      })
    ]
  }),

  // Define the style for the vector layer, including the image and text for the marker
  style: new ol.style.Style({
    // Create the marker's image using an Icon style with a specified anchor, crossOrigin, and image source URL
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      crossOrigin: 'anonymous',
      src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
    }),

    // Define text style for the marker, including the text content, scale, fill color, and stroke color
    text: new ol.style.Text({
      text: "Trail End", // Text content for the marker
      scale: 1.2, // Scale factor for the text
      fill: new ol.style.Fill({
        color: "#fff" // Fill color for the text
      }),
      stroke: new ol.style.Stroke({
        color: "0", // Stroke color for the text
        width: 3 // Stroke width for the text
      })
    })
  })
});

// Invoke the function to add all marker layers to the map
addAllMarkers();

/**
 *
 * This function adds the various marker layers representing different points of interest to the specified OpenLayers map.
 * The markers include trailheads, trees, arches, grove starts and ends, foundations, wells, and the end of the trail.
 *
 * @param {ol.Map} map - The OpenLayers map to which the marker layers will be added.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map.html|OpenLayers Map}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 */
function addAllMarkers(map) {
  // Add marker layers to the map
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
 * Marker Creation Function
 *
 * This function creates a Vector layer with a marker at the specified longitude and latitude using OpenLayers.
 * The marker is styled with an icon.
 *
 * @param {number} longitude - The longitude coordinate of the marker.
 * @param {number} latitude - The latitude coordinate of the marker.
 * @returns {ol.layer.Vector} - A Vector layer containing a Point feature representing the marker.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html|OpenLayers Vector Layer}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html|OpenLayers Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html|OpenLayers Icon Style}
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html|OpenLayers Point Geometry}
 */
function makeMarker(longitude, latitude) {
  // Create a Vector layer for the hazelnut Tree marker using the OpenLayers library
  const marker = new ol.layer.Vector({
    // Set the source for the vector layer, which contains a single Point feature representing the marker location
    source: new ol.source.Vector({
      features: [
        new ol.Feature({
          // Specify the geometry of the feature as a Point with coordinates converted from longitude and latitude
          geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])),
        })
      ]
    }),

    // Define the style for the vector layer, including the image for the marker
    style: new ol.style.Style({
      // Create the marker's image using an Icon style with a specified anchor, crossOrigin, and image source URL
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        crossOrigin: 'anonymous',
        src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
      }),
    })
  });

  return marker;
}
