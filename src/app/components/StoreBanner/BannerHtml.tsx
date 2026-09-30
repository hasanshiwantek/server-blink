"use client";

import type { BannerPlacement } from "@/lib/api/banners";
import DOMPurify from "dompurify";
import { useMemo } from "react";

interface BannerHtmlProps {
  html: string;
  placement: BannerPlacement;
}

export default function BannerHtml({ html, placement }: BannerHtmlProps) {
  const clean = useMemo(
    () =>
      typeof window === "undefined"
        ? ""
        : DOMPurify.sanitize(html, {
            ADD_TAGS: ["iframe"], // videos embedded from the editor's media dialog
            ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "target"],
          }),
    [html],
  );

  if (!clean) return null;

  return (
    <section
      aria-label={`${placement} banner`}
      className="w-full overflow-hidden [&_img]:max-w-full [&_img]:h-auto [&_video]:max-w-full [&_iframe]:max-w-full [&_table]:max-w-full"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
