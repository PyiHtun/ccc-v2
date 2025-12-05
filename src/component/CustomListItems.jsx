// CustomListItems.js
import React from "react";
import { List, Avatar } from "antd";
import PropTypes from "prop-types";

/**
 * CustomListItems component renders one or more list items with optional avatar, title, and description.
 *
 * This component accepts either an object or an array of objects as the `data` prop. Each object represents
 * a list item and may contain:
 * - title: {string} The title for the list item.
 * - description: {string} The description for the list item.
 * - avatar: {string} The URL for the avatar image.
 *
 * Global props (title, description, avatar) are used as defaults if an individual item does not provide them.
 *
 * @param {Object|Object[]} props.data - A single item or an array of items to display.
 * @param {string} [props.title] - Optional global title to override each item's title.
 * @param {string} [props.description] - Optional global description to override each item's description.
 * @param {string} [props.avatar] - Optional global avatar URL to override each item's avatar.
 * @returns {JSX.Element} A list of rendered items.
 */
const CustomListItems = ({ data, title, description, avatar }) => {
  // If data is not an array, treat it as a single object.
  let items = [];
  if (Array.isArray(data)) {
    items = data;
  } else if (data) {
    items = [data];
  } else if (title || description || avatar) {
    // If no data is provided but global props exist, create one default item using them.
    items = [{ title, description, avatar }];
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item, index) => (
        <List.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {(item.avatar || avatar) && (
              <Avatar
                src={
                  item.avatar ||
                  avatar ||
                  `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                }
                style={{ marginRight: "10px" }}
              />
            )}
            <div style={{ flex: 1, textAlign: "left" }}>
              <List.Item.Meta
                title={item.title || title ? item.title || title : null}
                description={
                  <span style={{ color: "#015BBB" }}>
                    {item.description || description || null}
                  </span>
                }
              />
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
      }),
    ),
  ]),
  title: PropTypes.string,
  description: PropTypes.node,
  avatar: PropTypes.string,
};

export default CustomListItems;
