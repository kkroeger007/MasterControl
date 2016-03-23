/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/9/2016
 *
 * Description: The purpose of this class is be the basic WPCircle class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to circle about a specified radius.
 */

var WPCircle = Class.extend(function() {

  this.descriptor = 'WPCircle';


  var mLeafletMap; //This holds the leaflet map object.
  var mCircleLocations = {
    circleLeft: [],
    circleCenter: [],
    circleRight: []
  };

  var mCallbackOnMove;

  var mMarker; //This holds the marker object.
  var markerLocationIcon; //This holds the marker icon.


  var mUpArrowMarker;
  var upArrowIcon;

  var mDownArrowMarker;
  var downArrowIcon;

  var mCircleMarker;

  var mRadius;
  var mDirection;

  this.directionENUM = {
      CCW: 'CCW',
      CW: 'CW'
    }
    /**
     * [_WPParams description]
     * @type {Object}
     */
  var _WPParams = {
    param1: null,
    param2: null,
    param3: null,
    param4: null,
    param5: null,
    param6: null,
    param7: null
  };

  /**
   * [options description] The purpose of this object is to set specific options
   * specific to the WPCircle Class. These options would initially be inherited
   * by an class extending this class.
   * @type {Object}
   */
  this.options = {
    displayOriginMarker: true
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
    title: 'CIRCLE'
  };
  /**
   * [iconProp description] The purpose of this object is to store the properties
   * related to the general marker icon.
   * @type {Object}
   */
  this.iconProp = {
    iconUrl: 'images/Circle-ICON.png', //default icon
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };


  /**
   * [upArrowProp description]
   * @type {Object}
   */
  this.upArrowProp = {
    draggable: true,
    clickable: true
  };

  /**
   * [upArrowIconProp description]
   * @type {Object}
   */
  this.upArrowIconProp = {
    iconUrl: 'images/Arrow-CircleUP-Icon.png', //default icon
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };


  /**
   * [downArrowProp description]
   * @type {Object}
   */
  this.downArrowProp = {
    draggable: true,
    clickable: true
  };

  /**
   * [downArrowIconProp description]
   * @type {Object}
   */
  this.downArrowIconProp = {
    iconUrl: 'images/Arrow-CircleDOWN-Icon.png', //default icon
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };


  /**
   * [circlePathProp description] The purpose of this object is to store the properties
   * related to the marker. These are Leaflet specific properties.
   * @type {Object}
   */
  this.circlePathProp = {
    stroke: true,
    color: '#e30e0e',
    weight: 5,
    opacity: 0.75,
    fill: true,
    fillColor: '#e30e0e',
    fillOpacity: 0.2,
    fillRule: 'evenodd',
    dashArray: null,
    lineCap: null,
    lineJoin: null,
    clickable: false
  };

  /**
   * [function: this.initializer] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {
    this.markerLocationIcon(new L.icon(this.iconProp));
    this.markerProp.icon = this.markerLocationIcon();

    this.upArrowIcon(new L.icon(this.upArrowIconProp));
    this.upArrowProp.icon = this.upArrowIcon();

    this.downArrowIcon(new L.icon(this.downArrowIconProp));
    this.downArrowProp.icon = this.downArrowIcon();
  };


/**
 * [function description] This is the default constructor for the WPCircle class.
 * This class handles the orbit and/or circle routine and functionality of the
 * UAS.
 * @param  {[map]} leafletMap     [description]
 * @param  {[LatLng]} locationLatLng [description]
 * @param  {[Bool]} display        [description]
 * @param  {[Float]} radius         [description]
 * @param  {[Int]} direction      [description] 
 * @return {[type]}                [description]
 */
  this.constructor = function(leafletMap, locationLatLng, display, radius, direction) {
    mLeafletMap = leafletMap;
    mRadius = radius;
    mDirection = direction;
    this.options.displayOriginMarker = display;

    mCircleLocations.circleLeft = computeLocationOfInterest(locationLatLng, 270.0, mRadius);
    mCircleLocations.circleCenter = locationLatLng;
    mCircleLocations.circleRight = computeLocationOfInterest(locationLatLng, 90.0, mRadius);

    mMarker = new L.marker(mCircleLocations.circleCenter, this.markerProp);

    mMarker.on('click', markerClickEvent);
    mMarker.on('drag', markerDragEvent);
    mMarker.on('mouseover', markerMouseOverEvent);
    mMarker.on('dblclick', markerDblClickEvent)
    mMarker.on('contextmenu', markerConextMenuEvent);

    mCircleMarker = new L.circle(mCircleLocations.circleCenter, radius, this.circlePathProp);


    if (mDirection == this.directionENUM.CW) {
      mUpArrowMarker = new L.marker(mCircleLocations.circleLeft, this.upArrowProp);
      mDownArrowMarker = new L.marker(mCircleLocations.circleRight, this.downArrowProp);
    } else {
      mUpArrowMarker = new L.marker(mCircleLocations.circleRight, this.upArrowProp);
      mDownArrowMarker = new L.marker(mCircleLocations.circleLeft, this.downArrowProp);
    }
    mUpArrowMarker.on('drag',arrowDragEvent);
    mDownArrowMarker.on('drag',arrowDragEvent);


    if (display == true) {
      mMarker.addTo(mLeafletMap);
      mCircleMarker.addTo(mLeafletMap);
      mUpArrowMarker.addTo(mLeafletMap);
      mDownArrowMarker.addTo(mLeafletMap);
    }
  };

  /**
   * [function description]
   * @param  {[type]} locationLatLng [description]
   * @return {[type]}                [description]
   */
  this.updateArrowIcons = function(locationLatLng) {
    mCircleLocations.circleLeft = computeLocationOfInterest(locationLatLng, 270.0, mRadius);
    mCircleLocations.circleRight = computeLocationOfInterest(locationLatLng, 90.0, mRadius);

    if (mDirection == this.directionENUM.CW) {
      mUpArrowMarker.setLatLng(mCircleLocations.circleLeft);
      mDownArrowMarker.setLatLng(mCircleLocations.circleRight);
    } else {
      mUpArrowMarker.setLatLng(mCircleLocations.circleRight);
      mDownArrowMarker.setLatLng(mCircleLocations.circleLeft);
    }

    mUpArrowMarker.update();
    mDownArrowMarker.update();
  };

  /**
   * [function description]
   * @param  {[type]} locationLatLng [description]
   * @return {[type]}                [description]
   */
  this.updateOriginLocation = function(locationLatLng) {
    mCircleLocations.circleCenter = locationLatLng;

    mMarker.setLatLng(locationLatLng);
    mMarker.update();

    mCircleMarker.setLatLng(locationLatLng);
    mCircleMarker.redraw();

    this.updateArrowIcons(locationLatLng);
  };

  this.updateCircleRadius = function(radialDistance){
    mRadius = radialDistance;
    mCircleMarker.setRadius(mRadius);
    mCircleMarker.redraw();
    this.updateArrowIcons(mCircleLocations.circleCenter);

  };

  /**
   * [function description]
   * @param  {[type]} originLatLon      [description]
   * @param  {[type]} locationBearingD  [description]
   * @param  {[type]} locationDistanceM [description]
   * @return {[type]}                   [description]
   */
  computeLocationOfInterest = function(originLatLon, locationBearingD, locationDistanceM) {
    //var tmpLatLng = markerOrigin.getLatLng();
    var originLatR = convertDegrees_Radians(originLatLon.lat);
    var originLonR = convertDegrees_Radians(originLatLon.lng);
    var locationBearingR = convertDegrees_Radians(locationBearingD);
    var locationDistance = locationDistanceM;

    var R = 6378137; //default radius of earth in meters

    var finalLatR = Math.asin(Math.sin(originLatR) * Math.cos(locationDistance / R) +
      Math.cos(originLatR) * Math.sin(locationDistance / R) * Math.cos(locationBearingR));
    var finalLonR = originLonR + Math.atan2(Math.sin(locationBearingR) * Math.sin(locationDistance / R) * Math.cos(originLatR),
      Math.cos(locationDistance / R) - Math.sin(originLatR) * Math.sin(finalLatR));

    var finalLatD = convertRadians_Degrees(finalLatR);
    var finalLonD = (convertRadians_Degrees(finalLonR) + 540.0) % 360 - 180; //wraps the result to +/- 180

    var finalLocation = new L.LatLng(finalLatD, finalLonD);

    return (finalLocation);
  };

  /**
   * [function description] The purpose of this function is to compute the
   * distance between two LatLng locaitons using the haversine formula.
   * @param  {[LatLng]} gpsOne [description] A single location.
   * @param  {[LatLng]} gpsTwo [description] Another locaiton.
   * @return {[Float]}        [description] Distance between the locations in
   * meters. It would be expected that the inheriting class displaying the
   * information to the screen per the adjustment would correct for the
   * appropriate user requested units.
   */
  computeDistanceBetween = function(gpsOne, gpsTwo) {
    var R = 6378137; //default radius of earth in meters

    var gpsOneLat = convertDegrees_Radians(gpsOne.lat);
    var gpsOneLon = convertDegrees_Radians(gpsOne.lng);
    var gpsTwoLat = convertDegrees_Radians(gpsTwo.lat);
    var gpsTwoLon = convertDegrees_Radians(gpsTwo.lng);

    var deltaLat = gpsTwoLat - gpsOneLat;
    var deltaLon = gpsTwoLon - gpsOneLon;

    var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(gpsOneLat) * Math.cos(gpsTwoLat) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var distance = R * c;

    return (distance);
  };

  /**
   * [function description]
   * @param  {[type]} angleDegrees [description]
   * @return {[type]}              [description]
   */
  convertDegrees_Radians = function(angleDegrees) {
    var angleRadians = (Math.PI / 180.0) * (angleDegrees);
    return (angleRadians);
  };

  /**
   * [function description]
   * @param  {[type]} angleRadians [description]
   * @return {[type]}              [description]
   */
  convertRadians_Degrees = function(angleRadians) {
    var angleDegrees = (180.0 / Math.PI) * (angleRadians);
    return (angleDegrees);
  };



  /**
   * [function description]
   * @param  {[Leaflet Map]} leafletMap [description]
   * @return {[type]}            [description]
   */
  this.updateMap = function(leafletMap) {
    mLeafletMap = leafletMap;
  };

  //TODO: figure out how to handle a proper remove....for now remove layer from map
  this.removeMarkers = function() {};

  arrowDragEvent = function(event){
    var marker = event.target;
    var position = marker.getLatLng();

    var tmpDis = computeDistanceBetween(mCircleLocations.circleCenter,position);
    this.updateCircleRadius(tmpDis);
  }.bind(this);

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
    this.updateOriginLocation(position);
    //TODO: There is an error in the statement below
    mCallbackOnMove(this);
  }.bind(this);


  this.getOriginLoc = function() {
    return (mCircleLocations.circleCenter);
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
   * the markerLocationIcon object. Call the function with no arguements and it
   * is a get, or with arguements and it is a set.
   * @param  {[markerLocationIcon Obj]} value [description] The desried icon set value.
   * @return {[type]}       [description]
   */
  this.markerLocationIcon = function(value) {
    if (value === undefined) return (_markerLocationIcon);
    _markerLocationIcon = value;
  }

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

  this.upArrowIcon = function(value) {
    if (value === undefined) return (upArrowIcon);
    upArrowIcon = value;
  };

  this.upArrowMarker = function(value) {
    if (value === undefined) return (mUpArrowMarker);
    mUpArrowMarker = value;
  }

  this.downArrowIcon = function(value) {
    if (value === undefined) return (downArrowIcon);
    downArrowIcon = value;
  };

  this.downArrowMarker = function(value) {
    if (value === undefined) return (mDownArrowMarker);
    mDownArrowMarker = value;
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
    if (value === undefined) return (mCallbackOnMove);
    mCallbackOnMove = value;
  }

});
