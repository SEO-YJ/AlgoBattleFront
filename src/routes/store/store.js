import { combineReducers } from "redux";
import userReducer from './reducers/user'
import showLoginReducer from './reducers/modal/login'
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user : userReducer,
  showLogin : showLoginReducer
})

const store = configureStore({
  reducer : rootReducer
})

export default store;