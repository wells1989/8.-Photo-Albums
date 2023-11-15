import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { faker } from '@faker-js/faker';

const addUser = createAsyncThunk('users/add', async (newName) => {
    const response = await axios.post('http://localhost:3005/users', {
        name: newName
    });

    return response.data;
})

export { addUser };
