import React from "react";
import PropTypes from "prop-types";
import { SectionHeader } from "./sectionHeader";
import { GLOBAL_SCOPE, INTERNAL_SCOPE } from "../options.contants";
import { ListItem } from "./listItem";

export function SummaryList({ scope, state }) {
  return (
    <div className="summary-list">
      <SectionHeader>Selected</SectionHeader>
      {scope === GLOBAL_SCOPE && (
        <ListItem icon="internal">Internal only</ListItem>
      )}
      {scope === INTERNAL_SCOPE && <ListItem icon="globe">Global</ListItem>}
    </div>
  );
}

SummaryList.propTypes = {
  scope: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};
