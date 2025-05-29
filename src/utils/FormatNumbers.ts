/**
 * @file src/utils/FormatNumbers.ts
 * @description Provides functions to format numbers for display (e.g., abbreviating large numbers).
 *
 * Usage:
 * - Used throughout the app to display user-friendly numbers (followers, plays, etc.).
 */

/**
 * Formats a number for display, abbreviating large numbers (e.g., 1.2K, 3.4M).
 *
 * @param {string | number} entry - The number or string to format.
 * @returns {string | number | undefined} The formatted number as a string, or the original number if small.
 */
export function formatNumbers(entry: string | number) {
  const number = +entry;
  if (number < 1000) return number;
  if (number > 1000 && number < 10000) return number.toLocaleString();
  if (number >= 10000 && number < 1000000) {
    const mainDigit = number / 1000;
    const remainder = number % 1000;
    return `${remainder > 0 ? mainDigit.toFixed(1) : mainDigit}K`;
  }
  if (number >= 1000000 && number < 1000000000) {
    const mainDigit = number / 1000000;
    const remainder = number % 1000;
    return `${remainder > 0 ? mainDigit.toFixed(1) : mainDigit}K`;
  }
}
