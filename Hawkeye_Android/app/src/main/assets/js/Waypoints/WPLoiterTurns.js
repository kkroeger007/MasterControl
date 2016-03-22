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
var WPLoiterTurns = Class.extend(function() {

  this.descriptor = 'WPLoiterTurns';

  this.WPParams_turns = function(value) {
    if (value === undefined) return (this.WPParams_param1());
    this.WPParams.param1(value);
  };

  //This flight parameter is not available in Copter
  this.WPParams_orbitRadius = function(value) {
    if (value === undefined) return (this.WPParams_param3());
    this.WPParams_param3(value);
  };

  //This flight parameter is not available in Copter
  this.WPParams_yawAngle = function(value) {
    if (value === undefined) return (this.WPParams_param4());
    this.WPParams_param4(value);
  };

});
