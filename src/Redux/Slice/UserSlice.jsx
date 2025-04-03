import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentuser = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.currentuser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentuser = null;
    },
  },
});
export const { signInSuccess, signUpSuccess,signOutSuccess } = userSlice.actions;
export default userSlice.reducer;
