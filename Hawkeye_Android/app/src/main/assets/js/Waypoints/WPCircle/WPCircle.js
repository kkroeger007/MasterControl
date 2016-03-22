/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is be the basic WPCircle class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to circle about a specified radius.
 */

var WPCircle = WPBase.extend(function() {
  this.descriptor = 'WPCircle';

  var mWPCricle_Ring;
  var mWPCircle_Arrow;

  this.WPParams_Latitude = function(value) {
    if (value === undefined) return (this.WPParams_param5());
    this.WPParams_param5(value);
  };
  this.WPParams_Longitude = function(value) {
    if (value === undefined) return (this.WPParams_param6());
    this.WPParams_param6(value);
  };
  this.WPParams_Altitude = function(value) {
    if (value === undefined) return (this.WPParams_param7());
    this.WPParams_param7(value);
  };

  /**
   * [iconProp description] The purpose of this object is to store the properties
   * related to the general marker icon.
   * @type {Object}
   */
  this.iconProp = {
    iconUrl: 'images/Circle-ICON.png', //default icon
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
    this.markerLocationIcon(new L.icon(this.iconProp));
    this.markerProp.icon = this.markerLocationIcon();
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
    this.super(leafletMap, locationLatLng, display);

    mWPCricle_Ring = new WPCircle_Ring(leafletMap, locationLatLng, display, radius);
    mWPCircle_Arrow = new WPCircle_Arrow(leafletMap, locationLatLng, display, radius,direction);
    mWPCircle_Arrow.callbackArrowMove(this.callbackArrowMove);

  };

/**
 * [function description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
  this.callbackArrowMove = function(value){
    mWPCricle_Ring.updateCircleRadius(value);
  }

/**
 * [function description]
 * @param  {[type]} radiusValue [description]
 * @return {[type]}             [description]
 */
  this.updateCircleRadius = function(radiusValue){
    mWPCricle_Ring.updateCircleRadius(locationValue);
    mWPCircle_Arrow.updateArrowRadius(radiusValue);
  };

/**
 * [function description]
 * @param  {[type]} locationLatLng [description]
 * @return {[type]}                [description]
 */
  this.updateCircleLocation = function(locationLatLng){
    mWPCricle_Ring.updateCircleLocation(locationLatLng);
    mWPCircle_Arrow.updateArrowLocation(locationLatLng);
  };

/**
 * [function description]
 * @param  {[type]} locationLatLng [description]
 * @return {[type]}                [description]
 */
  onMoveCallback = function(locationLatLng){
    mWPCricle_Ring.updateCircleLocation(locationLatLng);
    mWPCircle_Arrow.updateArrowLocation(locationLatLng);
  }.bind(this);


});
