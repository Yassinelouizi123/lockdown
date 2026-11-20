import { add } from '../../lib/i18n.js';
import { Engine } from '../../lib/engine.js';

  add('osint', {
    fr: {
      name: 'Profil Piégé', blurb: 'Trouve les infos publiques qu’un pirate utilise pour deviner un mot de passe.',
      intro: 'Touche les publications qui révèlent une info utile à un pirate (prénom d’un proche, date, ville, animal…).',
      found: 'Trouvées', miss: 'Oubliée', none: 'Rien d’exploitable ici.',
      kpet: '🐱 Nom de l’animal', kyear: '🎂 Année de naissance', kcity: '📍 Ville', kteam: '⚽ Équipe préférée', knum: '#️⃣ Numéro fétiche', ksib: '👧 Prénom d’un proche',
      wl: 'Liste de mots de passe générée à partir du profil…', cracked: 'TROUVÉ', in: 'en {t}',
      sum: 'Le pirate n’a rien « deviné » : il a simplement lu le profil public.',
      learn: 'Ton animal, ta date de naissance, ta ville ou ton équipe sont des indices. Ne les utilise pas dans un mot de passe, et pense à régler ton profil en privé.',
      dFound: 'Indices trouvés : {n}/{m}', dErr: 'Fausses alertes : {n}', go: 'Voir ce que le pirate fait'
    },
    en: {
      name: 'Profile Hunt', blurb: 'Spot the public info a hacker uses to guess a password.',
      intro: 'Tap the posts that reveal useful info to a hacker (a loved one’s name, a date, a city, a pet…).',
      found: 'Found', miss: 'Missed', none: 'Nothing exploitable here.',
      kpet: '🐱 Pet’s name', kyear: '🎂 Birth year', kcity: '📍 City', kteam: '⚽ Favourite team', knum: '#️⃣ Lucky number', ksib: '👧 A loved one’s name',
      wl: 'Password list generated from the profile…', cracked: 'FOUND', in: 'in {t}',
      sum: 'The hacker didn’t “guess” anything: they simply read the public profile.',
      learn: 'Your pet, birth date, city or team are clues. Don’t use them in a password, and set your profile to private.',
      dFound: 'Clues found: {n}/{m}', dErr: 'False alarms: {n}', go: 'See what the hacker does'
    },
    ar: {
      name: 'الحساب المكشوف', blurb: 'اكتشف المعلومات العامة التي يستعملها القرصان لتخمين كلمة المرور.',
      intro: 'المس المنشورات التي تكشف معلومة مفيدة للقرصان (اسم قريب، تاريخ، مدينة، حيوان أليف…).',
      found: 'تم العثور', miss: 'فاتتك', none: 'لا شيء يمكن استغلاله هنا.',
      kpet: '🐱 اسم الحيوان الأليف', kyear: '🎂 سنة الميلاد', kcity: '📍 المدينة', kteam: '⚽ الفريق المفضل', knum: '#️⃣ الرقم المفضل', ksib: '👧 اسم أحد المقرّبين',
      wl: 'قائمة كلمات مرور مولَّدة من الحساب…', cracked: 'تم العثور', in: 'خلال {t}',
      sum: 'القرصان لم «يخمّن» شيئًا: لقد قرأ الحساب العام فقط.',
      learn: 'حيوانك الأليف وتاريخ ميلادك ومدينتك وفريقك كلها أدلة. لا تستعملها في كلمة المرور، واجعل حسابك خاصًا.',
      dFound: 'الأدلة المكتشفة: {n}/{m}', dErr: 'إنذارات خاطئة: {n}', go: 'شاهد ما يفعله القرصان'
    }
  });

  const P = [
    {
      av: '👧', name: 'Lina', handle: '@lina.casa', pw: 'Biscuit2008',
      bio: { fr: 'Lycéenne · 17 ans · musique & chats', en: 'High-schooler · 17 · music & cats', ar: 'تلميذة · 17 سنة · موسيقى وقطط' },
      posts: [
        { k: 'pet', tok: 'Biscuit', x: { fr: 'Mon chat Biscuit a eu 3 ans aujourd’hui 🐱🎂', en: 'My cat Biscuit turned 3 today 🐱🎂', ar: 'قطتي Biscuit أتمّت 3 سنوات اليوم 🐱🎂' } },
        { x: { fr: 'Révisions de maths ce soir… à l’aide 😩', en: 'Maths revision tonight… help 😩', ar: 'مراجعة الرياضيات الليلة… النجدة 😩' } },
        { k: 'year', tok: '2008', x: { fr: 'Mon 17e anniv ! Née en 2008 et toujours aussi folle 🎉', en: 'My 17th birthday! Born in 2008 and still wild 🎉', ar: 'عيد ميلادي الـ17! وُلدت سنة 2008 🎉' } },
        { x: { fr: 'Pizza avec les copines 🍕', en: 'Pizza with the girls 🍕', ar: 'بيتزا مع الصديقات 🍕' } },
        { k: 'city', tok: 'Casablanca', x: { fr: 'Coucher de soleil sur la corniche de Casablanca 🌅', en: 'Sunset on the Casablanca corniche 🌅', ar: 'غروب الشمس على كورنيش Casablanca 🌅' } },
        { x: { fr: 'Nouvelle playlist à partager 🎧', en: 'New playlist to share 🎧', ar: 'قائمة تشغيل جديدة للمشاركة 🎧' } },
        { k: 'team', tok: 'Raja', x: { fr: 'Raja à vie, match ce soir ! 💚', en: 'Raja for life, match tonight! 💚', ar: 'Raja مدى الحياة، مباراة الليلة! 💚' } }
      ]
    },
    {
      av: '🎮', name: 'Omar', handle: '@shadow.omar', pw: 'Madrid7Yasmine',
      bio: { fr: 'Gamer · 16 ans · foot & manettes', en: 'Gamer · 16 · football & controllers', ar: 'لاعب ألعاب · 16 سنة · كرة قدم وأذرع تحكم' },
      posts: [
        { k: 'team', tok: 'Madrid', x: { fr: 'Hala Madrid y nada más 🤍 supporter à vie', en: 'Hala Madrid y nada más 🤍 fan for life', ar: 'هالا Madrid 🤍 مشجع مدى الحياة' } },
        { x: { fr: 'Nouveau PC gamer en approche… 🖥️', en: 'New gaming PC incoming… 🖥️', ar: 'حاسوب جديد للألعاب في الطريق… 🖥️' } },
        { k: 'num', tok: '7', x: { fr: 'Maillot n°7 enfin reçu, merci papa 🙏', en: 'Number 7 shirt finally arrived, thanks dad 🙏', ar: 'قميص رقم 7 وصل أخيرًا، شكرًا بابا 🙏' } },
        { x: { fr: 'Qui joue ce soir ? 🎮', en: 'Who’s playing tonight? 🎮', ar: 'من سيلعب الليلة؟ 🎮' } },
        { k: 'sib', tok: 'Yasmine', x: { fr: 'Ma petite sœur Yasmine m’a encore pris ma manette 😤', en: 'My little sister Yasmine took my controller again 😤', ar: 'أختي الصغيرة Yasmine أخذت يد التحكم مجددًا 😤' } },
        { x: { fr: 'Insomnie, encore une partie…', en: 'Can’t sleep, one more game…', ar: 'أرق، مباراة أخرى…' } }
      ]
    }
  ];
  const leaks = p => p.posts.filter(x => x.k);


export { P,leaks };
