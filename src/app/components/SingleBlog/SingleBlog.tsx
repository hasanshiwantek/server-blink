import React, { useMemo } from "react";
import BlogHeader from "./BlogHeader";
import { decode } from "html-entities";

const SingleBlog = ({ blogPost }: { blogPost: any }) => {
  const decodedHtml = decode(
    blogPost?.body?.replace(/<pre[^>]*>/gi, "")?.replace(/<\/pre>/gi, ""),
  );
  const { contentHtml, faqHtml } = useMemo(() => {
    if (!decodedHtml) {
      return {
        contentHtml: "",
        faqHtml: "",
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(decodedHtml, "text/html");

    const faq = doc.querySelector(".blog-faqs");

    const faqHtml = faq ? faq.outerHTML : "";

    if (faq) {
      faq.remove();
    }

    return {
      contentHtml: doc.body.innerHTML,
      faqHtml,
    };
  }, [decodedHtml]);
  return (
    <>
      <div className="flex flex-col gap-5 2xl:w-[74%]  xl:w-[74%] lg:w-[74%] md:w-[70%] w-full">
        {blogPost?.thumbnail && <BlogHeader blogPost={blogPost} />}
        {/* Blog Content Sections */}
        <div className="flex flex-col gap-9 ">
          <div
            className={`max-w-none api-content-wrapper`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          ></div>
        </div>
        {faqHtml && (
          <div
            className="faqs-section mt-8"
            dangerouslySetInnerHTML={{
              __html: faqHtml.replace(
                /type="checkbox"/g,
                'type="radio" name="faq-accordion"',
              ),
            }}
          />
        )}
      </div>
    </>
  );
};

export default SingleBlog;
