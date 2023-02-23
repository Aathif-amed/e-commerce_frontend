import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import apiCalls from "./utils/apiCalls";

//persist in our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//reducers
const reducer = combineReducers({
  users: userSlice,
  products: productSlice,
  [apiCalls.reducerPath]: apiCalls.reducer,
});
const persistConfig = {
  key: "root",
  storage,
  blackList: [apiCalls.reducerPath, "products"],
};
//persist our store
const persistedReducer = persistReducer(persistConfig, reducer);
// creating the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, apiCalls.middleware],
});

export default store;
