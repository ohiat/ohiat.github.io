/* eslint-disable strict */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(
        initMap()
        // console.log('init now');
      )
      .catch(err => {
        console.error('Service Worker Error', err);
      });
  });
}

function initMap() {

  mapboxgl.accessToken =
        'pk.eyJ1IjoiaGVsYnloaWtlcyIsImEiOiJjazR5cGw5YjEwMzJxM2RxZzJoODh4OG5oIn0.n684auP32dq-nLbOKbCnCA';

  const map = (window.map = new mapboxgl.Map({
    container: 'map',
    zoom: 6,
    center: [-134.3401, 57.8228],
    pitch: 54,
    bearing: 0,
    style: 'mapbox://styles/mapbox/satellite-v9',
    hash: true,
  }));

  map.addControl(new mapboxgl.NavigationControl());

  map.on('style.load', function () {
    map.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      tileSize: 512,
      maxzoom: 14,
    });
    map.setTerrain({ source: 'mapbox-dem', exaggeration: 2 });

    map.addLayer({
      id: 'sky',
      type: 'sky',
      paint: {
        'sky-type': 'atmosphere',
        'sky-opacity': [
          'interpolate',
          ['exponential', 0.1],
          ['zoom'],
          5,
          0,
          22,
          1,
        ],
      },
    });
  });
}
