import React from 'react-native';
var {View, Text, StyleSheet, TouchableOpacity} = React;
var Icon = require('react-native-vector-icons/MaterialIcons');

var WaypointQueueItem = React.createClass({
  render(){
    switch(this.props.data.type){
      case 'waypoint':
        var icon = "place"
      break;
      case 'land':
        var icon = "file-download"
      break;
      case 'survey':
        var icon = "swap-calls"
      break;
      case 'loiter':
        var icon = "replay"
      break;
    }
    return(
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={this.props.activeOpacity} onPress={this.props.handlePress} style={this.props.style} onLongPress={this.props.handleLongPress} ref={this.props.ref}>
          <Text style={styles.id}>{this.props.data.id}</Text>
          <View style={styles.itemMeta}>
            <Icon name={icon} style={styles.icon} size={25} color="#f9f9f9" />
            <Text style={styles.altitude}>{this.props.data.altitude} ft</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
  },
  itemMeta:{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginTop: 10,
    alignItems:'center',
  },
  id:{
    fontSize:20,
    textAlign: 'center',
    color: '#ffffff',
  },
  altitude:{
    fontSize:12,
    color: '#ffffff',
  },
});

module.exports = WaypointQueueItem;
