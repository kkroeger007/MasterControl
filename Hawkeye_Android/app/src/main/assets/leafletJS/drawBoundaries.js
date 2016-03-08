/*
* Created: Kenneth Kroeger
* Updated Date: 3/7/2016
*
* Description: The purpose of this class is to handle the drawing and handling
* of adding a circle type waypoint. The purpose of a circle marker is to indicate
* the radius and direction of the aircraft flight path.
*
* This shall be accomplished via the polyline/multipolyline class from within
* Leaflet.
*/

function initializeDrawBoundaries(){
  var drawnItems = L.featureGroup().addTo(map);

  map.addControl(new L.Control.Draw({
    draw: {
      marker: false,
      polygon: {
        options:{
          showArea: true
        }
      },
      polyline: false
    },
  	edit: {
      featureGroup: drawnItems,
     }
  }));

map.on('draw:created', function(event) {
  var layer = event.layer;
  var type = event.layerType;
  //console.log(layer.getLatLngs());

  drawnItems.addLayer(layer);
  if (type === 'polygon')
  {
    //console.log(layer);
    var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()); //this value will be in sq meters
    //console.log(area);
  }
});

}


function drawBoundaries_onDrawCreated(event){

}

function drawBoundaries_onDrawEdited(event){

}

function drawBoundaries_onDrawSaved(event){

}
