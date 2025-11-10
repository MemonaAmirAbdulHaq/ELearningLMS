import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: any) => void;
};
const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleFileChange = (e: any) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div className="">
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="React redux full stack course"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            cols={30}
            rows={8}
            id="description"
            placeholder="Explain the course in detail..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="25"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`}>
              Estimated Price (Optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="14"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Tags</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="React, Redux, Beginner-Friendly, MERN"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Category</label>
            <select
              className={`${styles.input} text-white`}
              name="category"
              id="category"
              value={courseInfo.cateogry}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
            >
              <option className="text-black" value="">
                Select Category
              </option>
              {categories.map((item: any) => (
                <option
                  className="text-black"
                  value={item.title}
                  key={item._id}
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expoert"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Demo Url</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer23fs"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] cursor-pointer dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={
                  courseInfo.thumbnail.url
                    ? courseInfo.thumbnail.url
                    : courseInfo.thumbnail
                }
                alt="thumbnail"
                className="max-w-full w-full object-cover"
              />
            ) : (
              <span>Drag and drop your thumbnail here or click to browse</span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
