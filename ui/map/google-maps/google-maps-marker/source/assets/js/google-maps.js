class GoogleMaps {

  constructor(element, options) {
    this.element = element;

    this.init(options);

    this.onResize = this.onResize.bind(this);

    this.addEventListeners();
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

    this.markers = locations.forEach(location => {
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

  renderMarkerClusterer() {
    new MarkerClusterer(this.map, this.markers, {
      imagePath: 'content/images/m'
    });
  }

  onResize() {
    const { map } = this;

    const center = map.getCenter();

    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
  }

}

export default GoogleMaps;
