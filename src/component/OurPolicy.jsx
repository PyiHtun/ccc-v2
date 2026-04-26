import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Collapse, Divider, Empty, Spin } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import { useI18n } from "../i18n/useI18n.js";
import { policyManifest } from "../policy/policies.js";
import bookIcon from "../img/book.png";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const WATERMARK_POINTS = [
  { left: "18%", top: "22%" },
  { left: "50%", top: "18%" },
  { left: "82%", top: "22%" },
  { left: "18%", top: "50%" },
  { left: "50%", top: "50%" },
  { left: "82%", top: "50%" },
  { left: "18%", top: "78%" },
  { left: "50%", top: "82%" },
  { left: "82%", top: "78%" },
];

const WatermarkLayer = () => (
  <div className="policy-page-watermark-layer" aria-hidden="true">
    {WATERMARK_POINTS.map((point, index) => (
      <span
        key={`wm_${index}`}
        className="policy-page-watermark"
        style={{ left: point.left, top: point.top }}
      >
        Cozy Corner Care
      </span>
    ))}
  </div>
);

const PolicyLabel = ({ order, title, desc }) => (
  <div className="policy-collapse-label">
    <Avatar shape="square" size={42} src={bookIcon} />
    <div className="policy-collapse-label-text">
      <div className="policy-collapse-label-title">{`${order}. ${title}`}</div>
      <div className="policy-collapse-label-desc">{desc}</div>
    </div>
  </div>
);

const OurPolicy = () => {
  const { t } = useI18n();
  const [activeKey, setActiveKey] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [pageWidth, setPageWidth] = useState(860);
  const docRef = useRef(null);

  const policyItems = useMemo(
    () => policyManifest.map((item, index) => ({ ...item, order: index + 1 })),
    []
  );

  const selectedPolicy = useMemo(
    () => policyItems.find((item) => item.key === activeKey) || null,
    [policyItems, activeKey]
  );

  useEffect(() => {
    if (!selectedPolicy || !docRef.current) return undefined;

    const measure = () => {
      if (!docRef.current) return;
      setPageWidth(Math.max(280, Math.floor(docRef.current.clientWidth - 2)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(docRef.current);
    return () => ro.disconnect();
  }, [selectedPolicy]);

  const handlePanelChange = (key) => {
    const next = Array.isArray(key) ? key[0] : key;
    setActiveKey(next || null);
    setNumPages(0);
    setScale(1);
  };

  const decreaseZoom = () => {
    setScale((current) => Math.max(0.8, Number((current - 0.1).toFixed(2))));
  };

  const increaseZoom = () => {
    setScale((current) => Math.min(2.2, Number((current + 0.1).toFixed(2))));
  };

  if (policyItems.length === 0) {
    return (
      <div className="body-wrapper">
        <h2 className="seo-heading">{t("policy.sectionHeading")}</h2>
        <Divider orientation="left">{t("policy.dividerTitle")}</Divider>
        <Empty description="No policy found" />
      </div>
    );
  }

  return (
    <div className="body-wrapper">
      <h2 className="seo-heading">{t("policy.sectionHeading")}</h2>
      <Divider orientation="left">{t("policy.dividerTitle")}</Divider>

      <div className="section-collapse-wrap">
        <Collapse
          accordion
          activeKey={activeKey}
          onChange={handlePanelChange}
          className="policy-collapse"
          items={policyItems.map((policy) => ({
            key: policy.key,
            label: (
              <PolicyLabel
                order={policy.order}
                title={policy.title}
                desc={policy.pdfPath ? policy.desc : `${policy.desc} (Coming soon)`}
              />
            ),
            children: policy.pdfPath ? (
              <div className="policy-inline-viewer">
                <div className="policy-inline-toolbar">
                  <button
                    type="button"
                    className="policy-inline-close"
                    onClick={() => setActiveKey(null)}
                  >
                    Close
                  </button>
                  <div className="policy-inline-toolbar-right">
                    <button type="button" className="policy-inline-zoom" onClick={decreaseZoom}>
                      A-
                    </button>
                    <span className="policy-inline-zoom-value">{`${Math.round(scale * 100)}%`}</span>
                    <button type="button" className="policy-inline-zoom" onClick={increaseZoom}>
                      A+
                    </button>
                  </div>
                </div>

                <div className="policy-inline-doc" ref={selectedPolicy?.key === policy.key ? docRef : null}>
                  {selectedPolicy?.key === policy.key ? (
                    <Document
                      file={policy.pdfPath}
                      loading={
                        <div className="policy-loading">
                          <Spin size="large" />
                        </div>
                      }
                      error="Unable to load policy PDF."
                      onLoadSuccess={({ numPages: totalPages }) => setNumPages(totalPages)}
                    >
                      {Array.from(new Array(numPages), (_el, index) => (
                        <div key={`policy_page_${policy.key}_${index + 1}`} className="policy-page-wrap policy-inline-page">
                          <Page
                            pageNumber={index + 1}
                            width={Math.floor(pageWidth * scale)}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                          <WatermarkLayer />
                        </div>
                      ))}
                    </Document>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="policy-coming-soon">PDF file is not uploaded for this policy yet.</div>
            ),
          }))}
        />
      </div>
    </div>
  );
};

export default OurPolicy;
