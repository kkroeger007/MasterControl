import React from 'react-native';
var {View, Text, StyleSheet} = React;
var Icon = require('react-native-vector-icons/MaterialIcons');
var LinearGradient = require('react-native-linear-gradient');

var Horizon = React.createClass({
  render(){
    return(
      <View style={styles.horizonContainer}>
        <View style={styles.compassTelemetry}>
          <View style={styles.singleTelemtry}>
            <View style={styles.iconContainer}>
              <Icon name="flight" style={styles.telemetryIcon} size={14} color="#f9f9f9" />
            </View>
            <Text style={styles.telemetryLabel}>169&deg;</Text>
          </View>
          <View style={styles.singleTelemtry}>
            <LinearGradient colors={['#638ca6', '#638ca6', '#16a092', '#16a092']} locations={[0, 0.5, 0.51, 1]} style={styles.iconContainer}>
              <Icon name="flight-takeoff" style={styles.telemetryIcon} size={14} color="#f9f9f9" />
            </LinearGradient>
            <Text style={styles.telemetryLabel}>-42&deg;</Text>
          </View>
          <View style={styles.singleTelemtry}>
            <LinearGradient colors={['#638ca6', '#638ca6', '#16a092', '#16a092']} locations={[0, 0.5, 0.51, 1]} style={styles.iconContainer}>
              <View style={styles.aircraftMini}></View>
              <View style={styles.centerAircraftMini}></View>
              <View style={styles.bullseyeMini}></View>
              <View style={styles.innerPointerMini}></View>
            </LinearGradient>
            <Text style={styles.telemetryLabel}>16&deg;</Text>
          </View>
        </View>
        <View style={styles.horizon}>
          <View style={styles.compass}>
            <View style={styles.direction}>
              <Icon name="play-arrow" size={12} color="#f9f9f9" style={styles.directionIcon}/>
            </View>
          </View>
          <View style={styles.flightIndicatorContainer}>
            <View style={styles.flightIndicator}>
              <LinearGradient colors={['#638ca6', '#638ca6', '#16a092', '#16a092']} locations={[0, 0.5, 0.51, 1]} style={styles.flightIndicatorInner}>
                <View style={styles.indicatorLine}></View>
                <View style={styles.indicatorLine}></View>
                <View style={styles.indicatorLine}></View>
                <View style={styles.indicatorLine}></View>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.aircraftIndicator}>
            <View style={styles.aircraft}></View>
            <View style={styles.centerAircraft}></View>
            <View style={styles.bullseye}></View>
            <View style={styles.innerPointer}></View>
          </View>
        </View>
      </View>
    );
  }
});
var styles = StyleSheet.create({
  horizon:{
    position:'relative',
    width:75,
    height:75,
    alignItems:'center',
    marginBottom:10,
  },
  compass:{
    width:75,
    height:75,
    flex:1,
    position:'relative',
  },
  direction:{
    position:'absolute',
    left:0,
    top:-9,
    right:0,
    transform: [{rotate:'-90deg'}],
  },
  directionIcon:{
    textAlign:'center',
  },
  flightIndicatorContainer:{
    width:75,
    height:75,
    position:'absolute',
  },
  flightIndicator:{
    backgroundColor:'#f9f9f9',
    width:75,
    height:75,
    borderRadius:100,
    position:'relative',
    alignItems:'center',
    justifyContent:'center',
  },
  flightIndicatorInner:{
    width:65,
    height:65,
    position:'relative',
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'blue',
    borderRadius:60,
  },
  indicatorLine:{
    width:25,
    height:1,
    backgroundColor:'#f9f9f9',
    borderWidth:0,
    margin:3,
  },
  aircraftIndicator:{
    width:75,
    height:75,
    alignItems:'center',
    flexDirection:'row',
    position:'relative',
  },
  aircraft:{
    height:3,
    backgroundColor:'#f9f9f9',
    borderRadius:3,
    width:45,
    position:'absolute',
    left:15,
    top:35.5,
  },
  centerAircraft:{
    height:9,
    width:9,
    backgroundColor: '#f9f9f9',
    borderRadius:10,
    position:'absolute',
    left:32.5,
    top:32.5

  },
  bullseye:{
    backgroundColor:"#CF303D",
    height:4,
    width:4,
    borderRadius:10,
    left:35,
    top:35,
    position:'absolute',
  },
  innerPointer:{
    position:'absolute',
    height:5,
    width:3,
    borderRadius:5,
    top:30,
    left:35,
    backgroundColor:'#f9f9f9',
  },
  aircraftMini:{
    height:2,
    backgroundColor:'#f9f9f9',
    borderRadius:3,
    width:16,
    position:'absolute',
    left:2,
    top:8.5,
  },
  centerAircraftMini:{
    height:5,
    width:5,
    backgroundColor: '#f9f9f9',
    borderRadius:10,
    position:'absolute',
    left:7,
    top:7,

  },
  bullseyeMini:{
    backgroundColor:"#CF303D",
    height:2,
    width:2,
    borderRadius:3,
    left:8.5,
    top:8.5,
    position:'absolute',
  },
  innerPointerMini:{
    position:'absolute',
    height:3,
    width:2,
    borderRadius:5,
    top:5,
    left:8.75,
    backgroundColor:'#f9f9f9',
  },
  singleTelemtry:{
    backgroundColor: 'rgba(0, 0, 0, .7)',
    borderRadius:5,
    flexDirection:'row',
    flex:1,
    padding:5,
    marginTop:3,
    marginBottom:3,
    justifyContent:'space-between',
    alignItems:'center',
  },
  horizonContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:20,
    justifyContent:'space-between',
  },
  telemetryLabel:{
    fontSize:10,
    color:'#f9f9f9',
    flex:1,
    textAlign:'center',
  },
  compassTelemetry:{
    width:60,
    marginRight:10,
  },
  iconContainer:{
    flexDirection:'row',
    width:20,
    height:20,
    borderRadius: 20,
    backgroundColor:'#16a092',
    justifyContent:'center',
  },
  telemetryIcon:{
    alignSelf:'center',
    textAlign:'center',
    justifyContent:'center',
  },
});
module.exports = Horizon;
