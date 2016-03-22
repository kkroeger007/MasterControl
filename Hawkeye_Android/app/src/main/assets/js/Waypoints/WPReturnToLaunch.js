/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is be the basic WPRTL class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to land.
 */

/*
 *NOTES: Return to the home location (or the nearest Rally Point if closer) and
 *then land. The home location is where the vehicle was last armed (or when it
 *first gets GPS lock after arming if the vehicle configuration allows this).
 *
 *This is the mission equivalent of the RTL flight mode.  The vehicle will
 *first climb to the RTL_ALT parameter’s specified altitude (default is 15m)
 *before returning home.
 *
 *This command takes no parameters and generally should be the last command in
 *the mission.
 */

var WPTRL = WPBase.extend(function() {

  this.descriptor = 'WPRTL';

  /**
   * [_WPParams description] There are no editable parameters for this base object.
   * We will debate to specify a differentiation between RTL between home, launch,
   * and or rally points.
   * @type {Object}
   */
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

});
