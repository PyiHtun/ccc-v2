import React from "react";
import { FloatButton } from "antd";
import { PhoneFilled, MailFilled } from "@ant-design/icons";
import { useI18n } from "../i18n/useI18n.js";
import "../App.css"

const FloatButtonWrapper = () => {
  const { t } = useI18n();
  return (
    <FloatButton.Group
      shape="circle"
      size="large"
      style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}
    >
      <FloatButton
        type="primary"                    // <- optional with Option B, but fine to keep
        className="float-btn--brand"      // <- key line
        icon={<PhoneFilled style={{ fontSize: 22 }} />}
        onClick={() => (window.location.href = `tel:${t("site.phoneDial")}`)}
        style={{ width: 60, height: 60, boxShadow: "0 4px 10px rgba(0,0,0,.25)" }}
      />
      <FloatButton
        type="primary"
        className="float-btn--brand"
        icon={<MailFilled style={{ fontSize: 22 }} />}
        onClick={() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        style={{ width: 60, height: 60, boxShadow: "0 4px 10px rgba(0,0,0,.25)" }}
      />
    </FloatButton.Group>
  );
};

export default FloatButtonWrapper;
