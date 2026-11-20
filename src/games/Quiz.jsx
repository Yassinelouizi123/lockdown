import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Fire, SpeakerHigh, Timer, X } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { Sfx } from '../lib/audio.js';
import { shuffle, useCountdown } from '../lib/hooks.js';
import { GameShell, Chip, Feedback } from '../components/GameShell.jsx';
import { Q } from './data/quiz.js';

export default function Quiz({ onExit, onFinish }) {
  const { t, pick, say } = useApp();
  const deck = useMemo(() => shuffle(Q), []);
  const [i, setI] = useState(0), [correct, setCorrect] = useState(0), [streak, setStreak] = useState(0), [best, setBest] = useState(0), [ans, setAns] = useState(undefined);
  const q = deck[i];

  const answer = useCallback(v => {
    if (ans !== undefined) return;
    const ok = v === q.a;
    if (ok) { setCorrect(c => c + 1); setStreak(s => s + 1); setBest(b => Math.max(b, streak + 1)); Sfx.ok(); } else { setStreak(0); Sfx.bad(); }
    setAns(v); say(pick(q.e));
  }, [ans, q, streak, pick, say]);

  const left = useCountdown(10, { key: i, active: ans === undefined, onEnd: () => answer(null) });
  useEffect(() => { say(pick(q.s)); }, [i]); // eslint-disable-line
  useEffect(() => { if (ans === undefined && left < 3.1 && left > 0 && Math.abs(left - Math.round(left)) < .06) Sfx.tick(); }, [left]); // eslint-disable-line

  const ok = ans === q.a;
  const next = () => {
    Sfx.tap();
    if (i + 1 >= deck.length) onFinish(correct / deck.length * 100, { detail: <>{t('quiz.dOk', { n: correct })} · {t('quiz.dStreak', { n: best })}</>, learn: t('quiz.learn') });
    else { setI(i + 1); setAns(undefined); }
  };

  return (
    <GameShell id="quiz" onExit={onExit} progress={(i + (ans !== undefined ? 1 : 0)) / deck.length * 100}
      chips={<><Chip>{i + 1}/{deck.length}</Chip><Chip><Fire size={16} weight="fill" />{streak}</Chip></>}>
      <div className="flex items-center gap-3"><Timer size={20} weight="bold" />
        <div className="h-2.5 flex-1 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full transition-[width] duration-100" style={{ width: left * 10 + '%', background: left < 3.5 ? '#e5384b' : '#14110f' }} /></div>
        <b className="w-6 font-mono">{Math.ceil(left)}</b></div>
      <p dir="auto" className="grid min-h-48 place-items-center py-8 text-center font-display text-3xl font-extrabold leading-tight">{pick(q.s)}</p>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => answer(true)} disabled={ans !== undefined} className={`cta green py-5 text-lg ${ans !== undefined && !q.a ? '!opacity-30' : ''}`}><Check size={24} weight="bold" />{t('quiz.t')}</button>
        <button onClick={() => answer(false)} disabled={ans !== undefined} className={`cta red py-5 text-lg ${ans !== undefined && q.a ? '!opacity-30' : ''}`}><X size={24} weight="bold" />{t('quiz.f')}</button>
      </div>
      <button onClick={() => say(pick(q.s), true)} className="mx-auto mt-5 flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-4"><SpeakerHigh size={18} weight="bold" />{t('quiz.listen')}</button>
      {ans !== undefined && <Feedback ok={ok} title={ans === null ? t('quiz.late') : ok ? t('quiz.good') : t('quiz.bad')} label={i + 1 >= deck.length ? t('ui.finish') : t('ui.next')} onNext={next}>{pick(q.e)}</Feedback>}
    </GameShell>
  );
}
