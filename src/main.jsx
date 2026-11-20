import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/cairo/500.css';
import '@fontsource/cairo/700.css';
import './index.css';
import './lib/strings.js';
import './games/data/crack.js';
import './games/data/swipe.js';
import './games/data/osint.js';
import './games/data/breach.js';
import './games/data/quiz.js';
import './games/data/reflex.js';
import { AppProvider } from './store.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<AppProvider><App /></AppProvider>);
