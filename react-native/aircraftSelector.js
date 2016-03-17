import React from 'react-native';
var {View, Text, StyleSheet, TouchableOpacity, ListView} = React;
var Icon = require('react-native-vector-icons/MaterialIcons');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

var AircraftSelector = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState(){
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2 });
    return{
      aircraft:"No Aircraft Selected",
      dataSource: ds.cloneWithRows(['Aircraft 1', 'Aircraft 2']),
      picker: false,
    };
  },
  componentDidMount(){
    this.addListeners();
  },
  componentWillUnmount(){
    this.removeListeners();
  },
  addListeners(){
    this.addListenerOn(this.props.events, 'dropdown', this.triggerDropdown);
  },
  removeListeners(){
    this.removeListenerOn(this.props.events, 'dropdown');
  },
  triggerDropdown(){
    this.setState({
      picker: !this.state.picker,
    });
  },
  pressRow(rowData){
    this.props.events.emit('selectAircraft', {aircraft: rowData});
    this.setState({
      picker: false,
    });
  },
  renderRow(rowData: string, sectionId: number, rowID: number){
    return(
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.pressRow(rowData)}>
        <Text style={styles.name}>{rowData}</Text>
      </TouchableOpacity>
    );
  },
  render(){
    return(
      <View style={styles.container}>
        {this.state.picker &&
          <ListView
            style={styles.picker}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
      }
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container:{
    position:'absolute',
    top:85,
    right:20,
    flex:1,
  },
  picker:{
    backgroundColor:'#f9f9f9',
    padding:5,
    flex:1,
    elevation:5,
  },
  row:{
    padding:10,
  },
  name:{
    fontSize:18,
  }
});

module.exports = AircraftSelector;


// <Picker
//   style={styles.headerIcon}
//   mode="dropdown"
//   selectedValue={this.state.language}
//   onValueChange={(lang) => this.setState({language: lang})}>
//   <Picker.Item label="Java" value="java" />
//   <Picker.Item label="JavaScript" value="js" />
// </Picker>
