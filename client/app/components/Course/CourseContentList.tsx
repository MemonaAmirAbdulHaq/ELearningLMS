import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BiTime } from "react-icons/bi";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList = (props: Props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Find Unique Video
  const videoSections: string[] = [
    ...new Set<string>(
      props.data?.map((item: any, index: number) => item.videoSection)
    ),
  ];

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !props.isDemo &&
        `px-4 min-h-screen sticky top-24 left-0 z-30 overflow-hidden`
      }`}
    >
      <div className="space-y-4">
        {videoSections.map((section: string, sectionIndex: number) => {
          const isSectionVisible = visibleSections.has(section);

          // Filtering videos by sections
          const sectionVideos: any[] = props.data.filter(
            (item: any) => item.videoSection === section
          );
          const sectionVideoCount: number = sectionVideos.length;
          const sectionVideoLength: number = sectionVideos.reduce(
            (totalLength: number, item: any) => totalLength + item.videoLength,
            0
          );
          const sectionStartIndex: number = totalCount;
          totalCount += sectionVideoCount;

          const sectionContentHours: number = sectionVideoLength / 60;

          return (
            <div
              className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${
                !props.isDemo
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
              key={sectionIndex}
            >
              {/* Section Header */}
              <div className="w-full">
                <button
                  className="w-full cursor-pointer flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => toggleSection(section)}
                >
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-[18px] font-Poppins font-[600] text-gray-900 dark:text-white mb-2 truncate">
                      {section}
                    </h3>
                    <div className="flex items-center gap-4 text-[14px] text-gray-600 dark:text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MdOutlineOndemandVideo size={16} />
                        {sectionVideoCount} Lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <BiTime size={16} />
                        {sectionVideoLength < 60
                          ? `${sectionVideoLength} minutes`
                          : `${sectionContentHours.toFixed(1)} hours`}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {isSectionVisible ? (
                      <BsChevronUp
                        size={20}
                        className="text-gray-600 dark:text-gray-400"
                      />
                    ) : (
                      <BsChevronDown
                        size={20}
                        className="text-gray-600 dark:text-gray-400"
                      />
                    )}
                  </div>
                </button>
              </div>

              {/* Section Content */}
              {isSectionVisible && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {sectionVideos.map((item: any, index: number) => {
                      const videoIndex: number = sectionStartIndex + index;
                      const contentLength: number = item.videoLength / 60;

                      return (
                        <div
                          className={`w-full transition-all duration-200 ${
                            videoIndex === props.activeVideo
                              ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                              : "hover:bg-gray-50 dark:hover:bg-gray-700"
                          } ${
                            !props.isDemo ? "cursor-pointer" : "cursor-default"
                          }`}
                          key={item._id}
                          onClick={() =>
                            props.isDemo
                              ? null
                              : props?.setActiveVideo(videoIndex)
                          }
                        >
                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <MdOutlineOndemandVideo
                                  size={20}
                                  className={`${
                                    videoIndex === props.activeVideo
                                      ? "text-blue-600 dark:text-blue-400"
                                      : "text-gray-500 dark:text-gray-400"
                                  }`}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`text-[15px] font-Poppins font-[500] leading-relaxed break-words ${
                                    videoIndex === props.activeVideo
                                      ? "text-blue-900 dark:text-blue-100"
                                      : "text-gray-900 dark:text-white"
                                  }`}
                                >
                                  {item.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <BiTime
                                    size={14}
                                    className="text-gray-500 dark:text-gray-400"
                                  />
                                  <span className="text-[13px] text-gray-600 dark:text-gray-400">
                                    {item.videoLength > 60
                                      ? `${contentLength.toFixed(1)} hours`
                                      : `${item.videoLength} minutes`}
                                  </span>
                                  {videoIndex === props.activeVideo && (
                                    <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[11px] rounded-full font-medium">
                                      Currently Playing
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseContentList;
