// file: components/layout/PageTransition.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="
    flex-grow
    max-w-[1170px] mx-auto
    lg:max-w-full  lg:mx-0 py-10
  "
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
        <Toaster position="top-center" />
      </motion.div>
    </AnimatePresence>
  );
}
