import {
  OrderedListOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/img/logo.png'
import { BsPerson } from "react-icons/bs";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link to={"/dashboard"}>Dashboard</Link>,
  },
  { key: "2", icon: <OrderedListOutlined />, label: <Link to={"/leads"}>Leads</Link> },
  { key: "3", icon: <BsPerson />, label: <Link to={"/clients"}>Clients</Link> },
  { key: "4", icon: <SettingOutlined />, label: <Link to={"/profile"}>Settings</Link> },
];

const Bar = () => {
    const [active,setActive] = useState<string[]>(["1"])
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
      pathname == "/profile" ? setActive(['4']) : pathname == '/leads' ? setActive(['2']) : pathname == '/clients' ? setActive(['3']) : setActive(['1'])
    },[pathname])
  return (
    <div className="">
      <div className="py-[13.5px] px-6 w-full border-r-2 border-b-2 border-[#F1F4F8]">
      <img src={logo} alt="logo" className="cursor-pointer" onClick={()=>{navigate('/')}}/>
      </div>
      <Menu
        itemType=""
        defaultSelectedKeys={["1"]}
        mode="inline"
        inlineCollapsed={false}
        items={items}
        selectedKeys={active}
        className="h-screen"
      />
    </div>
  );
};

export default Bar;



