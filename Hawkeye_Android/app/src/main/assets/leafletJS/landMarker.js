/*
* Created: Kenneth Kroeger
* Updated Date: 3/3/2016
*
* Description: The purpose of this class is to handle the establishment of the
* land waypoint marker layer. There shall only ever exist one Land marker.
*/

//This variable holds the location of the Land marker
var mLandLocation;

//This variable holds the icon properties
var mLandIcon;

//This variable holds the actual Land leaflet marker
var mLandMarker;

/*
*
*/
function initializeLandMarker(){
  mLandIcon = L.icon({
    iconUrl: 'images/ic_wp_Land.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
  });

  mLandMarker = new L.marker([0.0,0.0],{
    mLandIcon,
    draggable:'true',
    clickable:'true',
    title: 'Land'
  });

  mLandMarker.on('click',onClickMarkerLand);
  mLandMarker.on('dragend',onDragMarkerLand);
  mLandMarker.on('mouseover',onMouseOverMarkerLand);
  mLandMarker.on('dblclick',onDblClickMarkerLand)
  mLandMarker.on('contextmenu',onContextMenuMarkerLand);
  mLandMarker.addTo(map);
}

function setLandLocation(LandLoc){
  mLandLocation = LandLoc;
  mLandMarker.setLatLng(LandLoc);
  mLandMarker.update();
}

function onClickMarkerLand(){

}
function onDragMarkerLand(event){
  var marker = event.target;
  var position = marker.getLatLng();
}
function onMouseOverMarkerLand(){

}
function onDblClickMarkerLand(){

}

function removeLandLocation(){

}

function onContextMenuMarkerLand(){

}
