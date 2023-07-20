import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CART_ITEMS: [],
  ACTIVE_CART_ITEMS: [],
};
const CART_DETAIL = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addCartItems: (state: any, action: any) => {
      state.CART_ITEMS.push(action.payload);
    },
    addActiveCartItems: (state: any, action: any) => {
      state.ACTIVE_CART_ITEMS.push(action.payload);
    },
    incrementActiveCartItem: (state: any, action: any) => {
      state.ACTIVE_CART_ITEMS = state.ACTIVE_CART_ITEMS.filter(
        (item: any) => item.itemId === action.payload.itemId
      );
    },
    decrementActiveCartItem: (state: any, action: any) => {
      state.ACTIVE_CART_ITEMS.push(action.payload);
    },
  },
});

export const { addCartItems, addActiveCartItems } = CART_DETAIL.actions;

export default CART_DETAIL.reducer;
