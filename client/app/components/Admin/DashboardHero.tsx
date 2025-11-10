import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero = ({ isDashboard }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <DashboardHeader />
        <br />
        <br />
      </div>
      {isDashboard && (
        <div className="p-4 sm:p-6 lg:p-8">
          <DashboardWidgets open={open} />
        </div>
      )}
    </div>
  );
};

export default DashboardHero;
