import './style.css';
import {Map, View, Geolocation} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js';

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

// Turn on tracking
geolocation.setTracking(true);