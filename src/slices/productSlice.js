import { createSlice } from "@reduxjs/toolkit";
import apiCalls from "../utils/apiCalls";

const initialState = [];
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
