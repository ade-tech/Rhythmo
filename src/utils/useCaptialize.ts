export function Capitalize(text: string): string {
  const firstLetter = text.slice(0, 1);
  const rest = text.slice(1, text.length);

  const joinedLetter = `${firstLetter.toUpperCase()}${rest.toLowerCase()}`;
  return joinedLetter;
}
