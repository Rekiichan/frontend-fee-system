import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://thuphigiaothong.com:8080/api/",
  }),
  endpoints: (builder) => ({
    registerCus: builder.mutation({
      query: (body) => {
        return {
          url: "auth/register/customer",
          method: "POST",
          body,
        };
      },
    }),
    loginCus: builder.mutation({
      query: (body) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useRegisterCusMutation, useLoginCusMutation } = authApi;
