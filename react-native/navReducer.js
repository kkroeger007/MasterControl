'use strict';

const React = require('react-native');
const {
  NavigationExperimental,
} = React;
const {
  Reducer: NavigationReducer,
} = NavigationExperimental;
const StackReducer = NavigationReducer.StackReducer;
const NavigationStackReducer = NavigationReducer.NavigationStackReducer;

import type {NavigationState} from 'NavigationTypeDefinition';

export type HawkeyeNavigationState = {
  externalExample: ?string;
  stack: NavigationState;
};

const HawkeyeReducer = NavigationStackReducer({
  initialState:{
    key: 'Root',
    index:0,
    children:[
      {key: 'Home'},
    ]
  },
  getPushedReducerForAction: (action) => {
    return null;
  },
});

// let state = HawkeyeReducer(null, {type: 'InitAction'});


module.exports = HawkeyeReducer;
