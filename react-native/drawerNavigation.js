import React from 'react-native';
var {View, Text, StyleSheet, TouchableOpacity} = React;
var Icon = require('react-native-vector-icons/MaterialIcons');

var DrawerNavigation = React.createClass({
  render(){
    return(
        <View style={styles.container}>
          <TouchableOpacity style={styles.navItem}>
            <Icon
              name="person"
              size={30}
              style={styles.navItemIcon}
              color="#16a092"
              />
            <Text style={styles.navItemLabel}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon
              name="flight"
              size={30}
              style={styles.navItemIcon}
              color="#16a092"
              />
            <Text style={styles.navItemLabel}>Flight Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon
              name="edit"
              size={25}
              style={styles.navItemIcon}
              color="#16a092"
              />
            <Text style={styles.navItemLabel}>Editor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon
              name="timelapse"
              size={25}
              style={styles.navItemIcon}
              color="#16a092"
              />
            <Text style={styles.navItemLabel}>Flight History</Text>
          </TouchableOpacity>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    top:25,
    position: 'relative',
    paddingTop: 15,
  },
  navItem:{
    flexDirection: 'row',
    paddingTop:10,
    paddingBottom:10,
  },
  navItemIcon:{
    width:60,
    textAlign:'center',
  },
  navItemLabel:{
    fontSize: 20,
  },
});

module.exports = DrawerNavigation;
