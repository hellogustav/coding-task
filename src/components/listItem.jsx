import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import Logo from "../Logo";

export function ListItem({
  icon,
  logo,
  children,
  selected,
  showRightText,
  rightText,
  onClick,
  size = "large",
}) {
  return (
    <div
      onClick={onClick}
      className={`list-item ${selected ? "selected" : ""}`}
    >
      <div className="title-container">
        {icon && <Icon icon={icon} />}
        {logo && <Logo name={logo} size={size} />}
        <div className="list-item-text">{children}</div>
      </div>
      {showRightText && <h3 className="title">{rightText}</h3>}
    </div>
  );
}

ListItem.propTypes = {
  icon: PropTypes.string,
  logo: PropTypes.string,
  selected: PropTypes.bool,
  showRightText: PropTypes.bool,
  rightText: PropTypes.string,
  onClick: PropTypes.func,
};
