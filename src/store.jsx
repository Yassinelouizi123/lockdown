import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { tr, pick as pickL } from './lib/i18n.js';
import { Sfx, Voice } from './lib/audio.js';
import { ORDER } from './lib/games.js';

const KEY = 'lockdown.v2';
const INIT = { lang: 'fr', sound: true, voice: false, team: '', best: {}, reflex: 0, lb: [] };
const load = () => { try { return { ...INIT, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return INIT; } };

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [s, setS] = useState(load);
  const [notice, setNotice] = useState(false);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ } }, [s]);
  useEffect(() => { document.documentElement.lang = s.lang; document.documentElement.dir = s.lang === 'ar' ? 'rtl' : 'ltr'; }, [s.lang]);
  useEffect(() => { Sfx.setOn(s.sound); }, [s.sound]);
  useEffect(() => { Voice.setOn(s.voice); }, [s.voice]);

  const t = useCallback((k, v) => tr(s.lang, k, v), [s.lang]);
  const pick = useCallback(o => pickL(s.lang, o), [s.lang]);
  const say = useCallback((text, force) => {
    Voice.say(text, s.lang, force).then(ok => { if (!ok) setNotice(true); });
  }, [s.lang, s.voice]);

  const api = useMemo(() => {
    const total = ORDER.reduce((a, id) => a + (s.best[id] || 0), 0);
    return {
      ...s, t, pick, say, total,
      rank: (p => p >= 85 ? 3 : p >= 65 ? 2 : p >= 35 ? 1 : 0)(total / 5),
      setLang: lang => setS(x => ({ ...x, lang })),
      toggleSound: () => setS(x => ({ ...x, sound: !x.sound })),
      toggleVoice: () => setS(x => ({ ...x, voice: !x.voice })),
      notice, clearNotice: () => setNotice(false),
      setTeam: team => setS(x => ({ ...x, team })),
      record: (id, points, counts = true) => {
        const prev = counts ? (s.best[id] || 0) : s.reflex;
        const isBest = points > prev;
        if (isBest) setS(x => counts ? { ...x, best: { ...x.best, [id]: points } } : { ...x, reflex: points });
        return isBest;
      },
      saveLb: () => setS(x => {
        const tot = ORDER.reduce((a, id) => a + (x.best[id] || 0), 0), n = x.team || '—';
        return { ...x, lb: [...x.lb.filter(e => e.n !== n), { n, s: tot }].sort((a, b) => b.s - a.s).slice(0, 10) };
      }),
      reset: () => setS(x => ({ ...x, best: {}, reflex: 0, lb: [] }))
    };
  }, [s, t, pick, say, notice]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
