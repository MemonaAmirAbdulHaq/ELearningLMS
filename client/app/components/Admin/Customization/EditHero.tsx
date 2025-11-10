"use client";
import {
  useGetHeroDataQuery,
  useUpdateHeroDataMutation,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

const EditHero = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [updateHeroData, { isSuccess, error, reset }] =
    useUpdateHeroDataMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
  }, [data]);

  // Separate effect for handling success/error
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Hero banner updated successfully!");
      reset(); // Reset the mutation state
    }

    if (error) {
      if ("data" in error) {
        const errorData = error.data as { success?: boolean; message?: string };
        toast.error(errorData?.message || "Update failed");
      } else {
        toast.error("An unexpected error occurred");
      }
      reset(); // Reset the mutation state
    }
  }, [isSuccess, error, refetch, reset]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    await updateHeroData({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-between pl-20 pr-20 p-8">
      <div className="flex justify-start items-center">
        {/* Main circular background */}
        <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center">
          {/* Main image */}
          <div className="relative">
            <img
              src={image || "/api/placeholder/300/300"}
              alt="hero-img"
              className="w-72 h-72 lg:w-96 lg:h-96 object-cover rounded-2xl"
            />

            {/* Camera overlay */}
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label
              htmlFor="banner"
              className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            >
              <AiOutlineCamera className="text-xl text-gray-700" />
            </label>
          </div>
        </div>
      </div>

      {/* Text editing section */}
      <div className="flex flex-col space-y-6 max-w-2xl">
        <div>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Improve Your Online Learning Experience Better Instantly"
            className="w-full text-xl lg:text-4xl font-bold text-black dark:text-white bg-transparent border-none outline-none resize-none leading-tight"
            rows={5}
            style={{ lineHeight: "1.3" }}
          />
        </div>

        <div>
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            className="w-full text-md text-black dark:text-gray-300 bg-transparent border-none outline-none resize-none leading-relaxed"
            rows={3}
          />
        </div>

        {/* Update Button */}
        <div className="pt-4">
          <button
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleSubmit
                : () => null
            }
            className={`px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? "!cursor-pointer !bg-gradient-to-r !from-blue-500 !to-purple-600"
                : "!cursor-not-allowed"
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
