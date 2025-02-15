import { combineReducers } from '@reduxjs/toolkit';
import { AuthReducer }from './AuthReducer.tsx';
// Import your individual reducers here
// import userReducer from './userSlice';

const rootReducer = combineReducers({
  AuthReducer
});

export default rootReducer;