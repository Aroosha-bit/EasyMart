"use client";

import Image from "next/image";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Products } from "./components/Products";
import { Filter } from "./components/Filter";
import { useState } from "react";


export default function Home() {
const [priceFilter, setPriceFilter] = useState("all");
  return (
    <div className="bg-white">
      <Header />
      <div className="flex">
        <Filter setPriceFilter={setPriceFilter} />
        <Products priceFilter={priceFilter} />
      </div>
      <Footer />
    </div>
  );
}