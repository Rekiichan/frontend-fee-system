import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const licensePlateApi = createApi({
  reducerPath: "licensePlateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://thuphigiaothong.com:8080/api/",
  }),
  endpoints: (builder) => ({
    getLicensePlates: builder.query({
      query: () => `information`,
    }),
  }),
});

export const { useGetLicensePlatesQuery } = licensePlateApi;
