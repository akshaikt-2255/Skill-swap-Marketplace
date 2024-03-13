import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getConversationsThunk,
  getUserByIdThunk,
  getUsernameByIdThunk,
  getUsersThunk,
} from "../../data/reducer/api/userThunk";
import "./UserList.css";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Icon for the menu

const UserList = ({ onUserSelect }) => {
  const dispatch = useDispatch();
  const { user, conversations, users } = useSelector((state) => state.user);
  const [usernames, setUsernames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    user.chatHistory.forEach((conversationId) => {
      dispatch(getConversationsThunk(conversationId));
    });
  }, [dispatch, user]);

  useEffect(() => {
    if (conversations && conversations.participants) {
      const participantIds = conversations?.participants?.filter(
        (p) => p !== user._id
      );
      const filteredUsers = users
        .filter((u) => participantIds.includes(u.id))
        .map((u) => ({ username: u.username, name: u.name }));

      setUsernames(filteredUsers);
    }
  }, [conversations, users, user]);

  const handleMenuOpen = (event, username) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(username);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteChats = async () => {
    console.log("Delete chats for", selectedUser);

    try {
      // Replace with the actual URL and endpoint
      const response = await fetch(
        `http://localhost:4000/api/auth/user/${selectedUser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
      if (!response.ok) {
        throw new Error("Failed to fetch user ID");
      }
      const data = await response.json();
      const participant1Id = data?.userId;
      const participant2Id = user?._id;
      // Now use this userId to delete chats
      // Replace with your API endpoint to delete chats
      const deleteResponse = await fetch(
        `http://localhost:4000/api/chat/deleteChat/${participant1Id}/${participant2Id}`,
        {
          method: "DELETE",
        }
      );
      if (!deleteResponse.ok) {
        throw new Error("Failed to delete chats");
      }
      setUsernames(usernames.filter((user) => user?.username !== selectedUser));
      handleMenuClose();
    } catch (error) {
      console.error("Error deleting chats:", error);
      // Handle the error appropriately
    }
  };

  return (
    <div className="userList">
      {usernames.map((user, index) => (
        <div key={index} className="userListItem">
          <div
            className="user-container"
            onClick={() => onUserSelect(user?.username)}
          >
            <Avatar alt="Profile Picture" sx={{ width: 50, height: 50 }} />
            <span className="userName">{user?.name}</span>
          </div>
          <IconButton onClick={(e) => handleMenuOpen(e, user?.username)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedUser === user?.username}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDeleteChats}>Delete Chat</MenuItem>
          </Menu>
        </div>
      ))}
    </div>
  );
};

export default UserList;
