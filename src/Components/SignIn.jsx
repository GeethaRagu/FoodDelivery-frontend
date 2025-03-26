import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
const SignIn = ({ setSignIn }) => {
  const [currentstate, setCurrentState] = useState("Sign Up");
  const initialValuessignIn = {
    email: "",
    password: "",
  };

  const validationschemasignIn = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
    password: Yup.string().required("Field is empty"),
  });

  const handleSubmitsignIn = async (values) => {
    console.log(values);
  };
  const formiksignIn = useFormik({
    initialValues: initialValuessignIn,
    validationSchema: validationschemasignIn,
    onSubmit: handleSubmitsignIn,
  });
  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  };

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
    username: Yup.string().required("Field is empty"),
    password: Yup.string().required("Field is empty"),
    confirmpassword: Yup.string().required("Field is empty"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="absolute grid z-1 w-full h-full bg-black-90">
      <div className="place-self-center max-w-23vw text-gray-500 bg-white flex flex-col gap-6 px-7 py-6 rounded-md">
        <div className="flex flex-row justify-between">
          <h2 className="text-amber-600 font-semibold text-2xl">
            {currentstate}
          </h2>
          <img
            src={assets.cross_icon}
            className="w-4 h-4 cursor-pointer"
            onClick={() => {
              setSignIn(false);
            }}
          />
        </div>
        <div className="">
          {currentstate === "Sign Up" ? (
            <Formik>
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 pb-2">
                  <label className="label p-2">
                    <span className="text-base label-text text-black">
                      Email
                    </span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full input input-bordered h-10  text-black"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                  />
                  {formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 pb-2">
                  <label className="label p-2">
                    <span className="text-base label-text text-black">
                      Username
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className="w-full input input-bordered h-10 text-black"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username}
                  />
                  {formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 pb-2">
                  <label className="label p-2">
                    <span className="text-base label-text text-black">
                      Password
                    </span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="w-full input input-bordered h-10  text-black"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                  />
                  {formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 pb-2">
                  <label className="label p-2">
                    <span className="text-base label-text text-black">
                      Confirm Password
                    </span>
                  </label>
                  <Field
                    type="password"
                    name="confirmpassword"
                    placeholder="Enter Password"
                    className="w-full input input-bordered h-10  text-black"
                    onChange={formik.handleChange}
                    value={formik.values.confirmpassword}
                    error={formik.errors.confirmpassword}
                  />
                  {formik.errors.confirmpassword ? (
                    <div>{formik.errors.confirmpassword}</div>
                  ) : null}
                </div>

                <div className="mt-2 mb-2"></div>

                <div>
                  <button
                    type="submit"
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    Sign Up
                  </button>
                  <p>
                    Already have an account ?
                    <a className="cursor-pointer hover:text-amber-800"  onClick={() => setCurrentState("Sign In")}>
                      &nbsp;Click here
                    </a>
                  </p>
                </div>
              </Form>
            </Formik>
          ) : (
            <Formik>
              <Form onSubmit={formiksignIn.handleSubmit}>
                <div className="grid grid-cols-2 pb-2">
                  <label className="label p-2">
                    <span className="text-base label-text text-black">
                      Email
                    </span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full input input-bordered h-10  text-black"
                    onChange={formiksignIn.handleChange}
                    value={formiksignIn.values.email}
                    error={formiksignIn.errors.email}
                  />
                  {formiksignIn.errors.email ? (
                    <div>{formiksignIn.errors.email}</div>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 pb-2">
                  <label className="label p-2">
                    <span className="text-base label-text text-black">
                      Password
                    </span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="w-full input input-bordered h-10  text-black"
                    onChange={formiksignIn.handleChange}
                    value={formiksignIn.values.password}
                    error={formiksignIn.errors.password}
                  />
                  {formiksignIn.errors.password ? (
                    <div>{formiksignIn.errors.password}</div>
                  ) : null}
                </div>

                <div className="mt-2 mb-2"></div>

                <div>
                  <button
                    type="submit"
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    Sign In
                  </button>
                  <p>
                    Don't have an account ?
                    <a className="cursor-pointer hover:text-amber-800" onClick={() => setCurrentState("Sign Up")}>
                      &nbsp;Register here
                    </a>
                  </p>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
