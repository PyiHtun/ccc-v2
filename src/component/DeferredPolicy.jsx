import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Divider, Spin } from "antd";
import { useI18n } from "../i18n/useI18n.js";

const OurPolicy = lazy(() => import("./OurPolicy.jsx"));

export default function DeferredPolicy() {
  const { t } = useI18n();
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#policy") setVisible(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    let observer;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      }, { rootMargin: "400px" });
      observer.observe(containerRef.current);
    } else {
      setVisible(true);
    }
    return () => {
      observer?.disconnect();
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);
  const placeholder = (
    <div className="body-wrapper" style={{ minHeight: 180 }}>
      <Divider orientation="left">{t("policy.dividerTitle")}</Divider><Spin />
    </div>
  );
  return <div ref={containerRef}>{visible ? <Suspense fallback={placeholder}><OurPolicy /></Suspense> : placeholder}</div>;
}
