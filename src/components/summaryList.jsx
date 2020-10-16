import React from "react";
import PropTypes from "prop-types";
import { SectionHeader } from "./sectionHeader";
import {
  GLOBAL_SCOPE,
  INTERNAL_SCOPE,
  VENDORS_SCOPE,
} from "../options.contants";
import { ListItem } from "./listItem";
import { unselectAllAction } from "../store/actions";

export function SummaryList({ scope, state, setState, vendors, circles }) {
  const unselectAll = () =>
    unselectAllAction(vendors, circles, state, setState);

  const { selectedCircles, selectedVendorIds } = state;
  const selectedVendors = selectedVendorIds.map((id) =>
    vendors.find((vendor) => vendor.id === id)
  );

  return (
    <div className="summary-list">
      <SectionHeader>
        <span className="left">Selected</span>
        <span className="right" onClick={unselectAll}>
          Unselect all
        </span>
      </SectionHeader>
      {scope === GLOBAL_SCOPE && (
        <ListItem icon="internal">Internal only</ListItem>
      )}
      {scope === INTERNAL_SCOPE && <ListItem icon="globe">Global</ListItem>}

      {scope === VENDORS_SCOPE && (
        <div className="vendors-summary-list-container">
          <div className="circles-list">
            <h5>Circles ({selectedCircles.length})</h5>
            {selectedCircles.map((circle) => (
              <ListItem key={circle.id}>{circle.name}</ListItem>
            ))}
          </div>
          <div className="vendors-list">
            <h5>Vendors ({selectedVendors.length})</h5>
            {selectedVendors.map((vendor) => (
              <ListItem key={vendor.id}>{vendor.name}</ListItem>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

SummaryList.propTypes = {
  scope: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  vendors: PropTypes.array.isRequired,
  circles: PropTypes.array.isRequired,
};
