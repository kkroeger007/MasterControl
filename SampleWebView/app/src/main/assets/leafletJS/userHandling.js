function createUserMarker(){
    var userMarker = L.marker(0,0).on('click', markerClickEvent);
    userMarker.addTo(map);

}
function updateUserLocation(markerLoc){
    userMarker.setLatLng(markerLoc);
    userMarker.update();
    return userMarker;
}