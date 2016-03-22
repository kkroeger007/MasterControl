/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is to be the basic WPBase class that
 * is inherited/extended by all other waypoint type classes. This will OOP
 * the JS code and promote reusability.
 */

//TODO: If the radius is set to zero remove hide the display ring.

var WPCircle_Ring = Class.extend(function() {
    this.descriptor = 'WPCircle_Ring';

    var mLeafletMap; //This holds the leaflet map object.

    var mCircleMarker;

    /**
     * [options description] The purpose of this object is to set specific options
     * specific to the WPCircle Class. These options would initially be inherited
     * by an class extending this class.
     * @type {Object}
     */
    this.options = {
      displayOriginMarker: true
    };

    /**
     * [circlePathProp description] The purpose of this object is to store the properties
     * related to the marker. These are Leaflet specific properties.
     * @type {Object}
     */
    this.circlePathProp = {
      stroke: true,
      color: '#e30e0e',
      weight: 5,
      opacity: 0.75,
      fill: true,
      fillColor: '#e30e0e',
      fillOpacity: 0.2,
      fillRule: 'evenodd',
      dashArray: null,
      lineCap: null,
      lineJoin: null,
      clickable: false
    };

    /**
     * [function description] This is the default constructor for the WPCircle class.
     * This class handles the orbit and/or circle routine and functionality of the
     * UAS.
     * @param  {[map]} leafletMap     [description]
     * @param  {[LatLng]} locationLatLng [description]
     * @param  {[Bool]} display        [description]
     * @param  {[Float]} radius         [description]
     * @return {[type]}                [description]
     */
    this.constructor = function(leafletMap, locationLatLng, display, radius) {
      mLeafletMap = leafletMap;
      this.options.displayOriginMarker = display;

      mCircleMarker = new L.circle(locationLatLng, radius, this.circlePathProp);

      if (display == true) {
        mCircleMarker.addTo(mLeafletMap);
      }
    };

    /**
     * [function description]
     * @param  {[type]} locationLatLng [description]
     * @return {[type]}                [description]
     */
    this.updateCircleLocation = function(locationLatLng) {
      mCircleMarker.setLatLng(locationLatLng);
      mCircleMarker.redraw();
    };

    /**
     * [function description]
     * @param  {[type]} radialDistance [description]
     * @return {[type]}                [description]
     */
    this.updateCircleRadius = function(radialDistance) {
      mCircleMarker.setRadius(radialDistance);
      mCircleMarker.redraw();
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
    };

});
