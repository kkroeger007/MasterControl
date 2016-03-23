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

    initializeLayerMaps();

    //TODO: Renable when the click makes sense.
    map.on('click', clickEventChecker);
    this.userLocationObject = new userLocationHandler(map,new L.LatLng(0.0, 0.0),true,true);
    this.wpQueue = new WPQueue(map);
}

function centerOnLocation() {
  var tmpLatLng = this.userLocationObject.getUserLocation();
  map.panTo(tmpLatLng);
}

function showAndroidToast(toastmsg) {
    Android.showToast(toastmsg);
}

function moveToScreenTwo() {
    Android.moveToNextScreen();
}

function updateUserLocation(lat,lng){
  //console.log('Latitude: ' + lat + 'Longitude:' + lng);
  this.userLocationObject.updateUserLocation(new L.LatLng(lat, lng));
}

function updateUserAccuracy(accuracy){
  //console.log('Latitude: ' + lat + 'Longitude:' + lng);
  this.userLocationObject.updateUserAccuracy(accuracy);
}
