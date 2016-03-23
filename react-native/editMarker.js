import React from 'react-native';
var {View, TouchableOpacity, Text, StyleSheet} = React;

var EditMarker = React.createClass({
  handleType(type){
    return type;
  },
  render(){
    return(
        <View style={styles.editPoint}>
          <View style={styles.editPointHeader}>
            <View style={styles.id}>
              <Text>{this.props.data.id}</Text>
            </View>
            <View style={styles.type}>
              <Text>{this.handleType(this.props.data.type)}</Text>
            </View>
          </View>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  editPoint:{
    position: 'absolute',
    right:10,
    flex:1,
    top:120,
    width:100,
    height:100,
  },
  editPointHeader:{
    backgroundColor:'red',
  }
});

module.exports = EditMarker;
