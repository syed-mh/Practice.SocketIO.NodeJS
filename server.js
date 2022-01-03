const api = require("./api");
const sockets = require("./sockets");
const server = require("http").createServer(api);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

server.listen(3000);

sockets.listen(io);

console.log(`Server is running on port ${PORT}`);
