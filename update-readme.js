
const fs = require('fs');  // Ajoutez cette ligne pour importer le module fs
const path = require('path');

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
  { name: "Storybook", description: "Un outil pour construire et tester des composants UI de manière isolée.", link: "https://storybook.js.org/" },
  { name: "Leaflet", description: "Une bibliothèque pour créer des cartes interactives.", link: "https://leafletjs.com/" },
  { name: "Anime.js", description: "Une bibliothèque pour animer des éléments DOM, SVG, et plus.", link: "https://animejs.com/" },
  { name: "Framer Motion", description: "Une bibliothèque pour animer les composants React.", link: "https://www.framer.com/motion/" },
  { name: "FullCalendar", description: "Une bibliothèque pour créer des calendriers interactifs.", link: "https://fullcalendar.io/" },
  { name: "GSAP", description: "Une bibliothèque puissante pour créer des animations.", link: "https://greensock.com/gsap/" },
  { name: "Algolia InstantSearch", description: "Une bibliothèque pour implémenter une recherche instantanée.", link: "https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/" },
  { name: "Immutable.js", description: "Une bibliothèque pour créer des structures de données immuables.", link: "https://immutable-js.github.io/immutable-js/" },
  { name: "PicoCSS", description: "Un framework CSS minimaliste pour des interfaces légères et rapides.", link: "https://picocss.com/" },
  { name: "Mustache.js", description: "Un moteur de template léger pour JavaScript.", link: "https://github.com/janl/mustache.js" },
  { name: "Alpine.js", description: "Un framework léger pour manipuler le DOM directement dans le HTML.", link: "https://alpinejs.dev/" },
  { name: "Swiper", description: "Une bibliothèque pour créer des carrousels et sliders responsives.", link: "https://swiperjs.com/" },
  { name: "Popper.js", description: "Une bibliothèque pour gérer les popovers, tooltips, et dropdowns.", link: "https://popper.js.org/" },
  { name: "Day.js", description: "Une bibliothèque légère pour manipuler les dates et heures, alternative à Moment.js.", link: "https://day.js.org/" },
  { name: "Mithril", description: "Un framework JavaScript moderne pour construire des applications web rapides.", link: "https://mithril.js.org/" },
  { name: "Vivus", description: "Une bibliothèque pour animer des SVG en les dessinant.", link: "https://maxwellito.github.io/vivus/" },
  { name: "Bottleneck", description: "Une bibliothèque pour limiter le débit d'appels asynchrones.", link: "https://github.com/SGrondin/bottleneck" },
  { name: "Cytoscape.js", description: "Une bibliothèque pour visualiser des graphes complexes.", link: "https://js.cytoscape.org/" },
  { name: "Chance.js", description: "Une bibliothèque pour générer des données aléatoires.", link: "https://chancejs.com/" },
  { name: "Chartist", description: "Une bibliothèque pour créer des graphiques réactifs et simples.", link: "https://gionkunz.github.io/chartist-js/" },
  { name: "Shepherd.js", description: "Une bibliothèque pour créer des tours guidés interactifs sur les pages web.", link: "https://shepherdjs.dev/" },
  { name: "Ractive.js", description: "Un framework pour construire des interfaces utilisateur interactives.", link: "https://ractive.js.org/" },
  { name: "Reveal.js", description: "Une bibliothèque pour créer des présentations web interactives.", link: "https://revealjs.com/" },
  { name: "Mark.js", description: "Une bibliothèque pour mettre en surbrillance des mots dans un texte.", link: "https://markjs.io/" },
  { name: "Cleave.js", description: "Une bibliothèque pour formater automatiquement les champs de formulaire.", link: "https://nosir.github.io/cleave.js/" },
  { name: "Konva", description: "Une bibliothèque pour manipuler des éléments graphiques sur des canevas HTML5.", link: "https://konvajs.org/" },
  { name: "Select2", description: "Une bibliothèque pour améliorer les menus déroulants HTML.", link: "https://select2.org/" },
  { name: "Lottie", description: "Une bibliothèque pour animer les fichiers JSON exportés depuis Adobe After Effects.", link: "https://airbnb.io/lottie/" },
  { name: "Tippy.js", description: "Une bibliothèque pour créer des tooltips dynamiques.", link: "https://atomiks.github.io/tippyjs/" },
  { name: "Hammer.js", description: "Une bibliothèque pour gérer les événements tactiles et gestuels.", link: "https://hammerjs.github.io/" },
  { name: "Barba.js", description: "Une bibliothèque pour créer des transitions fluides entre les pages.", link: "https://barba.js.org/" },
  { name: "PhotoSwipe", description: "Une bibliothèque pour créer des galeries d'images légères et réactives.", link: "https://photoswipe.com/" },
  { name: "Fine Uploader", description: "Une bibliothèque pour gérer les téléchargements de fichiers avec de nombreuses options.", link: "https://fineuploader.com/" },
  { name: "AOS (Animate On Scroll)", description: "Une bibliothèque pour animer les éléments lors du défilement de la page.", link: "https://michalsnik.github.io/aos/" },
  { name: "Zdog", description: "Une bibliothèque pour créer des graphiques 3D simples et animés avec SVG et Canvas.", link: "https://zzz.dog/" },
  { name: "Tone.js", description: "Une bibliothèque pour créer de la musique et des sons avec JavaScript.", link: "https://tonejs.github.io/" },
  { name: "Wavesurfer.js", description: "Une bibliothèque pour visualiser et manipuler les fichiers audio avec des vagues.", link: "https://wavesurfer-js.org/" },
  { name: "SortableJS", description: "Une bibliothèque pour trier et réorganiser les éléments de liste.", link: "https://sortablejs.github.io/Sortable/" },
  { name: "FilePond", description: "Une bibliothèque pour télécharger des fichiers avec des interfaces modernes et personnalisables.", link: "https://pqina.nl/filepond/" },
  { name: "Quill", description: "Un éditeur WYSIWYG moderne pour le Web.", link: "https://quilljs.com/" },
  { name: "CodeMirror", description: "Un éditeur de code dans le navigateur avec support pour diverses langages.", link: "https://codemirror.net/" },
  { name: "Trix", description: "Un éditeur de texte WYSIWYG pour les applications Web.", link: "https://trix-editor.org/" },
  { name: "CamanJS", description: "Une bibliothèque de manipulation d'images directement dans le navigateur.", link: "http://camanjs.com/" }
];

