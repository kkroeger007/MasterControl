/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/9/2016
 *
 * Description: The purpose of this class is be the basic WPCircle class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to circle about a specified radius.
 */

var WPCircle = WPBase.extend(function() {

  this.descriptor = 'WPCircle';

  var _upArrowMarker;
  var upArrowIcon;

  var _downArrowMarker;
  var downArrowIcon;

  var _circleMarker;

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

  this.upArrowIconProp = {
    iconUrl: 'images/Arrow-CircleUP-Icon.png', //default icon
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };

  this.downArrowIconProp = {
    iconUrl: 'images/Arrow-CircleDOWN-Icon.png', //default icon
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };

  this.upArrowProp = {
    draggable: true,
    clickable: true
  };

  this.downArrowProp = {
    draggable: true,
    clickable: true
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
   * [markerProp description] The purpose of this object is to store the properties
   * related to the marker. These are Leaflet specific properties. See
   *
   * @type {Object}
   */
  this.markerProp.title = 'CIRCLE';

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


  this.constructor = function(leafletMap, locationLatLng, display, radius, direction) {
    _leafletMap = leafletMap;
    _marker = new L.marker(locationLatLng, this.markerProp);

    _circleMarker = new L.circle(locationLatLng,radius,this.circlePathProp);

    var leftSide = computeLocationOfInterest(locationLatLng, 270.0, radius);
    var rightSide = computeLocationOfInterest(locationLatLng, 90.0, radius);


    if(direction == this.directionENUM.CW){
      _upArrowMarker = new L.marker(leftSide,this.upArrowProp);
      _downArrowMarker = new L.marker(rightSide,this.downArrowProp);
    }else{
      _upArrowMarker = new L.marker(rightSide,this.upArrowProp);
      _downArrowMarker = new L.marker(leftSide,this.downArrowProp);
    }

    this.options.displayOriginMarker = display;
    if (display == true) {
      _marker.addTo(_leafletMap);
      _circleMarker.addTo(_leafletMap);
      _upArrowMarker.addTo(_leafletMap);
      _downArrowMarker.addTo(_leafletMap);
    }
  };

  computeLocationOfInterest = function (originLatLon, locationBearingD, locationDistanceM)
  {
    //var tmpLatLng = markerOrigin.getLatLng();
    var originLatR = convertDegrees_Radians(originLatLon.lat);
    var originLonR = convertDegrees_Radians(originLatLon.lng);
    var locationBearingR = convertDegrees_Radians(locationBearingD);
    var locationDistance = locationDistanceM;

    var R = 6378137; //default radius of earth in meters

    var finalLatR = Math.asin( Math.sin(originLatR)*Math.cos(locationDistance/R) +
    Math.cos(originLatR)*Math.sin(locationDistance/R)*Math.cos(locationBearingR) );
    var finalLonR = originLonR + Math.atan2(Math.sin(locationBearingR)*Math.sin(locationDistance/R)*Math.cos(originLatR),
    Math.cos(locationDistance/R)-Math.sin(originLatR)*Math.sin(finalLatR));

    var finalLatD = convertRadians_Degrees(finalLatR);
    var finalLonD = (convertRadians_Degrees(finalLonR) + 540.0)%360-180; //wraps the result to +/- 180

    var finalLocation = new L.LatLng(finalLatD,finalLonD);

    return (finalLocation);
  };

  convertDegrees_Radians = function(angleDegrees)
  {
    var angleRadians = (Math.PI / 180.0) * (angleDegrees);
    return (angleRadians);
  };

  convertRadians_Degrees = function(angleRadians){
    var angleDegrees = (180.0/Math.PI) * (angleRadians);
    return (angleDegrees);
  };

  this.upArrowIcon = function(value) {
    if (value === undefined) return (upArrowIcon);
    upArrowIcon = value;
  };

  this.upArrowMarker = function(value) {
    if (value === undefined) return (upArrowMarker);
    upArrowMarker = value;
  }

  this.downArrowIcon = function(value) {
    if (value === undefined) return (downArrowIcon);
    downArrowIcon = value;
  };

  this.downArrowMarker = function(value) {
    if (value === undefined) return (downArrowMarker);
    downArrowMarker = value;
  }
});
