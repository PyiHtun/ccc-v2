// ServiceItem.jsx
import React from "react";

const ServiceItem = ({ icon, title }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon && (
        <img
          src={icon}
          alt="Service Icon"
          style={{ width: "40px", height: "40px", marginBottom: "8px" }}
        />
      )}
      <span>{title}</span>
    </div>
  );
};

export default ServiceItem;
