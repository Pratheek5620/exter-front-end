"use client";
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, Row, Col } from 'antd';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const dailyData = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      label: 'Batteries Serviced',
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const monthlyData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Batteries Serviced',
      data: [65, 59, 80, 81, 56, 55, 40, 42, 50, 60, 70, 90],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
    },
  ],
};

const quarterlyData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Batteries Serviced',
      data: [204, 192, 230, 240],
      fill: false,
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
    },
  ],
};

const BatteryServiceCharts = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Battery Production Charts
      </h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Card title="Daily Batteries Serviced" style={{ height: "100%" }}>
            <div style={{ position: "relative", height: "400px" }}>
              <Bar
                data={dailyData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card title="Monthly Batteries Serviced" style={{ height: "100%" }}>
            <div style={{ position: "relative", height: "400px" }}>
              <Line
                data={monthlyData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} sm={24} md={12}>
          <Card title="Quarterly Batteries Serviced" style={{ height: "100%" }}>
            <div style={{ position: "relative", height: "400px" }}>
              <Line
                data={quarterlyData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BatteryServiceCharts;
