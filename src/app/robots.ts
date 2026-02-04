import type { MetadataRoute } from "next";
import axiosInstance from "@/lib/axiosInstance"; // yahan apna path adjust karo

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    // Axios call
    const res = await axiosInstance.get(
      "/api/web/store-setting/get-store-setting",
      {
        // Next.js app router me cache: "no-store" jaise fetch option nahi, agar zarurat ho toh headers me add kar sakte ho
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    const json = res.data;
   console.log("Robots.txt data:", json);
    const robotsTxt = json?.data?.[0]?.website?.robotsTxt || "";

    // Laravel se jo string aa rahi hai usko rules me convert karna
    const disallowRules = robotsTxt
      .split("\n")
      .filter((line: string) => line.startsWith("Disallow:"))
      .map((line: string) => line.replace("Disallow:", "").trim());

    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: disallowRules,
        },
      ],
      sitemap: "https://server-blink.vercel.app/sitemap.xml",
    };
  } catch (error) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      sitemap: "https://server-blink.vercel.app/sitemap.xml",
    };
  }
}
