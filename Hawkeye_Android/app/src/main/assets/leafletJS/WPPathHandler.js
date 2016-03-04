/*
* Created: Kenneth Kroeger
* Updated Date: 3/4/2016
*
* Description: The purpose of this class is to handle the drawing of a path
* line between waypoint locaitons. This line will represent the best estimated
* flight path the vehicle shall take.
*
* This shall be accomplished via the polyline/multipolyline class from within
* Leaflet.
*/

var WPPathObject;
var WPPolylineArray = [];

function initializeWPPathHandler(){
  //calls can be made to update the properties of these objects via
  //userCircle.setStyle(userCirclePath) and then calling a redraw
  WPPathObject = new L.Path();
  WPPathObject.stroke = true;
  WPPathObject.color = '#e30e0e';
  WPPathObject.weight = 5;
  WPPathObject.opacity  = 0.75;
  WPPathObject.fill = true;
  WPPathObject.fillColor = '#e30e0e';
  WPPathObject.fillOpacity = 0.2;
  WPPathObject.fillRule = 'evenodd';
  WPPathObject.dashArray = null;
  WPPathObject.lineCap = null;
  WPPathObject.lineJoin = null;
  WPPathObject.clickable = true;

  //These two are special for Polylines.
  WPPathObject.smoothFactor = 1.0;
  WPPathObject.noClip = false;
}


function drawLines(WPArray){

}

function onClickWPPath(event){
  var selectedPolyline = event.target;
  var clickLocation = event.latlng;
  for	(index = 0; index < WPPolylineArray.length; index++) {
    if(selectedPolyline == WPPolylineArray[index]){
      var indexLocation = index + 1;
      addMarkerAtLocation(clickLocation,false,indexLocation,0);
      redrawPath();
      break;
    }
  }
}

function redrawPath(){
  for	(index = 0; index < WPPolylineArray.length; index++) {
    map.removeLayer(WPPolylineArray[index]);
  }
  WPPolylineArray = [];
  for	(index = 0; index < markerArray.length-1; index++) {
    var WPPolyline = new L.polyline(WPPathObject).addTo(map);
    WPPolyline.on('click',onClickWPPath);
    WPPolyline.addLatLng(markerArray[index].getLatLng()); //The second in at the end of the array
    WPPolyline.addLatLng(markerArray[index+1].getLatLng()); //The first in at the end of the array
    WPPolyline.redraw();
    WPPolylineArray.push(WPPolyline);
  }
}

function addWPValue(){
  var tempMarkerSize = markerArray.length;
  if(tempMarkerSize>=2)
  {
    var WPPolyline = new L.polyline(WPPathObject).addTo(map);
    WPPolyline.on('click',onClickWPPath);
    WPPolyline.addLatLng(markerArray[tempMarkerSize - 2].getLatLng()); //The second in at the end of the array
    WPPolyline.addLatLng(markerArray[tempMarkerSize - 1].getLatLng()); //The first in at the end of the array
    WPPolyline.redraw();
    WPPolylineArray.push(WPPolyline);
  }
}

function WPMarkerDrag(movedMarker){
  var tmpIndex = markerArray.indexOf(movedMarker);
  var WPPolyline;

  if((tmpIndex == 0)&&(WPPolylineArray.length>0)){
    map.removeLayer(WPPolylineArray[0]);
    WPPolyline = new L.polyline(WPPathObject).addTo(map);
    WPPolyline.on('click',onClickWPPath);
    WPPolyline.addLatLng(movedMarker.getLatLng()); //The second in at the end of the array
    WPPolyline.addLatLng(markerArray[tmpIndex + 1].getLatLng()); //The first in at the end of the array
    WPPolyline.redraw();
    WPPolylineArray[0] = WPPolyline;
  }else if (tmpIndex == WPPolylineArray.length) {
    map.removeLayer(WPPolylineArray[tmpIndex-1]);
    WPPolyline = new L.polyline(WPPathObject).addTo(map);
    WPPolyline.on('click',onClickWPPath);
    WPPolyline.addLatLng(markerArray[tmpIndex-1].getLatLng()); //The first in at the end of the array
    WPPolyline.addLatLng(movedMarker.getLatLng()); //The second in at the end of the array
    WPPolyline.redraw();
    WPPolylineArray[tmpIndex-1] = WPPolyline;
  }else if((tmpIndex != 0)&&(tmpIndex-1 != markerArray.length)&&(WPPolylineArray.length>0)){
    //Update the same level one
    map.removeLayer(WPPolylineArray[tmpIndex]);
    WPPolyline = new L.polyline(WPPathObject).addTo(map);
    WPPolyline.on('click',onClickWPPath);
    WPPolyline.addLatLng(movedMarker.getLatLng()); //The second in at the end of the array
    WPPolyline.addLatLng(markerArray[tmpIndex + 1].getLatLng()); //The first in at the end of the array
    WPPolyline.redraw();
    WPPolylineArray[tmpIndex] = WPPolyline;

    //Update the same level one
    map.removeLayer(WPPolylineArray[tmpIndex-1]);
    WPPolyline = new L.polyline(WPPathObject).addTo(map);
    WPPolyline.on('click',onClickWPPath);
    WPPolyline.addLatLng(markerArray[tmpIndex - 1].getLatLng()); //The first in at the end of the array
    WPPolyline.addLatLng(movedMarker.getLatLng()); //The second in at the end of the array
    WPPolyline.redraw();
    WPPolylineArray[tmpIndex-1] = WPPolyline;
  }


  function WPMarkerInsert(){

  }

  // WPPolylineArray[Marker]
  // for	(index = 0; index < WPPolylineArray.length; index++) {
  //   WPPolylineArray[index].redraw();
  // }
}
