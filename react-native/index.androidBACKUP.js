/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
// 'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
} from 'react-native';

var BASE_URL= './android/app/src/main/assets/index.html';

var Hawkeye = React.createClass({

  getInitialState(){
    return{
      uri: BASE_URL,
    };
  },
  componentDidMount(){
    var webview = this.refs.webview;

  },
  render() {
    return (
      <WebView javaScriptEnabled={true} ref="webview" style={styles.container} source={require('./android/app/src/main/assets/index_bobby.html')}/>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Hawkeye', () => Hawkeye);
