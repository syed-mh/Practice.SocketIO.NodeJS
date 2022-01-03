const socket = io();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("chat", {
    message: document.querySelector("input").value,
  });

  e.target.reset();
});

socket.emit("connection");

socket.on("connect", () => {
  const chatId = socket.id;
  console.log(`Connected as ${chatId}`);
  document.querySelector("h2").innerText = `Chat ID: ${chatId}`;
});
socket.on("chat", (message) => console.log(message));
