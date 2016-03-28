/*
 * Created: Kenneth Kroeger
 * Date: 3/21/2016
 *
 * Description: The purpose of this class is be the basic WPLoiterTurns class that
 * is inherets the WPBase Class. This waypoint represents the target location
 * for the UAV to circle about a specified radius.
 */

//TODO: This class will eventually need to update itself when not working with
//the API.

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
var WPStructureScanner = WPCircle.extend(function() {

  this.descriptor = 'WPStructureScanner';

  /**
   * [_WPParams description]
   * @type {Object}
   */
  this.WPParams_StartAlt = function(value) {
    if (value === undefined) return (this.WPParams_param1());
    this.WPParams.param1(value);
    recomputeCircleSteps();
  };
  this.WPParams_FinishAlt = function(value) {
    if (value === undefined) return (this.WPParams_param2());
    this.WPParams_param2(value);
    recomputeCircleSteps();
  };
  this.WPParams_Steps = function(value) {
    if (value === undefined) return (this.WPParams_param3());
    this.WPParams_param3(value);
    recomputeCircleSteps();
  };
  this.WPParams_OrbitRadius = function(value) {
    if (value === undefined) return (this.WPParams_param4());
    this.WPParams_param4(value);
    recomputeCircleSteps();
  };
  this.WPParams_Direction = function(value) {
    if (value === undefined) return (this.WPParams_param5());
    this.WPParams_param5(value);
    recomputeCircleSteps();
  };
  this.WPParams_CrossHatch = function(value) {
    if (value === undefined) return (this.WPParams_param7());
    this.WPParams_param7(value);
    recomputeCircleSteps();
  };

  this.WPStructureScannerArray = [];

  var missionProperties = {
    StartAlt: 10, //Start altitude meters
    FinishAlt: 20, //Finish altitude meters
    Radius: 20,
    Steps: 1, //The numbers of steps desired to take between start and finish
    StepInterval: 1 //The resulting distance in meters of steps
  };

  this.constructor = function(leafletMap, locationLatLng, display) {
    this.super(leafletMap, locationLatLng, display);
  };

  recomputeCircleSteps = function(){
    var stepRange = (missionProperties.FinishAlt - missionProperties.StartAlt);
    missionProperties.StepInterval = stepRange/missionProperties.Steps;
  }

  this.updateAllStepInterval = function(startAlt,finishAlt,steps,radius){
    this.WPParams_StartAlt(startAlt);
    this.WPParams_FinishAlt(finishAlt);
    this.WPParams_Steps(steps);
    this.WPParams_OrbitRadius(radius);

    recomputeCircleSteps();
  }

});
