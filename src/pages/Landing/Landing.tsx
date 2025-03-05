import { BsPerson } from "react-icons/bs";
import ColumnChart from "../../components/ColumnChart";
import DonutChart from "../../components/DonutChart";
import PercentageChart from "../../components/PercentageChart";
import Table from "../../components/Table";
import { GrMoney } from "react-icons/gr";
import { RiGraduationCapLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";

const percentageData = [
  {
    percentage: 67,
    amount: 255000000,
    currency: "so’m",
    category: "General English",
    students: 1255,
    first_color: "#F7685B",
    second_color: "#FEEEED",
  },
  {
    percentage: 35,
    amount: 218000000,
    currency: "so’m",
    category: "General English",
    students: 1255,
    first_color: "#2ED47A",
    second_color: "#E8FAF0",
  },
  {
    percentage: 21,
    amount: 156000000,
    currency: "so’m",
    category: "General English",
    students: 1255,
    first_color: "#FFB946",
    second_color: "#FFF7EA",
  },
];
const info = [
  {
    icon:<BsPerson />,
    count:45,
    label:'New leads'
  },
  {
    icon:<RiGraduationCapLine />,
    count:45,
    label:'All students',
  },
  {
    icon:<GoPeople />,
    count:45,
    label:'Groups',
  },
  {
    icon:<GrMoney />,
    count:16,
    label:'Debtors',
  }
]

const Landing = () => {
  return (
    <div className="bg-[#F1F4F8] w-full h-full grid grid-cols-7 gap-5 py-6 px-5 font-sans items-start">
      <div className="grid grid-cols-4 col-span-7 gap-5">
        {info?.map((item,idx)=>(
          <div key={idx} className="col-span-1 bg-white rounded-2xl shadow-md px-8 py-5 flex gap-3 items-center cursor-pointer group hover:bg-[#33A9FF] transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#33A9FF] flex justify-center items-center text-white text-4xl group-hover:text-[#33A9FF] group-hover:bg-white transition-all duration-300">
              {item?.icon}
            </div>
            <div className="flex flex-col text-[#334D6E] group-hover:text-white transition-all duration-300">
              <span className="text-2xl font-semibold">{item?.count}</span>
              <span className="text-sm font-medium">{item?.label}</span>
            </div>
          </div>
        ))}
      </div>
      <DonutChart />
      <ColumnChart />
      <div className="flex flex-col col-span-2 gap-5">
        {percentageData.map((data) => (
          <PercentageChart data={data} key={data?.percentage} />
        ))}
      </div>
      <Table />
    </div>
  );
};

export default Landing;
