/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is to be the basic WPBase class that
 * is inherited/extended by all other waypoint type classes. This will OOP
 * the JS code and promote reusability.
 */

var ImageFootprint = Class.extend(function() {

  var mLeafletMap; //This holds the leaflet map object.

  this.cameraProperties = {
    SensorWidth: 36, //width of sensor in mm
    SensorHeight: 24, //height of sensor in mm
    FocalLength: 50, //focal length of lens in mm
  };

  this.aircraftProperties = {
    Altitude: 100, //aircraft height in m
    ResultingRoll: 30,
    ResultingPitch: 30,
    Yaw: 0
  };

  this.cameraFOV = {
    width: 30, //degrees
    height: 30 //degrees
  };

  this.initializer = function() {

  };

  this.constructor = function(leafletMap) {
    mLeafletMap = leafletMap;
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
