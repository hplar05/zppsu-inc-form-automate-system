"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { UserAuth } from "@/app/context/AuthContext";

export default function SignupPage() {
  const { user, googleSignIn, logOut } = UserAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      auth.onAuthStateChanged((user) => {
        if (user) {
          router.push("/");
          toast.success("Successfully Registered!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Set up Firebase listener for email
  useEffect(() => {
    const emailChangeHandler = (event) => {
      setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
      setPassword(event.target.value);
    };

    // Attach event listeners to the input fields
    const emailInput = document.getElementById("floatingInput");
    const passwordInput = document.getElementById("floatingPassword");

    if (emailInput) {
      emailInput.addEventListener("input", emailChangeHandler);
    }

    if (passwordInput) {
      passwordInput.addEventListener("input", passwordChangeHandler);
    }

    // Clean up the listeners when the component unmounts
    return () => {
      if (emailInput) {
        emailInput.removeEventListener("input", emailChangeHandler);
      }

      if (passwordInput) {
        passwordInput.removeEventListener("input", passwordChangeHandler);
      }
    };
  }, []); // Run this effect only once when the component mounts

  const NavigatetoLoginPage = () => {
    router.push("/sign-in");
  };

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", true);
      if (res.user) {
        toast.success("Successfully Registered!");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!" || "An error occurred");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <main className="flex flex-col items-center justify-center border min-h-screen bg-white">
      <div className="border rounded-xl h-[620px] sm:w-[500px] w-full bg-[#F0EEF6]  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
        <div className="flex justify-end m-3">
          <button className="mt-1 w-9 border-black text-black text-xl cursor-pointer font-bold">
            X
          </button>
        </div>
        <div className="grid justify-items-start md:pt-2 md:pl-5 pt-2 ml-2 py-2 text-black">
          <label htmlFor="" className="text-[30px] font-bold">
            Sign Up
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container grid gap-1 h-[120px] mt-12 ml-4 mr-4">
            <div className="relative mb-3">
              <input
                type="email"
                className="rounded-full peer m-0 block h-[53px] w-full  bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                id="floatingInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                })}
              />
              <div
                className={`error-message text-[#CF2E2E] ml-3 mt-1 ${
                  errors.email ? "visible" : "hidden"
                }`}
              >
                {errors.email?.type === "required" && "Email is required"}
                {errors.email?.type === "pattern" &&
                  "Entered email is in the wrong format"}
              </div>

              <label
                htmlFor="floatingInput"
                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
              >
                Email<span className="text-[#FF2222]">*</span>
              </label>
            </div>
            <div className="relative mb-3">
              <input
                type="password"
                className="rounded-full peer m-0 block h-[53px] w-full  bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                {...register("password", {
                  required: true,
                  minLength: 7,
                  maxLength: 20,
                })}
              />
              <label
                htmlFor="floatingPassword"
                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
              >
                Password<span className="text-[#FF2222]">*</span>
              </label>
              <error className=" text-[#CF2E2E] ml-3 mt-1">
                {errors.password?.type === "required" && "Password is required"}
                {errors.password?.type === "minLength" &&
                  "Entered password is less than 7 characters"}
                {errors.password?.type === "maxLength" &&
                  "Entered password is more than 20 characters"}
              </error>
            </div>
          </div>
          <div className="text-right text-black">
            <p className="italic mt-12 mb-4 mr-5 cursor-pointer">
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
            <label
              className="border rounded-xl  bg-white h-[40px] grid items-center font-bold cursor-pointer text-black text-center"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
            </label>
          </div>
          <div className="labelSignup-container">
            <p className="text-left ml-4 mt-2 text-black">
              Already have an account?{" "}
              <span
                onClick={NavigatetoLoginPage}
                className="text-[#0227EB] cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>
          <div className="ml-4 mr-4 mt-6">
            <button
              className="bg-[#CF2E2E] rounded-xl w-full  md:w-[470px] h-[50px] font-bold text-white"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
