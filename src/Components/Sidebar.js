import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import React from 'react';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="brand">
        <span className="logo">Victoria Hotel Manager</span>
        <span className="ver">(ver 22.1a)</span>
      </div>
      <ul className="sidebarList">
        {SidebarData.map((item, key) => {
          return (
            <Link to={item.link}>
              <li className="row" key={key}>
                <div id="icon">{item.icon}</div>
                <div id="title">{item.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
