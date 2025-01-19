import React from "react";

const WeatherTab = ({ activeTab, onTabSwitch }) => {
  return (
    <div className="tab-container">
      <p className={`tab ${activeTab ? "" : "current-tab"}`} onClick={() => onTabSwitch("user")}>
        Your Weather
      </p>
      <p className={`tab ${activeTab ? "current-tab" : ""}`} onClick={() => onTabSwitch("search")}>
        Search Weather
      </p>
    </div>
  );
};

export default WeatherTab;
