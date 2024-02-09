import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { createUserApi, getUserApi } from '../api/auth'; // Adjust the import paths to match your project structure

const createUserApi = (data) => data;
const getUserApi = (data) => data;
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log({userData})
      const response = await createUserApi(userData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not create user');
    }
  }
);


export const getUser = createAsyncThunk(
  'user/getUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserApi(userId);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not fetch user');
    }
  }
);
