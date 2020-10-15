import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

export function SectionHeader({ icon, children, showRightText, rightText, selected }) {
  return (
    <div className={`section-header ${selected ? 'selected' : ''}`}>
      <div className="title-container">
        {icon && <Icon icon={icon} color="#0b748c" />}
        <h3 className="title">{children}</h3>
      </div>
      {showRightText && <h3 className="title">{rightText}</h3>}
    </div>
  );
}

SectionHeader.propTypes = {
  icon: PropTypes.string,
  showRightText: PropTypes.bool,
  rightText: PropTypes.string,
  selected: PropTypes.bool,
};
