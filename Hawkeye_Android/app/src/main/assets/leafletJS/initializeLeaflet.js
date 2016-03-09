/*
* Created: Kenneth Kroeger
* Updated Date: 3/4/2016
*
* Description: The purpose of this class is to initialize all of the leaflet
* properties, maps, and associated classes.
*/

var map;
function initializeLeaflet(){
  var bounds = new L.LatLngBounds(
    new L.LatLng(37.888704, -76.816090),
    new L.LatLng(37.891677, -76.811757));

    map = L.map('map', {
      contextmenu: true,
      contextmenuWidth: 140,
      zoomControl: false
    }).fitBounds(bounds);

    setMapBaseLayer('GS');

    //initializeUserLocation();
    initializeMarker();
    initializeWPPathHandler();
    initializeLayerMaps();

    map.on('click', parseClickEvent(addMarkerAtLocation_OnClick));
    //initializeWPMarker_Circle();
    var tmpLocation = new L.LatLng(37.890499,-76.814185);
    //var testWPG = new WPGeneral(map,tmpLocation,true);
    var userTemp = new WPLand(map,tmpLocation,true);
    //userTemp.updateUserLocationInfo(0,0,0,2);

    //computeFinalLocation(tmpLocation,50);
    //map.off('click', parseClickEvent(addMarkerAtLocation_OnClick));

    //initializeDrawBoundaries();
}

function centerOnLocation() {
    alert('TODO: Center on Location...');
}
function showAndroidToast(toastmsg) {
    Android.showToast(toastmsg);
}

function moveToScreenTwo() {
    Android.moveToNextScreen();
}
