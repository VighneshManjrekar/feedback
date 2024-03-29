import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import profileReducer from "./reducers/profileReucer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     profile: profileReducer,
//   },
// });

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
