import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CART_ITEMS: [],
};
const CART_DETAIL = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addCartItems: (state: any, action: any) => {
      state.CART_ITEMS = action.payload;
    },
  },
});

export const { addCartItems } = CART_DETAIL.actions;

export default CART_DETAIL.reducer;
