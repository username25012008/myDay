import { Progress } from "antd";
import { GoBook } from "react-icons/go";
import { RiGraduationCapLine } from "react-icons/ri";

const PercentageChart = ({ data }: any) => {
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="bg-white py-3 px-[10px] rounded-lg flex gap-3 shadow-md cursor-pointer">
      <Progress
        strokeLinecap="butt"
        type="circle"
        percent={data?.percentage}
        strokeColor={data?.first_color}
        trailColor={data?.second_color}
        strokeWidth={15}
        size={75}
        format={(percent) => (
          <span className="text-darkblue font-semibold">{percent}%</span>
        )}
      />
      <div className="flex flex-col text-darkblue">
        <span className="font-medium text-sm">In this month</span>
        <span className="text-lg font-semibold">
          {formatNumber(data?.amount)}
          <span className="text-sm">{data?.currency}</span>{" "}
        </span>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center">
            <div
              className="w-7 h-7 flex justify-center items-center rounded-full text-base"
              style={{ background: data?.second_color }}
            >
              <GoBook color={data?.first_color} strokeWidth={1} />
            </div>
            <span className="font-medium text-sm">{data?.category}</span>
          </div>
          <div className="flex gap-1 items-center">
            <div
              className="w-7 h-7 flex justify-center items-center rounded-full text-base"
              style={{ background: data?.second_color }}
            >
              <RiGraduationCapLine color={data?.first_color} strokeWidth={1} />
            </div>
            <span className="font-medium text-sm">{data?.students}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageChart;
