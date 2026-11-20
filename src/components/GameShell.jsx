import { motion } from 'framer-motion';
import { CheckCircle, XCircle, X } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { META } from '../lib/games.js';

export function GameShell({ id, title, onExit, progress, chips, children }) {
  const { t } = useApp(), M = META[id], Icon = M.icon;
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-8">
      <div className="flex items-center gap-3">
        <button onClick={onExit} className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-white transition hover:bg-lime" aria-label={t('ui2.quit')}><X size={18} weight="bold" /></button>
        <h1 className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 font-display text-lg font-extrabold shadow-hard-sm" style={{ background: M.color }}><Icon size={22} weight="duotone" />{title || t(id + '.name')}</h1>
        <div className="ms-auto flex items-center gap-4 font-mono text-sm font-extrabold">{chips}</div>
      </div>
      {progress != null && <div className="mt-5 h-3 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full bg-ink transition-all duration-500" style={{ width: progress + '%' }} /></div>}
      <div className="mt-9">{children}</div>
    </div>
  );
}

export const Chip = ({ children, tone = '' }) => <span className={`inline-flex items-center gap-1 ${tone}`}>{children}</span>;

export function Feedback({ ok, title, children, label, onNext }) {
  const Icon = ok ? CheckCircle : XCircle;
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl border-2 border-ink p-5 shadow-hard" style={{ background: ok ? '#a8f0c4' : '#ffb3bb' }}>
      <div className="flex items-center gap-2 font-display text-2xl font-extrabold"><Icon size={28} weight="fill" />{title}</div>
      <div className="mt-2 text-base leading-snug">{children}</div>
      <button onClick={onNext} className="cta ink mt-5 w-full">{label}</button>
    </motion.div>
  );
}
