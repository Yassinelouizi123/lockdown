// Lists every sentence the app reads aloud, per language, as audio-manifest.json.
// Usage: node scripts/make-manifest.mjs   (then: python scripts/gen-audio.py)
import fs from 'node:fs';
import { tr } from '../src/lib/i18n.js';
import '../src/lib/strings.js';
import { Q } from '../src/games/data/quiz.js';
import { RQ } from '../src/games/data/reflex.js';
import { CARDS } from '../src/games/data/flash.js';
import { S } from '../src/games/data/breach.js';
import { clean, hash } from '../src/lib/hash.js';

const out = new Map();
for (const lang of ['fr', 'en', 'ar']) {
  const add = text => { const c = clean(text); out.set(lang + '/' + hash(c), { lang, hash: hash(c), text: c }); };
  const p = o => o[lang];
  Q.forEach(q => { add(p(q.s)); add(p(q.e)); });
  RQ.forEach(q => add(p(q.s)));
  CARDS.forEach(c => add(p(c.a)));
  add(tr(lang, 'breach.story'));
  S.forEach(s => { add((s.sms ? p(s.sms) + '. ' : '') + p(s.q)); s.o.forEach(o => add(p(o.e))); });
}
const list = [...out.values()];
fs.writeFileSync(new URL('./audio-manifest.json', import.meta.url), JSON.stringify(list, null, 1));
console.log(list.length, 'sentences', ['fr', 'en', 'ar'].map(l => l + ':' + list.filter(x => x.lang === l).length).join(' '));
