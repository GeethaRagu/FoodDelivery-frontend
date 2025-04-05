import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../Redux/Slice/FoodSlice";
import { clearuserCart } from "../Redux/Slice/UserSlice";

const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.fooditem.cartItems);
 // console.log(cartItems);
  const dispatch = useDispatch();
  //Total price
  const totalPrice = cartItems.reduce(
    (total, data) => total + data.price * (data.quantity || 1),
    0
  );
  const deliveryfee = 10;
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    contactnumber: "",
  };

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
    firstname: Yup.string().required("Field is empty"),
    lastname: Yup.string().required("Field is empty"),
    street: Yup.string().required("Field is empty"),
    city: Yup.string().required("Field is empty"),
    state: Yup.string().required("Field is empty"),
    country: Yup.string().required("Field is empty"),
    zipcode: Yup.string().required("Field is empty"),
    contactnumber: Yup.string().required("Field is empty"),
  });

  const apiurl = import.meta.env.VITE_API_URLKEY;

  const handleSubmit = async (values) => {
    //console.log(values);
    let order_data = {
      address: values,
      items: cartItems,
      amount: totalPrice + 10,
    };
    let response = await axios.post(
      `${apiurl}/api/order/place`,
      order_data,
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    )
    if(response.data.success){
       dispatch(clearCart()) ;
       dispatch(clearuserCart());
       const {session_url} = response.data;
       window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="">
      <Formik>
        <Form onSubmit={formik.handleSubmit}>
          <div className="grid sm:grid-cols-2 grid-cols-1">
            <div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">
                    First name
                  </span>
                </label>
                <Field
                  type="text"
                  name="firstname"
                  placeholder="Enter your first name"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  error={formik.errors.firstname}
                />
                {formik.errors.firstname ? (
                  <div>{formik.errors.firstname}</div>
                ) : null}
              </div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">
                    Last name
                  </span>
                </label>
                <Field
                  type="text"
                  name="lastname"
                  placeholder="Enter your last name"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  error={formik.errors.lastname}
                />
                {formik.errors.lastname ? (
                  <div>{formik.errors.lastname}</div>
                ) : null}
              </div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">Email</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              </div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">
                    Street
                  </span>
                </label>
                <Field
                  type="text"
                  name="street"
                  placeholder="Enter your Street"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.street}
                  error={formik.errors.street}
                />
                {formik.errors.street ? (
                  <div>{formik.errors.street}</div>
                ) : null}
              </div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">City</span>
                </label>
                <Field
                  type="text"
                  name="city"
                  placeholder="Enter your City"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  error={formik.errors.city}
                />
                {formik.errors.city ? <div>{formik.errors.city}</div> : null}
              </div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">State</span>
                </label>
                <Field
                  type="text"
                  name="state"
                  placeholder="Enter your State"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  error={formik.errors.state}
                />
                {formik.errors.state ? <div>{formik.errors.state}</div> : null}
              </div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">
                    Country
                  </span>
                </label>
                <Field
                  type="text"
                  name="country"
                  placeholder="Enter your Country"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  error={formik.errors.country}
                />
                {formik.errors.country ? (
                  <div>{formik.errors.country}</div>
                ) : null}
              </div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">
                    Zipcode
                  </span>
                </label>
                <Field
                  type="text"
                  name="zipcode"
                  placeholder="Enter your zipcode"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.zipcode}
                  error={formik.errors.zipcode}
                />
                {formik.errors.zipcode ? (
                  <div>{formik.errors.zipcode}</div>
                ) : null}
              </div>
              <div className="grid grid-cols-2 pb-2">
                <label className="label p-2">
                  <span className="text-base label-text text-black">
                    Contact number
                  </span>
                </label>
                <Field
                  type="text"
                  name="contactnumber"
                  placeholder="Enter your contactnumber"
                  className="w-full input input-bordered h-10  text-black"
                  onChange={formik.handleChange}
                  value={formik.values.contactnumber}
                  error={formik.errors.contactnumber}
                />
                {formik.errors.contactnumber ? (
                  <div>{formik.errors.contactnumber}</div>
                ) : null}
              </div>
            </div>

            <div className="pl-5 pr-5">
              <h2 className="text-3xl font-semibold text-amber-800 mb-5">
                Cart Details
              </h2>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <p className="text-2xl font-normal">SubTotal</p>
                  <p className="text-2xl font-normal">${totalPrice}</p>
                </div>
                <hr className="mt-5 mb-5" />
                <div className="grid grid-cols-2 items-center">
                  <p className="text-2xl font-normal">Delivery Fee</p>
                  <p className="text-2xl font-normal">${deliveryfee}</p>
                </div>
                <hr className="mt-5 mb-5" />
                <div className="grid grid-cols-2 items-center">
                  <b className="text-2xl font-semibold">Total</b>
                  <b className="text-2xl font-semibold">
                    ${totalPrice + deliveryfee}
                  </b>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:focus:ring-yellow-900 mt-10"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PlaceOrder;
