import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

export function ListItem({ icon, children, selected, showRightText, rightText, }) {
  return (
    <div className={`list-item ${selected ? 'selected' : ''}`}>
      <div className="title-container">
        {icon && <Icon icon={icon} />}
        <p>{children}</p>
      </div>
      {showRightText && <h3 className="title">{rightText}</h3>}
    </div>
  );
}

ListItem.propTypes = {
  icon: PropTypes.string,
  selected: PropTypes.bool,
  showRightText: PropTypes.bool,
  rightText: PropTypes.string,
};
