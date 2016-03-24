
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
  TouchableOpacity,
  BackAndroid,
  Dimensions,
  NavigationExperimental,
  DrawerLayoutAndroid,
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
var WebViewBridge = require('./components/WebViewBridge/webviewBridge');
let {width, height} = Dimensions.get('window');
var WaypointGraph = require('./waypointGraph');

const injectScript = `$('#map').css('width', `+width+`)`;


var Main = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState(){
    return{
      language: '',
      activeAircraft: 'No Active Aircraft',
      aircraftSelected: false,
      flightMode: (<LiveFlight />),
    }
  },
  componentWillMount(){

  },
  componentDidMount(){
    this.addListenerOn(this.props.eventEmitter, 'selectAircraft', this.selectAircraft);
    this.addListenerOn(this.props.eventEmitter, 'changeFlightMode', this.changeFlightMode);
  },
  componentWillUnmount(){
    // this.removeListenerOn(this.props.eventEmitter, 'selectAircraft');
    // this.removeListener(this.props.eventEmitter, 'changeFlightMode');
  },
  openDrawer(){
    this._drawer.open();
  },
  triggerDropdown(){
    this.props.eventEmitter.emit('dropdown');
  },
  selectAircraft(){

  },
  changeFlightMode(data){
    switch(data.mode){
      case 'live':
        this.setState({
          flightMode: (<LiveFlight eventEmitter={this.props.eventEmitter} />),
        });
      break;
      case 'editor':
      this.setState({
        flightMode: (<FlightEditor eventEmitter={this.props.eventEmitter} />),
      });
      break;
    }
  },
  onBridgeMessage(message){
    const { webviewbridge } = this.refs;
    switch (message) {
      case "hello from webview":
        webviewbridge.sendToBridge("hello from react-native");
        break;
      case "got the message inside webview":
        console.log("we have got a message from webview! yeah");
        break;
    }
  },
  render() {
    return (
        <View style={styles.container}>
          <View style={{flex:1, position:'absolute', top:0, bottom:0, right:0, left: 0,}}>
            <WebViewBridge
            style={{flex:1}}
            ref="webviewbridge"
            javaScriptEnabled={true}
            onBridgeMessage={this.onBridgeMessage}
            injectedJavaScript={injectScript}
            source={require('./html/index.html')}/>
          </View>
          {this.state.flightMode}
            <AircraftSelector style={styles.aircraftSelector} eventEmitter={this.props.eventEmitter} />
            {this.state.aircraftSelected &&
              <View style={styles.connectContainer}>
                <TouchableOpacity activeOpacity={0.7} style={styles.connect} onPress={() => this.props.navigator.push({id:2})}>
                  <Icon name="wifi" size={30} color="#666666" style={styles.connectIcon} />
                </TouchableOpacity>
                <View style={styles.connectTextContainer}>
                  <Text style={styles.connectText}>Connect</Text>
                </View>
              </View>
            }
        </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'transparent'
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
    elevation:5,
  },
  connectContainer:{
    bottom:15,
    position:'absolute',
    left:0,
    right:0,
    alignItems:'center',

  },
  connectTextContainer:{
    backgroundColor:'rgba(50, 50, 50, .6)',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:25,
    alignItems:'center',
    marginTop:8,
    width:70,
  },
  connectText:{
    color:'#f9f9f9',
    fontSize:11,
  }
});

module.exports = Main;
