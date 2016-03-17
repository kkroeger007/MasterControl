import React from 'react-native';
var {StyleSheet, View, TouchableOpacity, Text, Navigator, Animated, LayoutAnimation} = React;
import MapView from 'react-native-maps';
import TimerMixin from 'react-timer-mixin';
var Icon = require('react-native-vector-icons/MaterialIcons');
var InstrumentPanel = require('./instrumentPanel');

LATITUDE_DELTA = 0.015;
LONGITUDE_DELTA = 0.010;

var LiveFlight = React.createClass({
  mixins: [TimerMixin],
  getInitialState(){
    return{
      region: new Animated.Region({
        latitude: 37.888704,
        longitude: -76.814500,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      dashboard: false,
      dashboardStyles:{
        right: -500,
      }
    };
  },
  componentDidMount(){
    this.refs.map.rotateEnabled = true;
  },
  showDashboard(){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.Linear);
    if(this.state.dashboard == true){
      this.setState({
        dashboardStyles: {
          right:-500,
        }
      })
    }else{
      this.setState({
        dashboardStyles: {
          right:10,
        }
      });
    }
    this.setState({
      dashboard: !this.state.dashboard,
    });

  },
  resetRotation(){
    console.log(this.refs.map.rotateEnabled);
    this.refs.map.rotateEnabled = !this.refs.map.rotateEnabled;
    this.setTimeout(
      () => { this.refs.map.rotateEnabled = !this.refs.map.rotateEnabled; },
      150
    );
  },
  onRegionChange(region) {
    this.setState({
      region: new Animated.Region({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      })
    });
  },
  centerToUserLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: new Animated.Region({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
         }),
       });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },
  render(){
    return(
      <View style={styles.container}>
        <MapView.Animated
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          mapType="satellite"
          ref="map"
          rotateEnabled={true}
          showsUserLocation={true}
        />
      <TouchableOpacity activeOpacity={0.7} style={styles.center} onPress={this.centerToUserLocation}>
        <Icon
          name="gps-fixed"
          size={25}
          color='#666666'
          style={this.state.center && styles.active}
           />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.instrumentation} onPress={this.showDashboard}>
        <Icon
          name="network-check"
          size={25}
          color='#666666'
          style={this.state.dashboard && styles.active}
           />
      </TouchableOpacity>
      <View style={[styles.slide, this.state.dashboardStyles]}>
        <InstrumentPanel />
      </View>
    </View>
    );
  }
});

var styles = StyleSheet.create({
  map:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  center:{
    position:'absolute',
    top: 100,
    left:10,
    backgroundColor: '#f9f9f9',
    borderRadius:60,
    padding:5,
  },
  instrumentation:{
    position: 'absolute',
    top:145,
    left:10,
    backgroundColor: '#f9f9f9',
    borderRadius:60,
    padding:5,
  },
  active:{
    color: '#16a092'
  },
  slide:{
    width:150,
    position:'absolute',
    top:80,
    right:10,
  },
});

module.exports = LiveFlight;
