import React from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import RecentPost from "./RecentPost";
import SupportTeam from "./SupportTeam";
const BlogSidebar = () => {
  return (
    <>
      <main className="hidden md:flex flex-col gap-5 2xl:w-[24%] xl:w-[24%] lg:w-[24%] md:w-[28%] w-full  ">
        {/* <CategoriesSidebar /> */}
        <RecentPost />
        {/* <SupportTeam /> */}
      </main>
    </>
  );
};

export default BlogSidebar;
