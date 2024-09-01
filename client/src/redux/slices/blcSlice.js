import { createSlice } from "@reduxjs/toolkit";

const blcSlice = createSlice({
  name: "balance",
  initialState: 0,
  reducers: {
    addBlc: (state, action) => state + action.payload,
    subBlc: (state, action) => state - action.payload,
  },
});

export const { addBlc, subBlc } = blcSlice.actions;
export default blcSlice.reducer;
