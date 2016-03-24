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

var WPMarkerArray_Circle = [];

var WPCircleOriginICON;
var WPCircleArrowICON;
var WPCirclePathOBJ;

function updateWPMarkerLocation_Circle(event)
{

}

function removeWPMarkerLocation_Circle()
{

}

function computeFinalLocation(originLatLon, locationDistance)
{
  var leftSide = computeLocationOfInterest(originLatLon, 270.0, locationDistance);
  var rightSide = computeLocationOfInterest(originLatLon, 90.0, locationDistance);

  var upArrowMarker = drawUpArrow(rightSide);
  var downArrowMarker = drawDownArrow(leftSide);
  var circleMarker = drawCircleWPMarker(originLatLon,locationDistance);
  var cirlceOriginMaker = drawCircleWPOrigin(originLatLon);
  var WPCircleObject = {originMarkerObj: cirlceOriginMaker, circleMarkerObj: circleMarker, arrowMarkerUp: upArrowMarker, arrowMarkerDown: downArrowMarker, circleRadius: locationDistance};

  WPMarkerArray_Circle.push(WPCircleObject);
}

function computeLocationOfInterest(originLatLon, locationBearingD, locationDistanceM)
{
  //var tmpLatLng = markerOrigin.getLatLng();
  var originLatR = convertDegrees_Radians(originLatLon.lat);
  var originLonR = convertDegrees_Radians(originLatLon.lng);
  var locationBearingR = convertDegrees_Radians(locationBearingD);
  var locationDistance = locationDistanceM;

  var R = 6378137; //default radius of earth in meters

  var finalLatR = Math.asin( Math.sin(originLatR)*Math.cos(locationDistance/R) +
  Math.cos(originLatR)*Math.sin(locationDistance/R)*Math.cos(locationBearingR) );
  var finalLonR = originLonR + Math.atan2(Math.sin(locationBearingR)*Math.sin(locationDistance/R)*Math.cos(originLatR),
  Math.cos(locationDistance/R)-Math.sin(originLatR)*Math.sin(finalLatR));

  var finalLatD = convertRadians_Degrees(finalLatR);
  var finalLonD = (convertRadians_Degrees(finalLonR) + 540.0)%360-180; //wraps the result to +/- 180

  var finalLocation = new L.LatLng(finalLatD,finalLonD);

  return (finalLocation);
}


function convertDegrees_Radians(angleDegrees)
{
  var angleRadians = (Math.PI / 180.0) * (angleDegrees);
  return (angleRadians);
}

function convertRadians_Degrees(angleRadians){
  var angleDegrees = (180.0/Math.PI) * (angleRadians);
  return (angleDegrees);
}


function drawCircleWPMarker(centerLocation , circleRadius){
  var circleMarker = new L.circle(centerLocation, circleRadius).addTo(map);
  return(circleMarker);
}

function drawCircleWPOrigin(centerLocation){
  var marker = new L.marker(centerLocation,
    {
      // WPCircleOriginICON,
      draggable: true,
      clickable: true,
      title: 'HOME'
    });

    marker.on('click',WPMarker_CircleOriginClick);
    marker.on('drag', WPMarker_CircleOriginDrag);

    marker.addTo(map);
    return(marker);
  }

  function WPMarker_CircleOriginDrag(event){
    var marker = event.target;
    var position = marker.getLatLng();

    for	(index = 0; index < WPMarkerArray_Circle.length; index++) {
      if(WPMarkerArray_Circle[index].originMarkerObj == marker){
        var tmpObj = WPMarkerArray_Circle[index];

        tmpObj.circleMarkerObj.setLatLng(position);

        var leftSide = computeLocationOfInterest(position, 270.0, tmpObj.circleRadius);
        var rightSide = computeLocationOfInterest(position, 90.0, tmpObj.circleRadius);

        tmpObj.arrowMarkerUp.setLatLng(leftSide);
        tmpObj.arrowMarkerDown.setLatLng(rightSide);
        break;
      }
    }
  }

  function WPMarker_CircleOriginClick(){

  }

  function drawUpArrow(centerLocation){
    //The commented code below would handle the arrow direction drawing based on
    //an actual polyline rather than a png marker
    // var arrowLength = 3;
    // var arrowEndPoint_Left = computeLocationOfInterest(centerLocation,225,arrowLength)
    // var arrowEndPoint_Right = computeLocationOfInterest(centerLocation,135,arrowLength);
    // WPMaker_Circle_Arrows.push(drawArrowLine(centerLocation,arrowEndPoint_Left));
    // WPMaker_Circle_Arrows.push(drawArrowLine(centerLocation,arrowEndPoint_Right));
    var marker = new L.marker(centerLocation,
    {
        // WPCircleArrowICON,
        draggable:false,
        clickable:false,
        title: 'arrow1'
    });

      marker.addTo(map);
      return (marker);
    }


    function drawDownArrow(centerLocation){
      //The commented code below would handle the arrow direction drawing based on
      //an actual polyline rather than a png marker
      // var arrowLength = 3;
      // var arrowEndPoint_Left = computeLocationOfInterest(centerLocation,315,arrowLength)
      // var arrowEndPoint_Right = computeLocationOfInterest(centerLocation,45,arrowLength);
      // WPMaker_Circle_Arrows.push(drawArrowLine(centerLocation,arrowEndPoint_Left));
      // WPMaker_Circle_Arrows.push(drawArrowLine(centerLocation,arrowEndPoint_Right));
      var marker = new L.marker(centerLocation,
        {
          // WPCircleArrowICON,
          draggable: false,
          clickable: false,
          title: 'arrow2'
        });

        marker.addTo(map);
        return (marker);

      }


      function drawArrowLine(startLocation, endingLocation){
        var pointArray = [startLocation,endingLocation];
        var polyline = new L.polyline(pointArray,ArrowPathObject).addTo(map);
        return (polyline);
      }


      function initializeWPMarker_Circle(){
        WPCircleOriginICON = L.icon({
          iconUrl: 'images/marker-icon.png',
          iconSize:     [25, 41], // size of the icon
          iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
          popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
        });

        WPCircleArrowICON = L.icon({
          iconUrl: 'images/marker-icon.png',
          iconSize:     [25, 41], // size of the icon
          iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
          popupAnchor:  [-19, 38] // point from which the popup should open relative to the iconAnchor
        });

        WPCirclePathOBJ = new L.Path();
        WPCirclePathOBJ.stroke = true;
        WPCirclePathOBJ.color = '#e30e0e';
        WPCirclePathOBJ.weight = 5;
        WPCirclePathOBJ.opacity  = 0.75;
        WPCirclePathOBJ.fill = true;
        WPCirclePathOBJ.fillColor = '#e30e0e';
        WPCirclePathOBJ.fillOpacity = 0.2;
        WPCirclePathOBJ.fillRule = 'evenodd';
        WPCirclePathOBJ.dashArray = null;
        WPCirclePathOBJ.lineCap = null;
        WPCirclePathOBJ.lineJoin = null;
        WPCirclePathOBJ.clickable = false;

        //These two are special for Polylines.
        WPCirclePathOBJ.smoothFactor = 1.0;
        WPCirclePathOBJ.noClip = false;
      }
