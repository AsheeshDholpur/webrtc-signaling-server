// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins (or restrict to your domain)
    methods: ["GET", "POST"]
  }
});

io.on("connection", socket => {
  console.log("User connected");

  socket.on("join", room => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("signal", ({ room, data }) => {
    socket.to(room).emit("signal", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
