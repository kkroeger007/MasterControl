import React from 'react-native';
var {View, Text, TouchableOpacity, ListView, StyleSheet, ScrollView, Dimensions, TouchableNativeFeedback} = React;
var {height, width} = Dimensions.get('window');
var WaypointQueueItem = require('./waypointQueueItem');
var SortableListView = require('./components/sortableListView');
var Subscribable = require('Subscribable');


var WaypointQueue = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState(){
    var dimensions = Dimensions.get('window');
    return {
      width: dimensions.width,
      height: dimensions.height,
      markers: [],
    };
  },
  componentDidMount(){
    this.addListenerOn(this.props.eventEmitter, 'orientationChanged', this.orientationChanged);

  },
  orientationChanged(data){
    var dimensions = Dimensions.get('window');
    this.setState({
      width: dimensions.width,
      height: dimensions.height,
    });
  },
  render(){
    return(
        <View style={[styles.waypointList, {width: this.state.width}]}>
          <SortableListView
            eventEmitter={this.props.eventEmitter}
            style={{flex:1}}
            data={this.props.markers}
            renderRow={this.props._renderRow}
            ref="SortableListView"
          />
        </View>
    );
  }
});

var styles = StyleSheet.create({

  waypointList:{
    position: 'absolute',
    bottom: 0,
    left:0,
  },

});
module.exports = WaypointQueue;
