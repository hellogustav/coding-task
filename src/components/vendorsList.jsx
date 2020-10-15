import React from "react";
import PropTypes from "prop-types";
import {
  GLOBAL_SCOPE,
  INTERNAL_SCOPE,
  VENDORS_SCOPE,
} from "../options.contants";
import { SectionHeader } from "./sectionHeader";
import {ListItem} from "./listItem";

const titles = {
  [INTERNAL_SCOPE]: "Internal",
  [VENDORS_SCOPE]: "All vendor partners",
  [GLOBAL_SCOPE]: "Global",
};

export function VendorsList({ scope, vendors, circles, setState, state }) {
  const title = titles[scope];

  const selectAllVendors = () => {
    if (scope === VENDORS_SCOPE) {
      setState({ ...state, allVendorsButtonSelected: true, circleButtonSelection: '' });
    }
  }

  const selectCircle = (circleId) => {
    setState({ ...state, allVendorsButtonSelected: false, circleButtonSelection: circleId });
  }

  return (
    <div className="vendors-list">
      <div onClick={selectAllVendors}>
        <SectionHeader selected={state.allVendorsButtonSelected} showRightText={scope === VENDORS_SCOPE} rightText={String(vendors.length)}>{title}</SectionHeader>
      </div>

      {scope === VENDORS_SCOPE &&
      <div className="circles">
        <h5 className="title">Circles</h5>
        {circles.map((circle) => (
          <div key={circle.id} onClick={() => selectCircle(circle.id)}>
            <ListItem selected={state.circleButtonSelection === circle.id} showRightText={true}
                      rightText={String(circle.vendors.length)}>{circle.name}</ListItem>
          </div>
        ))}
      </div>
      }
    </div>
  );
}

VendorsList.propTypes = {
  scope: PropTypes.string.isRequired,
  vendors: PropTypes.array.isRequired,
  circles: PropTypes.array.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};
