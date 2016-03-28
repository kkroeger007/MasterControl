/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: This is a custom WP that has been created by Kenneth Kroeger
 * and is no way to get transmitted to the aircraft. The purpose of this
 * waypoint is to force an operator to takeoff froma specific region if a mission
 * had been created for them. This ensure safe and more successful operations.
 */

var WPTakeoffRegion = WPBase.extend(function() {

  this.descriptor = 'WPTakeoffRegion';


  /**
   * [_WPParams description]
   * @type {Object}
   */
   this.WPParams_Radius = function(value) {
     if (value === undefined) return (this.WPParams_param5());
     this.WPParams_param5(value);
   };
  this.WPParams_Latitude = function(value) {
    if (value === undefined) return (this.WPParams_param5());
    this.WPParams_param5(value);
  };
  this.WPParams_Longitude = function(value) {
    if (value === undefined) return (this.WPParams_param6());
    this.WPParams_param6(value);
  };


  /**
   * [iconProp description] The purpose of this object is to store the properties
   * related to the general marker icon.
   * @type {Object}
   */
  this.iconProp = {
    iconUrl: 'images/ic_wp_Land.png', //default icon
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41]'', // point of the icon which will correspond to marker's location
    popupAnchor: [-19, 38] // point from which the popup should open relative to the iconAnchor
  };

  /**
   * [markerProp description] The purpose of this object is to store the properties
   * related to the marker. These are Leaflet specific properties. See
   *
   * @type {Object}
   */
  this.markerProp.title = 'TAKEOFF_REGION';

  /**
   * [function: this.initializer] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {
    this.markerLocationIcon(new L.icon(this.iconProp));
    this.markerProp.icon = this.markerLocationIcon();

    this.options.transmitToAircraft = false;

  };

  onMoveCallback = function(locationValue){
    this.WPParams_Latitude(locationValue.lat);
    this.WPParams_Longitude(locationValue.lon);
  }.bind(this);


});
