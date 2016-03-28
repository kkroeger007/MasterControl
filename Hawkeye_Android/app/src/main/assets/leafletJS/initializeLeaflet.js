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
    var originLocation = new L.LatLng(37.88974435295123,-76.8137776851654);
    //mWPHandler = new WPStructureScanner(map,originLocation,false);
    mWPHandler = new WPCircle(map,originLocation,true,20,'CW');

    map.on('click', mWPHandler.mapClickEvent);

    var tmpVar = math.eval('5.08 cm to inch');
    console.log("The value is: "+tmpVar);
    // var arrayTemp = [new L.LatLng(37.89050215748388,-76.81409955024719),
    // new L.LatLng(37.88997719874947,-76.81269407272339),
    // new L.LatLng(37.88880026153274,-76.81357383728027),
    // new L.LatLng(37.88944376910463,-76.81492567062378)];
    //
    // var originLocation = new L.LatLng(37.88974435295123,-76.8137776851654);
    //
    // var mImageFootprint = new ImageFootprint(map);
    // mImageFootprint.updateVehicleLocation(originLocation);


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
