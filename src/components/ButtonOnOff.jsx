export default function ButtonOnOff({ handleClick, lightOn }) {
  return (
    <div className="text-white">
      <label className="swap">
        <input type="checkbox" onClick={handleClick} />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          viewBox="0 0 16 16"
          className="swap-off fill-red-400"
        >
          <path d="M7.5 1v7h1V1z" />
          <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          viewBox="0 0 16 16"
          className="swap-on fill-green-400"
        >
          <path d="M7.5 1v7h1V1z" />
          <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
        </svg>
      </label>
    </div>
  );
}
