"use client";
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar";
import PageHead from "../../../components/Common/PageHead";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHeader from "../../../components/Admin/DashboardHeader";
import AdminProtected from "../../../hooks/adminProtected";
const Page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <AdminProtected>
        <PageHead
          title="Abous us - ELearning"
        description="ELearning is an interactive E-Learning platform where all students can learn and grow together"
        keywords="Online Learning, Learning, LMS, Programming, Tech"
        />
        <div className="flex">
          <div className="1500px:w-[16px] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] ">
            <DashboardHeader />
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
