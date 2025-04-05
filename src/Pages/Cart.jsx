import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementProduct, removeFromCart } from "../Redux/Slice/FoodSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const cartItems = useSelector((state) => state.fooditem.cartItems);
  //console.log(cartItems);
  const dispatchItems = useDispatch();
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URLKEY;
  //Total price
  const totalPrice = cartItems.reduce(
    (total, data) => total + data.price * (data.quantity || 1),
    0
  );
  //console.log("Totalprice", totalPrice);

  const deliveryfee = 10;
  const handleremove = async (itemId) => {
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
        toast.success("Food Item removed from cart");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not Authorized.Login Again");
      });
  };
  return (
    <div className="m-5">
      {cartItems.length <= 0 ? (
        <div className="flex items-center justify-center text-red-600 font-semibold">
          No items in the cart
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-6 font-semibold">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          <div>
            {cartItems.map((element, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-6 pb-2 pt-2 items-center"
                >
                  <img
                    src={`${apiurl}/images/${element.image}`}
                    className="w-20 h-20"
                  />
                  <p>{element.name}</p>
                  <p>₹{element.price}</p>
                  <p>{element.quantity}</p>
                  <p>₹{element.price * element.quantity}</p>
                  <p
                    onClick={() => handleremove(element._id)}
                    className="text-red-600 text-2xl font-bold cursor-pointer"
                  >
                    x
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-20 md:grid md:grid-cols-2 gap-3">
            <div className="">
              <h2 className="text-4xl font-semibold text-amber-800 mb-5">
                Cart Totals
              </h2>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <p className="text-2xl font-normal">SubTotal</p>
                  <p className="text-2xl font-normal">₹{totalPrice}</p>
                </div>
                <hr className="mt-5 mb-5" />
                <div className="grid grid-cols-2 items-center">
                  <p className="text-2xl font-normal">Delivery Fee</p>
                  <p className="text-2xl font-normal">₹{deliveryfee}</p>
                </div>
                <hr className="mt-5 mb-5" />
                <div className="grid grid-cols-2 items-center">
                  <b className="text-2xl font-semibold">Total</b>
                  <b className="text-2xl font-semibold">
                  ₹{totalPrice + deliveryfee}
                  </b>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/order");
                }}
                className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 mt-5"
              >
                Proceed to Checkout
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <p>If you have a Promo Code , Enter it here</p>
                <div>
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="rounded"
                  />
                  <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 mt-5 ml-2">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
