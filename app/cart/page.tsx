"use client";
import React from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeItem } from "../redux/slice";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Image from "next/image";
import { eggItems } from "../data/productsData";
import { useAuth } from "../lib/contexts/AuthContext";
import axios from "axios";
export default function CartPage({ data }: any) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  //use selector reads data from redux store and use dispatch is used to send data to the store
  const cartItems = useSelector((state: any) => state.items);
const totalPrice = cartItems.reduce(
  (total: any, item: any) =>
    total + Number(item.price) * item.quantity,
  0,
);
  const deliveryFee = 5.78;
  const subtotal = totalPrice + deliveryFee;

  const checkOutButton = async () => {
    try {
      const response = await axios.post("/api/payment", {
        items: cartItems,
      });

      window.location.href = response.data.url;
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      {user ? (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex lg:flex-row flex-col gap-8">
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-[#f2e7f1] rounded-xl p-3">
                    <ShoppingCart size={22} className="text-[#B6349A]" />
                  </div>
                  <h2 className="font-bold text-gray-900 text-lg">
                    Local Market
                  </h2>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">
                    Items Name
                  </p>
                </div>

                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <ShoppingCart size={48} className="mb-4 opacity-30" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm mt-1">
                      Add items from the product page
                    </p>
                  </div>
                ) : (
                  cartItems.map((item: any, index: any) => (
                    <div
                      key={item.id}
                      className={`px-6 py-5 flex lg:flex-row flex-col lg:justify-between justify-end gap-4 hover:bg-gray-50/50 transition-colors ${
                        index !== cartItems.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f2e7f1] flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 font-medium text-sm leading-snug truncate">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[#B6349A] font-semibold text-sm">
                              ${Number(item.price).toFixed(2)}
                            </span>
                            <span className="text-gray-400 text-xs line-through">
                              ${Number(item.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-end">
                        <div className="flex items-center lg:gap-3">
                          <button
                            className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors p-1"
                            onClick={() => dispatch(removeItem(item.id))}
                          >
                            <Trash2 size={16} />
                          </button>

                          <button
                            className="w-7 h-7 flex cursor-pointer items-center justify-center rounded-full border border-gray-200 hover:border-[#B6349A] hover:text-[#B6349A] transition-colors text-gray-500"
                            onClick={() => dispatch(decreaseQty(item.id))}
                          >
                            <Minus size={13} />
                          </button>

                          <span className="w-8 text-center font-semibold text-sm text-gray-800">
                            {item.quantity}
                          </span>

                          <button
                            className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-full bg-[#B6349A] text-white hover:bg-[#9a2c84] transition-colors"
                            onClick={() => dispatch(increaseQty(item.id))}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <p className="text-[#B6349A] font-bold text-sm">
                          $
                          {(
                           Number(item.price) *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:w-72 sticky top-24 flex-shrink-0">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-[#f2e7f1] px-5 py-3">
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-[#B6349A] h-1 rounded-full" />
                  </div>
                  <h3 className="font-bold pt-2 text-gray-900 text-lg ">
                    Order Summary
                  </h3>
                </div>

                <div className="p-5">
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Items total</span>
                      <span className="text-gray-800 font-medium">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery fee</span>
                      <span className="text-gray-800 font-medium">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-5">
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-bold">Subtotal</span>
                      <span className="text-gray-900 font-bold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={checkOutButton}
                    className="w-full bg-[#B6349A] hover:bg-[#9a2c84] transition-colors text-white font-semibold rounded-xl py-3.5 flex items-center justify-center px-5"
                  >
                    <div className="flex items-center gap-2">
                      <span>Checkout</span>
                    </div>
                    {/* <span>${subtotal.toFixed(2)}</span> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen text-center py-10">
          <p className="text-red-500 font-[700]">LogIn to visit Cart.</p>
        </div>
      )}

      <Footer />
    </div>
  );
}
