import  { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./Chat.css";
import { useSelector } from "react-redux";

const Chat = ({receiver}) => {
  const {user,users} = useSelector((state) => state.user);
  const { sellerName, username } = useParams();
  const receiverName = !sellerName ? receiver : sellerName
  const senderName = !username ? user?.username : username
  const userId = user?._id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    // Connect to Socket.io server
    const newSocket = io("http://localhost:4000", {
      query: { senderName, receiverName },
    });
    setSocket(newSocket);
    
    newSocket.emit("join", { senderId: senderName, receiverId: receiverName });

    newSocket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => newSocket.disconnect();
  }, [senderName, receiverName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/chat/getMessages/${senderName}/${receiverName}`
        );
        const data = await response.json();
        if (!data.error) {
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    if (socket) {
      fetchData();
    }
  }, [socket, senderName, receiverName]);

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("sendMessage", {
        senderId: senderName,
        receiverId: receiverName,
        message: { text: message },
      });

      setMessage("");
    }
  };

  const isSender = (sender) => sender === senderName;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getName = (sender,users,receiver) => {
    if(!sender) {
      const receiverData = users.find((user) => user.username === receiver)
      return receiverData?.name;
    }
    const senderData = users.find((user) => user.id === sender);
    return senderData?.name
  }

  return (
    <div className="messenger">
      <div className="chatBoxTop">
        {messages?.map((msg, index) => (
          <div
            key={index}
            ref={scrollRef}
            className={
              isSender(msg.sender === userId ? user?.username : msg.sender)
                ? "messageSender"
                : "messageReceiver"
            }
          >
            <strong>
              {msg.sender === userId ? user?.name : getName(msg?.sender,users,receiverName)}:{" "}
            </strong>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chatBoxBottom">
        <textarea
          className="chatMessageInput"
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="chatSubmitButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
