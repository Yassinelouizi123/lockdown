import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from './store.jsx';
import { Sfx, Voice, confetti } from './lib/audio.js';
import { ORDER } from './lib/games.js';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Result from './components/Result.jsx';
import Scores from './components/Scores.jsx';
import Crack from './games/Crack.jsx';
import Swipe from './games/Swipe.jsx';
import Osint from './games/Osint.jsx';
import Breach from './games/Breach.jsx';
import Quiz from './games/Quiz.jsx';
import Reflex from './games/Reflex.jsx';
import Flash from './games/Flash.jsx';

const GAMES = { crack: Crack, swipe: Swipe, osint: Osint, breach: Breach, quiz: Quiz, reflex: Reflex, flash: Flash };

export default function App() {
  const app = useApp();
  const [screen, setScreen] = useState({ name: 'home' });
  const [runKey, setRunKey] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); Voice.stop(); }, [screen.name, screen.id, runKey]);

  const play = id => { Sfx.tap(); setRunKey(k => k + 1); setScreen({ name: 'play', id }); };
  const home = () => { Sfx.tap(); setScreen({ name: 'home' }); };
  const finish = (id, points, extra = {}) => {
    const counts = id !== 'reflex';
    const isBest = app.record(id, points, counts);
    if (points >= 60) { Sfx.win(); confetti(); } else Sfx.lose();
    setScreen({ name: 'result', id, points, isBest, ...extra });
  };

  const Game = screen.name === 'play' ? GAMES[screen.id] : null;
  const idx = ORDER.indexOf(screen.id);
  const nextId = screen.name === 'result' && idx >= 0 && idx < ORDER.length - 1 ? ORDER[idx + 1] : null;

  return (
    <>
      <Navbar onHome={home} />
      <AnimatePresence mode="wait">
        <motion.div key={screen.name + (screen.id || '') + runKey} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }}>
          {screen.name === 'home' && <Home onPlay={play} onScores={() => { Sfx.tap(); setScreen({ name: 'scores' }); }} />}
          {screen.name === 'scores' && <Scores onExit={home} />}
          {Game && <Game onExit={home} onReflex={() => play('reflex')} onFinish={(p, e) => finish(screen.id, p, e)} />}
          {screen.name === 'result' && <Result {...screen} onRetry={() => play(screen.id)} onNext={nextId ? () => play(nextId) : null} nextId={nextId} onHome={home} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
