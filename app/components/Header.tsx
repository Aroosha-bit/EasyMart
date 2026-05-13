"use client";

import React, { useState } from "react";
import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import { MapPin, ShoppingCart, Users, Search } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../lib/contexts/AuthContext";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [cartActive, setCartActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const router = useRouter();
  const {
    user
  } = useAuth();
  const cartItems = useSelector((state: any) => state.items);
const detailsModal = () => {
router.push("/profile")
}
  return (
    <div className="border border-[#F8F7F8] flex items-center justify-between lg:py-[10px] lg:px-[40px]">
      <div className="flex items-center gap-[20px]">
        <Link href={"/"}>
          <Image src={logo} alt="logo" />
        </Link>

        <div className="text-[#3E3B3F] hidden lg:flex items-center gap-[5px]">
          <MapPin />
          <span className="font-[500] text-[14px]">10115 New York</span>
        </div>
      </div>

      {/* <div className="relative w-[30%] mt-[20px]">
        <div className="absolute bg-[#FEF5FD] rounded-full w-fit p-2 left-[12px] top-1/2 -translate-y-1/2">
          <Search size={18} className=" text-[#B6349A]" />
        </div>

        <input
          type="text"
          placeholder="Search by"
          className="w-full h-[40px] rounded-[8px] text-[#3E3B3F] border border-[#E0E0E0] pl-[60px] pr-[16px] outline-none"
        />
      </div> */}

      <div className="flex gap-[20px] mt-[20px]">
        <Link
          href="/cart"
          onClick={() => setCartActive(!cartActive)}
          className={`relative px-[10px] lg:px-[20px] flex items-center gap-[3px] rounded-full w-fit ${
            cartActive
              ? "bg-[#FEF5FD] border border-[#FEF5FD]"
              : "bg-[#FFFFFF] border border-[#B6349A]"
          }`}
        >
          <ShoppingCart
            className={
              cartActive
                ? "stroke-[#B6349A] cursor-pointer"
                : "stroke-[#212121] cursor-pointer"
            }
          />
          <p className="font-[600] text-[#111111] text-[14px]">Cart</p>
          <span className="absolute -top-2 -right-2 bg-[#B6349A] text-white text-[10px] font-[700] rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        </Link>
        {user ? (
          <div className="px-[10px] py-[5px] lg:py-[10px] lg:px-[20px] rounded-full bg-[#FEF5FD] border border-[#B6349A] group hover:bg-[#B6349A] ">
            <p onClick={detailsModal} className="font-[600] text-[#B6349A] group-hover:text-white text-[20px]">
              {user.displayName.charAt(0).toUpperCase()}
            </p>
          </div>
        ) : (
          <Link
            href={"/logIn"}
            onClick={() => setLoginActive(!loginActive)}
            className={`py-[10px] px-[20px] flex items-center gap-[3px] rounded-full w-fit ${loginActive ? "bg-[#FEF5FD] border not-first:border-[#FEF5FD]" : "bg-[#FFFFFF] border border-[#B6349A]"} `}
          >
            <Users
              className={`bg-[#FFFFFF]  ${
                loginActive
                  ? "stroke-[#B6349A] cursor-pointer"
                  : "stroke-[#212121] cursor-pointer"
              }`}
            />
            <p className="font-[600] text-[#111111] text-[14px]">LogIn</p>
          </Link>
        )}

        <div></div>
      </div>
    </div>
  );
};
