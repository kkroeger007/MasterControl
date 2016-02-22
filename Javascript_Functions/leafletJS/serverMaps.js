var JULYLayer;
var JULYDate;
var SEPLayer;
var SEPDate;
var AUGLayer;
var AUGDate;

function initializeLayers(){
    JULYDate = new Date(2015, 6, 29);
    AUGDate = new Date(2015, 7, 26);
    SEPDate = new Date(2015, 8, 9);

    var H7_JUL29 = L.tileLayer('originalTiles/JUL29/H7/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });
    var O3_JUL29 = L.tileLayer('originalTiles/JUL29/O3/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });
    var B721_JUL29 = L.tileLayer('originalTiles/JUL29/B721/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });
    var B722_JUL29 = L.tileLayer('originalTiles/JUL29/B722/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });

    JULYLayer = L.layerGroup()
            .addLayer(H7_JUL29)
            .addLayer(O3_JUL29)
            .addLayer(B721_JUL29)
            .addLayer(B722_JUL29);


    var B3_AUG26 = L.tileLayer('originalTiles/AUG26/B3/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });
    var B5_AUG26 = L.tileLayer('originalTiles/AUG26/B5/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });
    var BJ614_AUG26 = L.tileLayer('originalTiles/AUG26/BJ6_14/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });
    var P1012_AUG26 = L.tileLayer('originalTiles/AUG26/P10_12/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });

    var B72_South_AUG26 = L.tileLayer('originalTiles/AUG26/B72South/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 16,
        tms: true,
        opacity: 1,
        });


    AUGLayer = L.layerGroup()
            .addLayer(B3_AUG26)
            .addLayer(B5_AUG26)
            .addLayer(BJ614_AUG26)
            .addLayer(P1012_AUG26)
            .addLayer(B72_South_AUG26);


    var B72_SEP9 = L.tileLayer('originalTiles/SEP9/{z}/{x}/{y}.png', {
       maxZoom: 20,
       minZoom: 16,
       tms: true,
       opacity: 1,
       });

   SEPLayer = L.layerGroup()
           .addLayer(B72_SEP9);


}

function layerModification(dateRange){
var dateMin = dateRange.values.min.getTime();
var dateMax = dateRange.values.max.getTime();

    if(dateMin<=JULYDate && JULYDate<=dateMax){
        map.addLayer(JULYLayer);
    } else{
        map.removeLayer(JULYLayer);
    }

    if(dateMin<=AUGDate && AUGDate<=dateMax){
        map.addLayer(AUGLayer);
    } else{
       map.removeLayer(AUGLayer);
    }

    if(dateMin<=SEPDate && SEPDate<=dateMax){
        map.addLayer(SEPLayer);
    } else{
        map.removeLayer(SEPLayer);
    }
}