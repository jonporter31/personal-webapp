import { combineReducers } from 'redux';
import Main from './mainReducer';
import Account from './accountReducer';


export default combineReducers({
 Main,
 Account
});