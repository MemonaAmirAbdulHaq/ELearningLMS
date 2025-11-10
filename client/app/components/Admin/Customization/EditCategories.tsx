import {
  useGetHeroDataQuery,
  useUpdateHeroDataMutation,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Common/Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

const EditCategories = () => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [updateHeroData, { isSuccess, error, reset }] =
    useUpdateHeroDataMutation();

  const [categories, setCategories] = useState<any>([]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((i: any) =>
        i._id === id ? { ...i, title: value } : i
      )
    );
  };

  const newCategoryHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Fill previous fields first!");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await updateHeroData({
        type: "Categories",
        categories,
      });
    }
  };
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Hero categories updated successfully!");
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
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories.map((item: any, index: number) => (
            <div key={index} className="p-3">
              <div className="flex items-center w-full justify-center">
                <input
                  className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                  value={item.title}
                  onChange={(e) =>
                    handleCategoriesAdd(item._id, e.target.value)
                  }
                  placeholder="Category title..."
                />
                <AiOutlineDelete
                  className="text-[18px] cursor-pointer"
                  onClick={() => {
                    setCategories((prevCategories: any) =>
                      prevCategories.filter((i: any) => i._id !== item._id)
                    );
                  }}
                />
              </div>
            </div>
          ))}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="text-[25px] cursor-pointer"
              onClick={newCategoryHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] bg-[#cccccc34]
          ${
            areCategoriesUnchanged(data.layout.categories, categories) ||
            isAnyCategoryTitleEmpty(categories)
              ? "!cursor-not-allowed"
              : "!cursor-pointer !bg-[#42d383]"
          }
          !rounded absolute bottom-12 right-12
          `}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
