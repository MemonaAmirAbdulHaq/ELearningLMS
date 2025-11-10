"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatarIcon from "../../../public/assets/avatar.jpg";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
type Props = {
  user: any;
  avatar: string | null;
};
const ProfileInfo = ({ user, avatar }: Props) => {
  const [name, setName] = useState(user && user.name);
  const [courses, setCourses] = useState([]);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: editError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      if (isSuccess) {
        toast.success("Avatar updated successfully");
      } else if (success) {
        toast.success("User info updated successfully");
      }
      setLoadUser(true);
    }
    if (error || editError) {
      if (editError) {
        if ("data" in editError) {
          // Fix the editError data access
          const editErrorData = editError.data as {
            success?: boolean;
            message?: string;
          };
          toast.error(editErrorData?.message || "Login failed");
        } else {
          // Handle other types of errors
          toast.error("An unexpected error occurred");
        }
      }
      if (error) {
        if ("data" in error) {
          // Fix the error data access
          const errorData = error.data as {
            success?: boolean;
            message?: string;
          };
          toast.error(errorData?.message || "Login failed");
        } else {
          // Handle other types of errors
          toast.error("An unexpected error occurred");
        }
      }
    }
  }, [isSuccess, error, editError, success]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name.length < 3) {
      toast.error("Name should be atleast 3 characters long!");
      return;
    }
    if (name === "") {
      toast.error("Please enter a name!");
      return;
    }
    await editProfile(name);
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            width={120}
            height={120}
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt="profile-icon"
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] dark:bg-slate-900 bg-indigo-100 rounded-full absolute bottom-3 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-not-allowed`}
                required
                readOnly
                value={user?.email}
              />
            </div>
            <input
              type="submit"
              value="Update"
              required
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
