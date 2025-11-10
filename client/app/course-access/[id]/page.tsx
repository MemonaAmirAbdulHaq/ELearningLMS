"use client";
import Loader from "@/app/components/Common/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import CourseContent from "../../components/Course/CourseContent";
type Props = {
  params: any;
};
const Page = ({ params }: Props) => {
  const id = params.id;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        redirect("/");
      }

      if (error) {
        toast.error("You need to login first!");
        redirect("/");
      }
    }
  }, [data, error, id]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default Page;
