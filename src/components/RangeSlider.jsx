export default function RangeSlider({
  slidername,
  lightValue,
  setlightValue,
  mouseDown,
  mouseUp,
  enable,
}) {
  const rangeColor = enable
    ? "range range-sm range-success border-2 border-black/20"
    : "range range-sm [--range-shdw:gray]";

  return (
    <div className="w-3/5">
      <input
        type="range"
        className={rangeColor}
        min="0"
        id={toString(slidername)}
        max="100"
        defaultValue={lightValue}
        onInput={(event) => setlightValue(parseInt(event.target.value))}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        disabled={!enable}
      />
      <label
        className="block uppercase text-xl font-medium text-gray-600 tracking-wide m-2"
        htmlFor={toString(slidername)}
      >
        {slidername}
      </label>
    </div>
  );
}
