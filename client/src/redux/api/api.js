import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config.js";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
  tagTypes: ["Chat", "User"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/send-request",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: "user/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/accept-request",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export default api;
export const {useMyChatsQuery, useLazySearchUserQuery, useSendFriendRequestMutation, useGetNotificationsQuery, useAcceptFriendRequestMutation} = api