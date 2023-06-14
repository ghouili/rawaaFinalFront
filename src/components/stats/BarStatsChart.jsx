import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const getChartData = (achats) => {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const labels = months.map((month) => {
    const monthName = new Date(0, month - 1).toLocaleString("en-US", {
      month: "long",
    });
    return monthName;
  });

  const reportCounts = months.map((month) => {
    const monthReports = achats.filter((report) => {
      const reportDate = report.date.substring(1, report.date.length - 1); // Remove the brackets [ ]
      const [monthStr, dayStr, yearStr] = reportDate.split("/"); // Split the date into month, day, and year parts
      const reportMonth = parseInt(monthStr, 10); // Convert month string to integer
      return reportMonth === month;
    });
    return monthReports.length;
  });

  return {
    labels,
    datasets: [
      {
        label: "Nombre d'achat",
        data: reportCounts,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};

const BarStatsChart = ({ achats }) => {
  const chartData = getChartData(achats);
  return <Bar options={options} data={chartData} />;
};

export default BarStatsChart;
