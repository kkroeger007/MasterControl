/*
* Created: Kenneth Kroeger
* Updated Date: 3/3/2016
*
* Description: The purpose of this class is to handle the establishment of the
* Launch waypoint marker layer. There shall only ever exist one Launch waypoint
* marker.
*/

//This variable holds the location of the Launch marker
var mLaunchLocation;

//This variable holds the icon properties
var mLaunchIcon;

//This variable holds the actual Launch leaflet marker
var mLaunchMarker;

/*
*
*/
function initializeLaunchMarker(){
  mLaunchIcon = L.icon({
    iconUrl: 'images/ic_wp_Launch.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
  });

  mLaunchMarker = new L.marker([0.0,0.0],{
    mLaunchIcon,
    draggable:'true',
    clickable:'true',
    title: 'Launch'
  });

  mLaunchMarker.on('click',onClickMarkerLaunch);
  mLaunchMarker.on('dragend',onDragMarkerLaunch);
  mLaunchMarker.on('mouseover',onMouseOverMarkerLaunch);
  mLaunchMarker.on('dblclick',onDblClickMarkerLaunch)
  mLaunchMarker.on('contextmenu',onContextMenuMarkerLaunch);
  mLaunchMarker.addTo(map);
}

function setLaunchLocation(LaunchLoc){
  mLaunchLocation = LaunchLoc;
  mLaunchMarker.setLatLng(LaunchLoc);
  mLaunchMarker.update();
}

function onClickMarkerLaunch(){

}
function onDragMarkerLaunch(event){
  var marker = event.target;
  var position = marker.getLatLng();
}
function onMouseOverMarkerLaunch(){

}
function onDblClickMarkerLaunch(){

}

function removeLaunchLocation(){

}

function onContextMenuMarkerLaunch(){

}
