import React from 'react-native';
var {View, Text, StyleSheet} = React;

var SingleInstrument = React.createClass({
  render(){
    return(
      <View style={[styles.container, {backgroundColor: this.props.color}]}>
        <Text style={styles.value}>{this.props.value}</Text>
        <Text style={styles.name}>{this.props.name}</Text>
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
    flexDirection:'column',
    padding:10,
    marginTop:2,
    marginBottom:2,
    borderRadius:5,
  },
  name:{
    fontSize:14,
    textAlign:'center',
    color:"#f9f9f9",
  }
});
module.exports = SingleInstrument;
