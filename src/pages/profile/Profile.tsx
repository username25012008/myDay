import { Button, Form, Input, Upload } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useSetEditProfileMutation } from "../../api/ApiClient";

const { Dragger } = Upload;

const Profile = () => {
  const { profile }: any = useSelector((state: RootState) => state.profile);
  const [setProfile] = useSetEditProfileMutation();

  const editProfile = async (values: any) => {
    const formData = new FormData();
    if (values?.profile_photo?.file) {
      formData.append("profile_photo", values?.profile_photo?.file);
    }
    formData.append("first_name", values?.first_name);
    formData.append("last_name", values?.last_name);
    await setProfile(formData).unwrap();
    location.reload();
  };

  return (
    <div className="bg-[#F1F4F8] px-3 py-8">
      <div className="bg-white w-full rounded-xl py-3 px-3">
        <span className="text-[#192A3E] font-semibold text-3xl">Profile</span>
        <div className="mt-5 w-6/12 mx-auto">
          <div className="text-center flex justify-center">
            {profile?.profile_photo ? (
              <img
                src={profile.profile_photo}
                alt="avatar"
                className="w-28 h-28 rounded-[45px] inline-block"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-300 rounded-[45px] flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
          <div className="mt-2">
            <Form
              layout="vertical"
              onFinish={editProfile}
              initialValues={{
                first_name: profile?.first_name || "",
                last_name: profile?.last_name || "",
              }}
            >
              <Form.Item label="Profile photo" name="profile_photo">
                <Dragger
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".jpeg,.png,.jpg"
                >
                  <p className="ant-upload-text">
                    Click or drag file to upload
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item
                label="First name"
                name="first_name"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Last name"
                name="last_name"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit" style={{ padding: '20px 60px' }}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
