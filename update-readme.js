const fs = require('fs');
const path = require('path'); // Assurez-vous que ce module est importé correctement

const readmePath = path.join(__dirname, 'README.md');

// Liste des bibliothèques JavaScript avec descriptions
const libraries = [
  { name: "Axios", description: "Une bibliothèque pour faire des requêtes HTTP.", link: "https://axios-http.com/" },
  { name: "Lodash", description: "Une bibliothèque utilitaire qui fournit des fonctions pour des tâches courantes.", link: "https://lodash.com/" },
  { name: "Moment.js", description: "Une bibliothèque pour manipuler et afficher les dates et heures.", link: "https://momentjs.com/" },
  { name: "jQuery", description: "Une bibliothèque pour simplifier la manipulation du DOM et les requêtes AJAX.", link: "https://jquery.com/" },
  { name: "Underscore", description: "Une bibliothèque utilitaire qui fournit des fonctions de programmation fonctionnelle.", link: "https://underscorejs.org/" },
  { name: "D3.js", description: "Une bibliothèque pour créer des graphiques dynamiques et interactifs.", link: "https://d3js.org/" },
  { name: "Chart.js", description: "Une bibliothèque pour créer des graphiques animés et interactifs.", link: "https://www.chartjs.org/" },
  { name: "Three.js", description: "Une bibliothèque pour créer des graphiques 3D sur le web.", link: "https://threejs.org/" },
  { name: "PixiJS", description: "Une bibliothèque pour créer des graphiques 2D haute performance.", link: "https://pixijs.com/" },
  { name: "Redux", description: "Une bibliothèque pour gérer l'état de l'application JavaScript.", link: "https://redux.js.org/" },
  { name: "RxJS", description: "Une bibliothèque pour la programmation réactive utilisant des observables.", link: "https://rxjs.dev/" },
  { name: "Vue.js", description: "Un framework pour construire des interfaces utilisateur et des applications monopages.", link: "https://vuejs.org/" },
  { name: "React", description: "Une bibliothèque pour construire des interfaces utilisateur interactives.", link: "https://reactjs.org/" },
  { name: "Angular", description: "Un framework pour construire des applications web dynamiques.", link: "https://angular.io/" },
  { name: "Ember.js", description: "Un framework pour créer des applications web ambitieuses.", link: "https://emberjs.com/" },
  { name: "Backbone.js", description: "Une bibliothèque pour structurer les applications JavaScript en modèles MVC.", link: "https://backbonejs.org/" },
  { name: "Svelte", description: "Un framework pour construire des interfaces utilisateur réactives sans le coût de la bibliothèque virtuelle DOM.", link: "https://svelte.dev/" },
  { name: "Preact", description: "Une alternative rapide et légère à React.", link: "https://preactjs.com/" },
  { name: "Express", description: "Un framework minimaliste pour construire des applications web en Node.js.", link: "https://expressjs.com/" },
  { name: "Koa", description: "Un framework web pour Node.js conçu pour être un moteur de middleware plus moderne.", link: "https://koajs.com/" },
  { name: "NestJS", description: "Un framework pour construire des applications server-side en utilisant TypeScript.", link: "https://nestjs.com/" },
  { name: "Fastify", description: "Un framework web rapide et performant pour Node.js.", link: "https://www.fastify.io/" },
  { name: "Next.js", description: "Un framework pour React qui permet le rendu côté serveur et la génération de sites statiques.", link: "https://nextjs.org/" },
  { name: "Gatsby", description: "Un générateur de sites statiques basé sur React.", link: "https://www.gatsbyjs.com/" },
  { name: "Nuxt.js", description: "Un framework basé sur Vue.js pour créer des applications universelles.", link: "https://nuxtjs.org/" },
  { name: "Meteor", description: "Un framework pour construire des applications web et mobiles en temps réel.", link: "https://www.meteor.com/" },
  { name: "Aurelia", description: "Un framework pour créer des applications web modernes et modulaires.", link: "https://aurelia.io/" },
  { name: "Webpack", description: "Un module bundler pour JavaScript et les autres ressources web.", link: "https://webpack.js.org/" },
  { name: "Parcel", description: "Un bundler d'applications web sans configuration.", link: "https://parceljs.org/" },
  { name: "Rollup", description: "Un bundler de modules JavaScript pour des projets modernes.", link: "https://rollupjs.org/" },
  { name: "Babel", description: "Un transcompilateur JavaScript pour utiliser les fonctionnalités modernes du langage.", link: "https://babeljs.io/" },
  { name: "TypeScript", description: "Un sur-ensemble de JavaScript qui ajoute des types statiques.", link: "https://www.typescriptlang.org/" },
  { name: "Jest", description: "Un framework de test JavaScript avec un focus sur la simplicité.", link: "https://jestjs.io/" },
  { name: "Mocha", description: "Un framework de test pour JavaScript.", link: "https://mochajs.org/" },
  { name: "Chai", description: "Une bibliothèque d'assertions pour les tests JavaScript.", link: "https://www.chaijs.com/" },
  { name: "Cypress", description: "Un framework de test end-to-end pour les applications web.", link: "https://www.cypress.io/" },
  { name: "Jasmine", description: "Un framework de test comportemental pour JavaScript.", link: "https://jasmine.github.io/" },
  { name: "Sinon", description: "Une bibliothèque pour les spies, mocks, et stubs dans les tests JavaScript.", link: "https://sinonjs.org/" },
  { name: "Storybook", description: "Un outil pour construire et tester des composants UI de manière isolée.", link: "https://storybook.js.org/" },
  { name: "TSDoc", description: "Un outil pour documenter les projets TypeScript avec des commentaires JSDoc.", link: "https://tsdoc.org/" },
  { name: "Eslint", description: "Un linter JavaScript pour identifier et signaler les problèmes de code.", link: "https://eslint.org/" },
  { name: "Prettier", description: "Un formateur de code pour JavaScript et d'autres langages.", link: "https://prettier.io/" },
  { name: "Husky", description: "Un outil pour exécuter des hooks Git avant les commits et les pushes.", link: "https://typicode.github.io/husky/#/" },
  { name: "Lint-staged", description: "Un outil pour exécuter des linters sur les fichiers git staged.", link: "https://github.com/okonet/lint-staged" },
  { name: "Puppeteer", description: "Une bibliothèque pour contrôler des navigateurs Chromium via l'API DevTools.", link: "https://pptr.dev/" },
  { name: "Playwright", description: "Une bibliothèque pour tester des applications web avec des navigateurs modernes.", link: "https://playwright.dev/" },
  { name: "Nightwatch", description: "Un framework de test end-to-end pour les applications web.", link: "https://nightwatchjs.org/" },
  { name: "Karma", description: "Un test runner pour les tests unitaires dans les navigateurs.", link: "https://karma-runner.github.io/" },
  { name: "Webpack Dev Server", description: "Un serveur de développement pour Webpack avec rechargement à chaud.", link: "https://webpack.js.org/configuration/dev-server/" },
  { name: "LiveServer", description: "Un serveur de développement local avec rechargement automatique.", link: "https://www.npmjs.com/package/live-server" },
  { name: "Browsersync", description: "Un outil pour synchroniser le développement entre plusieurs navigateurs.", link: "https://browsersync.io/" },
  { name: "Webpack Encore", description: "Un wrapper de Webpack pour Symfony.", link: "https://symfony.com/doc/current/frontend/encore/installation.html" },
  { name: "Jest-extended", description: "Une extension de Jest avec des assertions supplémentaires.", link: "https://github.com/jest-community/jest-extended" },
  { name: "React Router", description: "Une bibliothèque pour la gestion des routes dans une application React.", link: "https://reactrouter.com/" },
  { name: "Vue Router", description: "Une bibliothèque pour la gestion des routes dans une application Vue.js.", link: "https://router.vuejs.org/" },
  { name: "React Query", description: "Une bibliothèque pour la gestion des états de données asynchrones dans React.", link: "https://tanstack.com/query/latest" },
  { name: "Apollo Client", description: "Une bibliothèque pour interagir avec des API GraphQL.", link: "https://www.apollographql.com/docs/react/" },
  { name: "GraphQL", description: "Un langage de requête pour les APIs.", link: "https://graphql.org/" },
  { name: "Formik", description: "Une bibliothèque pour gérer les formulaires dans React.", link: "https://formik.org/" },
  { name: "Yup", description: "Une bibliothèque pour valider des objets JavaScript.", link: "https://github.com/jquense/yup" },
  { name: "Ant Design", description: "Une bibliothèque de composants UI pour React.", link: "https://ant.design/" },
  { name: "Material-UI", description: "Une bibliothèque de composants UI pour React avec le design Material.", link: "https://mui.com/" },
  { name: "Tailwind CSS", description: "Un framework CSS utilitaire.", link: "https://tailwindcss.com/" },
  { name: "Bootstrap", description: "Un framework CSS populaire pour le développement web responsive.", link: "https://getbootstrap.com/" },
  { name: "Bulma", description: "Un framework CSS moderne basé sur Flexbox.", link: "https://bulma.io/" },
  { name: "Foundation", description: "Un framework CSS responsive pour les applications web.", link: "https://get.foundation/" },
  { name: "Sass", description: "Un préprocesseur CSS avec une syntaxe avancée.", link: "https://sass-lang.com/" },
  { name: "Less", description: "Un préprocesseur CSS avec des fonctionnalités similaires à Sass.", link: "https://lesscss.org/" },
  { name: "Styled-components", description: "Une bibliothèque pour le CSS-in-JS dans React.", link: "https://styled-components.com/" },
  { name: "Emotion", description: "Une bibliothèque pour le CSS-in-JS avec des fonctionnalités avancées.", link: "https://emotion.sh/" },
  { name: "PostCSS", description: "Un outil pour transformer le CSS avec des plugins JavaScript.", link: "https://postcss.org/" },
  { name: "Gulp", description: "Un toolkit pour l'automatisation des tâches de développement.", link: "https://gulpjs.com/" },
  { name: "Grunt", description: "Un gestionnaire de tâches pour automatiser les processus de développement.", link: "https://gruntjs.com/" },
  { name: "Browserify", description: "Un outil pour empaqueter les modules Node.js pour le navigateur.", link: "http://browserify.org/" },
  { name: "Nodemon", description: "Un outil qui surveille les changements dans votre projet Node.js et redémarre automatiquement l'application.", link: "https://nodemon.io/" },
  { name: "PM2", description: "Un gestionnaire de processus pour les applications Node.js.", link: "https://pm2.keymetrics.io/" },
  { name: "Electron", description: "Un framework pour créer des applications desktop avec JavaScript, HTML, et CSS.", link: "https://www.electronjs.org/" },
  { name: "Capacitor", description: "Un framework pour créer des applications mobiles multiplateformes avec JavaScript.", link: "https://capacitorjs.com/" },
  { name: "Ionic", description: "Un framework pour construire des applications mobiles et web avec une seule base de code.", link: "https://ionicframework.com/" },
  { name: "React Native", description: "Un framework pour construire des applications mobiles natives avec React.", link: "https://reactnative.dev/" },
  { name: "NativeScript", description: "Un framework pour construire des applications mobiles natives avec JavaScript.", link: "https://nativescript.org/" },
  { name: "Expo", description: "Un outil pour développer des applications React Native rapidement.", link: "https://expo.dev/" },
  { name: "Cordova", description: "Un framework pour créer des applications mobiles avec HTML, CSS, et JavaScript.", link: "https://cordova.apache.org/" },
  { name: "Quasar", description: "Un framework pour développer des applications Vue.js avec une approche multiplateforme.", link: "https://quasar.dev/" },
  { name: "Tauri", description: "Un framework pour créer des applications desktop légères avec des technologies web.", link: "https://tauri.app/" },
  { name: "Sapper", description: "Un framework pour construire des applications web avec Svelte.", link: "https://sapper.svelte.dev/" },
  { name: "Nx", description: "Un outil pour la gestion des monorepos JavaScript et TypeScript.", link: "https://nx.dev/" },
  { name: "Lerna", description: "Un outil pour gérer les monorepos JavaScript.", link: "https://lerna.js.org/" },
  { name: "Yarn", description: "Un gestionnaire de paquets rapide, fiable et sécurisé pour JavaScript.", link: "https://yarnpkg.com/" },
  { name: "npm", description: "Le gestionnaire de paquets par défaut pour Node.js.", link: "https://www.npmjs.com/" },
  { name: "pnpm", description: "Un gestionnaire de paquets rapide et efficace pour JavaScript.", link: "https://pnpm.io/" },
  { name: "Vite", description: "Un outil de développement front-end rapide avec un hot module replacement performant.", link: "https://vitejs.dev/" },
  { name: "Vitest", description: "Un framework de test ultra rapide basé sur Vite.", link: "https://vitest.dev/" },
  { name: "Storybook", description: "Un outil pour construire et tester des composants UI de manière isolée.", link: "https://storybook.js.org/" }
];

