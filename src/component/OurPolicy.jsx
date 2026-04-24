import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Divider, Empty, List, Spin } from "antd";
import VirtualList from "rc-virtual-list";
import { Document, Page, pdfjs } from "react-pdf";
import TapSwipeDrawer from "./TapSwipeDrawer.jsx";
import useWindowSize from "../hook/useWindowSize";
import { useI18n } from "../i18n/useI18n.js";
import { policyManifest } from "../policy/policies.js";
import bookIcon from "../img/book.png";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MAX_VISIBLE_ROWS = 8;
const ROW_HEIGHT = 76;
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

const getPolicyKeyFromHash = () => {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash || "";
  if (!hash.startsWith("#policy=")) return null;
  return decodeURIComponent(hash.replace("#policy=", ""));
};

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

const OurPolicy = () => {
  const { t } = useI18n();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [desktopNumPages, setDesktopNumPages] = useState(0);
  const [desktopPageWidth, setDesktopPageWidth] = useState(900);
  const [desktopScale, setDesktopScale] = useState(1);
  const [mobilePolicyKey, setMobilePolicyKey] = useState(() => getPolicyKeyFromHash());
  const [mobileNumPages, setMobileNumPages] = useState(0);
  const [mobilePageWidth, setMobilePageWidth] = useState(320);
  const [mobileScale, setMobileScale] = useState(1);
  const mobileDocRef = useRef(null);
  const desktopDocRef = useRef(null);

  const policyItems = policyManifest.map((item, index) => ({ ...item, order: index + 1 }));
  const pageSize = MAX_VISIBLE_ROWS;
  const useVirtualList = policyItems.length > MAX_VISIBLE_ROWS;
  const [visibleCount, setVisibleCount] = useState(
    Math.min(pageSize, policyItems.length)
  );
  const visiblePolicies = useMemo(
    () => policyItems.slice(0, visibleCount),
    [policyItems, visibleCount]
  );
  const hasMore = visibleCount < policyItems.length;
  const listHeight =
    Math.min(MAX_VISIBLE_ROWS, Math.max(visiblePolicies.length, 1)) * ROW_HEIGHT;
  const mobileSelectedPolicy =
    policyItems.find((item) => item.key === mobilePolicyKey) || null;

  useEffect(() => {
    setVisibleCount((current) => Math.min(current, policyItems.length));
  }, [policyItems.length]);

  useEffect(() => {
    if (!isMobile) return undefined;
    const onHashChange = () => setMobilePolicyKey(getPolicyKeyFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !mobileSelectedPolicy || !mobileDocRef.current) return undefined;

    const measure = () => {
      if (!mobileDocRef.current) return;
      setMobilePageWidth(Math.max(280, Math.floor(mobileDocRef.current.clientWidth - 2)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(mobileDocRef.current);
    return () => ro.disconnect();
  }, [isMobile, mobileSelectedPolicy]);

  useEffect(() => {
    if (isMobile || !drawerOpen || !selectedPolicy || !desktopDocRef.current) return undefined;

    const measure = () => {
      if (!desktopDocRef.current) return;
      setDesktopPageWidth(Math.max(560, Math.floor(desktopDocRef.current.clientWidth - 24)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(desktopDocRef.current);
    return () => ro.disconnect();
  }, [isMobile, drawerOpen, selectedPolicy]);

  useEffect(() => {
    setMobileNumPages(0);
    setMobileScale(1);
  }, [mobileSelectedPolicy?.key]);

  useEffect(() => {
    setDesktopNumPages(0);
    setDesktopScale(1);
  }, [selectedPolicy?.key]);

  const openPolicy = (policy) => {
    if (!policy.pdfPath) return;
    if (isMobile) {
      window.location.hash = `policy=${encodeURIComponent(policy.key)}`;
      return;
    }
    setSelectedPolicy(policy);
    setDrawerOpen(true);
  };

  const closeMobilePolicy = () => {
    setMobilePolicyKey(null);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`
    );
  };

  const decreaseZoom = () => {
    setMobileScale((current) => Math.max(0.8, Number((current - 0.1).toFixed(2))));
  };

  const increaseZoom = () => {
    setMobileScale((current) => Math.min(2.2, Number((current + 0.1).toFixed(2))));
  };

  const decreaseDesktopZoom = () => {
    setDesktopScale((current) => Math.max(0.8, Number((current - 0.1).toFixed(2))));
  };

  const increaseDesktopZoom = () => {
    setDesktopScale((current) => Math.min(2.2, Number((current + 0.1).toFixed(2))));
  };

  const loadMore = () => {
    if (!hasMore) return;
    setVisibleCount((current) => Math.min(current + pageSize, policyItems.length));
  };

  const onScroll = (e) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          listHeight
      ) <= 1
    ) {
      loadMore();
    }
  };

  return (
    <div className="body-wrapper">
      <h2 className="seo-heading">{t("policy.sectionHeading")}</h2>
      <Divider orientation="left">{t("policy.dividerTitle")}</Divider>

      {isMobile && mobileSelectedPolicy ? (
        <div className="policy-mobile-view">
          <div className="policy-mobile-header">
            <div className="policy-mobile-meta">
              <Avatar shape="square" size={36} src={bookIcon} />
              <div className="policy-mobile-title">
                {`${mobileSelectedPolicy.order}. ${mobileSelectedPolicy.title}`}
              </div>
            </div>
            <div className="policy-mobile-actions">
              <button type="button" className="policy-mobile-zoom" onClick={decreaseZoom}>
                A-
              </button>
              <span className="policy-mobile-zoom-value">{`${Math.round(mobileScale * 100)}%`}</span>
              <button type="button" className="policy-mobile-zoom" onClick={increaseZoom}>
                A+
              </button>
              <button
                type="button"
                className="policy-mobile-back"
                onClick={closeMobilePolicy}
              >
                Back
              </button>
            </div>
          </div>
          <div className="policy-mobile-doc" ref={mobileDocRef}>
            <Document
              file={mobileSelectedPolicy.pdfPath}
              loading={
                <div className="policy-mobile-loading">
                  <Spin size="large" />
                </div>
              }
              error="Unable to load policy PDF."
              onLoadSuccess={({ numPages }) => setMobileNumPages(numPages)}
            >
              {Array.from(new Array(mobileNumPages), (_el, index) => (
                <div key={`mobile_wrap_${index + 1}`} className="policy-page-wrap policy-mobile-page">
                  <Page
                    pageNumber={index + 1}
                    width={Math.floor(mobilePageWidth * mobileScale)}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                  <WatermarkLayer />
                </div>
              ))}
            </Document>
          </div>
        </div>
      ) : null}

      {!isMobile || !mobileSelectedPolicy ? (
        <>
          {policyItems.length === 0 ? (
            <Empty description="No policy found" />
          ) : (
            <List className="policy-index-list" itemLayout="horizontal">
              {useVirtualList ? (
                <VirtualList
                  data={visiblePolicies}
                  height={listHeight}
                  itemHeight={ROW_HEIGHT}
                  itemKey="key"
                  onScroll={onScroll}
                >
                  {(policy) => (
                    <List.Item
                      key={policy.key}
                      className={`policy-index-item ${policy.pdfPath ? "" : "policy-index-item-disabled"}`}
                      onClick={() => openPolicy(policy)}
                      role={policy.pdfPath ? "button" : undefined}
                      tabIndex={policy.pdfPath ? 0 : -1}
                      onKeyDown={(e) => {
                        if (policy.pdfPath && (e.key === "Enter" || e.key === " ")) {
                          openPolicy(policy);
                        }
                      }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar shape="square" size={42} src={bookIcon} />}
                        title={`${policy.order}. ${policy.title}`}
                        description={
                          policy.pdfPath ? policy.desc : `${policy.desc} (Coming soon)`
                        }
                      />
                    </List.Item>
                  )}
                </VirtualList>
              ) : (
                policyItems.map((policy) => (
                  <List.Item
                    key={policy.key}
                    className={`policy-index-item ${policy.pdfPath ? "" : "policy-index-item-disabled"}`}
                    onClick={() => openPolicy(policy)}
                    role={policy.pdfPath ? "button" : undefined}
                    tabIndex={policy.pdfPath ? 0 : -1}
                    onKeyDown={(e) => {
                      if (policy.pdfPath && (e.key === "Enter" || e.key === " ")) {
                        openPolicy(policy);
                      }
                    }}
                  >
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={42} src={bookIcon} />}
                      title={`${policy.order}. ${policy.title}`}
                      description={
                        policy.pdfPath ? policy.desc : `${policy.desc} (Coming soon)`
                      }
                    />
                  </List.Item>
                ))
              )}
            </List>
          )}
        </>
      ) : null}

      {!isMobile ? (
        <TapSwipeDrawer
          title={selectedPolicy?.title || "Policy"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          placement="right"
          width="75vw"
          styles={{ body: { padding: 0, overflow: "hidden" } }}
          disableGestureClose
        >
          {selectedPolicy ? (
            <div className="policy-drawer-content">
              <div className="policy-desktop-header">
                <div className="policy-desktop-actions">
                  <button
                    type="button"
                    className="policy-desktop-zoom"
                    onClick={decreaseDesktopZoom}
                  >
                    A-
                  </button>
                  <span className="policy-desktop-zoom-value">{`${Math.round(desktopScale * 100)}%`}</span>
                  <button
                    type="button"
                    className="policy-desktop-zoom"
                    onClick={increaseDesktopZoom}
                  >
                    A+
                  </button>
                </div>
              </div>
              <div className="policy-desktop-doc no-close" ref={desktopDocRef}>
                <Document
                  file={selectedPolicy.pdfPath}
                  loading={
                    <div className="policy-desktop-loading">
                      <Spin size="large" />
                    </div>
                  }
                  error="Unable to load policy PDF."
                  onLoadSuccess={({ numPages }) => setDesktopNumPages(numPages)}
                >
                  {Array.from(new Array(desktopNumPages), (_el, index) => (
                    <div
                      key={`desktop_wrap_${index + 1}`}
                      className="policy-page-wrap policy-desktop-page"
                    >
                      <Page
                        pageNumber={index + 1}
                        width={Math.floor(desktopPageWidth * desktopScale)}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                      <WatermarkLayer />
                    </div>
                  ))}
                </Document>
              </div>
            </div>
          ) : null}
        </TapSwipeDrawer>
      ) : null}
    </div>
  );
};

export default OurPolicy;
