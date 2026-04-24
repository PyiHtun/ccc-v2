import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Divider, Empty, List } from "antd";
import VirtualList from "rc-virtual-list";
import TapSwipeDrawer from "./TapSwipeDrawer.jsx";
import useWindowSize from "../hook/useWindowSize";
import { useI18n } from "../i18n/useI18n.js";
import { policyManifest } from "../policy/policies.js";
import bookIcon from "../img/book.png";

const MAX_VISIBLE_ROWS = 8;
const ROW_HEIGHT = 76;

const OurPolicy = () => {
  const { t } = useI18n();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
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

  useEffect(() => {
    setVisibleCount((current) => Math.min(current, policyItems.length));
  }, [policyItems.length]);

  const openPolicy = (policy) => {
    if (!policy.pdfPath) return;
    setSelectedPolicy(policy);
    setDrawerOpen(true);
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
      {policyItems.length === 0 ? (
        <Empty description="No policy found" />
      ) : (
        <List
          className="policy-index-list"
          itemLayout="horizontal"
        >
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
                    description={policy.pdfPath ? policy.desc : `${policy.desc} (Coming soon)`}
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
                  description={policy.pdfPath ? policy.desc : `${policy.desc} (Coming soon)`}
                />
              </List.Item>
            ))
          )}
        </List>
      )}

      <TapSwipeDrawer
        title={selectedPolicy?.title || "Policy"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        width={width <= 768 ? "100vw" : "75vw"}
        styles={{ body: { padding: 0, overflow: "hidden" } }}
        disableGestureClose
      >
        {selectedPolicy ? (
          <div className="policy-drawer-content">
            <iframe
              className="policy-drawer-frame no-close"
              src={`${selectedPolicy.pdfPath}${
                isMobile
                  ? "#page=1&toolbar=0&navpanes=0&scrollbar=1"
                  : "#page=1&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=1"
              }`}
              title={selectedPolicy.title}
              scrolling="yes"
              allowFullScreen
            />
          </div>
        ) : null}
      </TapSwipeDrawer>
    </div>
  );
};

export default OurPolicy;
