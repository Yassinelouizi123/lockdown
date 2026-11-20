import { useState } from 'react';
import { ArrowCounterClockwise, FloppyDisk, Star, X } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { META, ORDER, starsOf } from '../lib/games.js';

export default function Scores({ onExit }) {
  const a = useApp(), { t } = a, [arm, setArm] = useState(false);
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-8">
      <div className="flex items-center gap-3">
        <button onClick={onExit} className="grid size-10 place-items-center rounded-full border-2 border-ink bg-white transition hover:bg-lime" aria-label={t('ui2.quit')}><X size={18} weight="bold" /></button>
        <h1 className="font-display text-3xl font-extrabold">{t('ui3.scores')}</h1>
      </div>
      <div className="mt-8 flex items-end gap-3"><span className="font-display text-8xl font-extrabold leading-[.85] tracking-tighter">{a.total}</span><span className="pb-2 font-display text-2xl font-extrabold opacity-60">{t('ui2.of')}</span></div>
      <p className="mt-3 text-xl"><span className="marker font-extrabold">{t('ui.r' + a.rank)}</span> — {t('ui.r' + a.rank + 'd')}</p>

      <ul className="mt-8 divide-y-2 divide-ink border-y-2 border-ink">
        {ORDER.map(id => { const b = a.best[id] || 0, M = META[id], st = starsOf(b); return (
          <li key={id} className="flex items-center gap-4 py-3.5">
            <M.icon size={28} weight="duotone" />
            <span className="w-28 shrink-0 font-semibold sm:w-36">{t(id + '.name')}</span>
            <div className="h-3.5 flex-1 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full" style={{ width: b + '%', background: M.color }} /></div>
            <span className="flex w-16 justify-end">{[0, 1, 2].map(k => <Star key={k} size={15} weight={k < st ? 'fill' : 'bold'} className={k < st ? '' : 'opacity-30'} />)}</span>
          </li>); })}
      </ul>

      <label className="mt-8 block">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-60">{t('ui.team')}</span>
        <input className="mt-1 w-full border-b-2 border-ink bg-transparent py-2 text-xl font-semibold outline-none placeholder:opacity-35 focus:border-b-4" maxLength={22} value={a.team} onChange={e => a.setTeam(e.target.value)} placeholder={t('ui.teamph')} />
      </label>
      <div className="mt-5 flex flex-wrap gap-3">
        <button disabled={!a.total} onClick={a.saveLb} className="cta"><FloppyDisk size={18} weight="bold" />{t('ui.save')}</button>
        <button onClick={() => { if (arm) { a.reset(); setArm(false); } else setArm(true); }} className="cta alt"><ArrowCounterClockwise size={18} weight="bold" />{arm ? t('ui.confirm') : t('ui.reset')}</button>
      </div>

      <h2 className="mt-12 font-display text-2xl font-extrabold">{t('ui.lb')}</h2>
      {a.lb.length ? (
        <ol className="mt-4 divide-y-2 divide-ink border-y-2 border-ink">{a.lb.map((e, i) => (
          <li key={e.n} className="flex items-center gap-5 py-3 text-lg"><span className="w-8 font-mono font-extrabold">{i + 1}</span><span className="font-semibold">{e.n}</span><span className="ms-auto font-mono font-extrabold">{e.s}</span></li>
        ))}</ol>
      ) : <p className="mt-4 border-y-2 border-ink py-6 text-center opacity-60">{t('ui2.lbS')}</p>}
    </div>
  );
}
