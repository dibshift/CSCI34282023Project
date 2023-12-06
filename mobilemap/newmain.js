/*
  File: newmain.js

  Description: This file contains JavaScript code for the index.html for
  mobilemap geolocation app. The file uses OpenLayers API for the map generation and 
  geolocation, and displaying of the user's current location with a dot. The file also
  uses bootstrap and offCanvas for displaying the initial location consent pop up with button.
  This is also used for the pop up that occurs when a generated location boundary is entered
  or clicked to show information about the location as well as associated photos. Location boundaries made with json with 
  the help of geojson.io are semi-transparent polygons on the map. Park.json contains test locations 
  on campus and smutest.json contains campus locations only. Code resources used were openLayers git 
  repo under geolocation-orientation and just geolocation. Javadoc comments made with the help of ChatGPT. 
  JSON files made with help from geojson.io.

  

  resource: https://github.com/openlayers/openlayers/blob/main/examples/geolocation-orientation.js#L29
            geojson.io

  Author: Devin Robar A00446150
  Commenting: Christian Sawyer A00428578, Devin Robar A00446150
  Testing: Devin Robar A00446150, Christian Sawyer A00428578
  Date: November 2023
*/
import './style.css';
import { Map, View, Geolocation } from 'ol';
import TileLayer from 'ol/layer/Tile';
// OpenSourceMap
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';
import Feature from 'ol/Feature.js';
// Used for creating the location dot
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import Point from 'ol/geom/Point.js';

import GeoJSON from 'ol/format/GeoJSON.js';


/**
 * Represents a temporary variable for displaying information about the checkpoints on the
 * map when interacted with.
 *
 * @type {string}
 * @default "No features found"
 */
let tempDisplayInfo = "No features found";

/**
 * Represents an instance of the Bootstrap Offcanvas component for the starting pop up
 * that is displayed when the page first loads asking for consent for location tracking.
 *
 * @type {Offcanvas}
 */
const bsStartOffcanvas = new bootstrap.Offcanvas('#offcanvasStart');

/**
 * Represents the HTML element with the ID 'allowTrackingbtn' that is
 * the button on the offCanvasStart portion.
 *
 * @type {HTMLElement}
 */
const allowTrackingbtn = document.getElementById('allowTrackingbtn');

/**
 * Represents an instance of the Bootstrap Offcanvas component for the offcanvas
 * that happens when a checkpoint is clicked/entered.
 *
 * @type {Offcanvas}
 */
const bsAreaOffcanvas = new bootstrap.Offcanvas('#offcanvasArea');

/**
 * Creates a view instance to define the initial center and zoom level of the map.
 *
 * @class
 * @classdesc Represents a view configuration for a map instance.
 *
 * @param {Object} options - Options for configuring the view.
 * @param {Array<number>} options.center - The initial center coordinates of the map, specified as Lon/Lat.
 * Currently using "Old Foundation" from previous map
 * @param {number} options.zoom - The initial zoom level of the map.
 * @throws {Error} Throws an error if the center coordinates or zoom level are not provided or are invalid.
 */
const view = new View({
  center: fromLonLat([-63.922964, 44.626089]), // Setting the initial center coordinates using Lon/Lat
  zoom: 19, // Setting the initial zoom level
});

/**
 * Creates a tile layer with OpenStreetMap as the data source for the style of map
 * that it will be.
 *
 *
 * @param {Object} options - Options for configuring the tile layer.
 * @param {Tile} options.source - The source of the tile layer, in this case, an instance of OpenStreetMap (OSM).
 * @throws {Error} Throws an error if the source is not provided or lacks necessary properties.
 */
const tileLayer = new TileLayer({
  source: new OSM(), // The source of the tile layer, using OpenStreetMap
});

/**
 * Creates a map instance with specified OSM tileLayer and viewposition to the map
 *
 *
 * @param {Object} options - Options for configuring the map instance.
 * @param {string} options.target - The HTML element ID to which the map will be attached.
 * @param {Array<Layer>} options.layers - An array of layers to be added to the map.
 * @param {View} options.view - The view defining the initial center and zoom level of the map.
 * @throws {Error} Throws an error if the target element ID, layers, or view are not provided or lack necessary properties.
 */
const map = new Map({
  target: 'map', // The HTML element ID 'map' to which the map will be attached
  layers: [tileLayer], // Array of layers, in this case, only the OpenStreetMap Tile Layer
  view: view, // The View instance defining the initial center and zoom level
});



