import { add } from '../../lib/i18n.js';
import { Engine } from '../../lib/engine.js';

  add('reflex', {
    fr: { name: 'Réflexe SAFE', q: 'Quelle lettre SAFE s’applique ?', good: 'Bon réflexe !', bad: 'Pas tout à fait', late: 'Temps écoulé', dOk: 'Bonnes réponses : {n}/8', learn: 'S = Solide · A = À chacun le sien · F = Facteur 2 · E = Empreinte. Avec ces 4 réflexes, tu évites la grande majorité des piratages de comptes.' },
    en: { name: 'SAFE reflex', q: 'Which SAFE letter applies?', good: 'Good reflex!', bad: 'Not quite', late: 'Time’s up', dOk: 'Correct answers: {n}/8', learn: 'S = Strong · A = All different · F = Factor 2 · E = Exposure. With these 4 reflexes you avoid most account hacks.' },
    ar: { name: 'منعكس SAFE', q: 'أي حرف من SAFE ينطبق؟', good: 'منعكس جيد!', bad: 'ليس تمامًا', late: 'انتهى الوقت', dOk: 'الإجابات الصحيحة: {n}/8', learn: 'S = قوية · A = لكل حساب كلمته · F = العامل الثاني · E = البصمة. بهذه العادات الأربع تتجنب معظم اختراقات الحسابات.' }
  });

  const Q = [
    { a: 'S', s: { fr: 'Tu crées un mot de passe pour un nouveau compte.', en: 'You are creating a password for a new account.', ar: 'تنشئ كلمة مرور لحساب جديد.' } },
    { a: 'A', s: { fr: 'Tu utilises le même mot de passe pour ton jeu et ton e-mail.', en: 'You use the same password for your game and your email.', ar: 'تستعمل نفس كلمة المرور للعبتك وبريدك.' } },
    { a: 'F', s: { fr: 'Une appli te propose un code en plus pour protéger ton compte.', en: 'An app offers an extra code to protect your account.', ar: 'يعرض عليك تطبيق رمزًا إضافيًا لحماية حسابك.' } },
    { a: 'E', s: { fr: 'Tu vas publier le nom de ton chat et ta date de naissance.', en: 'You are about to post your cat’s name and your birth date.', ar: 'ستنشر اسم قطتك وتاريخ ميلادك.' } },
    { a: 'S', s: { fr: 'Ton mot de passe est « football2024 ».', en: 'Your password is “football2024”.', ar: 'كلمة مرورك هي «football2024».' } },
    { a: 'A', s: { fr: 'Tu as 40 comptes et tu ne retiens pas tous tes mots de passe.', en: 'You have 40 accounts and cannot remember all your passwords.', ar: 'لديك 40 حسابًا ولا تستطيع حفظ كل كلمات المرور.' } },
    { a: 'F', s: { fr: 'Un inconnu te demande le code reçu par SMS.', en: 'A stranger asks for the code you received by SMS.', ar: 'شخص غريب يطلب الرمز الذي وصلك برسالة نصية.' } },
    { a: 'E', s: { fr: 'Tes stories montrent ton lycée, ton quartier et ton chat.', en: 'Your stories show your school, your neighbourhood and your cat.', ar: 'قصصك تُظهر مدرستك وحيّك وقطتك.' } }
  ];


export { Q as RQ };
