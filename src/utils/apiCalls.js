import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCalls = createApi({
  reducerPath: "apiCalls",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/user/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
      }),
    }),
    // creating product
    createProduct: builder.mutation({
      query: ({ product, userToken }) => ({
        url: "/product/createProduct",
        body: product,
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({ product_id, user_id, userToken }) => ({
        url: `/product/deleteProduct/${product_id}`,
        method: "DELETE",
        body: {
          user_id,
        },
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ product, userToken }) => ({
        url: `/product/updateProduct/${product.id}`,
        body: product,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }),
    }),
    // add to cart
    addToCart: builder.mutation({
      // remove from cart
      query: ({ cartInfo, userToken }) => ({
        url: "/product/addToCart",
        body: cartInfo,
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }),
    }),

    removeFromCart: builder.mutation({
      query: ({ body, userToken }) => ({
        url: "/product/removeFromCart",
        body,
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }),
    }),

    // increase cart
    increaseCartProduct: builder.mutation({
      query: ({ body, userToken }) => ({
        url: "/product/increaseCart",
        body,
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }),
    }),

    // decrease cart
    decreaseCartProduct: builder.mutation({
      query: ({ body, userToken }) => ({
        url: "/product/decreaseCart",
        body,
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }),
    }),

    // create order
    createOrder: builder.mutation({
      query: ({ body, userToken }) => ({
        url: "/order/create",
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = apiCalls;
export default apiCalls;
