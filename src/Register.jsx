"use client";
import React from "react";
import { useState } from "react";
import logo from "./picture/logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Button } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Register() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const onSubmit = (data) => console.log(data);

  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    thainationalidcard: "",
    prefix: "",
    firstname: "",
    lastname: "",
    gender: "",
    dateofbirth: "",
    ethnicity: "",
    nationality: "",
    religion: "",
    maritalstatus: "",
    bloodgroup: "",
    historyofallergy: "",
    addressinthailand: "",
    moo: "",
    soi: "",
    street: "",
    subdistrict: "",
    district: "",
    province: "",
    postalcode: "",
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    confirmpassword: "",
  });
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValue(name, value);
  };
  const next = () => {
    if (
      formNo === 1 &&
      state.email &&
      state.username &&
      state.password &&
      state.confirmpassword
    ) {
      setFormNo(formNo + 1);
    } else if (
      formNo === 2 &&
      state.thainationalidcard &&
      state.prefix &&
      state.firstname &&
      state.lastname &&
      state.gender &&
      state.dateofbirth &&
      state.ethnicity &&
      state.nationality &&
      state.religion &&
      state.maritalstatus &&
      state.bloodgroup &&
      state.historyofallergy
    ) {
      setFormNo(formNo + 1);
    }
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };
  const finalSubmit = () => {
    if (
      state.addressinthailand &&
      state.moo &&
      state.soi &&
      state.street &&
      state.subdistrict &&
      state.district &&
      state.province &&
      state.postalcode &&
      state.phonenumber
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <ToastContainer />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      ></div>

      {/*Header*/}
      <div className="mx-auto max-w-2xl text-center">
        <img alt="logo" src={logo} className="mx-auto h-10 w-auto" />
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-xl mt-8">
          Get Started create your profile now!
        </h2>
        <p className="text-sm font-medium text-gray-600 mt-2">
          Enter the login information for your account. You will <br></br>
          be able to create additaional users after registering.
        </p>
      </div>

      {/*Stepper*/}
      <div className="flex justify-center items-center mt-6">
        {formArray.map((v, i) => (
          <>
            <div
              className={`w-[35px] my-3 text-white rounded-full ${
                formNo - 1 === i ||
                formNo - 1 === i + 1 ||
                formNo === formArray.length
                  ? "bg-blue-600"
                  : "bg-gray-300"
              } h-[35px] flex justify-center items-center`}
            >
              {v}
            </div>
            {i !== formArray.length - 1 && (
              <div
                className={`w-[200px] h-[3px] ${
                  formNo === i + 2 || formNo === formArray.length
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              ></div>
            )}
          </>
        ))}
      </div>

      {/*Forms*/}
      {formNo === 1 && (
        <div>
          {/* General Info Section */}
          <div className="mx-auto mt-6 max-w-xl text-left">
            <h3 className="text-sm font-medium text-gray-600">Step 1</h3>
            <p className="text-normal font-semibold text-gray-900 mt-1">
              Account
            </p>
            {/*<hr className="mt-4 border-gray-300" />*/}
          </div>

          <form
            action="#"
            method="POST"
            className="mx-auto max-w-xl sm:mt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email and Username in the same row */}
            <div className="mb-6 flex space-x-6">
              {/* Email */}
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Email
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is Required",
                      pattern: {
                        value:
                          /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                        message: "Email is invalid",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.email?.message)}
                        {...field}
                        value={state.email}
                        onChange={inputHandle}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="someone@gmail.com"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.email?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.email?.message && (
                    <span className="error-text">{errors?.email?.message}</span>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Username
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: "Username is Required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.username?.message)}
                        {...field}
                        value={state.username}
                        onChange={inputHandle}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="username"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.username?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.username?.message && (
                    <span className="error-text">
                      {errors?.username?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Password and Confirm Password in the same row */}
            <div className="mb-6 flex space-x-6">
              {/* Password */}
              <div className="flex-1">
                <label
                  htmlFor="password"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Password
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is Required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                        message:
                          "Your password must be larger then 8 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.password?.message)}
                        {...field}
                        value={state.password}
                        onChange={inputHandle}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        autoComplete="password"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.password?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.password?.message && (
                    <span className="error-text">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex-1">
                <label
                  htmlFor="confirmpassword"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Confirm password
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="confirmpassword"
                    control={control}
                    rules={{
                      required: "Confirm Password is Required",
                      validate: (value) =>
                        getValues("password") === value ||
                        "Passwords do not match",
                    }}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.confirmpassword?.message)}
                        {...field}
                        value={state.confirmpassword}
                        onChange={inputHandle}
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        placeholder="confirm password"
                        autoComplete="confirm-password"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.confirmpassword?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.confirmpassword?.message && (
                    <span className="error-text">
                      {errors?.confirmpassword?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-between">
              <Button
                variant="text"
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "#2563eb" }}
                onClick={() => navigate("/login")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 12H3m0 0l3.75-3.75M3 12l3.75 3.75"
                  />
                </svg>
                Back to Login
              </Button>
              <Button
                type="submit"
                onClick={next}
                disabled={Object.keys(errors).length > 0}
                className="block w-medium rounded-md bg-[#2563eb] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#3b82f6] 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-[#2563eb]"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      )}

      {formNo === 2 && (
        <div>
          {/* General Info Section */}
          <div className="mx-auto mt-6 max-w-xl text-left">
            <h3 className="text-sm font-medium text-gray-600">Step 2</h3>
            <p className="text-normal font-semibold text-gray-900 mt-1">
              Personal Information
            </p>
            {/*<hr className="mt-4 border-gray-300" />*/}
          </div>

          <form
            action="#"
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-6"
          >
            {/* Thai National ID Card */}
            <div className="mb-6">
              <label
                htmlFor="thainationalidcard"
                className="flex items-center mb-2 text-gray-600 text-sm font-medium"
              >
                Thai National ID Card
                <svg
                  width="7"
                  height="7"
                  className="ml-1"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                    fill="#EF4444"
                  />
                </svg>
              </label>
              <div className="mt-2.5">
                <Controller
                  name="thainationalidcard"
                  control={control}
                  rules={{
                    required: "Thai National ID card is required",
                    pattern: {
                      value: /^\d{13}$/,
                      message:
                        "Thai National ID card number must be exactly 13 digits",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      error={Boolean(errors?.thainationalidcard?.message)}
                      {...field}
                      value={state.thainationalidcard}
                      onChange={inputHandle}
                      id="thainationalidcard"
                      name="thainationalidcard"
                      type="number"
                      className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                        errors?.thainationalidcard?.message
                          ? "ring-red-500"
                          : ""
                      }`}
                    />
                  )}
                />
                {errors?.thainationalidcard?.message && (
                  <span className="error-text">
                    {" "}
                    {errors?.thainationalidcard?.message}{" "}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              {/* Prefix */}
              <div>
                <label
                  htmlFor="prefix"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Prefix
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5 relative">
                  <Controller
                    name="prefix"
                    control={control}
                    rules={{ required: "Prefix is Required" }}
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          {...field}
                          value={state.prefix}
                          onChange={inputHandle}
                          id="prefix"
                          name="prefix"
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                            errors?.prefix?.message ? "ring-red-500" : ""
                          }`}
                        >
                          <option value="" disabled selected>
                            Select{" "}
                          </option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Ms</option>
                          <option value="Miss">Miss</option>
                          <option value="Mister">Mister</option>
                          <option value="Boy">Boy</option>
                          <option value="Girl">Girl</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.prefix?.message && (
                    <span className="error-text text-red-500">
                      {errors?.prefix?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstname"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  First Name
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="firstname"
                    control={control}
                    rules={{ required: "First Name is Required" }}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.firstname?.message)}
                        {...field}
                        value={state.firstname}
                        onChange={inputHandle}
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="given-name"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.firstname?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.firstname?.message && (
                    <span className="error-text">
                      {errors?.firstname?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastname"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Last Name
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="lastname"
                    control={control}
                    rules={{ required: "Last Name is Required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        error={Boolean(errors?.lastname?.message)}
                        value={state.lastname}
                        onChange={inputHandle}
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="family-name"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.lastname?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.lastname?.message && (
                    <span className="error-text">
                      {errors?.lastname?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-6 mt-6">
              <label
                htmlFor="gender"
                className="flex items-center mb-2 text-gray-600 text-sm font-medium"
              >
                Gender
                <svg
                  width="7"
                  height="7"
                  className="ml-1"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                    fill="#EF4444"
                  />
                </svg>
              </label>
              <div className="mt-2.5 relative">
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is Required" }}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={state.gender}
                        onChange={inputHandle}
                        id="gender"
                        name="gender"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.gender?.message ? "ring-red-500" : ""
                        }`}
                      >
                        <option value="" disabled selected>
                          Select{" "}
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                      />
                    </div>
                  )}
                />
                {errors?.gender?.message && (
                  <span className="error-text text-red-500">
                    {errors?.gender?.message}
                  </span>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="mb-6 mt-6">
              <label
                htmlFor="dateofbirth"
                className="flex items-center mb-2 text-gray-600 text-sm font-medium"
              >
                Date of birth
                <svg
                  width="7"
                  height="7"
                  className="ml-1"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                    fill="#EF4444"
                  />
                </svg>
              </label>
              <div className="mt-2.5 relative">
                <Controller
                  name="dateofbirth"
                  control={control}
                  rules={{
                    required: "Date of birth is required",
                    validate: {
                      min: (value) => {
                        const year = new Date(value).getFullYear(); 
                        return (
                          year <= currentYear - 5 ||
                          "Date of birth year must be at least 5 years ago"
                        );
                      },
                      max: (value) => {
                        const year = new Date(value).getFullYear(); 
                        return (
                          year <= currentYear ||
                          "Date of birth year cannot be in the future"
                        );
                      },
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      error={Boolean(errors?.dateofbirth?.message)}
                      value={state.dateofbirth}
                      onChange={inputHandle}
                      type="date"
                      id="dateofbirth"
                      name="dateofbirth"
                      className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                        errors?.dateofbirth?.message ? "ring-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors?.dateofbirth?.message && (
                  <span className="error-text">
                    {errors?.dateofbirth?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              {/* Ethnicity */}
              <div>
                <label
                  htmlFor="ethnicity"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Ethnicity
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5 relative">
                  <Controller
                    name="ethnicity"
                    control={control}
                    rules={{ required: "Ethnicity is Required" }}
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          {...field}
                          value={state.ethnicity}
                          onChange={inputHandle}
                          id="ethnicity"
                          name="ethnicity"
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                            errors?.ethnicity?.message ? "ring-red-500" : ""
                          }`}
                        >
                          <option value="" disabled selected>
                            Select{" "}
                          </option>
                          <option value="Thailand">Thailand</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="South Korea">South Korea</option>
                          <option value="China">China</option>
                          <option value="Japan">Japan</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Vietnam">Vietnam</option>
                          <option value="United States">United States</option>
                          <option value="England">England</option>
                          <option value="Others">Others</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.ethnicity?.message && (
                    <span className="error-text text-red-500">
                      {errors?.ethnicity?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Nationality */}
              <div>
                <label
                  htmlFor="nationality"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Nationality
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5 relative">
                  <Controller
                    name="nationality"
                    control={control}
                    rules={{ required: "Nationality is Required" }}
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          {...field}
                          value={state.nationality}
                          onChange={inputHandle}
                          id="nationality"
                          name="nationality"
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                            errors?.nationality?.message ? "ring-red-500" : ""
                          }`}
                        >
                          <option value="" disabled selected>
                            Select{" "}
                          </option>
                          <option value="Thailand">Thailand</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="South Korea">South Korea</option>
                          <option value="China">China</option>
                          <option value="Japan">Japan</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Vietnam">Vietnam</option>
                          <option value="United States">United States</option>
                          <option value="England">England</option>
                          <option value="Others">Others</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.nationality?.message && (
                    <span className="error-text text-red-500">
                      {errors?.nationality?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Religion */}
              <div>
                <label
                  htmlFor="religion"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Religion
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5 relative">
                  <Controller
                    name="religion"
                    control={control}
                    rules={{ required: "Religion is Required" }}
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          {...field}
                          value={state.religion}
                          onChange={inputHandle}
                          id="religion"
                          name="religion"
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                            errors?.religion?.message ? "ring-red-500" : ""
                          }`}
                        >
                          <option value="" disabled selected>
                            Select{" "}
                          </option>
                          <option value="Buddhism">Buddhism</option>
                          <option value="Christianity">Christianity</option>
                          <option value="Islam">Islam</option>
                          <option value="Unknown">unknown</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.religion?.message && (
                    <span className="error-text text-red-500">
                      {errors?.religion?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mb-6 mt-6">
              {/* Marital Status */}
              <div>
                <label
                  htmlFor="maritalstatus"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Marital Status
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5 relative">
                  <Controller
                    name="maritalstatus"
                    control={control}
                    rules={{ required: "Maritalstatus is Required" }}
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          {...field}
                          value={state.maritalstatus}
                          onChange={inputHandle}
                          id="maritalstatus"
                          name="maritalstatus"
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                            errors?.maritalstatus?.message ? "ring-red-500" : ""
                          }`}
                        >
                          <option value="" disabled selected>
                            Select{" "}
                          </option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.maritalstatus?.message && (
                    <span className="error-text text-red-500">
                      {errors?.maritalstatus?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label
                  htmlFor="bloodgroup"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Blood Group
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5 relative">
                  <Controller
                    name="bloodgroup"
                    control={control}
                    rules={{ required: "Blood Group is Required" }}
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          {...field}
                          value={state.bloodgroup}
                          onChange={inputHandle}
                          id="bloodgroup"
                          name="bloodgroup"
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                            errors?.bloodgroup?.message ? "ring-red-500" : ""
                          }`}
                        >
                          <option value="" disabled selected>
                            Select{" "}
                          </option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="AB">AB</option>
                          <option value="O">O</option>
                          <option value="Unknown">Unknown</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.bloodgroup?.message && (
                    <span className="error-text text-red-500">
                      {errors?.bloodgroup?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* History of Allergy */}
              <div>
                <label
                  htmlFor="historyofallergy"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  History of Allergy
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5 relative">
                  <Controller
                    name="historyofallergy"
                    control={control}
                    rules={{ required: "History of allergy is Required" }}
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          {...field}
                          value={state.historyofallergy}
                          onChange={inputHandle}
                          id="historyofallergy"
                          name="historyofallergy"
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                            errors?.historyofallergy?.message
                              ? "ring-red-500"
                              : ""
                          }`}
                        >
                          <option value="" disabled selected>
                            Select{" "}
                          </option>
                          <option value="No Allergy">No Allergy</option>
                          <option value="Unknown">Unknown</option>
                          <option value="Yes">Yes</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.historyofallergy?.message && (
                    <span className="error-text text-red-500">
                      {errors?.historyofallergy?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-between">
              <button
                onClick={pre}
                type="button"
                className="w-1/2 mr-2 rounded-md bg-[#f5f5f5] px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-[#fafafa] 
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f5f5]"
              >
                Back
              </button>
              <button
                onClick={next}
                disabled={Object.keys(errors).length > 0}
                type="submit"
                className="w-1/2 ml-2 rounded-md bg-[#2563eb] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#3b82f6] 
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-[#2563eb]"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      )}

      {formNo === 3 && (
        <div>
          {/* General Info Section */}
          <div className="mx-auto mt-6 max-w-xl text-left">
            <h3 className="text-sm font-medium text-gray-600">Step 3</h3>
            <p className="text-normal font-semibold text-gray-900 mt-1">
              Address Information
            </p>
            {/*<hr className="mt-4 border-gray-300" />*/}
          </div>

          <form
            action="#"
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-6"
          >
            {/* Address in Thailand */}
            <div className="mb-6">
              <label
                htmlFor="addressinthailand"
                className="flex items-center mb-2 text-gray-600 text-sm font-medium"
              >
                Address in Thailand
                <svg
                  width="7"
                  height="7"
                  className="ml-1"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                    fill="#EF4444"
                  />
                </svg>
              </label>
              <div className="mt-2.5">
                <Controller
                  name="addressinthailand"
                  control={control}
                  rules={{ required: "Address is Required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      error={Boolean(errors?.addressinthailand?.message)}
                      value={state.addressinthailand}
                      onChange={inputHandle}
                      id="addressinthailand"
                      name="addressinthailand"
                      type="text"
                      className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                        errors?.addressinthailand?.message ? "ring-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors?.addressinthailand?.message && (
                  <span className="error-text">
                    {errors?.addressinthailand?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              {/* Moo */}
              <div>
                <label
                  htmlFor="moo"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Moo
                </label>
                <div className="mt-2.5">
                  <input
                    value={state.moo}
                    onChange={inputHandle}
                    id="moo"
                    name="moo"
                    type="text"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Soi */}
              <div>
                <label
                  htmlFor="soi"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Soi
                </label>
                <div className="mt-2.5">
                  <input
                    value={state.soi}
                    onChange={inputHandle}
                    id="soi"
                    name="soi"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Street */}
              <div>
                <label
                  htmlFor="street"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Street
                </label>
                <div className="mt-2.5">
                  <input
                    value={state.street}
                    onChange={inputHandle}
                    id="street"
                    name="street"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mt-6">
              {/* Sub district */}
              <div>
                <label
                  htmlFor="subdistrict"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Sub district
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="subdistrict"
                    control={control}
                    rules={{ required: "Sub district is Required" }}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.subdistrict?.message)}
                        {...field}
                        value={state.subdistrict}
                        onChange={inputHandle}
                        id="subdistrict"
                        name="subdistrict"
                        type="text"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.subdistrict?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.subdistrict?.message && (
                    <span className="error-text">
                      {errors?.subdistrict?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* District */}
              <div>
                <label
                  htmlFor="district"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  District
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="district"
                    control={control}
                    rules={{ required: "District is Required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        error={Boolean(errors?.district?.message)}
                        value={state.district}
                        onChange={inputHandle}
                        id="district"
                        name="district"
                        type="text"
                        autoComplete="district"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.district?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.district?.message && (
                    <span className="error-text">
                      {errors?.district?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Province */}
              <div>
                <label
                  htmlFor="province"
                  className="flex items-center mb-2 text-gray-600 text-sm font-medium"
                >
                  Province
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <div className="mt-2.5">
                  <Controller
                    name="province"
                    control={control}
                    rules={{ required: "Province is Required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        error={Boolean(errors?.province?.message)}
                        value={state.province}
                        onChange={inputHandle}
                        id="province"
                        name="province"
                        type="text"
                        autoComplete="province"
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                          errors?.province?.message ? "ring-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors?.province?.message && (
                    <span className="error-text">
                      {errors?.province?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Postal code */}
            <div className="mb-6 mt-6">
              <label
                htmlFor="postalcode"
                className="flex items-center mb-2 text-gray-600 text-sm font-medium"
              >
                Postal code
                <svg
                  width="7"
                  height="7"
                  className="ml-1"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                    fill="#EF4444"
                  />
                </svg>
              </label>
              <div className="mt-2.5">
                <Controller
                  name="postalcode"
                  control={control}
                  rules={{ required: "Postalcode is Required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      error={Boolean(errors?.postalcode?.message)}
                      value={state.postalcode}
                      onChange={inputHandle}
                      id="postalcode"
                      name="postalcode"
                      type="number"
                      autoComplete="postal-code"
                      className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                        errors?.postalcode?.message ? "ring-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors?.postalcode?.message && (
                  <span className="error-text">
                    {errors?.postalcode?.message}
                  </span>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-6 mt-6">
              <label
                htmlFor="phonenumber"
                className="flex items-center mb-2 text-gray-600 text-sm font-medium"
              >
                Phone Number
                <svg
                  width="7"
                  height="7"
                  className="ml-1"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                    fill="#EF4444"
                  />
                </svg>
              </label>
              <div className="mt-2.5">
                <Controller
                  name="phonenumber"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^0\d{8,9}$/,
                      message: "Phone number is invalid",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      error={Boolean(errors?.phonenumber?.message)}
                      value={state.phonenumber}
                      onChange={inputHandle}
                      id="phonenumber"
                      name="phonenumber"
                      type="number"
                      autoComplete="tel"
                      className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                        errors?.phonenumber?.message ? "ring-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors?.phonenumber?.message && (
                  <span className="error-text">
                    {errors?.phonenumber?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-5 h-5 cursor-pointer border border-blue-300 rounded-md mr-2 hover:border-blue-500 hover:bg-blue-100 checked:bg-blue-500 checked:border-blue-500"
              />
              <label
                htmlFor="link-checkbox"
                className="text-xs font-regular cursor-pointer text-gray-600"
              >
                I have read and agreed to the{" "}
                <a href="#" className="text-blue-600">
                  terms and conditions.
                </a>
              </label>
            </div>

            <div className="mt-10 flex justify-between">
              <button
                onClick={pre}
                type="button"
                className="w-1/2 mr-2 rounded-md bg-[#f5f5f5] px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-[#fafafa] 
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f5f5]"
              >
                Back
              </button>
              <button
                onClick={finalSubmit}
                disabled={Object.keys(errors).length > 0}
                type="submit"
                className="w-1/2 ml-2 rounded-md bg-[#2563eb] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#3b82f6] 
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-[#2563eb]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
