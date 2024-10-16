import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import userExpenseReducer from "./slices/userExpenses";

const store = configureStore({
  reducer: {
    user: userReducer,
    userExpenses: userExpenseReducer,
  },
});

export default store;
