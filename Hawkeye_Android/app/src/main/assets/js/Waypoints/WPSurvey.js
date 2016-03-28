/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is be the basic WPLoiterTurns class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to circle about a specified radius.
 */


/* NOTES:
 *COPTER
 *Loiter (circle) the specified location for a specified number of turns, and
 *then proceed to the next command. If zero is specified for a
 *latitude/longitude/altitude parameter then the current location value for
 *the parameter will be used.
 *The radius of the circle is controlled by the CIRCLE_RADIUS parameter
 *(i.e. cannot be set as part of the command).
 *
 *PLANE
 * Loiter (circle) the specified location for a specified number of turns at
 * the given radius, and then proceed to the next command. If zero is specified
 * for a latitude/longitude/altitude parameter then the current location value
 * for the parameter will be used.
 */
var WPSurvey = Circle.extend(function() {

  this.descriptor = 'WPSurvey';

  this.descriptiveProps = {
    footprintWidth: 0,
    footprintHeight: 0,
    area: 0,
    pictures: 0,
    GSD: 0,
    length: 0,
    numStrips: 0
  };

  this.flightProperties = {
    angle: 0,
    altitude: 0,
    overlap: 0,
    sidelap: 0
  }

  this.updateDescriptors = function(value){

  };


  this.updateFlightProperties = function(value){

  };

  

});
