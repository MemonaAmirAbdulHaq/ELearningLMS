import { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/features/course/courseApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
type Props = {
  id: any;
};
const EditCourse = ({ id }: Props) => {
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [updateCourse, { isSuccess, error }] = useUpdateCourseMutation();

  const editCourseData = data && data?.courses.find((i: any) => i._id === id);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully!");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        // Fix the error data access
        const errorData = error.data as { success?: boolean; message?: string };
        toast.error(errorData?.message || "Course failed");
      } else {
        // Handle other types of errors
        toast.error("An unexpected error occurred");
      }
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData.estimatedPrice,
        category: editCourseData.category,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail.url,
      });

      // Deep copy benefits array
      setBenefits(
        editCourseData.benefits.map((benefit: any) => ({
          title: benefit.title,
        }))
      );

      // Deep copy prerequisites array
      setPrerequisites(
        editCourseData.prerequisites.map((prerequisite: any) => ({
          title: prerequisite.title,
        }))
      );

      // Deep copy courseContentData array with nested objects
      setCourseContentData(
        editCourseData.courseData.map((content: any) => ({
          videoUrl: content.videoUrl,
          title: content.title,
          description: content.description,
          videoSection: content.videoSection,
          videoLength: content.videoLength,
          suggestion: content.suggestion,
          _id: content._id, // Keep the ID for updates
          links: content.links.map((link: any) => ({
            title: link.title,
            url: link.url,
            _id: link._id, // Keep link IDs if they exist
          })),
          questions: content.questions
            ? content.questions.map((q: any) => ({ ...q }))
            : [],
        }))
      );
    }
  }, [editCourseData]);
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // Format Benefits
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format Prerequisites
    const formattedPrerequisites = prerequisites.map((prequisite) => ({
      title: prequisite.title,
    }));
    // Format Course Content
    const formattedCourseContetnt = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      videoSection: courseContent.videoSection,
      description: courseContent.description,
      videoLength: courseContent.videoLength,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));
    // Forming Data
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      category: courseInfo.category,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContetnt,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await updateCourse({ id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            active={active}
            setActive={setActive}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
