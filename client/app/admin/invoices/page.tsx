"use client";

import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AllInvoices from "@/app/components/Admin/Order/AllInvoices";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import PageHead from "@/app/components/Common/PageHead";
import AdminProtected from "@/app/hooks/adminProtected";
const Page = () => {
  return (
    <div>
      <AdminProtected>
        <PageHead
          title="Abous us - ELearning"
        description="ELearning is an interactive E-Learning platform where all students can learn and grow together"
        keywords="Online Learning, Learning, LMS, Programming, Tech"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16px] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] ">
            <DashboardHeader />
            <AllInvoices />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
