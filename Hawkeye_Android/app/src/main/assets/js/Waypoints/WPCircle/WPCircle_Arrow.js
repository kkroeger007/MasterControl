/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is to be the basic WPBase class that
 * is inherited/extended by all other waypoint type classes. This will OOP
 * the JS code and promote reusability.
 */

//TODO: If the radius is set to zero remove hide the arrows.

var WPCircle_Arrow = Class.extend(function() {
  this.descriptor = 'WPCircle_Arrow';

  var mLeafletMap; //This holds the leaflet map object.

  var mUpArrowMarker;
  var upArrowIcon;

  var mDownArrowMarker;
  var downArrowIcon;

  var mCallbackArrowMove;
  var mDirection;
  var mRadius;
  var mLocation;

  this.directionENUM = {
      CCW: 'CCW',
      CW: 'CW'
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
   * [function: this.initializer] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {
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
      mLocation = locationLatLng;
      mRadius = radius;
      mDirection = direction;
      this.options.displayOriginMarker = display;

      var locationLeft = computeLocationOfInterest(locationLatLng, 270.0, mRadius);
      var locationRight = computeLocationOfInterest(locationLatLng, 90.0, mRadius);

      if (mDirection == this.directionENUM.CW) {
        mUpArrowMarker = new L.marker(locationLeft, this.upArrowProp);
        mDownArrowMarker = new L.marker(locationRight, this.downArrowProp);
      } else {
        mUpArrowMarker = new L.marker(locationRight, this.upArrowProp);
        mDownArrowMarker = new L.marker(locationLeft, this.downArrowProp);
      }
      mUpArrowMarker.on('drag',arrowDragEvent);
      mDownArrowMarker.on('drag',arrowDragEvent);


      if (this.options.displayOriginMarker == true) {
        mUpArrowMarker.addTo(mLeafletMap);
        mDownArrowMarker.addTo(mLeafletMap);
      }

    };

    /**
     * [function description]
     * @param  {[type]} locationLatLng [description]
     * @param  {[type]} display        [description]
     * @param  {[type]} radius         [description]
     * @param  {[type]} direction      [description]
     * @return {[type]}                [description]
     */
    updateArrows = function(locationLatLng, radius, direction){

      var locationLeft = computeLocationOfInterest(locationLatLng, 270.0, mRadius);
      var locationRight = computeLocationOfInterest(locationLatLng, 90.0, mRadius);

      if (direction == this.directionENUM.CW) {
        mUpArrowMarker.setLatLng(locationLeft);
        mDownArrowMarker.setLatLng(locationRight);
      } else {
        mUpArrowMarker.setLatLng(locationRight);
        mDownArrowMarker.setLatLng(locationLeft);
      }

      mUpArrowMarker.update();
      mDownArrowMarker.update();

    }.bind(this);

    /**
     * [function description]
     * @param  {[type]} locationLatLng [description]
     * @return {[type]}                [description]
     */
    this.updateArrowLocation = function(locationLatLng) {
      mLocation = locationLatLng;
      updateArrows(mLocation,mRadius,mDirection);
    };

    this.updateArrowRadius = function(arrowRadius){
      mRadius = arrowRadius;
      updateArrows(mLocation,mRadius,mDirection);
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
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    arrowDragEvent = function(event){
      var marker = event.target;
      var position = marker.getLatLng();

      var tmpDis = computeDistanceBetween(mLocation,position);
      this.updateArrowRadius(tmpDis);
      mCallbackArrowMove(tmpDis);

    }.bind(this);

    this.callbackArrowMove = function(value) {
      if (value === undefined) return (mCallbackArrowMove);
      mCallbackArrowMove = value;
    }


    this.upArrowIcon = function(value) {
      if (value === undefined) return (upArrowIcon);
      upArrowIcon = value;
    };

    this.upArrowMarker = function(value) {
      if (value === undefined) return (mUpArrowMarker);
      mUpArrowMarker = value;
    };

    this.downArrowIcon = function(value) {
      if (value === undefined) return (downArrowIcon);
      downArrowIcon = value;
    };

    this.downArrowMarker = function(value) {
      if (value === undefined) return (mDownArrowMarker);
      mDownArrowMarker = value;
    };

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



});
