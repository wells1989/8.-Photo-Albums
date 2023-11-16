import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
    // 1st property needed (createApi will automatically create a slice, with state etc) and we use the reducerPath to specify where this state will be stored
    reducerPath: 'albums', // e.g. in state, alreadt have 'state' now has 'albums' too
    
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
   
    endpoints(builder) {
        return {
        // adding Albums mutation ...
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                   return [{ type: 'Album', id: user.id}] 
                }, // invalidates any queries tagged with album when running, so they'll be re-fetched
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: "test 2"
                        }
                    }
                }
            }),
        

        // fetching Albums query ...
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    return [{ type: 'Album', id: user.id }] // providesTags will be called with automatic parameters of result, error, arg (user in this case)so you can get access to the user.id
                },
                // links the tag Album to this query, marking it as stale, then re-fetches data
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET',
                    };
                }  
            })
        }
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi }
