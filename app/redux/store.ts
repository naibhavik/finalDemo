import { configureStore } from "@reduxjs/toolkit";
import addUserReducer from "./slices/UserSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  middleware: [thunk],
};

const persistedReducer = persistReducer(persistConfig, addUserReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
