import React from "react";
import logo from './picture/logo.png';
import { useForm, Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";


export default function Login() {
    const {control,handleSubmit,formState: { errors }} = useForm({ mode: "onTouched" });
    const onSubmit = (data) => console.log(data);
return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="logo" src={logo} className="mx-auto h-10 w-auto" />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {/* Username */}
            <div>
    <div className="flex flex-col gap-5">
        <div className="relative">
            <label className="flex items-center mb-2 text-gray-900 text-sm font-medium">
                Username 
                <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path>
                </svg>
            </label>
            <Controller
            name="username"
            rules={{ required: "Username is Required", minLength: { value: 3, message: "Minimum 3 characters required",},}}
            control={control}
            render={({ field }) => (
            <Input
                error={Boolean(errors?.username?.message)}
                {...field}
                type="text" 
                id="username" 
                className={`block w-full rounded-lg border border-gray-300 py-1.5 px-4 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                    errors?.username?.message ? "ring-red-500" : ""
                }`}
                placeholder="username"
                autoComplete="email"
            /> )} />
        {errors?.username?.message && (<span className="error-text">{errors?.username?.message}</span>)}
        </div>
    </div>
</div>

            {/* Password */}
            <div>
                <div className="flex items-center justify-between">
                <label
                    htmlFor="password"
                    className="flex items-center mb-2 text-gray-900 text-sm font-medium"
                >
                    Password
                    <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path>
                    </svg>
                </label>
                <div className="text-sm">
                    <a
                    href="#"
                    className="font-semibold text-blue-500 hover:text-blue-400"
                    >
                    Forgot password?
                    </a>
                </div>
                </div>
                <div className="mt-2">
                <Controller
                name="password"
                control={control}
                rules={{ required: "Password is Required", }}
                render={({ field }) => (
                <Input
                    error={Boolean(errors?.password?.message)}
                    {...field}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={`block w-full rounded-lg border border-gray-300 py-1.5 px-4 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 appearance-none ${
                        errors?.password?.message ? "ring-red-500" : ""
                    }`}
                    placeholder="password"
                /> )} />
            {errors?.password?.message && ( <span className="error-text">{errors?.password?.message}</span> )}
                </div>
            </div>

            {/* Button */}
            <div>
                <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                Login
                </button>
            </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/register" className="font-semibold leading-6 text-blue-500 hover:text-blue-400">
            Register
            </a>
            </p>

        </div>
    </div>
    </>
    );
}
