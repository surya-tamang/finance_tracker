import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for adding a user
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8520/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Handling error response
        throw new Error(errorData.message || "Failed to add user");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

const addUserSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMsg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMsg = "";
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
