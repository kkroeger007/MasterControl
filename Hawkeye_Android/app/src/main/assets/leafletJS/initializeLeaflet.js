var map;
function initializeLeaflet(){
  var bounds = new L.LatLngBounds(
    new L.LatLng(37.888704, -76.816090),
    new L.LatLng(37.891677, -76.811757));

    map = L.map('map', {
      zoomControl: false
    }).fitBounds(bounds);
    setMapBaseLayer('GS');

    markerIndex = 0;

    //map.on('click', parseClickEvent(addMarkerAtLocation));

    initializeUserLocation();
    initializeMarker();

    var drawnItems = L.featureGroup().addTo(map);

		map.addControl(new L.Control.Draw({
			edit: { featureGroup: drawnItems }
		}));

		map.on('draw:created', function(event) {
			var layer = event.layer;

			drawnItems.addLayer(layer);
		});
}
