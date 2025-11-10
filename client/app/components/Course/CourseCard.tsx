import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard = ({ item, isProfile }: Props) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={item.thumbnail.url}
            alt="course-thumbnail"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {item.price === 0 ? (
              "Free"
            ) : (
              <div className="flex items-center gap-1">
                <span>${item.price}</span>
                {item.estimatedPrice && item.estimatedPrice > item.price && (
                  <span className="text-xs line-through opacity-75">
                    ${item.estimatedPrice}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Course Title */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {item.name}
          </h3>

          {/* Course Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Pricing Section */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {item.price === 0 ? (
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  Free
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${item.price}
                  </span>
                  {item.estimatedPrice && item.estimatedPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${item.estimatedPrice}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Discount Badge */}
            {item.estimatedPrice &&
              item.estimatedPrice > item.price &&
              item.price > 0 && (
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xs rounded-full font-medium">
                  {Math.round(
                    ((item.estimatedPrice - item.price) / item.estimatedPrice) *
                      100
                  )}
                  % OFF
                </span>
              )}
          </div>

          {/* Course Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <AiOutlineUser className="w-4 h-4" />
              <span>{item.purchased || 0} students</span>
            </div>
            <div className="flex items-center gap-1">
              <MdOndemandVideo className="w-4 h-4" />
              <span>{item.courseData?.length || 0} lectures</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="ml-1 text-sm font-medium">
                {item.ratings?.toFixed(1) ? (
                  <Ratings rating={item.ratings} />
                ) : (
                  "New"
                )}
              </span>
            </div>

            {/* Level Badge */}
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full font-medium">
              {item.level || "Beginner"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
