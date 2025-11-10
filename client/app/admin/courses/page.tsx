"use client";

import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import PageHead from "@/app/components/Common/PageHead";
import AdminProtected from "@/app/hooks/adminProtected";
import AllCourses from "../../components/Admin/Course/AllCourses";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <PageHead
          title="Abous us - ELearning"
        description="ELearning is an interactive E-Learning platform where all students can learn and grow together"
        keywords="Online Learning, Learning, LMS, Programming, Tech"
        />
        <div className="flex h-screen">
          {/* Fix: Use consistent responsive classes */}
          <div className="w-1/5 1500px:w-[250px]">
            <AdminSidebar />
          </div>
          {/* Fix: Make main content take remaining space */}
          <div className="w-4/5 1500px:w-[calc(100%-250px)]">
            <DashboardHeader />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
