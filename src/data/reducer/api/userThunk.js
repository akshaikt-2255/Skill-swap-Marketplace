import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const createUserApi = async (userData) => {
  const response = await fetch("http://localhost:4000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log({ errorData });
    throw new Error(errorData.message || "Could not create user");
  }

  return await response.json();
};

const getUserApi = async (userData) => {
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
};

const updateUserApi = async (userData) => {
  const response = await fetch("http://localhost:4000/api/auth/updateUser", {
    method: "PUT",
    body: userData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not update user");
  }

  return await response.json();
};

const checkUserPassword = async (userData) => {
  const response = await fetch("http://localhost:4000/api/auth/checkPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Password check failed");
  }

  return await response.json();
};

const fetchUsersWithSkillsApi = async () => {
  const response = await fetch("http://localhost:4000/api/auth/skills", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not fetch users with skills");
  }

  return await response.json();
};

const followUserApi = async (currentUserId, followUserId) => {
  const response = await fetch("http://localhost:4000/api/auth/follow", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      currentUserId,
      followId: followUserId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not follow the user");
  }

  return await response.json();
};

export const getConversations = async (conversationId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/auth/conversations/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export const getUsernameById = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/auth/username/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export const getUsernameByEmail = async (email) => {
  try {
    const response = await fetch("http://localhost:4000/api/auth/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    return response.json();
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/auth/user/id/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/auth/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

const createEventApi = async (eventData) => {
  const response = await fetch("http://localhost:4000/api/events/create", {
    method: "POST",
    body: eventData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not create event");
  }

  return await response.json();
};

const getEventsByHostIdApi = async (hostId) => {
  const response = await fetch(`http://localhost:4000/api/events/host/${hostId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not fetch events for the host");
  }

  return await response.json();
};

const getAllEventsApi = async (hostId) => {
  const response = await fetch(`http://localhost:4000/api/events/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not fetch events for the host");
  }

  return await response.json();
};

const deleteEventApi = async (eventId) => {
  const response = await fetch(`http://localhost:4000/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not delete event");
  }

  return await response.json();
};




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
      return rejectWithValue(error.message || "Could not fetch events for the host");
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
      return rejectWithValue(error.message || "Could not fetch events for the host");
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


const getEventByIdApi = async (eventId) => {
  const response = await fetch(`http://localhost:4000/api/events/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not fetch event by ID");
  }

  return await response.json();
};

const updateEventApi = async (eventId, eventData) => {
  console.log({eventData})
  const response = await fetch(`http://localhost:4000/api/events/${eventId}`, {
    method: "PUT",
    body: eventData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not update event");
  }

  return await response.json();
};

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
      console.log({formData})
      const updatedEvent = await updateEventApi(eventId, formData);
      return updatedEvent;
    } catch (error) {
      return rejectWithValue(error.message || "Could not update event");
    }
  }
);
