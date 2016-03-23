import React from 'react-native';
var {View, Text, TouchableOpacity, ListView, StyleSheet, ScrollView, Dimensions} = React;
var {height, width} = Dimensions.get('window');
var WaypointQueueItem = require('./waypointQueueItem');

var WaypointQueue = React.createClass({
  getInitialState(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.markers),
      selectedMarker: {},
      editingMarker: false,
    };
  },
  _renderRow(rowData){
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.handleWaypointQueueItemPress(rowData)} style={styles.item}>
        <WaypointQueueItem data={rowData}/>
      </TouchableOpacity>
    );
  },
  handleWaypointQueueItemPress(data){
    this.props.eventEmitter.emit('editMarkerOpen', data);
  },
  render(){
    return(
        <View style={styles.waypointList}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this._renderRow(rowData)}
            renderScrollComponent={props => <ScrollView horizontal={true} />}
          />
        </View>
    );
  }
});

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
  waypointList:{
    position: 'absolute',
    bottom: 0,
    width: width,
    left:0,
  },
  item:{
    backgroundColor: '#16a092',
    padding:10,
    marginLeft:2,
    marginRight:2,
    borderRadius:5,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },

});
module.exports = WaypointQueue;
