/*
 * Created: Kenneth Kroeger
 * Date: 3/24/2016
 *
 * Description: The purpose of this class is to be a class that handles and
 * manages the image footprint information. This class manages the appropriate
 * subclasses such as ImageBox, ImageFootprint, ImageRayTrace. This class will
 * also manage the actual camera properties that are established by the user
 * at load or via preferences configuration.
 */

var CameraHandler = Class.extend(function() {

  this.descriptor = 'UAVCamera';
  var mImageFootprint;

/**
 * [function description]
 * @return {[type]} [description]
 */
  this.initializer = function() {

  };

/**
 * [function description] Default constructor.
 * @param  {[map]} leafletMap        [description]
 * @param  {[Boolean]} displayBoundary   [description]
 * @param  {[Boolean]} displayBackground [description]
 * @param  {[Boolean]} displayRayTrace   [description]
 * @return {[type]}                   [description]
 */
  this.constructor = function(leafletMap, displayBoundary, displayBackground, displayRayTrace) {
    mImageFootprint = new ImageFootprint(map,displayBoundary, displayBackground, displayRayTrace);
  };

/**
 * [function description] The purpose of this function is to update all
 * necessary subclasses of the new information possessed by the vehicle. This
 * will cause a redraw and/or rerender if necessary of the camera footprint.
 * @param  {[LatLng]} location [description]
 * @param  {[double Degrees]} roll     [description]
 * @param  {[double Degrees]} pitch    [description]
 * @param  {[double Degrees]} yaw      [description]
 * @param  {[double Meters]} alt_rel  [description]
 * @return {[type]}          [description]
 */
  this.updateUAVState = function(location, roll,pitch,yaw,alt_rel){
    mImageFootprint.updateImageFootprint(location, roll,pitch,yaw,alt_rel);
  };

/**
 * [updateBoxView description]
 * @param  {[Boolean]} displayBoundary   [description]
 * @param  {[Boolean]} displayBackground [description]
 * @return {[type]}                   [description]
 */
  this.updateBoxView = function(displayBoundary,displayBackground){

  };

/**
 * [updateRayView description]
 * @param  {[Boolean]} displayRayTrace [description]
 * @return {[type]}                 [description]
 */
  this.updateRayView = function(displayRayTrace){

  };

/**
 * [cameraProperties description] This object holds all of the appropriate
 * camera properties of the current imaging system aboard the aircraft. The user
 * will have to specify this information in the preferences window of the app.
 * @type {Object}
 */
  var cameraProperties = {
    SensorWidth: 6.17, //width of sensor in mm
    WidthPixels: 3000,
    SensorHeight: 4.55, //height of sensor in mm
    HeightPixels: 2250,
    FocalLength: 3, //focal length of lens in mm
    SensorResolution: 6.75 //resolution in MP
  };

  this.CameraProperties = function(value) {
    if (value === undefined) return (cameraProperties);
    cameraProperties = value;
  };
  this.SensorWidth = function(value) {
    if (value === undefined) return (cameraProperties.SensorWidth);
    cameraProperties.SensorWidth = value;
    mImageFootprint.updateCameraProperties(cameraProperties);
  };
  this.WidthPixels = function(value) {
    if (value === undefined) return (classameraProperties.WidthPixels);
    cacmeraProperties.WidthPixels = value;
    mImageFootprint.updateCameraProperties(cameraProperties);
  };
  this.SensorHeight = function(value) {
    if (value === undefined) return (cameraProperties.SensorHeight);
    cameraProperties.SensorHeight = value;
    mImageFootprint.updateCameraProperties(cameraProperties);
  };
  this.HeightPixels = function(value) {
    if (value === undefined) return (cameraProperties.HeightPixels);
    cameraProperties.HeightPixels = value;
    mImageFootprint.updateCameraProperties(cameraProperties);
  };
  this.FocalLength = function(value) {
    if (value === undefined) return (cameraProperties.FocalLength);
    cameraProperties.FocalLength = value;
    mImageFootprint.updateCameraProperties(cameraProperties);
  };
  this.SensorResolution = function(value) {
    if (value === undefined) return (cameraProperties.SensorResolution);
    cameraProperties.SensorResolution = value;
    mImageFootprint.updateCameraProperties(cameraProperties);
  };


/**
 * [resolutionProperties description] This object holds all of the appropriate
 * properties of the cameras resulting resolution and effective imaging areas.
 * When stored within this object it should already be transformed back into
 * the user preferred unit system as the UI will not manage this.
 * @type {Object}
 */
  var resolutionProperties = {
    widthMeters: null,
    widthResolution: null,
    heightMeters: null,
    heightResolution: null,
    GSD: null
  };
  this.widthMeters = function(value) {
    if (value === undefined) return (resolutionProperties.widthMeters);
    resolutionProperties.widthMeters = value;
  };
  this.widthResolution = function(value) {
    if (value === undefined) return (resolutionProperties.widthResolution);
    resolutionProperties.widthResolution = value;
  };
  this.heightMeters = function(value) {
    if (value === undefined) return (resolutionProperties.heightMeters);
    resolutionProperties.heightMeters = value;
  };
  this.heightResolution = function(value) {
    if (value === undefined) return (resolutionProperties.heightResolution);
    resolutionProperties.heightResolution = value;
  };
  this.GSD = function(value) {
    if (value === undefined) return (resolutionProperties.GSD);
    resolutionProperties.GSD = value;
  };


/**
 * [function description] This function updates all of the resolution properties
 * of the camera imaging system based on altitude and foreseen footprint in an
 * ideal scenario. The key here being ideal because of the potential skew properties
 * of the camera.
 * @param  {[type]} alt [description]
 * @param  {[type]} sY  [description]
 * @param  {[type]} sX  [description]
 * @return {[type]}     [description]
 */
  updateFootprintResolution = function(alt, sY, sX) {

    var sX = this.SensorWidth / 2;
    var sY = this.SensorHeight / 2;
    var f = this.FocalLength();

    this.widthMeters = alt * 2 * Math.tan(Math.atan2(sX, (2 * f)));
    this.heightMeters = alt * 2 * Math.tan(Math.atan2(sY, (2 * f)));

  };


  var mLeafletMap;
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
