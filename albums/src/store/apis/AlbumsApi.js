import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const albumsApi = createApi({
    reducerPath: 'albums',
    
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        
    }),
   
    endpoints(builder) {
        return {

        // deleting album mutation ...
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    
                    return [{ type: 'Album', id: album.id}]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    };
                }
            }),    

        // adding Albums mutation ...
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                   return [{ type: 'UsersAlbums', id: user.id}] 
                },
                query: ({user, localState}) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: localState.newAlbum
                        }
                    }
                }
            }),

        // fetching Albums query ...
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map((album) => {
                        return { type: 'Album', id: album.id}
                    }); 
                    
                    tags.push({ type: 'UsersAlbums', id: user.id})
                    return tags;
                },
                
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

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi }
