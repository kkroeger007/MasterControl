/*
 * Created: Kenneth Kroeger
 * Date: 3/24/2016
 *
 * Description: The purpose of this class is to be a class that renders the
 * camera box footprint. This can be enabled or disabled based on the user
 * preference. The purpose of this class is to help a user understand what
 * the aircraft may be looking at and help further direct the aircraft to
 * look at specific locations on the map.
 */

var ImageBox = Class.extend(function() {
    this.descriptor = 'ImageBox';

    var mLeafletMap; //This holds the leaflet map object.

    var mBackgroundPolygon; //This object holds the polygon rendering

    var mRemovalFlag; //Stores the state of whether the box is being rendered

    /**
     * [options description] The purpose of this object is to set specific options
     * specific to the ImageBox Class. These options would initially be inherited
     * by an class extending this class.
     * @type {Object}
     */
    this.options = {
      displayImageBox: true,
    };

    /**
     * [circlePathProp description] The purpose of this object is to store the properties
     * related to the marker. These are Leaflet specific properties.
     * @type {Object}
     */
    this.polygonPathProp = {
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

    this.initializer = function() {
      mRemovalFlag = false;
    };

    /**
     * [function description]
     * @param  {[map]} leafletMap        [description]
     * @param  {[Boolean]} displayBackground [description]
     * @param  {[Boolean]} displayBoundary   [description]
     * @return {[type]}                   [description]
     */
    this.constructor = function(leafletMap, displayBackground, displayBoundary) {
      mLeafletMap = leafletMap;
      this.options.displayBackground = displayBackground;
      this.polygonPathProp.stroke = displayBoundary;
      this.polygonPathProp.fill = displayBackground;
      mBackgroundPolygon = new L.polygon(this.polygonPathProp);
      mBackgroundPolygon.addTo(mLeafletMap);

    };

    /**
     * [function description]
     * @param  {[LatLng]} boundaryLatLng [description] The boundary locaitons representing
     * the corners of the image location.
     * @param  {[LatLng]} originLatLng   [description] The origin location representing
     * the aircraft location.
     * @return {[type]}                [description]
     */
    this.updateImageLocation = function(boundaryLatLng, originLatLng) {

      if(mRemovalFlag == false)
      {
        mBackgroundPolygon.setLatLngs(boundaryLatLng);
        mBackgroundPolygon.redraw();
      }
    };

/**
 * [function description]
 * @param  {[Boolean]} value [description]
 * @return {[type]}       [description]
 */
    this.removeImageFootprint = function(value){
      if(mRemovalFlag != value){
        if(mRemovalFlag == true){ //This case tells us that it has been removed and we need to add it
            mBackgroundPolygon.addTo(mLeafletMap);
        }else{ //This case tell us that we need to remove it
            mLeafletMap.removeLayer(mBackgroundPolygon);
        }
        mRemovalFlag = value;
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
    };

});
