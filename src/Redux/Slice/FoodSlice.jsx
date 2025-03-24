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

    addtoCart: (state, action) => {
      const item = action.payload;
      //console.log(item);
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
    removeFromCart: (state, action) => {
      const item = action.payload;
      const itemId = item.id;
      console.log(itemId);
      const targetItem = state.cartItems.find((x) => x._id === itemId);

      if (targetItem) {
        if (targetItem.quantity > 1) {
          // Decrease quantity by 1
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x._id === itemId ? { ...x, quantity: x.quantity - 1 } : x
            ),
          };
        } else {
          // Remove item if quantity is 1
          return {
            ...state,
            cartItems: state.cartItems.filter((x) => x._id !== itemId),
          };
        }
      }
    },
  },
});
export const {
  incrementProduct,
  decrementProduct,

  addtoCart,
  removeFromCart,
} = foodSlice.actions;
export default foodSlice.reducer;
