/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/8/2016
 *
 * Description: The purpose of this class is be the basic WPGeneral class that
 * is inherited/extended by all other waypoint type classes. This will OOP
 * the JS code and promote reusability.
 */

var WPGeneral = Class.extend(function() {

  var marker;
  var markerLocationIcon;

  /**
   * [options description] The purpose of this object is to set specific options
   * specific to the WPGeneral Class. These options would initially be inherited
   * by an class extending this class.
   * @type {Object}
   */
  this.options = {
    displayOriginMarker: true
  };

  /**
   * [iconProp description] The purpose of this object is to store the properties
   * related to the general marker icon.
   * @type {Object}
   */
  this.iconProp = {
    iconUrl: 'images/marker-icon.png', //default icon
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };

  /**
   * [markerProp description] The purpose of this object is to store the properties
   * related to the marker. These are Leaflet specific properties. See
   *
   * @type {Object}
   */
  this.markerProp = {
    markerLocationIcon,
    draggable: true,
    clickable: true,
    title: 'WP'
  };

  /**
   * [function: this.initializer ] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {
    markerLocationIcon = L.icon(this.iconProp);
  };

  /**
   * [function this.constructor] This is the default constructor for the
   * WPGeneral class.
   * @param  {[type]} locationLatLng [description] Origin location of the general
   * waypoint. Passed as a LatLng leaflet datatype.
   * @param  {[type]} display        [description]
   * @return {[type]}                [description]
   */
  this.constructor = function(locationLatLng, display) {
    originLocation = locationLatLng;
    marker = new L.marker(originLocation, this.markerProp);

    marker.on('click', markerClickEvent);
    marker.on('drag', markerDrag);

    this.options.displayOriginMarker = display;
    if (display == true) {
      marker.addTo(map);
    }
  }

  /**
   * [function markerClickEvent]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  markerClickEvent = function(event) {

  }

  /**
   * [function markerDragEvent]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  markerDragEvent = function(event) {
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng));
    WPMarkerDrag(marker);
  }

});
