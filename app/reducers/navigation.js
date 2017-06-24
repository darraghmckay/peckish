import { NavigationExperimental, StatusBar} from 'react-native';
import ActionTypes from '../constants/ActionTypes'
import createReducer from '../lib/createReducer'
import ApplicationTabs from '../components/ApplicationTabs'
import Detail from '../components/Detail'

const {
 CardStack: NavigationCardStack,
 StateUtils: NavigationStateUtils
} = NavigationExperimental

const allTabs = [
  (lastRoute) => lastRoute || Object.assign({ key: 'home', index: 0 }),
  (lastRoute) => lastRoute || Object.assign({ key: 'about', index: 1 }),
];

const INITIAL_STATE = {
  index: 0, 
  key: 'home', 
  routes: allTabs
}

export const tabs = createReducer(INITIAL_STATE, {
  [ActionTypes.SET_TAB](state, action) {
    return Object.assign({}, state,  allTabs[action.index]());
  }
});

export const navigationState = createReducer({ index: 0,
    routes: [
      { key: 'ApplicationTabs',  },
      { key: 'Detail' },
    ]
  }, {

  [ActionTypes.NAVIGATION_FORWARD](state, action) {
    return NavigationStateUtils.forward(state);
  },

  [ActionTypes.NAVIGATION_BACK](state, action) {
    return NavigationStateUtils.back(state);
  },

});

export const navigationParams = createReducer({ }, {
  [ActionTypes.NAVIGATION_FORWARD](state, action) {
    return action.state;
  },

});
