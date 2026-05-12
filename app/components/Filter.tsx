import { LogOut } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
export const Filter = ({ setPriceFilter }: any) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const cartItems = useSelector((state: any) => state.items);
  const filterSecond = () => {
    const filteredItems = cartItems.filter((item: any) => {
      const price = parseFloat(item.price.replace("$", ""));
      return price >= 1 && price <= 25;
    });
    setPriceFilter("1-25");
  };
  console.log();
  return (
    <div className="w-2/12 static p-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between">
          <p className="text-[#000000] font-[600] text-[14px]">Filters</p>
          <p className="text-[#B6349A] font-[600] text-[14px]">Reset</p>
        </div>

        <div className="bg-[#F8F7F852] p-3 rounded-[20px] border border-[#F8F7F8] flex flex-col gap-[20px] mt-[20px]">
          <p className="text-[#000000] font-[600] text-[14px]">Price</p>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setPriceFilter("All");
                setActiveFilter("All");
              }}
              className={`w-[52px] h-[25px] rounded-full p-[3px] transition-all duration-300 flex items-center
            ${activeFilter === "All" ? "bg-[#B6349A]" : "bg-[#D9D9D9]"}`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full bg-white shadow-md transition-all duration-300
              ${activeFilter === "All" ? "translate-x-[22px]" : "translate-x-0"}`}
              />
            </button>
            <span className="text-[14px] font-[500] text-[#3E3B3F]">All</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setPriceFilter("1-25");
                setActiveFilter("1-25");
              }}
              className={`w-[52px] h-[25px] rounded-full p-[3px] transition-all duration-300 flex items-center
            ${activeFilter === "1-25" ? "bg-[#B6349A]" : "bg-[#D9D9D9]"}`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full bg-white shadow-md transition-all duration-300
              ${activeFilter === "1-25" ? "translate-x-[22px]" : "translate-x-0"}`}
              />
            </button>
            <span className="text-[14px] font-[500] text-[#3E3B3F]">
              $1 - $25
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setPriceFilter("25-50");
                setActiveFilter("25-50");
              }}
              className={`w-[52px] h-[25px] rounded-full p-[3px] transition-all duration-300 flex items-center
            ${activeFilter === "25-50" ? "bg-[#B6349A]" : "bg-[#D9D9D9]"}`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full bg-white shadow-md transition-all duration-300
              ${activeFilter === "25-50" ? "translate-x-[22px]" : "translate-x-0"}`}
              />
            </button>
            <span className="text-[14px] font-[500] text-[#3E3B3F]">
              $25 - $50
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setPriceFilter("50+");
                setActiveFilter("50+");
              }}
              className={`w-[52px] h-[25px] rounded-full p-[3px] transition-all duration-300 flex items-center
            ${activeFilter === "50+" ? "bg-[#B6349A]" : "bg-[#D9D9D9]"}`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full bg-white shadow-md transition-all duration-300
              ${activeFilter === "50+" ? "translate-x-[22px]" : "translate-x-0"}`}
              />
            </button>
            <span className="text-[14px] font-[500] text-[#3E3B3F]">
              $50 - Above
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
