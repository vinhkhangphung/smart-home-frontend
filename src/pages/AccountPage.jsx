import React, { useState } from "react";
import SideBar from "../components/SideBar";

const AccountPage = () => {
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to update the account information here
    console.log("Account info:", accountInfo);
  };

  return (
    <>
      <div className="mx-auto py-8 bg-gray-800 flex w-full">
        <SideBar />
        <div className="w-full bg-primary ml-4 rounded-sm border-0 text-white">
          <div>
            <h1>Account Page</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={accountInfo.name}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={accountInfo.email}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={accountInfo.password}
                  onChange={handleChange}
                />
              </label>
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
