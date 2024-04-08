export const createUserApi = async (userData) => {
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

export const getUserApi = async (userData) => {
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

export const updateUserApi = async (userData) => {
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

export const checkUserPassword = async (userData) => {
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

export const fetchUsersWithSkillsApi = async () => {
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

export const followUserApi = async (currentUserId, followUserId) => {
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
      body: JSON.stringify({email}),
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

export const createEventApi = async (eventData) => {
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

export const getEventsByHostIdApi = async (hostId) => {
  const response = await fetch(
    `http://localhost:4000/api/events/host/${hostId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not fetch events for the host");
  }

  return await response.json();
};

export const getAllEventsApi = async (hostId) => {
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

export const deleteEventApi = async (eventId) => {
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

export const getEventByIdApi = async (eventId) => {
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

export const updateEventApi = async (eventId, eventData) => {
  console.log({ eventData });
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

export const removeFollowerApi = async (userId, followerId) => {
  const response = await fetch(
    `http://localhost:4000/api/auth/removeFollower`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId,
        followerId,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not remove follower");
  }

  return await response.json();
};

export const unfollowApi = async (userId, unfollowId) => {
  const response = await fetch(`http://localhost:4000/api/auth/unfollow`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      userId,
      unfollowId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not unfollow the user");
  }

  return await response.json();
};

export const attendEventApi = async (eventId, userId) => {
  const response = await fetch(
    `http://localhost:4000/api/events/${eventId}/attend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not attend the event");
  }

  return await response.json();
};

export const unAttendEventApi = async (eventId, userId) => {
  const response = await fetch(
    `http://localhost:4000/api/events/${eventId}/unattend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not attend the event");
  }

  return await response.json();
};

export const sendOtpApi = async (email) => {
  const response = await fetch("http://localhost:4000/api/auth/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Could not send OTP");
  }

  return await response.json();
};

export const searchApi = async (searchTerm) => {
  const response = await fetch(`http://localhost:4000/api/auth/search?term=${encodeURIComponent(searchTerm)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not perform search");
  }

  return await response.json();
};

