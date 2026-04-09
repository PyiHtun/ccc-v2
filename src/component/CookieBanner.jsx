import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useI18n } from "../i18n/useI18n.js";

const LS_KEY = "cookie-consent"; // { status: "accepted" | "rejected", ts: number }

export default function CookieBanner({ onAccept }) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (!saved) setVisible(true);
      else if (saved.status === "accepted") onAccept?.();
    } catch {
      setVisible(true);
    }
  }, [onAccept]);

  if (!visible) return null;

  const acceptAll = () => {
    localStorage.setItem(LS_KEY, JSON.stringify({ status: "accepted", ts: Date.now() }));
    setVisible(false);
    onAccept?.();
  };
  const rejectAll = () => {
    localStorage.setItem(LS_KEY, JSON.stringify({ status: "rejected", ts: Date.now() }));
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        padding: "14px 16px",
        background: "#001529",
        color: "#fff",
        boxShadow: "0 -4px 16px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1, lineHeight: 1.5 }}>
          {t("cookieBanner.body")}{" "}
          <a href="#privacy" style={{ color: "#69c0ff", textDecoration: "underline" }}>
            {t("cookieBanner.privacyLabel")}
          </a>.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={rejectAll}>{t("cookieBanner.reject")}</Button>
          <Button type="primary" onClick={acceptAll} style={{ background: "#015BBB" }}>
            {t("cookieBanner.acceptAll")}
          </Button>
        </div>
      </div>
    </div>
  );
}