// Définir l'agenda
const agenda = {
     "Semaine 1": {
        "21 août - 27 août": {
          "Mardi 20 août": [
                {
                    time: "9h - 12h30",
                    duration: "2h",
                    task: "Node.js : Création de la structure du projet Hogward-chalenge."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Création d'API RESTful avec des opérations CRUD avancées."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Node.js : Gestion du controller avec le package Joi."
                }
            ],
            "Mercredi 21 août": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Recherche de stage : Préparation de CV et lettres de motivation."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Développement des opérations CRUD - Création des routes pour Create, Read, Update, Delete."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Node.js : Validation des données et gestion des erreurs dans les opérations CRUD."
                }
            ],
            "Jeudi 22 août": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Node.js : Sécurisation des API - Mise en place de l'authentification (JWT) et des autorisations."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Svelte : Composants dynamiques et gestion de l'état local."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Node.js : Optimisation des requêtes MongoDB et gestion des index."
                }
            ],
            "Vendredi 23 août": [
              {
                    time: "9h - 11h",
                    duration: "2h",
                    task: "Svelte : Introduction aux concepts de base - Création de composants, gestion des props."
                },
                {
                    time: "11h - 12h30",
                    duration: "1h30",
                    task: "Node.js : Intégration des fonctionnalités de recherche et filtrage dans l'application CRUD."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Svelte : Utilisation des stores pour gérer l'état global."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Node.js : Développement des opérations CRUD - Création des routes pour Create, Read, Update, Delete."
                }
            ],
            "Samedi 24 août": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "MongoDB : Pratique avancée du CRUD - Gestion des relations entre collections."
                },
            ],
            "Dimanche 25 août": [
                {
                    time: "Congé",
                    duration: "Journée entière",
                    task: "Congé"
                }
            ],
            "Lundi 26 août": [
                {
                    time: "Congé",
                    duration: "Journée entière",
                    task: "Congé"
                }
            ],
            "Mardi 27 août": [
                {
                    time: "Congé",
                    duration: "Journée entière",
                    task: "Congé"
                }
            ]
        }
    },
    "Semaine 2": {
        "28 août - 3 septembre": {
            "Mercredi 28 août": [
                {
                    time: "9h - 11h",
                    duration: "2h",
                    task: "Recherche de stage : Suivi des candidatures et ajustement des documents."
                },
                {
                    time: "11h - 12h30",
                    duration: "1h30",
                    task: "Svelte : Introduction aux animations et transitions."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Création d'API RESTful avec des opérations CRUD avancées."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Amélioration des animations et transitions dans l'application."
                }
            ],
            "Jeudi 29 août": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Svelte : Gestion des formulaires et validation des entrées."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Révision et optimisation des opérations CRUD avec MongoDB."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Préparation pour la présentation du mini-projet."
                }
            ],
            "Vendredi 30 août": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Node.js : Sécurisation des API - Gestion des autorisations et authentification avancée."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Svelte : Techniques avancées de gestion de l'état et des effets secondaires."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Node.js : Ajouter des fonctionnalités avancées au CRUD - Gestion des fichiers et des uploads."
                }
            ],
            "Samedi 31 août": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Svelte : Déploiement d'une application Svelte sur Vercel ou Netlify."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Déploiement de l'application CRUD avec MongoDB sur Heroku ou un autre service."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Révision et amélioration de l'application déployée."
                }
            ],
            "Dimanche 1er septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Revue des concepts abordés en Svelte et Node.js, préparation d'un mini-projet combinant les deux technologies."
                }
            ],
            "Lundi 2 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Développement du mini-projet : Mise en place de la structure et des composants Svelte."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Intégration des fonctionnalités CRUD dans le mini-projet."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Création des routes et intégration des données depuis Node.js."
                }
            ],
            "Mardi 3 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Développement du mini-projet : Finalisation des fonctionnalités, tests et débogage."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Tests d'intégration et débogage des fonctionnalités CRUD."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Documentation et préparation de la présentation du mini-projet."
                }
            ]
        }
    },
    "Semaine 3": {
        "4 septembre - 10 septembre": {
            "Mercredi 4 septembre": [
                {
                    time: "9h - 11h",
                    duration: "2h",
                    task: "Recherche de stage : Derniers ajustements et envoi de candidatures."
                },
                {
                    time: "11h - 12h30",
                    duration: "1h30",
                    task: "Node.js : Préparation pour la présentation du projet - Révision des points clés."
                },
                {
                    time: "13h30 - 17h",
                    duration: "3h30",
                    task: "Svelte : Préparation de la présentation pour le workshop - Révision des diapositives et des démonstrations."
                }
            ],
            "Jeudi 5 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Svelte : Analyse et amélioration de l'interface utilisateur, revue des meilleures pratiques."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Analyse et amélioration des performances du backend."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Révision des tests et validation finale de l'application."
                }
            ],
            "Vendredi 6 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Node.js : Introduction à la gestion des tâches asynchrones avec des queues (ex. Bull.js)."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Svelte : Mise en place de l'authentification utilisateur dans une application complète."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Node.js : Analyse des performances et optimisation des routes API."
                }
            ],
            "Samedi 7 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Svelte : Déploiement et gestion des environnements (développement, test, production)."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Intégration avec des services tiers (API externes, services de paiement, etc.)."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Amélioration de la performance et des interactions utilisateur dans l'application."
                }
            ],
            "Dimanche 8 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Revue des concepts abordés en Svelte et Node.js, réflexion sur les projets futurs."
                }
            ],
            "Lundi 9 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Node.js : Mise en place de la documentation API avec Swagger."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Svelte : Création d'un projet de démonstration combinant les fonctionnalités apprises."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Node.js : Tests et validation des fonctionnalités du projet."
                }
            ],
            "Mardi 10 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Svelte : Implémentation des meilleures pratiques et révision des concepts avancés."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Revue et amélioration du projet, ajout de fonctionnalités si nécessaire."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Documentation et présentation du projet."
                }
            ]
        }
    },
    "Semaine 4": {
        "11 septembre - 15 septembre": {
            "Mercredi 11 septembre": [
                {
                    time: "9h - 11h",
                    duration: "2h",
                    task: "Recherche de stage : Derniers ajustements et envoi de candidatures."
                },
                {
                    time: "11h - 12h30",
                    duration: "1h30",
                    task: "Node.js : Préparation pour la présentation du projet - Révision des points clés."
                },
                {
                    time: "13h30 - 17h",
                    duration: "3h30",
                    task: "Svelte : Préparation de la présentation pour le workshop - Révision des diapositives et des démonstrations."
                }
            ],
            "Jeudi 12 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Svelte : Analyse et amélioration de l'interface utilisateur, revue des meilleures pratiques."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Node.js : Analyse et amélioration des performances du backend."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Svelte : Révision des tests et validation finale de l'application."
                }
            ],
            "Vendredi 13 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Node.js : Déploiement du projet final sur un serveur de production."
                },
                {
                    time: "13h30 - 17h",
                    duration: "3h30",
                    task: "Svelte : Présentation du workshop - Préparation et présentation aux participants."
                }
            ],
            "Samedi 14 septembre": [
                {
                    time: "9h - 12h30",
                    duration: "3h30",
                    task: "Revue finale des projets Node.js et Svelte - Documentation et rapport."
                },
                {
                    time: "13h30 - 15h30",
                    duration: "2h",
                    task: "Préparation pour les prochaines étapes de développement ou d'apprentissage."
                },
                {
                    time: "15h30 - 17h",
                    duration: "1h30",
                    task: "Discussion et planification des objectifs futurs."
                }
            ],
            "Dimanche 15 septembre": [
                {
                    time: "Congé",
                    duration: "Journée entière",
                    task: "Congé"
                }
            ]
        }
    }
};


