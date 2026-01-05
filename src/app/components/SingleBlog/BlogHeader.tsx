import React from "react";
import Image from "next/image";
import Blogimg1 from "@/assets/blog/blogImage1.jpg";
import dayjs from "dayjs";
const BlogHeader = ({ blogPost }: { blogPost: any }) => {
  return (
    <section className="w-full">
      {/* Blog Title + Meta */}
      {/* Blog Image */}
      <div className="w-full relative h-[30rem] lg:w-[72.8%] md:h-[548px] mx-auto">
        <Image
          src={blogPost?.thumbnail || "/default-product-image.svg"}
          alt={blogPost?.title}
          fill
          className="object-fit"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>
    </section>
  );
};

export default BlogHeader;
