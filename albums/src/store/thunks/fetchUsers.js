import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');
    // will get back list of users via response.data property

    // DEV ONLY!!
    await pause(1000);

    return response.data;
});

// 1st argument = the base type with an extra action type (e.g. users/fetch/pending) and if it was successful or not would be users/fetch/fulfilled or users/fetch/rejected

// DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

export { fetchUsers };