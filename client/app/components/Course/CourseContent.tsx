import { useGetCourseContentQuery } from "@/redux/features/course/courseApi";
import React, { useState } from "react";
import Loader from "../Common/Loader/Loader";
import PageHead from "../Common/PageHead";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
type Props = {
  id: string;
  user: any;
};
const CourseContent = ({ id, user }: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });

  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
            activeItem={1}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <PageHead
              title={data[activeVideo]?.title}
              description="Course video"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
