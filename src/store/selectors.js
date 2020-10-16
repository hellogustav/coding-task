import { difference } from 'lodash';

export const getSelectedData = (vendorsSelected, circles) => {
  const selectedCircles = circles.filter((circle) => difference(circle.vendors, vendorsSelected).length === 0);
  let selectedVendorIds = [...vendorsSelected];
  selectedCircles.forEach((circle) => {
    selectedVendorIds = difference(vendorsSelected, circle.vendors);
  });

  return { selectedCircles, selectedVendorIds };
}
