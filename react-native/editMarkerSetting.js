import React from 'react-native';
var {View, Text, TouchableOpacity, StyleSheet, TextInput} = React;
import Picker from 'react-native-picker';

var EditMarkerSetting = React.createClass({
  propTypes:{
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
  },
  getInitialState(){
    return{
      value: this.props.value,
    };
  },
  selectedValue(){
    console.log('done');
  },
  getUnitMeasure(name){
    switch(name){
      case 'Altitude':
        return 'ft';
      break;
      case 'Latitude' || 'Longitude':
        return '';
      break;
    }
  },
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>{this.props.name}</Text>
        </View>
        <View style={styles.body}>
          <TextInput keyboardType="numeric" underlineColorAndroid="transparent" style={{height:40, flex:1}} onChangeText={(value) => this.setState({value})} value={this.state.value} />
          <Text>{this.getUnitMeasure(this.props.name)}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container:{
    flex:1,
    borderWidth:1,
    borderColor:'#c4c4c4',
    padding:5,
    backgroundColor:'#f9f9f9',
    marginBottom:10,
  },
  header:{
    borderBottomWidth:1,
    borderColor:'#c4c4c4',
    paddingBottom:5,
  },
  heading:{
    color:'#c4c4c4',
    fontSize:18,
  },
  body:{
    flexDirection: 'row',
    flex:1,
    alignItems:'center',
    justifyContent:'space-around',
    paddingRight: 25,
  },

});

module.exports = EditMarkerSetting;
