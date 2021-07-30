const GM = {
  init(lat,lng, zoom) {
    this.initCache();
    this.initMap(lat,lng,zoom);
  },

  initCache() {
    this.$body = document.querySelector("body");
  },

  initMap(lat,lng,zoom) {
    const coordinates = {
      lat:lat,
      lng: lng
    };

    const centerMap = {
      lat:lat,
      lng: lng
    };

    const markerImage = new google.maps.MarkerImage(
      "assets/images/map-marker.png",
      null,
      null,
      null,
      new google.maps.Size(122, 122)
    );


    const map = new google.maps.Map(document.getElementById("map"), {
      center: centerMap,
      zoom,

      disableDefaultUI: true,
      zoomControl: true,
      scrollwheel: false,
    });

    const marker = new google.maps.Marker({
      position: coordinates,
      map,
      icon: markerImage,
    });

    map.setOptions({
      styles: dataStyles,
    });
  },
};

document.addEventListener("DOMContentLoaded", function() {
  const map = document.querySelector("#map");
 
  if (map) {
    let lat = +map.getAttribute("data-lat");
    let lng = +map.getAttribute("data-lng");
    let zoom = +map.getAttribute("data-zoom");
    GM.init(lat,lng,zoom);
  }
});

var dataStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];