// Définir l'agenda
const agenda = {
    "Semaine 1": {
        "13 août - 20 août": {
            "Mardi 13 août": [
                { time: "9h - 12h30", duration: "3h30", task: "Travail intensif sur la préparation du tech talk (slides, exemples de code, répétition de la présentation)" },
                { time: "12h30 - 13h30", duration: "1h", task: "Pause déjeuner" },
                { time: "13h30 - 17h", duration: "3h30", task: "Travail intensif sur la préparation du tech talk" }
            ],
            "Mercredi 14 août": [
                { time: "9h - 13h30", duration: "4h30", task: "Révision finale de la présentation" },
                { time: "13h30 - 14h", duration: "30 minutes", task: "Présentation du tech talk" },
                { time: "14h - 17h", duration: "3h", task: "Remplissage du contenu du portfolio (projets, expériences, à propos)" }
            ],
            "Jeudi 15 août - Vendredi 16 août": [
                { time: "9h - 12h30", duration: "3h30", task: "Finalisation du contenu du portfolio" },
                { time: "12h30 - 13h30", duration: "1h", task: "Pause déjeuner" },
                { time: "13h30 - 17h", duration: "3h30", task: "Introduction à Svelte et début du projet" }
            ],
            "Samedi 17 août - Dimanche 18 août": [
                { time: "9h - 12h30", duration: "3h30", task: "Développement du projet Svelte" },
                { time: "12h30 - 13h30", duration: "1h", task: "Pause déjeuner" },
                { time: "13h30 - 17h", duration: "3h30", task: "Introduction à Node.js (bases, installation, premiers scripts)" }
            ]
        }
    },
    // ... (les autres semaines)
};

