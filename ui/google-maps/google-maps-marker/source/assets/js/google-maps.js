class GoogleMaps {

  constructor(element, options) {
    this.element = element;

    this.init(options);
    this.onResize();
  }

  init(options) {
    this.map = new google.maps.Map(document.querySelector(this.element), options);
  }

  renderMap(options) {
    this.map.setCenter({
      lat: options.lat,
      lng: options.lng
    });
  }

  renderMarkers(locations) {
    const { map } = this;

    this.markers = locations.map(location => {
      const marker = new google.maps.Marker({
        icon: location.icon,
        map: map,
        position: {
          lat: location.lat,
          lng: location.lng
        },
        title: location.title
      });

      if (location.infoWindow) {
        const infoWindow = new google.maps.InfoWindow({
          content: location.infoWindow.content
        });

        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
        });
      }

      return marker;
    });
  }

  renderMarkerClusterer(markerCluster) {
    new MarkerClusterer(this.map, this.markers, {
      imagePath: 'content/images/m'
    });
  }

  onResize() {
    const { map } = this;

    google.maps.event.addDomListener(window, 'resize', () => {
      const center = map.getCenter();

      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });
  }

}

export default GoogleMaps;
