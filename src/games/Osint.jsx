import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChatCircle, Globe, Heart, Timer, Warning } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { Sfx } from '../lib/audio.js';
import { shuffle, useCountdown } from '../lib/hooks.js';
import { GameShell, Chip, Feedback } from '../components/GameShell.jsx';
import Avatar from '../components/Avatar.jsx';
import { P, leaks } from './data/osint.js';

const TOTAL = P.reduce((n, p) => n + leaks(p).length, 0);

function wordlist(p) {
  const toks = leaks(p).map(x => x.tok), out = [], cap = s => s[0].toUpperCase() + s.slice(1);
  toks.forEach(a => { out.push(a, a.toLowerCase(), a + '123', a + '!'); toks.forEach(b => { if (a !== b) out.push(a + b, cap(a.toLowerCase()) + b + '!', a + '_' + b); }); });
  return [...shuffle([...new Set(out)].filter(x => x !== p.pw)).slice(0, 34), p.pw];
}

function Reveal({ p, last, onNext }) {
  const { t } = useApp(), list = useMemo(() => wordlist(p), [p]);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (k >= list.length) { Sfx.alarm(); return; }
    const id = setTimeout(() => { setK(k + 1); Sfx.tick(); }, 70); return () => clearTimeout(id);
  }, [k]); // eslint-disable-line
  const shown = list.slice(0, k).slice(-9), done = k >= list.length;
  return (
    <div>
      <p className="text-xl leading-snug">{t('osint.wl')}</p>
      <div dir="ltr" className="mockup-code mt-5 h-64 w-full overflow-hidden">
        {shown.map((w, j) => (w === p.pw && done)
          ? <pre key={w} data-prefix=">" className="bg-primary text-primary-content"><code>{w}   ✔ {t('osint.cracked')}</code></pre>
          : <pre key={w + j} data-prefix=">" className="opacity-75"><code>{w}</code></pre>)}
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full bg-ink" style={{ width: k / list.length * 100 + '%' }} /></div>
      <div className="mt-3 font-mono text-sm font-bold">{t('crack.tries')} : {(k * 37).toLocaleString()}</div>
      {done && <Feedback ok={false} title={`${p.pw} — ${t('osint.in', { t: '0,4 s' })}`} label={last ? t('ui.finish') : t('ui.next')} onNext={onNext}>{t('osint.sum')}</Feedback>}
    </div>
  );
}

export default function Osint({ onExit, onFinish }) {
  const { t, pick } = useApp();
  const [pi, setPi] = useState(0), [phase, setPhase] = useState('hunt'), [got, setGot] = useState([]), [bad, setBad] = useState(null);
  const [found, setFound] = useState(0), [wrong, setWrong] = useState(0);
  const p = P[pi], L = leaks(p), who = p.name.toLowerCase();
  const left = useCountdown(40, { key: pi, active: phase === 'hunt', onEnd: () => setPhase('review') });
  useEffect(() => { if (phase === 'hunt' && got.length === L.length) setPhase('review'); }, [got]); // eslint-disable-line

  const tap = idx => {
    if (phase !== 'hunt' || got.includes(idx)) return;
    if (p.posts[idx].k) { setGot(g => g.includes(idx) ? g : [...g, idx]); setFound(f => f + 1); Sfx.ok(); }
    else { setWrong(w => w + 1); setBad(idx); Sfx.bad(); setTimeout(() => setBad(null), 500); }
  };
  const next = () => {
    if (pi === P.length - 1) {
      const pts = Math.max(0, found / TOTAL * 100 - wrong * 6);
      onFinish(pts, { detail: <>{t('osint.dFound', { n: found, m: TOTAL })} · {t('osint.dErr', { n: wrong })}</>, learn: t('osint.learn') });
    } else { setPi(pi + 1); setGot([]); setPhase('hunt'); }
  };

  return (
    <GameShell id="osint" onExit={onExit}
      chips={phase === 'hunt' ? <><Chip tone={left < 10 ? 'text-error' : ''}><Timer size={16} weight="bold" />0:{String(Math.ceil(left)).padStart(2, '0')}</Chip><Chip>{got.length}/{L.length}</Chip></> : null}>
      {phase === 'reveal' ? <Reveal key={pi} p={p} last={pi === P.length - 1} onNext={next} /> : (
        <div>
          <p className="text-lg leading-snug">{t('osint.intro')}</p>
          <div className="mt-6 overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-hard">
            <div className="relative h-24 border-b-2 border-ink" style={{ background: 'radial-gradient(rgba(20,17,15,.18) 1.5px, transparent 1.5px) 0 0/14px 14px, #ff9ec7' }}>
              <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full border-2 border-ink bg-white px-2.5 py-0.5 font-mono text-[11px] font-extrabold"><Globe size={13} weight="bold" />{t('osint.pub')}</span>
            </div>
            <div className="flex gap-4 px-5">
              <Avatar name={who} size={84} className="relative z-10 -mt-11 self-start !border-4 !border-white ring-2 ring-ink" />
              <div className="pt-3"><div className="font-display text-2xl font-extrabold leading-none">{p.name}</div><div className="mt-1 font-mono text-xs opacity-60" dir="ltr">{p.handle}</div></div>
            </div>
            <p className="px-5 pb-4 pt-3 text-[15px] leading-snug opacity-80">{pick(p.bio)}</p>
            {p.posts.map((x, idx) => {
              const isGot = got.includes(idx), isMiss = phase === 'review' && x.k && !isGot;
              return (
                <button key={idx} onClick={() => tap(idx)} dir="auto"
                  className={`flex w-full gap-3 border-t-2 border-ink/15 px-5 py-4 text-start transition ${isGot ? 'bg-[#effbd2]' : isMiss ? 'bg-[#fff1cc]' : bad === idx ? 'animate-pulse bg-[#ffd9de]' : 'hover:bg-lime/25'}`}>
                  <Avatar name={who} size={36} className="mt-0.5 self-start !border" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs"><b>{p.name}</b><span className="opacity-50" dir="ltr">{p.handle} · {idx * 3 + 1}h</span></div>
                    <p className="mt-1 text-[15px] leading-snug">{pick(x.x)}</p>
                    {(isGot || isMiss)
                      ? <span className={`mt-2.5 inline-flex items-center gap-1.5 rounded-md border-2 border-ink px-2 py-0.5 font-mono text-[11px] font-extrabold ${isGot ? 'bg-lime' : 'bg-[#ffc15e]'}`}><Warning size={13} weight="fill" />{isMiss ? t('osint.miss') + ' · ' : ''}{t('osint.k' + x.k)} : {x.tok}</span>
                      : <div className="mt-2.5 flex gap-5 text-xs opacity-45"><span className="inline-flex items-center gap-1"><Heart size={15} weight="bold" />{(idx * 7 + 12) % 41}</span><span className="inline-flex items-center gap-1"><ChatCircle size={15} weight="bold" />{(idx * 3 + 2) % 9}</span></div>}
                  </div>
                </button>
              );
            })}
          </div>
          {phase === 'review' && <button onClick={() => { Sfx.tap(); setPhase('reveal'); }} className="cta mt-7 w-full">{t('osint.go')} <ArrowRight size={20} weight="bold" className="rtl-flip" /></button>}
        </div>
      )}
    </GameShell>
  );
}
