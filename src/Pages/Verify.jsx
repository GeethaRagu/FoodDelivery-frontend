import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const apiurl = import.meta.env.VITE_API_URLKEY;
  const navigate = useNavigate();
  const verifyPayment = async () => {
    const response = await axios.post(`${apiurl}/api/order/verify`, {
      orderId,
      success,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
        navigate("/")
    }
  };
  useEffect(()=>{
    verifyPayment();
  },[])
  return (
    <div className="min-h-[60vh] grid">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
