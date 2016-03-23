import React from 'react-native';

var Leaflet = require('./leaflet');

var LeafletWrapper = React.createClass({
  render(){
    return(
      <Leaflet />
    );
  },
});

module.exports = LeafletWrapper;
