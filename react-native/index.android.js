
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
  TouchableOpacity,
  DrawerLayoutAndroid,
  BackAndroid,
  Dimensions,
  NavigationExperimental,
  Picker,
} from 'react-native';

var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

var Icon = require('react-native-vector-icons/MaterialIcons');
var LiveFlight = require('./liveFlight');
var FlightEditor = require('./flightEditor');
var DrawerNavigation = require('./drawerNavigation');
var AircraftSelector = require('./aircraftSelector');
var InstrumentPanel = require('./instrumentPanel');

var DRAWER_WIDTH_LEFT = 56;

var Hawkeye = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState(){
    return{
      language: '',
      activeAircraft: 'No Active Aircraft',
      aircraftSelected: false,
    }
  },
  componentWillMount(){
    this.eventEmitter = new EventEmitter();
  },
  componentDidMount(){
    this.addListenerOn(this.eventEmitter, 'selectAircraft', (aircraft) => this.setActiveAircraft(aircraft));
  },
  componentWillUnmount(){
    this.removeListenerOn(this.eventEmitter, 'selectAircraft');
  },
  openDrawer(){
    this.drawer.openDrawer();
  },
  triggerDropdown(){
    this.eventEmitter.emit('dropdown');
  },
  setActiveAircraft(aircraft){
    console.log(aircraft.aircraft);
    this.setState({
      activeAircraft: aircraft.aircraft,
      aircraftSelected: true,
    });
  },
  render() {
    var navigationView = (
      <DrawerNavigation />
    );
    return (
      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={() => navigationView}>
        <View style={styles.container}>
          <FlightEditor />
            <View style={styles.header}>
              <TouchableOpacity onPress={this.openDrawer}>
                <Icon
                  name="menu"
                  size={25}
                  color="#f9f9f9"
                  style={styles.headerIcon}
                   />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.triggerDropdown}
                style={styles.dropdownTrigger}>
                <Icon
                  name="more-vert"
                  style={styles.dropdownIcon}
                  size={25}
                  color="#f9f9f9" />
              </TouchableOpacity>
              <Text style={styles.selectedAircraft}>{this.state.activeAircraft}</Text>
            </View>
            <AircraftSelector style={styles.aircraftSelector} events={this.eventEmitter} />
              {this.state.aircraftSelected &&
                <View style={styles.connectContainer}>
                  <TouchableOpacity activeOpacity={0.7} style={styles.connect}>
                    <Icon name="wifi" size={30} color="#666666" style={styles.connectIcon} />
                  </TouchableOpacity>
                  <Text style={styles.connectText}>Connect</Text>
                </View>
              }
          </View>
      </DrawerLayoutAndroid>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header:{
    backgroundColor:'#16a092',
    height:60,
    flex:1,
    left:0,
    right:0,
    position: 'absolute',
    top:25,
    alignItems:'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight:15,
  },
  headerIcon:{
    alignItems:'center',
    flex:1,
    color:'#fff',
  },
  dropdownTrigger:{
    alignItems:'center',
    flex:1,
    alignSelf:'center',
    flexDirection:'row',
    position: 'absolute',
    top:0,
    bottom:0,
    right:10,
  },
  dropdownIcon:{
      flex:1,
      color:'#f9f9f9',
      alignSelf:'center',
  },
  selectedAircraft:{
    textAlign:'center',
    alignSelf:'center',
    marginLeft: 15,
    color:'#f9f9f9',
  },
  connect:{
    width:50,
    height:50,
    borderRadius:50,
    backgroundColor:'#f9f9f9',
    position: 'relative',
    left:0,
    right:0,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
  },
  connectContainer:{
    bottom:15,
  },
  connectText:{
    color:'#f9f9f9',
  }
});

AppRegistry.registerComponent('Hawkeye', () => Hawkeye);
