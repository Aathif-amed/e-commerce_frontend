import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCalls = createApi({
  reducerPath: "apiCalls",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
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
          token: userToken,
        },
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({ product_id, userToken }) => ({
        url: `/product/deleteProduct/${product_id}`,
        method: "DELETE",
        headers: {
          token: userToken,
        },
      }),
    }),

    updateProduct: builder.mutation({
      query: (product, userToken) => ({
        url: `/product/updateProduct/${product.id}`,
        body: product,
        method: "PATCH",
        headers: {
          token: userToken,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateProductMutation,
  // useAddToCartMutation,
  // useRemoveFromCartMutation,
  // useIncreaseCartProductMutation,
  // useDecreaseCartProductMutation,
  // useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = apiCalls;
export default apiCalls;
