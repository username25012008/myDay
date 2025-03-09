import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Radio,
  Select,
} from "antd";
import {
  useGetCourseLvlQuery,
  useGetCoursesQuery,
  useGetStudentsQuery,
  useGetSubjectsQuery,
  useGetTeachersQuery,
  useSetStudentMutation,
} from "../../api/ApiClient";
import Loading from "../../components/Loading";
import { BsPeople } from "react-icons/bs";
import StudentsTable from "../../components/StudentsTable";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

const Students = () => {
  const [part, setPart] = useState<boolean>(false);
  const [lvlId, setLvlId] = useState<number | string>("");
  const [value, setValue] = useState<number>(1);
  const [part_one, setPartOne] = useState<boolean>(false);
  const [finalPart, setFinalPart] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<string>("");
  const [student,setStudent] = useState<any>({})
  // const date = new Date()
  // const distruc = String(date).split(" ")
  // const mixDate = distruc[3] +"-"+String(Number(date.getMonth())+1).padStart(2,"0")+"-"+distruc[2]
  const [form] = useForm();
  const [form_one] = useForm();
  const [page, setPage] = useState<number>(1);
  const { data: students, isLoading, refetch} = useGetStudentsQuery(page);
  const { data: teachers } = useGetTeachersQuery("");
  const { data: subjects } = useGetSubjectsQuery("");
  const { data: courses, refetch: courseRefetch } = useGetCoursesQuery("");
  const { data: levels, refetch: lvlRefetch } = useGetCourseLvlQuery(lvlId);
  const [setNewStudent] = useSetStudentMutation()
  const createStudents = (val: any) => {
    if (part_one) {
      val = {...student,
        start_date: form.getFieldValue("start_date")?.format("YYYY-MM-DD"),
        discount_first_month: true,
        branch: 1,
        group_id: value,
        calculation_type: 1,
        finance_type: "cash",
        monthly_discount: val.monthly_discount,
        first_month_discount: val.monthly_discount,
        days:val.days,
        subject:val.subject,
        level:val.level,
        teacher:val.teacher,
        teacher_percentage: 1,
        start_time_id: 1,
        room_id:1
      }
      setNewStudent(val)
      refetch()
      setPartOne(false)
      form.resetFields()
      form_one.resetFields()

    } else {
      val.phone_number_1 = "+998" + val.phone_number_1;
      val.branch = 1;
      val.birthday = form_one.getFieldValue("birthday")?.format("YYYY-MM-DD");
      setStudent(val)
    }
  };
  useEffect(() => {
    refetch();
  }, [page]);
  useEffect(() => {
    lvlRefetch();
  }, [lvlId]);
  useEffect(() => {
    const handleFilter = () => {
      teachers?.forEach((item: any) => {
        if (form.getFieldValue("teacher") == item?.id) {
          setTeacher(item?.teacher_name);
          courseRefetch();
        }
      });
    };
    finalPart && handleFilter();
    setFinalPart(false);
  }, [finalPart]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-3 py-8 bg-[#F1F4F8]">
          <Modal open={part} footer={null}>
            <div className="no-scrollbar max-h-[450px] overflow-y-auto">
              <div className="text-center pt-5 flex flex-col">
                <span className="text-darkblue font-bold text-2xl">
                  Add a new student
                </span>
                <span className="text-gray-400 text-sm">
                  Fill in the requested information below
                </span>
              </div>
              <div className="mt-10 px-3">
                <Form
                  layout="vertical"
                  onFinish={createStudents}
                  form={form_one}
                >
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item
                        name="first_name"
                        label="First name"
                        rules={[{ required: true }]}
                      >
                        <Input size="large" placeholder="John" />
                      </Form.Item>
                      <Form.Item
                        name="last_name"
                        label="Last name"
                        rules={[{ required: true }]}
                      >
                        <Input size="large" placeholder="Anderson" />
                      </Form.Item>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item
                        name="phone_number_1"
                        label="Phone number"
                        rules={[{ required: true }]}
                      >
                        <Input size="large" addonBefore="+998" />
                      </Form.Item>
                      <Form.Item
                        name="birthday"
                        label="Birthday"
                        rules={[{ required: true }]}
                      >
                        <DatePicker size="large" style={{ width: "100%" }}/>
                      </Form.Item>
                    </div>
                    <div className="w-full">
                      <Form.Item name="group_type" initialValue="individual">
                        <Radio.Group
                          size="large"
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                          onChange={(e) =>
                            form_one.setFieldsValue({
                              group_type: e.target.value,
                            })
                          }
                        >
                          <Radio value="individual">Individual</Radio>
                          <Radio value="group">Group</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div className="w-full">
                      <Form.Item
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Button
                          type="default"
                          style={{ fontWeight: "600", padding: "20px 50px" }}
                          size="large"
                          onClick={() => {
                            setPart(false);
                          }}
                        >
                          Go Back
                        </Button>
                        <Button
                          type="primary"
                          style={{
                            fontWeight: "600",
                            padding: "20px 50px",
                            marginLeft: "20px",
                          }}
                          size="large"
                          htmlType="submit"
                          onClick={() => {
                            setPart(false);
                            setPartOne(true);
                          }}
                        >
                          Next
                        </Button>
                      </Form.Item>
                    </div>
                  </>
                </Form>
              </div>
            </div>
          </Modal>
          <Modal open={part_one} footer={null}>
            <div className="no-scrollbar max-h-[450px] overflow-y-auto">
              <div className="text-center pt-5 flex flex-col">
                <span className="text-darkblue font-bold text-2xl">
                  Add a new student
                </span>
                <span className="text-gray-400 text-sm">
                  Fill in the requested information below
                </span>
              </div>
              <div className="mt-10 px-3">
                <Form layout="vertical" onFinish={createStudents} form={form}>
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item
                        name="subject"
                        label="Select subject"
                        rules={[{ required: true }]}
                      >
                        <Select
                          size="large"
                          placeholder="Select"
                          onChange={(val) => {
                            setLvlId(val);
                          }}
                        >
                          {subjects?.map((item: any) => (
                            <Option key={item.id} value={item?.id}>
                              {item?.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="level"
                        label="Select level"
                        rules={[{ required: true }]}
                      >
                        <Select
                          size="large"
                          placeholder="Select"
                        >
                          {levels?.map((item: any) => (
                            <Option key={item.id} value={item?.id}>
                              {item?.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item name="teacher" label="Select teacher">
                        <Select
                          size="large"
                          placeholder="Select"
                          onChange={() => {
                            setFinalPart(true);
                          }}
                        >
                          {teachers?.map((item: any) => (
                            <Option key={item.id} value={item?.id}>
                              {item?.teacher_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="days"
                        label="Select day"
                        rules={[{ required: true }]}
                      >
                        <Select
                          size="large"
                          placeholder="Select"
                          options={[
                            { value: "odd", label: "Toq kunlari" },
                            { value: "even", label: "Juft kunlari" },
                          ]}
                        ></Select>
                      </Form.Item>
                    </div>
                    <div className="">
                      <Form.Item name={"group_id"}>
                        <table className="border-collapse w-full">
                          <thead className="bg-gray-100">
                            <tr className="border border-gray-300">
                              <th className="w-[36.5%] px-4 py-2 text-left">
                                Group Names
                              </th>
                              <th className="w-[33%] px-4 py-2 text-left">
                                Teacher
                              </th>
                              <th className="w-[33%] px-4 py-2 text-left">
                                Time
                              </th>
                            </tr>
                          </thead>
                        </table>

                        <div className="overflow-y-auto max-h-[150px]">
                          <table className="w-full border-collapse">
                            <tbody>
                              {courses
                                ?.filter(
                                  (item: any) =>
                                    !teacher || teacher == item?.teacher
                                )
                                .map((item: any) => (
                                  <tr
                                    key={item.id}
                                    className="border-b border-x border-gray-300 hover:bg-gray-50 transition-all"
                                  >
                                    <td className="w-[30%] pl-4 py-2">
                                      <Radio.Group
                                        defaultValue={0}
                                        value={value}
                                        onChange={(e) => {
                                          setValue(e.target.value);
                                        }}
                                        options={[
                                          {
                                            value: item?.id,
                                            label: item?.name,
                                          },
                                        ]}
                                      />
                                    </td>
                                    <td className="w-[33%] px-4 py-2">
                                      {item?.teacher}
                                    </td>
                                    <td className="w-[33%] px-4 py-2">
                                      {item?.start_date}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </Form.Item>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item
                        name="monthly_discount"
                        label="Monthly discount"
                        rules={[{ required: true }]}
                      >
                        <Input size="large" addonAfter="So'm" />
                      </Form.Item>
                      <Form.Item
                        name="start_date"
                        label="Select start day"
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          format={"YYYY-MM-DD"}
                          size="large"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                    <div className="w-full">
                      <Form.Item
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Button
                          type="default"
                          style={{ fontWeight: "600", padding: "20px 50px" }}
                          size="large"
                          onClick={() => {
                            setPartOne(false);
                            setPart(true);
                          }}
                        >
                          Go Back
                        </Button>
                        <Button
                          type="primary"
                          style={{
                            fontWeight: "600",
                            padding: "20px 50px",
                            marginLeft: "20px",
                          }}
                          size="large"
                          htmlType="submit"
                        >
                          Next
                        </Button>
                      </Form.Item>
                    </div>
                  </>
                </Form>
              </div>
            </div>
          </Modal>

          <div className="flex justify-end">
            <Button
              icon={<BsPeople />}
              size="large"
              type="primary"
              onClick={() => {
                setPart(true);
              }}
            >
              New Students
            </Button>
          </div>
          <div className="">
            <StudentsTable students={students?.results} />
            <Pagination
              style={{ margin: "20px 0" }}
              align="center"
              showSizeChanger={false}
              total={students?.total}
              pageSize={students?.page_size}
              onChange={(num) => {
                setPage(num);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Students;
