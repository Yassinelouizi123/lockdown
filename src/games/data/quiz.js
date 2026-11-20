import { add } from '../../lib/i18n.js';
import { Engine } from '../../lib/engine.js';

  add('quiz', {
    fr: {
      name: 'Vrai ou Faux', blurb: '10 idées reçues sur les mots de passe. Vrai ou faux ? 10 secondes pour répondre.',
      t: 'Vrai', f: 'Faux', good: 'Bonne réponse !', bad: 'Pas tout à fait', late: 'Temps écoulé',
      listen: 'Écouter', dOk: 'Bonnes réponses : {n}/10', dStreak: 'Meilleure série : {n}',
      learn: 'Beaucoup d’idées reçues circulent sur les mots de passe. En cas de doute : long, unique, avec 2FA, et ne jamais partager un code.'
    },
    en: {
      name: 'True or False', blurb: '10 common beliefs about passwords. True or false? 10 seconds to answer.',
      t: 'True', f: 'False', good: 'Correct!', bad: 'Not quite', late: 'Time’s up',
      listen: 'Listen', dOk: 'Correct answers: {n}/10', dStreak: 'Best streak: {n}',
      learn: 'Many myths circulate about passwords. When in doubt: long, unique, with 2FA, and never share a code.'
    },
    ar: {
      name: 'صح أم خطأ', blurb: '10 أفكار شائعة عن كلمات المرور. صح أم خطأ؟ لديك 10 ثوانٍ.',
      t: 'صح', f: 'خطأ', good: 'إجابة صحيحة!', bad: 'ليس تمامًا', late: 'انتهى الوقت',
      listen: 'استمع', dOk: 'الإجابات الصحيحة: {n}/10', dStreak: 'أفضل سلسلة: {n}',
      learn: 'تنتشر أفكار خاطئة كثيرة عن كلمات المرور. عند الشك: طويلة، فريدة، مع المصادقة الثنائية، ولا تشارك رمزًا أبدًا.'
    }
  });

  const Q = [
    { a: false, s: { fr: 'Remplacer « a » par « @ » et « o » par « 0 » rend un mot de passe très difficile à casser.', en: 'Replacing “a” with “@” and “o” with “0” makes a password very hard to crack.', ar: 'استبدال a بـ @ و o بـ 0 يجعل كلمة المرور صعبة الكسر جدًا.' }, e: { fr: 'Faux. Les pirates connaissent ces astuces : « P@ssw0rd » est dans toutes leurs listes.', en: 'False. Hackers know these tricks: “P@ssw0rd” is in all their lists.', ar: 'خطأ. القراصنة يعرفون هذه الحيل: P@ssw0rd موجودة في كل قوائمهم.' } },
    { a: true, s: { fr: 'Une phrase de 4 à 5 mots au hasard est souvent plus solide qu’un mot court avec des symboles.', en: 'A random phrase of 4–5 words is often stronger than a short word with symbols.', ar: 'جملة من 4 إلى 5 كلمات عشوائية غالبًا أقوى من كلمة قصيرة مع رموز.' }, e: { fr: 'Vrai ! La longueur est ce qui compte le plus, et une phrase se retient facilement.', en: 'True! Length matters most, and a phrase is easy to remember.', ar: 'صحيح! الطول هو الأهم، والجملة سهلة الحفظ.' } },
    { a: true, s: { fr: 'Réutiliser un même mot de passe sur plusieurs sites est dangereux, même s’il est très fort.', en: 'Reusing the same password on several sites is dangerous, even if it is very strong.', ar: 'إعادة استخدام نفس كلمة المرور في عدة مواقع خطر، حتى لو كانت قوية جدًا.' }, e: { fr: 'Vrai. Si un seul site fuit, les pirates essaient ce mot de passe partout.', en: 'True. If one site leaks, hackers try that password everywhere.', ar: 'صحيح. إن تسرّب موقع واحد جرّب القراصنة كلمة المرور في كل مكان.' } },
    { a: false, s: { fr: 'Un site sérieux peut t’envoyer ton mot de passe actuel par e-mail si tu l’as oublié.', en: 'A serious website can email you your current password if you forgot it.', ar: 'يمكن لموقع جدّي أن يرسل لك كلمة مرورك الحالية بالبريد إن نسيتها.' }, e: { fr: 'Faux. Un site sérieux ne connaît pas ton mot de passe : il te propose d’en créer un nouveau.', en: 'False. A serious site doesn’t know your password: it lets you create a new one.', ar: 'خطأ. الموقع الجدّي لا يعرف كلمة مرورك: بل يتيح لك إنشاء كلمة جديدة.' } },
    { a: false, s: { fr: 'Un code de double authentification reçu par SMS est aussi sûr qu’une clé de sécurité physique.', en: 'A two-factor code received by SMS is as safe as a physical security key.', ar: 'رمز المصادقة الثنائية عبر الرسائل النصية آمن مثل مفتاح الأمان المادي.' }, e: { fr: 'Faux. Le SMS peut être détourné ; une clé physique ou une appli est bien plus sûre.', en: 'False. SMS can be hijacked; a physical key or an app is much safer.', ar: 'خطأ. الرسائل النصية قد تُحوَّل؛ والمفتاح المادي أو التطبيق أكثر أمانًا بكثير.' } },
    { a: true, s: { fr: 'Si ton e-mail apparaît dans une fuite de données, tu dois changer ton mot de passe, même si rien d’anormal ne s’est passé.', en: 'If your email appears in a data breach, you should change your password even if nothing unusual happened.', ar: 'إذا ظهر بريدك في تسرّب بيانات فعليك تغيير كلمة المرور حتى لو لم يحدث شيء غريب.' }, e: { fr: 'Vrai. Les pirates peuvent attendre avant d’agir : change vite et active la 2FA.', en: 'True. Hackers may wait before acting: change it quickly and turn on 2FA.', ar: 'صحيح. قد ينتظر القراصنة قبل التحرك: غيّرها بسرعة وفعّل المصادقة الثنائية.' } },
    { a: false, s: { fr: 'Il faut changer son mot de passe tous les jours pour être en sécurité.', en: 'You must change your password every day to stay safe.', ar: 'يجب تغيير كلمة المرور كل يوم لتبقى آمنًا.' }, e: { fr: 'Faux. Change-le si tu as un doute ou une fuite. Changer sans cesse pousse à choisir des mots de passe faibles.', en: 'False. Change it if you suspect a leak. Constant changes push people to pick weak ones.', ar: 'خطأ. غيّرها عند الشك أو التسرّب. التغيير المستمر يدفع لاختيار كلمات ضعيفة.' } },
    { a: true, s: { fr: 'Le nom de ton animal et ta date de naissance publiés en ligne peuvent aider à deviner tes mots de passe.', en: 'Your pet’s name and birth date posted online can help someone guess your passwords.', ar: 'اسم حيوانك الأليف وتاريخ ميلادك المنشوران على الإنترنت قد يساعدان في تخمين كلمات مرورك.' }, e: { fr: 'Vrai. Ton profil public est une liste d’indices pour un pirate.', en: 'True. Your public profile is a clue list for a hacker.', ar: 'صحيح. حسابك العام قائمة أدلة بالنسبة للقرصان.' } },
    { a: true, s: { fr: 'Un gestionnaire de mots de passe est un coffre protégé par un seul mot de passe maître solide.', en: 'A password manager is a vault protected by a single strong master password.', ar: 'مدير كلمات المرور خزنة محمية بكلمة مرور رئيسية واحدة قوية.' }, e: { fr: 'Vrai. Tu retiens une seule phrase de passe, il retient tout le reste.', en: 'True. You remember one passphrase; it remembers everything else.', ar: 'صحيح. تحفظ جملة مرور واحدة وهو يحفظ الباقي.' } },
    { a: false, s: { fr: 'Le support technique peut te demander le code à 6 chiffres reçu par SMS pour « vérifier ton identité ».', en: 'Tech support may ask for the 6-digit SMS code to “verify your identity”.', ar: 'قد يطلب الدعم الفني رمز الأرقام الستة المرسل بالرسالة «للتحقق من هويتك».' }, e: { fr: 'Faux. Ce code est secret : personne de sérieux ne te le demandera jamais.', en: 'False. That code is secret: nobody legitimate will ever ask for it.', ar: 'خطأ. هذا الرمز سري: لن يطلبه منك أي طرف جدّي أبدًا.' } }
  ];


export { Q };
