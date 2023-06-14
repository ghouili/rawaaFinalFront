import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// const labels = ["January", "February", "March", "April", "May", "June", "July"];
// const colors = [
//   "red",
//   "orange",
//   "yellow",
//   "lime",
//   "green",
//   "teal",
//   "blue",
//   "purple",
// ];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels01 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const data01 = {
  labels01,
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 12, 15, 20, 30, 60, 10],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [50, 20, 30, 40, 62, 10, 23],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// function getRandomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [10, 12, 15, 20, 30, 60, 10],
//     },
//     {
//       label: "Dataset 2",
//       data: [50, 20, 30, 40, 62, 10, 23],
//     },
//   ],
// };

// function createGradient(ctx, area) {
//   const colorStart = colors[Math.floor(Math.random() * colors.length)];
//   const filteredColors = colors.filter((color) => color !== colorStart);
//   const colorMid =
//     filteredColors[Math.floor(Math.random() * filteredColors.length)];
//   const colorEnd = filteredColors.filter((color) => color !== colorMid)[0];

//   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

//   gradient.addColorStop(0, colorStart);
//   gradient.addColorStop(0.5, colorMid);
//   gradient.addColorStop(1, colorEnd);

//   return gradient;
// }

const Test = () => {
//   const chartRef = useRef(null);
//   const [chartData, setChartData] = useState({
//     datasets: [],
//   });

//   useEffect(() => {
//     const chart = chartRef.current;

//     if (!chart) {
//       return;
//     }

//     const chartData = {
//       ...data,
//       datasets: data.datasets.map((dataset) => ({
//         ...dataset,
//         borderColor: createGradient(chart.ctx, chart.chartArea),
//       })),
//     };

//     setChartData(chartData);
//   }, []);

  return (
    <div className="w-full grid grid-cols-2 gap-10">
      <div className="bg-white p-4 rounded">
        <Line options={options} data={data01} />
      </div>
      {/* <div className="bg-white p-4 rounded">
        <Line ref={chartRef} data={chartData} />
      </div> */}
    </div>
  );
};

export default Test;
