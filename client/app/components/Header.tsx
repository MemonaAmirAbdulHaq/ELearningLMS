"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NavItems from "./NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle, HiX } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SingUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assets/avatar.jpg";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header = ({ activeItem, open, route, setRoute, setOpen }: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
        }
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login successful");
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [data, userData, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md fixed top-0 left-0 w-full h-[80px] z-[100] border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-500"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm w-full border-b border-gray-200/30 dark:border-gray-700/30 shadow-sm h-[80px] z-[100] transition-all duration-500"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Link className="flex items-center space-x-2 group" href={"/"}>
                
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-Poppins">
                  ELearning
                </span>
              </Link>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <div className="hidden 800px:flex">
                <NavItems activeItem={activeItem} isMobile={false} />
              </div>

              {/* Theme Switcher */}
              <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <ThemeSwitcher />
              </div>

              {/* User Profile/Login */}
              {userData ? (
                <Link href={"/profile"} passHref>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <Image
                      width={40}
                      height={40}
                      src={
                        userData?.user.avatar
                          ? userData?.user.avatar.url
                          : avatar
                      }
                      alt="user-icon"
                      className={`relative w-[40px] h-[40px] rounded-full cursor-pointer object-cover border-2 transition-all duration-300 hidden 800px:block ${
                        activeItem === 5
                          ? "border-blue-500 shadow-lg shadow-blue-500/25"
                          : "border-gray-200 dark:border-gray-700 group-hover:border-blue-500"
                      }`}
                    />
                  </div>
                </Link>
              ) : (
                
  <button
  className="hidden 800px:flex items-center space-x-2 px-4 py-2 
  bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white 
  rounded-2xl border border-fuchsia-400/50 
  hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/40 
  transition-all duration-300 font-medium"
  onClick={() => setOpen(true)}
>
 
                  <HiOutlineUserCircle size={20} />
                  <span>Login</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                className="800px:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setOpenSidebar(true)}
              >
                <HiOutlineMenuAlt3
                  size={24}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Sidebar */}
      {openSidebar && (
        <div
          className="fixed 800px:hidden w-full h-screen top-0 left-0 z-[999999] bg-black/50 backdrop-blur-sm"
          id="screen"
          onClick={handleClose}
        >
          <div className="w-[280px] fixed z-[9999999] h-screen bg-white dark:bg-gray-900 top-0 right-0 shadow-2xl transform transition-transform duration-300 ease-in-out">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <FaGraduationCap className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-Poppins">
                  ELearning
                </span>
              </div>
              <button
                onClick={() => setOpenSidebar(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <HiX size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="px-4 py-6">
              <NavItems activeItem={activeItem} isMobile={true} />
            </div>

            {/* Mobile User Section */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              {userData ? (
                <Link href={"/profile"} passHref>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                    <Image
                      width={40}
                      height={40}
                      src={
                        userData?.user.avatar
                          ? userData?.user.avatar.url
                          : avatar
                      }
                      alt="user-icon"
                      className={`w-[40px] h-[40px] rounded-full object-cover border-2 ${
                        activeItem === 5
                          ? "border-blue-500"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {userData?.user?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        View Profile
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <button
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md font-medium"
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                >
                  <HiOutlineUserCircle size={20} />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Copyright © 2025 ELearning LMS
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
