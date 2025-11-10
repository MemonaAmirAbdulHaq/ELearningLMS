import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Ratings from "@/app/utils/Ratings";
import { styles } from "@/app/styles/style";

// Updated data with real people's photos from Unsplash
const reviewsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=400&h=400&fit=crop&crop=face",
    profession: "Full Stack Developer",
    comment:
      "The courses here are absolutely amazing! I've learned so much and the instructors are top-notch. The interactive content keeps me engaged throughout.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    profession: "Data Scientist",
    comment:
      "Excellent platform for learning. The course structure is well-organized and the practical examples really help in understanding complex concepts.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    profession: "UX Designer",
    comment:
      "I love how comprehensive the courses are. From beginner to advanced, there's something for everyone. Highly recommended!",
    rating: 4,
  },
  {
    id: 4,
    name: "David Wilson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    profession: "Software Engineer",
    comment:
      "The quality of education here is outstanding. The instructors are knowledgeable and the course materials are up-to-date with industry standards.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    profession: "Product Manager",
    comment:
      "Great learning experience! The courses are well-structured and the community support is fantastic. I've gained valuable skills for my career.",
    rating: 4,
  },
  {
    id: 6,
    name: "James Anderson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    profession: "Marketing Specialist",
    comment:
      "The platform offers incredible value for money. The variety of courses and the quality of instruction exceeded my expectations.",
    rating: 5,
  },
];

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
            {review.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {review.profession}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <Ratings rating={review.rating} />
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          ({review.rating}/5)
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
        &quot;{review.comment}&quot;
      </p>
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our amazing
            students have to say about their learning experience.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          {/* <div className="inline-flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors cursor-pointer"> */}
          <div className={`${styles.button} py-4 px-8 gap-4`}>
            <span className="font-semibold">
              Join Thousands of Happy Students
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
