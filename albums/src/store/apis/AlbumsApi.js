import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY !!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

const albumsApi = createApi({
    reducerPath: 'albums',
    
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        
        // DEV ONLY !!!
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    // above, overriding standard fetch function, inputting the pause then returning normal fetch with all the arguments
   
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
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
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
