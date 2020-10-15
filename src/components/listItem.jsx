import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

export function ListItem({ icon, children }) {
  return (
    <div className="list-item">
      {icon && <Icon icon={icon} />}
      <p>{children}</p>
    </div>
  );
}

ListItem.propTypes = {
  icon: PropTypes.string,
};
