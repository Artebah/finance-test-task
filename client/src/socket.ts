import io from "socket.io-client";

export const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("client works");
  socket.emit("start");
});
