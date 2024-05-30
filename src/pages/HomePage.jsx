import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import SideBar from "../components/SideBar";
import { chartOptions } from "../utils/chartOptions";
import axios from "axios";
import { io } from "socket.io-client";
import moment from "moment";

const HomePage = () => {
  const [block, setBlock] = useState(() => {
    // Retrieve block value from localStorage or default to 2
    const savedBlock = localStorage.getItem("block");
    return savedBlock ? parseInt(savedBlock) : 2;
  });
  const [series, setSeries] = useState([
    {
      name: "Temperatures",
      data: [],
    },
  ]);
  // console.log(series)
  const [latestTemperature, setLatestTemperature] = useState(0); // [°C
  const [interval, setInterval] = useState(1); // in hours - interval for temperature data
  const [fromTime, setFromTime] = useState(0); // epoch time
  const [light, setLight] = useState(0); // [lux]
  const [humidity, setHumidity] = useState(0); // [%]
  const [options, setOptions] = useState({});

  const fetchDataAndProcess = async (limit) => {
    const endTime = Math.floor(Date.now());
    const startTime = endTime - 3600 * 1000 * interval;

    setFromTime(startTime);

    // WITHOUT from and to time
    const response = await axios.get(
      `http://localhost:3000/events?limitV1=${limit}&from=${startTime}&to=${endTime}`
    );

    const tmpArray = response.data.payload.V1.map((event) => event.value);
    setSeries([{ name: "Temperatures", data: [...tmpArray] }]);
    setLight(response.data.payload.V3[0].value);
    setHumidity(response.data.payload.V2[0].value);
    setLatestTemperature(response.data.payload.V1[0].value);

    // generate timestamps - 1 per 12
    const timestamps = [];
    // console.log(response.data.payload.V1.length)
    for (let i = 0; i < response.data.payload.V1.length; i++) {
      timestamps.push(
        moment(response.data.payload.V1[i].timestamp).format("HH:mm:ss")
      );
    }
    timestamps.reverse();
    console.log(timestamps);
    // new options
    const newOptions = chartOptions(timestamps, block);
    setOptions(newOptions);
  };

  useEffect(() => {
    fetchDataAndProcess(block * 24);

    const socket = io("http://localhost:3000");
    socket.on("SENSOR_EVENT", () => {
      fetchDataAndProcess(block * 24);
    });

    return () => {
      socket.disconnect();
    };
  }, [block]);

  const handleBlockChange = (event) => {
    const newBlock = parseInt(event.target.value);
    setBlock(newBlock);
    localStorage.setItem("block", newBlock); // Save to localStorage
  };

  return (
    <>
      <div className="mx-auto py-4 bg-slate-100 flex w-full h-[88vh]">
        <SideBar />
        <div className="w-full bg-slate-100 mx-4 rounded-sm border-0 relative">
          <div className="flex justify-center items-center stats bg-primary-content border-solid border border-slate-800/10">
            <div className="w-48 h-48 m-4 mr-8 text-center stat bg-violet-300/80 rounded-md border-double border-2 border-gray-600/10">
              <div className="stat-title text-2xl h-fit">Temperatures</div>
              <div className="stat-value text-4xl h-fit">
                {latestTemperature + " °C"}
              </div>
              <div className="stat-desc h-fit">text description</div>
            </div>
            <div className="w-48 h-48 m-4 ml-8 text-center stat bg-violet-300/80 rounded-md border-double border-2 border-gray-600/10">
              <div className="stat-title text-2xl">Humidity</div>
              <div className="stat-value text-4xl">{humidity + " %"}</div>
              <div className="stat-desc h-fit">text description</div>
            </div>
            <div className="w-48 h-48 m-4 ml-8 text-center stat bg-violet-300/80 rounded-md border-double border-2 border-gray-600/10">
              <div className="stat-title text-2xl">Lighting</div>
              <div className="stat-value text-4xl">{light + " lux"}</div>
              <div className="stat-desc h-fit">text description</div>
            </div>
          </div>
          <div>
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            />
          </div>
          <div className="absolute right-36 top-56 mt-1">
            <select
              className="bg-slate-200 border-0 rounded-sm focus-visible:outline-double outline-gray-400/25"
              name="blockSize"
              id="blockSize"
              value={block}
              onChange={handleBlockChange}
            >
              <option value="2">20 minutes</option>
              <option value="3">30 minutes</option>
              <option value="6">1 hours</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
