import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose
      .connect(dbUrl, {
        serverSelectionTimeoutMS: 40000,
        socketTimeoutMS: 55000,
        retryWrites: true,
        maxPoolSize: 10,
      })
      .then((data: any) => {
        console.log(`Database connected with ${data.connection.host}`);
      });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
