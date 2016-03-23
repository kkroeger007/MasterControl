import React from 'react-native';
var {View, Text, TouchableOpacity, StyleSheet} = React;

var Account = React.createClass({
  getInitialState(){
    return{

    };
  },
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>Account</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:100,
  }
});

module.exports = Account;
