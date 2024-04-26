import SideBar from "../components/SideBar";
import RangeSlider from "../components/RangeSlider";
import { useState, useEffect } from "react";
import ButtonOnOff from "../components/ButtonOnOff";
import LightColor from "../components/LightColor";
import Numpad from "../components/Numpad";

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function ControlPage() {
  const [lightOn, setLightOn] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [lightColor, setLightColor] = useState("blue");

  /* TODO: fetch lightOn status and lightIntensity from the server */
  useEffect(() => {
    const fetchData = async () => {
      // Replace with your actual fetch logic
      //   const response = await fetch(/* your server endpoint */);
      //   const data = await response.json();
      //   setLightOn(data.lightOn);
      //   setLightIntensity(data.lightIntensity);
    };

    fetchData();
  }, []);

  const handleClick = () => {
    // TODO: send lightOn status to the server
    setLightOn(!lightOn);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    console.log("Drag started");
  };

  const handleDragEnd = debounce((sendFunction) => {
    if (!isDragging) return;
    setIsDragging(false);
    sendFunction();
    // TODO: send lightIntensity to the server
  }, 500);

  const sendLightIntensity = () => {
    // TODO: send lightIntensity to the server
    console.log("Light intensity sent: ", lightIntensity);
  };

  const handleRadioChange = (event) => {
    setLightColor(event.target.value);
    // TODO: send lightColor to the server
  };

  return (
    <>
      <div className="mx-auto py-8 bg-gray-800 flex w-full">
        <SideBar />
        <div className="w-full bg-primary ml-4 py-4 rounded-sm border-0 text-white flex text-center">
          <div className="w-1/3">
            <ButtonOnOff handleClick={handleClick} lightOn={lightOn} />
            <RangeSlider
              slidername={"Brightness"}
              lightValue={lightIntensity}
              setlightValue={setLightIntensity}
              mouseDown={handleDragStart}
              mouseUp={() => handleDragEnd(sendLightIntensity)}
              enable={lightOn}
            />
            <LightColor
              lightColor={lightColor}
              handleRadioChange={handleRadioChange}
              lightOn={lightOn}
            />
          </div>
          <Numpad />
        </div>
      </div>
    </>
  );
}
