/*
  File: oldMain.js

  NOT FULLY FUNCTIONING VERSION SEE newmain.js

  Description: This file contains JavaScript code for the index.html for
  mobilemap geolocation app. The file uses OpenLayers API for the map generation and 
  geolocation, and displaying of the user's current location with a dot. The file also
  uses bootstrap and offCanvas for displaying the initial location consent pop up with button.
  This is also used for the pop up that occurs when a generated location boundary is entered
  or clicked to show information about the location. Location boundaries made with json with 
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

// Array for holding positions that have been gained from the gps?
import LineString from 'ol/geom/LineString.js';
// 
import Feature from 'ol/Feature.js';
// Used for creating the location dot
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import Point from 'ol/geom/Point.js';

import GeoJSON from 'ol/format/GeoJSON.js';

// This is for features.length
let tempVar = "No features found";

// Maybe move this stuff to another file
const bsStartOffcanvas = new bootstrap.Offcanvas('#offcanvasStart');
const bsAreaOffcanvas = new bootstrap.Offcanvas('#offcanvasArea');
const allowTrackingbtn = document.getElementById('allowTrackingbtn');

// starting view
// Currently using the "Old Foundation" from the old map as a starting point
const view = new View({
  center: fromLonLat([-63.922964, 44.626089]),
  zoom: 19,
});

const tileLayer = new TileLayer({
  source: new OSM()
});

const map = new Map({
  target: 'map',
  layers: [tileLayer],
  view: view,
});

// User location variable
const geolocation = new Geolocation({
  trackingOptions: {
    maximumAge: 10000,
    enableHighAccuracy: true,
    timeout: 600000,
  },
  // I don't know what this is but all the examples have it so it might be a good idea
  projection: view.getProjection(),
});

allowTrackingbtn.addEventListener(
  'click',
  function () {
    geolocation.setTracking(true);
    tileLayer.on('postrender', updateView);
    map.render();
    bsStartOffcanvas.hide();
  }
)

// Stollen code for testing

// LineString to store the different geolocation positions. This LineString
// is time aware.
// The Z dimension is actually used to store the rotation (heading).
const positions = new LineString([], 'XYZM');
let deltaMean = 500;

// handle geolocation error.
// ! TODO: figure out the best way to show the error
geolocation.on('error', function (error) {
  alert(error.message);
});

const accuracyFeature = new Feature();

const positionFeature = new Feature();
positionFeature.setStyle(
  new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#3399CC',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
  })
);

geolocation.on('change', function () {

  const position = geolocation.getPosition();
  const accuracy = geolocation.getAccuracy();
  const heading = geolocation.getHeading() || 0;
  const speed = geolocation.getSpeed() || 0;
  const m = Date.now();

  addPosition(position, heading, m, speed);

  const coords = positions.getCoordinates();
  const len = coords.length;
  if (len >= 2) {
    deltaMean = (coords[len - 1][3] - coords[0][3]) / (len - 1);
  }

  updateView();
});

const vectorLayerz = new VectorLayer({
  map: map,
  source: new VectorSource({
    features: [accuracyFeature, positionFeature],
    // GeoJSON
    url: 'smutest.json',
    format: new GeoJSON(),
  }),
});


function addPosition(position, heading, m, speed) {
  const x = position[0];
  const y = position[1];
  const fCoords = positions.getCoordinates();
  const previous = fCoords[fCoords.length - 1];
  const prevHeading = previous && previous[2];
  if (prevHeading) {
    let headingDiff = heading - mod(prevHeading);

    // force the rotation change to be less than 180°
    if (Math.abs(headingDiff) > Math.PI) {
      const sign = headingDiff >= 0 ? 1 : -1;
      headingDiff = -sign * (2 * Math.PI - Math.abs(headingDiff));
    }
    heading = prevHeading + headingDiff;
  }
  positions.appendCoordinate([x, y, heading, m]);

  // only keep the 20 last coordinates
  positions.setCoordinates(positions.getCoordinates().slice(-20));

}

let previousM = 0;
function updateView() {
  // use sampling period to get a smooth transition
  let m = Date.now() - deltaMean * 1.5;
  m = Math.max(m, previousM);
  previousM = m;
  // interpolate position along positions LineString
  const c = positions.getCoordinateAtM(m, true);
  if (c) {
    view.setCenter(getCenterWithHeading(c, -c[2], view.getResolution()));
    // view.setRotation(-c[2]);
    positionFeature.setGeometry(geolocation.getPosition() ? new Point(geolocation.getPosition()) : null);
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    // map.render();

    map.getView().setRotation(-c[2]);
    // Center the view on the positionFeature
    view.setCenter(positionFeature.getGeometry().getCoordinates());

    // Clean 
    // takes information from a placed geometry. (from GeoJSON) and makes a list of info from that map.
    // TODO: Make it so that it only does that when entering an area
    vectorLayerz.getFeatures(map.getPixelFromCoordinate(geolocation.getPosition())).then(function (features) {
      const feature = features.length ? features[0] : undefined;
      if (features.length) {
        ;
        if (feature.get("NAME") != tempVar && tempVar != undefined && feature.get("NAME") != undefined) {
          tempVar = feature.get('NAME');
          displayInformation(feature)
        }
      } else {
        //alert('No features found');
      }
    });
  }
}

function getCenterWithHeading(position, rotation, resolution) {
  const size = map.getSize();
  const height = size[1];

  return [
    position[0] - (Math.sin(rotation) * height * resolution * 1) / 4,
    position[1] + (Math.cos(rotation) * height * resolution * 1) / 4,
  ];
}

// This is a backup, the user can also tap 
map.on('click', function (evt) {
  displayFeatureInfo(evt.pixel);
});

const displayFeatureInfo = function (pixel) {
  vectorLayerz.getFeatures(pixel).then(function (features) {
    const feature = features.length ? features[0] : undefined;
    const info = document.getElementById('info');
    if (features.length) {
      displayInformation(feature)
    }
  });
};

function displayInformation(feature) {

  console.log(feature.get('NAME'));
  window.navigator.vibrate([500]);
  // alert(feature.get('NAME') + "\n" + feature.get('DESC'));
  console.log(bsAreaOffcanvas)
  $("#offcanvasBottomLabel").text(feature.get('NAME'));
  $("#AreaDESC").text(feature.get('DESC'));
  bsAreaOffcanvas.show();
}


// End of stollen code
function setup() {
  bsStartOffcanvas.show();
}
setup();