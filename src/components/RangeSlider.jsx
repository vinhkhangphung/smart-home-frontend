import React from "react";
export default function RangeSlider({ label, value, setvalue }) {
  return (
    <div>
      <input
        type="range"
        min="0"
        id={label}
        max="100"
        value={value}
        onChange={(event) => setvalue(parseInt(event.target.value))}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
}
