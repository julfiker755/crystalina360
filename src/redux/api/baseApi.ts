import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { envs } from '@/lib/envs';


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl:envs.api_url as string,
  }),
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
