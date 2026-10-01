"use client";

import type { BannerPlacement } from "@/lib/api/banners";
import DOMPurify from "dompurify";
import { useMemo } from "react";

interface BannerHtmlProps {
  html: string;
  placement: BannerPlacement;
}

const SIZED_TAGS = new Set(["IMG", "VIDEO", "IFRAME"]);

// The editor stores dimensions as width/height attributes, but Tailwind
// preflight's `height: auto` overrides attributes. Inline styles win, so move
// them there.
function attrsToInlineSize(node: Element) {
  if (!SIZED_TAGS.has(node.nodeName) || !(node instanceof HTMLElement)) return;
  for (const prop of ["width", "height"] as const) {
    const value = node.getAttribute(prop)?.trim();
    if (!value || node.style[prop]) continue;
    node.style[prop] = /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
  }
}

function sanitizeBanner(html: string) {
  DOMPurify.addHook("afterSanitizeAttributes", attrsToInlineSize);
  try {
    return DOMPurify.sanitize(html, {
      ADD_TAGS: ["iframe"], // videos embedded from the editor's media dialog
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "target"],
    });
  } finally {
    DOMPurify.removeHook("afterSanitizeAttributes");
  }
}

export default function BannerHtml({ html, placement }: BannerHtmlProps) {
  const clean = useMemo(
    () => (typeof window === "undefined" ? "" : sanitizeBanner(html)),
    [html],
  );

  if (!clean) return null;

  return (
    <section
      aria-label={`${placement} banner`}
      className="banner-html w-full overflow-hidden"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
