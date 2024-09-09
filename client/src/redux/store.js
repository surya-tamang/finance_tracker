import { configureStore } from "@reduxjs/toolkit";
import blcReducer from "./slices/blcSlice";
import expenseReducer from "./slices/expenseSlice";
import usersReducer from "./slices/users";
import addUserReducer from "./slices/addUser";

const store = configureStore({
  reducer: {
    balance: blcReducer,
    expense: expenseReducer,
    users: usersReducer,
    addUser: addUserReducer,
  },
});

export default store;
