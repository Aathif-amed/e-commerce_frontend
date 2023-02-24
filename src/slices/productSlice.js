import { createSlice } from "@reduxjs/toolkit";
import apiCalls from "../utils/apiCalls";

const initialState = [];

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiCalls.endpoints.createProduct.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      apiCalls.endpoints.updateProduct.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      apiCalls.endpoints.deleteProduct.matchFulfilled,
      (_, { payload }) => payload
    );
  },
});

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;
