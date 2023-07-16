import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PRODUCT: [],
};
const PRODUCT_DETAIL = createSlice({
  name: "PRODUCT_DETAIL",
  initialState,
  reducers: {
    addProdcut: (state: any, action: any) => {
      state.PRODUCT.push(action.payload);
    },
    addToCart: (state: any, action: any) => {
      state.PRODUCT.push(action.payload);
    },
  },
});

export const { addProdcut } = PRODUCT_DETAIL.actions;

export default PRODUCT_DETAIL.reducer;
