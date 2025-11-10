import { styles } from "@/app/styles/style";
import CoursePlayer from "../../../utils/CoursePlayer";
import Ratings from "../../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
}: Props) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="inline mt-10 rounded-xl overflow-hidden ring-1 ring-gray-200/60 dark:ring-white/10 shadow-sm bg-white/5 dark:bg-white/[0.03]">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>

        {/* Price row - styles only */}
        <div className="mt-4 flex items-end gap-3 sm:gap-4">
          <h1 className="text-3xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
            {courseData?.price === 0 ? "Free" : `${courseData?.price}$`}
          </h1>

          <h5 className="text-lg line-through text-gray-500 dark:text-gray-400/80">
            {courseData?.estimatedPrice}$
          </h5>

          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 text-xs font-semibold shadow-sm">
            {discountPercentagePrice}% Off
          </span>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 hover:brightness-105 transition`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Discount code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0 bg-white/50 dark:bg-white/[0.04] ring-1 ring-gray-300 dark:ring-white/10 focus:ring-2 focus:ring-blue-500/60 focus:outline-none placeholder-gray-500 dark:placeholder-gray-500 rounded-lg`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 hover:scale-[1.02] transition`}
          >
            Apply
          </div>
        </div>

        <p className="pb-1 text-sm text-gray-700 dark:text-gray-300">
          * Source code included
        </p>
        <p className="pb-1 text-sm text-gray-700 dark:text-gray-300">
          * Full lifetime access
        </p>
        <p className="pb-1 text-sm text-gray-700 dark:text-gray-300">
          * Certificate of compleition
        </p>
        <p className="pb-3 800px:pb-1 text-sm text-gray-700 dark:text-gray-300">
          * Premium support
        </p>
      </div>

      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600] tracking-tight">
            {courseData?.name}
          </h1>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <Ratings rating={0} />
              <h5 className="text-sm text-gray-600 dark:text-gray-300">
                0 Reviews
              </h5>
            </div>
            <h5 className="text-sm text-gray-600 dark:text-gray-300">
              0 Students Enrolled
            </h5>
          </div>

          <br />
          <h1 className="text-[25px] font-Poppins font-[600] tracking-tight">
            What you will learn from this course?
          </h1>
        </div>

        {courseData?.benefits?.map((item: any, index: number) => (
          <div
            className="w-full flex 800px:items-center py-2 rounded-lg px-3 bg-gray-50 dark:bg-white/[0.04] ring-1 ring-gray-200/60 dark:ring-white/10"
            key={index}
          >
            <div className="w-[15px] mr-1 text-blue-600 dark:text-blue-400">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2 text-[15px] leading-6">{item.title}</p>
          </div>
        ))}

        <br />
        <h1 className="text-[25px] font-Poppins font-[600] tracking-tight">
          What are the pre-requisites before starting this course?
        </h1>

        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div
            className="w-full flex 800px:items-center py-2 rounded-lg px-3 bg-gray-50 dark:bg-white/[0.04] ring-1 ring-gray-200/60 dark:ring-white/10"
            key={index}
          >
            <div className="w-[15px] mr-1 text-blue-600 dark:text-blue-400">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2 text-[15px] leading-6">{item.title}</p>
          </div>
        ))}

        <br />
        {/* Course Description */}
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600] tracking-tight">
            Course Details
          </h1>
          <p className="text-[16px] mt-[20px] whitespace-pre-line w-full overflow-hidden leading-7 text-gray-800 dark:text-gray-300 bg-white/50 dark:bg-white/[0.04] ring-1 ring-gray-200/60 dark:ring-white/10 rounded-lg p-4">
            {courseData?.description}
          </p>
        </div>

        <br />
        <br />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          onClick={() => prevButton()}
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer shadow-sm ring-1 ring-black/5 dark:ring-white/10 hover:brightness-110 transition"
        >
          Prev
        </div>
        <div
          onClick={() => createCourse()}
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer shadow-sm ring-1 ring-black/5 dark:ring-white/10 hover:brightness-110 transition"
        >
          {isEdit ? "Update" : "Create"} Course
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
