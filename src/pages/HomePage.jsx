import React from "react";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import RangeSlider from "../components/RangeSlider";

const HomePage = () => {
  // -------------------------------------------------------
  const [block, setBlock] = useState(10);

  // Sample data for the chart
  const [series, setSeries] = useState([
    {
      name: "Temperatures",
      dataraw: [
        22.5, 21.8, 23.2, 20.9, 22.7, 24.1, 23.5, 21.4, 20.3, 22.0, 24.5, 23.8,
        21.6, 22.9, 20.7, 23.3, 22.2, 24.0, 21.1, 22.4, 20.5, 23.7, 21.9, 24.3,
        22.1, 20.8, 23.0, 22.6, 21.2, 24.2, 23.1, 20.6, 22.8, 21.3, 24.4, 23.4,
        20.4, 22.3, 21.7, 24.6, 23.6, 20.2, 22.4, 21.5, 24.8, 23.9, 20.1, 22.5,
        21.0, 24.7,
      ],
      data: [],
    },
  ]);

  const modifier = 0.5;
  useEffect(() => {
    const newSeries = [...series]; // Create a copy of the series array
    newSeries[0].dataraw = newSeries[0].dataraw.map((x) =>
      parseFloat((x + Math.random() * modifier * 2 - modifier).toFixed(2))
    );
    setSeries(newSeries); // Update state with the modified copy
  }, []);

  /* API call to fetch latest temperature */
  const [latestTemp, setLatestTemp] = useState(0);
  useEffect(() => {
    setLatestTemp(series[0].dataraw[series[0].dataraw.length - 1]);
  }, [series[0].dataraw]);

  const generateTimestamps = () => {
    const timestamps = [];
    let currentTime = new Date(); // Get current time
    for (let i = 0; i < block; i++) {
      timestamps.push(currentTime.getTime()); // Push timestamp to array
      currentTime.setMinutes(currentTime.getMinutes() + block); // Add 5 minutes to current time
    }
    return timestamps;
  };
  const timestamps = generateTimestamps();
  const res = Array(block).fill(0);
  const count = Array(block).fill(0);
  for (let i = 0; i < series[0].dataraw.length; i++) {
    res[i % block] += series[0].dataraw[i];
    count[i % block] += 1;
  }
  for (let i = 0; i < block; i++) {
    res[i] = (res[i] / count[i]).toFixed(2);
  }
  series[0].data = res;
  // -------------------------------------------------------

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: timestamps.map((timestamp) =>
        new Date(timestamp).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })
      ),
      labels: {
        style: {
          fontSize: "14px",
          colors: Array(block).fill("#FFFFFF"),
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 5,
    },
    yaxis: {
      tickAmount: 6,
      labels: {
        style: {
          fontSize: "14px",
          colors: Array(block).fill("#FFFFFF"),
        },
        formatter: (value) => {
          return value + " °C";
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: [
          {
            offset: 10,
            color: "#fc440b",
            opacity: 1,
          },
          {
            offset: 55,
            color: "#ffce63",
            opacity: 1,
          },
          {
            offset: 90,
            color: "#0a95f9",
            opacity: 1,
          },
        ],
      },
    },
  };
  /* Control Panel */
  const [selectTab, setSelectTab] = useState("dashboard");
  const [lightVolume, setlightVolume] = useState(50);
  /* Component */
  const DashboardContent = () => {
    return (
      <>
        <div className="flex justify-center items-center stats rounded-none bg-primary-content">
          <div className="w-48 h-48 m-4 mr-8 text-center stat bg-secondary rounded-md">
            <div className="stat-title text-2xl h-fit">Temperatures</div>
            <div className="stat-value text-4xl h-fit">
              {latestTemp + " °C"}
            </div>
            <div className="stat-desc h-fit">21% more than last month</div>
          </div>
          <div className="w-48 h-48 m-4 ml-8 text-center stat bg-secondary rounded-md">
            <div className="stat-title text-2xl">Humidity</div>
            <div className="stat-value text-4xl">
              {(Math.random() * 100).toFixed(0) + " %"}
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="w-48 h-48 m-4 ml-8 text-center stat bg-secondary rounded-md">
            <div className="stat-title text-2xl">Lighting</div>
            <div className="stat-value text-4xl">
              {Math.floor(Math.random() * (500 - 300 + 1)) + 300 + " lux"}
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
        <div>
          <select
            className="bg-slate-500 border-0 rounded-sm focus-visible:outline-double outline-gray-400"
            name="blockSize"
            id="blockSize"
            value={block}
            onChange={(event) => setBlock(parseInt(event.target.value))}
          >
            <option value="10">10</option>
            <option value="8">8</option>
            <option value="5">5</option>
          </select>
        </div>
      </>
    );
  };

  const ControlContent = ({ value, setvalue }) => {
    return (
      <>
        <div className="text-white flex">
          <label className="swap">
            <input type="checkbox" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 16 16"
              className="swap-on fill-red-400"
            >
              <path d="M7.5 1v7h1V1z" />
              <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 16 16"
              className="swap-off fill-green-400"
            >
              <path d="M7.5 1v7h1V1z" />
              <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
            </svg>
          </label>
        </div>
        <RangeSlider label={"Brightness"} value={value} setvalue={setvalue} />
      </>
    );
  };

  const AccountContent = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-48 h-48 m-4 text-center stat bg-secondary rounded-md">
          <div className="stat-title text-2xl">Account</div>
          <div className="stat-value text-4xl">User</div>
          <div className="stat-desc"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <RangeSlider
        label={"Light Volume"}
        value={lightVolume}
        setvalue={setlightVolume}
      />
      <div className="mx-auto py-8 bg-gray-800 flex">
        <div className="w-60 bg-primary text-white">
          <ul className="pl-2 pr-4 text-center justify-start">
            <li
              className="border rounded-lg border-slate-400 p-1 my-4 outline outline-offset-2 outline-2 cursor-pointer hover:bg-gray-500"
              onClick={() => setSelectTab("dashboard")}
            >
              Dashboard
            </li>
            <li
              className="border rounded-lg border-slate-400 p-1 my-4 outline outline-offset-2 outline-2 cursor-pointer hover:bg-gray-500"
              onClick={() => setSelectTab("control")}
            >
              Control
            </li>
            <li
              className="border rounded-lg border-slate-400 p-1 my-4 outline outline-offset-2 outline-2 cursor-pointer hover:bg-gray-500"
              onClick={() => setSelectTab("account")}
            >
              Account
            </li>
          </ul>
        </div>
        <div className="w-full bg-primary ml-4 rounded-sm border-0">
          {selectTab == "dashboard" && <DashboardContent />}
          {selectTab == "control" && (
            <ControlContent value={lightVolume} setvalue={setlightVolume} />
          )}
          {selectTab == "account" && <AccountContent />}
        </div>
      </div>
    </>
  );
};

export default HomePage;
