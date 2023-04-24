import React from "react";
import Chart from "react-apexcharts";

const TodoGraph = ({ completeTodos, incompleteTodos }) => {
  const priorityCounts = {
    high: { complete: 0, incomplete: 0 },
    medium: { complete: 0, incomplete: 0 },
    low: { complete: 0, incomplete: 0 },
  };

  completeTodos.forEach((todo) => {
    priorityCounts[todo.priority].complete += 1;
  });

  incompleteTodos.forEach((todo) => {
    priorityCounts[todo.priority].incomplete += 1;
  });

  const chartData = [
    {
      name: "完了",
      data: [
        priorityCounts.high.complete,
        priorityCounts.medium.complete,
        priorityCounts.low.complete,
      ],
    },
    {
      name: "未完了",
      data: [
        priorityCounts.high.incomplete,
        priorityCounts.medium.incomplete,
        priorityCounts.low.incomplete,
      ],
    },
  ];

  const chartOptions = {
    labels: ["高", "中", "低"],
    colors: ["#008FFB", "#FF4560"],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <div>
      <Chart options={chartOptions} series={chartData} type="pie" width="380" />
    </div>
  );
};

export default TodoGraph;
