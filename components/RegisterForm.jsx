import { Button } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  FaIdBadge,
  FaLock,
  FaUnlock,
  FaUser,
} from "react-icons/fa";

import { Input } from "./controls";
import { LOGIN_PAGE } from "../config";
import logo from "../images/logo.svg";

function Register({ form, onChange, loading, onSubmit }) {
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
                label="Full Name"
                icon={<FaUser />}
                onChange={onChange}
                required
                name="full_name"
                value={form?.full_name || ""}
              />
            </div>
            <div className="my-4">
              <Input
                disabled={loading}
                label="Student/User ID"
                icon={<FaIdBadge />}
                onChange={onChange}
                required
                name="user_id"
                value={form?.user_id || ""}
              />
            </div>
            <div className="my-4">
              <Input
                disabled={loading}
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
              {loading ? "Signing Up ..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
