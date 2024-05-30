import React from "react";

export default function Numpad({ pwd, setPwd, handleEnterClick }) {
  // const [password, setPassword] = useState("");
  const password = pwd;
  const setPassword = setPwd;

  const handleNumberClick = (number) => {
    if (password.length < 6) {
      setPassword(password + number);
    } else {
      handleEnterClick(); // Trigger "Enter" action automatically
    }
  };

  const handleEraseClick = () => {
    setPassword("");
  };

  return (
    <div className="text-2xl lg:text-4xl ml-4 lg:ml-0">
      <div className="text-xl lg:text-2xl uppercase font-semibold text-gray-600/75">
        Door locking
      </div>
      <div className="bg-white w-full border border-slate-800 rounded-md h-12 text-slate-900 tracking-widest">
        {password}
      </div>
      <div className="flex justify-between mt-2">
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("1")}
        >
          1
        </button>
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("2")}
        >
          2
        </button>
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("3")}
        >
          3
        </button>
      </div>
      <div className="flex justify-between">
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("4")}
        >
          4
        </button>
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("5")}
        >
          5
        </button>
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("6")}
        >
          6
        </button>
      </div>
      <div className="flex justify-between">
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("7")}
        >
          7
        </button>
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("8")}
        >
          8
        </button>
        <button
          className="mx-2 my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("9")}
        >
          9
        </button>
      </div>
      <div className="flex justify-between relative">
        <button
          className="mx-auto my-2 p-4 border border-slate-400 rounded-md"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button
          className="absolute left-0 top-4 lg:text-5xl text-3xl"
          onClick={() => handleEraseClick()}
        >
          ⌫
        </button>
        <button
          className="absolute right-0 lg:text-8xl text-6xl h-min"
          onClick={() => handleEnterClick()}
        >
          ⏎
        </button>
      </div>
    </div>
  );
}
