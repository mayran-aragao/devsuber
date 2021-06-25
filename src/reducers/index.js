import { combineReducers } from 'redux';
import userReducer from './userReducer';
import runReducer from './runReducer';

export default combineReducers({
    userReducer,
    runReducer
});