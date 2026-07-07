import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function MarketPieChart({ coins }) {
  console.log("MarketPieChart Coins:", coins);

  if (!coins || coins.length === 0) {
    return (
      <div
        style={{
          height: "320px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#666",
        }}
      >
       
