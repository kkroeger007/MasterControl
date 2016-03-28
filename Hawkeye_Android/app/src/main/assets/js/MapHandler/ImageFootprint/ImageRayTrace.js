/*
 * Created: Kenneth Kroeger
 * Date: 3/24/2016
 *
 * Description: The purpose of this class is to handle the drawing and rendering
 * of the Polylines between WP. It will work in conjunction with the WPQueue class.
 */

var ImageRayTrace = Class.extend(function() {

  /**
   * [_markerArray description] The purpose of this object is to hold and manage
   * the order of the other WP objects.
   * @type {Array}
   */
  var mWPPolylineArray = [];
  var mLeafletMap;


  var polyLineProp = {
    stroke: true,
    color: '#e30e0e',
    weight: 2,
    opacity: 0.75,
    fill: true,
    fillColor: '#e30e0e',
    fillOpacity: 0.2,
    fillRule: 'evenodd',
    dashArray: null,
    lineCap: null,
    lineJoin: null,
    clickable: false,

    //These two are special for Polylines.
    smoothFactor: 1.0,
    noClip: false
  }

  /**
   * [options description] The purpose of this object is to set specific options
   * specific to the WPQueue Class.
   * @type {Object}
   */
  this.options = {
    displayRayTrace: true
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
  this.constructor = function(leafletMap,displayRayTrace) {
    mLeafletMap = leafletMap;
    this.options.displayRayTrace = displayRayTrace;

  };

/**
 * [function description]
 * @param  {[type]} imageBoundaries  [description]
 * @param  {[type]} aircraftLocation [description]
 * @return {[type]}                  [description]
 */
  this.updateRayTrace = function(imageBoundaries, aircraftLocation) {
    if (this.options.displayRayTrace == true) {
      for (index = 0; index < mWPPolylineArray.length; index++) {
        map.removeLayer(mWPPolylineArray[index]);
      }
      mWPPolylineArray = [];

      for (index = 0; index < imageBoundaries.length; index++) {
        var WPPolyline = new L.polyline([imageBoundaries[index],aircraftLocation],polyLineProp);
        WPPolyline.addTo(mLeafletMap);
        mWPPolylineArray.push(WPPolyline);
      }
    }
  };

/**
 * [displayRayTrace description]
 * @param  {[type]} displayRayTrace [description]
 * @return {[type]}                 [description]
 */
  this.displayRayTrace = function(displayRayTrace) {
    this.options.displayRayTrace = displayRayTrace;

    if (this.options.displayRayTrace == false) {
      for (index = 0; index < mWPPolylineArray.length; index++) {
        map.removeLayer(mWPPolylineArray[index]);
      }
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
