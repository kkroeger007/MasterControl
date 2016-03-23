import React from 'react-native';
var {StyleSheet, View, TouchableOpacity, Text, Navigator, Animated, LayoutAnimation} = React;
import TimerMixin from 'react-timer-mixin';
var Icon = require('react-native-vector-icons/MaterialIcons');
var InstrumentPanel = require('./instrumentPanel');

var LiveFlight = React.createClass({
  mixins: [TimerMixin],
  getInitialState(){
    return{
      dashboard: false,
      dashboardStyles:{
        right: -500,
      }
    };
  },
  componentDidMount(){

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
  render(){
    return(
      <View style={styles.container}>
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
    elevation:5,
  },
  instrumentation:{
    position: 'absolute',
    top:145,
    left:10,
    backgroundColor: '#f9f9f9',
    borderRadius:60,
    padding:5,
    elevation:5,
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
