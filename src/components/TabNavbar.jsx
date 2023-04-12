import { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {FaTimes, FaHome, FaCogs, FaLineChart, FaComment, FaAd} from 'react-icons/fa'

const menuItem = [
    { icon: FaHome, menuName: "Home" },
    { icon: FaCogs, menuName: "Mechanics" },
    { icon: FaAd, menuName: "Motion" },
    { icon: FaComment, menuName: "Summary" },
  ];

const TabNabvar = (props) => {
  return (
    <>
    <div className="header">
      <TabList className="">
        {menuItem.map((item, i) => (
          <Tab style={{display: "inline"}} className="icon-box" key={i}>
            <button style={{display: "inline"}}>{item.menuName}</button>
          </Tab>
        ))}
      </TabList>
    </div>
    </>
    );
  };

export default TabNabvar;
