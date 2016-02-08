function markerClickEvent(e){
    console.log(e);
}

function addMarkerAtLocation(markerLoc){
    var marker = L.marker(markerLoc).on('click', markerClickEvent);
    marker.addTo(map);
    return marker;
}