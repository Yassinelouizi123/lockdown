import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '../store.jsx';
import { Sfx } from '../lib/audio.js';
import { shuffle, useCountdown } from '../lib/hooks.js';
import { GameShell, Chip, Feedback } from '../components/GameShell.jsx';
import { RQ } from './data/reflex.js';

const LCOL = { S: '#b6a8ff', A: '#c8ff00', F: '#ff9ec7', E: '#7be7ff' };

export default function Reflex({ onExit, onFinish }) {
  const { t, pick, say } = useApp();
  const deck = useMemo(() => shuffle(RQ), []);
  const [i, setI] = useState(0), [correct, setCorrect] = useState(0), [ans, setAns] = useState(undefined);
  const q = deck[i];
  const answer = useCallback(l => {
    if (ans !== undefined) return;
    if (l === q.a) { setCorrect(c => c + 1); Sfx.ok(); } else Sfx.bad();
    setAns(l);
  }, [ans, q]);
  const left = useCountdown(8, { key: i, active: ans === undefined, onEnd: () => answer(null) });
  useEffect(() => { say(pick(q.s)); }, [i]); // eslint-disable-line
  const ok = ans === q.a;
  const next = () => {
    Sfx.tap();
    if (i + 1 >= deck.length) onFinish(correct / deck.length * 100, { detail: t('reflex.dOk', { n: correct }), learn: t('reflex.learn') });
    else { setI(i + 1); setAns(undefined); }
  };
  return (
    <GameShell id="swipe" title={t('reflex.name')} onExit={onExit} progress={(i + (ans !== undefined ? 1 : 0)) / deck.length * 100} chips={<Chip>{i + 1}/{deck.length}</Chip>}>
      <div className="h-2.5 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full transition-[width] duration-100" style={{ width: left / 8 * 100 + '%', background: left < 2.5 ? '#e5384b' : '#14110f' }} /></div>
      <p className="mt-6 text-center font-mono text-xs font-bold uppercase tracking-widest opacity-60">{t('reflex.q')}</p>
      <p dir="auto" className="grid min-h-36 place-items-center py-5 text-center font-display text-3xl font-extrabold leading-tight">{pick(q.s)}</p>
      <div className="grid grid-cols-2 gap-3">
        {['S', 'A', 'F', 'E'].map(l => {
          const show = ans !== undefined, good = show && l === q.a, wrong = show && l === ans && l !== q.a;
          return (
            <button key={l} onClick={() => answer(l)} disabled={show}
              className={`press flex flex-col items-center gap-1 rounded-2xl border-2 border-ink px-2 py-5 shadow-hard transition ${show && !good && !wrong ? 'opacity-30' : ''} ${wrong ? '!bg-[#ffb3bb]' : ''}`} style={{ background: wrong ? undefined : LCOL[l] }}>
              <b className="font-display text-5xl font-extrabold leading-none">{l}</b><span className="text-sm font-bold">{t('safe.' + l)}</span></button>
          );
        })}
      </div>
      {ans !== undefined && <Feedback ok={ok} title={ans === null ? t('reflex.late') : ok ? t('reflex.good') : t('reflex.bad')} label={i + 1 >= deck.length ? t('ui.finish') : t('ui.next')} onNext={next}><b>{q.a}</b> — {t('safe.' + q.a + 'd')}</Feedback>}
    </GameShell>
  );
}
