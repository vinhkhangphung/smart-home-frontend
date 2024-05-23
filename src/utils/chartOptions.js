import { max } from "lodash";

// src/chartOptions.js
export const chartOptions = (timestamps, block, maxYaxis, minYaxis) => ({
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
        colors: Array(block).fill("#363d4d"),
      },
    },
  },
  yaxis: {
    min: minYaxis * 0.9,
    max: maxYaxis * 1.1,
  },
  stroke: {
    curve: "smooth",
    width: 10,
  },
  markers: {
    size: 5,
    colors: "#546db0",
  },
  yaxis: {
    tickAmount: 6,
    labels: {
      style: {
        fontSize: "14px",
        colors: Array(block).fill("#363d4d"),
      },
    },
  },
  grid: {
    borderColor: "#727b94",
    strokeDashArray: 0,
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
          opacity: 0.75,
        },
        {
          offset: 55,
          color: "#ffce63",
          opacity: 1,
        },
        {
          offset: 90,
          color: "#0a95f9",
          opacity: 0.75,
        },
      ],
    },
  },
});
