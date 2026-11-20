/* Tiny i18n: FR / EN / AR. Strings are registered per prefix with add(). */
const dict = { fr: {}, en: {}, ar: {} };
export const add = (prefix, tr) => {
  for (const l in tr) for (const k in tr[l]) dict[l][prefix + '.' + k] = tr[l][k];
};
export const tr = (lang, key, vars) => {
  let s = dict[lang]?.[key] ?? dict.fr[key] ?? key;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
};
export const pick = (lang, o) => o[lang] ?? o.fr;
