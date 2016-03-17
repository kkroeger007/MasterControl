import React from 'react-native';
var {View, Text, StyleSheet} = React;
var Icon = require('react-native-vector-icons/MaterialIcons');

var Timer = React.createClass({
  render(){
    return(
      <View style={[styles.container]}>
        <Icon name="timer" style={styles.icon} color="#ffffff" size={24}/>
        <Text style={styles.value}>{this.props.value}</Text>
      </View>
    );
  }
});
var styles = StyleSheet.create({
  value:{
    fontSize:20,
    fontWeight:'900',
    textAlign: 'center',
    color:"#f9f9f9",
  },
  container:{
    flex:1,
    alignItems:'center',
    flexDirection: 'row',
    justifyContent:'space-around',
    backgroundColor:'rgba(0, 0, 0, .7)',
    padding:10,
    marginTop:2,
    marginBottom:2,
    borderRadius:5,
  },
});
module.exports = Timer;
