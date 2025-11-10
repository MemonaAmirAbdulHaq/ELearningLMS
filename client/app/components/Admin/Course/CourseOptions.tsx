import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const steps: string[] = [
  "Course Information",
  "Course Options",
  "Course Content",
  "Course Preview",
];

const CourseOptions = ({ active, setActive }: Props) => {
  return (
    <div className="relative">
      {/* Base vertical line */}
      <div
        className="absolute left-[18px] top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"
        aria-hidden
      />
      <ul className="space-y-5">
        {steps.map((label, i) => {
          const completed = i < active;
          const current = i === active;

          return (
            <li key={label} className="relative pl-10">
              {/* Colored connector from this step to the next */}
              {i < steps.length - 1 && (
                <span
                  className={`absolute left-[18px] top-9 bottom-[-20px] w-px ${
                    i < active ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-hidden
                />
              )}

              <button
                type="button"
                onClick={() => setActive(i)}
                className="group flex items-center gap-3"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ring-2 ${
                    completed || current
                      ? "bg-blue-500 ring-blue-500 text-white"
                      : "bg-gray-500/20 ring-gray-400/40 text-gray-400"
                  }`}
                >
                  {completed || current ? (
                    <IoMdCheckmark className="text-xl" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-gray-400" />
                  )}
                </span>

                <span
                  className={`text-sm font-medium transition-colors ${
                    current
                      ? "text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CourseOptions;
