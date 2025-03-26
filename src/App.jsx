import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import FooterArea from "./Components/FooterArea";
import SignIn from "./Components/SignIn";

const Menu = React.lazy(() => import("./Pages/Menu"));
const ContactUs = React.lazy(() => import("./Pages/ContactUs"));
const Cart = React.lazy(() => import("./Pages/Cart"));
const PlaceOrder = React.lazy(() => import("./Pages/PlaceOrder"));

const App = () => {
  const [signin, setSignIn] = useState(false);
  return (
    <div className="flex flex-col h-screen justify-between">
      {signin ? <SignIn setSignIn = {setSignIn} /> : <></>}
      <BrowserRouter>
        <Header setSignIn = {setSignIn} />
        <div className="mb-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menu"
            element={
              <React.Suspense fallback={<div>Loading..</div>}>
                <Menu />
              </React.Suspense>
            }
          />
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
        </Routes>
        </div>
        <FooterArea />
      </BrowserRouter>
    </div>
  );
};

export default App;
