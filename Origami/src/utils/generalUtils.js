/**
 * Takes a string and a number and trims the string if length is greater
 * than the number padding it with `...`
 *
 * @return {String} str String to trim and pad
 * @param  {Integer} n Maximum length the string can have
 */
export function trimAndPad(str, n) {
  return str.length > n ? `${str.slice(0, n)}...` : str;
}
