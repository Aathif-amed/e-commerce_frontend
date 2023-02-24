import { createSlice } from "@reduxjs/toolkit";
import apiCalls from "../utils/apiCalls";

const initialState = null;
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiCalls.endpoints.register.matchFulfilled,
      (_, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      apiCalls.endpoints.login.matchFulfilled,
      (_, { payload }) => {
        return payload;
      }
    );
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
