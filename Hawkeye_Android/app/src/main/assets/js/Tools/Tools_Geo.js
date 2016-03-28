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
   * [function description]
   * @param  {[type]} posOne [description]
   * @param  {[type]} posTwo [description]
   * @return {[type]}        [description]
   */
  this.computeDistanceBetween = function(posOne, posTwo) {

    var gpsOneLat = convertDegrees_Radians(posOne.lat);
    var gpsOneLon = convertDegrees_Radians(posOne.lng);
    var gpsTwoLat = convertDegrees_Radians(posTwo.lat);
    var gpsTwoLon = convertDegrees_Radians(posTwo.lng);

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

});
