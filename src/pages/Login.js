import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/InputField";
import { toast } from "react-toastify";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const initialValues = {
    identifier: "",
    password: "",
  };

  const validationSchema = Yup.object({
    identifier: Yup.string().required("Email or Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        (user.email === values.identifier ||
          user.username === values.identifier) &&
        user.password === values.password
    );

    if (user) {
      toast.success("Login successful!");
      navigate("/dashboard");
      setUser(user.username);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen">
      <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
          <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
            Login to your account
          </p>
          <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500 mb-5">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"
            >
              Sign up here
            </Link>
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <InputField
                label="Email/Username"
                name="identifier"
                type="text"
                placeholder="e.g: john@gmail.com or john123"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                showHide={true}
              />
              <p className="flex justify-end mt-5 text-indigo-800 underline hover:font-bold cursor-pointer">
                Forgot Password?
              </p>
              <div className="mt-8">
                <button
                  type="submit"
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                >
                  Login
                </button>
              </div>
            </Form>
          </Formik>
        </div>

        <div className="xl:w-1/3 md:w-1/2 lg:ml-16 ml-8 md:mt-0 mt-6">
          <div className="pl-8 md:block hidden">
            <h1 className="text-2xl font-mono font-bold text-indigo-800">
              Destion Innovations
            </h1>
          </div>
          <div className="flex items-start mt-8">
            <div>
              <img
                className="w-24"
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in_2-svg7.svg"
                alt="quote"
              />
            </div>
            <p className="sm:text-2xl text-xl leading-7 text-gray-600 pl-2.5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              tempor mollis velit, non congue sapien accumsan in. Morbi maximus
              maximus dolor id aliquam.
            </p>
          </div>
          <div className="flex items-center pl-8 mt-10">
            <div className="w-8 h-8">
              <img
                src="https://i.ibb.co/xLtZCRT/Mask-Group.png"
                alt="profile picture"
                className="w-full h-full"
              />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium leading-none text-gray-800">
                Anita Jane
              </p>
              <p className="text-sm font-medium leading-none text-gray-600 mt-1 cursor-pointer hover:underline">
                See profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
