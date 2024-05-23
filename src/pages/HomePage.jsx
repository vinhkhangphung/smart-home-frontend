import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import SideBar from "../components/SideBar";
import { chartOptions } from "../utils/chartOptions";
import axios from "axios";
import { io } from "socket.io-client";
import max from "lodash/max";
import min from "lodash/min";

const HomePage = () => {
  const [block, setBlock] = useState(6);
  const [series, setSeries] = useState([
    {
      name: "Temperatures",
      data: [],
      dataraw: [],
    },
  ]);
  const [interval, setInterval] = useState(1); // in hours - interval for temperature data
  const [fromTime, setFromTime] = useState(0); // epoch time
  const [light, setLight] = useState(0); // [lux]
  const [humidity, setHumidity] = useState(0); // [%]
  const [options, setOptions] = useState({});

  const fetchDataAndProcess = async (limit) => {
    const endTime = Math.floor(Date.now() / 1000);
    const startTime = endTime - 3600 * interval;

    setFromTime(startTime);
    // WITH from and to time
    // axios
    //   .get(
    //     `http://localhost:3000/events?limitV1=${limit}&from=${fromTime}&to=${toTime}`
    //   )
    //   .then((response) => {
    //     const tmpArray = response.data.payload.V1.map((event) => event.value);
    //     setSeries([{ name: "Temperatures", data: [], dataraw: tmpArray }]);
    //   });

    // WITHOUT from and to time
    const response = await axios.get(
      `http://localhost:3000/events?limitV1=${limit}`
    );

    const tmpArray = response.data.payload.V1.map((event) => event.value);
    setSeries([{ name: "Temperatures", data: [], dataraw: tmpArray }]);
    setLight(response.data.payload.V2[0].value);
    setHumidity(response.data.payload.V3[0].value);
  };

  useEffect(() => {
    fetchDataAndProcess(block * 10);

    const socket = io("http://localhost:3000");
    socket.on("SENSOR-EVENT", () => {
      fetchDataAndProcess(block * 10);
    });

    return () => {
      socket.disconnect();
    };
  }, [block]);

  useEffect(() => {
    const res = Array(block).fill(0);
    const count = Array(block).fill(0);
    for (let i = 0; i < series[0].dataraw.length; i++) {
      res[i % block] += series[0].dataraw[i];
      count[i % block] += 1;
    }
    for (let i = 0; i < block; i++) {
      res[i] = (res[i] / count[i]).toFixed(2);
    }
    setSeries((prevSeries) => [{ ...prevSeries[0], data: res }]);

    const timestamps = generateTimestamps();
    console.log(max("max: ", res), min("min: ", res));
    console.log("res: ", res);
    const newOptions = chartOptions(timestamps, block, max(res), min(res));

    setOptions(newOptions);
  }, [block, series[0].dataraw]);

  const generateTimestamps = () => {
    const timestamps = [];
    for (let i = 0; i < block; i++) {
      timestamps.push(fromTime + i * 60 * 10 * 1000);
    }
    return timestamps;
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
                {series[0].dataraw.slice(-1) + " °C"}
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
              onChange={(event) => setBlock(parseInt(event.target.value))}
            >
              <option value="6">1 hour</option>
              <option value="18">3 hours</option>
              <option value="36">6 hours</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
