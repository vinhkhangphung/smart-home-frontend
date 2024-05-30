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
  const [lightColor, setLightColor] = useState("#0000ff");

  const [fanOn, setFanOn] = useState(false);
  const [fanIntensity, setFanIntensity] = useState(50);
  const [password, setPassword] = useState("");

  /* TODO: fetch lightOn status and lightColor from the server */
  useEffect(() => {
    const fetchData = async () => {
      axios.get("http://localhost:3000/events?limitV1=1").then((response) => {
        if (response.data.payload.V10[0].value === "0") {
          setLightOn(false);
        } else {
          setLightOn(true);
        }
        // setLightOn(response.data.payload.V10[0].value);
        setLightColor(response.data.payload.V11[0].value);
        setFanIntensity(response.data.payload.V12[0].value);

        if (response.data.payload.V12[0].value > 0) {
          setFanOn(true);
        } else {
          setFanOn(false);
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
    // setLightColor("#000000")
    axios.patch("http://localhost:3000/light", {});
  };

  const handleClickFan = () => {
    setFanOn(!fanOn);

    // if (!fanOn) {
    //   axios.patch("http://localhost:3000/fan", {
    //     speed: 0,
    //   });
    // }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    console.log("Drag started");
  };

  const handleDragEnd = debounce((sendFunction) => {
    if (!isDragging) return;
    setIsDragging(false);
    sendFunction();

    if (fanIntensity === 0) {
      setFanOn(false);
    }
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
      color: event.target.value,
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
            <div className="uppercase text-xl sm:text-lg font-medium text-gray-600 tracking-wide">
              Light Controller
            </div>
            <ButtonOnOff handleClick={handleClickLight} lightOn={lightOn} />
            <LightColor
              lightColor={lightColor}
              handleRadioChange={handleRadioChange}
              lightOn={lightOn}
            />
          </div>
          <div className="w-1/4 flex flex-col items-center mt-20">
            {/* <ButtonOnOff handleClick={handleClickFan} /> */}
            <RangeSlider
              slidername={"Fan intensity"}
              lightValue={fanIntensity}
              setlightValue={setFanIntensity}
              mouseDown={handleDragStart}
              mouseUp={() => handleDragEnd(sendFanIntensity)}
              enable={true}
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
