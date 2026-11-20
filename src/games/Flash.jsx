import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, X as XI, ArrowCounterClockwise } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { Sfx } from '../lib/audio.js';
import { shuffle } from '../lib/hooks.js';
import { GameShell, Chip } from '../components/GameShell.jsx';
import { CARDS } from './data/flash.js';

const LCOL = { S: '#b6a8ff', A: '#c8ff00', F: '#ff9ec7', E: '#7be7ff' };

export default function Flash({ onExit, onReflex }) {
  const { t, pick, say } = useApp();
  const deck = useMemo(() => shuffle(CARDS), []);
  const [i, setI] = useState(0), [flip, setFlip] = useState(false), [known, setKnown] = useState(0);
  const done = i >= deck.length, c = deck[i];

  const turn = () => { Sfx.tap(); if (!flip) say(pick(c.a)); setFlip(!flip); };
  const next = ok => { Sfx.tap(); if (ok) setKnown(k => k + 1); setFlip(false); setI(i + 1); };

  return (
    <GameShell id="swipe" title={t('ui3.flash')} onExit={onExit} progress={i / deck.length * 100} chips={!done && <Chip>{i + 1}/{deck.length}</Chip>}>
      {done ? (
        <div className="text-center">
          <div className="font-display text-8xl font-extrabold leading-none">{known}<span className="text-4xl opacity-50">/{deck.length}</span></div>
          <p className="mt-4 text-xl font-bold">{t('ui3.fdone')} · {t('ui3.fk', { n: known })}</p>
          <div className="mx-auto mt-8 grid max-w-sm gap-3">
            <button onClick={onReflex} className="cta">{t('ui3.fgo')} <ArrowRight size={20} weight="bold" className="rtl-flip" /></button>
            <button onClick={() => { setI(0); setKnown(0); setFlip(false); }} className="cta alt"><ArrowCounterClockwise size={18} weight="bold" />{t('ui.retry')}</button>
          </div>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.button key={i} onClick={turn} initial={{ opacity: 0, x: 40, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -40 }}
              className="block h-80 w-full [perspective:1200px]" aria-label={t('ui3.flip')}>
              <motion.div animate={{ rotateY: flip ? 180 : 0 }} transition={{ duration: .5, type: 'spring', stiffness: 160, damping: 18 }} className="relative size-full [transform-style:preserve-3d]">
                <div className="absolute inset-0 flex flex-col rounded-3xl border-2 border-ink bg-white p-7 text-start shadow-hard [backface-visibility:hidden]">
                  <span className="grid size-14 place-items-center rounded-xl border-2 border-ink font-display text-3xl font-extrabold" style={{ background: LCOL[c.l] }}>{c.l}</span>
                  <p dir="auto" className="mt-auto font-display text-3xl font-extrabold leading-tight">{pick(c.q)}</p>
                  <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest opacity-50">{t('ui3.flip')}</p>
                </div>
                <div className="absolute inset-0 flex flex-col rounded-3xl border-2 border-ink p-7 text-start shadow-hard [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ background: LCOL[c.l] }}>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest">{t('safe.' + c.l)}</span>
                  <p dir="auto" className="mt-auto font-display text-3xl font-extrabold leading-tight">{pick(c.a)}</p>
                </div>
              </motion.div>
            </motion.button>
          </AnimatePresence>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button onClick={() => next(false)} className="cta red"><XI size={20} weight="bold" />{t('ui3.again')}</button>
            <button onClick={() => next(true)} className="cta green"><Check size={20} weight="bold" />{t('ui3.know')}</button>
          </div>
        </>
      )}
    </GameShell>
  );
}
