/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is to be the basic WPBase class that
 * is inherited/extended by all other waypoint type classes. This will OOP
 * the JS code and promote reusability.
 */

var WPHandler = Class.extend(function() {

  var mLeafletMap; //This holds the leaflet map object.

  var mWPQueue;

  this.WPAvailabe= {
    WPHome: 'Home',
    WPLaunch: 'Launch',
    WPLand: 'Land',
    WPGeneral: 'Waypoint',
    WPLoiterTime: 'Loiter_Time',
    WPLoiterTurns: 'Loiter_Turns',
    WPLoiter: 'Loiter',
    WPRally: 'Rally',
    WPROI: 'ROI',
    WPStructureScanner: 'Structure Scanner',
    WPSurvey: 'Survey'
  };

  this.initializer = function() {

  };

  this.constructor = function(leafletMap) {
    mLeafletMap = leafletMap;
    this.mCurrentWPOperation = this.WPAvailabe.WPGeneral;

    mWPQueue = new WPQueue(mLeafletMap);
  };

  this.mapClickEvent = function(e){
    var tempPosition = e.latlng;

    switch(this.mCurrentWPOperation){
      case this.WPAvailabe.WPHome:
      var tempObj = new WPHome(map,tempPosition,true);
      mWPQueue.appendMarker(tempObj);
      break;
      case this.WPAvailabe.WPLaunch:
      var tempObj = new WPLaunch(map,tempPosition,true);
      mWPQueue.appendMarker(tempObj);
      break;
      case this.WPAvailabe.WPLand:
      var tempObj = new WPLand(map,tempPosition,true);
      mWPQueue.appendMarker(tempObj);
      break;
      case this.WPAvailabe.WPGeneral:
      var tempObj = new WPGeneral(map,tempPosition,true);
      mWPQueue.appendMarker(tempObj);
      break;
      case this.WPAvailabe.WPLoiterTime:
      break;
      case this.WPAvailabe.WPLoiterTurns:
      var tempObj = new WPLoiterTime(map,tempPosition,true,30,'CW');
      mWPQueue.appendMarker(tempObj);
      break;
      case this.WPAvailabe.WPLoiter:
      break;
      case this.WPAvailabe.WPRally:
      break;
      default:

    }
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
