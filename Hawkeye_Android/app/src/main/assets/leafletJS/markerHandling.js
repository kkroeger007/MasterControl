/*
* Created: Kenneth Kroeger
* Updated Date: 3/2/2016
*
* Description: The purpose of this class is to handle the establishment of the
* waypoint marker layer. These markers will represent ONLY waypoints within
* this class. Another class shall handle the organization and distribution
* and switch case to determine the type of marker.
*/

var markerIndex = 0;
var markers = new Map();
var markerLocationIcon;

function markerClickEvent(e){

}

function initializeMarker(){
  markerLocationIcon = L.icon({
                        iconUrl: 'images/marker-icon.png',
                             iconSize:     [25, 41], // size of the icon
                             iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
                             popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
                         });
}


//TODO: Overload this function with a string defining the mission type. This will become apart
//TODO: of the mission object as a custom tag identifying the correct picutre to display.

function addMarkerAtLocation(markerLoc){
markerIndex = markerIndex + 1;

    var marker = new L.marker(markerLoc, {markerLocationIcon,draggable:'true',clickable:'true'});

    marker.on('click',markerClickEvent);
    marker.on('dragend', function(event){
            var marker = event.target;
            var position = marker.getLatLng();
            marker.setLatLng(new L.LatLng(position.lat, position.lng),{markerLocationIcon,draggable:'true',clickable:'true'});
    });
    marker.UniqueID = markerIndex;

    marker.setIcon(markerLocationIcon);
    marker.addTo(map);

    console.log("You clicked the marker " + marker.UniqueID);

    return marker;
}

function addWaypointAtLocation(markerLoc){
markerIndex = markerIndex + 1;

    markerLocationIcon = L.icon({
                          iconUrl: 'images/marker-icon.png',
                               iconSize:     [25, 41], // size of the icon
                               iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
                               popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
                           });
    var marker = new L.marker(markerLoc, {markerLocationIcon,draggable:'true',clickable:'true'});
    marker.on('click',markerClickEvent);
    marker.on('dragend', function(event){
            var marker = event.target;
            var position = marker.getLatLng();
            marker.setLatLng(new L.LatLng(position.lat, position.lng),{markerLocationIcon,draggable:'true',clickable:'true'});
    });
    marker.UniqueID = markerIndex;

    marker.setIcon(markerLocationIcon);
    marker.addTo(map);

    console.log("You clicked the marker " + marker.UniqueID);

    return marker;
}
