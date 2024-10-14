import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/InputField";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful!");

    resetForm();
    navigate("/");
  };

  return (
    <div className="bg-indigo-50 min-h-screen flex items-center justify-center">
      <div className="xl:px-20 md:px-10 sm:px-6 px-4 py-12 max-w-screen-lg w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center mt-10">
            <img
              src="https://newfold.scene7.com/is/image/NewfoldDigital/hero-1-1?ts=1697181192679&dpr=off&fmt=png-alpha"
              className="rounded-md mb-6 w-full"
              alt="Visual Representation"
            />
            <h1 className="text-2xl text-center font-mono font-bold text-indigo-800">
              Destion Innovations
            </h1>
          </div>
          <div className="bg-white shadow-lg rounded w-full p-6">
            <p className="text-2xl font-extrabold leading-6 text-gray-800 mb-4">
              Register an account
            </p>
            <p className="text-sm mt-4 font-medium leading-none text-gray-500 mb-5">
              Already have an account?{" "}
              <Link
                to="/"
                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"
              >
                Login here
              </Link>
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <InputField
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="e.g: john@gmail.com"
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  showHide={true}
                />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  showHide={true}
                />

                <div className="mt-8">
                  <button
                    type="submit"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
