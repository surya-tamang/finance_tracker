import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import userExpenseReducer from "./slices/userExpenses";
import userRevenueReduce from "./slices/userRevenues";

const store = configureStore({
  reducer: {
    user: userReducer,
    userExpenses: userExpenseReducer,
    userRevenues: userRevenueReduce,
  },
});

export default store;
