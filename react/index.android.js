/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  PanResponder
} = React;
var html = '<h1>This is a test</h1>';
var RNFS = require('react-native-fs');
var WebViewAndroid = require('react-native-webview-android');

var SITE_URL = "http://192.168.1.23";

var MapExample = React.createClass({
    getInitialState: function() {
      return {
        url: SITE_URL,
        status: 'No Page Loaded',
        backButtonEnabled: false,
        forwardButtonEnabled: false,
        loading: true,
      };
    },
    goBack: function() {
      this.refs.webViewAndroidSample.goBack(); // you can use this callbacks to control webview
    },
    goForward: function() {
      this.refs.webViewAndroidSample.goForward();
    },
    reload: function() {
      this.refs.webViewAndroidSample.reload();
    },
    onNavigationStateChange: function(event) {
      console.log(event);

      this.setState({
        backButtonEnabled: event.canGoBack,
        forwardButtonEnabled: event.canGoForward,
        url: event.url,
        status: event.title,
        loading: event.loading
      });
    },
    _panResponder: {},
    componentWillMount: function(){
      this._panResponder = PanResponder.create({
         onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
         onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
         onPanResponderGrant: this._handlePanResponderGrant,
         onPanResponderMove: this._handlePanResponderMove,
         onPanResponderRelease: this._handlePanResponderEnd,
         onPanResponderTerminate: this._handlePanResponderEnd,
    });
  },

    render: function() {

      return (
        <WebViewAndroid
        ref="webViewAndroidSample"
        javaScriptEnabled={true}
        geolocationEnabled={false}
        builtInZoomControls={false}
        onNavigationStateChange={this.onNavigationStateChange}
        url={SITE_URL}
        style={styles.containerWebView}
        {...this._panResponder.panHandlers}
        />
      );
    },
    _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
      return true;
    },
    _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
      return true;
    },
    _handlePanResponderGrant: function(e: Object, gestureState: Object) {
      console.log(e);
    },
    _handlePanResponderMove: function(e: Object, gestureState: Object) {

    },
    _handlePanResponderEnd: function(e: Object, gestureState: Object) {

    },
});

var styles = StyleSheet.create({
  containerWebView: {
    flex: 1,
  }
});

AppRegistry.registerComponent('farmApp', () => MapExample);
