/**
 * @file src/utils/TimeDifference.ts
 * @description Provides functions to calculate and format the difference between two dates/times.
 *
 * Usage:
 * - Used throughout the app to display relative time (e.g., "2 hours ago").
 */

/**
 * Calculates the difference in years between the given date string and the current date.
 *
 * @param {string} dateString - The date string to compare.
 * @returns {number} The difference in years.
 */
export function getTimeDifference(dateString: string): number {
  const date = new Date(dateString).getTime();
  const today = Date.now();
  const dateDiffrence = today - date;

  const seconds = Math.floor(dateDiffrence / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const year = Math.floor(days / 365);

  return year;
}
