/*
* Created: Kenneth Kroeger
* Updated Date: 3/4/2016
*
* Description: The purpose of this class is to handle the establishment and
* relevant operations of the mapping overlays. This class is specific to the
* tile layers that an operator may have loaded.
*/

//The purpose of layersMap is to store a dynamic object of the available layers
//based on the images that the operator has loaded.
var layersMap = new Object(); // or var map = {};

//The purpose of the layersKey is to be an array containing the relevant
//for the layers window panel.
var layersKey = [];


/*
* The purpose of this function is to initializeLayerMaps. This will establish
* the available layers for rendering and get all of the tiles located and ready
* to operate.
*/
function initializeLayerMaps(){

  //TODO: Update this class to be a dynamic load based on the files listed in
  //the folder rather than a hardcoding
  /*
  * Addition of the July 29 Dates
  */
  var mapLayerObject = L.tileLayer('originalTiles/JUL29/H7/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  var objectInitialize = {filePath: 'originalTiles/JUL29/H7', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['H7/July 29 2015/1200'] = objectInitialize;
  layersKey.push('H7/July 29 2015/1200');

  mapLayerObject = L.tileLayer('originalTiles/JUL29/O3/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/JUL29/O3', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['O3/July 29 2015/1200'] = objectInitialize;
  layersKey.push('O3/July 29 2015/1200');

  mapLayerObject = L.tileLayer('originalTiles/JUL29/B721/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/JUL29/B721', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['B72 Part1/July 29 2015/1200'] = objectInitialize;
  layersKey.push('B72 Part1/July 29 2015/1200');

  mapLayerObject = L.tileLayer('originalTiles/JUL29/B722/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/JUL29/B722', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['B72 Part2/July 29 2015/1200'] = objectInitialize;
  layersKey.push('B72 Part2/July 29 2015/1200');


  /*
  * Addition of the Aug 26 Dates
  */
  mapLayerObject = L.tileLayer('originalTiles/AUG26/B3/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/AUG26/B3', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['B3/Aug 26 2015/1200'] = objectInitialize;
  layersKey.push('B3/Aug 26 2015/1200');

  mapLayerObject = L.tileLayer('originalTiles/AUG26/B5/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/AUG26/B5', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['B3/Aug 26 2015/1205'] = objectInitialize;
  layersKey.push('B3/Aug 26 2015/1205');

  mapLayerObject = L.tileLayer('originalTiles/AUG26/BJ6_14/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/AUG26/BJ6_14', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['BJ6/Aug 26 2015/1200'] = objectInitialize;
  layersKey.push('BJ6/Aug 26 2015/1200');

  mapLayerObject = L.tileLayer('originalTiles/AUG26/P10_12/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/AUG26/P10_12', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['B3/Aug 26 2015/1210'] = objectInitialize;
  layersKey.push('B3/Aug 26 2015/1210');

  mapLayerObject = L.tileLayer('originalTiles/AUG26/B72South/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/AUG26/B72South', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['B72 South/Aug 26 2015/1200'] = objectInitialize;
  layersKey.push('B72 South/Aug 26 2015/1200');

  /*
  * Addition of the Sep 9 Dates
  */
  mapLayerObject = L.tileLayer('originalTiles/SEP9/{z}/{x}/{y}.png', {maxZoom: 20,minZoom: 16,tms: true,opacity: 1});
  objectInitialize = {filePath: 'originalTiles/SEP9', currentOpacity: 0, currentlyDrawn: false, layerObject: mapLayerObject};
  layersMap['B72/Sep 9 2015/1200'] = objectInitialize;
  layersKey.push('B72/Sep 9 2015/1200');

}


/*
* The purpose of this function is to get the array object that contains the
* mapping layers available for the operator to use.
*/
function getAvailableLayers(){
  return(layersKey);
}

/*
* The function updates whether the layer object should be on/off
*/
function updateLayersOnOff(layersArray, booleanOnOff) {

    for (sliderIndex = 0; sliderIndex < layersArray.length; sliderIndex++) {

        var layerName = layersArray[sliderIndex][0];
        var layerOpacity = layersArray[sliderIndex][1]/100;

        if (booleanOnOff === true) {
            //add the appropriate layer to the map
            map.addLayer(layersMap[layerName].layerObject);
            layersMap[layerName].layerObject.setOpacity(layerOpacity);
        } else {
            //remove the appropriate layer to the map
            map.removeLayer(layersMap[layerName].layerObject);
        }
    }
}

/*
* The function updates the layer opactity of an object.
*/
function updateLayerOpacity(keyObject, newOpacity){
  layersMap[keyObject].layerObject.setOpacity(newOpacity);
  layersMap[keyObject].layerObject.redraw();
}
