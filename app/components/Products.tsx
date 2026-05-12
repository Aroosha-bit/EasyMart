import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import img1 from "../../public/assets/img1.svg";
import img2 from "../../public/assets/img2.svg";
import img3 from "../../public/assets/img3.svg";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { cheeseItems, eggItems, milkItems } from "../data/productsData";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slice";

export const Products = ({ priceFilter }: any) => {
  const images = [img1, img2, img3];
  const cartItems = useSelector((state: any) => state.items);

  const dispatch = useDispatch();
  const filteredCheese = cheeseItems.filter((item) => {
    const price = parseFloat(String(item.price).replace("$", ""));
    if (priceFilter === "1-25") {
      return price >= 1 && price <= 25;
    }

    if (priceFilter === "25-50") {
      return price > 25 && price <= 50;
    }

    if (priceFilter === "50+") {
      return price > 50;
    }

    return true;
  });
  const filteredMilk = milkItems.filter((item) => {
    const price = parseFloat(String(item.price).replace("$", ""));
    if (priceFilter === "1-25") {
      return price >= 1 && price <= 25;
    }

    if (priceFilter === "25-50") {
      return price > 25 && price <= 50;
    }

    if (priceFilter === "50+") {
      return price > 50;
    }

    return true;
  });

  const filteredEgg = eggItems.filter((item) => {
    const price = parseFloat(String(item.price).replace("$", ""));
    if (priceFilter === "1-25") {
      return price >= 1 && price <= 25;
    }

    if (priceFilter === "25-50") {
      return price > 25 && price <= 50;
    }

    if (priceFilter === "50+") {
      return price > 50;
    }

    return true;
  });
  const cheeseSwiperRef = useRef<any>(null);
const milkSwiperRef = useRef<any>(null);
const eggSwiperRef = useRef<any>(null);
  return (
    <div className="w-10/12 py-5">
      <div className="py-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={20}
          slidesPerView={2.3}
          className="w-full"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-[240px] w-full overflow-hidden rounded-[12px]">
                <Image
                  src={item}
                  alt={`slide-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-3 flex flex-col gap-[20px]">
        <div className="flex items-start px-4 justify-between">
          <p className="text-[#0D0C0D] font-[700] text-[20px]">Cheese</p>
          <div className="flex gap-[10px]">
            <div
              onClick={() => cheeseSwiperRef.current?.slideNext()}
              className="border border-[#F0EEF0] bg-[#fff] cursor-pointer hover:bg-[#F8F7F8] rounded-full w-fit p-[10px] text-[#292D32]"
            >
              <ChevronRight />
            </div>

            <div
              onClick={() => cheeseSwiperRef.current?.slidePrev()}
              className="border border-[#F0EEF0] bg-[#fff] cursor-pointer hover:bg-[#F8F7F8] rounded-full w-fit p-[10px] text-[#292D32]"
            >
              <ChevronLeft />
            </div>
          </div>
        </div>
        <div className="flex gap-[20px]">
          {filteredCheese.map((item, index) => {
            const itemCount = cartItems.filter(
              (cartItem: any) => cartItem.item === item.name,
            ).length;

            return (
              <div className=" flex flex-col gap-[10px]" key={index}>
                <div className="bg-[#f2e7f1] rounded-[32px] flex items-center justify-center p-5 h-[200px]">
                  <Image src={item.img} alt={item.name} />
                </div>
                <h2 className="text-[#0D0C0D] font-[500] text-[16px]">
                  {item.name}
                </h2>
                <p className="text-[#000000] text-[12px]">
                  ${item.quantity} /lb
                </p>
                <p className="text-[#292D32] font-[700] text-[14px]">
                  ${item.price}
                </p>
                <span className="text-[#B6349A] font-[600] text-[12px]">
                  {item.itemsLeft} items left
                </span>
                <div
                  onClick={() => {
                    dispatch(addItem(item));
                  }}
                  key={index}
                  className=" flex items-center gap-4 justify-end"
                >
                  <span className="text-[#B6349A] font-[600] text-[12px]">
                    {itemCount}
                  </span>
                  <div className="bg-[#f2e7f1] group hover:bg-[#B6349A] rounded-full p-2 cursor-pointer">
                    <Plus
                      size={18}
                      className="stroke-[#B6349A] group-hover:stroke-white transition-colors "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-[20px]">
        <div className="flex items-start px-4 justify-between">
          <p className="text-[#0D0C0D] font-[700] text-[20px]">Milk</p>
          <div className="flex gap-[10px]">
            <div className="border border-[#F0EEF0] bg-[#fff]  cursor-pointer hover:bg-[#F8F7F8] rounded-full w-fit p-[10px] text-[#292D32]">
              <ChevronRight />
            </div>
            <div className="border border-[#F0EEF0] bg-[#fff] cursor-pointer hover:bg-[#F8F7F8] rounded-full w-fit p-[10px] text-[#292D32]">
              <ChevronLeft />
            </div>
          </div>
        </div>
        <div className="flex gap-[20px]">
          {filteredMilk.map((item, index) => {
            const itemCount = cartItems.filter(
              (cartItem: any) => cartItem.item === item.name,
            ).length;
            return (
              <div className=" flex flex-col gap-[10px]" key={index}>
                <div className="bg-[#f2e7f1] rounded-[32px] flex items-center justify-center p-5 h-[200px]">
                  <Image src={item.img} alt={item.name} />
                </div>
                <h2 className="text-[#0D0C0D] font-[500] text-[16px]">
                  {item.name}
                </h2>
                <p className="text-[#000000] text-[12px]">
                  ${item.quantity} /lb
                </p>
                <p className="text-[#292D32] font-[700] text-[14px]">
                  ${item.price}
                </p>
                <span className="text-[#B6349A] font-[600] text-[12px]">
                  {item.itemsLeft} items left
                </span>
                <div
                  onClick={() => {
                    dispatch(addItem(item));
                  }}
                  key={index}
                  className=" flex items-center gap-4 justify-end"
                >
                  <span className="text-[#B6349A] font-[600] text-[12px]">
                    {itemCount}
                  </span>
                  <div className="bg-[#f2e7f1] group hover:bg-[#B6349A] rounded-full p-2 cursor-pointer">
                    <Plus
                      size={18}
                      className="stroke-[#B6349A] group-hover:stroke-white transition-colors "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-[20px]">
        <div className="flex items-start px-4 justify-between">
          <p className="text-[#0D0C0D] font-[700] text-[20px]">Eggs</p>
          <div className="flex gap-[10px]">
            <div className="border border-[#F0EEF0] bg-[#fff]  cursor-pointer hover:bg-[#F8F7F8] rounded-full w-fit p-[10px] text-[#292D32]">
              <ChevronRight />
            </div>
            <div className="border border-[#F0EEF0] bg-[#fff] cursor-pointer hover:bg-[#F8F7F8] rounded-full w-fit p-[10px] text-[#292D32]">
              <ChevronLeft />
            </div>
          </div>
        </div>
        <div className="flex gap-[20px]">
          {filteredEgg.map((item, index) => {
            const itemCount = cartItems.filter(
              (cartItem: any) => cartItem.item === item.name,
            ).length;
            return (
              <div className="flex flex-col gap-[10px]" key={index}>
                <div className="bg-[#f2e7f1] rounded-[32px] flex items-center justify-center p-5 h-[200px]">
                  <Image src={item.img} alt={item.name} />
                </div>
                <h2 className="text-[#0D0C0D] font-[500] text-[16px]">
                  {item.name}
                </h2>
                <p className="text-[#000000] text-[12px]">
                  ${item.quantity} /lb
                </p>
                <p className="text-[#292D32] font-[700] text-[14px]">
                  ${item.price}
                </p>
                <span className="text-[#B6349A] font-[600] text-[12px]">
                  {item.itemsLeft} items left
                </span>
                <div
                  onClick={() => {
                    dispatch(addItem(item));
                  }}
                  key={index}
                  className=" flex items-center gap-4 justify-end"
                >
                  <span className="text-[#B6349A] font-[600] text-[12px]">
                    {itemCount}
                  </span>
                  <div className="bg-[#f2e7f1] group hover:bg-[#B6349A] rounded-full p-2 cursor-pointer">
                    <Plus
                      size={18}
                      className="stroke-[#B6349A] group-hover:stroke-white transition-colors "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
