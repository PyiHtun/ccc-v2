import React from "react";
import { Layout, Menu, Space, message } from "antd";
import { PhoneTwoTone, MailTwoTone } from "@ant-design/icons";
import logo from "../img/ccc_main_2.png";
import "../App.css";

const { Header } = Layout;

const HeaderDesktop = ({ menuItems }) => {
  const phoneNumber = "0203 924 3451";
  const email = "info@cozycornercare.com";

  // Click-to-call
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`;
  };

  // Copy email
  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => message.success(`${email} copied to clipboard!`))
      .catch(() => message.error("Failed to copy email."));
  };

  return (
    <Header
      className="desktop-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Cozy Corner Care logo"
        style={{
          height: "20em",
          width: "18em",
          objectFit: "contain",
          marginLeft: "10px",
          marginRight: "20px",
          marginTop: "2px",
        }}
      />

      {/* Navigation menu */}
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={menuItems}
        style={{
          flex: 1,
          minWidth: "40px",
          borderBottom: "0px",
          textAlign: "center",
        }}
        overflowedIndicator={
          <span style={{ fontSize: "40px", lineHeight: "1px" }}>...</span>
        }
      />

      {/* Contact info */}
      <Space className="contact-info" size="large">
        {/* Phone */}
        <span
          onClick={handleCall}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          title="Call us"
        >
          <PhoneTwoTone twoToneColor="#015BBB" />
          <span>{phoneNumber}</span>
        </span>

        {/* Email */}
        <span
          onClick={handleCopyEmail}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          title="Copy email address"
        >
          <MailTwoTone twoToneColor="#015BBB" />
          <span>{email}</span>
        </span>
      </Space>
    </Header>
  );
};

export default HeaderDesktop;
