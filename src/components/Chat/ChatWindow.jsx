import  { useState,useEffect } from "react";
import Chat from "./Chat";
import UserList from "./UserList"; 
import './ChatWindow.css'
import nochat from "../../assets/noChat.png";
import { getUserByIdThunk } from "../../data/reducer/api/userThunk";
import { useDispatch, useSelector } from "react-redux";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUserByIdThunk(user?._id))
  },[dispatch])

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="chatWindow">
      <div className="userListSection">
        <UserList onUserSelect={handleUserSelect} />
      </div>
      <div className="chatSection">
      {selectedUser ? (
          <Chat receiver={selectedUser} />
        ) : (
          <div className="noChatSelected">
            <img src={nochat} alt="No chat selected" />
            <p style={{fontSize: '30px'}}>No chats selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
