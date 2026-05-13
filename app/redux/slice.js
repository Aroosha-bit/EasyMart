// slice = action + reducer
// action and reducer must be for a single feature in app,
// for example, cartSlice will have actions and reducers related to cart, and userSlice will have actions and reducers related to user
// action data which is stored in redux store, reducer stores action data in redux store

import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const Slice = createSlice({
  name: "addCartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty } = Slice.actions;
export default Slice.reducer;
