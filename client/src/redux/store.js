import { configureStore } from "@reduxjs/toolkit";
import blcReducer from "./slices/blcSlice";
import expenseReducer from "./slices/expenseSlice";

const store = configureStore({
  reducer: {
    balance: blcReducer,
    expense: expenseReducer,
  },
});

export default store;
