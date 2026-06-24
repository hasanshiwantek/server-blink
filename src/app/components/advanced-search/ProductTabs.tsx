"use client";

import { useState } from "react";

interface Tab {
  label: string;
  count?: number;
  isDivided?: boolean; // show divider before this tab
}

interface ProductTabsProps {
  tabs?: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

export default function ProductTabs({ tabs, activeTab: controlledActive, onTabChange }: ProductTabsProps) {
  const [internalActive, setInternalActive] = useState(0);
  const activeIndex = controlledActive ?? internalActive;

  const defaultTabs: Tab[] = [
    { label: "PRODUCTS", count: 10000 },
    { label: "NEWS & INFORMATION", count: 0 },
    { label: "SHOW SEARCH FORM", isDivided: true },
  ];

  const items = tabs || defaultTabs;

  const handleClick = (index: number) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActive(index);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full justify-center gap-1 border-b border-gray-200 pb-3 mt-0 text-[14px] font-light  sm:gap-3.5">
      {items.map((tab, index) => (
        <div key={index} className="flex items-center gap-3.5">
          {tab.isDivided && (
            <div className="hidden md:flex w-px h-7 bg-gray-400" />
          )}
          <button
            onClick={() => handleClick(index)}
            className={`uppercase tracking-wide transition-colors ${
              activeIndex === index
                ? "text-[#d42020] border-b-1 border-[#d42020] "
                : "text-[#393939]  hover:text-[#393939]"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && ` (${tab.count})`}
          </button>
        </div>
      ))}
    </div>
  );
}