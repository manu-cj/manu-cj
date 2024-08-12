const fs = require('fs');
const path = 'README.md';

// Liste des bibliothèques JavaScript avec descriptions
const libraries = [
  { name: "Axios", description: "Une bibliothèque pour faire des requêtes HTTP." },
  { name: "Lodash", description: "Une bibliothèque utilitaire qui fournit des fonctions pour des tâches courantes." },
  { name: "Moment.js", description: "Une bibliothèque pour manipuler et afficher les dates et heures." },
  { name: "jQuery", description: "Une bibliothèque pour simplifier la manipulation du DOM et les requêtes AJAX." },
  { name: "Underscore", description: "Une bibliothèque utilitaire qui fournit des fonctions de programmation fonctionnelle." },
  { name: "D3.js", description: "Une bibliothèque pour créer des graphiques dynamiques et interactifs." },
  { name: "Chart.js", description: "Une bibliothèque pour créer des graphiques animés et interactifs." },
  { name: "Three.js", description: "Une bibliothèque pour créer des graphiques 3D sur le web." },
  { name: "PixiJS", description: "Une bibliothèque pour créer des graphiques 2D haute performance." },
  { name: "Redux", description: "Une bibliothèque pour gérer l'état de l'application JavaScript." },
  { name: "RxJS", description: "Une bibliothèque pour la programmation réactive utilisant des observables." },
  { name: "Vue.js", description: "Un framework pour construire des interfaces utilisateur et des applications monopages." },
  { name: "React", description: "Une bibliothèque pour construire des interfaces utilisateur interactives." },
  { name: "Angular", description: "Un framework pour construire des applications web dynamiques." },
  { name: "Ember.js", description: "Un framework pour créer des applications web ambitieuses." },
  { name: "Backbone.js", description: "Une bibliothèque pour structurer les applications JavaScript en modèles MVC." },
  { name: "Svelte", description: "Un framework pour construire des interfaces utilisateur réactives sans le coût de la bibliothèque virtuelle DOM." },
  { name: "Preact", description: "Une alternative rapide et légère à React." },
  { name: "Express", description: "Un framework minimaliste pour construire des applications web en Node.js." },
  { name: "Koa", description: "Un framework web pour Node.js conçu pour être un moteur de middleware plus moderne." },
  { name: "NestJS", description: "Un framework pour construire des applications server-side en utilisant TypeScript." },
  { name: "Fastify", description: "Un framework web rapide et performant pour Node.js." },
  { name: "Next.js", description: "Un framework pour React qui permet le rendu côté serveur et la génération de sites statiques." },
  { name: "Gatsby", description: "Un générateur de sites statiques basé sur React." },
  { name: "Nuxt.js", description: "Un framework basé sur Vue.js pour créer des applications universelles." },
  { name: "Meteor", description: "Un framework pour construire des applications web et mobiles en temps réel." },
  { name: "Aurelia", description: "Un framework pour créer des applications web modernes et modulaires." },
  { name: "Webpack", description: "Un module bundler pour JavaScript et les autres ressources web." },
  { name: "Parcel", description: "Un bundler d'applications web sans configuration." },
  { name: "Rollup", description: "Un bundler de modules JavaScript pour des projets modernes." },
  { name: "Babel", description: "Un transcompilateur JavaScript pour utiliser les fonctionnalités modernes du langage." },
  { name: "TypeScript", description: "Un sur-ensemble de JavaScript qui ajoute des types statiques." },
  { name: "Jest", description: "Un framework de test JavaScript avec un focus sur la simplicité." },
  { name: "Mocha", description: "Un framework de test pour JavaScript." },
  { name: "Chai", description: "Une bibliothèque d'assertions pour les tests JavaScript." },
  { name: "Cypress", description: "Un framework de test end-to-end pour les applications web." },
  { name: "Jasmine", description: "Un framework de test comportemental pour JavaScript." },
  { name: "Sinon", description: "Une bibliothèque pour les spies, mocks, et stubs dans les tests JavaScript." },
  { name: "Storybook", description: "Un outil pour construire et tester des composants UI de manière isolée." },
  { name: "TSDoc", description: "Un outil pour documenter les projets TypeScript avec des commentaires JSDoc." },
  { name: "Eslint", description: "Un linter JavaScript pour identifier et signaler les problèmes de code." },
  { name: "Prettier", description: "Un formateur de code pour JavaScript et d'autres langages." },
  { name: "Husky", description: "Un outil pour exécuter des hooks Git avant les commits et les pushes." },
  { name: "Lint-staged", description: "Un outil pour exécuter des linters sur les fichiers git staged." },
  { name: "Puppeteer", description: "Une bibliothèque pour contrôler des navigateurs Chromium via l'API DevTools." },
  { name: "Playwright", description: "Une bibliothèque pour tester des applications web avec des navigateurs modernes." },
  { name: "Nightwatch", description: "Un framework de test end-to-end pour les applications web." },
  { name: "Karma", description: "Un test runner pour les tests unitaires dans les navigateurs." },
  { name: "Webpack Dev Server", description: "Un serveur de développement pour Webpack avec rechargement à chaud." },
  { name: "LiveServer", description: "Un serveur de développement local avec rechargement automatique." },
  { name: "Browsersync", description: "Un outil pour synchroniser le développement entre plusieurs navigateurs." },
  { name: "Webpack Encore", description: "Un wrapper de Webpack pour Symfony." },
  { name: "Jest-extended", description: "Une extension de Jest avec des assertions supplémentaires." },
  { name: "React Router", description: "Une bibliothèque pour la gestion des routes dans une application React." },
  { name: "Vue Router", description: "Une bibliothèque pour la gestion des routes dans une application Vue.js." },
  { name: "React Query", description: "Une bibliothèque pour la gestion des états de données asynchrones dans React." },
  { name: "Apollo Client", description: "Une bibliothèque pour interagir avec des API GraphQL." },
  { name: "GraphQL", description: "Un langage de requête pour les APIs." },
  { name: "Docusaurus", description: "Un générateur de documentation pour les projets open source." },
  { name: "Docz", description: "Un générateur de documentation pour les composants React." },
  { name: "Markdown-it", description: "Un parser Markdown flexible et extensible." },
  { name: "Prism", description: "Un highlighter de syntaxe pour les langages de programmation." },
  { name: "Quill", description: "Un éditeur WYSIWYG riche en fonctionnalités." },
  { name: "Draft.js", description: "Une bibliothèque pour construire des éditeurs de texte riches dans React." },
  { name: "TinyMCE", description: "Un éditeur de texte riche pour les applications web." },
  { name: "Trix", description: "Un éditeur de texte riche qui fournit une interface utilisateur simple." },
  { name: "Swal", description: "Une bibliothèque pour afficher des alertes élégantes dans le navigateur." },
  { name: "Noty", description: "Une bibliothèque pour afficher des notifications élégantes." },
  { name: "Toastr", description: "Une bibliothèque pour afficher des notifications toast." },
  { name: "Lottie", description: "Une bibliothèque pour afficher des animations JSON créées avec After Effects." },
  { name: "Anime.js", description: "Une bibliothèque pour créer des animations JavaScript complexes." },
  { name: "GreenSock (GSAP)", description: "Une bibliothèque pour des animations JavaScript haute performance." },
  { name: "ScrollMagic", description: "Une bibliothèque pour ajouter des animations en fonction du défilement." },
  { name: "Isotope", description: "Une bibliothèque pour créer des grilles filtrables et triables." },
  { name: "Masonry", description: "Une bibliothèque pour créer des grilles de mise en page dynamique." },
  { name: "Fancybox", description: "Une bibliothèque pour créer des fenêtres modales et des galeries d'images." },
  { name: "Magnific Popup", description: "Une bibliothèque pour créer des fenêtres modales légères et réactives." },
  { name: "Swiper", description: "Une bibliothèque pour créer des carrousels et des sliders réactifs." },
  { name: "Slick", description: "Une bibliothèque pour créer des sliders avec des options de personnalisation." },
  { name: "Flatpickr", description: "Un sélecteur de date et heure léger et flexible." },
  { name: "Pikaday", description: "Un sélecteur de date pour les interfaces utilisateur." },
  { name: "Day.js", description: "Une alternative légère à Moment.js pour manipuler les dates." },
  { name: "Luxon", description: "Une bibliothèque pour gérer les dates et heures avec une API moderne." },
  { name: "Chartist", description: "Une bibliothèque pour créer des graphiques responsive et animés." },
  { name: "C3.js", description: "Une bibliothèque pour créer des graphiques basés sur D3.js." },
  { name: "Highcharts", description: "Une bibliothèque pour créer des graphiques interactifs pour le web." },
  { name: "ECharts", description: "Une bibliothèque de graphiques interactive pour les applications web." },
  { name: "FusionCharts", description: "Une bibliothèque pour créer des graphiques et des tableaux interactifs." },
  { name: "ApexCharts", description: "Une bibliothèque pour créer des graphiques interactifs et modernes." },
  { name: "Raphael", description: "Une bibliothèque pour dessiner des graphiques vectoriels sur le web." },
  { name: "Two.js", description: "Une bibliothèque pour dessiner des graphiques vectoriels avec une API simple." },
  { name: "Paper.js", description: "Une bibliothèque pour la création de graphiques vectoriels interactifs." },
  { name: "CanvasJS", description: "Une bibliothèque pour créer des graphiques interactifs avec le HTML5 canvas." },
  { name: "Fabric.js", description: "Une bibliothèque pour travailler avec le canvas HTML5." },
  { name: "Konva", description: "Une bibliothèque pour la création de graphiques interactifs en 2D." },
  { name: "KineticJS", description: "Une bibliothèque pour créer des animations interactives et des graphiques." },
  { name: "Web3.js", description: "Une bibliothèque pour interagir avec les blockchains Ethereum." },
  { name: "Ethers.js", description: "Une bibliothèque pour interagir avec Ethereum et ses écosystèmes." },
  { name: "Moralis", description: "Une plateforme pour simplifier le développement Web3 avec des outils prêts à l'emploi." },
  { name: "BitcoinJS", description: "Une bibliothèque pour travailler avec Bitcoin en JavaScript." },
  { name: "Libp2p", description: "Une bibliothèque pour créer des réseaux peer-to-peer." },
  { name: "Wagmi", description: "Une collection de hooks React pour travailler avec Ethereum." },
  { name: "Truffle", description: "Un framework de développement pour Ethereum." },
  { name: "Hardhat", description: "Un environnement de développement Ethereum complet." },
  { name: "OpenZeppelin", description: "Une bibliothèque de contrats intelligents sécurisés pour Ethereum." },
  { name: "Zepto", description: "Une bibliothèque JavaScript légère pour la manipulation du DOM." },
  { name: "Alpine.js", description: "Un framework minimaliste pour ajouter des interactions dynamiques." },
  { name: "Hyperapp", description: "Un micro-framework pour créer des applications web avec une API simple." },
  { name: "Mithril", description: "Un framework pour construire des applications web à une seule page." },
  { name: "Ember Data", description: "Une bibliothèque pour la gestion des données dans les applications Ember.js." },
  { name: "MobX", description: "Une bibliothèque pour la gestion de l'état réactif dans les applications JavaScript." },
  { name: "Recoil", description: "Une bibliothèque pour la gestion de l'état dans les applications React." },
  { name: "Zustand", description: "Une bibliothèque simple et efficace pour la gestion de l'état dans React." },
  { name: "XState", description: "Une bibliothèque pour la gestion des états dans les applications JavaScript." },
  { name: "AlgebrAPI", description: "Une API pour effectuer des calculs algébriques en JavaScript." },
  { name: "P5.js", description: "Une bibliothèque pour créer des dessins et des animations interactifs." },
  { name: "Math.js", description: "Une bibliothèque pour les calculs mathématiques avancés en JavaScript." }
];

// Choisir une bibliothèque aléatoire
const randomIndex = Math.floor(Math.random() * libraries.length);
const randomLibrary = libraries[randomIndex];

// Lire le README.md actuel
const readmePath = path;
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// Créer la section à ajouter
const newSection = `## Bibliothèque JavaScript aléatoire\n\nVoici une bibliothèque JavaScript que vous pourriez trouver utile :\n\n**${randomLibrary.name}: ${randomLibrary.description}**\n`;

// Ajouter ou remplacer la section dans le README
if (readmeContent.includes('## Bibliothèque JavaScript aléatoire')) {
  readmeContent = readmeContent.replace(/## Bibliothèque JavaScript aléatoire.*?(\n\n|$)/s, newSection);
} else {
  readmeContent += `\n\n${newSection}`;
}

// Écrire les modifications dans le README.md
fs.writeFileSync(readmePath, readmeContent, 'utf8');
