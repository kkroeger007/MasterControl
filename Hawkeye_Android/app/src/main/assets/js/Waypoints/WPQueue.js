/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/9/2016
 *
 * Description: The purpose of this class is to handle the order and manage
 * the objects of all of the WP. This will be the list that is sent to the host
 * application when the operator requests to save or transmit the WP path.
 */

var WPQueue = Class.extend(function() {

  var _leafletMap; //This holds the leaflet map object.


  //TODO: Establish a method to determine the current flight mode selected so that
  //correct actions can be taken upon selecting on the Polyline.

  /**
   * [_markerArray description] The purpose of this object is to hold and manage
   * the order of the other WP objects.
   * @type {Array}
   */
  this.markerArray = [];

  /**
   * [options description] The purpose of this object is to set specific options
   * specific to the WPQueue Class.
   * @type {Object}
   */
  this.options = {

  };

  /**
   * [function: this.initializer ] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {

  };

  /**
   * [function description]
   * @return {[type]} [description]
   */
  this.constructor = function(leafletMap) {
    _leafletMap = leafletMap;
    this.wpPathHandler = new WPPathHandler(this.markerArray);
    this.wpPathHandler.onPolyLineClick(this.callbackPolylineClick)
  };

  /**
   * [function description]
   * @param  {[event]} value [description]
   * @return {[type]}       [description]
   */
  this.callbackPolylineClick = function(value) {
    //TODO: Determine the appropriate marker type to add into the array
    //For now we will add a general WP
    var tmpWPObject = new WPGeneral(_leafletMap,value.clickLocation,true);
    this.spliceMarker(tmpWPObject,value.insertIndex);
    this.wpPathHandler.redrawPath();
  };

  /**
   * [function description]
   * @param  {[Leaflet marker]} marker [description]
   * @return {[type]}        [description]
   */
  this.appendMarker = function(marker) {
    this.markerArray.push(marker);
    marker._callbackOnMove(this.callbackOnMove);
    this.wpPathHandler.appendMarker();
  };

  /**
   * [function description] The purpose of this function is to handle the
   * callbackOnMove event. From this we get the exact object that had an event
   * change.
   * @param  {[WPObject]} value [description] This is the object that had changed.
   * @return {[type]}       [description]
   */
  this.callbackOnMove = function(value) {
    var tmpIndex = this.markerArray.indexOf(value);
    this.wpPathHandler.movedMarker(tmpIndex);
  };

  /**
   * [function description]
   * @param  {[Leaflet marker]} marker      [description]
   * @param  {[Int]} spliceIndex [description]
   * @return {[type]}             [description]
   */
  this.spliceMarker = function(marker, spliceIndex) {
    this.markerArray.splice(spliceIndex, 0, marker);
    marker._callbackOnMove(this.callbackOnMove);
  };

  /**
   * [function description]
   * @param  {[Leaflet marker]} marker [description]
   * @return {[type]}        [description]
   */
  this.removeMarker = function(marker) {
    var tmpIndex = this.markerArray.indexOf(marker);
    if (tmpIndex > -1) {
      this.markerArray.splice(tmpIndex, 1);
    }
  };

});
