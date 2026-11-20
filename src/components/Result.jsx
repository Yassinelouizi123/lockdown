import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowCounterClockwise, House, Star } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { starsOf } from '../lib/games.js';

function useCount(to) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = performance.now(); let raf;
    const step = now => { const p = Math.min(1, (now - t0) / 900); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [to]);
  return v;
}

export default function Result({ points, isBest, detail, learn, onRetry, onNext, nextId, onHome }) {
  const { t } = useApp(), st = starsOf(points), n = useCount(points);
  return (
    <main className="mx-auto max-w-xl px-4 pb-24 pt-14">
      <div className="flex gap-2">{[0, 1, 2].map(k => (
        <motion.div key={k} initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: .3 + k * .15, type: 'spring', stiffness: 260 }}>
          <Star size={52} weight={k < st ? 'fill' : 'bold'} className={k < st ? '' : 'opacity-25'} /></motion.div>))}</div>
      <div className="relative mt-4 flex items-end gap-3">
        <span className="font-display text-[8.5rem] font-extrabold leading-[.85] tracking-tighter">{n}</span>
        <span className="pb-3 font-display text-2xl font-extrabold opacity-60">/100</span>
        {isBest && points > 0 && <span className="absolute -top-2 end-0 rotate-6 rounded-lg border-2 border-ink bg-lime px-3 py-1 font-mono text-xs font-extrabold uppercase shadow-hard-sm">{t('ui.newbest')}</span>}
      </div>
      {detail && <p className="mt-8 border-t-2 border-ink pt-5 font-mono text-sm font-bold leading-relaxed">{detail}</p>}
      {learn && <p className="mt-5 text-xl leading-snug"><span className="marker font-extrabold">{t('ui.learned')}</span> {learn}</p>}
      <div className="mt-10 grid gap-3">
        {onNext && <button onClick={onNext} className="cta py-4 text-lg">{t('ui.nextgame')} · {t(nextId + '.name')} <ArrowRight size={22} weight="bold" className="rtl-flip" /></button>}
        <button onClick={onRetry} className="cta alt"><ArrowCounterClockwise size={20} weight="bold" />{t('ui.retry')}</button>
        <button onClick={onHome} className="mx-auto mt-1 inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-4"><House size={18} weight="bold" />{t('ui.home')}</button>
      </div>
    </main>
  );
}
