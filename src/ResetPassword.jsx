import React from "react";
import logo from "./picture/logo.png";

export default function Example() {
return (
<>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
        <img alt="logo" src={logo} className="h-10 w-auto" />
        <span className="text-xl font-semibold text-slate-900">LIS</span>
        </div>
    </div>

    <h4 className="block text-base font-semibold text-slate-800 text-center mt-10">
        Reset your password
    </h4>
    <p className="text-slate-500 text-sm font-medium text-center mt-1">
        Enter your email and we will send you a link to reset your <br />
        password.
    </p>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
        <div>
            <label
            htmlFor="email-address"
            className="block text-base font-semibold leading-6 text-slate-800"
            >
            Email address
            </label>
            <div className="mt-2 flex max-w-md gap-x-4">
            <input
                id="email-address"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-slate/5 px-3.5 py-2 text-gray-900 shadow-sm ring-2 ring-inset ring-blue/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            />
            </div>
        </div>

        <div>
            <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
            Send password reset email
            </button>
        </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <a
            href="/register"
            className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
        >
            Register
        </a>
        </p>
    </div>
    </div>
</>
);
}
