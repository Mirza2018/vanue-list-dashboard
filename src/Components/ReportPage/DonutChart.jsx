import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Subscription", value: 80 },
  { name: "Add-ons", value: 20 },
];

const COLORS = ["#075B5D", "#E6EFEF"];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {`${payload[0].value}% `}
      </div>
    );
  }
  return null;
};

const DonutChart = () => {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={70}
        dataKey="value"
        // label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        labelLine={true}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend
        layout="horizontal"
        align="center"
        verticalAlign="bottom"
        payload={data.map((item, index) => ({
          value: item.name,
          type: "square",
          color: COLORS[index % COLORS.length],
        }))}
      />
    </PieChart>
  );
};

export default DonutChart;