/**
 * Creates the new Geolocation instance with specified configuration options below.
 *
 * @class
 * @classdesc Represents a Geolocation instance providing access to the user's location.
 *
 * @param {Object} options - Configuration options for geolocation tracking.
 * @param {Object} options.trackingOptions - Options for geolocation tracking.
 * @param {number} options.trackingOptions.maximumAge - Maximum age of cached position information in milliseconds (10 sec).
 * @param {boolean} options.trackingOptions.enableHighAccuracy - Whether to enable high-accuracy mode for more precise locations.
 * @param {number} options.trackingOptions.timeout - Maximum time allowed to obtain a position in milliseconds (60 sec).
 * @param {Projection} options.projection - The projection of the geolocation based on the view's projection.
 *   Ensures consistency in the coordinate systems used by the map and geolocation.
 * @throws {Error} Throws an error if the configuration options are not provided or lack necessary properties.
 */
const geolocation = new Geolocation({
  // Configuration options for geolocation tracking
  trackingOptions: {
    maximumAge: 10000,          // Maximum age of cached position information in milliseconds (10 sec)
    enableHighAccuracy: true,   // Whether to enable high-accuracy mode for more precise locations
    timeout: 600000,            // Maximum time allowed to obtain a position in milliseconds (60 sec)
  },

  // Setting the projection of the geolocation based on the view's projection
  // This ensures consistency in the coordinate systems used by the map and geolocation
  projection: view.getProjection(),
});

/**
 * Event handler for the click event on the 'allowTrackingbtn' element that enables 
 * the geolocation to start and hides the initial offcanvas message for consenting location
 * tracking.
 *
 * @throws {Error} Throws an error if geolocation tracking fails to enable or if map rendering encounters issues.
 */
allowTrackingbtn.addEventListener(
  'click',
  function () {
    // Enabling geolocation tracking when the button is clicked
    geolocation.setTracking(true);

    tileLayer.on('postrender', updateView);

    // Rendering the map to reflect the updated geolocation information
    map.render();

    // Hiding the start offcanvas once tracking is allowed
    bsStartOffcanvas.hide();
  }
);

/**
 * Event handler for errors that arise with the geolocation object geolocation.
 *
 * @param {Error} error - The error object containing information about the geolocation error.
 * @throws {Error} Throws an error if the error object is not provided or lacks necessary properties.
 */
geolocation.on('error', function (error) {
  // Displaying an alert with the error message when a geolocation error occurs
  alert(error.message);
});

/**
 * Represents a geographical feature indicating the accuracy of the current geolocation position.
 *
 * @type {Feature}
 */
const accuracyFeature = new Feature();

/**
 * Represents a geographical feature indicating the current geolocation position.
 *
 * @type {Feature}
 */
const positionFeature = new Feature();

/**
 * Styles the geolocation position feature with a circle to visually represent the user's position on the map.
 *
 * @param {number} radius - The radius of the circle representing the position.
 * @param {string} fillColor - The fill color of the circle.
 * @param {string} strokeColor - The stroke color of the circle.
 * @param {number} strokeWidth - The stroke width of the circle.
 * @throws {Error} Throws an error if any of the styling parameters are invalid.
 */
positionFeature.setStyle(
  new Style({
    image: new CircleStyle({
      radius: 6,  // Radius of the circle representing the position
      fill: new Fill({
        color: '#3399CC',  // Fill color of the circle
      }),
      stroke: new Stroke({
        color: '#fff',  // Stroke color of the circle
        width: 2,       // Stroke width of the circle
      }),
    }),
  })
);

/**
 * Represents a Vector Layer on a map, containing geographical features sourced from geojson
 * for use in the creation of the areas on the trail checkpoints/testing areas on campus.
 *
 *
 * @property {Map} map - The map associated with the vector layer.
 * @property {VectorSource} source - The source of geographical features for the vector layer.
 *   This includes accuracy and position features as well as additional features loaded from a GeoJSON source.
 * @property {string} url - The URL pointing to the GeoJSON file for loading additional features.
 * @property {GeoJSON} format - The format used for parsing GeoJSON data.
 * @throws {Error} Throws an error if the map or vector source is not provided or if the GeoJSON file URL is invalid.
 */
const vectorLayerz = new VectorLayer({
  // Associating the vector layer with the map
  map: map,

  // Providing a VectorSource with features to the vector layer
  source: new VectorSource({
    // Including accuracy and position features in the vector layer
    features: [accuracyFeature, positionFeature],

    // Loading additional features from a GeoJSON source
    url: 'smutest.json',   // the GeoJSON file for creating area boundaries, smutest.json contains smu test locations only,
    format: new GeoJSON(),  // Using the GeoJSON format for parsing the data, park.json contains smutest and park areas
  }),
});

