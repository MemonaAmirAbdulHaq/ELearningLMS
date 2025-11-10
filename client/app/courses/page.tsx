"use client";
import { useGetAllUserCoursesQuery } from "@/redux/features/course/courseApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Loader from "../components/Common/Loader/Loader";
import Header from "../components/Header";
import PageHead from "../components/Common/PageHead";
import CourseCard from "../components/Course/CourseCard";
import { BiSearch } from "react-icons/bi";
import { MdFilterList } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";

// Separate component for search params logic
const CoursesContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetAllUserCoursesQuery(undefined, {});
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filteredCourses = data?.courses || [];

    // First apply search filter if search exists
    if (search) {
      filteredCourses = filteredCourses.filter((item: any) =>
        item?.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Then apply category filter if not "All"
    if (category !== "All") {
      filteredCourses = filteredCourses.filter(
        (item: any) => item.category === category
      );
    }

    setCourses(filteredCourses);
  }, [category, search, data]);

  const categories = categoriesData?.layout.categories;
  const totalCourses = courses?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />

          <PageHead
            title={"All Courses - ELearning"}
            description="ELearning is an interactive E-Learning platform where all students can learn and grow together"
            keywords="Online Learning, Learning, LMS, Programming, Tech"
          />

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
            <div className="w-[95%] lg:w-[85%] mx-auto py-12 lg:py-16">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HiAcademicCap className="text-6xl lg:text-7xl" />
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold font-Poppins mb-4">
                  Explore Our Courses
                </h1>
                <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
                  Discover amazing courses to enhance your skills and advance
                  your career
                </p>
                {search && (
                  <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                    <p className="flex items-center justify-center gap-2">
                      <BiSearch className="text-xl" />
                      Searching for:{" "}
                      <span className="font-semibold">
                        &quot;{search}&quot;
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-[95%] lg:w-[85%] mx-auto py-8">
            {/* Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 lg:p-6 mb-8">
              {/* Mobile Filter Toggle */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-lg font-Poppins font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MdFilterList />
                  {showFilters ? "Hide" : "Show"} Filters
                </button>
              </div>

              {/* Filter Categories */}
              <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-Poppins font-semibold text-gray-900 dark:text-white">
                    Categories
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {totalCourses} course{totalCourses !== 1 ? "s" : ""} found
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {/* All Categories Button */}
                  <button
                    className={`px-4 py-2 rounded-full font-Poppins font-medium text-sm lg:text-base transition-all duration-300 ${
                      category === "All"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => setCategory("All")}
                  >
                    All Categories
                  </button>

                  {/* Category Buttons */}
                  {categories &&
                    categories.map((item: any, index: number) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-full font-Poppins font-medium text-sm lg:text-base transition-all duration-300 ${
                          category === item.title
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                        onClick={() => setCategory(item.title)}
                      >
                        {item.title}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* No Courses Found */}
            {courses && courses.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 lg:p-12 max-w-md mx-auto">
                  <div className="text-6xl lg:text-7xl text-gray-300 dark:text-gray-600 mb-6">
                    📚
                  </div>
                  <h3 className="text-xl lg:text-2xl font-Poppins font-semibold text-gray-900 dark:text-white mb-4">
                    No Courses Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {search
                      ? `We couldn't find any courses matching "${search}"`
                      : `No courses available in the "${category}" category right now.`}
                  </p>
                  {category !== "All" && (
                    <button
                      onClick={() => setCategory("All")}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-Poppins font-medium"
                    >
                      View All Courses
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Courses Grid */}
            {courses && courses.length > 0 && (
              <div className="space-y-6">
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl lg:text-2xl font-Poppins font-semibold text-gray-900 dark:text-white">
                    {search
                      ? `Search Results`
                      : category === "All"
                      ? "All Courses"
                      : `${category} Courses`}
                  </h2>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {totalCourses} of {data?.courses?.length || 0}{" "}
                    courses
                  </div>
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                  {courses.map((item: any, index: number) => (
                    <div key={index}>
                      <CourseCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State for Categories */}
            {categoriesLoading && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
                  <div className="flex gap-3 flex-wrap">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-20"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesContent />
    </Suspense>
  );
};

export default Page;
