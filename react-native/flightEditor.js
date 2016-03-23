import React from 'react-native';
var {View, Text, StyleSheet, Animated, TouchableOpacity, PanResponder, TouchableWithoutFeedback} = React;
var TimerMixin = 'react-timer-mixin';
var Icon = require('react-native-vector-icons/MaterialIcons');
var WaypointQueue = require('./waypointQueue');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');
var EditMarker = require('./editMarker');

var markers = [
  {id: 1, altitude: 66.0, lat: 90, lon: 80, type: 'waypoint'},
  {id: 2, altitude: 66.0, lat: 90, lon: 80, type:'land'},
  {id: 3, altitude: 66.0, lat: 90, lon: 80, type: 'loiter'},
  {id: 4, altitude: 66.0, lat: 90, lon: 80, type: 'survey'},
  {id: 5, altitude: 66.0, lat: 90, lon: 80, type:'waypoint'},
  {id: 6, altitude: 66.0, lat: 90, lon: 80, type:'waypoint'},
  {id: 7, altitude: 66.0, lat: 90, lon: 80, type:'waypoint'},
  {id: 8, altitude: 66.0, lat: 90, lon: 80, type:'waypoint'},
];


var FlightEditor = React.createClass({
  mixins: [TimerMixin, Subscribable.Mixin],
  getInitialState(){
    return{
      dashboard: false,
      dashboardStyles:{
        right: -500,
      },
      markers: markers,
      editorMode: '',
      selectAll: false,
      lastMarkerSet: [],
      editingMarker: false,
      selectedMarker: {},
    };
  },
  componentWillMount(){
    this.addEventListeners();
  },
  componentDidMount(){

  },
  addEventListeners(){
    this.addListenerOn(this.props.eventEmitter, 'editMarkerOpen', this.editMarkerOpen);
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
  },
  undo(){
    this.setState({
      markers: this.state.lastMarkerSet,
      lastMarkerSet: [],
    });
  },
  drawMode(){
    this.refs.map.scrollEnabled = false;
    console.log(this.refs.map);
  },
  editMarkerOpen(data){
    this.setState({
      editingMarker: true,
      selectedMarker: data,
    });
    console.log(!this.state.selectedMarker);
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
      {this.state.editingMarker  &&
        <EditMarker data={this.state.selectedMarker}/>
      }
      <WaypointQueue markers={this.state.markers} eventEmitter={this.props.eventEmitter} />
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
