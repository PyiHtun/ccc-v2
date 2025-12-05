import React from "react";
import { Layout, Menu, Space } from "antd";
import { PhoneTwoTone, MailTwoTone } from "@ant-design/icons";
import logo from "../img/ccc_main_2.png";
import "../App.css";

const { Header } = Layout;

const HeaderDesktop = ({ menuItems }) => (
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
      background: "#ffffff", // Ensure opaque background
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Optional: adds a subtle shadow for separation
    }}
  >
    <img
      src={logo}
      alt="Logo"
      style={{
        height: "20em",
        width: "18em",
        objectFit: "contain",
        marginLeft: "10px",
        marginRight: "20px",
        marginTop: "2px",
      }}
    />
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
    <Space className="contact-info">
      <PhoneTwoTone twoToneColor="#015BBB" />
      <span>0203 924 3451</span>
      <MailTwoTone twoToneColor="#015BBB" />
      <span>info@cozycornercare.com</span>
    </Space>
  </Header>
);

export default HeaderDesktop;
