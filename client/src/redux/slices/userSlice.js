import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user", async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    pending: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.pending = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.pending = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
