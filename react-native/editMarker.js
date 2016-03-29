import React from 'react-native';
var {View, TouchableOpacity, Text, StyleSheet} = React;
var Icon = require('react-native-vector-icons/MaterialIcons');
var EditMarkerSetting = require('./editMarkerSetting');

var EditMarker = React.createClass({
  getInitialState(){
    return{
      altitude: this.props.data.altitude.toString(),
      lat: this.props.data.lat.toString(),
      lon: this.props.data.lon.toString(),
    };
  },
  handleType(type){
    var transformed = type.toUpperCase();
    return transformed;
  },
  render(){
    return(
        <View style={styles.editPoint}>
          <View style={styles.editPointHeader}>
            <View style={styles.id}>
              <Text style={styles.textId}>{this.props.data.id}</Text>
            </View>
            <View style={styles.type}>
              <Text style={styles.textType}>{this.handleType(this.props.data.type)}</Text>
              <Icon name="keyboard-arrow-down" size={25} color="#f9f9f9" />
            </View>
          </View>
          <View style={styles.editPointBody}>
            <EditMarkerSetting name="Altitude" min={0} max={100} value={this.state.altitude} />
            <EditMarkerSetting name="Latitude" min={0} max={100} value={this.state.lat} />
            <EditMarkerSetting name="Longitude" min={0} max={100} value={this.state.lon} />
          </View>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  editPoint:{
    position: 'absolute',
    right:10,
    flex:1,
    top:100,
    width:250,
  },
  editPointHeader:{
    backgroundColor:'#638ca6',
    flexDirection:'row',
    height:60,
  },
  textId:{
    fontSize:30,
    color:'#f9f9f9',
    fontWeight: '900',
  },
  id:{
    borderRightWidth: 1,
    borderColor: 'rgba(136, 202, 207, 1)',
    padding:5,
    alignItems:'center',
    justifyContent:'center',
    paddingRight:10,
    marginTop:10,
    marginBottom:10,
    width:60,
  },
  type:{
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    flexDirection: 'row',
    flex:1,
    paddingRight:10,
  },
  textType:{
    fontSize:20,
    color:'rgba(136, 202, 207, 1)',
    fontWeight: '700',
  },
  editPointBody:{
    backgroundColor: '#e3e3e3',
    flex:1,
    padding:10,
  },
});

module.exports = EditMarker;
