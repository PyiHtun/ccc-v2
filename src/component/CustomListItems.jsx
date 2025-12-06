// CustomListItems.js
import React from "react";
import { List, Avatar } from "antd";
import PropTypes from "prop-types";

/**
 * Renders one or more list items with optional avatar, title and description.
 * - Respects \n and \n\n in description (whiteSpace: 'pre-line')
 * - Adds horizontal padding and nicer spacing
 */
const CustomListItems = ({ data, title, description, avatar }) => {
  let items = [];
  if (Array.isArray(data)) items = data;
  else if (data) items = [data];
  else if (title || description || avatar) items = [{ title, description, avatar }];

  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item, index) => (
        <List.Item
          style={{
            padding: "16px 24px", // ← left/right padding
            borderBottom: index === items.length - 1 ? "none" : "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "100%",
              textAlign: "left",
              gap: 16,
            }}
          >
            {(item.avatar || avatar) && (
              <Avatar
                src={
                  item.avatar ||
                  avatar ||
                  `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                }
                style={{ marginTop: 4 }}
              />
            )}

            <div style={{ flex: 1, lineHeight: 1.7 }}>
              {(item.title || title) && (
                <h4 style={{ margin: "0 0 8px", fontWeight: 600, color: "#015BBB" }}>
                  {item.title || title}
                </h4>
              )}

              {(item.description || description) && (
                <p
                  style={{
                    margin: 0,
                    whiteSpace: "pre-line", // ← shows \n / \n\n as line breaks/paragraphs
                    fontSize: 15,
                    color: "#333",
                  }}
                >
                  {item.description || description}
                </p>
              )}
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

CustomListItems.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.node,
        avatar: PropTypes.string,
      })
    ),
  ]),
  title: PropTypes.string,
  description: PropTypes.node,
  avatar: PropTypes.string,
};

export default CustomListItems;
