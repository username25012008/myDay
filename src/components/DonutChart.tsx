import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const DonutChart = () => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: ["Paid", "Not paid"],
    colors: ["#0066FF", "#BFD9FF"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      markers: {
        shape: "square",
        strokeWidth: 4,
      },
    },
    title: {
      text: "Payment status",
      style: {
        fontSize: "18px",
        color: "#334D6E",
        fontWeight: "600",
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
            total: {
              show: true,
              label: "Payments",
              color: "#333",
              fontSize: "16px",
            },
          },
        },
      },
    },
  };

  const series = [60, 40];

  return (
    <div className="bg-white py-3 px-3 rounded-lg shadow-md col-span-2 cursor-pointer">
      <div className="w-full flex justify-center items-center">
        <Chart
          options={options}
          series={series}
          type="donut"
          width={300}
          height={315}
        />
      </div>
    </div>
  );
};

export default DonutChart;

// import { Doughnut } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ["Paid", "Not paid"],
//   datasets: [
//     {
//       data: [60, 40],
//       backgroundColor: ["#0066FF", "#BFD9FF"],
//       borderWidth: 0,
//     },
//   ],
// };

// const options = {
//   plugins: {
//     legend: {
//       position: "bottom",
//       labels: {
//         usePointStyle: true,
//         pointStyle: "rectRounded",
//         font: {
//           size: 14,
//           weight: "bold",
//         },
//       },
//     },
//   },
// };

// const DonutChart = () => {
//   return (
//     <div className="bg-white py-3 px-3 rounded-lg shadow-md inline-block">
//       <span className="font-semibold text-darkblue text-sm">
//         Payment status
//       </span>
//       <div className="w-full flex justify-center items-center">
//         {/* <Chart options={options} series={series} type="donut" /> */}
//         <Doughnut data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default DonutChart;
