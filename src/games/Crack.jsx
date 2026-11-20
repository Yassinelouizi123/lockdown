import { useEffect, useMemo, useState } from 'react';
import { Circle, CircleNotch, Lightbulb, Rocket, ShieldCheck, ShieldSlash, Warning, CheckCircle } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';
import { Engine } from '../lib/engine.js';
import { Sfx } from '../lib/audio.js';
import { GameShell, Chip, Feedback } from '../components/GameShell.jsx';
import Avatar from '../components/Avatar.jsx';
import { PERSONAL, DICT, TARGET, rnd } from './data/crack.js';

const Stat = ({ label, value, color }) => (
  <div><div className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-55">{label}</div><div className="font-display text-2xl font-extrabold" style={{ color }}>{value}</div></div>
);

function Forge({ pw, setPw, hint, setHint, onLaunch }) {
  const { t } = useApp();
  const a = useMemo(() => Engine.analyze(pw, PERSONAL), [pw]), L = Engine.level(a.bits), col = Engine.COLORS[L];
  return (
    <div>
      <div className="flex items-center gap-4"><Avatar name="sara" size={72} />
        <div><div className="font-display text-2xl font-extrabold">Sara</div><div className="opacity-70">{t('crack.persona').replace(/^[^·]+·\s*/, '')}</div></div></div>
      <p className="mt-7 text-xl leading-snug">{t('crack.brief')}</p>
      <input dir="ltr" autoFocus value={pw} onChange={e => { setPw(e.target.value); Sfx.tick(); }} maxLength={40} autoComplete="off" spellCheck={false} placeholder={t('crack.ph')}
        className="mt-5 w-full rounded-xl border-2 border-ink bg-white px-4 py-4 font-mono text-xl shadow-hard outline-none focus:bg-[#fffbd6]" />
      <div className="mt-6 flex gap-1.5">{[0, 1, 2, 3, 4].map(k => <i key={k} className="h-3.5 flex-1 rounded-full border-2 border-ink transition-colors duration-300" style={{ background: pw && k <= L ? col : '#fff' }} />)}</div>
      <div className="mt-4 flex gap-12"><Stat label={t('crack.lvl')} value={pw ? t('lvl.' + L) : '–'} color={pw ? col : undefined} /><Stat label={t('crack.time')} value={pw ? Engine.fmt(a.sec, t) : '–'} /></div>
      {pw && <ul className="mt-5 space-y-2">{a.flags.length
        ? a.flags.slice(0, 3).map((f, k) => <li key={k} className="flex items-start gap-2.5 font-medium"><Warning size={20} weight="fill" className="mt-0.5 shrink-0 text-[#f26b21]" />{Engine.flagText(f, t)}</li>)
        : <li className="flex items-start gap-2.5 font-medium"><CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-success" />{t('ok.' + (a.passphrase ? 'pass' : 'rand'))}</li>}</ul>}
      {hint && <p className="mt-5 flex items-start gap-2.5 font-medium"><Lightbulb size={22} weight="fill" className="mt-0.5 shrink-0" /><span className="marker">{t('crack.hinttxt').replace('💡 ', '')}</span></p>}
      <p className="mt-6 font-mono text-xs opacity-55">{t('crack.note')}</p>
      <div className="mt-5 flex gap-3">
        <button onClick={() => setHint(true)} className="cta alt"><Lightbulb size={19} weight="bold" />{t('crack.hint')}</button>
        <button onClick={onLaunch} disabled={!pw} className="cta flex-1"><Rocket size={20} weight="bold" />{t('crack.launch')}</button>
      </div>
    </div>
  );
}

function Attack({ pw, onLose, onWin }) {
  const { t } = useApp();
  const a = useMemo(() => Engine.analyze(pw, PERSONAL), [pw]);
  const personal = a.flags.some(f => f.c === 'personal');
  const stages = useMemo(() => [
    { cracked: a.flags.some(f => f.c === 'common') || (a.bits < 30 && !personal), base: 1e7, why: 'f1', words: DICT, sec: Math.min(a.sec, .5) },
    { cracked: personal || a.bits < 45, base: 48200, why: personal ? 'f2p' : 'f2w', words: TARGET, sec: Math.min(a.sec, 60) },
    { cracked: a.bits < Engine.STRONG_BITS, base: 3.15e19, why: 'f3', words: null, sec: a.sec }
  ], [a, personal]);
  const [i, setI] = useState(0), [status, setStatus] = useState(['run', 'idle', 'idle']);
  const [lines, setLines] = useState([]), [pct, setPct] = useState(0), [cnt, setCnt] = useState(1);

  useEffect(() => {
    const s = stages[i], total = 56, stop = s.cracked ? Math.floor(total * (.4 + Math.random() * .35)) : total, to = [];
    let k = 0; setLines([]); setPct(0); setStatus(st => st.map((x, j) => j === i ? 'run' : x));
    const set = v => setStatus(st => st.map((x, j) => j === i ? v : x));
    const iv = setInterval(() => {
      k++;
      const add = [0, 1].map(() => s.words ? s.words[Math.random() * s.words.length | 0] + (Math.random() < .4 ? Math.random() * 99 | 0 : '') : rnd(8 + Math.random() * 6 | 0));
      setLines(l => [...l, ...add].slice(-8)); setPct(k / total * 100);
      setCnt(Math.max(1, (s.cracked ? Math.min(Math.max(a.guesses, 1), s.base) : s.base) * Math.pow(Math.min(1, k / stop), 2.5)));
      if (k % 2 === 0) Sfx.tick();
      if (k >= stop) {
        clearInterval(iv);
        if (s.cracked) { setLines(l => [...l, { hit: 'MATCH : ' + pw }].slice(-8)); set('bad'); Sfx.bad(); to.push(setTimeout(() => onLose(s), 900)); }
        else { set('good'); Sfx.ok(); to.push(setTimeout(() => i < 2 ? setI(i + 1) : onWin(a), 700)); }
      }
    }, 40);
    return () => { clearInterval(iv); to.forEach(clearTimeout); };
  }, [i]); // eslint-disable-line

  const icon = s => s === 'run' ? <CircleNotch size={28} weight="bold" className="animate-spin" /> : s === 'bad' ? <ShieldSlash size={28} weight="fill" className="text-error" /> : s === 'good' ? <ShieldCheck size={28} weight="fill" className="text-success" /> : <Circle size={28} weight="bold" className="opacity-25" />;
  return (
    <div>
      <ul className="divide-y-2 divide-ink border-y-2 border-ink">
        {[1, 2, 3].map((n, j) => (
          <li key={n} className={`flex items-center gap-4 py-4 transition-opacity ${status[j] === 'idle' ? 'opacity-40' : ''}`}>
            {icon(status[j])}
            <div className="flex-1"><div className="font-display text-lg font-extrabold">{t('crack.s' + n)}</div><div className="text-sm opacity-65">{t('crack.s' + n + 'd')}</div></div>
            {status[j] === 'bad' && <span className="font-mono text-xs font-extrabold text-error">{t('crack.cracked')}</span>}
            {status[j] === 'good' && <span className="font-mono text-xs font-extrabold text-success">{t('crack.held')}</span>}
          </li>
        ))}
      </ul>
      <div dir="ltr" className="mockup-code mt-6 h-60 w-full overflow-hidden">
        {lines.map((l, k) => l.hit
          ? <pre key={k} data-prefix=">" className="bg-error text-error-content"><code>{l.hit}</code></pre>
          : <pre key={k} data-prefix=">" className="opacity-75"><code>{l}</code></pre>)}
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full bg-ink" style={{ width: pct + '%' }} /></div>
      <div className="mt-3 flex items-baseline justify-between"><span className="font-mono text-xs font-bold uppercase tracking-widest opacity-55">{t('crack.tries')}</span><b className="font-mono text-xl">{Engine.compact(cnt)}</b></div>
    </div>
  );
}

export default function Crack({ onExit, onFinish }) {
  const { t } = useApp();
  const [phase, setPhase] = useState('forge'), [pw, setPw] = useState(''), [attempts, setAttempts] = useState(0), [hint, setHint] = useState(false);
  const [lose, setLose] = useState(null), [won, setWon] = useState(null);
  const launch = () => { Sfx.alarm(); setAttempts(n => n + 1); setLose(null); setWon(null); setPhase('attack'); };
  const pts = Math.max(25, 100 - (attempts - 1) * 20 - (hint ? 10 : 0));
  return (
    <GameShell id="crack" onExit={onExit} chips={attempts > 0 && <Chip>#{attempts}</Chip>}>
      {phase === 'forge' ? <Forge pw={pw} setPw={setPw} hint={hint} setHint={setHint} onLaunch={launch} /> : (
        <>
          <Attack key={attempts} pw={pw} onLose={setLose} onWin={setWon} />
          {lose && <Feedback ok={false} title={t('crack.fail')} label={t('crack.edit')} onNext={() => setPhase('forge')}>{t('crack.' + lose.why, { t: Engine.fmt(lose.sec, t) })}</Feedback>}
          {won && <Feedback ok title={t('crack.win', { t: Engine.fmt(won.sec, t) })} label={t('ui.finish')}
            onNext={() => onFinish(pts, { detail: <>{t('crack.dAtt', { n: attempts })} · {t('crack.dTime', { t: Engine.fmt(won.sec, t) })}</>, learn: t('crack.learn') })}>{t('crack.learn')}</Feedback>}
        </>
      )}
    </GameShell>
  );
}
