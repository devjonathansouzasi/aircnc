require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());

app.use(express.json());

app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(routes);

server.listen(process.env.PORT, process.env.HOST);
