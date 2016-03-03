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

    markerIndex = 0;


    initializeUserLocation();
    initializeMarker();
    initializeWPPathHandler();

    map.on('click', parseClickEvent(addMarkerAtLocation));


    // var drawnItems = L.featureGroup().addTo(map);
    //
		// map.addControl(new L.Control.Draw({
		// 	edit: { featureGroup: drawnItems }
		// }));
    //
		// map.on('draw:created', function(event) {
		// 	var layer = event.layer;
    //
		// 	drawnItems.addLayer(layer);
		// });
}
