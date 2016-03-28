/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is be the basic WPLand class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to land.
 */


/*
 *The vehicle will climb straight up from it’s current location to the
 *specified altitude. If the mission is begun while the copter is already
 *flying, the vehicle will climb straight up to the specified altitude,
 *if the vehicle is already above the altitude the command will be ignored
 *and the mission will move onto the next command immediately.
 */
var WPLaunch = WPBase.extend(function() {

  this.descriptor = 'WPLaunch';

  /**
   * [_WPParams description]
   * @type {Object}
   */
  this.WPParams_pitch = function(value) {
    if (value === undefined) return (this.WPParams_param1());
    this.WPParams_param1(value);
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
   * specific to the WPLaunch Class. These options would initially be inherited
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
  this.iconProp = {
    iconUrl: 'images/ic_wp_Land.png', //default icon
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };

  /**
   * [markerProp description] The purpose of this object is to store the properties
   * related to the marker. These are Leaflet specific properties. See
   *
   * @type {Object}
   */
  this.markerProp.title = 'LAUNCH';

  /**
   * [function: this.initializer] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {
    this.markerLocationIcon(new L.icon(this.iconProp));
    this.markerProp.icon = this.markerLocationIcon();
  };

  onMoveCallback = function(locationValue){
    this.WPParams_Latitude(locationValue.lat);
    this.WPParams_Longitude(locationValue.lon);
  }.bind(this);


});
