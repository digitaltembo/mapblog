import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';


export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    if (reducer == null) {
        return state;
    }
    if (action.status != null && reducer[action.status] != null) {
        return reducer[action.status](state, action.payload);
    } 
    if (typeof reducer !== 'object') {
        return reducer(state, action.payload)
    }
    return state;
  };
}


const rootReducer = combineReducers({
  routing: routerReducer,
  /* your reducers */
  auth,
});

export default rootReducer;
