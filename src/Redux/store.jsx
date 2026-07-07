import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./Currencys";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});
