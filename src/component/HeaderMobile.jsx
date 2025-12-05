import React, { useState } from "react";
import { Layout, Menu, Space, Button, Col, Row, Tag } from "antd";
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

  return (
    <>
      <Header
        className="mobile-header contact-info-mobile"
        style={{ top: 0, zIndex: 1000 }}
      >
        <Space>
          <PhoneTwoTone twoToneColor="#015BBB" />
          <span>0203 924 3451</span>
          <MailTwoTone twoToneColor="#015BBB" />
          <span>info@cozycornercare.com</span>
        </Space>
      </Header>

      <Header
        className="mobile-header"
        style={{
          top: 40,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
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
        />

        {/* 👇 Tap anywhere inside closes; swipe right closes (placement="right") */}
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
                    <Tag icon={<FacebookOutlined />} color="#3b5999">
                      Facebook
                    </Tag>
                    <Tag icon={<LinkedinOutlined />} color="#55acee">
                      LinkedIn
                    </Tag>
                    <Tag icon={<InstagramOutlined />} color="#E1306C">
                      Instagram
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: "left" }}></div>
              </Col>
            </Row>
          }
        >
          <Menu
            mode="vertical"
            defaultSelectedKeys={["home"]}
            items={menuItems}
            onClick={closeDrawer} // still closes when selecting a menu item
          />
        </TapSwipeDrawer>
      </Header>
    </>
  );
};

export default HeaderMobile;
