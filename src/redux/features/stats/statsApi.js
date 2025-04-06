import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const statsApi = createApi({
    reducerPath: 'statsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/stats`,
        credentials: 'include'
    }),
    tagTypes: ["Stats"],
    endpoints: (builder) => ({
        getUsersStats: builder.query({
            query: (email) => `/user-stats/${email}`,
            providesTags: ["Stats"],
        }),
        getAdminsStats: builder.query({
            query: () => `/admin-stats`,
            providesTags: ["Stats"],
        }),
    })
})

export const { useGetUsersStatsQuery, useGetAdminsStatsQuery } = statsApi;
export default statsApi;