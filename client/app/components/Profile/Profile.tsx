"use client";
import { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useGetAllUserCoursesQuery } from "@/redux/features/course/courseApi";
import CourseCard from "../Course/CourseCard";
import Loader from "../Common/Loader/Loader";
import Link from "next/link";
const Profile = ({ user }: { user: any }) => {
  const [scroll, setScroll] = useState(false);
  const [courses, setCourses] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const { data, isLoading } = useGetAllUserCoursesQuery(undefined, {});
  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(data);
  useEffect(() => {
    if (data?.courses && user?.courses) {
      const filteredCourses = user.courses
        .map((userCourse: any) => {
          return data.courses.find(
            (course: any) => course._id === userCourse._id
          );
        })
        .filter((course: any) => course !== undefined);

      setCourses(filteredCourses);
    }
  }, [data, user]);
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] 800px:min-w-[310px]  h-[450px] bg-indigo-100 border-indigo-50 dark:bg-slate-900 bg-opacity-90 border dark:border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px] `}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active == 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
      {active == 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}

      {active === 3 && (
        <div className="w-full mx-10 h-full bg-transparent mt-[80px]">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} isProfile={true} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
