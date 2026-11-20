/* Shared by the app and the audio build script so both compute the same file name for a given sentence. */
export const clean = s => String(s).replace(/<[^>]+>/g, '').replace(/[\u{1F000}-\u{1FFFF}☀-➿️]/gu, '').replace(/[«»“”]/g, '').replace(/\s+/g, ' ').trim();

export const hash = s => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
};
