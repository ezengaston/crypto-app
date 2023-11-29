import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "content-type": "application/json",
  "x-rapidapi-host": "google-api31.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_NEWS,
};

const baseUrl = "https://google-api31.p.rapidapi.com";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => ({
        headers: cryptoNewsHeaders,
        method: "POST",
        body: {
          text: newsCategory,
          region: "wt-wt",
          max_results: count,
        },
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
