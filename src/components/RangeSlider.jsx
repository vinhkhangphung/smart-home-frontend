export default function RangeSlider({
  slidername,
  lightValue,
  setlightValue,
  mouseDown,
  mouseUp,
  enable,
}) {
  return (
    <div>
      <input
        type="range"
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
        className="block uppercase text-2xl font-medium text-gray-600 tracking-wide m-2"
        htmlFor={toString(slidername)}
      >
        {slidername}
      </label>
    </div>
  );
}
