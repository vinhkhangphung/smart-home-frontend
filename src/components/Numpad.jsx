import React, { useState } from "react";

export default function Numpad() {
  const [password, setPassword] = useState("");

  const handleNumberClick = (number) => {
    if (password.length < 6) {
      setPassword(password + number);
    } else {
      handleEnterClick(); // Trigger "Enter" action automatically
    }
  };

  const handleEnterClick = () => {
    // Handle enter button click here
    console.log("Entered password:", password);
  };

  const handleEraseClick = () => {
    setPassword("");
  };

  return (
    <div className="text-4xl">
      <div className="bg-white w-full border border-slate-800 rounded-md h-12 text-slate-900 tracking-widest">
        {password}
      </div>
      <div className="flex justify-between">
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("1")}
        >
          1
        </button>
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("2")}
        >
          2
        </button>
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("3")}
        >
          3
        </button>
      </div>
      <div className="flex justify-between">
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("4")}
        >
          4
        </button>
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("5")}
        >
          5
        </button>
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("6")}
        >
          6
        </button>
      </div>
      <div className="flex justify-between">
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("7")}
        >
          7
        </button>
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("8")}
        >
          8
        </button>
        <button
          className="mx-2 my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("9")}
        >
          9
        </button>
      </div>
      <div className="flex justify-between relative">
        <button
          className="mx-auto my-2 p-4 border border-grey-800 rounded-md"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button
          className="absolute left-0 top-4 text-5xl"
          onClick={() => handleEraseClick()}
        >
          ⌫
        </button>
        <button
          className="absolute right-0 text-8xl h-min"
          onClick={() => handleEnterClick()}
        >
          ⏎
        </button>
      </div>
    </div>
  );
}
