import { BsStar } from "react-icons/bs";

const StudentsTable = ({ students }: any) => {
  function formatPhoneNumber(number: string): string {
    return number.replace(
      /(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
  }
  function formatDate(number: string): string {
    let num = number?.split("-");
    return `${num[2]}.${num[1]}.${num[0]}`;
  }
  return (
    <div className="col-span-7 bg-white relative rounded-lg overflow-hidden shadow-md cursor-pointer mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-white border-b border-b-gray-300">
          <tr className="p-5 text-[#192A3E] font-medium text-sm text-center">
            <th className="px-6 py-6">#</th>
            <th className="px-2 py-6">Id</th>
            <th className="px-6 py-6">Name</th>
            <th className="px-6 py-6">Points</th>
            <th className="px-6 py-6">Lesson</th>
            <th className="px-6 py-6">Status</th>
            <th className="px-6 py-6">Study date</th>
            <th className="px-6 py-6">Phone Number</th>
            <th className="px-6 py-6">Balance</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((item: any, idx: number) => (
            <tr
              className="bg-white border-b border-gray-200 p-5 text-sm text-center"
              key={idx}
            >
              <td className="px-6 py-4">{idx + 1}</td>
              <td className="px-2 py-4">{item?.id}</td>
              <td className="px-6 py-4 flex flex-col">
                <span>{item?.full_name}</span>
                <span>
                  {item?.get_age + ` (${formatDate(item?.birthday)})`}
                </span>
              </td>
              <td className="px-6 py-4"><div className="bg-[#fff7ea] px-2 py-1 flex justify-center items-center gap-2 rounded-lg"><BsStar strokeWidth="1" color="gold"/> {item?.point} points</div></td>
              <td className="px-6 py-4">{item?.group_carts[0]?.group_name ? item?.group_carts[0]?.group_name : '-'}</td>
              <td className="px-6 py-4">
                <div
                  className="px-2 py-1 text-white rounded-lg"
                  style={{
                    backgroundColor:
                      item?.status === "active" ? "#2ed47a" : "#f44336",
                  }}
                >
                  {item?.status}
                </div>
              </td>
              <td className="px-6 py-4 flex flex-col">
                <span>
                  {item?.group_carts[0]?.start_date?.replaceAll("-", ".")}-
                </span>
                <span className="text-[12px]">
                  {item?.group_carts[0]?.end_time?.replaceAll("-", ".")}
                </span>
              </td>
              <td className="px-6 py-4">
                {formatPhoneNumber(item?.phone_number_1)}
              </td>
              <td className="px-6 py-4">- {item?.balance} so'm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
