import { combineReducers } from 'redux';
import AuthReducer from './AuthReducers';
import BlogReducers from './BlogReducers';


export default combineReducers({
    auth: AuthReducer,
    blog: BlogReducers
});