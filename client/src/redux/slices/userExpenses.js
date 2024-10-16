import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchUserExpense = createAsyncThunk(
  "userExpenses",
  async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const userExpenseSlice = createSlice({
  name: "userExpenses",
  initialState: {
    userExpenses: [],
    pending: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserExpense.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userExpenses = action.payload;
        state.isError = false;
      })
      .addCase(fetchUserExpense.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default userExpenseSlice.reducer;
