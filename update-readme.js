
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
  { name: "Storybook", description: "Un outil pour construire et tester des composants UI de manière isolée.", link: "https://storybook.js.org/" }
];

// Définir l'agenda
const agenda = {
     "Semaine 1": {
        "13 août - 20 août": {
            "Mardi 13 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation du tech talk : Création des slides, ajout des points clés et exemples de code."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Affinement du tech talk : Révision des slides et répétition de la présentation."
                }
            ],
            "Mercredi 14 août": [
                {
                    "time": "9h - 13h30",
                    "duration": "4h30",
                    "task": "Révision et pratique de la présentation du tech talk : Ajustement des slides et du discours."
                },
                {
                    "time": "13h30 - 14h",
                    "duration": "30m",
                    "task": "Présentation du tech talk."
                },
                {
                    "time": "14h - 17h",
                    "duration": "3h",
                    "task": "Mise à jour du portfolio : Ajout de projets récents et complétion de la section 'À propos'."
                }
            ],
            "Jeudi 15 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Finalisation du portfolio : Vérification de la mise en page et correction des erreurs."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Introduction à Svelte : Création d'un projet initial et apprentissage des bases."
                }
            ],
            "Vendredi 16 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Développement du projet Svelte : Ajout de fonctionnalités et résolution de problèmes."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Approfondissement des connaissances en Svelte : Exploration des fonctionnalités avancées."
                }
            ],
            "Samedi 17 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Développement du projet Svelte : Implémentation de fonctionnalités supplémentaires et tests."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Introduction à Node.js : Installation et écriture de scripts de base."
                }
            ],
            "Dimanche 18 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Travail sur le projet Svelte : Révision et amélioration du code."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage avancé de Node.js : Exploration des fonctionnalités avancées."
                }
            ]
        }
    },
    "Semaine 2": {
        "19 août - 25 août": {
            "Lundi 19 août": [
                {
                    "time": "9h - 11h",
                    "duration": "2h",
                    "task": "Recherche de stages : Identification des opportunités et préparation des candidatures."
                },
                {
                    "time": "11h - 12h30",
                    "duration": "1h30",
                    "task": "Développement du projet Svelte : Travail sur les nouvelles fonctionnalités."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage de Node.js : Exploration d'Express, gestion des routes et des middlewares."
                }
            ],
            "Mardi 20 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Développement du projet Svelte : Ajout de fonctionnalités et amélioration du design."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage de Node.js : Implémentation du CRUD et création d'une API."
                }
            ],
            "Mercredi 21 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Développement du projet Svelte : Ajout de nouvelles fonctionnalités et correction des bugs."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage de Node.js : Connexion à une base de données et implémentation de l'authentification."
                }
            ],
            "Jeudi 22 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Développement du projet Svelte : Révision du code, amélioration de la performance et ajustement du design."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Développement avec Node.js : Implémentation des fonctionnalités avancées et préparation au déploiement."
                }
            ],
            "Vendredi 23 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Finalisation des fonctionnalités principales du projet Svelte : Correction des bugs et tests des fonctionnalités."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Préparation au déploiement du projet : Revérification du code, documentation et tests de déploiement."
                }
            ],
            "Samedi 24 août": [
                {
                    "time": "Pas de travail",
                    "duration": "N/A",
                    "task": "Congés : Repos et détente."
                }
            ],
            "Dimanche 25 août": [
                {
                    "time": "Pas de travail",
                    "duration": "N/A",
                    "task": "Congés : Repos et détente."
                }
            ]
        }
    },
    "Semaine 3": {
        "28 août - 1er septembre": {
            "Mercredi 28 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Révision du projet Svelte : Ajustements finaux et amélioration du design."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Finalisation de l'apprentissage de Node.js : Préparation au déploiement et révision des concepts clés."
                }
            ],
            "Jeudi 29 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation de la démonstration pour le workshop : Vérification du bon fonctionnement du projet."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Préparation de la démonstration pour le workshop : Création du script de démonstration et préparation du matériel."
                }
            ],
            "Vendredi 30 août": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Répétition de la démonstration du workshop : Révision du script et ajustement du discours."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Finalisation des préparations pour le workshop : Vérification des aspects techniques et organisationnels."
                }
            ],
            "Samedi 31 août": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Participation au workshop : Présentation du projet et démonstration."
                }
            ],
            "Dimanche 1er septembre": [
                {
                    "time": "Pas de travail",
                    "duration": "N/A",
                    "task": "Congés : Repos et détente."
                }
            ]
        }
    },
   "Semaine 4": {
        "2 septembre - 8 septembre": {
            "Lundi 2 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation du workshop Svelte : Recherche et collecte de matériaux pour la présentation."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Création des diapositives pour le workshop Svelte : Structuration des sections et ajout de contenu."
                }
            ],
            "Mardi 3 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation du workshop Svelte : Développement d'exemples pratiques et démonstrations."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Création des supports de présentation pour le workshop Svelte : Mise en place des documents et ressources."
                }
            ],
            "Mercredi 4 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation du workshop Svelte : Répétition de la présentation et ajustement des diapositives."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Développement et test des démos pour le workshop Svelte : Vérification du bon fonctionnement des exemples."
                }
            ],
            "Jeudi 5 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation finale pour le workshop Svelte : Révision du contenu et répétition générale."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Finalisation des supports de présentation et vérification des équipements pour le workshop."
                }
            ],
            "Vendredi 6 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Révision et ajustement du workshop Svelte : Dernières modifications avant la présentation."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Préparation des questions-réponses et des interactions pour le workshop."
                }
            ],
            "Samedi 7 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Repos et révision légère du workshop Svelte."
                }
            ],
            "Dimanche 8 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Finalisation des détails du workshop Svelte : Vérification des derniers ajustements."
                }
            ]
        }
    },
    "Semaine 5": {
        "9 septembre - 15 septembre": {
            "Lundi 9 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation et répétition finale pour le workshop Svelte : Vérification des diapositives et du contenu."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Présentation du workshop Svelte : Réalisation de la présentation et interaction avec les participants."
                }
            ],
            "Mardi 10 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Analyse des retours du workshop Svelte : Collecte de feedback et évaluation des points à améliorer."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Mise à jour et amélioration des supports de présentation du workshop Svelte en fonction des retours."
                }
            ],
            "Mercredi 11 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Commencement de l'apprentissage d'Angular : Installation de l'environnement et premiers tutoriels."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Création d'une première application Angular et exploration des fonctionnalités de base."
                }
            ],
            "Jeudi 12 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Étude des composants, des modules et des services Angular."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Intégration des formulaires et gestion des routes."
                }
            ],
            "Vendredi 13 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation pour la présentation du workshop Svelte : Révision finale et vérification des matériaux."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Présentation du workshop Svelte : Réalisation de la présentation et interaction avec les participants."
                }
            ],
            "Samedi 14 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Apprentissage d'Angular : Révision des concepts appris et travail sur des projets personnels."
                }
            ],
            "Dimanche 15 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Apprentissage d'Angular : Révision des projets et perfectionnement des compétences."
                }
            ]
        }
    },
    "Semaine 6": {
        "16 septembre - 22 septembre": {
            "Lundi 16 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Création d'une application complète et intégration des fonctionnalités avancées."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Optimisation des performances et gestion des états d'application."
                }
            ],
            "Mardi 17 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Utilisation des outils de test et débogage pour Angular."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Développement de fonctionnalités spécifiques et intégration d'API."
                }
            ],
            "Mercredi 18 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Révision et perfectionnement des projets Angular réalisés."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Travail sur des projets personnels Angular : Intégration des nouvelles compétences et optimisation des applications."
                }
            ],
            "Jeudi 19 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Exploration des fonctionnalités avancées et des meilleures pratiques."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Travail sur des projets personnels Angular : Intégration des meilleures pratiques et révision du code."
                }
            ],
            "Vendredi 20 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Préparation d'un projet final pour démontrer les compétences acquises."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Travail sur le projet final Angular : Développement et intégration des fonctionnalités avancées."
                }
            ],
            "Samedi 21 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Finalisation du projet Angular : Revue et tests finaux."
                }
            ],
            "Dimanche 22 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Travail sur le projet Angular : Finalisation et révision des détails du projet."
                }
            ]
        }
    }
}
Résumé du planning :
Jusqu'au 13 septembre : Préparation et présentation du workshop Svelte.
À partir du 11 septembre : Début de l'apprentissage d'Angular avec des tâches spécifiques de développement et de perfectionnement tout au long du mois.
Travail les dimanches : Apprentissage et perfectionnement des compétences Angular.
Si vous avez besoin d'autres ajustements ou d'informations supplémentaires, faites-le moi savoir !

