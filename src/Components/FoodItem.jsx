import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  decrementProduct,
  incrementProduct,
  removeFromCart,
  showProducts,
  updateCart,
} from "../Redux/Slice/FoodSlice";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { updateuserCart } from "../Redux/Slice/UserSlice";

const FoodItem = ({ element,index }) => {
  const foodlist = useSelector((state) => state.fooditem.foodlist);
  const currentuser = useSelector((state) => state.user.currentuser);
  //console.log("currentuser", currentuser);
  // console.log("currentusercart", currentuser?.cartData);
  const cartItems = useSelector((state) => state.fooditem.cartItems);
  const dispatchItems = useDispatch();

  //console.log("foodlist", foodlist);
  // console.log("cartItems", cartItems);

  const apiurl = import.meta.env.VITE_API_URLKEY;

  const handleInc = async (
    itemId,
    quantity,
    name,
    description,
    image,
    price
  ) => {
    if (localStorage.getItem("Token")) {
      await axios
        .post(
          `${apiurl}/api/cart/add`,
          { itemId },
          {
            headers: {
              token: localStorage.getItem("Token"),
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          dispatchItems(incrementProduct({ itemId }));
          let addedItems = {
            _id: itemId,
            name: name,
            description: description,
            price: price,
            image: image,
          };
          // console.log(addedItems);
          dispatchItems(addtoCart(addedItems));
          getCart();
          toast.success("Food Item added to cart");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Not Authorized.Login Again");
        });
    } else {
      toast.error("Login to add food items to cart");
    }
  };
  const handleDec = async (itemId, quantity) => {
    await axios
      .post(
        `${apiurl}/api/cart/remove`,
        { itemId },
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        dispatchItems(decrementProduct({ itemId }));
        dispatchItems(removeFromCart({ itemId }));
        getCart();
        toast.success("Food Item removed from cart");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not Authorized.Login Again");
      });
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
      <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative z-10">
        {/* {itemsincart.cartData[element._id]}  */}
        <img
          className="rounded-t-lg"
          src={`${apiurl}/images/${element.image}`}
          alt=""
        />
        {!currentuser?.cartData[element._id] ||
        currentuser?.cartData[element._id] === 0 ? (
          <button
            className="absolute top-2 right-1 z-100"
            onClick={() =>
              handleInc(
                element._id,
                element.quantity || 1,
                element.name,
                element.description,
                element.image,
                element.price
              )
            }
          >
            <img src={assets.add_icon_white} className="w-6" />
          </button>
        ) : (
          <div className="absolute top-2 right-1 z-100 bg-amber-50 p-2 border rounded-2xl flex items-center gap-2">
            <span>
              <button
                onClick={() => handleDec(element._id, element.quantity || 1)}
              >
                <img src={assets.remove_icon_red} className="w-6" />
              </button>
            </span>
            <span className="text-1xl font-semibold -mt-1.5">
              {currentuser?.cartData[element._id]}
            </span>
            <span>
              <button
                onClick={() =>
                  handleInc(
                    element._id,
                    element.quantity || 1,
                    element.name,
                    element.description,
                    element.image,
                    element.price
                  )
                }
              >
                <img src={assets.add_icon_green} className="w-6" />
              </button>
            </span>
          </div>
        )}
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {element.name}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {element.description}
          </p>
          <p className="mb-3 font-semibold text-2xl text-amber-600 dark:text-amber-400">
            ₹{element.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
