const path = require("path");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
// const io = require('socket.io')()

// Import Controllers
const indexController = require("./controllers/indexController");

// Helper Functions
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", ({ name, room, color }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, color });

    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      type: "notification",
      user: user.name,
      text: `Welcome ${user.name[0].toUpperCase() + user.name.slice(1)}!`,
      color: user.color,
    });

    socket.broadcast.to(user.room).emit("message", {
      type: "notification",
      user: user.name,
      text: `${
        user.name[0].toUpperCase() + user.name.slice(1)
      } has joined the room`,
      color: user.color,
    });

    socket.join(user.room);

    io.to(user.room).emit("get-party", getUsersInRoom(user.room));

    callback();
  });

  socket.on("sendMessage", (msg, callback) => {
    const user = getUser(socket.id);
    const d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    io.to(user.room).emit("message", {
      type: "message",
      user: user.name,
      text: msg,
      time: `${hours}:${minutes}`,
      color: user.color,
    });

    callback();
  });

  socket.on("user-typing", (user) => {
    socket.broadcast.emit("user-typing", user);
  });

  socket.on("user-not-typing", (user) => {
    socket.broadcast.emit("user-not-typing", user);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!");

    const user = getUser(socket.id);

    socket.broadcast.to(user.room).emit("message", {
      type: "notification",
      user: user.name,
      text: `${
        user.name[0].toUpperCase() + user.name.slice(1)
      } has left the room`,
      color: user.color,
    });

    const newUsers = removeUser(socket.id);

    io.to(user.room).emit("get-party", getUsersInRoom(user.room));
  });
});

// Fire Controllers
app.use(indexController);

server.listen(5000, () => console.log("Listening to port 5000"));
// io.listen(5000);
