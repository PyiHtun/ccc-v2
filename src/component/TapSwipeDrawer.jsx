import React, { useRef } from "react";
import { Drawer } from "antd";

/**
 * TapSwipeDrawer
 * - Closes when you tap anywhere inside (except on buttons/inputs/links)
 * - Closes on swipe right/left/down depending on placement
 */
const SWIPE_PX = 40;

function shouldIgnoreClose(el) {
  return !!el.closest(
    'button, a, [role="button"], input, select, textarea, label,' +
      ' [contenteditable="true"], [data-no-close], .no-close'
  );
}

const TapSwipeDrawer = ({
  open,
  onClose,
  placement = "right",
  title,
  children,
  ...rest
}) => {
  const touchStartRef = useRef({ x: 0, y: 0 });

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement={placement}
      title={title}
      mask
      maskClosable
      keyboard
      modalRender={(node) => (
        <div
          // tap to close
          onClickCapture={(e) => {
            if (!shouldIgnoreClose(e.target)) onClose?.();
          }}
          // swipe to close
          onTouchStart={(e) => {
            const t = e.touches[0];
            touchStartRef.current = { x: t.clientX, y: t.clientY };
          }}
          onTouchEnd={(e) => {
            const t = e.changedTouches[0];
            const dx = t.clientX - touchStartRef.current.x;
            const dy = t.clientY - touchStartRef.current.y;
            const absX = Math.abs(dx);
            const absY = Math.abs(dy);

            if (absX > absY && absX > SWIPE_PX) {
              if (
                (dx > 0 && placement === "right") ||
                (dx < 0 && placement === "left")
              ) {
                onClose?.();
              }
            }
            if (absY > absX && dy > SWIPE_PX && placement === "bottom") {
              onClose?.();
            }
          }}
          style={{ minHeight: "100%", touchAction: "pan-y" }}
        >
          {node}
        </div>
      )}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default TapSwipeDrawer;
