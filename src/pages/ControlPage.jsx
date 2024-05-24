import SideBar from "../components/SideBar";
import RangeSlider from "../components/RangeSlider";
import { useState, useEffect } from "react";
import ButtonOnOff from "../components/ButtonOnOff";
import LightColor from "../components/LightColor";
import Numpad from "../components/Numpad";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

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
  // const [lightIntensity, setLightIntensity] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [lightColor, setLightColor] = useState("blue");

  const [fanOn, setFanOn] = useState(false);
  const [fanIntensity, setFanIntensity] = useState(50);
  const [password, setPassword] = useState("");

  /* TODO: fetch lightOn status and lightColor from the server */
  useEffect(() => {
    const fetchData = async () => {
      axios.get("http://localhost:3000").then((response) => {
        setLightOn(response.data.payload.V10[0]);
        setLightColor(response.data.payload.V11[0]);
        setFanIntensity(response.data.payload.V12[0]);
        if (response.data.payload.V12[0] > 0) {
          setFanOn(true);
        }
      });
    };

    const socket = io("http://localhost:3000");
    socket.on("SENSOR_EVENT", () => {
      fetchData();
    });

    fetchData();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClickLight = () => {
    // TODO: send lightOn status to the server
    setLightOn(!lightOn);

    axios.patch("http://localhost:3000/light", {});
  };

  const handleClickFan = () => {
    setFanOn(!fanOn);
    axios.patch("http://localhost:3000/fan", {
      speed: fanOn ? 0 : fanIntensity,
    });
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

  const sendFanIntensity = () => {
    axios.patch("http://localhost:3000/fan", {
      speed: fanIntensity,
    });
  };

  const handleRadioChange = (event) => {
    setLightColor(event.target.value);
    // TODO: send lightColor to the server
    axios.patch("http://localhost:3000/light/color", {
      color: lightColor,
    });
  };

  const handleEnterClick = () => {
    // Handle enter button click here
    console.log("Entered password:", password);
    axios
      .patch("http://localhost:3000/door", {
        status: "A", // only open door action is implemented
        password: password,
      })
      .then((handleDoorResponse) => {
        if (handleDoorResponse.data.code === 200) {
          toast.success("Door opened", {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }
        setPassword("");
      })
      .catch((error) => {
        // turn on the incorrect password message
        toast.error("Wrong password", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <div className="mx-auto py-4 bg-slate-100 flex w-full h-[88vh]">
        <SideBar />
        <div className="w-full bg-primary-content/50 mx-4 py-4 rounded-lg text-gray-800 flex text-center border border-solid border-gray-500/20">
          <div className="w-1/4 flex flex-col items-center">
            <ButtonOnOff handleClick={handleClickLight} lightOn={lightOn} />
            <LightColor
              lightColor={lightColor}
              handleRadioChange={handleRadioChange}
              lightOn={lightOn}
            />
          </div>
          <div className="w-1/4 flex flex-col items-center">
            <ButtonOnOff handleClick={handleClickFan} />
            <RangeSlider
              slidername={"Fan intensity"}
              lightValue={fanIntensity}
              setlightValue={setFanIntensity}
              mouseDown={handleDragStart}
              mouseUp={() => handleDragEnd(sendFanIntensity)}
              enable={fanOn}
            />
          </div>
          <Numpad
            pwd={password}
            setPwd={setPassword}
            handleEnterClick={handleEnterClick}
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={10000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  );
}
