/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is be the basic WPLand class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to land.
 */

/*
 *NOTES: The motors will not stop on their own...you must exit AUTO to cut
 *engins or send a disable command. //TODO: Could this be automated if desired?
 */

var WPLand = WPBase.extend(function() {

  this.descriptor = 'WPLand';

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
   * specific to the WPLand Class. These options would initially be inherited
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
  this.markerProp.title = 'LAND';

  /**
   * [function: this.initializer ] This function intializes the necessary variables
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
