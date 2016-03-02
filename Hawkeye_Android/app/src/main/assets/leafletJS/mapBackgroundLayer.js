/*
* Created: Kenneth Kroeger
* Updated Date: 3/2/2016
* Description: The purpose of this class is to handle the establishment of the
* map background layer. This will store appropriate links to google and/or
* leaflet plugin tileproviders.
*/

var mapPlugin_GoogleStreets = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
var mapPlugin_GoogleHybrid = 'http://{s}.google.com/vt/lyrs=h&x={x}&y={y}&z={z}';
var mapPlugin_GoogleSatellite = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
var mapPlugin_GoogleTerrain = 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';


var mapPlugin_ESRIWorldImagery = 'Esri.WorldImagery';
var mapPlugin_ESRIWorldTerrain = 'Esri.WorldTerrain';
var mapPlugin_OSMDE = 'OpenStreetMap.DE';

//This variable holds the maxzoom level as established by the tile provider
var mapPlugin_MaxZoom = 18;

var mapBackgroundLayer;

/*
* This function handles
*/
function setMapBaseLayer(BaseLayerCode){
  var returnValue;

  //This should check to determine if the mapBackgroundLayer object has
  //something to remove
  if(mapBackgroundLayer != null){
    map.removeLayer(mapBackgroundLayer);
  }

//Switch statement to handle the tile provider
  switch (BaseLayerCode) {
    case 'GST':
      mapBackgroundLayer = L.tileLayer(mapPlugin_GoogleStreets,{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }).addTo(map);
      returnValue = mapPlugin_GoogleStreets;
      break;
    case 'GH':
      mapBackgroundLayer = L.tileLayer(mapPlugin_GoogleHybrid,{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }).addTo(map);
      returnValue = mapPlugin_GoogleStreets;
      break;
    case 'GS':
      mapBackgroundLayer = L.tileLayer(mapPlugin_GoogleSatellite,{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      });
      map.addLayer(mapBackgroundLayer);
      returnValue = mapPlugin_GoogleSatellite;
      break;
    case 'GT':
      mapBackgroundLayer = L.tileLayer(mapPlugin_GoogleTerrain,{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }).addTo(map);
      returnValue = mapPlugin_GoogleTerrain;
      break;
    default:
      mapBackgroundLayer = L.tileLayer(mapPlugin_GoogleSatellite,{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }).addTo(map);
      returnValue = mapPlugin_GoogleSatellite;
  }

  return(returnValue);
}

/*
*
*/
function getMapBaseLayerZoom(BaseLayerCode){
  switch (BaseLayerCode) {
    case GST:
      mapPlugin_MaxZoom = 20;
      break;
    case GH:
      mapPlugin_MaxZoom = 20;
      break;
    case GS:
      mapPlugin_MaxZoom = 20;
      break;
    case GT:
      mapPlugin_MaxZoom = 20;
      break;
    default:
      mapPlugin_MaxZoom = 20;
  }

  return(mapPlugin_MaxZoom);
}
