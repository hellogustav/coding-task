/**
 * @function isPositive
 * @param {number} value
 * @return {boolean} if value > 0
 */
export const isPositive = function isPositive(value) {
  return value > 0;
};

/**
 * @function isZero
 * @param {number} value
 * @return {boolean} if value === 0
 */
export const isZero = function isZero(value) {
  return value === 0;
};

/**
 * @function roundToNearestEvenNumber
 * @param {number} number to round
 * @return {number} number rounded to nearest even number
 */
export function roundToNearestEvenNumber(int) {
  return 2 * Math.round(int / 2);
}
