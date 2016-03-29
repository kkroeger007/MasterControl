import React from 'react-native';
var {View, Text, StyleSheet, TouchableOpacity, Component} = React;
var Icon = require('react-native-vector-icons/MaterialIcons');

class DrawerNavigation extends React.Component {
  componentDidMount(){

  }
  handleNavigationPress(id){
    this.props.eventEmitter.emit('drawerItemClicked', {id: id});
  }
  handleFlightModeChange(mode){
    this.props.eventEmitter.emit('changeFlightMode', {mode: mode});
  }
  render(){
    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.handleFlightModeChange("live")} style={styles.navItem}>
            <Icon
              name="flight"
              size={30}
              style={styles.navItemIcon}
              color="#16a092"
              />
            <Text style={styles.navItemLabel}>Live Flight</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFlightModeChange("editor")} style={styles.navItem}>
            <Icon
              name="edit"
              size={25}
              style={styles.navItemIcon}
              color="#16a092"
              />
            <Text style={styles.navItemLabel}>Editor</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleNavigationPress(2)} style={styles.navItem}>
            <Icon
              name="settings"
              size={30}
              style={styles.navItemIcon}
              color="#16a092"
              />
            <Text style={styles.navItemLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

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
    paddingTop:20,
    paddingBottom:20,
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
