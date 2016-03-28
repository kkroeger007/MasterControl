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

  var mGeoToolbox;

  var mDCM;

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
    WidthPixels: 3000,
    SensorHeight: 4.55, //height of sensor in mm
    HeightPixels: 2250,
    FocalLength: 3, //focal length of lens in mm
    SensorResolution: 6.75 //resolution in MP
  };

  /**
   * [function description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  this.updateCameraProperties = function(value) {
    this.cameraProperties = value;
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
  this.constructor = function(leafletMap, displayBoundary, displayBackground, displayRay) {
    mLeafletMap = leafletMap;
    mDCM = createMatrix(3, 3);
    
    mImageBox = new ImageBox(leafletMap, displayBoundary, displayBackground);
    mImageRayTrace = new ImageRayTrace(leafletMap, displayRay);

    mGeoToolbox = new Tools_Geo();
  };


  /**
   * [function description]
   * @param  {[type]} aircraftLocation [description]
   * @param  {[type]} roll             [description]
   * @param  {[type]} pitch            [description]
   * @param  {[type]} yaw              [description]
   * @param  {[type]} alt_rel          [description]
   * @return {[type]}                  [description]
   */
  this.updateImageFootprint = function(aircraftLocation, roll, pitch, yaw, alt_rel) {

    var sX = this.cameraProperties.SensorWidth / 2;
    var sY = this.cameraProperties.SensorHeight / 2;
    var f = this.cameraProperties.FocalLength;

    var dcm = dcmFromEuler(mGeoToolbox.convertDegrees_Radians(-roll + 180),
      mGeoToolbox.convertDegrees_Radians(pitch),
      mGeoToolbox.convertDegrees_Radians(-yaw));

    //TODO: Fix the discontinuity when the aircraft gimabl is straight
    //forward. For now since we know we are conducting surveys this is an
    //acceptable solution and be better than the previous commit.
    var TL = cameraFrameToLocalFrame(-sX, -sY, f, aircraftLocation, dcm, -yaw, alt_rel);
    var TR = cameraFrameToLocalFrame(sX, -sY, f, aircraftLocation, dcm, -yaw, alt_rel);
    var BR = cameraFrameToLocalFrame(sX, sY, f, aircraftLocation, dcm, -yaw, alt_rel);
    var BL = cameraFrameToLocalFrame(-sX, sY, f, aircraftLocation, dcm, -yaw, alt_rel);

    var footprintArray = [TL, TR, BR, BL];

    mImageBox.updateImageLocation(footprintArray);
    mImageRayTrace.updateRayTrace(footprintArray, aircraftLocation);
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


  /**
   * [function description]
   * @param  {[type]} roll  [description]
   * @param  {[type]} pitch [description]
   * @param  {[type]} yaw   [description]
   * @return {[type]}       [description]
   */
  dcmFromEuler = function(roll, pitch, yaw) {

    var cp = Math.cos(pitch);
    var sp = Math.sin(pitch);
    var sr = Math.sin(roll);
    var cr = Math.cos(roll);
    var sy = Math.sin(yaw);
    var cy = Math.cos(yaw);

    mDCM[0][0] = cp * cy;
    mDCM[1][0] = (sr * sp * cy) - (cr * sy);
    mDCM[2][0] = (cr * sp * cy) + (sr * sy);
    mDCM[0][1] = cp * sy;
    mDCM[1][1] = (sr * sp * sy) + (cr * cy);
    mDCM[2][1] = (cr * sp * sy) - (sr * cy);
    mDCM[0][2] = -sp;
    mDCM[1][2] = sr * cp;
    mDCM[2][2] = cr * cp;

    return mDCM;
  };

  /**
   * [function description]
   * @param  {[type]} length [description]
   * @return {[type]}        [description]
   */
  createMatrix = function(length) {
    var arr = new Array(length || 0),
      i = length;

    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while (i--) arr[length - 1 - i] = createMatrix.apply(this, args);
    }

    return arr;
  };

  /**
   * [function description]
   * @param  {[type]} latSize     [description]
   * @param  {[type]} lngSize     [description]
   * @param  {[type]} focalLength [description]
   * @param  {[type]} center      [description]
   * @param  {[type]} dcm         [description]
   * @param  {[type]} yaw         [description]
   * @param  {[type]} alt         [description]
   * @return {[type]}             [description]
   */
  cameraFrameToLocalFrame = function(latSize, lngSize, focalLength, center, dcm, yaw, alt) {
    var x = alt * (dcm[0][0] * latSize + dcm[1][0] *
      lngSize + dcm[2][0] * (-focalLength)) / (dcm[0][2] *
      latSize + dcm[1][2] * lngSize + dcm[2][2] *
      (-focalLength));

    var y = alt * (dcm[0][1] * latSize + dcm[1][1] *
      lngSize + dcm[2][1] * (-focalLength)) / (dcm[0][2] *
      latSize + dcm[1][2] * lngSize + dcm[2][2] *
      (-focalLength));

    return mGeoToolbox.computeLocationOfInterestNE(center, 0, y, x);
  };

});
