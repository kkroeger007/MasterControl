/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is to be the basic WPBase class that
 * is inherited/extended by all other waypoint type classes. This will OOP
 * the JS code and promote reusability.
 */

var WPBase = Class.extend(function() {

  var _callbackOnMove;

  var mMarker; //This holds the marker object.
  var mMarkerLocationIcon; //This holds the marker icon.
  var mLeafletMap; //This holds the leaflet map object.
  var mOriginLocation; // This holds the origin position object.

  /**
   * [mWPExtrinsics description] Holds the potential value length of the mission item. This
   * item will be used for items such as survey, loiter, circle etc. Otherwise
   * the default length shall be 0.
   * @type {Object}
   */
  var mWPExtrinsics = {
    missionLength: 0,
    duration: 0,
  }

  /**
   * [_WPParams description]
   * @type {Object}
   */
  var mWPParams = {
    param1: null, //Delay - Hold time at mission waypoint (MAX 65535 seconds) (copter only)
    param2: null, //Acceptance radius meters-inside wp considered hit (plane only)
    param3: null, //0 to pass through WP, If >0 meters to pass CW orbit (plane only)
    param4: null, //Desired yaw angle at waypoint target (rotary wind only)
    param5: null, //Latitude (If zero the vehicle will hold current).
    param6: null, //Longitude (if zero the vehicle will hold current).
    param7: null //Altitude (if zero the vehicle will hold current).
  };

  this.WPParams = function(value) {
    if (value === undefined) return (mWPParams);
    mWPParams = value;
  };

  this.WPParams_param1 = function(value) {
    if (value === undefined) return (mWPParams.param1);
    mWPParams.param1 = value;
  };

  this.WPParams_param2 = function(value) {
    if (value === undefined) return (mWPParams.param2);
    mWPParams.param2 = value;
  };

  this.WPParams_param3 = function(value) {
    if (value === undefined) return (mWPParams.param3);
    mWPParams.param3 = value;
  };

  this.WPParams_param4 = function(value) {
    if (value === undefined) return (mWPParams.param4);
    mWPParams.param4 = value;
  };

  this.WPParams_param5 = function(value) {
    if (value === undefined) return (mWPParams.param5);
    mWPParams.param5 = value;
  };

  this.WPParams_param6 = function(value) {
    if (value === undefined) return (mWPParams.param6);
    mWPParams.param6 = value;
  };

  this.WPParams_param7 = function(value) {
    if (value === undefined) return (mWPParams.param7);
    mWPParams.param7 = value;
  };


  /**
   * [function description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  this.WPMissionLength = function(value) {
    if (value === undefined) return (mWPExtrinsics.missionLength);
    mWPExtrinsics.missionLength = value;
  };

  /**
   * [function description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  this.WPMissionDuration = function(value) {
    if (value === undefined) return (mWPExtrinsics.duration);
    mWPExtrinsics.duration = value;
  };



  /**
   * [options description] The purpose of this object is to set specific options
   * specific to the WPBase Class. These options would initially be inherited
   * by an class extending this class.
   * @type {Object}
   */
  this.options = {
    displayOriginMarker: true,
    transmitToAircraft: true
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
    mMarkerLocationIcon = new L.icon(this.iconProp);
    this.markerProp.icon = mMarkerLocationIcon;
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
    mLeafletMap = leafletMap;
    console.log(locationLatLng);
    mOriginLocation = locationLatLng;
    mMarker = new L.marker(mOriginLocation, this.markerProp);

    mMarker.on('click', markerClickEvent);
    mMarker.on('drag', markerDragEvent);
    mMarker.on('mouseover', markerMouseOverEvent);
    mMarker.on('dblclick', markerDblClickEvent)
    mMarker.on('contextmenu', markerConextMenuEvent);

    this.options.displayOriginMarker = display;
    if (display == true) {
      mMarker.addTo(mLeafletMap);
    }
  };

  /**
   * [function description]
   * @param  {[Leaflet Map]} leafletMap [description]
   * @return {[type]}            [description]
   */
  this.updateMap = function(leafletMap) {
    mLeafletMap = leafletMap;
    if (this.options.displayOriginMarker == true) {
      mMarker.addTo(mLeafletMap);
    }
  };

  //TODO: figure out how to handle a proper remove....for now remove layer from map
  this.removeWP = function() {
    mLeafletMap.removeLayer(mMarker);
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
    mOriginLocation = position;
    mMarker.setLatLng(new L.LatLng(position.lat, position.lng));
    mMarker.update();

    try {
      onMoveCallback(position);
    } catch (e) {
      console.log('An error has occured on the callback: ' + e.message);
    }

    _callbackOnMove(this);
  }.bind(this);

  this.getOriginLoc = function() {
    return (mOriginLocation);
  };

  /**
   * [function description]
   * @param  {[event]} event [description]
   * @return {[type]}       [description]
   */
  markerMouseOverEvent = function(event) {

  };

  /**
   * [function description]
   * @param  {[event]} event [description]
   * @return {[type]}       [description]
   */
  markerDblClickEvent = function(event) {

  };

  /**
   * [function description]
   * @param  {[event]} event [description]
   * @return {[type]}       [description]
   */
  markerConextMenuEvent = function(event) {

  };

  /**
   * [function description] This function acts as both a get and set function for
   * the marker object. Call the function with no arguements and it
   * is a get, or with arguements and it is a set.
   * @param  {[Leaflet Marker]} value [description] The desried marker set value.
   * @return {[type]}       [description]
   */
  this.marker = function(value) {
    if (value === undefined) return (mMarker);
    mMarker = value;
  }

  /**
   * [function description] This function acts as both a get and set function for
   * the markerLocationIcon object. Call the function with no arguements and it
   * is a get, or with arguements and it is a set.
   * @param  {[markerLocationIcon Obj]} value [description] The desried icon set value.
   * @return {[type]}       [description]
   */
  this.markerLocationIcon = function(value) {
    if (value === undefined) return (mMarkerLocationIcon);
    mMarkerLocationIcon = value;
  }

  /**
   * [function description] This function acts as both a get and set function for
   * the leafletMap object. Call the function with no arguements and it
   * is a get, or with arguements and it is a set.
   * @param  {[Leaflet Map]} value [description] The desried map set value.
   * @return {[type]}       [description]
   */
  this.leafletMap = function(value) {
    if (value === undefined) return (mLeafletMap);
    mLeafletMap = value;
  }


  /**
   * [function description] This function acts as both a get and set function for
   * the leafletMap object. Call the function with no arguements and it
   * is a get, or with arguements and it is a set.
   * @param  {[Leaflet Map]} value [description] The desried map set value.
   * @return {[type]}       [description]
   */
  this._callbackOnMove = function(value) {
    if (value === undefined) return (_callbackOnMove);
    _callbackOnMove = value;
  }

});
