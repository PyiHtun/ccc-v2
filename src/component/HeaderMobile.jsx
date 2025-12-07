import React, { useState } from "react";
import { Layout, Menu, Space, Button, Col, Row, Tag, message } from "antd";
import {
  PhoneTwoTone,
  MailTwoTone,
  MenuOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import TapSwipeDrawer from "./TapSwipeDrawer";
import logo from "../img/ccc_main_2.png";
import "../App.css";

const { Header } = Layout;

const HeaderMobile = ({ menuItems }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const phoneNumber = "0203 924 3451";
  const email = "info@cozycornercare.com";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => message.success(`${email} copied to clipboard!`))
      .catch(() => message.error("Failed to copy email."));
  };

  return (
    <>
      {/* Top contact strip */}
      <Header className="mobile-header contact-info-mobile" style={{ top: 0, zIndex: 1000 }}>
        <Space size="large">
          {/* Phone (tap to call) */}
          <span
            onClick={handleCall}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCall()}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
            title="Call us"
            aria-label={`Call ${phoneNumber}`}
          >
            <PhoneTwoTone twoToneColor="#015BBB" />
            <span>{phoneNumber}</span>
          </span>

          {/* Email (tap to copy) */}
          <span
            onClick={handleCopyEmail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCopyEmail()}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
            title="Copy email address"
            aria-label={`Copy email ${email}`}
          >
            <MailTwoTone twoToneColor="#015BBB" />
            <span>{email}</span>
          </span>
        </Space>
      </Header>

      {/* Logo + menu */}
      <Header
        className="mobile-header"
        style={{ top: 40, zIndex: 999, display: "flex", alignItems: "center", padding: "0 10px" }}
      >
        <img
          src={logo}
          alt="Cozy Corner Care logo"
          style={{
            height: "10em",
            width: "16em",
            objectFit: "contain",
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "2px",
          }}
        />
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: "24px", color: "#015BBB" }} />}
          onClick={openDrawer}
          style={{ marginLeft: "auto", marginRight: "14px" }}
          aria-label="Open menu"
        />

        {/* Drawer */}
        <TapSwipeDrawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          footer={
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ marginBottom: "16px" }}>Follow Us</h4>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Tag icon={<FacebookOutlined />} color="#3b5999">Facebook</Tag>
                    <Tag icon={<LinkedinOutlined />} color="#55acee">LinkedIn</Tag>
                    <Tag icon={<InstagramOutlined />} color="#E1306C">Instagram</Tag>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: "left" }} />
              </Col>
            </Row>
          }
        >
          <Menu
            mode="vertical"
            defaultSelectedKeys={["home"]}
            items={menuItems}
            onClick={closeDrawer}
          />
        </TapSwipeDrawer>
      </Header>
    </>
  );
};

export default HeaderMobile;
