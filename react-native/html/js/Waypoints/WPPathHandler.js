/*
 * Created: Kenneth Kroeger
 * Updated Date: 3/9/2016
 *
 * Description: The purpose of this class is to handle the drawing and rendering
 * of the Polylines between WP. It will work in conjunction with the WPQueue class.
 */

var WPPathHandler = Class.extend(function() {

  var onPolyLineClick;

  /**
   * [_markerArray description] The purpose of this object is to hold and manage
   * the order of the other WP objects.
   * @type {Array}
   */
  this._WPQueue = [];
  this._WPPolylineArray = [];


  this.polyLineProp = {
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
    clickable: true,

    //These two are special for Polylines.
    smoothFactor: 1.0,
    noClip: false
  }

  /**
   * [options description] The purpose of this object is to set specific options
   * specific to the WPQueue Class.
   * @type {Object}
   */
  this.options = {

  };

  /**
   * [function: this.initializer ] This function intializes the necessary variables
   * required for this class.
   * @return {[type]} [description]
   */
  this.initializer = function() {

  };

  /**
   * [function description]
   * @return {[type]} [description]
   */
  this.constructor = function(wpQueue) {
    this._WPQueue = wpQueue;
  };

  /**
   * [function description]
   * @param  {[Leaflet marker]} marker [description]
   * @return {[type]}        [description]
   */
  this.appendMarker = function() {
    var tempSize = this._WPQueue.length;
    if (tempSize >= 2) {
      var WPPolyline = new L.polyline(this.polyLineProp).addTo(map);
      WPPolyline.on('click',onClickWPPath);
      WPPolyline.addLatLng(this._WPQueue[tempSize - 2].getOriginLoc()); //The second in at the end of the array
      WPPolyline.addLatLng(this._WPQueue[tempSize - 1].getOriginLoc()); //The first in at the end of the array
      WPPolyline.redraw();
      this._WPPolylineArray.push(WPPolyline);
    }
  };


  /**
   * [function description]
   * @param  {[type]} tmpIndex [description]
   * @return {[type]}          [description]
   */
  this.movedMarker = function(tmpIndex) {
    var WPPolyline;

    if ((tmpIndex == 0) && (this._WPPolylineArray.length > 0)) {
      map.removeLayer(this._WPPolylineArray[0]);
      WPPolyline = new L.polyline(this.polyLineProp).addTo(map);
      WPPolyline.on('click',onClickWPPath);
      WPPolyline.addLatLng(this._WPQueue[tmpIndex].getOriginLoc()); //The second in at the end of the array
      WPPolyline.addLatLng(this._WPQueue[tmpIndex + 1].getOriginLoc()); //The first in at the end of the array
      WPPolyline.redraw();
      this._WPPolylineArray[0] = WPPolyline;
    } else if ((tmpIndex == this._WPPolylineArray.length) && (this._WPPolylineArray.length>0)){
      map.removeLayer(this._WPPolylineArray[tmpIndex - 1]);
      WPPolyline = new L.polyline(this.polyLineProp).addTo(map);
      WPPolyline.on('click',onClickWPPath);
      WPPolyline.addLatLng(this._WPQueue[tmpIndex - 1].getOriginLoc()); //The first in at the end of the array
      WPPolyline.addLatLng(this._WPQueue[tmpIndex].getOriginLoc()); //The second in at the end of the array
      WPPolyline.redraw();
      this._WPPolylineArray[tmpIndex - 1] = WPPolyline;
    } else if ((tmpIndex != 0) && (tmpIndex - 1 != this._WPQueue.length) && (this._WPPolylineArray.length > 0)) {
      //Update the same level one
      map.removeLayer(this._WPPolylineArray[tmpIndex]);
      WPPolyline = new L.polyline(this.polyLineProp).addTo(map);
      WPPolyline.on('click',onClickWPPath);
      WPPolyline.addLatLng(this._WPQueue[tmpIndex].getOriginLoc()); //The second in at the end of the array
      WPPolyline.addLatLng(this._WPQueue[tmpIndex + 1].getOriginLoc()); //The first in at the end of the array
      WPPolyline.redraw();
      this._WPPolylineArray[tmpIndex] = WPPolyline;

      //Update the same level one
      map.removeLayer(this._WPPolylineArray[tmpIndex - 1]);
      WPPolyline = new L.polyline(this.polyLineProp).addTo(map);
      WPPolyline.on('click',onClickWPPath);
      WPPolyline.addLatLng(this._WPQueue[tmpIndex - 1].getOriginLoc()); //The first in at the end of the array
      WPPolyline.addLatLng(this._WPQueue[tmpIndex].getOriginLoc()); //The second in at the end of the array
      WPPolyline.redraw();
      this._WPPolylineArray[tmpIndex - 1] = WPPolyline;
    }

  };

  this.redrawPath = function(){
    for	(index = 0; index < this._WPPolylineArray.length; index++) {
      map.removeLayer(this._WPPolylineArray[index]);
    }
    this._WPPolylineArray = [];
    for	(index = 0; index < this._WPQueue.length-1; index++) {
      var WPPolyline = new L.polyline(this.polyLineProp).addTo(map);
      WPPolyline.on('click',onClickWPPath);
      WPPolyline.addLatLng(this._WPQueue[index].getOriginLoc()); //The first in
      WPPolyline.addLatLng(this._WPQueue[index+1].getOriginLoc()); //The second in
      WPPolyline.redraw();
      this._WPPolylineArray.push(WPPolyline);
    }
  };


  onClickWPPath = function(event){
    var selectedPolyline = event.target;
    var rtnLoc = event.latlng;
    for (index = 0; index < this._WPPolylineArray.length; index++) {
      if (selectedPolyline == this._WPPolylineArray[index]) {
        var rtnIndex = index + 1;
        var returnObj = {
          clickLocation: rtnLoc,
          insertIndex: rtnIndex
        };
        onPolyLineClick(returnObj);
        break;
      }
    }
  }.bind(this);

  /**
   * [function description]
   * @param  {[Leaflet marker]} marker      [description]
   * @param  {[Int]} spliceIndex [description]
   * @return {[type]}             [description]
   */
  this.spliceMarker = function(marker, spliceIndex) {
    this.markerArray.splice(locationStartIndex, 0, marker);
  };

  /**
   * [function description]
   * @param  {[Leaflet marker]} marker [description]
   * @return {[type]}        [description]
   */
  this.removeMarker = function(marker) {
    var tmpIndex = this.markerArray.indexOf(marker);
    if (tmpIndex > -1) {
      this.markerArray.splice(tmpIndex, 1);
    }
  };


  this.onPolyLineClick = function(value) {
    if (value === undefined) return (onPolyLineClick);
    onPolyLineClick = value;
  }

});
