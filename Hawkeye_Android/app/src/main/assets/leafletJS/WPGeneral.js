var WPGeneral = Class.extend(function(){

  var marker;
  var originLocation;
  var markerLocationIcon;

  this.options = {
    displayOriginMarker: true
  };

  this.iconProp = {
    iconUrl: 'images/marker-icon.png', //default icon
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
  };

  this.markerProp = {
    markerLocationIcon,
    draggable: true,
    clickable: true,
    title: 'WP'
  };

  //This is called before the constructor
  this.initializer = function(){
    markerLocationIcon = L.icon(this.iconProp);
  };

  this.constructor = function(locationLatLng){
    originLocation = locationLatLng;

    marker = new L.marker(originLocation,this.markerProp).addTo(map);
  }
});
