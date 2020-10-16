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
        <span className="selected">Selected</span>
        <span className="unselect" onClick={unselectAll}>
          Unselect all
        </span>
      </SectionHeader>
      {scope === GLOBAL_SCOPE && (
        <ListItem icon="internal">Internal only</ListItem>
      )}
      {scope === INTERNAL_SCOPE && <ListItem icon="globe">Global</ListItem>}

      {scope === VENDORS_SCOPE && (
        <div className="vendors-summary-list-container">
          <div className="circles">
            <h5 className="title">Circles ({selectedCircles.length})</h5>
            {selectedCircles.map((circle) => (
              <ListItem icon="circle" key={circle.id}>
                {circle.name}
              </ListItem>
            ))}
          </div>
          <div className="vendors">
            <h5 className="title">Vendors ({selectedVendors.length})</h5>
            {selectedVendors.map((vendor) => (
              <ListItem logo={vendor.name} size="small" key={vendor.id}>
                {vendor.name}
              </ListItem>
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
