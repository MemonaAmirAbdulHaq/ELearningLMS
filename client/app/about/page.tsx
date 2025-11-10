"use client";

import { useState } from "react";
import PageHead from "../components/Common/PageHead";
import Header from "../components/Header";
import AboutUs from "./AboutUs";

const Page = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  return (
    <div className="">
      <PageHead
        title="Abous us - ELearning"
        description="ELearning is an interactive E-Learning platform where all students can learn and grow together"
        keywords="Online Learning, Learning, LMS, Programming, Tech"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <AboutUs />
    </div>
  );
};

export default Page;
