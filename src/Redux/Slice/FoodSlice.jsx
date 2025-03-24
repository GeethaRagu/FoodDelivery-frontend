import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../../assets/frontend_assets/assets";

const initialState = {
  foodlist: food_list,
  cartItems: [],
 
};
const findindex = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i]._id === id) {
      return i;
    }
  }
  return null;
};
const foodSlice = createSlice({
  name: "fooditem",
  initialState,
  reducers: {
    incrementProduct: (state, action) => {
      //console.log("increment called")
      let { id } = action.payload;
      let index = findindex(state.foodlist, id);
      //console.log(index);
      if (index !== null)
        state.foodlist[index].quantity =
          (state.foodlist[index].quantity || 0) + 1;
    },
    decrementProduct: (state, action) => {
      //console.log("decrement called");
      let { id } = action.payload;
      let index = findindex(state.foodlist, id);
      if (index !== null && state.foodlist[index].quantity > 0)
        state.foodlist[index].quantity = state.foodlist[index].quantity - 1;
    },
    removeProduct: (state, action) => {
      let { id } = action.payload;
      return state.filter((product) => product.id !== id);
    },
    addtoCart: (state, action) => {
      const item = action.payload;
      
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        // Item exists, update quantity
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === item._id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      } else {
        // Item does not exist, add to cart with quantity 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }
    },
  },
});
export const { incrementProduct, decrementProduct, removeProduct, addtoCart } =
  foodSlice.actions;
export default foodSlice.reducer;
