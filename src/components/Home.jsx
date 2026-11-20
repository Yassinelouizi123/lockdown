import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cards, Clock, Star, Trophy } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { Engine } from '../lib/engine.js';
import { META, ORDER, starsOf } from '../lib/games.js';
import Avatar from './Avatar.jsx';

const SAMPLES = ['123456', 'P@ssw0rd', 'Maroc2024!', 'kT8$wQz!2mNpR4', 'tango-lune-ciel-pont-vert'];

function HeroDemo() {
  const { t } = useApp();
  const [i, setI] = useState(0), [n, setN] = useState(0);
  useEffect(() => {
    const s = SAMPLES[i];
    const id = setTimeout(() => { if (n < s.length) setN(n + 1); else { setN(0); setI((i + 1) % SAMPLES.length); } }, n < s.length ? 85 : 1900);
    return () => clearTimeout(id);
  }, [i, n]);
  const pw = SAMPLES[i].slice(0, n), a = Engine.analyze(pw), L = Engine.level(a.bits), col = Engine.COLORS[L];
  return (
    <div className="rounded-2xl border-2 border-ink bg-ink p-5 text-paper shadow-[6px_6px_0_#c8ff00]">
      <div dir="ltr" className="min-h-[2.5rem] break-all font-mono text-2xl"><span>{pw}</span><span className="ms-0.5 inline-block h-6 w-[3px] translate-y-1 animate-pulse bg-lime" /></div>
      <div className="mt-4 flex gap-1.5">{[0, 1, 2, 3, 4].map(k => <i key={k} className="h-2 flex-1 rounded-full bg-white/15 transition-colors duration-300" style={{ background: pw && k <= L ? col : undefined }} />)}</div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="font-display text-2xl font-extrabold" style={{ color: pw ? col : undefined }}>{pw ? Engine.fmt(a.sec, t) : '…'}</span>
        <span className="font-mono text-[11px] uppercase tracking-widest opacity-50">{t('ui2.demo')}</span>
      </div>
    </div>
  );
}

function Tile({ id, i, onPlay, flash }) {
  const { t, best } = useApp(), M = flash ? { icon: Cards, mins: 2, color: '#ffffff' } : META[id], Icon = M.icon, st = starsOf(best[id] || 0);
  return (
    <motion.button onClick={() => onPlay(id)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }}
      className="press flex min-h-[148px] flex-col rounded-2xl border-2 border-ink p-4 text-start shadow-hard sm:min-h-[158px] lg:min-h-[200px] sm:p-5" style={{ background: M.color }}>
      <div className="flex items-start justify-between"><Icon size={46} weight="duotone" /><span className="font-mono text-xs font-extrabold">{flash ? '★' : '0' + (i + 1)}</span></div>
      <h3 className="mt-auto font-display text-xl font-extrabold leading-none sm:text-2xl">{flash ? t('ui3.flash') : t(id + '.name')}</h3>
      <p className="mt-1.5 hidden text-sm leading-snug sm:block">{flash ? t('ui3.flashb') : t(id + '.blurb')}</p>
      <div className="mt-3 flex items-center gap-3 border-t-2 border-ink pt-2 font-mono text-[11px] font-bold">
        <span className="inline-flex items-center gap-1"><Clock size={13} weight="bold" />{t('ui.min', { n: M.mins })}</span>
        {!flash && <span className="ms-auto flex">{[0, 1, 2].map(k => <Star key={k} size={16} weight={k < st ? 'fill' : 'bold'} className={k < st ? '' : 'opacity-40'} />)}</span>}
        {flash && <ArrowRight size={16} weight="bold" className="rtl-flip ms-auto" />}
      </div>
    </motion.button>
  );
}

export default function Home({ onPlay, onScores }) {
  const a = useApp(), { t } = a;
  const [h1a, h1b] = t('ui.side1').split('\n');
  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[.8fr_1.35fr] lg:items-center lg:gap-14 lg:py-8">
      <section>
        <p className="font-mono text-xs font-bold uppercase tracking-widest">{t('ui.tag')}</p>
        <h1 className="mt-3 font-display text-[clamp(2.3rem,6.2vw,4.6rem)] font-extrabold leading-[.95] tracking-tight">{h1a}<br /><span className="marker">{h1b}</span></h1>
        <p className="mt-4 max-w-md text-lg leading-snug">{t('ui3.short')}</p>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex">{['sara', 'lina', 'omar', 'nour'].map((n, k) => <Avatar key={n} name={n} size={38} className={k ? '-ms-2.5' : ''} />)}</div>
          <span className="max-w-[14rem] text-xs font-semibold leading-snug">{t('ui2.meta')}</span>
        </div>
        <div className="mt-7 hidden lg:block"><HeroDemo /></div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {ORDER.map((id, i) => <Tile key={id} id={id} i={i} onPlay={onPlay} />)}
        <Tile id="flash" i={5} onPlay={onPlay} flash />
        <motion.button onClick={onScores} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}
          className="press col-span-2 flex items-center gap-4 lg:col-span-3 rounded-2xl border-2 border-ink bg-ink px-5 py-4 text-start text-paper shadow-[4px_4px_0_#c8ff00]">
          <Trophy size={40} weight="duotone" className="text-lime" />
          <div className="min-w-0 flex-1"><div className="font-display text-xl font-extrabold leading-tight">{t('ui3.scores')}</div><div className="truncate text-sm opacity-70">{t('ui.r' + a.rank)}</div></div>
          <div className="font-display text-3xl font-extrabold text-lime">{a.total}<span className="text-base opacity-60"> {t('ui2.of')}</span></div>
          <ArrowRight size={20} weight="bold" className="rtl-flip" />
        </motion.button>
      </section>
    </main>
  );
}
