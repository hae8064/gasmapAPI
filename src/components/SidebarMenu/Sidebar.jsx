import React, { useState } from "react";
import "./Sidebar.css";
import { MdOutlineCancel } from "react-icons/md";
const Sidebar = ({ display, hamburgerOnclick }) => {
  const [off, setOff] = useState("off");
  const iconOnclick = () => {
    hamburgerOnclick();
    console.log(display);
  };
  return (
    <div className={`sidebarContainer${display}`}>
      <div className="cancelIcon" onClick={iconOnclick}>
        <MdOutlineCancel />
      </div>
      <ul className="ulTitle">
        <li>서울 평균가격</li>
        <li>경기 평균가격</li>
        <li>인천 평균가격</li>
      </ul>
    </div>
  );
};

export default Sidebar;
