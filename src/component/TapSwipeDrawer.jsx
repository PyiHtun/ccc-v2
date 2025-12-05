import React, { useRef } from "react";
import { Drawer } from "antd";

const SWIPE_PX = 40;

function shouldIgnoreClose(el) {
  return !!el.closest(
    'button, a, [role="button"], input, select, textarea, label,' +
      ' [contenteditable="true"], [data-no-close], .no-close'
  );
}

export default function TapSwipeDrawer({
  open,
  onClose,
  placement = "right",
  title,
  children,
  ...rest
}) {
  const startRef = useRef({ x: 0, y: 0, type: "" });

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement={placement}
      title={title}
      mask
      maskClosable
      keyboard
      {...rest}
    >
      {/* Wrap ALL content so taps/swipes inside are captured */}
      <div
        // TAP ANYWHERE INSIDE → CLOSE (unless interactive)
        onClickCapture={(e) => {
          if (!shouldIgnoreClose(e.target)) onClose?.();
        }}

        // Use Pointer Events so it works on touch + mouse (great for local testing)
        onPointerDown={(e) => {
          startRef.current = { x: e.clientX, y: e.clientY, type: e.pointerType };
        }}
        onPointerUp={(e) => {
          const dx = e.clientX - startRef.current.x;
          const dy = e.clientY - startRef.current.y;
          const absX = Math.abs(dx);
          const absY = Math.abs(dy);

          // Only treat as swipe for touch (or pen); ignore simple clicks/mouse unless dragged
          const isTouchLike = startRef.current.type === "touch" || startRef.current.type === "pen";

          // Horizontal swipe to close for left/right drawers
          if (absX > absY && absX > SWIPE_PX && isTouchLike) {
            if ((dx > 0 && placement === "right") || (dx < 0 && placement === "left")) {
              onClose?.();
              return;
            }
          }
          // Vertical swipe down to close for bottom drawer
          if (absY > absX && dy > SWIPE_PX && isTouchLike && placement === "bottom") {
            onClose?.();
          }
        }}

        // Allow vertical scrolling while still detecting horizontal swipes
        style={{ minHeight: "100%", touchAction: "pan-y" }}
      >
        {children}
      </div>
    </Drawer>
  );
}
