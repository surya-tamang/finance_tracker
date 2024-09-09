import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addUser = createAsyncThunk(
  "addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8520/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add user");
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the slice
const addUserSlice = createSlice({
  name: "addUser",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMsg: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.payload || action.error.message;
      });
  },
});

export default addUserSlice.reducer;
