import React from 'react-native';
var {View, Text, TouchableOpacity, StyleSheet, ScrollView} = React;
var Accordion = require('react-native-collapsible/Accordion');
var Icon = require('react-native-vector-icons/MaterialIcons');

var SECTIONS = [
  {
    title: 'Application',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Bluetooth',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Communication',
    content: 'Lorem ipsum...',
  },
  {
    title: 'HSI Companion Module',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Mapping',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Planning',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Speech',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Vehicle',
    content: 'Lorem ipsum...',
  },
];

var Settings = React.createClass({
  getInitialState(){
    return{

    };
  },
  _renderHeader(section, index, isActive) {
   return (
     <View style={styles.header}>
       <Text style={styles.headerText}>{section.title}</Text>
       <Icon
         name="keyboard-arrow-down"
         style={[styles.caret, isActive && styles.caretActive]}
         size={24}
          />
     </View>
   );
 },

 _renderContent(section) {
   return (
     <View style={styles.content}>
       <Text>{section.content}</Text>
     </View>
   );
 },
  render(){
    return(
      <ScrollView style={styles.container}>
          <Accordion
             underlayColor="transparent"
             sections={SECTIONS}
             renderHeader={this._renderHeader}
             renderContent={this._renderContent}
           />
       </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:100,
  },
  header:{
    padding:25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText:{
    fontSize:20,
  },
  content:{
    padding:25,
  },
  contentText:{
    fontSize:16,
  },
  caretActive:{
    transform: [{rotate:'-90deg'}]
  },
});

module.exports = Settings;
