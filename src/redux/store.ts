import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cryptos from "./reducers/crypto";
import valuesCrypto from "./reducers/valuesCrypto";
import favourites from "./reducers/favourites";

export const rootReducer = combineReducers({
  cryptos,
  favourites,
  valuesCrypto,
});
export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
