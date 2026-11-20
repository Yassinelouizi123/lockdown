import { add } from '../../lib/i18n.js';
import { Engine } from '../../lib/engine.js';

  add('breach', {
    fr: {
      name: 'Alerte Fuite', blurb: 'Ton mot de passe a fuité. Prends les bonnes décisions, étape par étape.',
      story: '🚨 Ton e-mail et ton mot de passe « Biscuit2008 » viennent d’apparaître dans une fuite de données. Tu utilises le même mot de passe pour ton e-mail, Instagram et ton compte de jeux.',
      gauge: 'Sécurité de tes comptes', b1: '🔑 E-mail protégé', b2: '🧩 Mots de passe uniques', b3: '🛡️ 2FA activée',
      step: 'Étape {n}/4', best: 'Meilleure option', ok: 'Bon choix !', mid: 'Pas mal, mais on peut mieux faire', no: 'Mauvais réflexe',
      learn: 'Après une fuite : protège d’abord ton e-mail, ne donne jamais un code reçu par SMS, utilise un mot de passe unique par compte, et active la double authentification.',
      dScore: 'Sécurité finale : {n} %'
    },
    en: {
      name: 'Breach Alert', blurb: 'Your password leaked. Make the right decisions, step by step.',
      story: '🚨 Your email and your password “Biscuit2008” just appeared in a data breach. You use the same password for your email, Instagram and gaming account.',
      gauge: 'Your accounts’ security', b1: '🔑 Email secured', b2: '🧩 Unique passwords', b3: '🛡️ 2FA on',
      step: 'Step {n}/4', best: 'Best option', ok: 'Good choice!', mid: 'Not bad, but you can do better', no: 'Bad reflex',
      learn: 'After a leak: secure your email first, never give away a code received by SMS, use one unique password per account, and turn on two-factor authentication.',
      dScore: 'Final security: {n}%'
    },
    ar: {
      name: 'إنذار تسرّب', blurb: 'تسرّبت كلمة مرورك. اتخذ القرارات الصحيحة خطوة بخطوة.',
      story: '🚨 ظهر بريدك الإلكتروني وكلمة مرورك «Biscuit2008» في تسرّب للبيانات. تستعمل نفس كلمة المرور لبريدك وإنستغرام وحساب الألعاب.',
      gauge: 'أمان حساباتك', b1: '🔑 البريد محمي', b2: '🧩 كلمات مرور فريدة', b3: '🛡️ المصادقة الثنائية',
      step: 'الخطوة {n}/4', best: 'أفضل خيار', ok: 'اختيار جيد!', mid: 'ليس سيئًا، لكن يمكنك فعل الأفضل', no: 'ردّ فعل خاطئ',
      learn: 'بعد التسرّب: احمِ بريدك أولًا، لا تعطِ أبدًا رمزًا وصلك برسالة نصية، استعمل كلمة مرور فريدة لكل حساب، وفعّل المصادقة الثنائية.',
      dScore: 'الأمان النهائي: {n}%'
    }
  });

  const S = [
    {
      badge: 1, q: { fr: 'Que sécurises-tu EN PREMIER ?', en: 'What do you secure FIRST?', ar: 'ماذا تؤمّن أولًا؟' },
      o: [
        { p: 25, x: { fr: 'Mon e-mail : il permet de réinitialiser tous mes autres comptes', en: 'My email: it can reset all my other accounts', ar: 'بريدي الإلكتروني: فهو يعيد تعيين كل حساباتي الأخرى' }, e: { fr: 'L’e-mail est la clé maîtresse : celui qui le contrôle peut réinitialiser tous les autres comptes.', en: 'Email is the master key: whoever controls it can reset every other account.', ar: 'البريد هو المفتاح الرئيسي: من يتحكم فيه يستطيع إعادة تعيين كل الحسابات.' } },
        { p: 8, x: { fr: 'Instagram, c’est le plus visible', en: 'Instagram, it’s the most visible', ar: 'إنستغرام، فهو الأكثر ظهورًا' }, e: { fr: 'Utile, mais si l’e-mail est pris, le pirate reprend Instagram quand il veut.', en: 'Useful, but if your email is taken the hacker can retake Instagram any time.', ar: 'مفيد، لكن إن سُرق البريد يستعيد القرصان إنستغرام متى شاء.' } },
        { p: 0, x: { fr: 'Rien : je surveille juste si quelque chose se passe', en: 'Nothing: I’ll just watch if something happens', ar: 'لا شيء: سأراقب فقط إن حدث شيء' }, e: { fr: 'Attendre, c’est laisser le pirate agir le premier.', en: 'Waiting lets the hacker act first.', ar: 'الانتظار يمنح القرصان أسبقية التصرف.' } }
      ]
    },
    {
      badge: 0, sms: { fr: 'SecuTeam : activité suspecte sur ton compte. Pour l’annuler, réponds avec le code à 6 chiffres que tu viens de recevoir.', en: 'SecuTeam: suspicious activity on your account. To cancel it, reply with the 6-digit code you just received.', ar: 'SecuTeam: نشاط مشبوه على حسابك. لإلغائه، أرسل الرمز المكوّن من 6 أرقام الذي وصلك للتو.' },
      q: { fr: 'Un SMS arrive. Que fais-tu ?', en: 'An SMS arrives. What do you do?', ar: 'وصلتك رسالة. ماذا تفعل؟' },
      o: [
        { p: 25, x: { fr: 'Je ne partage jamais ce code. J’ignore et je vérifie dans l’appli officielle', en: 'I never share this code. I ignore it and check in the official app', ar: 'لا أشارك هذا الرمز أبدًا. أتجاهل الرسالة وأتحقق من التطبيق الرسمي' }, e: { fr: 'Ce code est la clé de ton compte. Personne de sérieux ne te le demandera.', en: 'That code is the key to your account. No real service will ask for it.', ar: 'هذا الرمز هو مفتاح حسابك. لا أحد جدّي يطلبه منك.' } },
        { p: 0, x: { fr: 'Je réponds avec le code pour annuler vite', en: 'I reply with the code to cancel quickly', ar: 'أرد بالرمز لأُلغي بسرعة' }, e: { fr: 'Piège ! Le pirate vient de demander ce code lui-même : tu lui ouvres la porte.', en: 'Trap! The hacker just requested that code himself: you’d open the door for him.', ar: 'فخ! القرصان هو من طلب الرمز للتو: ستفتح له الباب بنفسك.' } },
        { p: 0, x: { fr: 'Je clique sur le lien du SMS pour voir', en: 'I tap the link in the SMS to see', ar: 'أضغط على الرابط في الرسالة لأرى' }, e: { fr: 'Les liens de ces SMS mènent souvent à de fausses pages qui volent tes identifiants.', en: 'Links in such SMS often lead to fake pages that steal your logins.', ar: 'روابط هذه الرسائل تقود غالبًا إلى صفحات مزيفة تسرق بياناتك.' } }
      ]
    },
    {
      badge: 2, q: { fr: 'Tu changes tes mots de passe. Comment ?', en: 'You change your passwords. How?', ar: 'ستغيّر كلمات مرورك. كيف؟' },
      o: [
        { p: 25, x: { fr: 'Un mot de passe long et différent pour chaque compte, retenu par un gestionnaire', en: 'A long, different password for each account, stored by a password manager', ar: 'كلمة مرور طويلة ومختلفة لكل حساب، يحفظها مدير كلمات المرور' }, e: { fr: 'Si un site fuit, les autres comptes restent protégés.', en: 'If one site leaks, your other accounts stay safe.', ar: 'إن تسرّب موقع واحد تبقى بقية حساباتك محمية.' } },
        { p: 8, x: { fr: 'Un seul nouveau mot de passe très costaud pour tous', en: 'One new very strong password for everything', ar: 'كلمة مرور جديدة قوية جدًا لكل الحسابات' }, e: { fr: 'Costaud, oui, mais réutilisé : une seule fuite et tout retombe.', en: 'Strong, yes, but reused: a single leak and everything falls again.', ar: 'قوية نعم، لكنها مكررة: تسرّب واحد ويسقط كل شيء مجددًا.' } },
        { p: 0, x: { fr: 'Biscuit2009! (je change juste l’année)', en: 'Biscuit2009! (I only change the year)', ar: 'Biscuit2009! (أغيّر السنة فقط)' }, e: { fr: 'Les pirates testent automatiquement ces variantes en premier.', en: 'Hackers automatically try these variants first.', ar: 'القراصنة يجرّبون هذه التنويعات تلقائيًا أولًا.' } }
      ]
    },
    {
      badge: 3, q: { fr: 'Dernière étape : la double authentification (2FA). Laquelle choisis-tu ?', en: 'Last step: two-factor authentication (2FA). Which one do you choose?', ar: 'الخطوة الأخيرة: المصادقة الثنائية. أيها تختار؟' },
      o: [
        { p: 25, x: { fr: 'Une application d’authentification ou une clé de sécurité', en: 'An authenticator app or a security key', ar: 'تطبيق مصادقة أو مفتاح أمان' }, e: { fr: 'Très solide : le code reste sur ton téléphone et ne peut pas être détourné facilement.', en: 'Very strong: the code stays on your phone and can’t be easily hijacked.', ar: 'قوية جدًا: الرمز يبقى في هاتفك ولا يمكن تحويله بسهولة.' } },
        { p: 14, x: { fr: 'Un code par SMS', en: 'A code by SMS', ar: 'رمز عبر رسالة نصية' }, e: { fr: 'Mieux que rien, mais un SMS peut être intercepté ou détourné (SIM swap).', en: 'Better than nothing, but an SMS can be intercepted or hijacked (SIM swap).', ar: 'أفضل من لا شيء، لكن الرسالة قد تُعترض أو تُحوَّل (استنساخ الشريحة).' } },
        { p: 0, x: { fr: 'Pas besoin, mon mot de passe est assez fort', en: 'No need, my password is strong enough', ar: 'لا حاجة، كلمة مروري قوية بما يكفي' }, e: { fr: 'Même un bon mot de passe peut fuiter. La 2FA bloque le pirate quand même.', en: 'Even a good password can leak. 2FA still blocks the hacker.', ar: 'حتى كلمة المرور الجيدة قد تتسرّب. المصادقة الثنائية تصدّ القرصان رغم ذلك.' } }
      ]
    }
  ];


export { S };
