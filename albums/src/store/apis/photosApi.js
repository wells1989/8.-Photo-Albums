import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const photosApi = createApi({
    reducerPath: 'photos',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'        
    }),

    endpoints(builder) {
        return {
            // fetchPhotos query
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => { 
                    const tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id}
                    });

                    tags.push({ type: 'AlbumPhoto', id: album.id});
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id
                        },
                        method: 'GET'
                    };
                }
            }),
            
            // addPhoto mutation
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                   return [{ type: 'AlbumPhoto', id: album.id}] 
                },

                query: ({album, localState}) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            url: localState.url,
                            albumId: album.id,
                        },  
                    }
                }
            }),

            // removePhoto mutation
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id}] 
                 },
                query: (photo) => {
                    return {
                        method: 'DELETE',
                        url: `/photos/${photo.id}`
                    }
                }
            })
        };
    }
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi }