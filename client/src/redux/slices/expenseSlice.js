import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: [],
  reducers: {
    addExp: (state, action) => {
      const { remark, amount, category } = action.payload;
      state.push({
        remark,
        amount,
        category,
      });
    },
    subExp: (state, action) => (state -= action.payload),
  },
});

export const { addExp, subExp } = expenseSlice.actions;
export default expenseSlice.reducer;
