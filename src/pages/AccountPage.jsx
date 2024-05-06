import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";

const AccountPage = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="mx-auto py-8 bg-gray-800 flex w-full h-[85vh]">
        <SideBar />
        <div className="w-full bg-primary ml-4 rounded-sm border-0 text-white space-y-4 pl-4 pt-4">
          <div className="avatar">
            <div className="w-36 mask mask-squircle">
              <img src="https://picsum.photos/200/300" />
            </div>
          </div>
          <div className="collapse bg-slate-700">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title text-xl font-medium">Name</div>
            <div className="collapse-content">
              <div className="font-semibold text-lg bg-slate-400 w-fit p-2 rounded-md text-gray-700">
                {user.username}
              </div>
              <button className="mt-4">edit</button>
            </div>
          </div>
          <div className="collapse bg-slate-600">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium">Email</div>
            <div className="collapse-content">
              <div className="font-semibold text-lg bg-slate-400 w-fit p-2 rounded-md text-gray-700">
                {user.username}
              </div>
              <button className="mt-4">edit</button>
            </div>
          </div>
          <div className="collapse bg-slate-500">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium">Password</div>
            <div className="collapse-content">
              <div className="font-semibold text-lg bg-slate-400 w-fit p-2 rounded-md text-gray-700">
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
