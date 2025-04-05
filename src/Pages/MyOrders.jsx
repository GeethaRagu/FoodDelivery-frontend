import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const apiurl = import.meta.env.VITE_API_URLKEY;
  //console.log(data);
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      fetchOrders();
    }
  }, [localStorage.getItem("Token")]);
  const fetchOrders = async () => {
    const response = await axios.post(
      `${apiurl}/api/order/userorders`,
      {},
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    if (response.data.success) {
      setData(response.data.data);
      //console.log(response.data.data);
    } else {
      alert("Error");
    }
  };
  return (
    <div className="mt-12 mb-12">
      <h2 className="text-3xl font-semibold">My Orders</h2>
      <div className="flex flex-col gap-5 mt-7">
        {data.map((order,index)=>{
            return(
                <div key={index} className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] grid-cols-[1fr_2fr_1fr] items-center gap-7 pt-2 pb-2 pr-5 pl-5 border border-amber-700">
                    <img src={assets.parcel_icon} className="w-10"/>
                    <p>{order.items.map((item,index)=>{
                        if(index === order.items.length-1 ){
                            return item.name + " x " + item.quantity
                        }
                        else{
                            return item.name + " x " + item.quantity + ", "
                        } 
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items : {order.items.length}</p>
                    <p><span className="text-amber-700">&#x25cf;</span><b className="font-semibold text-gray-700">{order.status}</b></p>
                    <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:focus:ring-yellow-900 ">Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default MyOrders;