You said:
Non je présente pas le workshop sur svelte le 9 septembre mais le 13 septembre
ChatGPT said:
ChatGPT
Je comprends mieux maintenant. Voici le planning révisé avec la présentation du workshop Svelte fixée au 13 septembre, et en incluant le travail le dimanche :

json
Copier le code
{
    "Semaine 4": {
        "2 septembre - 8 septembre": {
            "Lundi 2 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation du workshop Svelte : Recherche et collecte de matériaux pour la présentation."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Création des diapositives pour le workshop Svelte : Structuration des sections et ajout de contenu."
                }
            ],
            "Mardi 3 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation du workshop Svelte : Développement d'exemples pratiques et démonstrations."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Création des supports de présentation pour le workshop Svelte : Mise en place des documents et ressources."
                }
            ],
            "Mercredi 4 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation du workshop Svelte : Répétition de la présentation et ajustement des diapositives."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Développement et test des démos pour le workshop Svelte : Vérification du bon fonctionnement des exemples."
                }
            ],
            "Jeudi 5 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation finale pour le workshop Svelte : Révision du contenu et répétition générale."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Finalisation des supports de présentation et vérification des équipements pour le workshop."
                }
            ],
            "Vendredi 6 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Révision et ajustement du workshop Svelte : Dernières modifications avant la présentation."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Préparation des questions-réponses et des interactions pour le workshop."
                }
            ],
            "Samedi 7 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Repos et révision légère du workshop Svelte."
                }
            ],
            "Dimanche 8 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Finalisation des détails du workshop Svelte : Vérification des derniers ajustements."
                }
            ]
        }
    },
    "Semaine 5": {
        "9 septembre - 15 septembre": {
            "Lundi 9 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation et répétition finale pour le workshop Svelte : Vérification des diapositives et du contenu."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Révision et répétition du workshop Svelte : Préparation pour la présentation."
                }
            ],
            "Mardi 10 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Analyse des retours du workshop Svelte : Collecte de feedback et évaluation des points à améliorer."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Mise à jour et amélioration des supports de présentation du workshop Svelte en fonction des retours."
                }
            ],
            "Mercredi 11 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Commencement de l'apprentissage d'Angular : Installation de l'environnement et premiers tutoriels."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Création d'une première application Angular et exploration des fonctionnalités de base."
                }
            ],
            "Jeudi 12 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Étude des composants, des modules et des services Angular."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Intégration des formulaires et gestion des routes."
                }
            ],
            "Vendredi 13 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Préparation pour la présentation du workshop Svelte : Révision finale et vérification des matériaux."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Présentation du workshop Svelte : Réalisation de la présentation et interaction avec les participants."
                }
            ],
            "Samedi 14 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Apprentissage d'Angular : Révision des concepts appris et travail sur des projets personnels."
                }
            ],
            "Dimanche 15 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Apprentissage d'Angular : Révision des projets et perfectionnement des compétences."
                }
            ]
        }
    },
    "Semaine 6": {
        "16 septembre - 22 septembre": {
            "Lundi 16 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Création d'une application complète et intégration des fonctionnalités avancées."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Optimisation des performances et gestion des états d'application."
                }
            ],
            "Mardi 17 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Utilisation des outils de test et débogage pour Angular."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Développement de fonctionnalités spécifiques et intégration d'API."
                }
            ],
            "Mercredi 18 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Révision et perfectionnement des projets Angular réalisés."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Travail sur des projets personnels Angular : Intégration des nouvelles compétences et optimisation des applications."
                }
            ],
            "Jeudi 19 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Exploration des fonctionnalités avancées et des meilleures pratiques."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Travail sur des projets personnels Angular : Intégration des meilleures pratiques et révision du code."
                }
            ],
            "Vendredi 20 septembre": [
                {
                    "time": "9h - 12h30",
                    "duration": "3h30",
                    "task": "Apprentissage d'Angular : Préparation d'un projet final pour démontrer les compétences acquises."
                },
                {
                    "time": "12h30 - 13h30",
                    "duration": "1h",
                    "task": "Pause déjeuner."
                },
                {
                    "time": "13h30 - 17h",
                    "duration": "3h30",
                    "task": "Travail sur le projet final Angular : Développement et intégration des fonctionnalités avancées."
                }
            ],
            "Samedi 21 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Finalisation du projet Angular : Revue et tests finaux."
                }
            ],
            "Dimanche 22 septembre": [
                {
                    "time": "9h - 12h",
                    "duration": "3h",
                    "task": "Travail sur le projet Angular : Finalisation et révision des détails du projet."
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
                    agendaContent += `<div align="left">${task.time} (${task.duration}): ${task.task}\n</div>`;
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
