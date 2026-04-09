import React, { useState } from "react";
import { Layout, Menu, Space, Button, Col, Row, Tag, Switch, Select, message } from "antd";
import {
  PhoneTwoTone,
  MailTwoTone,
  MenuOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import TapSwipeDrawer from "./TapSwipeDrawer";
import logo from "../img/ccc_main_2.png";
import { useI18n } from "../i18n/useI18n.js";
import "../App.css";

const { Header } = Layout;

const HeaderMobile = ({ menuItems, darkMode, onToggleTheme }) => {
  const { t, language, setLanguage } = useI18n();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const phoneNumber = t("site.phoneDisplay");
  const phoneDial = t("site.phoneDial");
  const email = t("site.emails.info");
  const languageOptions = [
    { value: "en", label: t("language.englishUk") },
    { value: "my", label: t("language.myanmar", "🇲🇲 မြန်မာ") },
  ];

  const handleCall = () => {
    window.location.href = `tel:${phoneDial}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() =>
        message.success(t("messages.copiedEmail").replace("{email}", email))
      )
      .catch(() => message.error(t("messages.copyEmailFailed")));
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
            title={t("common.callUs")}
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
            title={t("common.copyEmailAddress")}
            aria-label={`${t("common.copyEmailAria")} ${email}`}
          >
            <MailTwoTone twoToneColor="#015BBB" />
            <span>{email}</span>
          </span>
        </Space>
      </Header>

      {/* Logo + menu */}
      <Header
        className="mobile-header"
        style={{ top: 40, zIndex: 999, display: "flex", alignItems: "center", padding: "0 10px", background: "var(--surface-bg)" }}
      >
        <img
          src={logo}
          alt={t("common.logoAlt")}
          style={{
            height: "10em",
            width: "16em",
            objectFit: "contain",
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "2px",
          }}
        />
        <Switch
          checked={darkMode}
          onChange={onToggleTheme}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          aria-label={t("common.toggleDarkMode")}
        />
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: "24px", color: "#015BBB" }} />}
          onClick={openDrawer}
          style={{ marginLeft: "auto", marginRight: "14px" }}
          aria-label={t("common.openMenu")}
        />

        {/* Drawer */}
        <TapSwipeDrawer
          title={t("drawer.menuTitle")}
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          footer={
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ marginBottom: "16px" }}>{t("social.followUs")}</h4>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Tag icon={<FacebookOutlined />} color="#3b5999">{t("social.facebook")}</Tag>
                    <Tag icon={<LinkedinOutlined />} color="#55acee">{t("social.linkedIn")}</Tag>
                    <Tag icon={<InstagramOutlined />} color="#E1306C">{t("social.instagram")}</Tag>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: "left" }} />
              </Col>
            </Row>
          }
        >
          <div style={{ marginBottom: 12 }}>
            <div style={{ marginBottom: 6 }}>{t("language.label")}</div>
            <Select
              value={language}
              onChange={setLanguage}
              options={languageOptions}
              style={{ width: "100%" }}
              dropdownMatchSelectWidth={false}
            />
          </div>
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
