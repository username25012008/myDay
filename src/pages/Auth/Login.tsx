import { Button, Form, Input, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSetLoginMutation } from "../../api/ApiClient";
import "antd/dist/reset.css";

const Login = () => {
  const [setLogin] = useSetLoginMutation();
  const [api, contextHolder] = notification.useNotification();
  const login = async (value: { username: string; password: string }) => {
    try {
      const res = await setLogin(value).unwrap();
      res?.access;
      if (res) {
        localStorage.setItem("access", res?.access);
        localStorage.setItem("refresh", res?.refresh)
        api.success({
          message: "Ты успешно вошел!",
        });
        setTimeout(()=>{
          window.location.pathname = "/";
        }, 500)
      } else {
        api.error({
          message: "Ошибка",
          description: "Неверный логин или пароль!",
          duration: 3,
        });
      }
    } catch (err) {
      api.error({
        message: "Ошибка",
        description: "Неверный логин или пароль!",
        duration: 3,
      });
    }
  };
  
  return (
    <>
      {contextHolder}
      <div className="bg-login md:py-[100px] flex justify-center items-center font-poppins">
        <div className=" bg-white py-[85px] px-[128px] shadow-lg sm:rounded-2xl">
          <div className="w-full text-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/8846/7784/57110d584b8374482ba4b7a12a706293?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AKhcODOZPA4J3rDuis0hR1LFbOGccqh5~prxSSm4Y7KwN~kiEMjsOix~9pF9IyAHMxCA9Xt6jWL6C2bNT0dFQGnqRCNmKevRVPNcfrJbg~rE9UeE39fG8BYaUwtKQW03OZR~1rttYPUOBwChlBEkmZcAocaQiz20ookN98OeJ6QNYnsgFT8iRdROm5TNhJVQuEfhFIY1tM4YsIJ6izh4cyqwoVIDbZYHmx350vF3Z16urQpYGEoI7cMyLethbhvyehjlETGjllMtlOfRbr6p5Y3RaaCGacoFM9ly~3LEoxCt92qjYlPXcV3k-lEWBOyCZ~O5UlsX6hL4pKNF3e3sPw__"
              alt="logo"
              className="h-16 mx-auto"
            />
            <h1 className="text-darkblue text-3xl font-semibold mt-6">
              Welcome!
            </h1>
          </div>
          <Form className="mt-6" onFinish={login} layout="vertical">
            <Form.Item
              name="username"
              label={<span className="text-darkblue font-medium">Login</span>}
              rules={[
                { required: true, message: "Username обязателен!" },
                {
                  min: 6,
                  message: "Username должен быть не менее 6 символов!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Введите логин"
                prefix={<UserOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-darkblue font-medium">Password</span>
              }
              rules={[
                { required: true, message: "Пароль обязателен!" },
                { min: 6, message: "Пароль должен быть не менее 6 символов!" },
                {
                  pattern: /^(?=.*[A-Z])(?=.*\d)/,
                  message: "Должна быть 1 заглавная буква и 1 цифра!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Введите пароль"
                prefix={<LockOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <div className="text-right text-sm text-blue-500 underline cursor-pointer mb-4">
              Forgot Password?
            </div>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="w-full py-3 text-lg rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
