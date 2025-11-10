import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

const FAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="py-16 items-center m-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Got questions? We&apos;ve got answers. Find everything you need to
            know about our platform.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {questions.map((item: any, index: number) => (
            <div
              key={item._id || index}
              className="bg-white dark:bg-gray-800 cursor-pointer  rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Question Button */}
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                onClick={() => toggleQuestion(item._id || index)}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                  {item.question}
                </span>
                <span className="flex-shrink-0">
                  {activeQuestion === (item._id || index) ? (
                    <HiMinus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <HiPlus className="h-6 w-6 text-gray-500 cursor-pointer dark:text-gray-400" />
                  )}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeQuestion === (item._id || index)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Questions Message */}
        {questions.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <svg
                className="mx-auto h-12 w-12 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium mb-2">No FAQ Available</h3>
              <p>Check back later for frequently asked questions.</p>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Can&apos;t find the answer you&apos;re looking for? Please chat
              with our friendly team.
            </p>
            <a
              target="_blank"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=zamszamato17@gmail.com`}
            >
              <button className="inline-flex cursor-pointer items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
