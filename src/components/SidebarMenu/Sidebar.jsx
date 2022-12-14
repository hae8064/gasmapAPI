import React, { useState } from 'react';
import './Sidebar.css';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = ({ display, hamburgerOnclick }) => {
  const [off, setOff] = useState('off');
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
        <Link
          to="/seoulPrice"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <li>서울 평균가격</li>
        </Link>
        <Link
          to="/gyungiPrice"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <li>경기 평균가격</li>
        </Link>
        <Link
          to="/incheonPrice"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <li>인천 평균가격</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
