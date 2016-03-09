/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/9/2016
 *
 * Description: The purpose of this class is to handle the establishment of the
 * user location layer. This will store and update the user location data on the
 * leaflet layer.
 */

var userLocationHandler = Class.extend(function() {

  var _leafletMap; //The leaflet map object passed into this class
  var userLocationIcon;
  var userMarker;
  var userCircle;
  var userLocationInfo;

  /**
   * [options description] The purpose of this object is to set specific options
   * specific to the userLocationHandler Class.
   * @type {Object}
   */
  var options = {
    displayerUserLocation: true, //Display a user marker on the map
    displayConfidenceCircle: true //Display a user confidence position on the map
  };

  /**
   * [iconProp description] The purpose of this object is to store the properties
   * related to the user marker icon.
   * @type {Object}
   */
  this.iconProp = {
    iconUrl: 'images/bluedot.png', //default icon
    iconSize: [34, 34], // size of the icon
    iconAnchor: [19, 19], // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };

  /**
   * [markerProp description]The purpose of this object is to store the properties
   * related to the user marker.
   * @type {Object}
   */
  this.markerProp = {
    userLocationIcon,
    draggable: false, //whether or not to allow user draggable
    clickable: false, //whether or not to allow user clickable
    title: 'USER'
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
   * [function: this.initializer ] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {
    userLocationIcon = new L.icon(this.iconProp);

    userLocationInfo = new Object();
    userLocationInfo.HDOP = 0.0; //Horizontal dillution of position
    userLocationInfo.VDOP = 0.0; //Vertical dillution of position
    userLocationInfo.SAT = 0; //Satellites used to estimate position
    userLocationInfo.FIX = 0; //The fix code of the user position

  };


  /**
   * [function description] The purpose of this function is to handle the default
   * constructor of the userHandling class.
   * @param  {[Leaflet Map]} map [description] Update the object to display on.
   * @param  {[LatLng (DEG)]} locationLatLng    [description] Central location of user.
   * @param  {[Bool]} displayUser       [description] Display user marker.
   * @param  {[Bool]} displayConfidence [description] Display confidence circle.
   * @return {[type]}                   [description]
   */
  this.constructor = function(leafletMap, locationLatLng, displayUser, displayConfidence) {
    userMarker = new L.marker(locationLatLng, this.markerProp);
    userCircle = new L.circle(locationLatLng, 100, this.circlePathProp);
    _leafletMap = leafletMap;

    options.displayerUserLocation = displayUser;
    options.displayConfidenceCircle = displayConfidence;

    if (displayUser == true) {
      userMarker.addTo(_leafletMap);
    }
    if (displayConfidence == true) {
      userCircle.addTo(_leafletMap);
    }
  };

  /**
   * [function description] The purpose of this function is to handle assigning
   * a Leaflet map object if for some reason the map has changed.
   * @param  {[Leaflet Map]} leafletMap [description]
   * @return {[type]}            [description]
   */
  this.updateMap = function(leafletMap) {
    _leafletMap = leafletMap;

    if (this.options.displayerUserLocation == true) {
      userMarker.addTo(_leafletMap);
    }

    if (this.options.displayConfidenceCircle == true) {
      userCircle.addTo(_leafletMap);
    }
  };

  /**
   * [function description] The purpose of this object is to update the display
   * properties of the marker and circle representing the user position.
   * @param  {[Bool]} displayUser       [description]
   * @param  {[Bool]} displayConfidence [description]
   * @return {[type]}                   [description]
   */
  this.updateUserDisplayProperies = function(displayUser, displayConfidence) {
    if (options.displayerUserLocation != displayUser) {
      options.displayerUserLocation = displayUser;
      if (displayUser == true) {
        userMarker.addTo(_leafletMap);
      } else {
        _leafletMap.removeLayer(userMarker);
        _leafletMap.removeLayer(userCircle);
      }
    }

    if (options.displayConfidenceCircle != displayConfidence) {
      options.displayerUserLocation = displayConfidence;
      if (displayConfidence == true) {
        userCircle.addTo(_leafletMap);
      } else {
        _leafletMap.removeLayer(userCircle);
      }
    }
  };


  /**
   * [function description] The purpose of this function is to make a generic
   * common call updating GPS stuff.
   * @param  {[LatLng (DEG)]} userLocation [description]
   * @param  {[Float (m)]} userAccuracy [description]
   * @return {[type]}              [description]
   */
  this.updateUserLocationAll = function(userLocation, userAccuracy) {
    this.updateUserLocation(userLocation);
    this.updateUserAccuracy(userAccuracy);
  };


  /**
   * [function description] The purpose of this funciton is to update the user
   * circle and marker location.
   * @param  {[LatLng (DEG)]} userLocation [description]
   * @return {[type]}              [description]
   */
  this.updateUserLocation = function(userLocation) {
    userMarker.setLatLng(userLocation);
    userMarker.update();

    userCircle.setLatLng(userLocation);
    userCircle.redraw();
  };


  /**
   * [function description] The purpose of this function is to update the accuracy
   * as seen from the GPS system based on user locaiton confidence.
   * @param  {[Float (m)]} userAccuracy [description]
   * @return {[type]}              [description]
   */
  this.updateUserAccuracy = function(userAccuracy) {
    userCircle.setRadius(userAccuracy);
  };


  /**
   * [function description]
   * @param  {[Float (m)]} HDOP [description] Horizontal dillution of position.
   * @param  {[Float (m)]} VDOP [description] Vertical dillution of position.
   * @param  {[Int]} SAT  [description] Number of satellites used in position.
   * @param  {[Int]} FIX  [description] Satellite GPS fix code.
   * @return {[type]}      [description]
   */
  this.updateUserLocationInfo = function(HDOP, VDOP, SAT, FIX) {
    userLocationInfo.HDOP = HDOP;
    userLocationInfo.VDOP = VDOP;
    userLocationInfo.SAT = SAT;
    userLocationInfo.FIX = FIX;

    switch (userLocationInfo.FIX) {
      case 0:
        this.circlePathProp.color = '#e30e0e';
        this.circlePathProp.fillColor = '#e30e0e';
        userCircle.setStyle(this.circlePathProp);
        break;
      case 1:
        this.circlePathProp.color = '#e30e0e';
        this.circlePathProp.fillColor = '#e30e0e';
        userCircle.setStyle(this.circlePathProp);
        break;
      case 2:
        this.circlePathProp.color = '#ece209';
        this.circlePathProp.fillColor = '#ece209';
        userCircle.setStyle(this.circlePathProp);
        break;
      case 3:
        this.circlePathProp.color = '#24d214';
        this.circlePathProp.fillColor = '#24d214';
        userCircle.setStyle(this.circlePathProp);
        break;
      default:
    }

    userCircle.redraw();
  };

});
