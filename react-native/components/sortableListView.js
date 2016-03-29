var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var {
  ListView,
  LayoutAnimation,
  View,
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
  StyleSheet,
} = React;

var WaypointQueueItem = require('../waypointQueueItem');
var Subscribable = require('Subscribable');

let HEIGHT = Dimensions.get('window').height;

var SortableListView = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      markers: this.props.data,
      itemStyles: {
        backgroundColor: '#638ca6',
      },
    };
  },
  componentWillMount(){
    this.addEventListeners();
  },
  addEventListeners(){
      this.addListenerOn(this.props.eventEmitter, 'addedMarker', this.addMarker);
  },
  addMarker(data){
    var dataclone= this.state.markers;
    var id = this.state.markers.length;
    var marker = {id: id, altitude: 66.0, lat: data.position.lat, lon: data.position.lng, type:'waypoint', selected: false};
    dataclone.push(marker);
    this.setState({
      markers: dataclone,
    });
    console.log(this.state.markers);
  },
  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.markers),
    });
  },
  _renderRow(rowData){
    return(
        <WaypointQueueItem data={rowData} handleLongPress={() => this.handleLongPress(rowData)} handlePress={() => this.handlePress(rowData)} style={[styles.item, this.state.markers[rowData.id-1].selected && this.state.itemStyles]}  activeOpacity={0.7}/>
    );
  },
  handlePress(data){
    var dataclone = this.state.markers;
    for(var i=0; i<dataclone.length; i++){
      if(dataclone[i] == data){
        dataclone[i].selected = true;
      }else{
        dataclone[i].selected = false;
      }
    }
    this.setState({
      markers: dataclone,
    });
    this.props.eventEmitter.emit('editMarkerOpen', data);
  },
  handleLongPress(data){
    var dataclone = this.state.markers;
    for(var i=0; i<dataclone.length; i++){
      if(dataclone[i] == data){
        dataclone[i].selected = true;
      }else{
        dataclone[i].selected = false;
      }
    }
    this.setState({
      markers: dataclone,
    })
  },
  deleteItem(){
    this.state.markers.splice(data.id-1, 1);
    this._generateRows();
  },
  render(){
    return(
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderScrollComponent={props => <ScrollView horizontal={true} />}
          ref={this.props.ref}
        />
    );
  }
});

var styles = StyleSheet.create({
  item:{
    backgroundColor: '#16a092',
    padding:10,
    marginLeft:2,
    marginRight:2,
    borderRadius:5,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    alignItems:'center',
  },
});

module.exports = SortableListView;
