import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  foodlist: [],
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
    showProducts:(state,action)=>{
      state.foodlist = action.payload;
    },
    incrementProduct: (state, action) => {
      //console.log("increment called")
      let  {itemId } = action.payload;
     // console.log(itemId);
      let index = findindex(state.foodlist, itemId);
     // console.log(index);
      if (index !== null)
        state.foodlist[index].quantity =
          (state.foodlist[index].quantity || 0) + 1;
    },
    decrementProduct: (state, action) => {
      //console.log("decrement called");
      let { itemId } = action.payload;
      //console.log(itemId);
      let index = findindex(state.foodlist, itemId);
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
      //console.log("item",item);
      const itemId = item.itemId;
      //console.log(itemId);
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
    updateCart:(state,action) =>{
      //console.log(action.payload);
      state.cartItems = action.payload;

   },
    clearCart:(state,action)=>{
      state.cartItems = []
    }
  },
});
export const {
  incrementProduct,
  decrementProduct,
  showProducts,
  addtoCart,
  removeFromCart,
  clearCart,
  updateCart
} = foodSlice.actions;
export default foodSlice.reducer;
