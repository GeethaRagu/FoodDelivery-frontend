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
    updateuserCart:(state,action) =>{
       // console.log(action.payload);
        const getitem = action.payload;
        const  cartdata = getitem.cartData;
       // console.log(cartdata);
        state.currentuser.cartData = cartdata;

    },
    clearuserCart:(state,action)=>{
      state.currentuser.cartData = {};
    }
  },
});
export const { signInSuccess, signUpSuccess,signOutSuccess ,updateuserCart,clearuserCart} = userSlice.actions;
export default userSlice.reducer;
