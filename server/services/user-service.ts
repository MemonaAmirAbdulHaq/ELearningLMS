import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user-model";

// Get User by ID
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(200).json({
      success: true,
      user,
    });
  }
};

// Get All Users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    users,
  });
};

// Update User Role
export const updateUserRoleService = async (
  res: Response,
  email: string,
  role: string
) => {
  const user = await userModel.findOneAndUpdate(
    { email },
    { role },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user,
  });
};
