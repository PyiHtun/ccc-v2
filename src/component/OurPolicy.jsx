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

const getPolicyKeyFromHash = () => {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash || "";
  if (!hash.startsWith("#policy=")) return null;
  return decodeURIComponent(hash.replace("#policy=", ""));
};

const OurPolicy = () => {
  const { t } = useI18n();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [mobilePolicyKey, setMobilePolicyKey] = useState(() => getPolicyKeyFromHash());
  const [mobileNumPages, setMobileNumPages] = useState(0);
  const [mobilePageWidth, setMobilePageWidth] = useState(320);
  const mobileDocRef = useRef(null);

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
    setMobileNumPages(0);
  }, [mobileSelectedPolicy?.key]);

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
            <button
              type="button"
              className="policy-mobile-back"
              onClick={closeMobilePolicy}
            >
              Back
            </button>
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
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={mobilePageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="policy-mobile-page"
                />
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
              <iframe
                className="policy-drawer-frame no-close"
                src={`${selectedPolicy.pdfPath}#page=1&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=1`}
                title={selectedPolicy.title}
                scrolling="yes"
                allowFullScreen
              />
            </div>
          ) : null}
        </TapSwipeDrawer>
      ) : null}
    </div>
  );
};

export default OurPolicy;

