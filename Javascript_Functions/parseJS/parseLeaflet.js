/*
 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
*/

function parse_ClickEvent_LatLon(e){
    var latitude = e.latlng.lat;
    var longitude = e.latlng.lng;
    //console.log(e.latlng);
    android_click_updateLatLon(latitude,longitude);
}
