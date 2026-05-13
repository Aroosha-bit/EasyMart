import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export const Filter = ({ setPriceFilter }: any) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filters = [
    { label: "All", value: "All" },
    { label: "$1 – $25", value: "1-25" },
    { label: "$25 – $50", value: "25-50" },
    { label: "$50+", value: "50+" },
  ];

  const handleReset = () => {
    setActiveFilter("All");
    setPriceFilter("All");
  };

  const handleSelect = (value: string) => {
    setActiveFilter(value);
    setPriceFilter(value);
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <p className="text-[#000000] font-semibold text-sm">Filters</p>
        <button
          onClick={handleReset}
          className="text-[#B6349A] font-semibold text-sm hover:opacity-75 transition-opacity"
        >
          Reset
        </button>
      </div>

      <div className="bg-[#F8F7F852] p-3 rounded-[20px] border border-[#F8F7F8] flex flex-col gap-4">
        <p className="text-[#000000] font-semibold text-sm">Price</p>
        <div className="flex flex-col gap-4">
          {filters.map(({ label, value }) => (
            <div key={value} className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#3E3B3F]">{label}</span>
              <button
                onClick={() => handleSelect(value)}
                aria-pressed={activeFilter === value}
                aria-label={`Filter by ${label}`}
                className={`w-[52px] h-[25px] rounded-full p-[3px] transition-all duration-300 flex items-center flex-shrink-0
                  ${activeFilter === value ? "bg-[#B6349A]" : "bg-[#D9D9D9]"}`}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full bg-white shadow-md transition-all duration-300
                    ${activeFilter === value ? "translate-x-[22px]" : "translate-x-0"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open filters"
          className="relative"
        >
          <SlidersHorizontal size={22} className="text-[#3E3B3F]" />
          {activeFilter !== "All" && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#B6349A] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
              1
            </span>
          )}
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[270px] bg-white z-50 shadow-xl flex flex-col p-5 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="font-semibold text-base text-[#000000]">Filters</p>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Close filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <FilterContent />

        <div className="mt-auto pt-5">
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full bg-[#B6349A] hover:bg-[#9e2d87] text-white font-semibold text-sm py-3 rounded-full transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="hidden lg:block lg:w-2/12 sticky top-4 p-4">
        <FilterContent />
      </div>
    </>
  );
};