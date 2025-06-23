import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Import your auth slice
import { baseApi } from "./api/baseApi";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
 
// Handle storage creation for SSR
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// Configuration for persisting only the accessToken from authSlice
const persistConfig = {
  key: "tiktok_voteing",
  storage,
  whitelist: ["auth"], // Persist only the accessToken
  blacklist: ["baseApi"], // Don't persist userInfo
};

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,

  auth: authReducer,
  // Regular auth reducer (will be persisted separately)
};

// Create persisted reducer for the auth slice
const persistedAuthReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

// Configure store with persisted authReducer and baseApi reducer
export const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware), // Add baseApi middleware
});

export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// // import authReducer from "./features/auth/authSlice";
// import authReducer from "./slices/authSlice";
// // import { baseApi } from "./api/baseApi";
// import { baseApi } from "./api/baseApi";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist/es/constants";

// const persistConfig = {
//   key: "auth",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, authReducer);
// // Combine Reducers
// const rootReducer = combineReducers({
//   auth: persistedReducer,
//   [baseApi.reducerPath]: baseApi.reducer,
// });

// // ✅ FIX: Ensure RTK Query Middleware is added
// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(baseApi.middleware), // ✅ Add API middleware
// });

// // ✅ Pass store instance to persistStore
// export const persistor = persistStore(store);
