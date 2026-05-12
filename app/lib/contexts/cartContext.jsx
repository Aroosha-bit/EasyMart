// "use client";

// import React, { cartContext, useContext, useState } from "react";

// export const CartProvider = ({ children }) => {
//   const [counts, setCounts] = useState({});

//   const increment = (id) => {
//     setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//   };

//   const decrement = (id) => {
//     setCounts((prev) => ({
//       ...prev,
//       [id]: Math.max((prev[id] || 0) - 1, 0),
//     }));
//   };

//   const totalItems = Object.values(counts).reduce((sum, n) => sum + n, 0);

//   return (
//     <CartProvider value={{ counts, increment, decrement, totalItems }}>
//       {children}
//     </CartProvider>
//   );
// };
// export const useCart = () => {
//   const ctx = useContext(cartContext);
//   if (!ctx) throw new Error("useCart must be used within CartProvider");
//   return ctx;
// };