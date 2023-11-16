import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from './apis/AlbumsApi'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer 
        // connecting albumsApi to the albums state, linking it to WHATEVER string is in the reducerPath in albumsApi
        
        // i.e. line 'reducerPath: 'albums'' in AlbumsApi.js
    },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
            .concat(albumsApi.middleware);
        }
});

// temporary (can thus in devtools use console log store.getState() to see state and queries / mutations etc)
window.store = store;

setupListeners(store.dispatch);

export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'
export { useFetchAlbumsQuery, useAddAlbumMutation } from './apis/AlbumsApi' 
