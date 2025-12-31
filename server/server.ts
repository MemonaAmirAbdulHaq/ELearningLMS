import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import connectDB from "./utils/db";
import { initSocketServer } from "./socketServer";
require("dotenv").config();
const server = http.createServer(app);

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_SECRET_KEY as string,
});

// Socket Server Connection

initSocketServer(server);

// Create Server
// server.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
//   connectDB();
// });
connectDB().then(()=>{
    server.listen(process.env.PORT, () => {
      console.log(`Server is connected on the PORT:${process.env.PORT}`);
    
    });
  })