import React from 'react-native';
var {View, Text, StyleSheet, Animated, TouchableOpacity, PanResponder, TouchableWithoutFeedback} = React;
var MapView = require('react-native-maps');
var TimerMixin = 'react-timer-mixin';
var Icon = require('react-native-vector-icons/MaterialIcons');


LATITUDE_DELTA = 0.015;
LONGITUDE_DELTA = 0.010;

var FlightEditor = React.createClass({
  mixins: [TimerMixin],
  getInitialState(){
    return{
      region:{
        latitude: 37.888704,
        longitude: -76.814500,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      dashboard: false,
      dashboardStyles:{
        right: -500,
      },
      markers: [],
      editorMode: '',
      selectAll: false,
      lastMarkerSet: [],
    };
  },
  componentWillMount(){
    this.enablePanResponder();
  },
  componentDidMount(){
    this.refs.map.rotateEnabled = true;
    this.markers = [];
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
      region: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      }
    });
  },
  centerToUserLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        region= {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
       };
        this.refs.map.animateToRegion(region, 1000);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },
  handleMarkerAddition(data){
    switch(this.state.editorMode){
      case 'waypoint':
        this.state.markers.push(<MapView.Marker draggable key={this.state.markers.length} id={this.state.markers.length}  coordinate={data.nativeEvent.coordinate} onPress={(e) => this.pressMarker(e)}  />);
        this.onRegionChange(this.state.region);
      break;
    }
  },
  pressMarker(id){
    console.log(id.dispatchMarker)
  },
  toggleEditor(mode){
    if(this.state.editorMode == mode){
      this.setState({
        editorMode:'',
      });
    }else{
      this.setState({
        editorMode: mode,
      });
    }
    if(this.state.editorMode == "draw"){
      this.drawMode();
    }
  },
  fitMarkers(){
    if(this.state.markers != ''){
      this.refs.map.fitToElements(true);
    }
  },
  selectAll(){
    this.setState({
      selectAll: true,
      lastMarkerSet: this.state.markers,
    });
  },
  deleteAll(){
    this.setState({
      markers: [],
      selectAll: false,
    });
    this.onRegionChange(this.state.region);
  },
  undo(){
    this.setState({
      markers: this.state.lastMarkerSet,
      lastMarkerSet: [],
    });
  },
  enablePanResponder(){
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
        console.log(evt);
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log(evt);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        console.log(evt);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        console.log(evt);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  },
  drawMode(){
    this.refs.map.scrollEnabled = false;
    console.log(this.refs.map);
  },
  render(){
    return(
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={(region) => this.onRegionChange(region)}
          mapType="satellite"
          ref="map"
          rotateEnabled={true}
          showsUserLocation={true}
          onPress={this.handleMarkerAddition}
          scrollEnabled={true}
        >
      {this.state.markers}
      </MapView>
        <TouchableOpacity activeOpacity={0.7} style={styles.center} onPress={this.centerToUserLocation}>
          <Icon
            name="gps-fixed"
            size={25}
            color='#666666'
            style={this.state.center && styles.active}
             />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.fitMarkers} onPress={this.fitMarkers}>
          <Icon
            name="zoom-out-map"
            size={25}
            color='#666666'
            style={this.state.fitMarkers && styles.active}
             />
        </TouchableOpacity>
        <View style={styles.editorPanel}>
          <TouchableOpacity style={styles.editorButton} onPress={() => { this.toggleEditor('waypoint')}}>
            <Icon name="add-location" size={30} color="#f9f9f9" style={this.state.editorMode == 'waypoint' && styles.editorActive} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editorButton} onPress={() => { this.toggleEditor('draw')}}>
            <Icon name="gesture" size={30} color="#f9f9f9" style={this.state.editorMode == 'draw' && styles.editorActive} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editorButton} onPress={this.selectAll}>
            <Icon name="select-all" size={30} color="#f9f9f9" style={this.state.markers != ''  && styles.selectAllActive} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editorButton} onPress={this.deleteAll}>
            <Icon name="delete-forever" size={30} color="#f9f9f9" style={this.state.selectAll && styles.deleteAllActive} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editorButton} onPress={this.undo}>
            <Icon name="undo" size={30} color="#f9f9f9" style={this.state.lastMarkerSet != '' && styles.undoActive}/>
          </TouchableOpacity>
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
  fitMarkers:{
    position:'absolute',
    top: 145,
    left:10,
    backgroundColor: '#f9f9f9',
    borderRadius:60,
    padding:5,
  },
  editorPanel:{
    left:10,
    top:190,
    position:'absolute',
    backgroundColor:'rgba(0,0,0,.7)',
    borderRadius:5,
    padding:5,
  },
  editorActive:{
    color:'#16a092',
  },
  editorButton:{
    paddingTop:5,
    paddingBottom:5,
  },
  undoActive:{
    color:'#D47631',
  },
  deleteAllActive:{
    color:'#CE303D',
  },
  selectAllActive:{
    color: '#234F6C'
  },


});

module.exports = FlightEditor;
