import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { resolve } from "styled-jsx/css";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  console.log(user);
  return (
    <div className="bg-white h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex ml-6 mr-10 text-black">
        <li className="text-[#CF2E2E] text-xl font-bold cursor-pointer">
          ZPPSU
        </li>
      </ul>
      {loading ? null : !user ? (
        <ul>
          <li className="ml-10 mr-6 p-2 cursor-pointer bg-[#CF2E2E] rounded-md h-13 w-16 text-center text-white">
            <Link href="/sign-in">Login</Link>
          </li>
        </ul>
      ) : (
        <div className="p-1 flex">
          <p className="ml-3 mr-2">
            Welcome, <span className="text-[#CF2E2E]">{user.email}</span>
          </p>
          <button
            className="ml-3 mr-6 ccursor-pointer bg-[#CF2E2E] rounded-md  w-20 text-center text-white"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
