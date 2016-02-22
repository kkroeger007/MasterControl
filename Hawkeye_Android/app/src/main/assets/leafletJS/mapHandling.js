function parseClickEvent(returnFn){
                return function(e){
                    marker = returnFn(e.latlng);
                    marker.addTo(map);
                    }
}

function addMarker(e){
  parse_ClickEvent_LatLon(e);
}
