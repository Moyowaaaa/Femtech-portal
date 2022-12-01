import { Alert, Button } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  FaIdBadge,
  FaLock,
  FaExclamationCircle,
  FaUnlock,
  FaUser,
} from "react-icons/fa";

import { Input } from "./controls";
import { LOGIN_PAGE } from "../config";
import logo from "../images/logo.svg";

function Register({ form, onChange, loading, errors, setErrors, onSubmit }) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="bg-transparent flex items-center justify-center min-h-full w-full">
      <div className="bg-white max-w-sm rounded-md px-4 py-8 w-full sm:px-6 lg:px-8">
        <div>
          <div className="h-[50px] relative w-[200px]">
            <Image
              className="h-full w-full"
              layout="fill"
              src={logo}
              alt="femtech"
            />
          </div>
          <h2 className="italic mt-3 text-center text-base tracking-tight font-bold sm:text-lg text-primary-600 md:text-xl lg:text-2xl">
            Sign Up
          </h2>
        </div>
        {errors?.message && (
          <div className="mt-2">
            <Alert
              color="red"
              icon={<FaExclamationCircle />}
              show
              dismissible={{
                onClose: () =>
                  setErrors((prevState) => ({
                    ...prevState,
                    message: undefined,
                  })),
              }}
            >
              {errors.message}
            </Alert>
          </div>
        )}
        <form
          className="mt-4 space-y-6"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="rounded-md shadow-sm">
            <div className="my-4">
              <Input
                disabled={loading}
                error={errors?.fullName}
                label="Full Name"
                icon={<FaUser />}
                onChange={onChange}
                required
                name="fullName"
                value={form?.fullName || ""}
              />
            </div>
            <div className="my-4">
              <Input
                disabled={loading}
                error={errors?.studentId}
                label="Student ID"
                icon={<FaIdBadge />}
                onChange={onChange}
                required
                name="studentId"
                value={form?.studentId || ""}
              />
            </div>
            <div className="my-4">
              <Input
                disabled={loading}
                error={errors?.password}
                label="Password"
                icon={
                  showPassword ? (
                    <FaUnlock
                      className="hover:text-primary-500 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaLock
                      className="hover:text-primary-500 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
                onChange={onChange}
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={form?.password || ""}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link href={LOGIN_PAGE}>
              <a className="align-baseline capitalize cursor-pointer font-bold inline-block text-primary-600 text-sm hover:text-primary-600 hover:underline">
                Sign In
              </a>
            </Link>
          </div>

          <div>
            <Button
              disabled={loading}
              color="blue"
              fullWidth
              variant="gradient"
              type="submit"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

// import React from 'react'

// const RegisterForm = () => {
//   return (
//     <div className='flex flex-col gap-4 w-8/12 py-2 h-4/6 bg-[#3041DC] rounded-lg text-white px-6'>

//       <div className='h-full w-full flex flex-col justify-center'>
//       <label>Full name</label>
//         <input
//         type='text'
//         className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
//         />

//       <label>Student ID</label>
//         <input
//         type='text'
//         className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
//         />

// <label>Course</label>
//         <input
//         type='text'
//         className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
//         />

// <label>Password</label>
//         <input
//         type='password'
//         className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
//         />

//         <button className='bg-[#187DF3] text-white py-2 px-9 flex items-center mx-auto mt-[3rem] rounded-md shadow-md'>Register</button>

//       </div>

//     </div>
//   )
// }

// export default RegisterForm
