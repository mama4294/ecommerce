import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import logger from 'redux-logger';

import { loggerMiddleware } from "./middleware/logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"], // blacklist user authentication
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === "development" && loggerMiddleware,
].filter(Boolean); // remove falsy values

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
