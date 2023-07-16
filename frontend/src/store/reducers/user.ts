import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: [],
};
const userDetials = createSlice({
  name: "USER_DETAILS",
  initialState,
  reducers: {
    loggedIn: (state: any, action: any) => {
      state.isLoggedIn = true;
      state.user.push(action.payload);
    },
    loggedOut: (state, action) => {
      state.isLoggedIn = false;
      state.user = [];
    },
  },
});

export const { loggedIn, loggedOut } = userDetials.actions;

export default userDetials.reducer;
