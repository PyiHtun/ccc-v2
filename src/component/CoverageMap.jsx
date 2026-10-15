import React from "react";
import { useI18n } from "../i18n/useI18n.js";

export default function CoverageMap({ darkMode }) {
  const { t, language } = useI18n();
  return (
    <iframe
      className="coverage-map-frame"
      title={t("areas.mapTitle")}
      src={`/coverage-map.html?theme=${darkMode ? "dark" : "light"}&lang=${language}`}
      loading="lazy"
    />
  );
}
