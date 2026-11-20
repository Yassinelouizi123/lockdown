import { useEffect } from 'react';
import { Microphone, MicrophoneSlash, ShieldCheck, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { useApp } from '../store.jsx';

const LANGS = [['fr', 'FR'], ['en', 'EN'], ['ar', 'عربي']];

export default function Navbar({ onHome }) {
  const a = useApp();
  useEffect(() => { if (!a.notice) return; const id = setTimeout(a.clearNotice, 9000); return () => clearTimeout(id); }, [a.notice]); // eslint-disable-line
  const icon = 'grid size-9 place-items-center rounded-full border-2 border-ink bg-white transition hover:bg-lime';
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <button onClick={onHome} className="flex items-center gap-2.5" aria-label="LOCKDOWN">
          <span className="grid size-9 -rotate-6 place-items-center rounded-lg border-2 border-ink bg-lime shadow-hard-sm"><ShieldCheck size={22} weight="fill" /></span>
          <span className="hidden font-display text-xl font-extrabold tracking-tight min-[430px]:inline">LOCKDOWN</span>
        </button>
        <div className="ms-auto flex items-center gap-1.5 sm:gap-3">
          <span className="hidden font-mono text-sm font-bold sm:block">{a.total}<span className="opacity-50"> {a.t('ui2.of')}</span></span>
          <div className="flex items-center gap-0.5 text-sm font-bold">
            {LANGS.map(([k, n]) => (
              <button key={k} onClick={() => a.setLang(k)} className={`rounded-md px-2.5 py-1 ${a.lang === k ? 'bg-ink text-paper' : 'hover:underline'}`}>{n}</button>
            ))}
          </div>
          <button onClick={a.toggleSound} className={icon} title={a.t('ui.snd')} aria-label={a.t('ui.snd')}>{a.sound ? <SpeakerHigh size={18} weight="bold" /> : <SpeakerSlash size={18} weight="bold" />}</button>
          <button onClick={a.toggleVoice} className={icon} title={a.t('ui.voice')} aria-label={a.t('ui.voice')}>{a.voice ? <Microphone size={18} weight="fill" /> : <MicrophoneSlash size={18} weight="bold" />}</button>
        </div>
      </div>
      {a.notice && <div className="border-t-2 border-ink bg-[#ffe3a3] px-4 py-2 text-center text-sm font-semibold">{a.t('ui3.novoice')} <button onClick={a.clearNotice} className="ms-2 font-extrabold underline">OK</button></div>}
    </header>
  );
}
