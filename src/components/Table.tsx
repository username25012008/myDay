import { BsPeople, BsPerson } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { LuGraduationCap, LuPresentation } from "react-icons/lu";

const Table = () => {
  const scheduleData = [
    {
      id: 1,
      date: "18",
      time: "09:00 - 10:00",
      teacher: "Mr. Johnson",
      student: "Group 52",
      level: "General English: Intermediate level",
      type: "Group",
      room: "Room 2-3",
      studentsCount: 18,
    },
    {
      id: 2,
      date: "18",
      time: "09:00 - 10:00",
      teacher: "Mr. Johnson",
      student: "Steve Hoover",
      level: "General English: Intermediate level",
      type: "Individual",
      room: "Room 2-3",
      studentsCount: 1,
    },
    {
      id: 3,
      date: "18",
      time: "09:00 - 10:00",
      teacher: "Mr. Johnson",
      student: "Group 52",
      level: "General English: Intermediate level",
      type: "Group",
      room: "Room 2-3",
      studentsCount: 18,
    },
    {
      id: 4,
      date: "18",
      time: "09:00 - 10:00",
      teacher: "Mr. Johnson",
      student: "Steve Hoover",
      level: "General English: Intermediate level",
      type: "Individual",
      room: "Room 2-3",
      studentsCount: 1,
    },
  ];

  return (
    <div className="col-span-7 bg-white relative rounded-lg overflow-hidden shadow-md cursor-pointer">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-white border-b border-b-gray-300">
          <tr className="p-5 text-[#192A3E] font-medium text-sm">
            <th className="px-6 py-6">#</th>
            <th className="px-6 py-6">Lesson time</th>
            <th className="px-6 py-6">Name</th>
            <th className="px-6 py-6">Teacher name</th>
            <th className="px-6 py-6">Subject name: level</th>
            <th className="px-6 py-6">Lesson type</th>
            <th className="px-6 py-6">Room</th>
            <th className="px-6 py-6">Students</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData?.map((item, id) => (
            <tr
              className="bg-white border-b border-gray-200 p-5"
              key={id}
            >
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4"><span className="bg-[#FEEEED] flex justify-start items-center gap-1 py-2 px-3 text-[#F7685B] rounded-lg text-[12px]"><IoTimeOutline size={14}/>{item.time}</span></td>
              <td className="px-6 py-4">{item.student}</td>
              <td className="px-6 py-4"><span className="flex justify-start items-center gap-1"><BsPerson />{item.teacher}</span></td>
              <td className="px-6 py-4"><span className="flex justify-start items-center gap-1"><LuGraduationCap/>{item.level}</span></td>
              <td className="px-6 py-4"><span className="flex justify-start items-center gap-1"><LuPresentation/>{item.type}</span></td>
              <td className="px-6 py-4"><span className="bg-[#33A9FF] py-2 px-3 text-white rounded-lg">{item.room}</span></td>
              <td className="px-6 py-4"><span className="flex justify-start items-center gap-1"><BsPeople />{item.studentsCount} students</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
