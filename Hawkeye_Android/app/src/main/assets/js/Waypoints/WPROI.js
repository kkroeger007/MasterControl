/*
 * Created: Kenneth Kroeger
 * Date: 3/24/2016
 *
 * Description: The purpose of this class is be the basic WPROI class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to point the nose towards while performing the flight.
 */


/* NOTES:
 *COPTER
 *Points the nose of the vehicle and camera gimbal at the “region of interest”.
 *In the example above the nose and camera would be pointed at the red marker.
 *
 *The nose would continue to point at the red marker until the end of the
 *mission. *To “clear” the do-set-roi and cause the vehicle to return to
 *it’s default behaviour (i.e. pointing at the next waypoint) a second
 *DO_SET_ROI command should be placed later in the mission with all zero for
 *Lat, Lon and Alt.
 */
var WPROI = WPBase.extend(function() {

  this.descriptor = 'WPROI';

  /**
   * [_WPParams description]
   * @type {Object}
   */
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
   * [options description] The purpose of this object is to set specific options
   * specific to the WPGeneral Class. These options would initially be inherited
   * by an class extending this class.
   * @type {Object}
   */
  this.options = {
    displayOriginMarker: true
  };

  /**
   * [iconProp description] The purpose of this object is to store the properties
   * related to the general marker icon.
   * @type {Object}
   */
  this.iconProp.iconUrl = 'images/marker-icon.png'; //default icon

  /**
   * [markerProp description] The purpose of this object is to store the properties
   * related to the marker. These are Leaflet specific properties. See
   *
   * @type {Object}
   */
  this.markerProp.title = 'ROI';

  /**
   * [function: this.initializer ] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {
    this.markerLocationIcon(new L.icon(this.iconProp));
    this.markerProp.icon = this.markerLocationIcon();
  };

  /**
   * [function description]
   * @param  {[type]} leafletMap     [description]
   * @param  {[type]} locationLatLng [description]
   * @param  {[type]} altitude       [description]
   * @param  {[type]} display        [description]
   * @return {[type]}                [description]
   */
  this.constructor = function(leafletMap, locationLatLng, altitude, display) {
    this.super(leafletMap, locationLatLng, display);

    this.WPParams_Latitude(locationLatLng.lat);
    this.WPParams_Longitude(locationLatLng.lng);
    this.WPParams_Altitude(altitude);
  };

  /**
   * [function description]
   * @param  {[type]} locationValue [description]
   * @return {[type]}               [description]
   */
  onMoveCallback = function(locationValue) {
    this.WPParams_Latitude(locationValue.lat);
    this.WPParams_Longitude(locationValue.lon);
  }.bind(this);

});
