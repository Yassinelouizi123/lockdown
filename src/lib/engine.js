/* Educational password-strength estimator. Attacker model: offline attack on a stolen database, 10 billion guesses/second. Teaching heuristic, not a real cracking tool. */
export const Engine = (() => {
  const GPS = 1e10;
  const COMMON = ['123456','password','azerty','motdepasse','qwerty','111111','123456789','12345678','iloveyou','admin','admin123','letmein','welcome','monkey','dragon','football','soleil','bonjour','doudou','marseille','123123','000000','0000','1234','1q2w3e4r','qwertyuiop','sunshine','princess','azerty123','maroc','casablanca','abc123','passw0rd','123456a','bonjour123','motdepasse123'];
  const WORDS = [...new Set(['password','motdepasse','soleil','bonjour','maroc','football','madrid','biscuit','azerty','qwerty','dragon','monkey','sunshine','princess','welcome','admin','lune','pont','cheval','nuage','brique','correct','horse','love','amour','famille','ecole','school','hacker','master','shadow','chat','chien','fatima','omar','lina','sara','mimi','rabat','casablanca','marseille','ronaldo','messi','barca','juventus','karim','adam','pomme','nuit','jour','college','lycee','secret','tigre','lion','raja','yasmine'])].sort((a, b) => b.length - a.length);
  const LEET = { '@': 'a', '4': 'a', '0': 'o', '1': 'i', '3': 'e', '$': 's', '5': 's', '7': 't' };
  const PRI = { common: 0, personal: 1, word: 2, year: 3, seq: 4, short: 5 };

  function fin(bits, flags, extra) {
    const guesses = Math.max(1, Math.pow(2, bits - 1));
    flags.sort((a, b) => PRI[a.c] - PRI[b.c]);
    return Object.assign({ bits, guesses, sec: guesses / GPS, flags }, extra);
  }

  function analyze(pw, personal = []) {
    if (!pw) return fin(0, [], { passphrase: false, len: 0 });
    const low = pw.toLowerCase();
    const dl = [...low].map(c => LEET[c] || c).join('');
    const raw = low.replace(/[^a-z0-9]/g, ''), base = dl.replace(/[^a-z0-9]/g, '');
    const hits = [COMMON.indexOf(raw), COMMON.indexOf(base)].filter(i => i >= 0);
    if (hits.length) return fin(Math.log2(Math.min(...hits) + 1) + 1, [{ c: 'common' }], { passphrase: false, len: pw.length });

    const parts = pw.split(/[-_ .]+/).filter(Boolean);
    if (parts.length >= 3 && parts.every(p => /^[A-Za-zÀ-ÿ]{3,12}$/.test(p))) {
      const flags = [];
      let n = 0;
      parts.forEach(p => { if (personal.some(w => p.toLowerCase().includes(w))) { n++; flags.push({ c: 'personal', a: p }); } });
      return fin((parts.length - n) * 13 + n * 3 + 4, flags, { passphrase: true, len: pw.length });
    }

    const cover = new Array(dl.length).fill(false);
    let bits = 0;
    const flags = [];
    const mark = (list, code, cost) => {
      for (const w of list) {
        let from = 0, i;
        while ((i = dl.indexOf(w, from)) >= 0) {
          from = i + 1;
          if (cover.slice(i, i + w.length).some(Boolean)) continue;
          for (let k = i; k < i + w.length; k++) cover[k] = true;
          bits += cost + (pw.slice(i, i + w.length) !== low.slice(i, i + w.length) || low.slice(i, i + w.length) !== w ? 2 : 0);
          flags.push({ c: code, a: pw.slice(i, i + w.length) });
        }
      }
    };
    mark(personal.filter(w => w.length >= 3 && !/^\d+$/.test(w)), 'personal', 10);
    mark(WORDS, 'word', 13);
    const yr = /(19|20)\d{2}/g; let m;
    while ((m = yr.exec(low))) {
      if (cover.slice(m.index, m.index + 4).some(Boolean)) continue;
      for (let k = m.index; k < m.index + 4; k++) cover[k] = true;
      bits += 7;
      flags.push({ c: personal.includes(m[0]) ? 'personal' : 'year', a: m[0] });
    }
    for (let i = 0; i < low.length - 2;) {
      if (cover[i]) { i++; continue; }
      const d = low.charCodeAt(i + 1) - low.charCodeAt(i);
      if (Math.abs(d) <= 1) {
        let j = i + 1;
        while (j < low.length && !cover[j] && low.charCodeAt(j) - low.charCodeAt(j - 1) === d) j++;
        if (j - i >= 3) { for (let k = i; k < j; k++) cover[k] = true; bits += 5; flags.push({ c: 'seq', a: pw.slice(i, j) }); i = j; continue; }
      }
      i++;
    }
    let pool = 0;
    if (/[a-z]/.test(pw)) pool += 26;
    if (/[A-Z]/.test(pw)) pool += 26;
    if (/\d/.test(pw)) pool += 10;
    if (/[^A-Za-z0-9]/.test(pw)) pool += 33;
    bits += cover.filter(c => !c).length * Math.log2(pool || 1);
    if (pw.length < 12) flags.push({ c: 'short' });
    return fin(bits, flags, { passphrase: false, len: pw.length });
  }

  function fmt(sec, t) {
    const m = 60, h = 3600, d = 86400, y = 31557600, T = (k, n) => t('time.' + k, { n });
    if (sec < .001) return T('instant');
    if (sec < 1) return T('lt1');
    if (sec < m) return T('s', Math.round(sec));
    if (sec < h) return T('m', Math.round(sec / m));
    if (sec < d) return T('h', Math.round(sec / h));
    if (sec < y) return T('d', Math.round(sec / d));
    const yr = sec / y;
    if (yr < 1e3) return T('y', Math.round(yr));
    if (yr < 1e6) return T('ky', Math.round(yr / 1e3));
    if (yr < 1e9) return T('my', Math.round(yr / 1e6));
    if (yr < 1.4e10) return T('by', Math.round(yr / 1e9));
    return T('max');
  }

  const level = bits => bits < 30 ? 0 : bits < 45 ? 1 : bits < 62 ? 2 : bits < 80 ? 3 : 4;
  const COLORS = ['#e5384b', '#f26b21', '#e0a100', '#5fa800', '#18b368'];
  const flagText = (f, t) => t('flag.' + f.c, { a: f.a });
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const compact = n => n < 1e6 ? Math.round(n).toLocaleString() : (m => `${(n / 10 ** m).toFixed(1)}×10${[...String(m)].map(c => SUP[c]).join('')}`)(Math.floor(Math.log10(n)));

  return { analyze, fmt, level, COLORS, flagText, compact, STRONG_BITS: 62 };
})();
