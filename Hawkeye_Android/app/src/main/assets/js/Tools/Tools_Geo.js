/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is to be the basic WPBase class that
 * is inherited/extended by all other waypoint type classes. This will OOP
 * the JS code and promote reusability.
 */

var Tools_Geo = Class.extend(function() {

  var radiusEarth = 6378137; //default radius of earth in meters

  /**
   * [function: this.initializer ] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {

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
  this.constructor = function() {

  };

  /**
   * [function description]
   * @param  {[type]} posOne [description]
   * @param  {[type]} posTwo [description]
   * @return {[type]}        [description]
   */
  this.computeDistanceBetween = function(posOne, posTwo) {

    var gpsOneLat = this.convertDegrees_Radians(posOne.lat);
    var gpsOneLon = this.convertDegrees_Radians(posOne.lng);
    var gpsTwoLat = this.convertDegrees_Radians(posTwo.lat);
    var gpsTwoLon = this.convertDegrees_Radians(posTwo.lng);

    var deltaLat = gpsTwoLat - gpsOneLat;
    var deltaLon = gpsTwoLon - gpsOneLon;

    var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(gpsOneLat) * Math.cos(gpsTwoLat) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var distance = radiusEarth * c;

    return (distance);
  };

  /**
   * [function description]
   * @param  {[type]} originLocation [description]
   * @param  {[type]} xTranslation   [description]
   * @param  {[type]} yTranslation   [description]
   * @return {[type]}                [description]
   */
  this.coordinateShift = function(originLocation, xTranslation, yTranslation) {
    var lonR = this.convertDegrees_Radians(originLocation.lng);
    var latR = this.convertDegrees_Radians(originLocation.lat);

    var lngTranslation = this.metersToEarth(xTranslation);
    var latTranslation = this.metersToEarth(yTranslation);

    var lonFR = lonR + lngTranslation;
    var latFR = latR + latTranslation;

    return (new L.LatLng(this.convertRadians_Degrees(latFR), this.convertRadians_Degrees(lonFR)));
  };

  /**
   * [function description]
   * @param  {[LatLng (degrees)]} originLatLon    [description] The origin location to
   * to compute the new location from.
   * @param  {[Double (radians)]} aircraftBearing [description] The bearing to "walk" to
   * determine the new location.
   * @param  {[Double (meters)]} distanceN       [description] Distance in the "N" direction.
   * @param  {[Double (meters)]} distanceE       [description] Distance in the "E" direciton.
   * @return {[LatLng (degrees)]}                [description] Final location.
   */
  this.computeLocationOfInterestNE = function(originLatLon, aircraftBearing, distanceN, distanceE) {
    var originLatR = this.convertDegrees_Radians(originLatLon.lat);
    var originLonR = this.convertDegrees_Radians(originLatLon.lng);

    var R = 6378137; //default radius of earth in meters

    var finalLatRN = Math.asin(Math.sin(originLatR) * Math.cos(distanceN / R) +
      Math.cos(originLatR) * Math.sin(distanceN / R) * Math.cos(aircraftBearing));
    var finalLonRN = originLonR + Math.atan2(Math.sin(aircraftBearing) * Math.sin(distanceN / R) * Math.cos(originLatR),
      Math.cos(distanceN / R) - Math.sin(originLatR) * Math.sin(finalLatRN));

    var finalLatRE = Math.asin(Math.sin(finalLatRN) * Math.cos(distanceE / R) +
      Math.cos(finalLatRN) * Math.sin(distanceE / R) * Math.cos(aircraftBearing + Math.PI / 2));
    var finalLonRE = finalLonRN + Math.atan2(Math.sin(aircraftBearing + Math.PI / 2) * Math.sin(distanceE / R) * Math.cos(finalLatRN),
      Math.cos(distanceE / R) - Math.sin(finalLatRN) * Math.sin(finalLatRE));

    var finalLatD = this.convertRadians_Degrees(finalLatRE);
    var finalLonD = (this.convertRadians_Degrees(finalLonRE) + 540.0) % 360 - 180; //wraps the result to +/- 180

    var finalLocation = new L.LatLng(finalLatD, finalLonD);

    return (finalLocation);
  };

  /**
   * [function description]
   * @param  {[type]} angleDegrees [description]
   * @return {[type]}              [description]
   */
  this.convertDegrees_Radians = function(angleDegrees) {
    var angleRadians = (Math.PI / 180.0) * (angleDegrees);
    return (angleRadians);
  };

  /**
   * [function description]
   * @param  {[type]} angleRadians [description]
   * @return {[type]}              [description]
   */
  this.convertRadians_Degrees = function(angleRadians) {
    var angleDegrees = (180.0 / Math.PI) * (angleRadians);
    return (angleDegrees);
  };

  /**
   * [function description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  this.metersToEarth = function(value) {
    return (value / radiusEarth);
  };

});
