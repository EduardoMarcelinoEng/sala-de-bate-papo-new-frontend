import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import pageReducer from './pageReducer';
import userReducer from './userReducer';
import formReducer from './formReducer';
import roomReducer from './roomReducer';

export default combineReducers({
    roomState: roomReducer,
    pageState: pageReducer,
    socketState: socketReducer,
    userState: userReducer,
    formState: formReducer
});