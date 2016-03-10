/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/9/2016
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
  var _WPParams = {
    param1: null,
    param2: null,
    param3: null,
    param4: null,
    param5: null,
    param6: null,
    param7: null
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

});
