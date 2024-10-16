import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchUserRevenue = createAsyncThunk(
  "userRevenues",
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

const userRevenueSlice = createSlice({
  name: "userRevenues",
  initialState: {
    data: [],
    pending: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRevenue.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(fetchUserRevenue.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default userRevenueSlice.reducer;
