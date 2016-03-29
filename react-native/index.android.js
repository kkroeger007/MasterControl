import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackAndroid,
  Navigator,
  DrawerLayoutAndroid,
  Dimensions,
} from 'react-native';
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');
var Main = require('./main');
var NavigationBar = require('./navigationBar');
var DrawerNavigation = require('./drawerNavigation');
var Settings = require('./settings');
var Orientation = require('react-native-orientation-listener');
let {width, height} = Dimensions.get('window');

var _navigator;


var Hawkeye = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState(){
    return{

    }
  },
  componentWillMount(){
    console.log(width, height);
    this.eventEmitter = new EventEmitter();
  },
  componentDidMount(){
    this.addEventListeners();

  },
  componentWillUnmount(){
    this.removeEventListeners();
  },
  addEventListeners(){
    this.addListenerOn(this.eventEmitter, 'openDrawer', this.openDrawer);
    this.addListenerOn(this.eventEmitter, 'drawerItemClicked', this.navigateToScene);
    this.addListenerOn(this.eventEmitter, 'changeFlightMode', this.closeDrawer);
    this.addBackListener();
    Orientation.addListener(() => {this.getOrientation()});
  },
  removeEventListeners(){
    // this.removeListener(this.eventEmitter, 'openDrawer');
    // this.removeListener(this.eventEmitter, 'drawerItemClicked');
    // this.removeListener(this.eventEmitter, 'changeFlightMode');
  },
  addBackListener(){
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (_navigator.getCurrentRoutes().length === 1  ) {
         return false;
      }
      _navigator.pop();
      return true;
    });
  },
  openDrawer(){
    this.drawer.openDrawer();
  },
  closeDrawer(){
    this.drawer.closeDrawer();
  },
  navigateToScene(data){
    this.closeDrawer();
    _navigator.push({
      id: data.id,
    });
  },
  getOrientation(){
    Orientation.getOrientation(
      (orientation) => {
        if(orientation.orientation !== this.state.orientation || this.state.orientation == ''){
          if(orientation.orientation == 'PORTRAIT'){
            var screenHeight = Math.max(width, height);
            var screenWidth = Math.min(width, height);
          }else{
            var screenHeight = Math.min(width, height);
            var screenWidth = Math.max(width, height);
          }
          this.setState({
            orientation: orientation.orientation,
            dimensions: {
              width: screenWidth,
              height: screenHeight,
            }
          });
          this.eventEmitter.emit('orientationChanged', {orientation: orientation, dimensions: this.state.dimensions});
        }
      }
    )
  },
  render() {
    var navigationView = (
      <DrawerNavigation navigator={navigator} eventEmitter={this.eventEmitter} />
    );
    return (
      <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}
      ref={(drawer) => { this.drawer = drawer; }}>
        <Navigator
          initialRoute={{id: 1}}
          renderScene={this.navigatorRenderScene}
          navigationBar={<NavigationBar eventEmitter={this.eventEmitter} />}
          style={styles.container}
          />
      </DrawerLayoutAndroid>
    );
  },
  navigatorRenderScene(route, navigator){
    _navigator = navigator;
    switch(route.id){
      case 1:
        return (<Main navigator={navigator} eventEmitter={this.eventEmitter}/>);
      break;
      case 2:
        return (<Settings navgiator={navigator} />);
      break;
    }
  }
});

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('Hawkeye', () => Hawkeye);
