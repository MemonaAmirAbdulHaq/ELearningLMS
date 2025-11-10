import {
  useGetHeroDataQuery,
  useUpdateHeroDataMutation,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Common/Loader/Loader";

const EditFaq = () => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [updateHeroData, { isSuccess, error, reset }] =
    useUpdateHeroDataMutation();
  const [questions, setQuestions] = useState<any>([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setQuestions(data.layout.faq);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Hero faq updated successfully!");
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
  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions: any) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions: any) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, question: value } : q
      )
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions: any) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, answer: value } : q
      )
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: Date.now(), // Add unique ID for new questions
        question: "",
        answer: "",
        active: true, // Open new questions by default
      },
    ]);
  };

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await updateHeroData({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Edit FAQ
              </h2>

              <div className="space-y-6">
                {questions.map((q: any, index: number) => (
                  <div
                    key={q._id || index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
                  >
                    {/* Question Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1 mr-4">
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(q._id, e.target.value)
                          }
                          placeholder="Enter your question..."
                        />
                      </div>
                      <button
                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        {q.active ? (
                          <HiMinus className="h-6 w-6 cursor-pointer" />
                        ) : (
                          <HiPlus className="h-6 w-6 cursor-pointer" />
                        )}
                      </button>
                    </div>

                    {/* Answer Section */}
                    {q.active && (
                      <div className="space-y-4">
                        <textarea
                          className="w-full px-4 py-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={4}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          placeholder="Enter your answer..."
                        />

                        <div className="flex justify-end">
                          <button
                            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            onClick={() => {
                              setQuestions((prevQuestions: any) =>
                                prevQuestions.filter(
                                  (item: any) => item._id !== q._id
                                )
                              );
                            }}
                          >
                            <AiOutlineDelete className="h-5 w-5" />
                            <span className="text-sm font-medium">Delete</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New FAQ Button */}
              <div className="mt-8 flex justify-center">
                <button
                  className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
                  onClick={newFaqHandler}
                >
                  <IoMdAddCircleOutline className="h-6 w-6" />
                  <span className="font-medium">Add New FAQ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Save Button - Fixed at bottom right */}
          <div className="fixed bottom-8 right-8">
            <button
              className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                areQuestionsUnchanged(data?.layout?.faq || [], questions) ||
                isAnyQuestionEmpty(questions)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white hover:shadow-xl"
              }`}
              onClick={
                areQuestionsUnchanged(data?.layout?.faq || [], questions) ||
                isAnyQuestionEmpty(questions)
                  ? () => null
                  : handleEdit
              }
              disabled={
                areQuestionsUnchanged(data?.layout?.faq || [], questions) ||
                isAnyQuestionEmpty(questions)
              }
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
