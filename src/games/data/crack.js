import { add } from '../../lib/i18n.js';
import { Engine } from '../../lib/engine.js';

  const PERSONAL = ['sara', '2006', 'mimi', 'rabat'];
  add('crack', {
    fr: {
      name: 'Crack Lab', blurb: 'Crée un mot de passe et regarde 3 attaques essayer de le casser.',
      persona: 'Sara · 17 ans · née en 2006 · chat Mimi · vit à Rabat',
      brief: 'Invente un mot de passe pour protéger le compte de Sara. Puis lance l’attaque et regarde ce que voit un pirate.',
      ph: 'Invente un mot de passe fictif…', note: 'Ne tape jamais un de tes vrais mots de passe ici.',
      launch: 'Lancer l’attaque', hint: 'Indice (−10)', hinttxt: '💡 Essaie une phrase de passe : 5 mots sans lien, séparés par des tirets. Facile à retenir, très difficile à casser.',
      lvl: 'Force', time: 'Temps pour le casser',
      s1: 'Attaque par dictionnaire', s1d: '10 millions de mots de passe volés',
      s2: 'Attaque ciblée', s2d: 'Prénom, chat, ville, année de Sara…',
      s3: 'Force brute', s3d: '10 milliards d’essais par seconde',
      tries: 'Essais', cracked: 'CRACKÉ', held: 'RÉSISTÉ',
      f1: 'Ton mot de passe fait partie des listes de mots de passe volés. Les pirates les testent en premier.',
      f2p: 'Il contient une information publique sur Sara. Les pirates lisent les profils avant d’attaquer.',
      f2w: 'Sa structure est prévisible (mot + année + symbole). Les pirates connaissent toutes ces recettes.',
      f3: 'Il est trop court ou trop prévisible : il tombe en {t} sur une base volée.',
      fail: 'Piraté !', edit: 'Modifier mon mot de passe',
      win: 'Imbattable ! Il faudrait {t} à un pirate pour le casser.',
      learn: 'La longueur et le hasard comptent plus que les « astuces » (majuscule, @ à la place du a). Une phrase de 5 mots au hasard est solide et facile à retenir.',
      dAtt: 'Tentatives : {n}', dTime: 'Temps pour le casser : {t}'
    },
    en: {
      name: 'Crack Lab', blurb: 'Create a password and watch 3 attacks try to break it.',
      persona: 'Sara · 17 · born 2006 · cat Mimi · lives in Rabat',
      brief: 'Invent a password to protect Sara’s account. Then launch the attack and see what a hacker sees.',
      ph: 'Invent a fake password…', note: 'Never type one of your real passwords here.',
      launch: 'Launch the attack', hint: 'Hint (−10)', hinttxt: '💡 Try a passphrase: 5 unrelated words separated by dashes. Easy to remember, very hard to crack.',
      lvl: 'Strength', time: 'Time to crack',
      s1: 'Dictionary attack', s1d: '10 million stolen passwords',
      s2: 'Targeted attack', s2d: 'Sara’s name, cat, city, birth year…',
      s3: 'Brute force', s3d: '10 billion guesses per second',
      tries: 'Guesses', cracked: 'CRACKED', held: 'HELD',
      f1: 'Your password is in the lists of stolen passwords. Hackers try those first.',
      f2p: 'It contains public information about Sara. Hackers read profiles before attacking.',
      f2w: 'Its structure is predictable (word + year + symbol). Hackers know all these recipes.',
      f3: 'It is too short or too predictable: it falls in {t} on a stolen database.',
      fail: 'Hacked!', edit: 'Edit my password',
      win: 'Unbeatable! A hacker would need {t} to crack it.',
      learn: 'Length and randomness matter more than “tricks” (capital letter, @ instead of a). A random 5-word phrase is strong and easy to remember.',
      dAtt: 'Attempts: {n}', dTime: 'Time to crack: {t}'
    },
    ar: {
      name: 'مختبر الاختراق', blurb: 'أنشئ كلمة مرور وشاهد 3 هجمات تحاول كسرها.',
      persona: 'سارة · 17 سنة · وُلدت عام 2006 · قطتها Mimi · تسكن في Rabat',
      brief: 'ابتكر كلمة مرور لحماية حساب سارة. ثم أطلق الهجوم وشاهد ما يراه القرصان.',
      ph: 'ابتكر كلمة مرور وهمية…', note: 'لا تكتب هنا أبدًا إحدى كلمات مرورك الحقيقية.',
      launch: 'أطلق الهجوم', hint: 'تلميح (−10)', hinttxt: '💡 جرّب جملة مرور: 5 كلمات لا رابط بينها تفصل بينها شرطات. سهلة الحفظ وصعبة الكسر.',
      lvl: 'القوة', time: 'زمن الكسر',
      s1: 'هجوم القاموس', s1d: '10 ملايين كلمة مرور مسروقة',
      s2: 'هجوم موجّه', s2d: 'اسم سارة وقطتها ومدينتها وسنة ميلادها…',
      s3: 'القوة الغاشمة', s3d: '10 مليارات محاولة في الثانية',
      tries: 'المحاولات', cracked: 'تم الكسر', held: 'صمدت',
      f1: 'كلمة مرورك ضمن قوائم كلمات المرور المسروقة. القراصنة يجرّبونها أولًا.',
      f2p: 'تحتوي معلومة عامة عن سارة. القراصنة يقرؤون الحسابات قبل الهجوم.',
      f2w: 'بنيتها متوقعة (كلمة + سنة + رمز). القراصنة يعرفون كل هذه الوصفات.',
      f3: 'قصيرة جدًا أو متوقعة: تنكسر خلال {t} على قاعدة بيانات مسروقة.',
      fail: 'تم اختراقها!', edit: 'عدّل كلمة المرور',
      win: 'لا تُقهر! يحتاج القرصان إلى {t} لكسرها.',
      learn: 'الطول والعشوائية أهم من «الحيل» (حرف كبير، @ بدل a). جملة من 5 كلمات عشوائية قوية وسهلة الحفظ.',
      dAtt: 'المحاولات: {n}', dTime: 'زمن الكسر: {t}'
    }
  });

  const DICT = ['123456', 'password', 'azerty', 'motdepasse', 'qwerty', 'iloveyou', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'football', 'soleil', 'bonjour', 'doudou', 'sunshine', 'princess', 'abc123', 'maroc', 'P@ssw0rd', 'Azerty123', 'Soleil2024', 'Bonjour123'];
  const TARGET = ['Sara', 'sara2006', 'Mimi', 'mimi_rabat', 'Sara@2006', 'Rabat2006', 'MimiSara', 'sara123', 'Mimi2006!', 'Rabat!', 'sararabat', 'Sara06', 'mimi06'];
  const CH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
  const rnd = n => Array.from({ length: n }, () => CH[Math.random() * CH.length | 0]).join('');


export { PERSONAL,DICT,TARGET,rnd };
