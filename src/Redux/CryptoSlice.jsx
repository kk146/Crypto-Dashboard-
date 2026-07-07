import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "usd",
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = cryptoSlice.actions;
export default cryptoSlice.reducer;
