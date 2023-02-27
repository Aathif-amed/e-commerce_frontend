import { createSlice } from "@reduxjs/toolkit";
import apiCalls from "../utils/apiCalls";

const initialState = null;
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: () => initialState,
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    resetNotifications: (state) => {
      state.notifications.forEach((obj) => {
        obj.status = "read";
      });
    },
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
    builder.addMatcher(
      apiCalls.endpoints.addToCart.matchFulfilled,
      (_, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      apiCalls.endpoints.removeFromCart.matchFulfilled,
      (_, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      apiCalls.endpoints.increaseCartProduct.matchFulfilled,
      (_, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      apiCalls.endpoints.decreaseCartProduct.matchFulfilled,
      (_, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      apiCalls.endpoints.createOrder.matchFulfilled,
      (_, { payload }) => {
        return payload;
      }
    );
  },
});

export const { logout, addNotification, resetNotifications } =
  userSlice.actions;

export default userSlice.reducer;
