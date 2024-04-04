import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  attendEventApi,
  checkUserPassword,
  createEventApi,
  createUserApi,
  deleteEventApi,
  fetchUsersWithSkillsApi,
  followUserApi,
  getAllEventsApi,
  getConversations,
  getEventByIdApi,
  getEventsByHostIdApi,
  getUserApi,
  getUserById,
  getUsernameById,
  getUsers,
  removeFollowerApi,
  sendOtpApi,
  unfollowApi,
  updateEventApi,
  updateUserApi,
} from "./apiRequest";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log({ userData });
      const response = await createUserApi(userData);
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.message || "Could not create user");
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await getUserApi(userData);
      console.log({ response });
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.username);
        return {
          user: response.user,
        };
      } else {
        console.log("error");
        throw new Error("Token not found in the response");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Could not fetch user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Could not update user");
    }
  }
);

export const checkUserPasswordThunk = createAsyncThunk(
  "user/checkPassword",
  async (userData, thunkAPI) => {
    try {
      const { isPasswordCorrect } = await checkUserPassword(userData);
      return { userData, isPasswordCorrect };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.error || "Password check failed"
      );
    }
  }
);

export const fetchUsersWithSkills = createAsyncThunk(
  "users/fetchUsersWithSkills",
  async (_, { rejectWithValue }) => {
    try {
      const users = await fetchUsersWithSkillsApi();
      return users;
    } catch (error) {
      return rejectWithValue(
        error.message || "Could not fetch users with skills"
      );
    }
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async ({ currentUserId, followUserId }, { rejectWithValue }) => {
    try {
      const result = await followUserApi(currentUserId, followUserId);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Could not follow the user");
    }
  }
);

export const getConversationsThunk = createAsyncThunk(
  "user/getConversations",
  async (conversationId, thunkAPI) => {
    try {
      const response = await getConversations(conversationId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.error || "Could not fetch conversations"
      );
    }
  }
);

export const getUsernameByIdThunk = createAsyncThunk(
  "user/getUsernameById",
  async (userId, thunkAPI) => {
    try {
      const response = await getUsernameById(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.error || "Could not fetch username"
      );
    }
  }
);

export const getUserByIdThunk = createAsyncThunk(
  "auth/getUserById",
  async (userId, thunkAPI) => {
    try {
      const response = await getUserById(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.error || "Could not fetch user details"
      );
    }
  }
);

export const getUsersThunk = createAsyncThunk(
  "auth/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await getUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.error || "Could not fetch users"
      );
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await createEventApi(eventData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Could not create event");
    }
  }
);

export const getEventsByHostId = createAsyncThunk(
  "events/getEventsByHostId",
  async (hostId, { rejectWithValue }) => {
    try {
      const events = await getEventsByHostIdApi(hostId);
      return events;
    } catch (error) {
      return rejectWithValue(
        error.message || "Could not fetch events for the host"
      );
    }
  }
);

export const getAllEventsThunk = createAsyncThunk(
  "events/getAllEventsThunk",
  async (hostId, { rejectWithValue }) => {
    try {
      const events = await getAllEventsApi(hostId);
      return events;
    } catch (error) {
      return rejectWithValue(
        error.message || "Could not fetch events for the host"
      );
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const deletedEvent = await deleteEventApi(eventId);
      return deletedEvent;
    } catch (error) {
      return rejectWithValue(error.message || "Could not delete event");
    }
  }
);

export const getEventById = createAsyncThunk(
  "events/getEventById",
  async (eventId, { rejectWithValue }) => {
    try {
      const event = await getEventByIdApi(eventId);
      return event;
    } catch (error) {
      return rejectWithValue(error.message || "Could not fetch event");
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ eventId, formData }, { rejectWithValue }) => {
    try {
      console.log({ formData });
      const updatedEvent = await updateEventApi(eventId, formData);
      return updatedEvent;
    } catch (error) {
      return rejectWithValue(error.message || "Could not update event");
    }
  }
);

export const removeFollower = createAsyncThunk(
  "users/removeFollower",
  async ({ userId, followerId }, { rejectWithValue }) => {
    try {
      const result = await removeFollowerApi(userId, followerId);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Could not remove follower");
    }
  }
);

export const unfollow = createAsyncThunk(
  "users/unfollow",
  async ({ userId, followingId }, { rejectWithValue }) => {
    try {
      const result = await unfollowApi(userId, followingId);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Could not unfollow the user");
    }
  }
);

export const attendEvent = createAsyncThunk(
  "events/attendEvent",
  async ({ eventId, userId }, { rejectWithValue }) => {
    try {
      const response = await attendEventApi(eventId, userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Could not attend the event");
    }
  }
);

export const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await sendOtpApi(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Could not send OTP");
    }
  }
);
