import React from 'react-native';
var {View, Text, StyleSheet, ScrollView} = React;
var Horizon = require('./horizon');
var SingleInstrument = require('./singleInstrument');
var Timer = require('./timer');

var InstrumentPanel = React.createClass({
  render(){
    return(
      <ScrollView style={styles.container}>
        <Horizon />
        <Timer value="02:55" />
        <SingleInstrument type="instrument" name="Ground Speed" color="rgba(23, 166, 151, .7)" value="45.4 ft/s" />
        <SingleInstrument type="instrument" name="Air Speed" color="rgba(94, 133, 158, .7)" value="45.4 ft/s" />
        <SingleInstrument type="instrument" name="Climb Rate" color="rgba(136, 202, 207, .7)" value="0.3 ft/s" />
        <SingleInstrument type="instrument" name="Altitude" color="rgba(17, 114, 108, .7)" value="65.3 ft/s" />
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container:{
    flex:1,
    // height:400,
  },
});

module.exports = InstrumentPanel;
