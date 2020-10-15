import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

export function SectionHeader({ icon, children }) {
  return (
    <div className="section-header">
      {icon && <Icon icon={icon} color="#0b748c" />}
      <h3 className="title">{children}</h3>
    </div>
  );
}

SectionHeader.propTypes = {
  icon: PropTypes.string,
};
