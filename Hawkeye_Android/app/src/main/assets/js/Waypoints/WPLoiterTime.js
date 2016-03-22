/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is be the basic WPLoiterTime class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to circle about a specified radius.
 */

/* NOTES:
 * Fly to the specified location and then loiter there for the specified number
 * of seconds — where loiter means “wait in place” (rather than “circle”). The
 * timer starts when the waypoint is reached; when it expires the waypoint is
 * complete. If zero is specified for a latitude/longitude/altitude parameter
 * then the current location value for the parameter will be used.
 */

var WPLoiterTime = WPCircle.extend(function() {

  this.descriptor = 'WPLoiterTime';

  this.WPParams_time = function(value) {
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
