/*
* Created: Kenneth Kroeger
* Updated Date: 3/3/2016
*
* Description: The purpose of this class is to handle the establishment of the
* home waypoint marker layer. There shall only ever exist one home waypoint
* marker.
*/

//This variable holds the location of the home marker
var mHomeLocation;

//This variable holds the icon properties
var mHomeIcon;

//This variable holds the actual home leaflet marker
var mHomeMarker;

/*
*
*/
function initializeHomeMarker(){
  mHomeIcon = L.icon({
    iconUrl: 'images/ic_wp_home.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
  });

  mHomeMarker = new L.marker([0.0,0.0],{
    mHomeIcon,
    draggable:'true',
    clickable:'true',
    title: 'HOME'
  });

  mHomeMarker.on('click',onClickMarkerHome);
  mHomeMarker.on('dragend',onDragMarkerHome);
  mHomeMarker.on('mouseover',onMouseOverMarkerHome);
  mHomeMarker.on('dblclick',onDblClickMarkerHome)
  mHomeMarker.on('contextmenu',onContextMenuMarkerHome);
  mHomeMarker.addTo(map);
}

function setHomeLocation(homeLoc){
  mHomeLocation = homeLoc;
  mHomeMarker.setLatLng(homeLoc);
  mHomeMarker.update();
}

function onClickMarkerHome(){

}
function onDragMarkerHome(event){
  var marker = event.target;
  var position = marker.getLatLng();
}
function onMouseOverMarkerHome(){

}
function onDblClickMarkerHome(){

}

function removeHomeLocation(){

}

function onContextMenuMarkerHome(){

}
