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
        className={`flex-grow 
           "py-6 md:px-[7%] lg:px-[5.2%] xl:px-[5.2%] 2xl:px-[5.2%] px-[7%]"
        
           
           `}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        // exit={{}} // You can customize exit transition if needed
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
        <Toaster position="top-center" />
      </motion.div>
    </AnimatePresence>
  );
}
