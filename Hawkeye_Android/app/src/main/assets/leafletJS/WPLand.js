/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/8/2016
 *
 * Description: The purpose of this class is be the basic WPLand class that
 * is inherets the WPGeneral Class. This waypoint represents the target location
 * for the UAV to land.
 */

var WPLand = WPGeneral.extend(function() {

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
