import { createSlice } from "@reduxjs/toolkit";

const revenSlice = createSlice({
  name: "revenue",
  initialState: 0,
  reducers: {
    addRev: (state, action) => state + action.payload,
    subRev: (state, action) => state - action.payload,
  },
});

export const { addRev, subRev } = expenreven.actions;
export default revenSlice.reducer;
