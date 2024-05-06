import React from "react";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import SideBar from "../components/SideBar";

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
          colors: Array(block).fill("#AAAAAA"),
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
          colors: Array(block).fill("#AAAAAA"),
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

  // -------------------------------------------------------

  return (
    <>
      <div className="mx-auto py-2 bg-primary-800 flex w-full h-[88vh]">
        <SideBar />
        <div className="w-full bg-primary-900 ml-4 rounded-sm border-0">
          <div className="flex justify-center items-center stats rounded-none bg-primary-content">
            <div className="w-48 h-48 m-4 mr-8 text-center stat bg-secondary-content rounded-md">
              <div className="stat-title text-2xl h-fit">Temperatures</div>
              <div className="stat-value text-4xl h-fit">
                {latestTemp + " °C"}
              </div>
              <div className="stat-desc h-fit">21% more than last month</div>
            </div>
            <div className="w-48 h-48 m-4 ml-8 text-center stat bg-secondary-content rounded-md">
              <div className="stat-title text-2xl">Humidity</div>
              <div className="stat-value text-4xl">
                {(Math.random() * 100).toFixed(0) + " %"}
              </div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            <div className="w-48 h-48 m-4 ml-8 text-center stat bg-secondary-content rounded-md">
              <div className="stat-title text-2xl">Lighting</div>
              <div className="stat-value text-4xl">
                {Math.floor(Math.random() * (500 - 300 + 1)) + 300 + " lux"}
              </div>
              <div className="stat-desc">21% more than last month</div>
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

          <div>
            <select
              className="bg-accent border-0 rounded-sm focus-visible:outline-double outline-gray-400"
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
