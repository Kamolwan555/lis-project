import React from "react";
import logo from "./picture/logo.png";
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";

const ResetPassword = () => {
    const {control,handleSubmit,formState: { errors }} = useForm({ mode: "onTouched" });
    const onSubmit = (data) => console.log(data);
    return (
        <div className="flex justify-center items-center min-h-screen bg-white-100">
            <div className="relative flex flex-col rounded-xl bg-transparent items-center mt-8">
                {/* Logo */}
                <div className="flex items-center space-x-2 mb-4">
                    <img alt="logo" src={logo} className="h-10 w-auto" />
                    <span className="text-xl font-semibold text-slate-800">LIS</span>
                </div>

                {/* Head */}
                <h4 className="block text-base font-semibold text-slate-700 text-center mt-10">
                    Reset your password
                </h4>
                <p className="text-slate-500 text-sm font-medium text-center mt-1">
                    Enter your email and we will send you a link to reset your <br />
                    password.
                </p>

                {/* Body */}
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                            Email address
                        </label>
                        <Controller
                        name="email"
                        control={control}
                        rules={{ pattern: { value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, message: "We can't find a user with that email address.", }, }}
                        render={({ field }) => (
                        <Input
                            {...field}
                            error={Boolean(errors?.email?.message)}
                            type="email"
                            className={`w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-blue-600 shadow-sm focus:shadow appearance-none ${
                                errors?.email?.message ? "ring-red-500" : ""
                            }`}
                        /> )} />
                    {errors?.email?.message && (<span className="error-text">{errors?.email?.message}</span>)}
                    </div>
                    <button
                        className="mt-8 w-full rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm font-medium text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-600 focus:shadow-none active:bg-blue-600 hover:bg-blue-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Reset your password
                    </button>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <a
                            href="/register"
                            className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
                        >
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
