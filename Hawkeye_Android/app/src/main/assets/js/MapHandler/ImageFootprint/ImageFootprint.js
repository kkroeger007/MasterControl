/*
 * Created: Kenneth Kroeger
 * Date: 3/24/2016
 *
 * Description: The purpose of this class is to be the basic ImageFootprint
 * class that supports the rendering of the image footprint either as the
 * vehicle is flying or the user is performing a survey operation.
 */

var ImageFootprint = Class.extend(function() {
  this.descriptor = 'ImageFootprint';

  var mLeafletMap; //This holds the leaflet map object.
  var mImageBox; //This holds the ImageBox Class
  var mImageRayTrace; //This holds the image trace class.

  /**
   * [mThreshold description] This parameter is used to control when the
   * rendering should switch from a vertical to horizontal drawing representation
   * to handle the discontinuity as the FOV approaches the horizontal plane.
   * @type {Number}
   */
  var mThreshold = 1.53589;

/**
 * [cameraProperties description]
 * @type {Object}
 */
  this.cameraProperties = {
    SensorWidth: 6.17, //width of sensor in mm
    SensorHeight: 4.55, //height of sensor in mm
    FocalLength: 3 //focal length of lens in mm
  };

/**
 * [function description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
  this.updateCameraProperties = function(value){
    this.cameraProperties = value;
  }

/**
 * [aircraftProperties description]
 * @type {Object}
 */
  this.aircraftState = {
    Altitude: 100, //aircraft height in m
    Roll: 0, //degrees
    Pitch: 0, //degrees
    Yaw: 0 //degrees
  };

  /**
   * [function description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  this.updateAircraftState = function(value,aircraftLocation){
    this.aircraftState = value;
    updateImageFootprint(aircraftLocation);
  }

/**
 * [gimbalProperties description]
 * @type {Object}
 */
  this.gimbalState = {
    Gimbaled: true,
    Roll: 0, //degrees
    Pitch: 45, //degrees
    Yaw: 0 //degrees
  };
  /**
   * [function description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  this.updateGimbalState = function(value){
    this.gimbalState = value;
  }

/**
 * [cameraFOV description]
 * @type {Object}
 */
  this.cameraFOV = {
    width: 0, //radians
    height: 0 //radians
  };

/**
 * [function description]
 * @return {[type]} [description]
 */
  this.initializer = function() {

  };

/**
 * [function description] Default constructor for this class.
 * @param  {[map]} leafletMap [description]
 * @return {[type]}            [description]
 */
  this.constructor = function(leafletMap) {
    mLeafletMap = leafletMap;
    this.cameraFOV.width = 2*Math.atan2(this.cameraProperties.SensorWidth,(2*this.cameraProperties.FocalLength));
    this.cameraFOV.height = 2*Math.atan2(this.cameraProperties.SensorHeight,(2*this.cameraProperties.FocalLength));

    mImageBox = new ImageBox(leafletMap,true,true);
    mImageRayTrace = new ImageRayTrace(leafletMap,true);
  };

  /**
   * [function description]
   * @param  {[type]} aircraftLocation [description]
   * @return {[type]}                  [description]
   */
  updateImageFootprint = function(aircraftLocation) {
    var resultingPitch = convertDegrees_Radians(this.aircraftProperties.Pitch + this.gimbalProperties.Pitch);
    var resultingRoll = -convertDegrees_Radians(this.aircraftProperties.Roll + this.gimbalProperties.Roll);

    if (Math.abs(resultingPitch)<mThreshold && Math.abs(resultingRoll)<mThreshold){
      var bottom = this.aircraftProperties.Altitude * Math.tan(resultingPitch - 0.5 * this.cameraFOV.height);
      var top = this.aircraftProperties.Altitude * Math.tan(resultingPitch + 0.5 * this.cameraFOV.height);
      var left = this.aircraftProperties.Altitude * Math.tan(resultingRoll - 0.5 * this.cameraFOV.width);
      var right = this.aircraftProperties.Altitude * Math.tan(resultingRoll + 0.5 * this.cameraFOV.width);

      var TopRight = computeLocationOfInterestNE(aircraftLocation, convertDegrees_Radians(this.aircraftProperties.Yaw), top, right);
      var TopLeft = computeLocationOfInterestNE(aircraftLocation, convertDegrees_Radians(this.aircraftProperties.Yaw), top, left);
      var BottomRight = computeLocationOfInterestNE(aircraftLocation, convertDegrees_Radians(this.aircraftProperties.Yaw), bottom, right);
      var BottomLeft = computeLocationOfInterestNE(aircraftLocation, convertDegrees_Radians(this.aircraftProperties.Yaw), bottom, left);

      var tmpArray = [TopRight, BottomRight, BottomLeft, TopLeft];
      mImageBox.updateImageLocation(tmpArray);
      mImageRayTrace.updateRayTrace(tmpArray, aircraftLocation);
    } else{
      var viewLeft = computeLocationOfInterest(aircraftLocation,(2*Math.PI - 0.5 * this.cameraFOV.width)+convertDegrees_Radians(this.aircraftProperties.Yaw),50);
      var viewRight = computeLocationOfInterest(aircraftLocation,0.5 * this.cameraFOV.width+convertDegrees_Radians(this.aircraftProperties.Yaw),50);
      mImageBox.updateImageLocation([viewLeft, viewRight,aircraftLocation]);
      mImageRayTrace.updateRayTrace([viewLeft, viewRight],aircraftLocation);
    }
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
 * [function description] This function computes the resulting hypotenuse
 * required to compute the footprint of the image.
 * @param  {[Double]} valueA [description] First value
 * @param  {[Double]} valueB [description] Second value
 * @return {[Double]} result [description] Resulting length
 */
  computeHypotenuse = function(valueA, valueB){
    var result = Math.sqrt(valueA*valueA + valueB*valueB);
    return(result);
  }

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
  computeLocationOfInterestNE = function(originLatLon, aircraftBearing, distanceN, distanceE) {
    var originLatR = convertDegrees_Radians(originLatLon.lat);
    var originLonR = convertDegrees_Radians(originLatLon.lng);

    var R = 6378137; //default radius of earth in meters

    var finalLatRN = Math.asin(Math.sin(originLatR) * Math.cos(distanceN / R) +
      Math.cos(originLatR) * Math.sin(distanceN / R) * Math.cos(aircraftBearing));
    var finalLonRN = originLonR + Math.atan2(Math.sin(aircraftBearing) * Math.sin(distanceN / R) * Math.cos(originLatR),
      Math.cos(distanceN / R) - Math.sin(originLatR) * Math.sin(finalLatRN));

    var finalLatRE = Math.asin(Math.sin(finalLatRN) * Math.cos(distanceE / R) +
      Math.cos(finalLatRN) * Math.sin(distanceE / R) * Math.cos(aircraftBearing + Math.PI/2));
    var finalLonRE = finalLonRN + Math.atan2(Math.sin(aircraftBearing + Math.PI/2) * Math.sin(distanceE / R) * Math.cos(finalLatRN),
      Math.cos(distanceE / R) - Math.sin(finalLatRN) * Math.sin(finalLatRE));

    var finalLatD = convertRadians_Degrees(finalLatRE);
    var finalLonD = (convertRadians_Degrees(finalLonRE) + 540.0) % 360 - 180; //wraps the result to +/- 180

    var finalLocation = new L.LatLng(finalLatD, finalLonD);

    return (finalLocation);
  };

/**
 * [function description]
 * @param  {[LatLng (degrees)]} originLatLon    [description] The origin location to
 * to compute the new location from.
 * @param  {[Double (radians)]} aircraftBearing [description] The bearing to "walk" to
 * determine the new location.
 * @param  {[Double (m)]} locationDistance [description] Distance to "walk".
 * @return {[LatLng (degrees)]} [description]
 */
  computeLocationOfInterest = function(originLatLon, locationBearing, locationDistance) {
    var originLatR = convertDegrees_Radians(originLatLon.lat);
    var originLonR = convertDegrees_Radians(originLatLon.lng);

    var R = 6378137; //default radius of earth in meters

    var finalLatR = Math.asin(Math.sin(originLatR) * Math.cos(locationDistance / R) +
      Math.cos(originLatR) * Math.sin(locationDistance / R) * Math.cos(locationBearing));
    var finalLonR = originLonR + Math.atan2(Math.sin(locationBearing) * Math.sin(locationDistance / R) * Math.cos(originLatR),
      Math.cos(locationDistance / R) - Math.sin(originLatR) * Math.sin(finalLatR));

    var finalLatD = convertRadians_Degrees(finalLatR);
    var finalLonD = (convertRadians_Degrees(finalLonR) + 540.0) % 360 - 180; //wraps the result to +/- 180

    var finalLocation = new L.LatLng(finalLatD, finalLonD);

    return (finalLocation);
  };


  /**
   * [function description] Convert the degree value to radians.
   * @param  {[Double (degrees)]}  [description]
   * @return {[Double (radians)]}  [description]
   */
  convertDegrees_Radians = function(angleDegrees) {
    var angleRadians = (Math.PI / 180.0) * (angleDegrees);
    return (angleRadians);
  };

  /**
   * [function description] Convert the radian value to degrees.
   * @param  {[Double (radians)]}  [description]
   * @return {[Double (degrees)]}  [description]
   */
  convertRadians_Degrees = function(angleRadians) {
    var angleDegrees = (180.0 / Math.PI) * (angleRadians);
    return (angleDegrees);
  };

});
