import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const ColumnChart = () => {
  const series = [
    {
      name: "series-1",
      data: [
        {
          x: "JAN",
          y: 25000000,
        },
        {
          x: "FEB",
          y: 39000000,
        },
        {
          x: "MAR",
          y: 55000000,
        },
        {
          x: "APR",
          y: 35000000,
        },
        {
          x: "MAY",
          y: 45000000,
        },
        {
          x: "JUN",
          y: 60000000,
        },
        {
          x: "JUL",
          y: 35000000,
        },
        {
          x: "AVG",
          y: 52000000,
        },
      ],
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Monthly financial indicators",
      style: {
        fontSize: "18px",
        color: "#334D6E",
        fontWeight: "600",
      },
    },
    yaxis: {
      logBase: 10,
      title: {
        text: "So'm",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: 24
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white py-3 px-3 rounded-lg shadow-md col-span-3 inline-block w-[525px] cursor-pointer">
        <Chart options={options} series={series} type="bar" height={300} width={500}/>
    </div>
  );
};

export default ColumnChart;
