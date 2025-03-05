import { Dropdown, MenuProps } from "antd";
import { useSetLogOutMutation } from "../api/ApiClient";
import { Link, useLocation } from "react-router-dom";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../store/ProfileSlice";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";

const Navbar = ({ data, isError }: any) => {
  const [setLogOut] = useSetLogOutMutation();
  const [text, setText] = useState("");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    if (data && !isError) {
      dispatch(setProfile(data));
    } else if (isError) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/";
    }
  }, [data, isError, dispatch]);

  useEffect(() => {
    if (pathname === "/dashboard" || pathname === "/") {
      setText("Dashboard");
    } else if (pathname === "/profile") {
      setText("Settings");
    } else if (pathname === "/leads") {
      setText("Board of leads");
    }
  }, [pathname]);

  const logOut = async () => {
    try {
      const refresh = { refresh: localStorage.getItem("refresh") };
      await setLogOut(refresh).unwrap();
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleFullScreen = () => {
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setFullScreen(true);
      } else {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/profile">My profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: (
        <button className="cursor-pointer" onClick={logOut}>
          Log out
        </button>
      ),
      icon: <LoginOutlined />,
      danger: true,
    },
  ];

  return (
    <div className="w-full px-6 py-[18px] flex justify-between items-center bg-white font-poppins border-b-2 border-[#F1F4F8]">
      <span className="text-darkblue text-base font-semibold">{text}</span>
      <div className="flex gap-3 items-center">
        <div className="cursor-pointer text-2xl" onClick={toggleFullScreen}>
          {!fullScreen ? <BsArrowsFullscreen /> : <BsFullscreenExit />}
        </div>
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          className="cursor-pointer"
        >
          <div className="flex flex-row items-center gap-3">
            <img
              src={data?.profile_photo}
              alt={data?.first_name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-darkblue">
                {`${data?.last_name} ${data?.first_name?.charAt(0)}`}
              </span>
              <span className="font-medium text-sm capitalize text-[#90A0B7]">
                {data?.user?.user_role}
              </span>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
