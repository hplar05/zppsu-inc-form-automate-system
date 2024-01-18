"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      if (res.user) {
        toast.success("Successfully Login");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const NavigatetoSignupPage = () => {
    router.push("/sign-up");
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex flex-col items-center justify-center border min-h-screen bg-white">
      <div className="border rounded-xl h-[610px] w-[500px] bg-[#F0EEF6]  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
        <div className="flex justify-end m-3">
          <button className="mt-1 w-9 border-black text-black text-xl cursor-pointer font-bold">
            X
          </button>
        </div>
        <div className="grid justify-items-start pt-2 pl-5 text-black">
          <label htmlFor="" className="text-[30px] font-bold">
            Log In
          </label>
          <div className="label-container">
            <p className="text-left">
              By continuing, you agree to our{" "}
              <span className="text-[#0227EB] cursor-pointer">
                Terms and Conditions
              </span>{" "}
              and acknowledge that you understand{" "}
              <span className="text-[#0227EB] cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
        <div className="input-container grid gap-1 h-[120px] mt-12 ml-4 mr-4">
          <div className="relative mb-3">
            <input
              type="username"
              className="rounded-full peer m-0 block h-[58px] w-full  bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingInput"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
            >
              Username<span className="text-[#FF2222]">*</span>
            </label>
          </div>
          <div className="relative mb-3">
            <input
              type="password"
              className="rounded-full peer m-0 block h-[58px] w-full  bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="floatingPassword"
              className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
            >
              Password<span className="text-[#FF2222]">*</span>
            </label>
          </div>
        </div>
        <div className="text-right text-black">
          <p className="italic mt-9 mb-4 mr-5 cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <div className="flex flex-col items-center h-[20px] ml-5 mr-5">
          <div className="flex items-center w-full">
            <div className="flex-grow h-px bg-gray-200 dark:bg-[#00000066]"></div>
            <p className="text-white dark:text-black text-xs mx-7 font-extrabold">
              OR
            </p>
            <div className="flex-grow h-px bg-gray-200 dark:bg-[#00000066]"></div>
          </div>
        </div>
        <div className="h-[40px] grid items-center mt-3 ml-4 mr-4">
          <label className="border rounded-xl  bg-white h-[40px] grid items-center font-bold cursor-pointer text-black text-center">
            Continue with Google
          </label>
        </div>
        <div className="labelSignup-container">
          <p className="text-left ml-4 mt-2 text-black">
            Don't have an account?{" "}
            <span
              onClick={NavigatetoSignupPage}
              className="text-[#0227EB] cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
        <div className="ml-4 mr-4 mt-6">
          <button
            className="bg-[#CF2E2E] rounded-xl w-[470px] h-[50px] font-bold"
            onClick={handleSignIn}
          >
            Log In
          </button>
        </div>
      </div>
    </main>
  );
}
