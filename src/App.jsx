import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import FooterArea from "./Components/FooterArea";
import SignIn from "./Components/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./Pages/Verify";
import MyOrders from "./Pages/MyOrders";
const ContactUs = React.lazy(() => import("./Pages/ContactUs"));
const Cart = React.lazy(() => import("./Pages/Cart"));
const PlaceOrder = React.lazy(() => import("./Pages/PlaceOrder"));
const Search = React.lazy(()=>import("./Pages/Search"));
const Contact = React.lazy(()=>import("./Pages/Contact"));

const App = () => {
  const [signin, setSignIn] = useState(false);
  return (
    <div>
      <div>
        <ToastContainer></ToastContainer>
      </div>
      <div className="flex flex-col h-screen justify-between">
        {signin ? <SignIn setSignIn={setSignIn} /> : <></>}

        <Header setSignIn={setSignIn} />
        <div className="mb-auto">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/contactus"
              element={
                <React.Suspense fallback={<div>Loading..</div>}>
                  <ContactUs />
                </React.Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <React.Suspense fallback={<div>Loading..</div>}>
                  <Cart />
                </React.Suspense>
              }
            />
            <Route
              path="/order"
              element={
                <React.Suspense fallback={<div>Loading..</div>}>
                  <PlaceOrder />
                </React.Suspense>
              }
            />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route
              path="/search"
              element={
                <React.Suspense fallback={<div>Loading..</div>}>
                  <Search />
                </React.Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <React.Suspense fallback={<div>Loading..</div>}>
                  <Contact />
                </React.Suspense>
              }
            />
          </Routes>
        </div>
        <FooterArea />
      </div>
    </div>
  );
};

export default App;
