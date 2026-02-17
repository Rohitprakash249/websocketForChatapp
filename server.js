const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "https://websocket-frontend-mauve.vercel.app", // React app URL
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Receive message from client
  socket.on("create_offer", (data) => {
    // console.log("Message received:", data);

    // Broadcast to all clients
    // io.emit("receive_message", data);
    socket.broadcast.emit("create_answer", data);
  });

  socket.on("create_answer", (data) => {
    socket.broadcast.emit("add_answer", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
app.get("/", (req, res) => res.send("its working"));
server.listen(8080, () => {
  console.log("Server running on port 8080");
});
