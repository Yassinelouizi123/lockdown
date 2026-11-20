# LOCKDOWN — jeu de sensibilisation (mots de passe & identité numérique)

5 mini-jeux (Crack Lab, Swipe Check, Profil Piégé, Alerte Fuite, Vrai ou Faux) + Flashcards SAFE + test « Réflexe SAFE ».
La page d'accueil tient sur un seul écran : les élèves scannent un seul QR code (celui du lien du site) et arrivent directement sur les jeux et les flashcards.
FR / EN / AR (RTL), sons générés, lecture vocale optionnelle, scores et classement enregistrés dans le navigateur.

**Stack :** React · Vite · Tailwind CSS 4 · daisyUI 5 · Framer Motion · Lucide · canvas-confetti.
Aucune donnée n'est envoyée nulle part : tout reste dans le navigateur.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # génère dist/
```

## Publier sur GitHub Pages

1. Crée un dépôt GitHub (ex. `lockdown`) et pousse ce dossier sur la branche `main`.
2. Sur GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
3. Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push.
   L'adresse sera `https://<ton-pseudo>.github.io/<nom-du-depot>/`.

Le site utilise des chemins relatifs (`base: './'`) : il fonctionne quel que soit le nom du dépôt.

## QR code

Un seul QR code suffit : génère-le à partir de l'adresse du site (`https://<ton-pseudo>.github.io/<nom-du-depot>/`) avec n'importe quel générateur de QR code, puis imprime-le ou affiche-le sur l'écran du stand.

## Modifier le contenu

- Questions, profils, scénarios, flashcards et textes FR/EN/AR : `src/games/data/*.js`
- Textes de l'interface : `src/lib/strings.js`
- Couleurs / thème : `src/index.css` (thème daisyUI `lockdown`)
- Estimateur de robustesse des mots de passe : `src/lib/engine.js` (heuristique pédagogique : 10 milliards d'essais/seconde)
