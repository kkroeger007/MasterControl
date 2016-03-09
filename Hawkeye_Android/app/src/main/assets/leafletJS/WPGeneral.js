/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/9/2016
 *
 * Description: The purpose of this class is be the basic WPGeneral class that
 * is inherited/extended by all other waypoint type classes. This will OOP
 * the JS code and promote reusability.
 */

var WPGeneral = Class.extend(function() {

  var _marker;  //This holds the marker object.
  var _markerLocationIcon;  //This holds the marker icon.
  var _leafletMap;  //This holds the leaflet map object.

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
    _markerLocationIcon = new L.icon(this.iconProp);
    this.markerProp.icon = _markerLocationIcon;
  };

  /**
   * [function this.constructor] This is the default constructor for the
   * WPGeneral class.
   * @param  {[Leaflet Map]} Leaflet map to display things on.
   * @param  {[LatLng (DEG)]} locationLatLng [description] Origin location of the general
   * waypoint. Passed as a LatLng leaflet datatype.
   * @param  {[Bool]} display        [description]
   * @return {[type]}                [description]
   */
  this.constructor = function(leafletMap, locationLatLng, display) {
    _leafletMap = leafletMap;
    originLocation = locationLatLng;
    _marker = new L.marker(originLocation, this.markerProp);

    _marker.on('click', markerClickEvent);
    _marker.on('drag', markerDrag);

    this.options.displayOriginMarker = display;
    if (display == true) {
      _marker.addTo(_leafletMap);
    }
  };

  /**
   * [function description]
   * @param  {[Leaflet Map]} leafletMap [description]
   * @return {[type]}            [description]
   */
  this.updateMap = function(leafletMap) {
    _leafletMap = leafletMap;
    if (this.options.displayOriginMarker == true) {
      _marker.addTo(_leafletMap);
    }
  };

  //TODO: figure out how to handle a proper remove....for now remove layer from map
  this.removeWP = function() {
    _leafletMap.removeLayer(_marker);
  };

  /**
   * [function markerClickEvent]
   * @param  {[event]} event [description]
   * @return {[type]}       [description]
   */
  markerClickEvent = function(event) {

  };

  /**
   * [function markerDragEvent]
   * @param  {[event]} event [description]
   * @return {[type]}       [description]
   */
  markerDragEvent = function(event) {
    var marker = event.target;
    var position = marker.getLatLng();
    _marker.setLatLng(new L.LatLng(position.lat, position.lng));
    WPMarkerDrag(_marker);
  };


/**
 * [function description] This function acts as both a get and set function for
 * the marker object. Call the function with no arguements and it
 * is a get, or with arguements and it is a set.
 * @param  {[Leaflet Marker]} value [description] The desried marker set value.
 * @return {[type]}       [description]
 */
  this.marker = function(value){
    if(value === undefined) return(_marker);
    _marker = value;
  }

/**
 * [function description] This function acts as both a get and set function for
 * the markerLocationIcon object. Call the function with no arguements and it
 * is a get, or with arguements and it is a set.
 * @param  {[markerLocationIcon Obj]} value [description] The desried icon set value.
 * @return {[type]}       [description]
 */
  this.markerLocationIcon = function(value){
    if(value === undefined) return(_markerLocationIcon);
    _markerLocationIcon = value;
  }

/**
 * [function description] This function acts as both a get and set function for
 * the leafletMap object. Call the function with no arguements and it
 * is a get, or with arguements and it is a set.
 * @param  {[Leaflet Map]} value [description] The desried map set value.
 * @return {[type]}       [description]
 */
  this.leafletMap = function(value){
    if(value === undefined) return(_leafletMap);
    _leafletMap = value;
  }


});
