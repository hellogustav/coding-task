import { VENDORS_SCOPE } from "../options.contants";
import { getSelectedData } from "./selectors";
import { difference, uniq } from "lodash";

export const selectAllVendorsAction = (scope, state, setState) => {
  if (scope === VENDORS_SCOPE) {
    setState({
      ...state,
      allVendorsButtonSelected: true,
      circleButtonSelection: "",
    });
  }
};

export const selectCircleAction = (circleId, state, setState) => {
  setState({
    ...state,
    allVendorsButtonSelected: false,
    circleButtonSelection: circleId,
  });
};

export const selectVendorInCircleAction = (
  isCircleSelected,
  selectedCircle,
  circles,
  state,
  setState
) => {
  let vendorsSelected;
  if (isCircleSelected) {
    vendorsSelected = difference(state.vendorsSelected, selectedCircle.vendors);

    selectedCircle.vendorItems.forEach((item) => {
      item.selected = false;
    });
  } else {
    vendorsSelected = uniq([
      ...state.vendorsSelected,
      ...selectedCircle.vendors,
    ]);

    selectedCircle.vendorItems.forEach((item) => {
      item.selected = true;
    });
  }

  setState({
    ...state,
    vendorsSelected,
    ...getSelectedData(vendorsSelected, circles),
  });
};

export const selectVendorAction = (vendor, circles, state, setState) => {
  let vendorsSelected;
  if (vendor.selected) {
    vendorsSelected = difference(state.vendorsSelected, [vendor.id]);
  } else {
    vendorsSelected = uniq([...state.vendorsSelected, vendor.id]);
  }

  setState({
    ...state,
    vendorsSelected,
    ...getSelectedData(vendorsSelected, circles),
  });

  vendor.selected = !vendor.selected;
};

export const unselectAllAction = (vendors, circles, state, setState) => {
  vendors.forEach((vendor) => {
    vendor.selected = false;
  });
  circles.forEach((circle) => {
    circle.vendorItems.forEach((vendor) => {
      vendor.selected = false;
    });
  });
  setState({ ...state, vendorsSelected: [] });
};
