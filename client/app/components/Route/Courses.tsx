import { useGetAllUserCoursesQuery } from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import Loader from "../Common/Loader/Loader";

const Courses = () => {
  const { data, isLoading } = useGetAllUserCoursesQuery(undefined, {});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`w-[90%] 800px:w-[80%] m-auto`}>
          <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl 800px:!leading-[60px] font-[700] tracking-tight">
            Expand Your Career{" "}
            <span className="text-grdient text-blue-800">Oppurtunity</span>{" "}
            <br />
            Oppurtunities With our Courses
          </h1>
          <br />
          <br />
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