/**
 * Event handler for the 'change' event of the geolocation service.
 * This function updates the position and accuracy features on the map based on the current geolocation information.
 *
 * @event geolocation.on('change')
 * @function
 * @throws {Error} If there is an issue with setting or updating the position and accuracy features.
 *
 * @description
 * The function performs the following actions:
 * 1. Updates the position feature geometry based on the current geolocation position.
 * 2. Updates the accuracy feature geometry based on the current geolocation accuracy information.
 * 3. Centers the map view on the updated positionFeature.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API} for information on the Geolocation API.
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html} for information on the OpenLayers Point geometry.
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_View-View.html#setCenter} for information on the OpenLayers setCenter method.
 */
geolocation.on('change', function () {
  // Updating the position feature geometry based on the current geolocation position
  positionFeature.setGeometry(geolocation.getPosition() ? new Point(geolocation.getPosition()) : null);

  // Updating the accuracy feature geometry based on the current geolocation accuracy information
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  // map.render();

  // Centering the map view on the updated positionFeature
  view.setCenter(positionFeature.getGeometry().getCoordinates());


});

/**
 * Event handler for the 'change' event of the geolocation service.
 * This function updates the position and accuracy features on the map based on the current geolocation information.
 *
 * @event geolocation.on('change')
 * @function
 * @throws {Error} If there is an issue with setting or updating the position and accuracy features.
 *
 * @description
 * The function performs the following actions:
 * 1. Updates the position feature geometry based on the current geolocation position.
 * 2. Updates the accuracy feature geometry based on the current geolocation accuracy information.
 * 3. Centers the map view on the updated positionFeature.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API} for information on the Geolocation API.
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html} for information on the OpenLayers Point geometry.
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_View-View.html#setCenter} for information on the OpenLayers setCenter method.
 */
function handleGeolocationChange() {
  try {
    // Updating the position feature geometry based on the current geolocation position
    positionFeature.setGeometry(geolocation.getPosition() ? new Point(geolocation.getPosition()) : null);

    // Updating the accuracy feature geometry based on the current geolocation accuracy information
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());

    // Centering the map view on the updated positionFeature
    view.setCenter(positionFeature.getGeometry().getCoordinates());
  } catch (error) {
    throw new Error('Error handling geolocation change: ' + error.message);
  }
}

/**
 * Event handler for the 'click' event on the map.
 * This function calls another function to display information about the clicked feature based on the clicked pixel.
 *
 * @event map.on('click')
 * @function
 * @param {Object} evt - The click event object containing information about the click, such as the clicked pixel.
 * @throws {Error} If there is an issue with displaying information about the clicked feature.
 *
 * @description
 * The function performs the following actions:
 * 1. Captures the click event on the map.
 * 2. Calls the 'displayFeatureInfo' function to show information about the clicked feature based on the clicked pixel.
 *
 * @param {Object} evt.pixel - The pixel coordinates of the clicked point on the map.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_MapBrowserEvent-MapBrowserEvent.html} for information on OpenLayers MapBrowserEvent.
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#on} for information on the OpenLayers map 'on' method.
 * @see {@link displayFeatureInfo} for information on the function that displays feature information.
 */
map.on('click', function (evt) {
  // Calling the function to display information about the clicked feature based on the clicked pixel
  displayFeatureInfo(evt.pixel);
});

/**
 * Event handler for the 'click' event on the map.
 * This function calls another function to display information about the clicked feature based on the clicked pixel.
 *
 * @event map.on('click')
 * @function
 * @param {Object} evt - The click event object containing information about the click, such as the clicked pixel.
 * @throws {Error} If there is an issue with displaying information about the clicked feature.
 *
 * @description
 * The function performs the following actions:
 * 1. Captures the click event on the map.
 * 2. Calls the 'displayFeatureInfo' function to show information about the clicked feature based on the clicked pixel.
 *
 * @param {Object} evt.pixel - The pixel coordinates of the clicked point on the map.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_MapBrowserEvent-MapBrowserEvent.html} for information on OpenLayers MapBrowserEvent.
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#on} for information on the OpenLayers map 'on' method.
 * @see {@link displayFeatureInfo} for information on the function that displays feature information.
 */
map.on('click', function (evt) {
  // Calling the function to display information about the clicked feature based on the clicked pixel
  displayFeatureInfo(evt.pixel);
});



/**
 * Retrieves and processes geographical features based on pixel coordinates given to it.
 *
 * @param {Array<number>} pixel - The pixel coordinates representing the clicked location on the map.
 * @throws {Error} Throws an error if the vector layer is not initialized or the pixel coordinates are invalid.
 */
const displayFeatureInfo = function (pixel) {
  // Retrieving features from the vector layer based on the clicked pixel coordinates
  vectorLayerz.getFeatures(pixel).then(function (features) {
    // Extracting the first feature from the result (if any)
    const feature = features.length ? features[0] : undefined;

    // Getting the 'info' element from the document
    const info = document.getElementById('info');

    // Checking if features are present
    if (features.length) {
      // If features are present, call the displayInformation function with the feature as a parameter
      displayInformation(feature);
    }
  });
};

