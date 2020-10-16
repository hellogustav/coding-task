import axios from "axios";
import {
  GLOBAL_SCOPE,
  INTERNAL_SCOPE,
  VENDORS_SCOPE,
} from "../options.contants";

export const fetchData = async (setData) => {
  const vendorResponse = await axios("https://mock.hellogustav.com/vendors");
  const circleResponse = await axios("https://mock.hellogustav.com/circles");

  const vendors = vendorResponse.data.vendors.map((vendor) => ({
    ...vendor,
    selected: false,
  }));
  const circles = circleResponse.data.circles.map((circle) => ({
    ...circle,
    vendorItems: circle.vendors.map((vendorId) =>
      vendors.find((vendor) => vendor.id === vendorId)
    ),
  }));
  setData({ vendors, circles });
};

export const sendData = async (state, scope) => {
  const data = {
    global: false,
    internal: false,
    vendors: [],
    circles: [],
  };

  if (scope === GLOBAL_SCOPE) {
    data.global = true;
  }

  if (scope === INTERNAL_SCOPE) {
    data.internal = true;
  }

  if (scope === VENDORS_SCOPE) {
    data.vendors = state.selectedVendorIds;
    data.circles = state.selectedCircles.map((circle) => circle.id);
  }

  const circleResponse = await axios.post(
    "https://mock.hellogustav.com/jobs",
    data
  );

  return circleResponse;
};
