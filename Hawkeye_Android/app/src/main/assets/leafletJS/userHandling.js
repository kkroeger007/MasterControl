var userMarker;
var userLocation;
var userLocationIcon;

function initializeUserMarker(){
    userLocationIcon = L.icon({
                           iconUrl: 'images/userlocation_icon.png',
                           iconSize:     [38, 38], // size of the icon
                           iconAnchor:   [19, 19], // point of the icon which will correspond to marker's location
                           popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
                       });

    userMarker = L.marker([0.0, 0.0]).on('click', markerClickEvent);
    var userFirstCall = 1;
    userLocation = new L.LatLng(0.0, 0.0);
    userMarker.setOpacity(0.0);
    userMarker.setIcon(userLocationIcon);
    userMarker.addTo(map);
}

function updateUserLocation(markerLoc){
    userLocation = markerLoc;
    userMarker.setLatLng(userLocation);
    userMarker.setOpacity(1.0);
    userMarker.update();
    return userMarker;
}