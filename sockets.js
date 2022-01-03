let readyPlayerCount = 0;

function listen(io) {
  io.on("connection", (socket) => {
    let room;
    console.log(`User connected as ${socket.id}`);

    socket.on("ready", () => {
      room = `room::${Math.floor(readyPlayerCount / 2)}`;

      readyPlayerCount++;

      console.log(`Player ready: ${socket.id}. Room #${room}`);
      console.log(`Total ready players: ${readyPlayerCount}`);

      socket.join(room);

      if (!(readyPlayerCount % 2)) {
        console.log("Game is ready");

        io.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", ({ xPosition }) =>
      socket.to(room).emit("paddleMove", xPosition)
    );

    socket.on("ballMove", ({ ballX, ballY, score }) =>
      socket.to(room).emit("ballMove", { ballX, ballY, score })
    );

    socket.on("disconnect", (reason) => {
      console.log(`${socket.id} disconnected. Reason: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = { listen };
