import { useCallback, useEffect, useMemo, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { CaretLeft, CaretRight, Fire, Timer } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { Engine } from '../lib/engine.js';
import { Sfx } from '../lib/audio.js';
import { sample, shuffle, useCountdown } from '../lib/hooks.js';
import { GameShell, Chip } from '../components/GameShell.jsx';
import { WEAK, STRONG, isStrong } from './data/swipe.js';

const N = 12;

function Card({ pw, res, locked, onDecide }) {
  const { t } = useApp();
  const x = useMotionValue(0), y = useMotionValue(0), op = useMotionValue(1);
  const rot = useTransform(x, [-220, 220], [-12, 12]);
  const weakOp = useTransform(x, [-120, -30], [1, 0]), strongOp = useTransform(x, [30, 120], [0, 1]);
  useEffect(() => {
    if (!res) return;
    const dir = res.choice === 'strong' ? 1 : res.choice === 'weak' ? -1 : 0;
    if (dir) animate(x, dir * 520, { duration: .35 }); else animate(y, 220, { duration: .35 });
    animate(op, 0, { duration: .35 });
  }, [res]); // eslint-disable-line
  return (
    <motion.div drag={locked ? false : 'x'} dragSnapToOrigin dragElastic={.8} style={{ x, y, rotate: rot, opacity: op }}
      onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 100) onDecide(info.offset.x > 0 ? 'strong' : 'weak'); }}
      className="absolute inset-0 grid cursor-grab touch-none select-none place-items-center rounded-3xl border-2 border-ink bg-white p-6 shadow-hard active:cursor-grabbing">
      <motion.span style={{ opacity: weakOp }} className="absolute start-5 top-5 -rotate-12 rounded-md border-[3px] border-error px-3 py-0.5 font-mono text-sm font-extrabold tracking-widest text-error">{t('swipe.tagw')}</motion.span>
      <motion.span style={{ opacity: strongOp }} className="absolute end-5 top-5 rotate-12 rounded-md border-[3px] border-success px-3 py-0.5 font-mono text-sm font-extrabold tracking-widest text-success">{t('swipe.tags')}</motion.span>
      <div dir="ltr" className="break-all text-center font-mono text-2xl font-bold sm:text-3xl">{pw}</div>
    </motion.div>
  );
}

export default function Swipe({ onExit, onFinish }) {
  const { t } = useApp();
  const deck = useMemo(() => shuffle([...sample(WEAK, 6), ...sample(STRONG, 6)]), []);
  const [i, setI] = useState(0), [correct, setCorrect] = useState(0), [streak, setStreak] = useState(0), [best, setBest] = useState(0), [res, setRes] = useState(null);

  const decide = useCallback(choice => {
    if (res) return;
    const pw = deck[i], a = Engine.analyze(pw), strong = isStrong(pw), ok = choice === (strong ? 'strong' : 'weak');
    const c = correct + (ok ? 1 : 0), s = ok ? streak + 1 : 0, b = Math.max(best, s);
    ok ? Sfx.ok() : Sfx.bad();
    setCorrect(c); setStreak(s); setBest(b); setRes({ choice, ok, a, strong, c, b });
  }, [res, deck, i, correct, streak, best]);

  const left = useCountdown(7, { key: i, active: !res, onEnd: () => decide('none') });
  useEffect(() => {
    if (!res) return;
    const id = setTimeout(() => {
      if (i + 1 >= N) onFinish(res.c / N * 100, { detail: <>{t('swipe.dOk', { n: res.c })} · {t('swipe.dStreak', { n: res.b })}</>, learn: t('swipe.learn') });
      else { setI(i + 1); setRes(null); }
    }, 2100);
    return () => clearTimeout(id);
  }, [res]); // eslint-disable-line
  useEffect(() => {
    const f = e => { if (e.key === 'ArrowLeft') decide('weak'); if (e.key === 'ArrowRight') decide('strong'); };
    window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f);
  }, [decide]);

  const reason = res && (res.strong ? t('ok.' + (res.a.passphrase ? 'pass' : 'rand')) : res.a.flags[0] ? Engine.flagText(res.a.flags[0], t) : '');
  return (
    <GameShell id="swipe" onExit={onExit} progress={(i + (res ? 1 : 0)) / N * 100}
      chips={<><Chip>{i + 1}/{N}</Chip><Chip><Fire size={16} weight="fill" />{streak}</Chip></>}>
      <p className="mb-6 text-lg leading-snug">{t('swipe.intro')}</p>
      <div className="relative h-56 sm:h-60"><Card key={i} pw={deck[i]} res={res} locked={!!res} onDecide={decide} /></div>
      <div className="mt-7 flex items-center gap-3"><Timer size={20} weight="bold" />
        <div className="h-2.5 flex-1 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full transition-[width] duration-100" style={{ width: left / 7 * 100 + '%', background: left < 2.5 ? '#e5384b' : '#14110f' }} /></div></div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={() => decide('weak')} className="cta red py-4"><CaretLeft size={20} weight="bold" className="rtl-flip" />{t('swipe.weak').replace('← ', '')}</button>
        <button onClick={() => decide('strong')} className="cta green py-4">{t('swipe.strong').replace(' →', '')}<CaretRight size={20} weight="bold" className="rtl-flip" /></button>
      </div>
      <div className="mt-6 min-h-24">
        {res && <div className={`border-s-4 ps-4 ${res.ok ? 'border-success' : 'border-error'}`}>
          <div className="font-display text-xl font-extrabold">{res.choice === 'none' ? t('swipe.late') : res.ok ? t('swipe.good') : t('swipe.badt')}</div>
          <div className="mt-0.5">{t('swipe.crack')} <b>{Engine.fmt(res.a.sec, t)}</b></div><div className="opacity-70">{reason}</div></div>}
      </div>
    </GameShell>
  );
}
