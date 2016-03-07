/*
* Created: Kenneth Kroeger
* Updated Date: 3/4/2016
*
* Description: The purpose of this class is to handle the establishment of the
* waypoint marker layer. These markers will represent ONLY waypoints within
* this class. Another class shall handle the organization and distribution
* and switch case to determine the type of marker.
*/

var markers = new Map();
var markerArray = [];
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


function addMarkerAtLocation_OnClick(markerLoc){
  addMarkerAtLocation(markerLoc,true,0,0);
}

function addMarkerAtLocation(markerLoc , appendMarker, locationStartIndex, removeLength){
  var marker = new L.marker(markerLoc,
    {
      markerLocationIcon,
      draggable: true,
      clickable: true,
      title: 'HOME'
    });

  marker.on('click',markerClickEvent);
  marker.on('drag', markerDrag);

  marker.setIcon(markerLocationIcon);
  marker.addTo(map);

  if(appendMarker == false){
    markerArray.splice(locationStartIndex,removeLength,marker);
  }else{
    markerArray.push(marker);
    addWPValue();
  }

  return marker;
}

function markerDrag(event){
  var marker = event.target;
  var position = marker.getLatLng();
  marker.setLatLng(new L.LatLng(position.lat, position.lng),{markerLocationIcon,draggable:'true',clickable:'true'});
  WPMarkerDrag(marker);
}

function addWaypointAtLocation(markerLoc){
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

    marker.setIcon(markerLocationIcon);
    marker.addTo(map);

    return marker;
}
