import React from 'react-native';
var {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, WebView} = React;
var {height, width} = Dimensions.get('window');
var SITE_URL = "./html/test_PAT.html";
var WaypointGraph = React.createClass({
  getInitialState(){
      return {
          url: SITE_URL,
          status: 'No Page Loaded',
          backButtonEnabled: false,
          forwardButtonEnabled: false,
          loading: true,
      };
  },
  render(){
      return (
          <View style={styles.container}>
            <WebView style={styles.waypointGraph} source={require('./html/test_pat.html')} />
          </View>
      );
  }
});
var styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  waypointGraph:{
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 100,
    left: 0,
    right: 0,
  }
});
module.exports = WaypointGraph;
