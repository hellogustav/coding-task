import React from "react";
import PropTypes from "prop-types";
import {
  GLOBAL_SCOPE,
  INTERNAL_SCOPE,
  VENDORS_SCOPE,
} from "../options.contants";
import { SectionHeader } from "./sectionHeader";
import { InfoContainer } from "./infoContainer";
import { difference } from "lodash";
import { ListItem } from "./listItem";
import { getSelectedCircle } from "../store/selectors";
import {
  selectVendorAction,
  selectVendorInCircleAction,
} from "../store/actions";

const titles = {
  [INTERNAL_SCOPE]: () => "Internal",
  [VENDORS_SCOPE]: (circleName) => circleName || "All vendor partners",
  [GLOBAL_SCOPE]: () => "Global",
};

export function SelectionList({ scope, state, circles, setState, vendors }) {
  const selectedCircle = getSelectedCircle(circles, state);
  const title = titles[scope](selectedCircle.name);

  const isCircleSelected =
    difference(selectedCircle.vendors, state.vendorsSelected).length === 0;
  const buttonTitle = isCircleSelected
    ? "Unselect entire circle"
    : "Select entire circle";

  const toggleVendorInCircle = () =>
    selectVendorInCircleAction(
      isCircleSelected,
      selectedCircle,
      circles,
      state,
      setState
    );
  const toggleVendor = (vendor) =>
    selectVendorAction(vendor, circles, state, setState);

  const vendorsList =
    selectedCircle.vendorItems || (state.allVendorsButtonSelected && vendors);

  return (
    <div className="selection-list">
      <SectionHeader icon="vendors">
        {title}
        {selectedCircle.id && scope === VENDORS_SCOPE && (
          <button
            className={`circle-button ${isCircleSelected ? "active" : ""}`}
            onClick={toggleVendorInCircle}
          >
            {buttonTitle}
          </button>
        )}
      </SectionHeader>
      {scope === GLOBAL_SCOPE && (
        <InfoContainer
          title="Share job globally"
          description="The job will be shared globally. All vendors on Gustav will be able to see the job and submit candidates to it. Global jobs are reviewed by the Gustav team. This may take up to 24 hours."
        />
      )}
      {scope === INTERNAL_SCOPE && (
        <InfoContainer
          title="Share job internally"
          description="The job will only be visible to your internal team. You can share it to vendors or globally after it was published."
        />
      )}

      {scope === VENDORS_SCOPE && (
        <div className="vendors">
          <h5 className="title">Vendors ({vendorsList.length})</h5>
          {vendorsList.length &&
            vendorsList.map((vendor) => (
              <ListItem
                key={vendor.id}
                logo={vendor.name}
                onClick={() => toggleVendor(vendor)}
                selected={vendor.selected}
              >
                {vendor.name}
                <input
                  className="checkbox"
                  type="checkbox"
                  name={vendor.id}
                  checked={vendor.selected}
                  onChange={() => {}}
                />
              </ListItem>
            ))}
        </div>
      )}
    </div>
  );
}

SelectionList.propTypes = {
  scope: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  vendors: PropTypes.array.isRequired,
  circles: PropTypes.array.isRequired,
};
