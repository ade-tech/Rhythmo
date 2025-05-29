/**
 * @file src/utils/Captialize.ts
 * @description Provides a function to capitalize the first letter of a string.
 *
 * Usage:
 * - Used throughout the app for formatting display text.
 */

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 *
 * @param {string} text - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function Capitalize(text: string): string {
  const firstLetter = text.slice(0, 1);
  const rest = text.slice(1, text.length);

  const joinedLetter = `${firstLetter.toUpperCase()}${rest.toLowerCase()}`;
  return joinedLetter;
}
