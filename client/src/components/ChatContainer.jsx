import React, { Component, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import queryString from "query-string";

// Import Mui Components
import { Grid } from "@material-ui/core";

// Import App Components
import ChatMessageInput from "./ChatMessageInput";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import { useHistory } from "react-router";

const ENDPOINT = "http://localhost:5000";
let socket;

export default ({ location, setError }) => {
  document
    .querySelector("body")
    .setAttribute("style", "margin: 0; padding: 0; background-color: #fefefe");

  const history = useHistory();

  const [participants, setParticipans] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [userRoom, setUserRoom] = useState("");
  const [userColor, setUserColor] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [userTyping, setUserTyping] = useState([]);
  const [sendLoading, setSendLoading] = useState(false);

  useEffect(() => {
    const { name, room, color } = queryString.parse(location.search);

    socket = socketIOClient(ENDPOINT);

    setUserName(name);
    setUserRoom(room);
    setUserColor(color);

    socket.emit("join", { name, room, color }, (err) => {
      if (err) {
        setError(err);
        history.push("/");
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("get-party", (users) => {
      setParticipans(users);
    });

    socket.on("message", (msg) => {
      setMessages((prevMsg) => [...prevMsg, msg]);
      setSendLoading(false);
    });

    socket.on("user-typing", (user) => {
      if (!userTyping.includes(user)) {
        setUserTyping((prevUserTyping) => [...prevUserTyping, user]);
      }
    });

    socket.on("user-not-typing", (user) => {
      setUserTyping(userTyping.filter((user) => user !== user));
    });
  }, []);

  useEffect(() => {
    const user = { user: userName, color: userColor };

    if (userMessage.length === 1) {
      socket.emit("user-typing", user);
    } else if (userMessage.length === 0) {
      socket.emit("user-not-typing", user);
    }
  }, [userMessage]);

  const handleUserMessage = (event) => {
    setUserMessage(event.target.value);
  };

  const sendMessage = () => {
    if (userMessage) {
      setUserMessage("");
      setSendLoading(true);
      socket.emit("sendMessage", userMessage, () => {});
    }
  };

  return (
    <>
      <ChatHeader userRoom={userRoom} participants={participants} />
      <ChatMessages
        messages={messages}
        userName={userName}
        userTyping={userTyping}
      />
      <ChatMessageInput
        userMessage={userMessage}
        handleUserMessage={handleUserMessage}
        sendMessage={sendMessage}
        loading={sendLoading}
      />
    </>
  );
};
