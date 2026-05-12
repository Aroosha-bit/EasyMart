/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { cheeseItems, eggItems, milkItems } from "../data/productsData";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slice";
import img1 from "../../public/assets/img1.svg";
import img2 from "../../public/assets/img2.svg";
import img3 from "../../public/assets/img3.svg";

const ProductCard = ({
  item,
  itemCount,
  onAdd,
}: {
  item: any;
  itemCount: number;
  onAdd: () => void;
}) => (
  <div className="flex flex-col gap-[10px] w-full">
    <div
      className="bg-[#f2e7f1] rounded-[32px] flex items-center
                     justify-center p-5 h-[200px] w-full"
    >
      <Image src={item.img} alt={item.name} className="object-contain h-full" />
    </div>
    <h2 className="text-[#0D0C0D] font-[500] text-[16px] truncate">
      {item.name}
    </h2>
    <p className="text-[#000000] text-[12px]">${item.quantity} /lb</p>
    <p className="text-[#292D32] font-[700] text-[14px]">${item.price}</p>
    <span className="text-[#B6349A] font-[600] text-[12px]">
      {item.itemsLeft} items left
    </span>
    <div className="flex items-center gap-4 justify-end">
      <span className="text-[#B6349A] font-[600] text-[12px]">{itemCount}</span>
      <div
        onClick={onAdd}
        className="bg-[#f2e7f1] group hover:bg-[#B6349A]
                   rounded-full p-2 cursor-pointer"
      >
        <Plus
          size={18}
          className="stroke-[#B6349A] group-hover:stroke-white transition-colors"
        />
      </div>
    </div>
  </div>
);

type ProductSectionProps = {
  title: string;
  items: any[];
  cartItems: any[];
  dispatch: React.Dispatch<any>;
};

const ProductSection = ({
  title,
  items,
  cartItems,
  dispatch,
}: ProductSectionProps) => {
  const swiperRef = useRef<any>(null);

  return (
    <div className="mt-3 flex flex-col gap-[20px]">
      <div className="flex items-center px-4 justify-between">
        <p className="text-[#0D0C0D] font-[700] text-[20px]">{title}</p>
        <div className="flex gap-[10px]">
          <div
            onClick={() => swiperRef.current?.slidePrev()}
            className="border border-[#F0EEF0] bg-[#fff] cursor-pointer
                       hover:bg-[#F8F7F8] rounded-full w-fit p-[10px] text-[#292D32]"
          >
            <ChevronLeft />
          </div>
          <div
            onClick={() => swiperRef.current?.slideNext()}
            className="border border-[#F0EEF0] bg-[#fff] cursor-pointer
                       hover:bg-[#F8F7F8] rounded-full w-fit p-[10px] text-[#292D32]"
          >
            <ChevronRight />
          </div>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={16}
        slidesPerView="auto"
        className="w-full"
      >
        {items.map((item, index) => {
          const itemCount = cartItems.filter(
            (c: any) => c.item === item.name,
          ).length;

          return (
            <SwiperSlide key={index} style={{ width: "180px" }}>
              <ProductCard
                item={item}
                itemCount={itemCount}
                onAdd={() => dispatch(addItem(item))}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export const Products = ({ priceFilter }: any) => {
  const images = [img1, img2, img3];
  const cartItems = useSelector((state: any) => state.items);
  const dispatch = useDispatch();

  const filterByPrice = (items: any[]) =>
    items.filter((item) => {
      const price = parseFloat(String(item.price).replace("$", ""));
      if (priceFilter === "1-25") return price >= 1 && price <= 25;
      if (priceFilter === "25-50") return price > 25 && price <= 50;
      if (priceFilter === "50+") return price > 50;
      return true;
    });

  return (
    <div className="w-10/12 px-3 py-5">
      <div className="py-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={2.3}
          className="w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="h-[240px] w-full overflow-hidden rounded-[12px]">
                <Image
                  src={img}
                  alt={`slide-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ProductSection
        title="Cheese"
        items={filterByPrice(cheeseItems)}
        cartItems={cartItems}
        dispatch={dispatch}
      />
      <ProductSection
        title="Milk"
        items={filterByPrice(milkItems)}
        cartItems={cartItems}
        dispatch={dispatch}
      />
      <ProductSection
        title="Eggs"
        items={filterByPrice(eggItems)}
        cartItems={cartItems}
        dispatch={dispatch}
      />
    </div>
  );
};
