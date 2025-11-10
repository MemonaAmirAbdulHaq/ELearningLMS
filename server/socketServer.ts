import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    console.log("A user has been connected to socket server");

    // Listen for "notification" from the frontend
    socket.on("notification", (data) => {
      // Broadcast the notification to all connected admins
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected from socket server");
    });
  });
};
