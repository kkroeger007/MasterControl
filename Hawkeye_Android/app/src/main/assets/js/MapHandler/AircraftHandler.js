/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is to be the basic class that gets
 * information about the aircraft and renders to the map or the appropriate
 * objects within the GUI.
 */

var AircraftHandler = Class.extend(function() {

  var mLeafletMap; //This holds the leaflet map object.

  this.initializer = function() {

  };

  this.constructor = function(leafletMap) {
    mLeafletMap = leafletMap;
  };

  /**
   * [function description]
   * @param  {[Leaflet Map]} leafletMap [description]
   * @return {[type]}            [description]
   */
  this.updateMap = function(leafletMap) {
    mLeafletMap = leafletMap;
    if (this.options.displayOriginMarker == true) {
      mMarker.addTo(mLeafletMap);
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
