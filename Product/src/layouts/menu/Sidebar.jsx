import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { menuItems } from './Menu';
import logo from "../../assets/image/fb.svg";
import "../../App.scss";


function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);

  function handleMenuClick(index) {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  }

  function renderMenuItem(item, index) {
    let hasChildren = item.children && item.children.length > 0;
    debugger
    let isActive = activeMenu === index;

    return (
      <li key={index} className={`menu-item ${isActive ? "active" : ""}`}>
        <Link to={item.path} onClick={() => handleMenuClick(index)}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </Link>
        {hasChildren && (
          <ul className="sub-menu">
            {item.children.map((child, childIndex) => (
              <li key={childIndex}>
                <Link to={`${item.path}/${child.path}`}>{child.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <nav className="sidebar-menu">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="menu-items">
        {menuItems.map((item, index) => (
          <div key={index}>
            {renderMenuItem(item, index)}
            {item.divider && <hr />}
          </div>
        ))}
      </ul>
    </nav>
  );
}


export default Sidebar;