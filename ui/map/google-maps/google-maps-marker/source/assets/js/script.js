import GoogleMaps from './google-maps';

const googleMaps = new GoogleMaps('.js-google-maps', {
  center: {
    lat: 49.718364,
    lng: 12.687261
  },
  zoom: 5
});

navigator.geolocation.getCurrentPosition(position => {
  googleMaps.renderMap({
    lat: position.coords.latitude,
    lng: position.coords.longitude
  })
}, error => {
  throw new Error(error);
}, {
  enableHighAccuracy: true,
  maximumAge: 0
});

fetch('data/locations.json')
  .then(response => response.json())
  .then(data => {
    googleMaps.renderMarkers(data);
    googleMaps.renderMarkerClusterer({
      imagePath: 'content/images/m'
    });
    googleMaps.renderRectangle({
      bounds: new google.maps.LatLngBounds(
        {
          lat: -90,
          lng: -180
        },
        {
          lat: 90,
          lng: 180
        }
      ),
      fillColor: '#000',
      fillOpacity: 0.3
    });
  });
