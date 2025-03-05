import { IoMdTime } from "react-icons/io";
import { LuPresentation } from "react-icons/lu";
import { DiHtml5Connectivity } from "react-icons/di";
import { useEffect, useState } from "react";
import {
  useEditLeadMutation,
  useGetInfoLeadQuery,
  useGetLeadsQuery,
  useGetSubjectsQuery,
  useGetTeachersQuery,
  useGetTimesQuery,
  useSetNewLeadMutation,
} from "../api/ApiClient";
import Loading from "../components/Loading";
import { Button, Form, Input, Select, Modal, notification } from "antd";
import { IoClose } from "react-icons/io5";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

const category = [
  { status: 0, title: "New leads" },
  { status: 1, title: "Contacted" },
  { status: 2, title: "Trial lesson" },
  { status: 3, title: "Summary" },
];
const sources = [
  { id: 1, name: "Instagram" },
  { id: 2, name: "Facebook" },
  { id: 3, name: "Twitter" },
  { id: 4, name: "Recommendation" },
  { id: 5, name: "Friend" },
  { id: 6, name: "Other" },
];

const Leads = () => {
  const { data, isLoading, refetch } = useGetLeadsQuery("");
  const [loading, setLoading] = useState(isLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSModalOpen, setIsSModalOpen] = useState(false);
  const [edit, setEdit] = useState<number | null>(null);
  const [formVal, setFormVal] = useState({});
  const [setNewLead] = useSetNewLeadMutation();
  const [editLead] = useEditLeadMutation();
  const [form] = useForm();
  const { data: subjects } = useGetSubjectsQuery("", { skip: !isModalOpen });
  const { data: teachers } = useGetTeachersQuery("", { skip: !isModalOpen });
  const { data: times } = useGetTimesQuery("", { skip: !isModalOpen });
  const { data: lead } = useGetInfoLeadQuery(edit, { skip: edit === null });
  const [api, contextHolder] = notification.useNotification();

  const showModal = () => {
    setEdit(null);
    form.resetFields();
    setIsModalOpen(true);
  };
  const handleSubmit = async (values: any) => {
    if (edit) {
      values.phone = "+998" + values.phone;
      console.log(values);
      editLead({ ...values, id: edit });
      form.resetFields();
      refetch();
      handleCancel();
      api.success({
        message: "Lead ozgartirildi !",
      });
    } else {
      values.phone = "+998" + values.phone;
      values.isActive = true;
      values.status = 0;
      setFormVal(values);
      setIsSModalOpen(true);
    }
  };
  const handleVerify = async () => {
    await setNewLead(formVal);
    refetch();
    api.success({
      message: "Yangi lead yaratildi !",
    });
    form.resetFields();
    handleCancel();
    handleSCancel();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSCancel = () => {
    setIsSModalOpen(false);
  };
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  useEffect(() => {
    if (lead && edit !== null) {
      form.setFieldsValue({
        first_name: lead.first_name,
        last_name: lead.last_name,
        phone: lead.phone.replace("+998", ""),
        subject: lead.subject,
        teacher: lead?.teacher?.teacher_name,
        lesson_type: lead.lesson_type,
        lesson_time: lead.lesson_time,
        source: lead.source,
      });
    }
  }, [lead, edit, form]);
  const renderLeadCard = (item: any) => (
    <div
      key={item?.id}
      className="bg-white rounded-lg p-3 flex flex-col items-start cursor-pointer"
      onClick={() => {
        setEdit(item?.id);
        setIsModalOpen(true);
      }}
    >
      <span className="text-darkblue text-base font-semibold">
        {item?.first_name
          ? `${item.first_name} ${item.last_name}`
          : "Not Available"}
      </span>
      <span className="relative -ml-3 px-3 bg-[#33A9FF] rounded-r-lg py-1 text-white font-medium text-sm mt-2">
        {item?.phone}
      </span>
      <div className="flex flex-col gap-1 w-full mt-2">
        <div className="flex gap-1 items-center text-base text-[#707683]">
          <LuPresentation />
          <span className="">Type: {item?.lesson_type_display}</span>
        </div>
        <div className="flex gap-1 items-center text-base text-[#707683]">
          <IoMdTime />
          <span className="">{item?.lesson_time || "Not available"}</span>
        </div>
        <div className="flex gap-1 items-center text-base text-[#707683]">
          <DiHtml5Connectivity className="text-lg" />
          <span className="">{item?.source_display || "Not available"}</span>
        </div>
        <div className="flex gap-1 items-center text-base text-[#707683] justify-end">
          {item?.teacher?.profile_photo ? (
            <img src={item?.teacher?.profile_photo} alt="" />
          ) : (
            <div className="bg-gray-400 w-10 h-10 rounded-full"></div>
          )}
          <span className="">
            {item?.teacher?.teacher_name?.split(" ").slice(0, 2).join("") ||
              "Not available"}
          </span>
        </div>
      </div>
    </div>
  );

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-[#F1F4F8] px-3 py-8">
      {contextHolder}
      <div className="text-end mb-5">
        <Button
          type="primary"
          style={{ padding: "10px 60px", fontSize: "20px", fontWeight: "600" }}
          size="large"
          onClick={showModal}
        >
          New lead
        </Button>
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          closeIcon={<IoClose className="text-xl" />}
        >
          <div className="p-5">
            <h2 className="text-center text-xl font-semibold">Add new lead</h2>
            <p className="text-center text-gray-500 text-sm mb-5">
              By creating a new lead, you will also be adding a new customer to
              customer base
            </p>

            <Form layout="vertical" onFinish={handleSubmit} form={form}>
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
                  name="phone"
                  label="Phone number"
                  rules={[{ required: true }]}
                >
                  <Input size="large" addonBefore="+998" />
                </Form.Item>
                <Form.Item
                  name="subject"
                  label="Select subject"
                  rules={[{ required: true }]}
                >
                  <Select size="large" placeholder="Select">
                    {subjects?.map((item: any) => (
                      <Option key={item.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {edit && (
                <div className="w-full">
                  <Form.Item name="status" label="Select status">
                    <Select size="large" placeholder="Select">
                      {category.map((item) => (
                        <Option key={item.status} value={item.status}>
                          {item.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="lesson_type" label="Select lesson type">
                  <Select size="large" placeholder="Select">
                    <Option value="group">Group</Option>
                    <Option value="individual">Individual</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="teacher" label="Select teacher">
                  <Select size="large" placeholder="Select">
                    {teachers?.map((item: any) => (
                      <Option key={item.id} value={item?.id}>
                        {item?.teacher_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="lesson_time" label="Select lesson time">
                  <Select size="large" placeholder="Select">
                    {times?.map((item: any) => (
                      <Option key={item.id} value={item?.start_time}>
                        {item?.start_time}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="source" label="Select lead source">
                  <Select size="large" placeholder="Select">
                    {sources?.map((item: any) => (
                      <Option key={item.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="flex justify-end gap-3">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Confirm
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
        <Modal
          open={isSModalOpen}
          onCancel={handleSCancel}
          footer={null}
          centered
          closeIcon={<IoClose className="text-xl" />}
        >
          <div className="p-5">
            <h2 className="text-center text-xl font-semibold">
              Confirm add a new lead
            </h2>
            <p className="text-center text-gray-500 text-sm mb-5">
              Do you confirm the addition of a new lead to the system?
            </p>
            <div className="flex justify-center gap-5">
              <Button onClick={handleSCancel} style={{ padding: "20px 60px" }}>
                Go back
              </Button>
              <Button
                type="primary"
                onClick={handleVerify}
                style={{ padding: "20px 60px" }}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="bg-white grid grid-cols-4 py-5 px-3 gap-3">
        {category.map(({ status, title }) => (
          <div
            key={status}
            className="bg-[#f1f4f8] flex flex-col gap-3 px-3 py-4 rounded-lg"
          >
            <span className="bg-[#005EEB] w-full py-3 text-center text-white font-semibold rounded-lg">
              {title}
            </span>
            {data?.results
              ?.filter((item: any) => item?.status === status)
              .map(renderLeadCard)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leads;
