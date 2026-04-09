import React from "react";
import { Layout, Menu, Select, Space, Switch, message } from "antd";
import { PhoneTwoTone, MailTwoTone, MoonOutlined, SunOutlined } from "@ant-design/icons";
import logo from "../img/ccc_main_2.png";
import { useI18n } from "../i18n/useI18n.js";
import "../App.css";

const { Header } = Layout;

const HeaderDesktop = ({ menuItems, darkMode, onToggleTheme }) => {
  const { t, language, setLanguage } = useI18n();
  const phoneNumber = t("site.phoneDisplay");
  const phoneDial = t("site.phoneDial");
  const email = t("site.emails.info");
  const languageOptions = [
    { value: "en", label: t("language.englishUk") },
    { value: "my", label: t("language.myanmar", "🇲🇲 မြန်မာ") },
  ];

  // Click-to-call
  const handleCall = () => {
    window.location.href = `tel:${phoneDial}`;
  };

  // Copy email
  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() =>
        message.success(t("messages.copiedEmail").replace("{email}", email))
      )
      .catch(() => message.error(t("messages.copyEmailFailed")));
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
        background: "var(--header-bar-bg)",
        boxShadow: "var(--header-shadow)",
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt={t("common.logoAlt")}
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
        theme={darkMode ? "dark" : "light"}
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={menuItems}
        style={{
          flex: 1,
          minWidth: "40px",
          borderBottom: "0px",
          textAlign: "center",
          background: "transparent",
        }}
        overflowedIndicator={
          <span style={{ fontSize: "40px", lineHeight: "1px" }}>...</span>
        }
      />

      {/* Contact info */}
      <Space className="contact-info" size="large">
        <Select
          size="small"
          value={language}
          onChange={setLanguage}
          options={languageOptions}
          aria-label={t("language.label")}
          style={{ minWidth: 120 }}
          dropdownMatchSelectWidth={false}
        />
        <Switch
          checked={darkMode}
          onChange={onToggleTheme}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          aria-label={t("common.toggleDarkMode")}
        />
        {/* Phone */}
        <span
          onClick={handleCall}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          title={t("common.callUs")}
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
          title={t("common.copyEmailAddress")}
        >
          <MailTwoTone twoToneColor="#015BBB" />
          <span>{email}</span>
        </span>
      </Space>
    </Header>
  );
};

export default HeaderDesktop;
