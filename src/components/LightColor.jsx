export default function LightColor({ lightColor, handleRadioChange, lightOn }) {
  return (
    <div className="flex justify-evenly">
      <div>
        <input
          type="radio"
          name="radio-10"
          value={"red"}
          className="radio radio-lg radio-error checked:bg-red-500"
          checked={lightColor === "red"}
          onChange={handleRadioChange}
          disabled={!lightOn}
        />
        <div className="text-xl uppercase font-medium tracking-tight">Red</div>
      </div>
      <div>
        <input
          type="radio"
          name="radio-10"
          value={"blue"}
          className="radio radio-lg radio-primary checked:bg-blue-500"
          checked={lightColor === "blue"}
          onChange={handleRadioChange}
          disabled={!lightOn}
        />
        <div className="text-xl uppercase font-medium tracking-tight">Blue</div>
      </div>
      <div>
        <input
          type="radio"
          name="radio-10"
          value={"green"}
          className="radio radio-lg radio-success checked:bg-green-500"
          checked={lightColor === "green"}
          onChange={handleRadioChange}
          disabled={!lightOn}
        />
        <div className="text-xl uppercase font-medium tracking-tight">
          Green
        </div>
      </div>
    </div>
  );
}
