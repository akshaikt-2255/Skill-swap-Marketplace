import { createSlice } from '@reduxjs/toolkit';
import { createUser, getUser,updateUser,fetchUsersWithSkills } from './api/userThunk';

const initialState = {
  user: null,
  usersWithSkills: [],
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
    builder.addCase(getUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not fetch user';
    });

    builder.addCase(updateUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload?.user,
      };
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not update user';
    });
    builder.addCase(fetchUsersWithSkills.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchUsersWithSkills.fulfilled, (state, action) => {
      state.usersWithSkills = action.payload;
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(fetchUsersWithSkills.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Could not fetch users with skills';
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
