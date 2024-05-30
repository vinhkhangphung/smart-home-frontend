export default function LightColor({ lightColor, handleRadioChange, lightOn }) {
  const textClassname = lightOn
    ? "text-lg sm:text-sm uppercase font-medium tracking-tight"
    : "text-lg sm:text-sm uppercase font-medium tracking-tight text-gray-400";

  return (
    <div className="flex-col lg:flex lg:flex-row justify-evenly w-full pl-4 sm:pl-0">
      <div>
        <input
          type="radio"
          name="radio-10"
          value={"#ff0000"}
          className="radio radio-lg radio-error checked:bg-red-500"
          checked={lightColor === "#ff0000"}
          onChange={handleRadioChange}
          disabled={!lightOn}
        />
        <div className={textClassname}>Red</div>
      </div>
      <div>
        <input
          type="radio"
          name="radio-10"
          value={"#0000ff"}
          className="radio radio-lg radio-primary checked:bg-blue-500"
          checked={lightColor === "#0000ff"}
          onChange={handleRadioChange}
          disabled={!lightOn}
        />
        <div className={textClassname}>Blue</div>
      </div>
      <div>
        <input
          type="radio"
          name="radio-10"
          value={"#00ff00"}
          className="radio radio-lg radio-success checked:bg-green-500"
          checked={lightColor === "#00ff00"}
          onChange={handleRadioChange}
          disabled={!lightOn}
        />
        <div className={textClassname}>Green</div>
      </div>
    </div>
  );
}
