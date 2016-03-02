/*
* Created: Kenneth Kroeger
* Updated Date: 3/2/2016
*
* Description: The purpose of this class is to handle the establishment of the
* user location layer. This will store and update the user location data on the
* leaflet layer.
*/

var userLocationIcon;
var userMarker;
var userCircle;
var userCirclePath;
var userInformation;

//TODO: Handle turning off both the user marker and circle.
//TODO: Handle when to display or how to show signal confidence.

/*
* This function handles the setup of the circle properties that represent
* the accuracy of the operators position. This function should always be called
* prior to trying to use userCircle.
*/
function setupCircleProperties(){
  //calls can be made to update the properties of these objects via
  //userCircle.setStyle(userCirclePath) and then calling a redraw
  userCirclePath = new L.Path();
  userCirclePath.stroke = true;
  userCirclePath.color = '#e30e0e';
  userCirclePath.weight = 5;
  userCirclePath.opacity  = 0.75;
  userCirclePath.fill = true;
  userCirclePath.fillColor = '#e30e0e';
  userCirclePath.fillOpacity = 0.2;
  userCirclePath.fillRule = 'evenodd';
  userCirclePath.dashArray = null;
  userCirclePath.lineCap = null;
  userCirclePath.lineJoin = null;
  userCirclePath.clickable = false;
}

/*
* This function handles the setup of the user properties that represent
* the the operators position. This function should always be called
* prior to trying to use userMarker.
*/
function initializeUserLocation(){
    userLocationIcon = L.icon({
                           iconUrl: 'images/bluedot.png',
                           iconSize:     [34, 34], // size of the icon
                           iconAnchor:   [19, 19], // point of the icon which will correspond to marker's location
                           popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
                       });

    userInformation = new Object();
    userInformation.HDOP = 0.0;
    userInformation.VDOP = 0.0;
    userInformation.SAT = 0;
    userInformation.FIX = 0;

    setupUser();
    setupUserAccuracy();
}


/*
* This function handles the setup of the user marker
*/
function setupUser(){
  userMarker = L.marker([0.0,0.0]).on('click', markerClickEvent);
  userMarker.setOpacity(0.0);
  userMarker.setIcon(userLocationIcon);
  userMarker.addTo(map);
}

/*
* This function handles the setup of the user accuracy circle
*/
function setupUserAccuracy(){
  setupCircleProperties();
  userCircle = new L.circle([0.0,0.0],100,userCirclePath);
  userCircle.addTo(map);
}

/*
* This function provides a simple one line call to update the common
* user positioning information.
*/
function updateUserInformation(Location, Accuracy){
  updateUserAccuracy(Accuracy);
  updateUserLocation(Location);
}

/*
* This function updates the peripheral information properties of the positioning
* system. This information may be displayed in a hover or click event.
*/
function updatePeripheralInformation(HDOP, VDOP, SAT, FIX){
  userInformation.HDOP = HDOP;
  userInformation.VDOP = VDOP;
  userInformation.SAT = SAT;
  userInformation.FIX = FIX;

  switch (userInformation.FIX) {
    case 0:
      userCirclePath.color = '#e30e0e';
      userCirclePath.fillColor = '#e30e0e';
      userCircle.setStyle(userCirclePath);
      break;
    case 1:
      userCirclePath.color = '#e30e0e';
      userCirclePath.fillColor = '#e30e0e';
      userCircle.setStyle(userCirclePath);
      break;
    case 2:
      userCirclePath.color = '#ece209';
      userCirclePath.fillColor = '#ece209';
      userCircle.setStyle(userCirclePath);
      break;
    case 3:
      userCirclePath.color = '#24d214';
      userCirclePath.fillColor = '#24d214';
      userCircle.setStyle(userCirclePath);
      break;
    default:
  }

  userCircle.redraw();
}

/*
* This function updates the accuracy of the operator and reflects the accuracy
* by updating the radius of the circle.
*/
function updateUserAccuracy(accuracyMeters){
    userCircle.setRadius(accuracyMeters);
}

/*
* This function updates the position of the operator and accordingly updates
* both the userMarker and userCircle.
*/
function updateUserLocation(markerLoc){
    userMarker.setLatLng(markerLoc);
    userMarker.setOpacity(1.0);
    userMarker.update();

    userCircle.setLatLng(markerLoc);
    userCircle.redraw();
}
