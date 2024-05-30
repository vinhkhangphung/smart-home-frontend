export const chartOptions = (timestamps, block) => ({
  chart: {
    type: "line",
    height: 350,
  },
  xaxis: {
    tickAmount: 12,
    categories: timestamps,
    labels: {
      style: {
        fontSize: "14px",
        colors: Array(block).fill("#363d4d"),
      },
    },
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
  stroke: {
    curve: "straight",
    width: 10,
  },
  markers: {
    size: 0,
    colors: "#546db0",
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
})
