// Fonction pour sélectionner une bibliothèque au hasard
function getRandomLibrary() {
  const index = Math.floor(Math.random() * libraries.length);
  return libraries[index];
}

// Fonction pour générer le contenu de l'agenda pour un jour spécifique
function generateDayAgenda(day) {
    let agendaContent = '';
    for (const [week, dates] of Object.entries(agenda)) {
        agendaContent += `## ${week}\n`;
        for (const [period, days] of Object.entries(dates)) {
            agendaContent += `### ${period}\n`;
            if (days[day]) {
                agendaContent += `#### ${day}\n`;
                days[day].forEach(task => {
                    agendaContent += `- ${task.time} (${task.duration}): ${task.task}\n`;
                });
            }
        }
        agendaContent += '\n';
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

  // Choisir un jour spécifique pour afficher l'agenda
  const dayToShow = "Mardi 13 août"; // Remplacez par le jour que vous voulez afficher

  // Ajouter l'agenda pour ce jour au README
  const agendaSectionPattern = /<!-- START_AGENDA_SECTION -->[\s\S]*?<!-- END_AGENDA_SECTION -->/;
  const newAgendaContent = generateDayAgenda(dayToShow);
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
