import React from "react";
import PropTypes from "prop-types";
import {
  GLOBAL_SCOPE,
  INTERNAL_SCOPE,
  VENDORS_SCOPE,
} from "../options.contants";
import { SectionHeader } from "./sectionHeader";

const titles = {
  [INTERNAL_SCOPE]: "Internal",
  [VENDORS_SCOPE]: "All vendor partners",
  [GLOBAL_SCOPE]: "Global",
};

export function VendorsList({ scope }) {
  const title = titles[scope];
  return (
    <div className="vendors-list">
      <SectionHeader>{title}</SectionHeader>
    </div>
  );
}

VendorsList.propTypes = {
  scope: PropTypes.string.isRequired,
};
