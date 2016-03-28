/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is be the basic WPGeneral class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to land.
 */

var WPGeneral = WPBase.extend(function() {
  this.descriptor = 'WPGeneral';

  /**
   * [_WPParams description]
   * @type {Object}
   */
  this.WPParams_delay = function(value) {
    if (value === undefined) return (this.WPParams_param1());
    this.WPParams.param1(value);
  };
  this.WPParams_acceptanceRadius = function(value) {
    if (value === undefined) return (this.WPParams_param2());
    this.WPParams_param2(value);
  };
  this.WPParams_orbitRadius = function(value) {
    if (value === undefined) return (this.WPParams_param3());
    this.WPParams_param3(value);
  };
  this.WPParams_yawAngle = function(value) {
    if (value === undefined) return (this.WPParams_param4());
    this.WPParams_param4(value);
  };
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
  this.markerProp.title = 'WP';

  /**
   * [function: this.initializer ] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {
    this.markerLocationIcon(new L.icon(this.iconProp));
    this.markerProp.icon = this.markerLocationIcon();
  };

  this.constructor = function(leafletMap, locationLatLng, display) {
    this.super(leafletMap, locationLatLng, display);

    this.WPParams_Latitude(locationLatLng.lat);
    this.WPParams_Longitude(locationLatLng.lng);
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
