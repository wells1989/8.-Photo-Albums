import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from './apis/AlbumsApi'
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        // connecting albumsApi to the albums state, linking it to 'reducerPath: 'albums'' in AlbumsApi.js
        [photosApi.reducerPath]: photosApi.reducer

    },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware)
        },
        // whenever we create an api, a set of middleware is also connected for us, so we need to connect it to the Api as shown above
});


setupListeners(store.dispatch);

export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/AlbumsApi' 
export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } from './apis/photosApi'