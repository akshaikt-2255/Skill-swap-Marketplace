import { createSlice } from '@reduxjs/toolkit';
import { createUser, getUser } from './api/userThunk';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle createUser
    builder.addCase(createUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Could not create user';
    });
    // Handle getUser
    builder.addCase(getUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not fetch user';
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
