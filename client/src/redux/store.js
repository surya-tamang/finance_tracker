import { configureStore } from "@reduxjs/toolkit";
import blcReducer from "./slices/blcSlice";
import expenseReducer from "./slices/expenseSlice";
import usersReducer from "./slices/users";
import users from "./slices/users";

const store = configureStore({
  reducer: {
    balance: blcReducer,
    expense: expenseReducer,
    users: usersReducer,
  },
});

export default store;
