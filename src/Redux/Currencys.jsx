import { createSlice } from "@reduxjs/toolkit";

const Currencys = createSlice({
  name: "currency",

  initialState: {
    currency: "usd",
  },

  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = Currencys.actions;

export default Currencys.reducer;
