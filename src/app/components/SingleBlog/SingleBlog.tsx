import React from "react";
import BlogHeader from "./BlogHeader";
import TableofContents from "./TableofContents";
import FeaturedHBATable from "./FeaturedHBATable";
import Image from "next/image";
import Blogimg2 from "@/assets/blog/blogImage2.png";
import CommentForm from "./CommentForm";
// import css from "../../../styles/blog/BlogContent.module.css"

const SingleBlog = ({ blogPost }: { blogPost: any }) => {
  return (
    <>
      <div className="flex flex-col gap-5 2xl:w-[74%]  xl:w-[74%] lg:w-[74%] md:w-[70%] w-full">
        {blogPost?.thumbnail && <BlogHeader blogPost={blogPost} />}
        {/* <TableofContents /> */}

        {/* Blog Content Sections */}

        <div className="flex flex-col gap-9 ">
          <div
            className={`max-w-none api-content-wrapper`}
            dangerouslySetInnerHTML={{ __html: blogPost?.body }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