// Fonction pour sélectionner une bibliothèque au hasard
function getRandomLibrary() {
  const index = Math.floor(Math.random() * libraries.length);
  return libraries[index];
}

// Fonction pour générer une chaîne de caractères pour l'agenda
function generateAgendaSection() {
    let agendaContent = '';
    for (const [week, dates] of Object.entries(agenda)) {
        agendaContent += `## ${week}\n`;
        for (const [period, days] of Object.entries(dates)) {
            agendaContent += `### ${period}\n`;
            for (const [day, tasks] of Object.entries(days)) {
                agendaContent += `#### ${day}\n`;
                tasks.forEach(task => {
                    agendaContent += `- ${task.time} (${task.duration}): ${task.task}\n`;
                });
            }
            agendaContent += '\n';
        }
    }
    return agendaContent;
}

function updateReadme() {
  if (!fs.existsSync(readmePath)) {
    console.error('Le fichier README.md est introuvable à l\'emplacement :', readmePath);
    process.exit(1);
  }

  // Lire le contenu actuel du README
  let content = fs.readFileSync(readmePath, 'utf8');

  // Trouver l'ancien bloc de bibliothèque à remplacer
  const librarySectionPattern = /<!-- START_LIBRARY_SECTION -->[\s\S]*?<!-- END_LIBRARY_SECTION -->/;
  const newLibrary = getRandomLibrary();
  let newContent = content.replace(librarySectionPattern, (match) => {
    // Remplacer l'ancienne bibliothèque par la nouvelle avec un lien
    return `<!-- START_LIBRARY_SECTION -->
 **[${newLibrary.name}](${newLibrary.link})**: ${newLibrary.description}
<!-- END_LIBRARY_SECTION -->`;
  });

  // Ajouter l'agenda au README
  const agendaSectionPattern = /<!-- START_AGENDA_SECTION -->[\s\S]*?<!-- END_AGENDA_SECTION -->/;
  const newAgendaContent = generateAgendaSection();
  newContent = newContent.replace(agendaSectionPattern, (match) => {
    // Remplacer l'ancienne section d'agenda par la nouvelle
    return `<!-- START_AGENDA_SECTION -->
${newAgendaContent}
<!-- END_AGENDA_SECTION -->`;
  });

  // Si aucune section de bibliothèque n'est trouvée, ajoutez-en une nouvelle
  if (!librarySectionPattern.test(content)) {
    newContent += `\n<!-- START_LIBRARY_SECTION -->\n **[${newLibrary.name}](${newLibrary.link})**: ${newLibrary.description}\n<!-- END_LIBRARY_SECTION -->`;
  }

  // Si aucune section d'agenda n'est trouvée, ajoutez-en une nouvelle
  if (!agendaSectionPattern.test(content)) {
    newContent += `\n<!-- START_AGENDA_SECTION -->\n${newAgendaContent}\n<!-- END_AGENDA_SECTION -->`;
  }

  // Écrire le nouveau contenu dans le README
  fs.writeFileSync(readmePath, newContent, 'utf8');
}

// Exécuter la fonction de mise à jour
updateReadme();
