import React from "react";
import "./Dashboard.css";
import { FaBoxOpen, FaChartLine, FaUserTag } from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardManager() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Oct",
      "Dec",
    ],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: [
          120000000, 150000000, 170000000, 140000000, 180000000, 160000000,
          170000000, 140000000, 180000000, 160000000,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê doanh thu",
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard--element">
          <div className="order__modifier">
            <span>5090 đơn</span>
            <p>Số lượng đơn hàng</p>
          </div>
          <FaBoxOpen className="icon-dashboard" />
        </div>
        <div className="dashboard--element">
          <div className="order__modifier">
            <span style={{ color: "red" }}>150.432.000 VNĐ</span>
            <p>Số lượng đơn hàng</p>
          </div>
          <FaChartLine className="icon-dashboard" />
        </div>
        <div className="dashboard--element">
          <div className="order__modifier">
            <span>200.000 người</span>
            <p>Số lượng người dùng</p>
          </div>
          <FaUserTag className="icon-dashboard" />
        </div>
      </div>
      <div className="dashboard-content">
        <Bar data={data} options={options} />

        {/* <Line data={data}/> */}
      </div>
    </div>
  );
}

export default DashboardManager;
