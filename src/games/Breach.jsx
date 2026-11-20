import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Key, PuzzlePiece, ShieldCheck, Siren } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { Engine } from '../lib/engine.js';
import { Sfx } from '../lib/audio.js';
import { shuffle } from '../lib/hooks.js';
import { GameShell, Chip, Feedback } from '../components/GameShell.jsx';
import { S } from './data/breach.js';

const BADGES = [[Key, 'b1'], [PuzzlePiece, 'b2'], [ShieldCheck, 'b3']];
const strip = s => s.replace(/^\S+\s/, '');

export default function Breach({ onExit, onFinish }) {
  const { t, pick, say } = useApp();
  const [i, setI] = useState(-1), [score, setScore] = useState(0), [badges, setBadges] = useState([false, false, false]), [sel, setSel] = useState(null);
  const safety = Math.round(20 + score * .8), col = Engine.COLORS[Engine.level(safety / 100 * 85)];
  const s = S[i];
  const opts = useMemo(() => s ? shuffle(s.o.map((o, k) => ({ o, k }))) : [], [i]); // eslint-disable-line

  useEffect(() => {
    if (i === -1) { Sfx.alarm(); say(t('breach.story')); }
    else if (s) say((s.sms ? pick(s.sms) + '. ' : '') + pick(s.q));
  }, [i]); // eslint-disable-line

  const choose = k => {
    if (sel !== null) return;
    const o = s.o[k], tone = o.p >= 25 ? 'ok' : o.p > 0 ? 'mid' : 'no';
    setSel(k); setScore(x => x + o.p);
    if (tone === 'ok' && s.badge) setBadges(b => b.map((v, j) => j === s.badge - 1 ? true : v));
    tone === 'no' ? Sfx.bad() : Sfx.ok(); say(pick(o.e));
  };
  const last = i === S.length - 1;
  const next = () => {
    Sfx.tap();
    if (last) onFinish(score, { detail: t('breach.dScore', { n: safety }), learn: t('breach.learn') });
    else { setI(i + 1); setSel(null); }
  };
  const chosen = sel !== null ? s.o[sel] : null, tone = chosen ? (chosen.p >= 25 ? 'ok' : chosen.p > 0 ? 'mid' : 'no') : null;

  return (
    <GameShell id="breach" onExit={onExit} chips={i >= 0 && <Chip>{t('breach.step', { n: i + 1 })}</Chip>}>
      <div>
        <div className="flex items-baseline justify-between"><span className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-60">{t('breach.gauge')}</span><b className="font-display text-3xl font-extrabold" style={{ color: col }}>{safety}%</b></div>
        <div className="mt-2 h-4 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full transition-all duration-700" style={{ width: safety + '%', background: col }} /></div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm font-bold">{BADGES.map(([Ic, k], j) => (
          <span key={k} className={`inline-flex items-center gap-1.5 transition ${badges[j] ? 'text-success' : 'opacity-40'}`}><Ic size={18} weight={badges[j] ? 'fill' : 'bold'} />{strip(t('breach.' + k))}</span>))}</div>
      </div>

      <div className="mt-9">
        {i === -1 ? (
          <div>
            <Siren size={56} weight="duotone" className="text-error" />
            <p className="mt-3 font-display text-2xl font-extrabold leading-snug">{t('breach.story').replace('🚨 ', '')}</p>
            <button onClick={() => { Sfx.tap(); setI(0); }} className="cta mt-8 w-full">{t('ui.next')} <ArrowRight size={20} weight="bold" className="rtl-flip" /></button>
          </div>
        ) : (
          <div>
            {s.sms && <div className="chat chat-start mb-4"><div className="chat-header mb-1 font-mono text-xs opacity-60">SecuTeam · SMS</div><div className="chat-bubble border-2 border-ink bg-white text-ink" dir="auto">{pick(s.sms)}</div></div>}
            <h3 className="font-display text-2xl font-extrabold leading-snug">{pick(s.q)}</h3>
            <div className="mt-5 grid gap-3">{opts.map(({ o, k }) => {
              const isSel = sel === k, isBest = sel !== null && o.p >= 25, dim = sel !== null && !isSel && !isBest;
              return <button key={k} onClick={() => choose(k)} disabled={sel !== null}
                className={`rounded-xl border-2 border-ink px-4 py-4 text-start text-[15px] font-semibold leading-snug transition ${isBest ? 'bg-[#a8f0c4] shadow-hard-sm' : isSel ? (tone === 'mid' ? 'bg-[#ffe3a3]' : 'bg-[#ffb3bb]') : 'bg-white hover:bg-lime/40'} ${dim ? 'opacity-35' : ''}`}>{pick(o.x)}</button>;
            })}</div>
            {chosen && <Feedback ok={tone === 'ok'} title={t('breach.' + tone)} label={last ? t('ui.finish') : t('ui.next')} onNext={next}>{pick(chosen.e)}</Feedback>}
          </div>
        )}
      </div>
    </GameShell>
  );
}
