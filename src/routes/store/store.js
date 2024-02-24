import { combineReducers } from "redux";
import userReducer from './reducers/user'
import showLoginReducer from './reducers/login'
import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

const setMiddlewares = [
  logger
]

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
}

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    user : userReducer,
    showLogin : showLoginReducer
  })
)

const store = configureStore({
  reducer : rootReducer,
  middleware : (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({serializableCheck : {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }}).concat(setMiddlewares);
    return middlewares;
  }
})

const persistor = persistStore(store);

export {store, persistor}
export default store;