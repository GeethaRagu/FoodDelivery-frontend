import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showProducts, updateCart } from "../Redux/Slice/FoodSlice";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { updateuserCart } from "../Redux/Slice/UserSlice";
import FoodItem from "./FoodItem";

const FoodItems = ({ category }) => {
  const foodlist = useSelector((state) => state.fooditem.foodlist);
  const currentuser = useSelector((state) => state.user.currentuser);
  //console.log("currentuser", currentuser);
  // console.log("currentusercart", currentuser?.cartData);
  const cartItems = useSelector((state) => state.fooditem.cartItems);
  const dispatchItems = useDispatch();

  // console.log("foodlist", foodlist);
  // console.log("cartItems", cartItems);

  const apiurl = import.meta.env.VITE_API_URLKEY;
  useEffect(() => {
    fetchData();
    if (localStorage.getItem("Token")) {
      getCart();
    }
  }, []);
  const fetchData = async () => {
    await axios
      .get(`${apiurl}/api/food/list`)
      .then((res) => {
        dispatchItems(showProducts(res.data.data));
      })
      .catch((error) => console.log(error));
  };

  let itemsincart;
  const getCart = async () => {
    await axios
      .post(
        `${apiurl}/api/cart/get`,
        {},
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        //console.log(res.data);
        itemsincart = res.data;
        dispatchItems(updateuserCart(itemsincart));
        //dispatchItems(updateCart(itemsincart));
        //console.log(itemsincart.cartData);
        const cartdetails = itemsincart.cartData;
        let cart = [];
        foodlist.map((item) => {
          if (cartdetails[item._id]) {
            let iteminfo = item;
            iteminfo["quantity"] = cartdetails[item._id];
            cart.push(iteminfo);
          }
        });
        //console.log("CART",cart);
        dispatchItems(updateCart(cart));
      })
      .catch((error) => {});
  };
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Top dishes near you
      </h2>
      <div className="grid md:grid-cols-4 md:gap-4  sm:grid-cols-2 grid-cols-1 gap-2">
        {foodlist.map((element, index) => {
          if (category === "All" || category === element.category) {
            return (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative z-1"
              >
                <FoodItem element={element} index={index} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodItems;
