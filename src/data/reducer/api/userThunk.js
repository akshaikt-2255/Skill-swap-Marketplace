import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const createUserApi = async (userData) => {
  const response = await fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log({errorData})
    throw new Error(errorData.message || 'Could not create user');
  }

  return await response.json();
};

const getUserApi = async (userData) => {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json();
};

const updateUserApi = async (userData) => {
  const response = await fetch('http://localhost:4000/api/auth/updateUser', {
    method: 'PUT', 
    body: userData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Could not update user');
  }

  return await response.json();
};

const checkUserPassword = async (userData) => {
  const response = await fetch('http://localhost:4000/api/auth/checkPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Password check failed');
  }

  return await response.json();
};


export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log({userData})
      const response = await createUserApi(userData);
      console.log({response})
      return response.data; 
    } catch (error) {
      console.log({error})
      return rejectWithValue(error.message || 'Could not create user');
    }
  }
);


export const getUser = createAsyncThunk(
  'user/getUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await getUserApi(userData);
      console.log({response})
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        return {
          user: response.user,
        }
      } else {
        console.log("error")
        throw new Error('Token not found in the response');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Could not fetch user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Could not update user');
    }
  }
);

export const checkUserPasswordThunk = createAsyncThunk(
  'user/checkPassword',
  async (userData, thunkAPI) => {
    try {
      const {isPasswordCorrect} = await checkUserPassword(userData);
      return { userData, isPasswordCorrect };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error || 'Password check failed');
    }
  }
);

