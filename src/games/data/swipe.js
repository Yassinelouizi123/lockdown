import { add } from '../../lib/i18n.js';
import { Engine } from '../../lib/engine.js';

  add('swipe', {
    fr: {
      name: 'Swipe Check', blurb: 'Glisse à droite si le mot de passe est solide, à gauche s’il est faible.',
      weak: '← Faible', strong: 'Solide →', tagw: 'FAIBLE', tags: 'SOLIDE',
      intro: 'Un pirate teste 10 milliards de combinaisons par seconde. Tu as 7 secondes par carte.',
      good: 'Bien vu !', badt: 'Raté…', late: 'Trop lent !', crack: 'Temps pour le casser :',
      learn: 'Ni les majuscules, ni les symboles, ni les « @ » à la place des lettres ne sauvent un mot de passe court ou courant. Ce qui compte : longueur + hasard.',
      dOk: 'Bonnes réponses : {n}/12', dStreak: 'Meilleure série : {n}'
    },
    en: {
      name: 'Swipe Check', blurb: 'Swipe right if the password is strong, left if it is weak.',
      weak: '← Weak', strong: 'Strong →', tagw: 'WEAK', tags: 'STRONG',
      intro: 'A hacker tests 10 billion combinations per second. You have 7 seconds per card.',
      good: 'Nice one!', badt: 'Missed…', late: 'Too slow!', crack: 'Time to crack:',
      learn: 'Capital letters, symbols or “@” instead of letters will not save a short or common password. What matters: length + randomness.',
      dOk: 'Correct answers: {n}/12', dStreak: 'Best streak: {n}'
    },
    ar: {
      name: 'اختبار السحب', blurb: 'اسحب يمينًا إذا كانت كلمة المرور قوية ويسارًا إذا كانت ضعيفة.',
      weak: '← ضعيفة', strong: 'قوية →', tagw: 'ضعيفة', tags: 'قوية',
      intro: 'القرصان يجرّب 10 مليارات تركيبة في الثانية. لديك 7 ثوانٍ لكل بطاقة.',
      good: 'أحسنت!', badt: 'أخطأت…', late: 'بطيء جدًا!', crack: 'زمن الكسر:',
      learn: 'الأحرف الكبيرة والرموز أو @ بدل الحروف لا تنقذ كلمة مرور قصيرة أو شائعة. المهم: الطول + العشوائية.',
      dOk: 'الإجابات الصحيحة: {n}/12', dStreak: 'أفضل سلسلة: {n}'
    }
  });

  const WEAK = ['123456', 'azerty123', 'P@ssw0rd', 'Maroc2024', 'Fatima2008', 'Football123', '1q2w3e4r', 'Soleil!2025', 'Tz8$kLm2', 'iloveyou'];
  const STRONG = ['kT8$wQz!2mNpR4', 'tango-lune-ciel-pont-vert', 'Zq4!vN7#xLp2Ye', 'orage-pivot-lampe-sable-fleur', 'gR7$tN!w2Kp9', 'cheval-brique-nuage-pile-ciel', 'mX5#Lw9!tQb3Vz', 'soupe-radio-jungle-miel-quai'];
  const isStrong = pw => { const a = Engine.analyze(pw); return a.bits >= Engine.STRONG_BITS && !a.flags.length; };


export { WEAK,STRONG,isStrong };
