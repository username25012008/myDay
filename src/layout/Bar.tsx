import {
  ContainerOutlined,
  OrderedListOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/img/logo.png'

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link to={"/dashboard"}>Dashboard</Link>,
  },
  { key: "2", icon: <OrderedListOutlined />, label: <Link to={"/leads"}>Leads</Link> },
  { key: "3", icon: <ContainerOutlined />, label: <Link to={"/profile"}>Settings</Link> },
];

const Bar = () => {
    const [active,setActive] = useState<string[]>(["1"])
    const {pathname} = useLocation()
    useEffect(()=>{
      pathname == "/profile" ? setActive(['3']) : pathname == '/leads' ? setActive(['2']) : setActive(['1'])
    },[pathname])
  return (
    <div className="">
      <div className="py-[13.5px] px-6 w-full border-r-2 border-b-2 border-[#F1F4F8]">
      <img src={logo} alt="logo" className=""/>
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



