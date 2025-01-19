import React from "react";

const GrantLocation = ({ onGrant }) => {
  console.log("GrantLocation component rendered"); 
  return (
    <div className="grant-location-container active">
      <img src="/assets/location.png" width="80" height="80" alt="Location Icon" />
      <p>Grant Location Access</p>
      <p>Allow Access to get weather Information</p>
      <button className="btn" onClick={onGrant}>
        Grant Access
      </button>
    </div>
  );
};

export default GrantLocation;