function getRandomLibrary() {
    const randomIndex = Math.floor(Math.random() * libraries.length);
    return libraries[randomIndex];
}

// Fonction pour obtenir la date au format 'Jour Date Mois' (ex: 'mardi 13 août')
function formatDate(date) {
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin", 
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const dayOptions = { weekday: 'long', day: 'numeric' };
    const dayName = date.toLocaleDateString('fr-FR', dayOptions);

    let dayOfWeek = dayName.split(' ')[0]; // 'mardi'
    dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase(); // 'Mardi'

    const dayOfMonth = date.getDate(); // 13
    const month = months[date.getMonth()]; // 'août'

    return `${dayOfWeek} ${dayOfMonth} ${month}`; // 'Mardi 13 août'
}



// Fonction pour générer le contenu de l'agenda pour une date donnée
function generateDayAgenda(day) {
    let agendaContent = '';

    // Parcourir chaque semaine dans l'agenda
    for (const week in agenda) {
        for (const period in agenda[week]) {
            if (agenda[week][period][day]) {
                agendaContent += `<h3>${day}\n</h3>` ;
                agenda[week][period][day].forEach(task => {
                    agendaContent += `<div align="center">${task.time} : ${task.task}\n</div>`;
                });
                agendaContent += '\n';
                return agendaContent; // Sortir dès qu'on a trouvé la section
            }
        }
    }
    return 'Aucun agenda disponible pour ce jour.';
}

// Fonction pour mettre à jour le README
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
        return `<!-- START_LIBRARY_SECTION -->
 **[${newLibrary.name}](${newLibrary.link})**: ${newLibrary.description}
<!-- END_LIBRARY_SECTION -->`;
    });

    // Obtenir la date actuelle et formater
    const currentDay = formatDate(new Date());

    // Ajouter l'agenda pour le jour actuel au README
    const agendaSectionPattern = /<!-- START_AGENDA_SECTION -->[\s\S]*?<!-- END_AGENDA_SECTION -->/;
    const newAgendaContent = generateDayAgenda(currentDay);
    newContent = newContent.replace(agendaSectionPattern, (match) => {
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

const testDate = formatDate(new Date());
console.log('Date actuelle formatée:', testDate);

const dayAgenda = generateDayAgenda(testDate);
console.log('Contenu de l’agenda pour aujourd’hui:\n', dayAgenda);


// Exécuter la fonction de mise à jour
updateReadme();
