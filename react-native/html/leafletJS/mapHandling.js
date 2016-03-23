function parseClickEvent(returnFn){
                return function(e){
                    marker = returnFn(e.latlng);
                    //marker.addTo(map);
                    }
}

function clickEventChecker(e){
  var tempPosition = e.latlng;
  //var tempObj = new WPCircle(map,tempPosition,true,30,'CW');
  var tempObj = new WPBase(map,tempPosition,true);
  wpQueue.appendMarker(tempObj);
}

function addMarker(e){
  parse_ClickEvent_LatLon(e);
}
