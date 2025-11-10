"use client";

import PageHead from "../components/Common/PageHead";
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/DashboardHero";
import AdminProtected from "../hooks/adminProtected";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminProtected>
        <PageHead
         title="Abous us - ELearning"
        description="ELearning is an interactive E-Learning platform where all students can learn and grow together"
        keywords="Online Learning, Learning, LMS, Programming, Tech"
        />
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden lg:block lg:w-64 xl:w-80 fixed left-0 top-0 h-full z-50">
            <AdminSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-64 xl:ml-80 min-h-screen">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
