import React from 'react-native';
var {View, TouchableOpacity, StyleSheet, Text} = React;
var Icon = require('react-native-vector-icons/MaterialIcons');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

var NavigationBar = React.createClass({
  componentWillMount(){
    this.eventEmitter = new EventEmitter();
  },
  componentDidMount(){
  },
  openDrawer(){
    this.props.eventEmitter.emit('openDrawer');
  },
  render(){
    return(
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
        <Text style={styles.selectedAircraft}></Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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
});

module.exports = NavigationBar;
