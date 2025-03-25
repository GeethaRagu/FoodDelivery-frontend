import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import FooterArea from "./Components/FooterArea";
import SignIn from "./Components/SignIn";

const Menu = React.lazy(() => import("./Pages/Menu"));
const ContactUs = React.lazy(() => import("./Pages/ContactUs"));

const App = () => {
  const [signin, setSignIn] = useState(false);
  return (
    <div>
      {signin ? <SignIn/> : <></>}
      <BrowserRouter>
        <Header setSignIn = {setSignIn} />
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
        </Routes>
        <FooterArea />
      </BrowserRouter>
    </div>
  );
};

export default App;
