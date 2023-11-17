import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
    reducerPath: 'photos',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'        
    }),

    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => { // 3rd argument often arg, but = whatever is inside () in the query hook, i.e. here = album
                    const tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id}
                    });

                    tags.push({ type: 'AlbumPhoto', id: album.id});
                    return tags;
                },
            /* above:
                - first takes the results of the query (i.e. the photos, and for each provides an individual tag with that photo's id, under type photo)
                - then adds to the tags array the AlbumPhoto type, with the id of the album.id

                - Now (below) can invalidate the 'Photo' tag for that photo e.g. if it's deleted, which re-fetches the data
                - And also invalidates the 'AlbumPhoto' tag, e.g. when a photo is added, which will re-render the albums photos immediately
            */

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
            
            addPhoto: builder.mutation({
                // invalidates the AlbumPhoto, re-fetching all that album's photos
                invalidatesTags: (result, error, album) => {
                   return [{ type: 'AlbumPhoto', id: album.id}] 
                },

                query: ({album, state}) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            url: state.url, // check docs!
                            albumId: album.id,
                        },  
                    }
                }
            }),

            removePhoto: builder.mutation({
                // invalidates the 'Photo' type when it is deleted
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