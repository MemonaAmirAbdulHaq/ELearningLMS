import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import CourseContentList from "./CourseContentList";
import { format } from "timeago.js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import defaultAvatar from "../../../public/assets/avatar.jpg";
import Image from "next/image";
import Loader from "../Common/Loader/Loader";
import { useSelector } from "react-redux";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setOpen: any;
  setRoute: any;
};
const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setOpen: authModel,
  setRoute,
}: Props) => {
  const { user: authUser } = useSelector((state: any) => state.auth);
  const {
    data: userData,
    isLoading,
    refetch: userRefetch,
  } = useLoadUserQuery(undefined, {});
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  useEffect(() => {
    if (authUser) {
      userRefetch();
    }
  }, [authUser, userRefetch]);

  const discountPercentage =
    ((data.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      authModel(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="bg-gray-50 dark:bg-gray-900">
            <div className="w-[90%] 800px:w-[90%] m-auto py-8">
              <div className="w-full flex flex-col-reverse 800px:flex-row gap-8">
                {/* Main Content */}
                <div className="w-full 800px:w-[65%]">
                  {/* Course Title */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
                    <h1 className="text-[28px] 800px:text-[32px] font-Poppins font-[700] text-gray-900 dark:text-white mb-4">
                      {data.name}
                    </h1>
                    <div className="flex flex-col 800px:flex-row 800px:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Ratings rating={data.ratings} />
                        <span className="text-[16px] text-gray-600 dark:text-gray-300">
                          ({data?.reviews?.length} Reviews)
                        </span>
                      </div>
                      <div className="text-[16px] text-blue-600 dark:text-blue-400 font-medium">
                        {data.purchased} Students Enrolled
                      </div>
                    </div>
                  </div>

                  {/* What you will learn */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
                    <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white mb-6">
                      What you will learn from this course?
                    </h2>
                    <div className="grid grid-cols-1 800px:grid-cols-2 gap-4">
                      {data?.benefits.map((item: any, index: number) => (
                        <div
                          className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                          key={index}
                        >
                          <IoCheckmarkDoneOutline
                            size={20}
                            className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0"
                          />
                          <p className="text-[16px] text-gray-700 dark:text-gray-300">
                            {item.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
                    <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white mb-6">
                      What are the pre-requisites before starting this course?
                    </h2>
                    <div className="space-y-3">
                      {data?.prerequisites?.map((item: any, index: number) => (
                        <div
                          className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                          key={index}
                        >
                          <IoCheckmarkDoneOutline
                            size={20}
                            className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0"
                          />
                          <p className="text-[16px] text-gray-700 dark:text-gray-300">
                            {item.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Overview */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
                    <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white mb-6">
                      Course Overview
                    </h2>
                    <CourseContentList data={data?.courseData} isDemo={true} />
                  </div>

                  {/* Course Description */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
                    <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white mb-6">
                      Course Details
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-[16px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {data.description}
                      </p>
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <div className="flex flex-col 800px:flex-row 800px:items-center gap-4 mb-8">
                      <Ratings rating={data?.ratings} />
                      <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white">
                        {Number.isInteger(data?.ratings)
                          ? data?.ratings.toFixed(1)
                          : data?.ratings.toFixed(2)}{" "}
                        Course Rating • {data?.reviews?.length} Reviews
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {(data.reviews && [...data.reviews].reverse()).map(
                        (item: any, index: number) => (
                          <div
                            key={index}
                            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                          >
                            <div className="flex gap-4">
                              <div className="">
                                <Image
                                  alt="user-img"
                                  src={item?.user?.avatar?.url || defaultAvatar}
                                  width={50}
                                  height={50}
                                  className="h-[50px] w-[50px] object-contain rounded-full"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col 800px:flex-row 800px:items-center gap-2 800px:gap-4 mb-3">
                                  <h3 className="text-[18px] font-Poppins font-[600] text-gray-900 dark:text-white">
                                    {item.user.name}
                                  </h3>
                                  <Ratings rating={item.rating} />
                                  <span className="text-[14px] text-gray-500 dark:text-gray-400">
                                    {format(item.createdAt)}
                                  </span>
                                </div>
                                <p className="text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {item.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="w-full 800px:w-[35%]">
                  <div className="sticky top-[100px]">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                      <CoursePlayer
                        videoUrl={data?.demoUrl}
                        title={data?.title}
                      />

                      <div className="p-6">
                        {/* Pricing */}
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-[32px] font-Poppins font-[700] text-blue-600 dark:text-blue-400">
                            {data?.price === 0 ? "Free" : `$${data.price}`}
                          </span>
                          {data.estimatedPrice > data.price && (
                            <>
                              <span className="text-[20px] text-gray-500 line-through">
                                ${data.estimatedPrice}
                              </span>
                              <span className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-full text-[14px] font-medium">
                                {discountPercentagePrice}% OFF
                              </span>
                            </>
                          )}
                        </div>

                        {/* Purchase Button */}
                        <div className="mb-6">
                          {isPurchased ? (
                            <Link
                              href={`/course-access/${data._id}`}
                              className="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-Poppins font-[600] py-4 px-6 rounded-lg transition-colors text-[16px]"
                            >
                              Access Course
                            </Link>
                          ) : (
                            <button
                              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-Poppins font-[600] py-4 px-6 rounded-lg transition-colors text-[16px]"
                              onClick={handleOrder}
                            >
                              Purchase for ${data.price}
                            </button>
                          )}
                        </div>

                        {/* Course Features */}
                        <div className="space-y-3 text-[15px]">
                          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <IoCheckmarkDoneOutline
                              className="text-green-600 dark:text-green-400"
                              size={18}
                            />
                            <span>Source code included</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <IoCheckmarkDoneOutline
                              className="text-green-600 dark:text-green-400"
                              size={18}
                            />
                            <span>Full lifetime access</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <IoCheckmarkDoneOutline
                              className="text-green-600 dark:text-green-400"
                              size={18}
                            />
                            <span>Certificate of completion</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <IoCheckmarkDoneOutline
                              className="text-green-600 dark:text-green-400"
                              size={18}
                            />
                            <span>Premium support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <>
            {open && (
              <div className="w-full h-screen bg-black/50 fixed top-0 left-0 z-[9999] flex items-center justify-center">
                <div className="w-[90%] max-w-[500px] h-[85vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-Poppins font-[600] text-gray-900 dark:text-white">
                      Complete Your Purchase
                    </h3>
                    <IoCloseOutline
                      size={24}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <div className="w-full">
                    {stripePromise && clientSecret ? (
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret }}
                      >
                        <CheckoutForm
                          setOpen={setOpen}
                          data={data}
                          user={user}
                        />
                      </Elements>
                    ) : (
                      <div className="p-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                          Loading payment form...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
