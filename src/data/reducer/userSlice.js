import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  getUser,
  updateUser,
  fetchUsersWithSkills,
  followUser,
  getUsersThunk,
  getUserByIdThunk,
  getConversationsThunk,
  getUsernameByIdThunk,
  createEvent,
  getEventsByHostId,
  getAllEventsThunk,
  deleteEvent,
  attendEvent,
} from "./api/userThunk";

const initialState = {
  user: null,
  usersWithSkills: [],
  status: "idle",
  error: null,
  users: [],
  conversations: {},
  username: "",
  myEvents: [],
  allEvents: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    updateFollowing(state, action) {
      // Add the followed user's ID to the following array
      state.user.following.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle createUser
    builder.addCase(createUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Could not create user";
    });
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Could not fetch user";
    });

    builder.addCase(updateUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload?.user,
      };
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Could not update user";
    });
    builder.addCase(fetchUsersWithSkills.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchUsersWithSkills.fulfilled, (state, action) => {
      state.usersWithSkills = action.payload;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(fetchUsersWithSkills.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Could not fetch users with skills";
    });
    builder.addCase(followUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      if (!state.user.following.includes(action.payload.followId)) {
        state.user.following.push(action.payload.followId);
      }
      state.status = "succeeded";
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Could not follow user";
    });
    builder.addCase(getConversationsThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getConversationsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.conversations = action.payload;
    });
    builder.addCase(getConversationsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getUsernameByIdThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsernameByIdThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.username = action.payload?.username;
      state.status = "succeeded";
    });
    builder.addCase(getUsernameByIdThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getUserByIdThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserByIdThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.status = "succeeded";
    });
    builder.addCase(getUserByIdThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getUsersThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    });
    builder.addCase(getUsersThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(createEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.myEvents.push(action.payload);
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Could not create the event";
    });
    builder
      .addCase(getEventsByHostId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEventsByHostId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myEvents = action.payload;
      })
      .addCase(getEventsByHostId.rejected, (state, action) => {
        state.status = "failed";
        state.myEvents = [];
        state.error = action.payload || "Failed to fetch events for the host";
      });
      builder
      .addCase(getAllEventsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllEventsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allEvents = action.payload;
      })
      .addCase(getAllEventsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.allEvents = [];
        state.error = action.payload || "Failed to fetch events";
      });
      builder
      .addCase(deleteEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myEvents = state.myEvents.filter(event => event._id !== action.meta.arg);
        state.allEvents = state.allEvents.filter(event => event._id !== action.meta.arg);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete the event";
      });
      builder
      .addCase(attendEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(attendEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(attendEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to attend the event";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
