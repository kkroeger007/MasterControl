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

var WebViewBridge = require('react-native-webview-bridge');


const injectScript = `
  (function () {
    if (WebViewBridge) {
      WebViewBridge.onMessage = function (message) {
        if (message === "hello from react-native") {
          WebViewBridge.send("got the message inside webview");
        }
      };
      WebViewBridge.send("hello from webview");
    }
  }());
`;

var Leaflet = React.createClass({
  onBridgeMessage: function (message) {
    const { webviewbridge } = this.refs;

    switch (message) {
      case "hello from webview":
        webviewbridge.sendToBridge("hello from react-native");
        break;
      case "got the message inside webview":
        console.log("we have got a message from webview! yeah");
        break;
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <WebViewBridge
        ref="webviewbridge"
        onBridgeMessage={this.onBridgeMessage}
        javaScriptEnabled={true}
        source={require('./html/index.html')}/>
        </View>
    );
  }
});

module.exports = Leaflet;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