/**
 * Displays detailed information about a geographical feature.
 *
 * @author Devin Robar A00446150
 * @param {Feature} feature - The geographical feature to display information about.
 * @throws {Error} Throws an error if the feature is not provided or lacks necessary properties.
 */
function displayInformation(feature) {


  // Updating the text content of HTML elements in the offcanvas
  $("#offcanvasBottomLabel").text(feature.get('NAME'));
  $("#AreaDESC").text(feature.get('DESC'));

  //switch case for loading images with test locations
  switch (feature.get('NAME')) {
    case "Loyd":
      $("#imgbox1").attr("href", "photos/farmhouse 1.jpg");
      $("#imgboximg1").attr("src", "photos/farmhouse 1.jpg");

      $("#imgbox2").attr("href", "photos/farmhouse 2.jpg");
      $("#imgboximg2").attr("src", "photos/farmhouse 2.jpg");

      $("#imgbox3").attr("href", "photos/fauna.jpg");
      $("#imgboximg3").attr("src", "photos/fauna.jpg");
      break;
    case "Place":
      $("#imgbox1").attr("href", "photos/trailhead 1.jpg");
      $("#imgboximg1").attr("src", "photos/trailhead 1.jpg");

      $("#imgbox2").attr("href", "photos/trailhead 2.jpg");
      $("#imgboximg2").attr("src", "photos/trailhead 2.jpg");

      $("#imgbox3").attr("href", "photos/well.jpg");
      $("#imgboximg3").attr("src", "photos/well.jpg");
      break;
    default:
      $("#imgbox1").attr("href", "photos/yellow birch sitting 1.jpg");
      $("#imgboximg1").attr("src", "photos/yellow birch sitting 1.jpg");

      $("#imgbox2").attr("href", "photos/yellow birch sitting 2.jpg");
      $("#imgboximg2").attr("src", "photos/yellow birch sitting 2.jpg");

      $("#imgbox3").attr("href", "photos/yellow birch.jpg");
      $("#imgboximg3").attr("src", "photos/yellow birch.jpg");
      break;
  }

  // Showing the offcanvas to display detailed information
  bsAreaOffcanvas.show();
}


/**
 * Initializes the application by displaying the start offcanvas.
 *
 * @function
 *
 * @description
 * This function is responsible for setting up the application. It specifically performs the following action:
 * - Shows the start offcanvas when the application is initialized.
 *
 * @throws {Error} If there is an issue with displaying the start offcanvas.
 *
 * @see {@link bsStartOffcanvas} for information on the Bootstrap Start Offcanvas component used in the application.
 * @see {@link https://getbootstrap.com/docs/5.0/components/offcanvas/} for Bootstrap Offcanvas documentation.
 */
function setup() {
  // Showing the start offcanvas when the application is set up
  bsStartOffcanvas.show();
}

// Calling the setup function to initialize the application
setup();

/**
 * Updates the view by retrieving information from a placed geometry (from GeoJSON) and creating a list of information from that map.
 *
 * @function
 *
 * @description
 * This function performs the following actions:
 * - Retrieves features from the vector layer based on the geolocation position.
 * - Extracts the first feature from the result (if any).
 * - Checks if the feature's name has changed and is not undefined.
 * - If the name has changed, updates the temporary display information and calls a function to display detailed information about the feature.
 *
 * @throws {Error} If there is an issue with retrieving features or displaying information.
 *
 * @see {@link vectorLayerz} for information on the vector layer used in the application.
 * @see {@link geolocation} for information on the geolocation service.
 * @see {@link displayInformation} for information on the function that displays detailed information about a feature.
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#getPixelFromCoordinate} for information on the OpenLayers getPixelFromCoordinate method.
 */
function updateView() {

  // Retrieving features from the vector layer based on the geolocation position
  vectorLayerz.getFeatures(map.getPixelFromCoordinate(geolocation.getPosition())).then(function (features) {
    // Extracting the first feature from the result (if any)
    const feature = features.length ? features[0] : undefined;

    // Checking if features are present
    if (features.length) {
      // Checking if the feature's name has changed and it's not undefined
      if (feature.get("NAME") !== tempDisplayInfo && tempDisplayInfo !== undefined && feature.get("NAME") !== undefined) {
        // Updating tempDisplayInfo and displaying information about the feature
        tempDisplayInfo = feature.get('NAME');
        displayInformation(feature);
      }
    } else {
      // Alerting the user if no features are found (optional)
      // alert('No features found');
    }
  });
}