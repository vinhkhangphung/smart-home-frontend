import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";

const AccountPage = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="mx-auto py-4 bg-slate-100 flex w-full h-[88vh]">
        <SideBar />
        <div className="w-full bg-slate-100 mx-4 rounded-sm border-0 text-gray-600 space-y-4 pl-4 pt-4">
          <div className="avatar w-full">
            <div className="w-40 mask mask-squircle relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <img src={user.picture} />
            </div>
            <div className="text-black font-medium text-6xl pl-8 pt-4 h-36 w-2/3">
              Hello, {user.name}
            </div>
          </div>
          <div className="collapse bg-blue-400/[.6] pl-2">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title text-2xl font-medium tracking-wide">
              Name
            </div>
            <div className="collapse-content">
              <div className="font-semibold text-lg bg-stone-300 w-fit p-2 rounded-md text-gray-700">
                {user.name}
              </div>
              <button className="mt-4">edit</button>
            </div>
          </div>
          <div className="collapse bg-blue-400 pl-2">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-2xl font-medium tracking-wide">
              Email
            </div>
            <div className="collapse-content">
              <div className="font-semibold text-lg bg-stone-300 w-fit p-2 rounded-md text-gray-700">
                {user.email}
              </div>
              <button className="mt-4">edit</button>
            </div>
          </div>
          <div className="collapse bg-blue-400/[.4] pl-2">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-2xl font-medium tracking-wide">
              Password
            </div>
            <div className="collapse-content">
              <div className="font-semibold text-lg bg-stone-300 w-fit p-2 rounded-md text-gray-700">
                {user.password}
              </div>
              <button className="mt-4">edit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
