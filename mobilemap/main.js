import './style.css';
import {Map, View, Geolocation} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js';

import Feature from 'ol/Feature.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import Point from 'ol/geom/Point.js';

// Maybe move this stuff to another file
const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasBottom');
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
    enableHighAccuracy: true,
  },
  // I don't know what this is but all the examples have it so it might be a good idea
  projection: view.getProjection(),
});

allowTrackingbtn.addEventListener(
  'click',
  function () {
    geolocation.setTracking(true);
    bsOffcanvas.hide();
  }
)

// Stollen code for testing

// handle geolocation error.
// ! TODO: figure out the best way to show the error
geolocation.on('error', function (error) {
  alert(error.message);
});

const accuracyFeature = new Feature();
geolocation.on('change:accuracyGeometry', function () {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

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

geolocation.on('change:position', function () {
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
});

new VectorLayer({
  map: map,
  source: new VectorSource({
    features: [accuracyFeature, positionFeature],
  }),
});


// End of stollen code
function setup() {
  bsOffcanvas.show();
}
setup();