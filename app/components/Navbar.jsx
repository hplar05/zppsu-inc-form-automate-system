import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex ml-6">
        <li>LOGO</li>
      </ul>
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/">Profile</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/">About</Link>
        </li>
        <li className="ml-10 mr-6 p-2 cursor-pointer bg-[#CF2E2E] rounded-md h-13 w-16 text-center">
          <Link href="/sign-in">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
