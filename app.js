const app = document.querySelector("#app");
const backButton = document.querySelector("#back-button");
const toast = document.querySelector("#toast");
const installCard = document.querySelector("#install-card");
const installButton = document.querySelector("#install-button");
const installClose = document.querySelector("#install-close");
const iosInstallSteps = document.querySelector("#ios-install-steps");

const STORAGE_KEY = "coachos-reflections-v1";
const TRAININGS_STORAGE_KEY = "coachos-trainings-v1";
const DRAFT_STORAGE_KEY = "coachos-training-draft-v1";
const PRINCIPLES_STORAGE_KEY = "coachos-principles-v1";
const KNOWLEDGE_STORAGE_KEY = "coachos-knowledge-v1";
const SEASONS_STORAGE_KEY = "coachos-seasons-v1";
const SEASON_WEEKS_STORAGE_KEY = "coachos-season-weeks-v1";
const PLAYERS_STORAGE_KEY = "coachos-players-v1";
const ATTENDANCE_STORAGE_KEY = "coachos-attendance-v1";
const INSTALL_HINT_KEY = "coachos-install-hint-dismissed-v1";
const TEAM_ID = "vsv-jo16-1";
const MAX_PDF_BYTES = 2 * 1024 * 1024;
const SEASON_WEEK_TYPES = [
  "Vrij",
  "Bekerpoule",
  "Beker",
  "Competitiewedstrijd",
  "Inhaalweekend",
  "Start nieuwe fase",
  "Schoolvakantie",
  "Feestdag",
  "Overig"
];
const SEASON_WEEK_STATUSES = [
  "Gepland",
  "Bevestigd",
  "Afgerond",
  "Vervallen"
];
const ATTENDANCE_STATUSES = [
  "Aanwezig",
  "Afwezig",
  "Ziek",
  "Geblesseerd",
  "Vakantie",
  "Te laat",
  "Eerder weg",
  "Onbekend"
];
const PRESENT_ATTENDANCE_STATUSES = ["Aanwezig", "Te laat", "Eerder weg"];
const ABSENT_ATTENDANCE_STATUSES = ["Afwezig", "Ziek", "Geblesseerd", "Vakantie"];
const PREFERRED_FOOT_OPTIONS = ["Rechts", "Links", "Tweebenig", "Onbekend"];
const SOURCE_TYPES = [
  "PDF",
  "Artikel",
  "Video",
  "Boek",
  "Podcast",
  "Eigen notitie",
  "Overig"
];
const PART_TYPES = [
  "Introductie",
  "Warming-up",
  "ASM",
  "Techniekvorm",
  "Positiespel",
  "Spelvorm",
  "Partijvorm",
  "Afsluiting",
  "Overig"
];
const TEMPLATE_DEFINITIONS = {
  empty: {
    label: "Leeg formulier",
    empty: true
  },
  transition: {
    label: "Omschakeltraining",
    theme: "[Omschrijf het specifieke moment na balwinst of balverlies.]",
    mainGoal: "[Beschrijf welk zichtbaar omschakelgedrag spelers beter uitvoeren.]",
    partTypes: ["Warming-up", "Positiespel", "Partijvorm"]
  },
  buildup: {
    label: "Opbouwtraining",
    theme: "[Omschrijf waar en onder welke druk de opbouw plaatsvindt.]",
    mainGoal: "[Beschrijf hoe spelers na deze training beter vooruit opbouwen.]",
    partTypes: ["Techniekvorm", "Positiespel", "Partijvorm"]
  },
  defending: {
    label: "Verdedigende training",
    theme: "[Omschrijf welk verdedigend teammoment centraal staat.]",
    mainGoal: "[Beschrijf welk zichtbaar verdedigend gedrag spelers beter uitvoeren.]",
    partTypes: ["ASM", "Spelvorm", "Partijvorm"]
  },
  attacking: {
    label: "Aanvalstraining",
    theme: "[Omschrijf hoe en waar het team kansen wil creëren.]",
    mainGoal: "[Beschrijf welk zichtbaar aanvallend gedrag spelers beter uitvoeren.]",
    partTypes: ["Warming-up", "Techniekvorm", "Partijvorm"]
  },
  observation: {
    label: "Observatietraining",
    theme: "[Omschrijf welk gedrag of teamprincipe je wilt observeren.]",
    mainGoal: "[Beschrijf welk gedrag je tijdens deze training gericht wilt waarnemen.]",
    partTypes: ["Introductie", "Spelvorm", "Partijvorm"]
  }
};
const FIELD_EXAMPLES = {
  mainGoal: "Spelers kunnen na balverlies binnen vijf seconden gezamenlijk druk op de bal zetten.",
  desiredBehavior: "Dichtste speler zet druk op de bal.\nTweede speler sluit de voorwaartse passlijn.",
  evaluationCriteria: "Bij 6 van de 10 balverliesmomenten reageert het hele team direct.\nDe as blijft aantoonbaar vaker gesloten.",
  materials: "12 pionnen\n8 hesjes\n6 ballen\n2 mini-doelen",
  organization: "6 tegen 6 + 2 keepers, veld 40 × 30 meter, twee grote doelen.",
  flow: "Na een doelpunt of uitbal start de keeper direct een nieuwe opbouw.",
  attackingCoaching: "Maak het veld breed.\nSpeel vooruit zodra dat kan.",
  defendingCoaching: "Houd de onderlinge afstanden klein.\nBescherm eerst de as.",
  transitionCoaching: "Reageer direct na balverlies.\nKijk na balwinst eerst vooruit.",
  rulesScoring: "Een doelpunt na een derde-manactie telt dubbel.",
  variations: "Maak het veld smaller.\nVoeg een neutrale speler toe.",
  partMaterials: "8 pionnen\n6 hesjes\n4 ballen\n2 doelen"
};

let toastTimer;
let draftTimer;
let formDirty = false;
let currentHash = window.location.hash || "#home";
let ignoreNextHashChange = false;
let deferredInstallPrompt = null;
const trainingListState = {
  query: "",
  block: "all",
  sort: "updated"
};

const routes = {
  home: { parent: null, render: renderHome },
  teams: { parent: "home", render: renderTeams },
  dashboard: { parent: "teams", render: renderDashboard },
  spelers: { parent: "dashboard", render: renderPlayers },
  "speler-nieuw": { parent: "spelers", render: renderPlayerForm },
  "speler-bewerken": { parent: "spelers", render: renderPlayerForm },
  aanwezigheidsstatistieken: { parent: "spelers", render: renderAttendanceStatistics },
  trainingen: { parent: "dashboard", render: renderTrainings },
  training: { parent: "trainingen", render: renderTrainingDetail },
  "training-nieuw": { parent: "trainingen", render: renderTrainingForm },
  "training-bewerken": { parent: "training", render: renderTrainingForm },
  reflectie: { parent: "training", render: renderReflection },
  playbook: { parent: "dashboard", render: renderPlaybook },
  spelprincipe: { parent: "playbook", render: renderPrincipleDetail },
  "spelprincipe-nieuw": { parent: "playbook", render: renderPrincipleForm },
  "spelprincipe-bewerken": { parent: "spelprincipe", render: renderPrincipleForm },
  "bron-nieuw": { parent: "spelprincipe", render: renderSourceForm },
  "bron-bewerken": { parent: "spelprincipe", render: renderSourceForm },
  seizoen: { parent: "dashboard", render: renderSeasonOverview },
  speelweek: { parent: "seizoen", render: renderSeasonWeekDetail },
  "speelweek-nieuw": { parent: "seizoen", render: renderSeasonWeekForm },
  "speelweek-bewerken": { parent: "speelweek", render: renderSeasonWeekForm }
};

function parseRoute() {
  const cleanHash = window.location.hash.replace(/^#\/?/, "");
  const [name = "home", id] = cleanHash.split("/");

  if (!routes[name]) {
    return { name: "home", id: null };
  }

  return { name, id: id || null };
}

function goTo(route, id) {
  if (formDirty) {
    const leave = window.confirm(
      "Je hebt niet-opgeslagen wijzigingen. Wil je dit formulier verlaten?"
    );

    if (!leave) return;
    persistCurrentDraft();
    formDirty = false;
  }

  window.location.hash = id ? `#${route}/${id}` : `#${route}`;
}

function getTrainings() {
  try {
    const saved = localStorage.getItem(TRAININGS_STORAGE_KEY);
    const trainings = saved ? JSON.parse(saved) : TRAININGS;
    return trainings.map(normalizeTraining);
  } catch (error) {
    console.warn("Trainingen konden niet worden gelezen.", error);
    return TRAININGS.map(normalizeTraining);
  }
}

function saveTrainings(trainings) {
  localStorage.setItem(
    TRAININGS_STORAGE_KEY,
    JSON.stringify(trainings.map(normalizeTraining))
  );
}

function saveTraining(training) {
  saveTrainings([...getTrainings(), normalizeTraining(training)]);
}

function updateTraining(training) {
  const normalized = normalizeTraining(training);
  saveTrainings(
    getTrainings().map((item) => item.id === normalized.id ? normalized : item)
  );
}

function duplicateTraining(id) {
  const source = getTraining(id);
  if (!source) return null;

  const now = new Date().toISOString();
  const duplicate = {
    ...JSON.parse(JSON.stringify(source)),
    id: createUniqueId("training"),
    title: `${source.title} Kopie`,
    parts: source.parts.map((part) => ({
      ...part,
      id: createUniqueId("onderdeel")
    })),
    createdAt: now,
    updatedAt: now
  };

  saveTraining(duplicate);
  return duplicate;
}

function useTrainingAsTemplate(id) {
  const source = getTraining(id);
  if (!source) return null;

  const now = new Date().toISOString();
  const templateCopy = {
    ...JSON.parse(JSON.stringify(source)),
    id: createUniqueId("training"),
    title: source.title.replace(/\s+Kopie$/i, ""),
    date: "",
    parts: source.parts.map((part) => ({
      ...part,
      id: createUniqueId("onderdeel")
    })),
    createdAt: now,
    updatedAt: now
  };

  saveTraining(templateCopy);
  return templateCopy;
}

function deleteTraining(id, deleteReflections = false) {
  saveTrainings(getTrainings().filter((training) => training.id !== id));
  removeTrainingFromSeasonWeeks(id);
  deleteAttendanceForEvent("training", id);

  if (deleteReflections) {
    saveReflections(
      getReflections().filter((reflection) => reflection.trainingId !== id)
    );
  }
}

function getTraining(id) {
  return getTrainings().find((training) => training.id === id);
}

function createUniqueId(prefix = "training") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizePlayer(player = {}) {
  const firstName = String(player.firstName || "").trim();
  const lastName = String(player.lastName || "").trim();

  return {
    id: player.id || createUniqueId("speler"),
    teamId: player.teamId || TEAM_ID,
    firstName,
    lastName,
    displayName: String(player.displayName || `${firstName} ${lastName}`).trim(),
    shirtNumber: player.shirtNumber === 0 ? 0 : player.shirtNumber || "",
    primaryPosition: String(player.primaryPosition || "").trim(),
    secondaryPosition: String(player.secondaryPosition || "").trim(),
    preferredFoot: PREFERRED_FOOT_OPTIONS.includes(player.preferredFoot)
      ? player.preferredFoot
      : "Onbekend",
    isActive: player.isActive !== false,
    createdAt: player.createdAt || "",
    updatedAt: player.updatedAt || ""
  };
}

function getPlayers() {
  try {
    const saved = JSON.parse(localStorage.getItem(PLAYERS_STORAGE_KEY)) || [];
    return saved.map(normalizePlayer);
  } catch (error) {
    console.warn("Spelers konden niet worden gelezen.", error);
    return [];
  }
}

function savePlayers(players) {
  localStorage.setItem(
    PLAYERS_STORAGE_KEY,
    JSON.stringify(players.map(normalizePlayer))
  );
}

function getPlayer(id) {
  return getPlayers().find((player) => player.id === id) || null;
}

function sortPlayers(players) {
  return [...players].sort((a, b) => (
    a.lastName.localeCompare(b.lastName, "nl", { sensitivity: "base" })
    || a.firstName.localeCompare(b.firstName, "nl", { sensitivity: "base" })
    || a.displayName.localeCompare(b.displayName, "nl", { sensitivity: "base" })
  ));
}

function getActivePlayers() {
  return sortPlayers(getPlayers().filter((player) => player.teamId === TEAM_ID && player.isActive));
}

function savePlayer(player) {
  savePlayers([...getPlayers(), normalizePlayer(player)]);
}

function updatePlayer(player) {
  const normalized = normalizePlayer(player);
  savePlayers(getPlayers().map((item) => item.id === normalized.id ? normalized : item));
}

function setPlayerActive(id, isActive) {
  const player = getPlayer(id);
  if (!player) return false;
  updatePlayer({ ...player, isActive, updatedAt: new Date().toISOString() });
  return true;
}

function deletePlayer(id) {
  savePlayers(getPlayers().filter((player) => player.id !== id));
  saveAttendanceRecords(getAttendanceRecords().filter((record) => record.playerId !== id));
}

function validatePlayer(player) {
  const errors = [];
  if (!player.firstName) errors.push("Vul een voornaam in.");
  if (!player.lastName) errors.push("Vul een achternaam in.");
  if (
    player.shirtNumber !== ""
    && (!Number.isInteger(Number(player.shirtNumber)) || Number(player.shirtNumber) < 0)
  ) {
    errors.push("Het rugnummer moet een positief heel getal zijn.");
  }
  return errors;
}

function attendanceKey(record) {
  return `${record.playerId}:${record.eventType}:${record.eventId}`;
}

function normalizeAttendanceRecord(record = {}) {
  return {
    id: record.id || createUniqueId("aanwezigheid"),
    teamId: record.teamId || TEAM_ID,
    playerId: String(record.playerId || ""),
    eventType: ["training", "seasonWeek"].includes(record.eventType)
      ? record.eventType
      : "training",
    eventId: String(record.eventId || ""),
    status: ATTENDANCE_STATUSES.includes(record.status) ? record.status : "Onbekend",
    note: String(record.note || "").trim(),
    createdAt: record.createdAt || "",
    updatedAt: record.updatedAt || ""
  };
}

function getAttendanceRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(ATTENDANCE_STORAGE_KEY)) || [];
    return saved.map(normalizeAttendanceRecord);
  } catch (error) {
    console.warn("Aanwezigheidsregistraties konden niet worden gelezen.", error);
    return [];
  }
}

function saveAttendanceRecords(records) {
  const unique = new Map();
  records.map(normalizeAttendanceRecord).forEach((record) => {
    unique.set(attendanceKey(record), record);
  });
  localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify([...unique.values()]));
}

function getAttendanceForEvent(eventType, eventId) {
  return getAttendanceRecords().filter((record) => (
    record.eventType === eventType && record.eventId === eventId
  ));
}

function upsertAttendanceRecords(records) {
  const merged = new Map(getAttendanceRecords().map((record) => [attendanceKey(record), record]));
  records.map(normalizeAttendanceRecord).forEach((record) => {
    const key = attendanceKey(record);
    const current = merged.get(key);
    merged.set(key, {
      ...record,
      id: current ? current.id : record.id,
      createdAt: current ? current.createdAt : record.createdAt
    });
  });
  saveAttendanceRecords([...merged.values()]);
}

function deleteAttendanceForEvent(eventType, eventId) {
  saveAttendanceRecords(getAttendanceRecords().filter((record) => !(
    record.eventType === eventType && record.eventId === eventId
  )));
}

function playerHasAttendance(playerId) {
  return getAttendanceRecords().some((record) => record.playerId === playerId);
}

function normalizeSeason(season = {}) {
  return {
    id: season.id || createUniqueId("seizoen"),
    teamId: season.teamId || "vsv-jo16-1",
    name: season.name || "",
    startDate: season.startDate || "",
    endDate: season.endDate || ""
  };
}

function normalizeSeasonWeek(week = {}) {
  const trainingIds = Array.isArray(week.trainingIds)
    ? [...new Set(week.trainingIds.filter((id) => typeof id === "string" && id))]
    : [];

  return {
    id: week.id || createUniqueId("speelweek"),
    seasonId: week.seasonId || "",
    dateFrom: week.dateFrom || "",
    dateTo: week.dateTo || week.dateFrom || "",
    type: SEASON_WEEK_TYPES.includes(week.type) ? week.type : "Overig",
    phase: week.phase || "",
    note: week.note || "",
    trainingWeekNumber: week.trainingWeekNumber === 0
      ? 0
      : week.trainingWeekNumber || "",
    status: SEASON_WEEK_STATUSES.includes(week.status) ? week.status : "Gepland",
    trainingIds,
    matchId: typeof week.matchId === "string" && week.matchId ? week.matchId : null,
    createdAt: week.createdAt || "",
    updatedAt: week.updatedAt || ""
  };
}

function getSeasons() {
  try {
    const saved = localStorage.getItem(SEASONS_STORAGE_KEY);
    const seasons = saved ? JSON.parse(saved) : SEASONS;
    return seasons.map(normalizeSeason);
  } catch (error) {
    console.warn("Seizoenen konden niet worden gelezen.", error);
    return SEASONS.map(normalizeSeason);
  }
}

function saveSeasons(seasons) {
  localStorage.setItem(
    SEASONS_STORAGE_KEY,
    JSON.stringify(seasons.map(normalizeSeason))
  );
}

function getSeason(id) {
  return getSeasons().find((season) => season.id === id);
}

function getTeamSeason() {
  return getSeasons().find((season) => season.teamId === "vsv-jo16-1") || null;
}

function getAllSeasonWeeks() {
  try {
    const saved = localStorage.getItem(SEASON_WEEKS_STORAGE_KEY);
    const weeks = saved ? JSON.parse(saved) : SEASON_WEEKS;
    return weeks.map(normalizeSeasonWeek);
  } catch (error) {
    console.warn("Speelweken konden niet worden gelezen.", error);
    return SEASON_WEEKS.map(normalizeSeasonWeek);
  }
}

function saveSeasonWeeks(weeks) {
  localStorage.setItem(
    SEASON_WEEKS_STORAGE_KEY,
    JSON.stringify(weeks.map(normalizeSeasonWeek))
  );
}

function getSeasonWeeks(seasonId) {
  return getAllSeasonWeeks()
    .filter((week) => week.seasonId === seasonId)
    .sort((a, b) => (
      a.dateFrom.localeCompare(b.dateFrom)
      || a.dateTo.localeCompare(b.dateTo)
      || a.id.localeCompare(b.id)
    ));
}

function getSeasonWeek(id) {
  return getAllSeasonWeeks().find((week) => week.id === id);
}

function saveSeasonWeek(week) {
  saveSeasonWeeks([...getAllSeasonWeeks(), normalizeSeasonWeek(week)]);
}

function updateSeasonWeek(week) {
  const normalized = normalizeSeasonWeek(week);
  saveSeasonWeeks(
    getAllSeasonWeeks().map((item) => item.id === normalized.id ? normalized : item)
  );
}

function duplicateSeasonWeek(id) {
  const source = getSeasonWeek(id);
  if (!source) return null;

  const now = new Date().toISOString();
  const duplicate = {
    ...source,
    id: createUniqueId("speelweek"),
    trainingIds: [],
    matchId: null,
    createdAt: now,
    updatedAt: now
  };

  saveSeasonWeek(duplicate);
  return duplicate;
}

function deleteSeasonWeek(id) {
  saveSeasonWeeks(getAllSeasonWeeks().filter((week) => week.id !== id));
  deleteAttendanceForEvent("seasonWeek", id);
}

function linkTrainingToSeasonWeek(weekId, trainingId) {
  const week = getSeasonWeek(weekId);
  if (!week || !getTraining(trainingId) || week.trainingIds.includes(trainingId)) {
    return false;
  }

  updateSeasonWeek({
    ...week,
    trainingIds: [...week.trainingIds, trainingId],
    updatedAt: new Date().toISOString()
  });
  return true;
}

function unlinkTrainingFromSeasonWeek(weekId, trainingId) {
  const week = getSeasonWeek(weekId);
  if (!week) return;

  updateSeasonWeek({
    ...week,
    trainingIds: week.trainingIds.filter((id) => id !== trainingId),
    updatedAt: new Date().toISOString()
  });
}

function removeTrainingFromSeasonWeeks(trainingId) {
  const weeks = getAllSeasonWeeks();
  const hasLink = weeks.some((week) => week.trainingIds.includes(trainingId));
  if (!hasLink) return;

  saveSeasonWeeks(weeks.map((week) => ({
    ...week,
    trainingIds: week.trainingIds.filter((id) => id !== trainingId)
  })));
}

function validateSeasonWeek(week) {
  const errors = [];

  if (!week.dateFrom) errors.push("Vul een begindatum in.");
  if (!week.dateTo) errors.push("Vul een einddatum in.");
  if (week.dateFrom && week.dateTo && week.dateTo < week.dateFrom) {
    errors.push("De einddatum mag niet vóór de begindatum liggen.");
  }
  if (!SEASON_WEEK_TYPES.includes(week.type)) {
    errors.push("Kies een geldig type speelweek.");
  }
  if (!SEASON_WEEK_STATUSES.includes(week.status)) {
    errors.push("Kies een geldige status.");
  }
  if (
    week.trainingWeekNumber !== ""
    && (!Number.isInteger(Number(week.trainingWeekNumber)) || Number(week.trainingWeekNumber) < 1)
  ) {
    errors.push("Het trainingsweeknummer moet een positief heel getal zijn.");
  }

  return errors;
}

function normalizePrinciple(principle = {}) {
  return {
    id: principle.id || createUniqueId("spelprincipe"),
    title: principle.title || "",
    description: principle.description || "",
    createdAt: principle.createdAt || "",
    updatedAt: principle.updatedAt || ""
  };
}

function getPrinciples() {
  try {
    const saved = localStorage.getItem(PRINCIPLES_STORAGE_KEY);
    const principles = saved ? JSON.parse(saved) : PRINCIPLES;
    return principles.map(normalizePrinciple);
  } catch (error) {
    console.warn("Spelprincipes konden niet worden gelezen.", error);
    return PRINCIPLES.map(normalizePrinciple);
  }
}

function savePrinciples(principles) {
  localStorage.setItem(
    PRINCIPLES_STORAGE_KEY,
    JSON.stringify(principles.map(normalizePrinciple))
  );
}

function getPrinciple(id) {
  return getPrinciples().find((principle) => principle.id === id);
}

function savePrinciple(principle) {
  savePrinciples([...getPrinciples(), normalizePrinciple(principle)]);
}

function updatePrinciple(principle) {
  const normalized = normalizePrinciple(principle);
  savePrinciples(
    getPrinciples().map((item) => item.id === normalized.id ? normalized : item)
  );
}

function normalizeFileReference(fileReference) {
  if (!fileReference || typeof fileReference !== "object") return null;

  return {
    name: fileReference.name || "document.pdf",
    type: fileReference.type || "application/pdf",
    size: Number(fileReference.size) || 0,
    dataUrl: fileReference.dataUrl || ""
  };
}

function normalizeSource(source = {}) {
  return {
    id: source.id || createUniqueId("bron"),
    title: source.title || "",
    type: SOURCE_TYPES.includes(source.type) ? source.type : "Overig",
    url: source.url || "",
    fileReference: normalizeFileReference(source.fileReference),
    author: source.author || "",
    summary: source.summary || "",
    keyInsight: source.keyInsight || "",
    notes: source.notes || "",
    primaryPrincipleId: source.primaryPrincipleId || "",
    createdAt: source.createdAt || "",
    updatedAt: source.updatedAt || ""
  };
}

function normalizeKnowledgeBase(value = {}) {
  const sources = Array.isArray(value.sources)
    ? value.sources.map(normalizeSource)
    : [];
  const sourceIds = new Set(sources.map((source) => source.id));
  const seenRelations = new Set();
  const principleSources = Array.isArray(value.principleSources)
    ? value.principleSources
      .filter((relation) => relation && sourceIds.has(relation.sourceId) && relation.principleId)
      .map((relation) => ({
        id: relation.id || `koppeling-${relation.principleId}-${relation.sourceId}`,
        principleId: relation.principleId,
        sourceId: relation.sourceId,
        createdAt: relation.createdAt || ""
      }))
      .filter((relation) => {
        const key = `${relation.principleId}:${relation.sourceId}`;
        if (seenRelations.has(key)) return false;
        seenRelations.add(key);
        return true;
      })
    : [];

  return { sources, principleSources };
}

function getKnowledgeBase() {
  try {
    const saved = localStorage.getItem(KNOWLEDGE_STORAGE_KEY);
    return normalizeKnowledgeBase(saved ? JSON.parse(saved) : {});
  } catch (error) {
    console.warn("De kennisbank kon niet worden gelezen.", error);
    return normalizeKnowledgeBase();
  }
}

function saveKnowledgeBase(knowledgeBase) {
  localStorage.setItem(
    KNOWLEDGE_STORAGE_KEY,
    JSON.stringify(normalizeKnowledgeBase(knowledgeBase))
  );
}

function getSource(id) {
  return getKnowledgeBase().sources.find((source) => source.id === id);
}

function getSourcesForPrinciple(principleId) {
  const knowledgeBase = getKnowledgeBase();
  const linkedIds = new Set(
    knowledgeBase.principleSources
      .filter((relation) => relation.principleId === principleId)
      .map((relation) => relation.sourceId)
  );

  return knowledgeBase.sources
    .filter((source) => linkedIds.has(source.id))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

function saveSourceForPrinciple(source, principleId) {
  const knowledgeBase = getKnowledgeBase();
  const normalized = normalizeSource({
    ...source,
    primaryPrincipleId: source.primaryPrincipleId || principleId
  });
  const sourceExists = knowledgeBase.sources.some((item) => item.id === normalized.id);
  const sources = sourceExists
    ? knowledgeBase.sources.map((item) => item.id === normalized.id ? normalized : item)
    : [...knowledgeBase.sources, normalized];
  const relationExists = knowledgeBase.principleSources.some((relation) => (
    relation.principleId === principleId && relation.sourceId === normalized.id
  ));
  const principleSources = relationExists
    ? knowledgeBase.principleSources
    : [
      ...knowledgeBase.principleSources,
      {
        id: createUniqueId("koppeling"),
        principleId,
        sourceId: normalized.id,
        createdAt: new Date().toISOString()
      }
    ];

  saveKnowledgeBase({ sources, principleSources });
  return normalized;
}

function removeSourceFromPrinciple(sourceId, principleId) {
  const knowledgeBase = getKnowledgeBase();
  const principleSources = knowledgeBase.principleSources.filter((relation) => !(
    relation.principleId === principleId && relation.sourceId === sourceId
  ));
  const remainingRelations = principleSources.filter((relation) => relation.sourceId === sourceId);
  const sources = knowledgeBase.sources
    .filter((source) => source.id !== sourceId || remainingRelations.length)
    .map((source) => {
      if (
        source.id === sourceId
        && source.primaryPrincipleId === principleId
        && remainingRelations.length
      ) {
        return { ...source, primaryPrincipleId: remainingRelations[0].principleId };
      }

      return source;
    });

  saveKnowledgeBase({ sources, principleSources });
  return remainingRelations.length === 0;
}

function deletePrinciple(id) {
  savePrinciples(getPrinciples().filter((principle) => principle.id !== id));

  const knowledgeBase = getKnowledgeBase();
  const removedSourceIds = new Set(
    knowledgeBase.principleSources
      .filter((relation) => relation.principleId === id)
      .map((relation) => relation.sourceId)
  );
  const principleSources = knowledgeBase.principleSources
    .filter((relation) => relation.principleId !== id);
  const linkedSourceIds = new Set(principleSources.map((relation) => relation.sourceId));
  const sources = knowledgeBase.sources
    .filter((source) => !removedSourceIds.has(source.id) || linkedSourceIds.has(source.id))
    .map((source) => {
      if (source.primaryPrincipleId !== id) return source;
      const nextRelation = principleSources.find((relation) => relation.sourceId === source.id);
      return { ...source, primaryPrincipleId: nextRelation ? nextRelation.principleId : "" };
    });

  saveKnowledgeBase({ sources, principleSources });
}

function createEmptyPrinciple() {
  return {
    id: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: ""
  };
}

function createEmptySource(principleId = "") {
  return {
    id: "",
    title: "",
    type: "Artikel",
    url: "",
    fileReference: null,
    author: "",
    summary: "",
    keyInsight: "",
    notes: "",
    primaryPrincipleId: principleId,
    createdAt: "",
    updatedAt: ""
  };
}

function validatePrinciple(principle) {
  return principle.title.trim() ? [] : ["Vul een titel voor het spelprincipe in."];
}

function isValidSourceUrl(value) {
  if (!value) return true;

  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch (error) {
    return false;
  }
}

function validateSource(source) {
  const errors = [];

  if (!source.title.trim()) errors.push("Vul een titel voor de bron in.");
  if (!SOURCE_TYPES.includes(source.type)) errors.push("Kies een geldig brontype.");
  if (!isValidSourceUrl(source.url)) {
    errors.push("Vul een geldige link in die begint met http:// of https://.");
  }

  return errors;
}

async function validatePdfFile(file) {
  if (!file) return "";
  if (file.size > MAX_PDF_BYTES) return "Het PDF-bestand mag maximaal 2 MB groot zijn.";
  if (!file.name.toLocaleLowerCase("nl").endsWith(".pdf")) {
    return "Kies een bestand met de extensie .pdf.";
  }
  if (file.type && file.type !== "application/pdf") {
    return "Alleen PDF-bestanden zijn toegestaan.";
  }

  try {
    const signature = new TextDecoder().decode(await file.slice(0, 5).arrayBuffer());
    return signature === "%PDF-" ? "" : "Het gekozen bestand is geen geldige PDF.";
  } catch (error) {
    return "Het PDF-bestand kon niet worden gecontroleerd.";
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(new Error("Bestand lezen mislukt")));
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl) {
  const [header, encoded] = String(dataUrl).split(",");
  const mimeMatch = header.match(/^data:([^;]+);base64$/);
  if (!mimeMatch || !encoded) throw new Error("Ongeldige bestandsdata");

  const binary = window.atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mimeMatch[1] });
}

function openKnowledgeSource(sourceId) {
  const source = getSource(sourceId);
  if (!source) return;

  if (source.fileReference && source.fileReference.dataUrl) {
    try {
      const fileUrl = URL.createObjectURL(dataUrlToBlob(source.fileReference.dataUrl));
      const opened = window.open(fileUrl, "_blank", "noopener,noreferrer");
      if (opened) opened.opener = null;
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 60000);
      return;
    } catch (error) {
      console.warn("Het PDF-bestand kon niet worden geopend.", error);
      showToast("Het PDF-bestand kon niet worden geopend");
      return;
    }
  }

  if (source.url) {
    const opened = window.open(source.url, "_blank", "noopener,noreferrer");
    if (opened) opened.opener = null;
    return;
  }

  showToast("Deze bron heeft geen link of PDF-bestand");
}

function normalizeTraining(training) {
  const id = training.id || createUniqueId("training");
  const sourceParts = training.parts || training.exercises || [];
  const legacyDuration = Number.parseInt(training.duration, 10);
  const defaultBlock = !training.code
    ? ""
    : training.code.startsWith("RM-00")
      ? "Fundament"
      : "Teamprincipes";

  return {
    id,
    code: training.code || "",
    title: training.title || "",
    date: training.date || "",
    theme: training.theme || "",
    block: training.block || defaultBlock,
    totalDuration: Number(training.totalDuration)
      || (Number.isFinite(legacyDuration) ? legacyDuration : 0),
    mainGoal: training.mainGoal || training.goal || "",
    desiredBehavior: training.desiredBehavior
      || (Array.isArray(training.coachingPoints)
        ? training.coachingPoints.join("\n")
        : ""),
    evaluationCriteria: Array.isArray(training.evaluationCriteria)
      ? training.evaluationCriteria.join("\n")
      : training.evaluationCriteria || "",
    materials: Array.isArray(training.materials)
      ? training.materials.join("\n")
      : training.materials || "",
    parts: sourceParts.map((part, index) => ({
      id: part.id || `${id}-onderdeel-${index + 1}`,
      name: part.name || "",
      type: PART_TYPES.includes(part.type) ? part.type : "Overig",
      duration: Number(part.duration) || 0,
      organization: part.organization || "",
      flow: part.flow || part.explanation || part.detail || "",
      attackingCoaching: part.attackingCoaching
        || (Array.isArray(part.coachingPoints)
          ? part.coachingPoints.join("\n")
          : part.coachingPoints || ""),
      defendingCoaching: part.defendingCoaching || "",
      transitionCoaching: part.transitionCoaching || "",
      rulesScoring: part.rulesScoring || part.rules || "",
      variations: Array.isArray(part.variations)
        ? part.variations.join("\n")
        : part.variations || "",
      materials: Array.isArray(part.materials)
        ? part.materials.join("\n")
        : part.materials || ""
    })),
    createdAt: training.createdAt || "",
    updatedAt: training.updatedAt || ""
  };
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function linesToSafeList(value) {
  const lines = String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return "";

  return `
    <ul class="detail-line-list">
      ${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
    </ul>
  `;
}

function renderFieldSupport(hint, exampleKey) {
  const example = FIELD_EXAMPLES[exampleKey];

  return `
    <div class="field-support">
      <span class="field-hint">${escapeHtml(hint)}</span>
      ${example ? `
        <button class="example-button" type="button" data-toggle-example>
          Voorbeeld tonen
        </button>
      ` : ""}
    </div>
    ${example ? `
      <div class="field-example" hidden>
        <strong>Voorbeeld</strong>
        <span>${escapeHtml(example)}</span>
      </div>
    ` : ""}
  `;
}

function createEmptyTraining() {
  return {
    id: "",
    code: "",
    title: "",
    date: "",
    theme: "",
    block: "",
    totalDuration: 0,
    mainGoal: "",
    desiredBehavior: "",
    evaluationCriteria: "",
    materials: "",
    parts: [createEmptyPart()],
    createdAt: "",
    updatedAt: ""
  };
}

function createTrainingFromTemplate(templateKey) {
  const definition = TEMPLATE_DEFINITIONS[templateKey] || TEMPLATE_DEFINITIONS.empty;
  if (definition.empty) return createEmptyTraining();

  return {
    ...createEmptyTraining(),
    title: `[Geef de ${definition.label.toLowerCase()} een korte herkenbare titel.]`,
    theme: definition.theme,
    block: "[Koppel de training aan het juiste trainingsblok.]",
    mainGoal: definition.mainGoal,
    desiredBehavior: "[Eén concreet en zichtbaar gedrag per regel.]",
    evaluationCriteria: "[Beschrijf drie waarneembare signalen waaraan je succes herkent.]",
    materials: "[Noteer ieder benodigd materiaal op een aparte regel.]",
    parts: definition.partTypes.map((type, index) => ({
      ...createEmptyPart(),
      name: `[Geef onderdeel ${index + 1} een korte functionele naam.]`,
      type,
      organization: "[Noem aantallen, veldafmetingen, doelen en startposities.]",
      flow: "[Beschrijf stap voor stap wat spelers doen en wanneer de vorm opnieuw start.]",
      attackingCoaching: "[Noteer korte aanvallende aanwijzingen, één per regel.]",
      defendingCoaching: "[Noteer korte verdedigende aanwijzingen, één per regel.]",
      transitionCoaching: "[Noteer aanwijzingen voor balwinst en balverlies, één per regel.]",
      rulesScoring: "[Beschrijf spelregels, scoringswijze en eventuele bonuspunten.]",
      variations: "[Noteer manieren om de vorm makkelijker of moeilijker te maken.]",
      materials: "[Noteer de materialen voor dit onderdeel, één per regel.]"
    }))
  };
}

function getReflections() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.warn("Reflecties konden niet worden gelezen.", error);
    return [];
  }
}

function saveReflection(reflection) {
  const reflections = getReflections();
  reflections.push(reflection);
  saveReflections(reflections);
}

function saveReflections(reflections) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
}

function reflectionsFor(trainingId) {
  return getReflections()
    .filter((reflection) => reflection.trainingId === trainingId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getDraft() {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY));
  } catch (error) {
    console.warn("Het concept kon niet worden gelezen.", error);
    return null;
  }
}

function saveDraft(draft) {
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
    ...draft,
    savedAt: new Date().toISOString()
  }));
}

function clearDraft() {
  localStorage.removeItem(DRAFT_STORAGE_KEY);
}

function validateTraining(training) {
  const errors = [];

  if (!training.code.trim()) errors.push("Vul een RM-code in.");
  if (!training.title.trim()) errors.push("Vul een titel in.");
  if (!training.parts.length) {
    errors.push("Voeg minimaal één trainingsonderdeel toe.");
  }

  training.parts.forEach((part, index) => {
    if (!part.name.trim()) {
      errors.push(`Vul een naam in voor onderdeel ${index + 1}.`);
    }
  });

  return errors;
}

function exportData() {
  return {
    app: "CoachOS",
    version: 5,
    exportedAt: new Date().toISOString(),
    trainings: getTrainings(),
    reflections: getReflections(),
    principles: getPrinciples(),
    knowledgeBase: getKnowledgeBase(),
    seasons: getSeasons(),
    seasonWeeks: getAllSeasonWeeks(),
    players: getPlayers(),
    attendance: getAttendanceRecords()
  };
}

function downloadBackup(data = exportData()) {
  const date = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `coachos-backup-${date}.json`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function validateImport(data) {
  if (!data || data.app !== "CoachOS") {
    return "Dit is geen geldig CoachOS-back-upbestand.";
  }

  if (!Array.isArray(data.trainings) || !Array.isArray(data.reflections)) {
    return "De back-up mist trainingen of reflecties.";
  }

  const trainingIds = data.trainings.map((training) => training && training.id);
  if (
    trainingIds.some((id) => typeof id !== "string" || !id)
    || new Set(trainingIds).size !== trainingIds.length
  ) {
    return "De back-up bevat ongeldige of dubbele training-id’s.";
  }

  const invalidTraining = data.trainings
    .map(normalizeTraining)
    .find((training) => validateTraining(training).length);

  if (invalidTraining) {
    return "Minimaal één training in de back-up is niet compleet.";
  }

  const invalidReflection = data.reflections.some((reflection) => (
    !reflection
    || typeof reflection.id !== "string"
    || typeof reflection.trainingId !== "string"
    || typeof reflection.createdAt !== "string"
  ));

  const reflectionIds = data.reflections.map((reflection) => reflection && reflection.id);
  if (new Set(reflectionIds).size !== reflectionIds.length) {
    return "De back-up bevat dubbele reflectie-id’s.";
  }

  if (invalidReflection) {
    return "Minimaal één reflectie in de back-up is niet geldig.";
  }

  const hasKnowledgeData = Number(data.version) >= 3
    || data.principles !== undefined
    || data.knowledgeBase !== undefined;

  if (!hasKnowledgeData) return "";
  if (!Array.isArray(data.principles)) {
    return "De back-up mist de spelprincipes.";
  }
  if (
    !data.knowledgeBase
    || !Array.isArray(data.knowledgeBase.sources)
    || !Array.isArray(data.knowledgeBase.principleSources)
  ) {
    return "De back-up mist geldige kennisbankgegevens.";
  }

  const principles = data.principles.map(normalizePrinciple);
  const principleIds = data.principles.map((principle) => principle && principle.id);
  if (
    principleIds.some((id) => typeof id !== "string" || !id)
    || new Set(principleIds).size !== principleIds.length
    || principles.some((principle) => validatePrinciple(principle).length)
  ) {
    return "De back-up bevat ongeldige of dubbele spelprincipes.";
  }

  const sources = data.knowledgeBase.sources.map(normalizeSource);
  const sourceIds = data.knowledgeBase.sources.map((source) => source && source.id);
  if (
    sourceIds.some((id) => typeof id !== "string" || !id)
    || new Set(sourceIds).size !== sourceIds.length
    || sources.some((source) => validateSource(source).length)
  ) {
    return "De back-up bevat ongeldige of dubbele bronnen.";
  }

  const invalidFile = sources.some((source) => {
    const file = source.fileReference;
    return file && (
      file.type !== "application/pdf"
      || file.size > MAX_PDF_BYTES
      || !file.dataUrl.startsWith("data:application/pdf;base64,")
    );
  });
  if (invalidFile) return "De back-up bevat een ongeldig of te groot PDF-bestand.";

  const principleIdSet = new Set(principleIds);
  const sourceIdSet = new Set(sourceIds);
  const relationKeys = data.knowledgeBase.principleSources.map((relation) => (
    relation && `${relation.principleId}:${relation.sourceId}`
  ));
  const invalidRelation = data.knowledgeBase.principleSources.some((relation) => (
    !relation
    || !principleIdSet.has(relation.principleId)
    || !sourceIdSet.has(relation.sourceId)
  ));
  if (invalidRelation || new Set(relationKeys).size !== relationKeys.length) {
    return "De back-up bevat ongeldige of dubbele bronkoppelingen.";
  }

  const linkedSourceIds = new Set(
    data.knowledgeBase.principleSources.map((relation) => relation.sourceId)
  );
  if (sources.some((source) => !linkedSourceIds.has(source.id))) {
    return "De back-up bevat een bron zonder gekoppeld spelprincipe.";
  }
  if (sources.some((source) => (
    !principleIdSet.has(source.primaryPrincipleId)
    || !data.knowledgeBase.principleSources.some((relation) => (
      relation.sourceId === source.id
      && relation.principleId === source.primaryPrincipleId
    ))
  ))) {
    return "De back-up bevat een bron zonder geldige hoofdlocatie.";
  }

  const hasSeasonData = Number(data.version) >= 4
    || data.seasons !== undefined
    || data.seasonWeeks !== undefined;
  if (!hasSeasonData) return "";

  if (!Array.isArray(data.seasons) || !Array.isArray(data.seasonWeeks)) {
    return "De back-up mist geldige seizoensgegevens.";
  }

  const seasonIds = data.seasons.map((season) => season && season.id);
  const invalidSeason = data.seasons.some((season) => (
    !season
    || typeof season.id !== "string"
    || !season.id
    || typeof season.teamId !== "string"
    || !season.teamId
    || typeof season.name !== "string"
    || typeof season.startDate !== "string"
    || !season.startDate
    || typeof season.endDate !== "string"
    || !season.endDate
    || season.endDate < season.startDate
  ));
  if (invalidSeason || new Set(seasonIds).size !== seasonIds.length) {
    return "De back-up bevat ongeldige of dubbele seizoenen.";
  }

  const seasonIdSet = new Set(seasonIds);
  const trainingIdSet = new Set(trainingIds);
  const weekIds = data.seasonWeeks.map((week) => week && week.id);
  const invalidWeek = data.seasonWeeks.some((week) => {
    if (
      !week
      || typeof week.id !== "string"
      || !week.id
      || !seasonIdSet.has(week.seasonId)
      || !SEASON_WEEK_TYPES.includes(week.type)
      || !SEASON_WEEK_STATUSES.includes(week.status)
      || !Array.isArray(week.trainingIds)
      || week.trainingIds.some((id) => !trainingIdSet.has(id))
      || new Set(week.trainingIds).size !== week.trainingIds.length
      || (week.matchId !== null && week.matchId !== undefined && typeof week.matchId !== "string")
    ) {
      return true;
    }

    return validateSeasonWeek(normalizeSeasonWeek(week)).length > 0;
  });
  if (invalidWeek || new Set(weekIds).size !== weekIds.length) {
    return "De back-up bevat ongeldige of dubbele speelweken.";
  }

  const hasPlayerData = Number(data.version) >= 5
    || data.players !== undefined
    || data.attendance !== undefined;
  if (!hasPlayerData) return "";

  if (!Array.isArray(data.players) || !Array.isArray(data.attendance)) {
    return "De back-up mist geldige spelers- of aanwezigheidsgegevens.";
  }

  const playerIds = data.players.map((player) => player && player.id);
  const players = data.players.map(normalizePlayer);
  if (
    playerIds.some((id) => typeof id !== "string" || !id)
    || new Set(playerIds).size !== playerIds.length
    || players.some((player) => player.teamId !== TEAM_ID || validatePlayer(player).length)
  ) {
    return "De back-up bevat ongeldige of dubbele spelers.";
  }

  const playerIdSet = new Set(playerIds);
  const weekIdSet = new Set(weekIds);
  const attendanceIds = data.attendance.map((record) => record && record.id);
  const attendanceKeys = data.attendance.map((record) => record && attendanceKey(record));
  const invalidAttendance = data.attendance.some((record) => (
    !record
    || typeof record.id !== "string"
    || !record.id
    || record.teamId !== TEAM_ID
    || !playerIdSet.has(record.playerId)
    || !["training", "seasonWeek"].includes(record.eventType)
    || (record.eventType === "training" && !trainingIdSet.has(record.eventId))
    || (record.eventType === "seasonWeek" && !weekIdSet.has(record.eventId))
    || !ATTENDANCE_STATUSES.includes(record.status)
    || typeof record.note !== "string"
  ));
  if (
    invalidAttendance
    || new Set(attendanceIds).size !== attendanceIds.length
    || new Set(attendanceKeys).size !== attendanceKeys.length
  ) {
    return "De back-up bevat ongeldige of dubbele aanwezigheidsregistraties.";
  }

  return "";
}

function mergeById(current, imported) {
  const merged = new Map(current.map((item) => [item.id, item]));
  imported.forEach((item) => merged.set(item.id, item));
  return [...merged.values()];
}

function mergeAttendance(current, imported) {
  const merged = new Map(current.map((record) => [attendanceKey(record), record]));
  imported.forEach((record) => merged.set(attendanceKey(record), record));
  return [...merged.values()];
}

function importData(data, mode) {
  const importedTrainings = data.trainings.map(normalizeTraining);
  const hasKnowledgeData = Array.isArray(data.principles)
    && data.knowledgeBase
    && Array.isArray(data.knowledgeBase.sources)
    && Array.isArray(data.knowledgeBase.principleSources);
  const importedPrinciples = hasKnowledgeData
    ? data.principles.map(normalizePrinciple)
    : [];
  const importedKnowledge = hasKnowledgeData
    ? normalizeKnowledgeBase(data.knowledgeBase)
    : null;
  const hasSeasonData = Array.isArray(data.seasons)
    && Array.isArray(data.seasonWeeks);
  const importedSeasons = hasSeasonData
    ? data.seasons.map(normalizeSeason)
    : [];
  const importedSeasonWeeks = hasSeasonData
    ? data.seasonWeeks.map(normalizeSeasonWeek)
    : [];
  const hasPlayerData = Array.isArray(data.players)
    && Array.isArray(data.attendance);
  const importedPlayers = hasPlayerData ? data.players.map(normalizePlayer) : [];
  const importedAttendance = hasPlayerData
    ? data.attendance.map(normalizeAttendanceRecord)
    : [];

  if (mode === "replace") {
    downloadBackup();
    if (hasKnowledgeData) {
      saveKnowledgeBase(importedKnowledge);
      savePrinciples(importedPrinciples);
    }
    if (hasSeasonData) {
      saveSeasons(importedSeasons);
      saveSeasonWeeks(importedSeasonWeeks);
    }
    if (hasPlayerData) {
      savePlayers(importedPlayers);
      saveAttendanceRecords(importedAttendance);
    }
    saveTrainings(importedTrainings);
    saveReflections(data.reflections);
    return;
  }

  if (hasKnowledgeData) {
    const currentKnowledge = getKnowledgeBase();
    saveKnowledgeBase({
      sources: mergeById(currentKnowledge.sources, importedKnowledge.sources),
      principleSources: mergeById(
        currentKnowledge.principleSources,
        importedKnowledge.principleSources
      )
    });
    savePrinciples(mergeById(getPrinciples(), importedPrinciples));
  }
  if (hasSeasonData) {
    saveSeasons(mergeById(getSeasons(), importedSeasons));
    saveSeasonWeeks(mergeById(getAllSeasonWeeks(), importedSeasonWeeks));
  }
  if (hasPlayerData) {
    savePlayers(mergeById(getPlayers(), importedPlayers));
    saveAttendanceRecords(mergeAttendance(getAttendanceRecords(), importedAttendance));
  }
  saveTrainings(mergeById(getTrainings(), importedTrainings));
  saveReflections(mergeById(getReflections(), data.reflections));
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
}

function isIOSDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    || (
      window.navigator.platform === "MacIntel"
      && window.navigator.maxTouchPoints > 1
    );
}

function showBrowserInstallCard() {
  if (!installCard || isStandaloneMode()) return;

  installCard.hidden = false;
  installButton.hidden = false;
  iosInstallSteps.hidden = true;
}

function showIOSInstallCard() {
  if (
    !installCard
    || isStandaloneMode()
    || localStorage.getItem(INSTALL_HINT_KEY) === "true"
  ) {
    return;
  }

  installCard.hidden = false;
  installButton.hidden = true;
  iosInstallSteps.hidden = false;
}

function setupInstallExperience() {
  if (!installCard) return;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showBrowserInstallCard();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    installCard.hidden = true;
    showToast("CoachOS is geïnstalleerd");
  });

  installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;

    if (choice.outcome === "accepted") {
      installCard.hidden = true;
    }
  });

  installClose.addEventListener("click", () => {
    installCard.hidden = true;

    if (isIOSDevice()) {
      localStorage.setItem(INSTALL_HINT_KEY, "true");
    }
  });

  if (isIOSDevice()) showIOSInstallCard();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then((registration) => {
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;

          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              showToast("Nieuwe versie beschikbaar. Ververs CoachOS.");
            }
          });
        });
      })
      .catch((error) => {
        console.warn("Offline ondersteuning kon niet worden gestart.", error);
      });
  });
}

function getParentIdForRoute(route) {
  if ([
    "training-bewerken",
    "reflectie",
    "spelprincipe-bewerken",
    "speelweek-bewerken"
  ].includes(route.name)) {
    return route.id || "";
  }
  if (route.name === "bron-nieuw") return route.id || "";
  if (route.name === "bron-bewerken") return parseSourceRouteId(route.id).principleId;
  return "";
}

function renderApp() {
  const route = parseRoute();
  const routeConfig = routes[route.name];

  backButton.hidden = !routeConfig.parent;
  backButton.dataset.parent = routeConfig.parent || "";
  backButton.dataset.parentId = getParentIdForRoute(route);

  routeConfig.render(route.id);
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
  window.CoachOSReady = true;
}

function renderHome() {
  app.innerHTML = `
    <section class="screen screen-home" aria-labelledby="home-title">
      <div>
        <div class="logo-stage" aria-label="Ruimte voor het VSV-logo">
          <div class="club-mark" aria-hidden="true"><span>VSV</span></div>
        </div>
        <div class="home-copy">
          <p class="eyebrow">Jeugdopleiding</p>
          <h1 id="home-title">VSV Velserbroek</h1>
          <p class="lead">Alles voor jouw team, trainingen en ontwikkeling op één rustige plek.</p>
        </div>
      </div>
      <div class="home-action">
        <button class="primary-button" type="button" data-route="teams">Open VSV</button>
      </div>
    </section>
  `;
}

function renderTeams() {
  app.innerHTML = `
    <section class="screen" aria-labelledby="teams-title">
      <header class="screen-header">
        <p class="eyebrow">Mijn teams</p>
        <h1 id="teams-title">Kies je team</h1>
        <p class="lead">Open het teamdashboard om je training voor te bereiden.</p>
      </header>

      <button class="team-card" type="button" data-route="dashboard">
        <span class="team-stripe" aria-hidden="true"></span>
        <span class="team-card-content">
          <span class="team-label">VSV Velserbroek</span>
          <span class="team-name">JO16-1</span>
          <span class="team-meta">Seizoen 2026–2027</span>
        </span>
        <span class="arrow" aria-hidden="true">→</span>
      </button>
    </section>
  `;
}

function parseLocalDate(value) {
  const [year, month, day] = String(value || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatSeasonDate(value, options = {}) {
  const date = parseLocalDate(value);
  if (!date) return "Onbekende datum";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    ...options
  }).format(date);
}

function formatSeasonDateRange(dateFrom, dateTo, includeYear = true) {
  if (!dateFrom) return "Datum ontbreekt";
  if (!dateTo || dateFrom === dateTo) {
    return formatSeasonDate(dateFrom, includeYear ? { year: "numeric" } : {});
  }

  const start = parseLocalDate(dateFrom);
  const end = parseLocalDate(dateTo);
  if (!start || !end) return "Datum ontbreekt";

  const startOptions = start.getFullYear() === end.getFullYear()
    && start.getMonth() === end.getMonth()
    ? { day: "numeric" }
    : { day: "numeric", month: "short" };
  const endOptions = includeYear
    ? { day: "numeric", month: "short", year: "numeric" }
    : { day: "numeric", month: "short" };

  return `${formatSeasonDate(dateFrom, startOptions)} – ${formatSeasonDate(dateTo, endOptions)}`;
}

function daysUntil(dateValue, now = new Date()) {
  const target = parseLocalDate(dateValue);
  if (!target) return 0;
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const targetUtc = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.max(0, Math.round((targetUtc - todayUtc) / 86400000));
}

function getCurrentPhase(weeks, todayKey = getLocalDateKey()) {
  const ranges = new Map();

  weeks
    .filter((week) => week.phase && week.status !== "Vervallen")
    .forEach((week) => {
      const current = ranges.get(week.phase) || {
        phase: week.phase,
        dateFrom: week.dateFrom,
        dateTo: week.dateTo
      };
      current.dateFrom = current.dateFrom < week.dateFrom ? current.dateFrom : week.dateFrom;
      current.dateTo = current.dateTo > week.dateTo ? current.dateTo : week.dateTo;
      ranges.set(week.phase, current);
    });

  const active = [...ranges.values()]
    .filter((range) => range.dateFrom <= todayKey && range.dateTo >= todayKey)
    .sort((a, b) => b.dateFrom.localeCompare(a.dateFrom))[0];

  return active ? active.phase : "Geen actieve competitiefase";
}

function getNextSeasonWeek(weeks, todayKey = getLocalDateKey()) {
  return weeks.find((week) => (
    week.status !== "Vervallen" && week.dateTo >= todayKey
  )) || null;
}

function getNextCompetitionRound(weeks, todayKey = getLocalDateKey()) {
  return weeks.find((week) => (
    week.status !== "Vervallen"
    && week.dateTo >= todayKey
    && ["Competitiewedstrijd", "Start nieuwe fase"].includes(week.type)
  )) || null;
}

function renderDashboardScheduleItem(label, week) {
  if (!week) {
    return `
      <div class="season-summary-item">
        <span>${escapeHtml(label)}</span>
        <strong>Geen periode gepland</strong>
      </div>
    `;
  }

  const days = daysUntil(week.dateFrom);
  const dayLabel = days === 0 ? "Vandaag" : `Over ${days} ${days === 1 ? "dag" : "dagen"}`;

  return `
    <button class="season-summary-item season-summary-link" type="button" data-season-week="${escapeHtml(week.id)}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(formatSeasonDateRange(week.dateFrom, week.dateTo))}</strong>
      <small>${escapeHtml(week.type)} · ${escapeHtml(dayLabel)}</small>
    </button>
  `;
}

function renderDashboard() {
  const trainingCount = getTrainings().length;
  const principleCount = getPrinciples().length;
  const playerCount = getActivePlayers().length;
  const season = getTeamSeason();
  const weeks = season ? getSeasonWeeks(season.id) : [];
  const nextWeek = getNextSeasonWeek(weeks);
  const nextCompetition = getNextCompetitionRound(weeks);
  const linkedTrainingCount = nextWeek ? nextWeek.trainingIds.length : 0;

  app.innerHTML = `
    <section class="screen" aria-labelledby="dashboard-title">
      <div class="dashboard-hero">
        <p class="eyebrow">Teamdashboard</p>
        <h1 id="dashboard-title">JO16-1</h1>
        <p>VSV Velserbroek · Jeugdopleiding</p>
      </div>

      <div class="dashboard-grid" aria-label="Teamonderdelen">
        <button class="dashboard-button active" type="button" data-route="trainingen">
          <span class="dashboard-icon" aria-hidden="true">T</span>
          <span class="dashboard-title">Trainingen</span>
          <span class="dashboard-state">${trainingCount} ${trainingCount === 1 ? "programma" : "programma’s"}</span>
        </button>
        <button class="dashboard-button" type="button" data-upcoming="Wedstrijden">
          <span class="dashboard-icon" aria-hidden="true">W</span>
          <span class="dashboard-title">Wedstrijden</span>
          <span class="dashboard-state">Binnenkort</span>
        </button>
        <button class="dashboard-button active" type="button" data-route="spelers">
          <span class="dashboard-icon" aria-hidden="true">S</span>
          <span class="dashboard-title">Spelers</span>
          <span class="dashboard-state">${playerCount} ${playerCount === 1 ? "actieve speler" : "actieve spelers"}</span>
        </button>
        <button class="dashboard-button active" type="button" data-route="playbook">
          <span class="dashboard-icon" aria-hidden="true">P</span>
          <span class="dashboard-title">Playbook</span>
          <span class="dashboard-state">${principleCount} ${principleCount === 1 ? "spelprincipe" : "spelprincipes"}</span>
        </button>
        <button class="dashboard-button active dashboard-button-wide" type="button" data-route="seizoen">
          <span class="dashboard-icon" aria-hidden="true">26</span>
          <span class="dashboard-title">Seizoen 2026–2027</span>
          <span class="dashboard-state">${weeks.length} speelweken</span>
        </button>
      </div>

      <section class="season-summary" aria-labelledby="season-summary-title">
        <div class="season-summary-heading">
          <p class="eyebrow">Seizoensplanning</p>
          <h2 id="season-summary-title">${escapeHtml(getCurrentPhase(weeks))}</h2>
        </div>
        <div class="season-summary-grid">
          ${renderDashboardScheduleItem("Volgende speelweek", nextWeek)}
          ${renderDashboardScheduleItem("Volgende competitieronde", nextCompetition)}
        </div>
        <p class="season-training-count">
          ${nextWeek && linkedTrainingCount
            ? `${linkedTrainingCount} ${linkedTrainingCount === 1 ? "training" : "trainingen"} gepland voor deze speelweek.`
            : "Nog geen trainingen gepland voor deze speelweek."}
        </p>
      </section>
    </section>
  `;
}

function renderPlayerCard(player) {
  const positions = [player.primaryPosition, player.secondaryPosition].filter(Boolean).join(" · ");
  const metadata = [
    player.shirtNumber !== "" ? `Rugnummer ${player.shirtNumber}` : "",
    positions,
    player.preferredFoot !== "Onbekend" ? player.preferredFoot : ""
  ].filter(Boolean).join(" · ");

  return `
    <article class="player-card ${player.isActive ? "" : "player-card-inactive"}">
      <div class="player-card-main">
        <span class="player-avatar" aria-hidden="true">${escapeHtml((player.displayName || "?").charAt(0).toUpperCase())}</span>
        <div>
          <h3>${escapeHtml(player.displayName)}</h3>
          <p>${escapeHtml(metadata || (player.isActive ? "Actieve speler" : "Niet actief"))}</p>
        </div>
      </div>
      <div class="player-card-actions">
        <button class="secondary-button" type="button" data-edit-player="${escapeHtml(player.id)}">Bewerken</button>
        <button class="secondary-button" type="button" data-toggle-player="${escapeHtml(player.id)}" data-player-active="${player.isActive}">
          ${player.isActive ? "Deactiveren" : "Heractiveren"}
        </button>
        <button class="danger-button" type="button" data-delete-player="${escapeHtml(player.id)}">Verwijderen</button>
      </div>
    </article>
  `;
}

function renderPlayers() {
  const players = sortPlayers(getPlayers().filter((player) => player.teamId === TEAM_ID));
  const activePlayers = players.filter((player) => player.isActive);
  const inactivePlayers = players.filter((player) => !player.isActive);

  app.innerHTML = `
    <section class="screen" aria-labelledby="players-title">
      <header class="screen-header screen-header-compact">
        <p class="eyebrow">JO16-1</p>
        <h1 id="players-title">Spelers</h1>
        <p class="lead">Beheer de spelerslijst en registreer aanwezigheid en beschikbaarheid.</p>
      </header>

      <div class="list-primary-action player-primary-actions">
        <button class="primary-button" type="button" data-create-player>+ Nieuwe speler</button>
        <button class="secondary-button" type="button" data-route="aanwezigheidsstatistieken">Statistieken</button>
      </div>

      ${activePlayers.length ? `
        <section class="player-list" aria-labelledby="active-players-title">
          <h2 id="active-players-title">Actieve spelers</h2>
          ${activePlayers.map(renderPlayerCard).join("")}
        </section>
      ` : `
        <div class="empty-history players-empty">
          <strong>Nog geen spelers toegevoegd</strong>
          Voeg de eerste speler toe om aanwezigheid te kunnen registreren.
        </div>
      `}

      ${inactivePlayers.length ? `
        <section class="player-list inactive-player-list" aria-labelledby="inactive-players-title">
          <h2 id="inactive-players-title">Niet-actieve spelers</h2>
          <p class="section-intro">Historie blijft bewaard zolang een speler niet definitief wordt verwijderd.</p>
          ${inactivePlayers.map(renderPlayerCard).join("")}
        </section>
      ` : ""}
    </section>
  `;
}

function renderPlayerForm(id) {
  const existing = id ? getPlayer(id) : null;
  if (id && !existing) {
    goTo("spelers");
    return;
  }

  const player = existing || normalizePlayer();
  app.innerHTML = `
    <section class="screen editor-screen" aria-labelledby="player-form-title">
      <header class="screen-header screen-header-compact">
        <p class="eyebrow">${existing ? "Speler bewerken" : "Nieuwe speler"}</p>
        <h1 id="player-form-title">${existing ? escapeHtml(player.displayName) : "Speler toevoegen"}</h1>
      </header>

      <form class="training-form player-form" id="player-form" data-player-id="${escapeHtml(player.id)}" data-created-at="${escapeHtml(player.createdAt)}">
        <div class="form-errors" id="player-form-errors" role="alert" hidden></div>
        <section class="form-section">
          <div class="form-grid two-columns">
            <div class="field">
              <label for="player-first-name">Voornaam <span aria-hidden="true">*</span></label>
              <input id="player-first-name" name="firstName" value="${escapeHtml(player.firstName)}" autocomplete="given-name" required>
            </div>
            <div class="field">
              <label for="player-last-name">Achternaam <span aria-hidden="true">*</span></label>
              <input id="player-last-name" name="lastName" value="${escapeHtml(player.lastName)}" autocomplete="family-name" required>
            </div>
          </div>
          <div class="field">
            <label for="player-display-name">Weergavenaam</label>
            <input id="player-display-name" name="displayName" value="${escapeHtml(player.displayName)}" placeholder="Wordt automatisch voor- en achternaam">
            <small>Gebruik dit alleen wanneer de speler anders in de app moet worden genoemd.</small>
          </div>
          <div class="form-grid two-columns">
            <div class="field">
              <label for="player-shirt-number">Rugnummer</label>
              <input id="player-shirt-number" name="shirtNumber" type="number" min="0" step="1" inputmode="numeric" value="${escapeHtml(player.shirtNumber)}">
            </div>
            <div class="field">
              <label for="player-foot">Voorkeursbeen</label>
              <select id="player-foot" name="preferredFoot">
                ${PREFERRED_FOOT_OPTIONS.map((option) => `<option value="${option}" ${player.preferredFoot === option ? "selected" : ""}>${option}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="form-grid two-columns">
            <div class="field">
              <label for="player-primary-position">Primaire positie</label>
              <input id="player-primary-position" name="primaryPosition" value="${escapeHtml(player.primaryPosition)}" placeholder="Bijvoorbeeld: rechtsback">
            </div>
            <div class="field">
              <label for="player-secondary-position">Secundaire positie</label>
              <input id="player-secondary-position" name="secondaryPosition" value="${escapeHtml(player.secondaryPosition)}" placeholder="Optioneel">
            </div>
          </div>
        </section>

        <div class="form-sticky-actions">
          <button class="secondary-button" type="button" data-cancel-form data-cancel-route="spelers">Annuleren</button>
          <button class="primary-button" type="submit">Speler opslaan</button>
        </div>
      </form>
    </section>
  `;
}

function calculatePlayerAttendanceStats(playerId, records = getAttendanceRecords()) {
  const playerRecords = records.filter((record) => record.playerId === playerId);
  const trainingRecords = playerRecords.filter((record) => record.eventType === "training");
  const seasonWeekRecords = playerRecords.filter((record) => record.eventType === "seasonWeek");
  const percentage = (eventRecords) => {
    const known = eventRecords.filter((record) => (
      PRESENT_ATTENDANCE_STATUSES.includes(record.status)
      || ABSENT_ATTENDANCE_STATUSES.includes(record.status)
    ));
    if (!known.length) return null;
    const present = known.filter((record) => PRESENT_ATTENDANCE_STATUSES.includes(record.status));
    return Math.round((present.length / known.length) * 100);
  };

  return {
    registeredTrainings: new Set(trainingRecords.map((record) => record.eventId)).size,
    trainingPercentage: percentage(trainingRecords),
    registeredSeasonWeeks: new Set(seasonWeekRecords.map((record) => record.eventId)).size,
    seasonWeekPercentage: percentage(seasonWeekRecords)
  };
}

function formatPercentage(value) {
  return value === null ? "—" : `${value}%`;
}

function getTeamAttendanceStats(players, records) {
  const playerStats = players.map((player) => calculatePlayerAttendanceStats(player.id, records));
  const knownPercentages = playerStats
    .map((stats) => stats.trainingPercentage)
    .filter((value) => value !== null);
  const averagePercentage = knownPercentages.length
    ? Math.round(knownPercentages.reduce((sum, value) => sum + value, 0) / knownPercentages.length)
    : null;
  const knownTrainingRecords = records.filter((record) => (
    record.eventType === "training"
    && players.some((player) => player.id === record.playerId)
    && (PRESENT_ATTENDANCE_STATUSES.includes(record.status) || ABSENT_ATTENDANCE_STATUSES.includes(record.status))
  ));
  const registeredTrainingIds = [...new Set(knownTrainingRecords.map((record) => record.eventId))];
  const turnout = registeredTrainingIds.length
    ? knownTrainingRecords.filter((record) => PRESENT_ATTENDANCE_STATUSES.includes(record.status)).length
      / registeredTrainingIds.length
    : null;

  return { averagePercentage, turnout };
}

function renderAttendanceStatistics() {
  const players = getActivePlayers();
  const records = getAttendanceRecords();
  const teamStats = getTeamAttendanceStats(players, records);

  app.innerHTML = `
    <section class="screen" aria-labelledby="attendance-statistics-title">
      <header class="screen-header screen-header-compact">
        <p class="eyebrow">JO16-1 · Spelers</p>
        <h1 id="attendance-statistics-title">Statistieken</h1>
        <p class="lead">Trainingsaanwezigheid en speelweekbeschikbaarheid op basis van opgeslagen registraties.</p>
      </header>

      <div class="attendance-summary-grid">
        <div class="fact-card"><span class="detail-label">Actieve spelers</span><strong class="fact-value">${players.length}</strong></div>
        <div class="fact-card"><span class="detail-label">Gem. trainingsaanwezigheid</span><strong class="fact-value">${formatPercentage(teamStats.averagePercentage)}</strong></div>
        <div class="fact-card attendance-summary-wide"><span class="detail-label">Gem. opkomst per geregistreerde training</span><strong class="fact-value">${teamStats.turnout === null ? "—" : teamStats.turnout.toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong></div>
      </div>

      <aside class="availability-notice">
        <strong>Over speelweekbeschikbaarheid</strong>
        <p>Deze registratie zegt niets over selectie, basisplaats, invalbeurt, speelminuten of daadwerkelijke wedstrijddeelname.</p>
      </aside>

      ${players.length ? `
        <div class="statistics-list">
          ${players.map((player) => {
            const stats = calculatePlayerAttendanceStats(player.id, records);
            return `
              <article class="statistics-card">
                <h2>${escapeHtml(player.displayName)}</h2>
                <dl>
                  <div><dt>Geregistreerde trainingen</dt><dd>${stats.registeredTrainings}</dd></div>
                  <div><dt>Trainingsaanwezigheid</dt><dd>${formatPercentage(stats.trainingPercentage)}</dd></div>
                  <div><dt>Speelweken met geregistreerde beschikbaarheid</dt><dd>${stats.registeredSeasonWeeks}</dd></div>
                  <div><dt>Speelweekbeschikbaarheid</dt><dd>${formatPercentage(stats.seasonWeekPercentage)}</dd></div>
                </dl>
              </article>
            `;
          }).join("")}
        </div>
      ` : `
        <div class="empty-history players-empty">
          <strong>Nog geen actieve spelers</strong>
          Voeg eerst spelers toe om statistieken op te bouwen.
        </div>
      `}
    </section>
  `;
}

function renderAttendanceSection({ eventType, eventId, title }) {
  const players = getActivePlayers();
  const current = new Map(
    getAttendanceForEvent(eventType, eventId).map((record) => [record.playerId, record])
  );

  if (!players.length) {
    return `
      <section class="content-card attendance-section">
        <h2>${escapeHtml(title)}</h2>
        <div class="empty-history compact-empty">
          <strong>Nog geen actieve spelers</strong>
          Voeg eerst spelers toe om deze registratie te gebruiken.
          <button class="secondary-button" type="button" data-route="spelers">Naar spelers</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="content-card attendance-section">
      <div class="attendance-heading">
        <div><p class="eyebrow">JO16-1</p><h2>${escapeHtml(title)}</h2></div>
        <span>${players.length} ${players.length === 1 ? "speler" : "spelers"}</span>
      </div>
      ${eventType === "seasonWeek" ? `
        <p class="attendance-context">Beschikbaarheid voor deze speelweek zegt niets over selectie, basisplaats, invalbeurt, speelminuten of daadwerkelijke wedstrijddeelname.</p>
      ` : ""}
      <div class="attendance-quick-actions">
        <button class="secondary-button" type="button" data-attendance-all="Aanwezig">Iedereen aanwezig</button>
        <button class="secondary-button" type="button" data-attendance-all="Onbekend">Iedereen onbekend</button>
      </div>
      <form id="attendance-form" data-event-type="${eventType}" data-event-id="${escapeHtml(eventId)}">
        <div class="attendance-player-list">
          ${players.map((player) => {
            const record = current.get(player.id);
            const note = record ? record.note : "";
            const status = record ? record.status : "Onbekend";
            return `
              <div class="attendance-player" data-attendance-player="${escapeHtml(player.id)}">
                <div class="attendance-player-heading">
                  <label for="attendance-${escapeHtml(player.id)}">${escapeHtml(player.displayName)}</label>
                  <select id="attendance-${escapeHtml(player.id)}" name="status" data-attendance-status>
                    ${ATTENDANCE_STATUSES.map((option) => `<option value="${option}" ${status === option ? "selected" : ""}>${option}</option>`).join("")}
                  </select>
                </div>
                <button class="note-toggle" type="button" data-toggle-attendance-note aria-expanded="${note ? "true" : "false"}">
                  ${note ? "Notitie verbergen" : "Notitie toevoegen"}
                </button>
                <div class="attendance-note" ${note ? "" : "hidden"}>
                  <label for="attendance-note-${escapeHtml(player.id)}">Notitie bij ${escapeHtml(player.displayName)}</label>
                  <textarea id="attendance-note-${escapeHtml(player.id)}" name="note" rows="2" placeholder="Optionele korte notitie">${escapeHtml(note)}</textarea>
                </div>
              </div>
            `;
          }).join("")}
        </div>
        <button class="primary-button attendance-save" type="submit">Registratie opslaan</button>
      </form>
    </section>
  `;
}

function renderSeasonWeekCard(week) {
  const trainingCount = week.trainingIds.length;
  const phase = week.phase
    ? `<span class="season-chip phase-chip">${escapeHtml(week.phase)}</span>`
    : "";

  return `
    <article class="season-week-shell">
      <button class="season-week-card" type="button" data-season-week="${escapeHtml(week.id)}">
        <span class="season-timeline-marker" aria-hidden="true"></span>
        <span class="season-week-copy">
          <span class="season-week-date">${escapeHtml(formatSeasonDateRange(week.dateFrom, week.dateTo))}</span>
          <span class="season-week-title">${escapeHtml(week.type)}</span>
          <span class="season-week-meta">
            ${phase}
            <span class="season-chip status-${escapeHtml(week.status.toLowerCase())}">${escapeHtml(week.status)}</span>
          </span>
          <span class="season-week-training-count">
            ${trainingCount} ${trainingCount === 1 ? "gekoppelde training" : "gekoppelde trainingen"}
          </span>
        </span>
        <span class="arrow" aria-hidden="true">→</span>
      </button>
      <button class="card-action" type="button" data-duplicate-season-week="${escapeHtml(week.id)}">
        Speelweek dupliceren
      </button>
    </article>
  `;
}

function renderSeasonOverview() {
  const season = getTeamSeason();
  if (!season) {
    goTo("dashboard");
    return;
  }

  const weeks = getSeasonWeeks(season.id);
  const cards = weeks.map(renderSeasonWeekCard).join("");

  app.innerHTML = `
    <section class="screen" aria-labelledby="season-title">
      <header class="screen-header">
        <p class="eyebrow">JO16-1</p>
        <h1 id="season-title">${escapeHtml(season.name)}</h1>
        <p class="lead">Plan competitierondes, beker- en inhaalweekenden in één compacte tijdlijn.</p>
      </header>

      <button class="primary-button add-season-week-button" type="button" data-create-season-week>
        <span aria-hidden="true">＋</span>
        Speelweek toevoegen
      </button>

      <section class="season-overview-facts" aria-label="Seizoensstatus">
        <div>
          <span>Huidige fase</span>
          <strong>${escapeHtml(getCurrentPhase(weeks))}</strong>
        </div>
        <div>
          <span>Planning</span>
          <strong>${weeks.length} speelweken</strong>
        </div>
      </section>

      ${cards ? `
        <div class="season-timeline">${cards}</div>
      ` : `
        <div class="empty-history">
          <strong>Nog geen speelweken</strong>
          Voeg de eerste periode van dit seizoen toe.
        </div>
      `}
    </section>
  `;
}

function renderSeasonWeekReflections(trainings) {
  const entries = trainings.flatMap((training) => (
    reflectionsFor(training.id).map((reflection) => ({ training, reflection }))
  ));

  if (!entries.length) {
    return `
      <div class="empty-history compact-empty">
        <strong>Nog geen reflecties</strong>
        Reflecties van gekoppelde trainingen verschijnen hier.
      </div>
    `;
  }

  return `
    <div class="season-reflection-list">
      ${entries.map(({ training, reflection }) => `
        <article class="season-reflection-card">
          <span>${escapeHtml(formatAddedDate(reflection.createdAt))}</span>
          <strong>${escapeHtml(training.code)} · ${escapeHtml(training.title)}</strong>
          ${reflection.nextTraining ? `<p>${escapeHtml(reflection.nextTraining)}</p>` : ""}
        </article>
      `).join("")}
    </div>
  `;
}

function renderSeasonWeekDetail(id) {
  const week = getSeasonWeek(id);
  if (!week) {
    goTo("seizoen");
    return;
  }

  const linkedTrainings = week.trainingIds
    .map(getTraining)
    .filter(Boolean);
  const availableTrainings = getTrainings()
    .filter((training) => !week.trainingIds.includes(training.id))
    .sort((a, b) => a.code.localeCompare(b.code, "nl", { numeric: true }));
  const trainingCards = linkedTrainings.map((training) => `
    <article class="linked-training-card">
      <button type="button" data-training="${escapeHtml(training.id)}">
        <span>${escapeHtml(training.code)}</span>
        <strong>${escapeHtml(training.title)}</strong>
      </button>
      <button class="unlink-button" type="button" data-unlink-training="${escapeHtml(training.id)}" data-week-id="${escapeHtml(week.id)}">
        Koppeling verwijderen
      </button>
    </article>
  `).join("");

  app.innerHTML = `
    <article class="screen" aria-labelledby="season-week-title">
      <header class="detail-hero season-week-hero">
        <p class="eyebrow">Speelweek</p>
        <h1 id="season-week-title">${escapeHtml(week.type)}</h1>
        <p>${escapeHtml(formatSeasonDateRange(week.dateFrom, week.dateTo))}</p>
        <div class="season-week-meta">
          ${week.phase ? `<span class="season-chip phase-chip">${escapeHtml(week.phase)}</span>` : ""}
          <span class="season-chip status-${escapeHtml(week.status.toLowerCase())}">${escapeHtml(week.status)}</span>
        </div>
      </header>

      <section class="content-stack season-week-content">
        <section class="content-card">
          <h2>Planning</h2>
          <dl class="season-detail-list">
            <div><dt>Datum</dt><dd>${escapeHtml(formatSeasonDateRange(week.dateFrom, week.dateTo))}</dd></div>
            <div><dt>Type</dt><dd>${escapeHtml(week.type)}</dd></div>
            ${week.phase ? `<div><dt>Fase</dt><dd>${escapeHtml(week.phase)}</dd></div>` : ""}
            ${week.trainingWeekNumber !== "" ? `<div><dt>Trainingsweek</dt><dd>${escapeHtml(week.trainingWeekNumber)}</dd></div>` : ""}
            <div><dt>Status</dt><dd>${escapeHtml(week.status)}</dd></div>
          </dl>
          ${week.note ? `<p class="season-note">${escapeHtml(week.note)}</p>` : ""}
        </section>

        ${renderAttendanceSection({
          eventType: "seasonWeek",
          eventId: week.id,
          title: "Speelweekbeschikbaarheid"
        })}

        <section class="content-card">
          <h2>Gekoppelde trainingen</h2>
          ${trainingCards || `
            <div class="empty-history compact-empty">
              <strong>Nog geen trainingen gepland voor deze speelweek.</strong>
            </div>
          `}
          ${availableTrainings.length ? `
            <form class="training-link-form" id="season-training-link-form" data-week-id="${escapeHtml(week.id)}">
              <div class="field">
                <label for="season-training-select">Training selecteren</label>
                <select id="season-training-select" name="trainingId" required>
                  <option value="">Kies een training</option>
                  ${availableTrainings.map((training) => `
                    <option value="${escapeHtml(training.id)}">${escapeHtml(training.code)} — ${escapeHtml(training.title)}</option>
                  `).join("")}
                </select>
              </div>
              <button class="secondary-button" type="submit">Koppeling opslaan</button>
            </form>
          ` : ""}
        </section>

        <section class="content-card">
          <h2>Wedstrijd</h2>
          <div class="empty-history compact-empty">
            <strong>Geen wedstrijd gekoppeld</strong>
            Wedstrijdbeheer is nog niet beschikbaar.
          </div>
        </section>

        <section class="content-card">
          <h2>Reflecties</h2>
          ${renderSeasonWeekReflections(linkedTrainings)}
        </section>
      </section>

      <div class="detail-actions">
        <button class="secondary-button" type="button" data-edit-season-week="${escapeHtml(week.id)}">Bewerken</button>
        <button class="secondary-button" type="button" data-duplicate-season-week="${escapeHtml(week.id)}">Speelweek dupliceren</button>
        <button class="danger-button" type="button" data-delete-season-week="${escapeHtml(week.id)}">Speelweek verwijderen</button>
      </div>
    </article>
  `;
}

function createEmptySeasonWeek(seasonId) {
  return normalizeSeasonWeek({
    seasonId,
    type: "Vrij",
    status: "Gepland",
    trainingIds: []
  });
}

function renderSeasonWeekForm(id) {
  const season = getTeamSeason();
  const existing = id ? getSeasonWeek(id) : null;

  if (!season || (id && !existing)) {
    goTo("seizoen");
    return;
  }

  const week = existing || createEmptySeasonWeek(season.id);
  const isEditing = Boolean(existing);
  formDirty = false;

  app.innerHTML = `
    <section class="screen form-screen" aria-labelledby="season-week-form-title">
      <header class="screen-header screen-header-compact">
        <p class="eyebrow">${isEditing ? "Speelweek bewerken" : "Nieuwe speelweek"}</p>
        <h1 id="season-week-form-title">${isEditing ? "Planning aanpassen" : "Speelweek toevoegen"}</h1>
        <p class="lead">Leg de kalenderperiode handmatig en duidelijk vast.</p>
      </header>

      <form class="training-form" id="season-week-form"
        data-week-id="${isEditing ? escapeHtml(week.id) : ""}"
        data-season-id="${escapeHtml(week.seasonId)}"
        data-created-at="${escapeHtml(week.createdAt)}">
        <div class="form-errors" id="season-week-form-errors" role="alert" hidden></div>

        <section class="form-section">
          <h2>Periode</h2>
          <div class="form-grid">
            <div class="field">
              <label for="week-date-from">Datum van zaterdag / begindatum *</label>
              <input id="week-date-from" name="dateFrom" type="date" value="${escapeHtml(week.dateFrom)}" required>
            </div>
            <div class="field">
              <label for="week-date-to">Datum van zondag / einddatum *</label>
              <input id="week-date-to" name="dateTo" type="date" value="${escapeHtml(week.dateTo)}" required>
            </div>
            <div class="field">
              <label for="week-type">Type weekend *</label>
              <select id="week-type" name="type" required>
                ${SEASON_WEEK_TYPES.map((type) => `
                  <option value="${escapeHtml(type)}" ${week.type === type ? "selected" : ""}>${escapeHtml(type)}</option>
                `).join("")}
              </select>
            </div>
            <div class="field">
              <label for="week-phase">Fase</label>
              <input id="week-phase" name="phase" type="text" value="${escapeHtml(week.phase)}" placeholder="Bijvoorbeeld: Fase 2">
            </div>
            <div class="field">
              <label for="training-week-number">Trainingsweeknummer</label>
              <input id="training-week-number" name="trainingWeekNumber" type="number" min="1" step="1" value="${escapeHtml(week.trainingWeekNumber)}" inputmode="numeric">
            </div>
            <div class="field">
              <label for="week-status">Status *</label>
              <select id="week-status" name="status" required>
                ${SEASON_WEEK_STATUSES.map((status) => `
                  <option value="${escapeHtml(status)}" ${week.status === status ? "selected" : ""}>${escapeHtml(status)}</option>
                `).join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="week-note">Korte notitie</label>
            <textarea id="week-note" name="note" placeholder="Bijvoorbeeld: ook bekerweekend volgens de KNVB-kalender.">${escapeHtml(week.note)}</textarea>
          </div>
        </section>

        <div class="form-sticky-actions">
          <button class="secondary-button" type="button" data-cancel-form data-cancel-route="${isEditing ? "speelweek" : "seizoen"}" data-cancel-id="${isEditing ? escapeHtml(week.id) : ""}">Annuleren</button>
          <button class="primary-button" type="submit">Speelweek opslaan</button>
        </div>
      </form>
    </section>
  `;
}

function renderPlaybook() {
  const principles = getPrinciples();
  const cards = principles.map((principle) => {
    const sourceCount = getSourcesForPrinciple(principle.id).length;

    return `
      <button class="principle-card" type="button" data-principle="${escapeHtml(principle.id)}">
        <span class="principle-card-copy">
          <span class="principle-card-label">Spelprincipe</span>
          <span class="principle-card-title">${escapeHtml(principle.title)}</span>
          ${principle.description ? `
            <span class="principle-card-description">${escapeHtml(principle.description)}</span>
          ` : ""}
          <span class="principle-card-meta">${sourceCount} ${sourceCount === 1 ? "bron" : "bronnen"}</span>
        </span>
        <span class="arrow" aria-hidden="true">→</span>
      </button>
    `;
  }).join("");

  app.innerHTML = `
    <section class="screen" aria-labelledby="playbook-title">
      <header class="screen-header">
        <p class="eyebrow">JO16-1</p>
        <h1 id="playbook-title">Playbook</h1>
        <p class="lead">Leg vast volgens welke principes jouw team wil spelen.</p>
      </header>

      <button class="primary-button add-principle-button" type="button" data-create-principle>
        <span aria-hidden="true">＋</span>
        Spelprincipe toevoegen
      </button>

      ${cards ? `
        <div class="principle-list">${cards}</div>
      ` : `
        <div class="empty-history">
          <strong>Nog geen spelprincipes</strong>
          Voeg het eerste principe van jullie speelwijze toe.
        </div>
      `}
    </section>
  `;
}

function renderPrincipleForm(id) {
  const existing = id ? getPrinciple(id) : null;
  if (id && !existing) {
    goTo("playbook");
    return;
  }

  const principle = existing || createEmptyPrinciple();
  const isEditing = Boolean(existing);

  app.innerHTML = `
    <section class="screen" aria-labelledby="principle-form-title">
      <header class="screen-header screen-header-compact">
        <p class="eyebrow">${isEditing ? "Spelprincipe aanpassen" : "Nieuw spelprincipe"}</p>
        <h1 id="principle-form-title">${isEditing ? "Spelprincipe bewerken" : "Spelprincipe toevoegen"}</h1>
        <p class="lead">Formuleer kort en herkenbaar welk gedrag richting geeft aan jullie spel.</p>
      </header>

      <form
        class="training-form"
        id="principle-form"
        data-principle-id="${isEditing ? escapeHtml(principle.id) : ""}"
        data-created-at="${escapeHtml(principle.createdAt)}"
        novalidate
      >
        <div class="form-errors" id="principle-form-errors" role="alert" aria-live="polite" hidden></div>

        <section class="form-card">
          <h2>Spelprincipe</h2>
          <div class="field">
            <label for="principle-title-input">Titel</label>
            <input
              id="principle-title-input"
              name="title"
              value="${escapeHtml(principle.title)}"
              placeholder="Bijv. Lok druk uit om een vrije man te creëren"
              required
            >
          </div>
          <div class="field">
            <label for="principle-description">Korte beschrijving</label>
            <textarea
              id="principle-description"
              name="description"
              placeholder="Wat betekent dit principe voor jullie speelwijze?"
            >${escapeHtml(principle.description)}</textarea>
          </div>
        </section>

        <div class="form-sticky-actions">
          <button
            class="secondary-button"
            type="button"
            data-cancel-form
            data-cancel-route="${isEditing ? "spelprincipe" : "playbook"}"
            data-cancel-id="${isEditing ? escapeHtml(principle.id) : ""}"
          >
            Annuleren
          </button>
          <button class="primary-button" type="submit">Spelprincipe opslaan</button>
        </div>
      </form>
    </section>
  `;
}

function renderSourceCard(source, principleId) {
  const meta = [
    source.author,
    source.createdAt ? `Toegevoegd ${formatAddedDate(source.createdAt)}` : ""
  ].filter(Boolean).join(" · ");

  return `
    <article class="source-card">
      <div class="source-card-heading">
        <span class="source-type">${escapeHtml(source.type)}</span>
        <h3>${escapeHtml(source.title)}</h3>
        ${meta ? `<span class="source-meta">${escapeHtml(meta)}</span>` : ""}
      </div>
      ${source.summary ? `<p class="source-summary">${escapeHtml(source.summary)}</p>` : ""}
      ${source.keyInsight ? `
        <div class="source-detail">
          <span>Belangrijkste inzicht</span>
          <p>${escapeHtml(source.keyInsight)}</p>
        </div>
      ` : ""}
      ${source.notes ? `
        <div class="source-detail">
          <span>Eigen notities</span>
          <p>${escapeHtml(source.notes)}</p>
        </div>
      ` : ""}
      <div class="source-actions">
        <button class="secondary-button" type="button" data-open-source="${escapeHtml(source.id)}">Openen</button>
        <button
          class="secondary-button"
          type="button"
          data-edit-source="${escapeHtml(source.id)}"
          data-principle-id="${escapeHtml(principleId)}"
        >Bewerken</button>
        <button
          class="danger-button"
          type="button"
          data-delete-source="${escapeHtml(source.id)}"
          data-principle-id="${escapeHtml(principleId)}"
        >Verwijderen</button>
      </div>
    </article>
  `;
}

function renderPrincipleDetail(id) {
  const principle = getPrinciple(id);
  if (!principle) {
    goTo("playbook");
    return;
  }

  const sources = getSourcesForPrinciple(id);

  app.innerHTML = `
    <article class="screen" aria-labelledby="principle-title">
      <header class="detail-hero principle-hero">
        <span class="detail-code">Spelprincipe</span>
        <h1 id="principle-title">${escapeHtml(principle.title)}</h1>
        ${principle.description ? `<p>${escapeHtml(principle.description)}</p>` : ""}
      </header>

      <div class="detail-actions">
        <button class="secondary-button" type="button" data-edit-principle="${escapeHtml(principle.id)}">
          Bewerken
        </button>
        <button class="danger-button" type="button" data-delete-principle="${escapeHtml(principle.id)}">
          Spelprincipe verwijderen
        </button>
      </div>

      <section class="knowledge-section" aria-labelledby="knowledge-title">
        <div class="knowledge-heading">
          <div>
            <p class="eyebrow">Verdieping en bewijs</p>
            <h2 id="knowledge-title">Kennisbank</h2>
            <p>Bewaar bronnen die helpen verklaren waarom dit spelprincipe belangrijk is.</p>
          </div>
          <button class="primary-button" type="button" data-create-source="${escapeHtml(principle.id)}">
            Bron toevoegen
          </button>
        </div>

        ${sources.length ? `
          <div class="source-list">
            ${sources.map((source) => renderSourceCard(source, principle.id)).join("")}
          </div>
        ` : `
          <div class="empty-history knowledge-empty">
            <strong>Nog geen bronnen toegevoegd.</strong>
            Voeg artikelen, video's, documenten of eigen notities toe die dit spelprincipe ondersteunen.
          </div>
        `}
      </section>
    </article>
  `;
}

function parseSourceRouteId(value = "") {
  const separatorIndex = value.indexOf("~");
  if (separatorIndex === -1) return { principleId: value, sourceId: "" };

  return {
    principleId: value.slice(0, separatorIndex),
    sourceId: value.slice(separatorIndex + 1)
  };
}

function createSourceRouteId(principleId, sourceId) {
  return `${principleId}~${sourceId}`;
}

function renderSourceForm(routeId) {
  const { principleId, sourceId } = parseSourceRouteId(routeId);
  const principle = getPrinciple(principleId);
  const existing = sourceId ? getSource(sourceId) : null;

  if (!principle || (sourceId && !existing)) {
    goTo(principle ? "spelprincipe" : "playbook", principle ? principle.id : null);
    return;
  }

  const source = existing || createEmptySource(principleId);
  const isEditing = Boolean(existing);

  app.innerHTML = `
    <section class="screen" aria-labelledby="source-form-title">
      <header class="screen-header screen-header-compact">
        <p class="eyebrow">${escapeHtml(principle.title)}</p>
        <h1 id="source-form-title">${isEditing ? "Bron bewerken" : "Bron toevoegen"}</h1>
        <p class="lead">Leg vast waarom deze bron bij het spelprincipe hoort en wat je ervan wilt onthouden.</p>
      </header>

      <form
        class="training-form"
        id="source-form"
        data-principle-id="${escapeHtml(principleId)}"
        data-source-id="${isEditing ? escapeHtml(source.id) : ""}"
        data-created-at="${escapeHtml(source.createdAt)}"
        novalidate
      >
        <div class="form-errors" id="source-form-errors" role="alert" aria-live="polite" hidden></div>

        <section class="form-card">
          <h2>Brongegevens</h2>
          <div class="field">
            <label for="source-title-input">Titel</label>
            <input id="source-title-input" name="title" value="${escapeHtml(source.title)}" required>
          </div>
          <div class="field-grid">
            <div class="field">
              <label for="source-type">Type</label>
              <select id="source-type" name="type" required>
                ${SOURCE_TYPES.map((type) => `
                  <option value="${escapeHtml(type)}" ${source.type === type ? "selected" : ""}>${escapeHtml(type)}</option>
                `).join("")}
              </select>
            </div>
            <div class="field">
              <label for="source-author">Auteur of maker</label>
              <input id="source-author" name="author" value="${escapeHtml(source.author)}">
            </div>
          </div>
          <div class="field">
            <label for="source-url">Link</label>
            <input
              id="source-url"
              type="url"
              name="url"
              value="${escapeHtml(source.url)}"
              placeholder="https://..."
              inputmode="url"
            >
          </div>
          <div class="field">
            <label for="source-file">PDF-bestand</label>
            <input id="source-file" type="file" name="file" accept=".pdf,application/pdf">
            <span class="file-notice">Maximaal 2 MB. PDF-bestanden worden lokaal op dit apparaat opgeslagen.</span>
            ${source.fileReference ? `
              <span class="current-file">
                Huidig bestand: ${escapeHtml(source.fileReference.name)} (${formatFileSize(source.fileReference.size)})
              </span>
            ` : ""}
          </div>
        </section>

        <section class="form-card">
          <h2>Betekenis voor het spelprincipe</h2>
          <div class="field">
            <label for="source-summary">Korte samenvatting</label>
            <textarea id="source-summary" name="summary">${escapeHtml(source.summary)}</textarea>
          </div>
          <div class="field">
            <label for="source-insight">Belangrijkste inzicht</label>
            <textarea id="source-insight" name="keyInsight">${escapeHtml(source.keyInsight)}</textarea>
          </div>
          <div class="field">
            <label for="source-notes">Eigen notities</label>
            <textarea id="source-notes" name="notes">${escapeHtml(source.notes)}</textarea>
          </div>
        </section>

        <div class="form-sticky-actions">
          <button
            class="secondary-button"
            type="button"
            data-cancel-form
            data-cancel-route="spelprincipe"
            data-cancel-id="${escapeHtml(principleId)}"
          >Annuleren</button>
          <button class="primary-button" type="submit">Bron opslaan</button>
        </div>
      </form>
    </section>
  `;
}

function renderTrainings() {
  const trainings = getTrainings();
  const blocks = [...new Set(trainings.map((training) => training.block).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "nl"));

  app.innerHTML = `
    <section class="screen" aria-labelledby="trainings-title">
      <header class="screen-header">
        <p class="eyebrow">JO16-1</p>
        <h1 id="trainings-title">Trainingen</h1>
        <p class="lead">Kies een programma en ga voorbereid het veld op.</p>
      </header>
      <button class="primary-button add-training-button" type="button" data-create-training>
        <span aria-hidden="true">＋</span>
        Nieuwe training
      </button>

      <section class="training-tools" aria-label="Trainingen zoeken en sorteren">
        <div class="field">
          <label for="training-search">Zoeken</label>
          <input
            id="training-search"
            type="search"
            value="${escapeHtml(trainingListState.query)}"
            placeholder="RM-code, titel of thema"
            data-training-search
          >
        </div>
        <div class="training-tool-grid">
          <div class="field">
            <label for="block-filter">Trainingsblok</label>
            <select id="block-filter" data-block-filter>
              <option value="all">Alle blokken</option>
              ${blocks.map((block) => `
                <option value="${escapeHtml(block)}" ${trainingListState.block === block ? "selected" : ""}>
                  ${escapeHtml(block)}
                </option>
              `).join("")}
            </select>
          </div>
          <div class="field">
            <label for="training-sort">Sorteren</label>
            <select id="training-sort" data-training-sort>
              <option value="updated" ${trainingListState.sort === "updated" ? "selected" : ""}>Laatst gewijzigd</option>
              <option value="date" ${trainingListState.sort === "date" ? "selected" : ""}>Datum</option>
              <option value="code" ${trainingListState.sort === "code" ? "selected" : ""}>RM-code</option>
            </select>
          </div>
        </div>
      </section>

      <div class="training-result-summary" id="training-result-summary"></div>
      <div id="training-list-results"></div>

      <section class="backup-card" aria-labelledby="backup-title">
        <p class="eyebrow">Veilig bewaren</p>
        <h2 id="backup-title">Back-up</h2>
        <p>Download trainingen, reflecties, spelers, registraties, het Playbook en de seizoensplanning, of zet een eerdere back-up terug.</p>
        <div class="backup-actions">
          <button class="secondary-button" type="button" data-export-backup>Back-up downloaden</button>
          <button class="secondary-button" type="button" data-import-backup>Back-up importeren</button>
        </div>
        <input
          class="visually-hidden"
          id="backup-file"
          type="file"
          accept=".json,application/json"
          data-backup-file
        >
      </section>
    </section>
  `;

  updateTrainingListResults();
}

function getVisibleTrainings() {
  const query = trainingListState.query.trim().toLocaleLowerCase("nl");
  const trainings = getTrainings().filter((training) => {
    const matchesQuery = !query || [
      training.code,
      training.title,
      training.theme
    ].some((value) => value.toLocaleLowerCase("nl").includes(query));
    const matchesBlock = trainingListState.block === "all"
      || training.block === trainingListState.block;

    return matchesQuery && matchesBlock;
  });

  return trainings.sort((a, b) => {
    if (trainingListState.sort === "code") {
      return a.code.localeCompare(b.code, "nl", { numeric: true });
    }

    if (trainingListState.sort === "date") {
      return (b.date || "").localeCompare(a.date || "");
    }

    return (b.updatedAt || b.createdAt || "")
      .localeCompare(a.updatedAt || a.createdAt || "");
  });
}

function updateTrainingListResults() {
  const container = document.querySelector("#training-list-results");
  const summary = document.querySelector("#training-result-summary");
  if (!container || !summary) return;

  const trainings = getVisibleTrainings();
  summary.textContent = `${trainings.length} ${trainings.length === 1 ? "training" : "trainingen"}`;

  if (!trainings.length) {
    container.innerHTML = `
      <div class="empty-history">
        <strong>Geen trainingen gevonden</strong>
        Pas je zoekopdracht of filter aan.
      </div>
    `;
    return;
  }

  const cards = trainings.map((training) => {
    const count = reflectionsFor(training.id).length;
    const history = count
      ? `<span class="history-count">${count} ${count === 1 ? "reflectie" : "reflecties"}</span>`
      : "";
    const meta = [formatShortDate(training.date), training.block]
      .filter(Boolean)
      .join(" · ");

    return `
      <article class="training-card-shell">
        <button class="training-card" type="button" data-training="${escapeHtml(training.id)}">
          <span class="training-card-copy">
            <span class="training-code">${escapeHtml(training.code)}</span>
            <span class="training-title">${escapeHtml(training.title)}</span>
            <span class="training-theme">${escapeHtml(training.theme || "Geen thema")}</span>
            ${meta ? `<span class="training-meta">${escapeHtml(meta)}</span>` : ""}
            ${history}
          </span>
          <span class="arrow" aria-hidden="true">→</span>
        </button>
        <button class="card-action" type="button" data-duplicate-training="${escapeHtml(training.id)}">
          Training dupliceren
        </button>
      </article>
    `;
  }).join("");

  container.innerHTML = `<div class="training-list">${cards}</div>`;
}

function renderTrainingForm(id) {
  const existing = id ? getTraining(id) : null;

  if (id && !existing) {
    goTo("trainingen");
    return;
  }

  let training = existing || createEmptyTraining();
  const isEditing = Boolean(existing);
  const draft = getDraft();
  const draftMatches = draft
    && (draft.trainingId || "") === (id || "");

  if (draftMatches) {
    const continueDraft = window.confirm(
      "Er staat nog een niet-opgeslagen training klaar. Wil je doorgaan?"
    );

    if (continueDraft) {
      training = normalizeTraining(draft.data);
    } else {
      const discardDraft = window.confirm("Wil je het concept weggooien?");

      if (discardDraft) {
        clearDraft();
      } else {
        goTo(isEditing ? "training" : "trainingen", isEditing ? id : null);
        return;
      }
    }
  }

  formDirty = false;

  app.innerHTML = `
    <section class="screen" aria-labelledby="training-form-title">
      <header class="screen-header screen-header-compact">
        <p class="eyebrow">${isEditing ? "Programma aanpassen" : "Nieuw programma"}</p>
        <h1 id="training-form-title">${isEditing ? "Training bewerken" : "Training toevoegen"}</h1>
        <p class="lead">Vul de onderdelen in zoals je ze straks langs het veld wilt zien.</p>
      </header>

      <form
        class="training-form"
        id="training-form"
        data-training-id="${isEditing ? escapeHtml(existing.id) : ""}"
        data-created-at="${escapeHtml(existing && existing.createdAt ? existing.createdAt : "")}"
        novalidate
      >
        ${!isEditing ? `
          <section class="template-picker" aria-labelledby="template-title">
            <div>
              <p class="eyebrow">Sneller starten</p>
              <h2 id="template-title">Kies een uitgangspunt</h2>
              <p>Je krijgt alleen invulaanwijzingen; de voetbalinhoud bepaal je zelf.</p>
            </div>
            <div class="field">
              <label for="training-template">Sjabloon</label>
              <select id="training-template" data-template-select>
                ${Object.entries(TEMPLATE_DEFINITIONS).map(([key, template]) => `
                  <option value="${key}">${escapeHtml(template.label)}</option>
                `).join("")}
              </select>
            </div>
            <button class="secondary-button" type="button" data-apply-template>
              Vul met sjabloon
            </button>
          </section>
        ` : ""}

        <div class="form-errors" id="training-form-errors" role="alert" aria-live="polite" hidden></div>

        <section class="form-card">
          <h2>Basisgegevens</h2>
          <div class="field-grid">
            <div class="field">
              <label for="training-code">RM-code</label>
              <input id="training-code" name="code" value="${escapeHtml(training.code)}" placeholder="Bijv. RM-04" required>
            </div>
            <div class="field">
              <label for="training-date">Datum</label>
              <input id="training-date" type="date" name="date" value="${escapeHtml(training.date)}">
            </div>
          </div>
          <div class="field">
            <label for="training-title-input">Titel</label>
            <input id="training-title-input" name="title" value="${escapeHtml(training.title)}" placeholder="Naam van de training" required>
            <span class="field-hint">Gebruik een korte titel die het voetbalprobleem herkenbaar maakt.</span>
          </div>
          <div class="field-grid">
            <div class="field">
              <label for="training-theme">Thema</label>
              <input id="training-theme" name="theme" value="${escapeHtml(training.theme)}" placeholder="Bijv. Omschakelen">
              <span class="field-hint">Beschrijf één centraal voetbalmoment.</span>
            </div>
            <div class="field">
              <label for="training-block">Trainingsblok</label>
              <input id="training-block" name="block" value="${escapeHtml(training.block)}" placeholder="Bijv. Blok 2">
            </div>
          </div>
          <div class="field">
            <label for="training-duration">Totale duur in minuten</label>
            <input id="training-duration" type="number" min="0" inputmode="numeric" name="totalDuration" value="${training.totalDuration || ""}" placeholder="Bijv. 80">
          </div>
        </section>

        <section class="form-card">
          <h2>Trainingsdoel</h2>
          <div class="field">
            <label for="training-main-goal">Hoofddoel</label>
            <textarea id="training-main-goal" name="mainGoal" placeholder="Wat moeten de spelers na deze training beter kunnen?">${escapeHtml(training.mainGoal)}</textarea>
            ${renderFieldSupport(
              "Begin met wat spelers na afloop beter moeten kunnen.",
              "mainGoal"
            )}
          </div>
          <div class="field">
            <label for="training-behavior">Gewenst spelersgedrag</label>
            <textarea id="training-behavior" name="desiredBehavior" placeholder="Welk zichtbaar gedrag wil je terugzien?">${escapeHtml(training.desiredBehavior)}</textarea>
            ${renderFieldSupport(
              "Eén zichtbaar gedrag per regel.",
              "desiredBehavior"
            )}
          </div>
          <div class="field">
            <label for="training-evaluation">Evaluatiecriteria</label>
            <textarea id="training-evaluation" name="evaluationCriteria" placeholder="Wanneer is het trainingsdoel behaald?">${escapeHtml(training.evaluationCriteria)}</textarea>
            ${renderFieldSupport(
              "Beschrijf wat je daadwerkelijk kunt zien of tellen.",
              "evaluationCriteria"
            )}
          </div>
        </section>

        <section class="form-card">
          <h2>Materialen</h2>
          <div class="field">
            <label for="training-materials">Benodigdheden</label>
            <textarea id="training-materials" name="materials" placeholder="Bijv. 12 pionnen, 8 hesjes en 6 ballen">${escapeHtml(training.materials)}</textarea>
            ${renderFieldSupport(
              "Zet ieder materiaal op een aparte regel.",
              "materials"
            )}
          </div>
        </section>

        <section class="form-card">
          <div class="form-card-heading">
            <div>
              <span class="detail-label">Trainingsopbouw</span>
              <h2>Trainingsonderdelen</h2>
            </div>
          </div>
          <ol class="clean-list exercise-list exercise-editor-list" id="exercise-editor-list">
            ${training.parts.map(renderExerciseEditor).join("")}
          </ol>
          <button class="secondary-button add-part-button" type="button" data-add-exercise>
            ＋ Onderdeel toevoegen
          </button>
        </section>

        <p class="form-note">Wijzigingen worden tijdens het typen als concept op dit apparaat bewaard.</p>

        <div class="form-sticky-actions">
          <button
            class="secondary-button"
            type="button"
            data-cancel-form
            data-cancel-route="${isEditing ? "training" : "trainingen"}"
            data-cancel-id="${isEditing ? escapeHtml(existing.id) : ""}"
          >
            Annuleren
          </button>
          <button class="primary-button" type="submit">Training opslaan</button>
        </div>
      </form>
    </section>
  `;

  window.requestAnimationFrame(updateMoveButtons);
}

function createEmptyPart() {
  return {
    id: createUniqueId("onderdeel"),
    name: "",
    type: "Overig",
    duration: 0,
    organization: "",
    flow: "",
    attackingCoaching: "",
    defendingCoaching: "",
    transitionCoaching: "",
    rulesScoring: "",
    variations: "",
    materials: ""
  };
}

function renderExerciseEditor(part = createEmptyPart()) {
  return `
    <li class="exercise-editor-row" data-part-id="${escapeHtml(part.id)}">
      <div class="exercise-fields">
        <div class="part-heading">
          <strong>Onderdeel</strong>
          <div class="part-move-actions">
            <button type="button" data-move-part="up">Omhoog</button>
            <button type="button" data-move-part="down">Omlaag</button>
          </div>
        </div>
        <div class="field">
          <label>Naam</label>
          <input name="partName" aria-label="Naam onderdeel" value="${escapeHtml(part.name)}" placeholder="Naam van het onderdeel">
        </div>
        <div class="field-grid">
          <div class="field">
            <label>Type</label>
            <select name="partType" aria-label="Type onderdeel">
              ${PART_TYPES.map((type) => `
                <option value="${type}" ${part.type === type ? "selected" : ""}>${type}</option>
              `).join("")}
            </select>
          </div>
          <div class="field">
            <label>Duur in minuten</label>
            <input type="number" min="0" inputmode="numeric" name="partDuration" aria-label="Duur onderdeel in minuten" value="${part.duration || ""}" placeholder="15">
          </div>
        </div>
        <div class="field">
          <label>Organisatie</label>
          <textarea name="partOrganization" aria-label="Organisatie onderdeel" placeholder="Veldafmetingen, aantallen en opstelling">${escapeHtml(part.organization)}</textarea>
          ${renderFieldSupport(
            "Noem aantallen, veldafmetingen, doelen en startposities.",
            "organization"
          )}
        </div>
        <div class="field">
          <label>Verloop</label>
          <textarea name="partFlow" aria-label="Verloop onderdeel" placeholder="Hoe verloopt dit onderdeel?">${escapeHtml(part.flow)}</textarea>
          ${renderFieldSupport(
            "Beschrijf de acties in volgorde en benoem wanneer de vorm opnieuw start.",
            "flow"
          )}
        </div>
        <div class="field">
          <label>Aanvallende coachingpunten</label>
          <textarea name="partAttackingCoaching" aria-label="Aanvallende coachingpunten" placeholder="Wat coach je bij balbezit?">${escapeHtml(part.attackingCoaching)}</textarea>
          ${renderFieldSupport(
            "Kort, concreet en één aanwijzing per regel.",
            "attackingCoaching"
          )}
        </div>
        <div class="field">
          <label>Verdedigende coachingpunten</label>
          <textarea name="partDefendingCoaching" aria-label="Verdedigende coachingpunten" placeholder="Wat coach je bij balbezit tegenstander?">${escapeHtml(part.defendingCoaching)}</textarea>
          ${renderFieldSupport(
            "Kort, concreet en één aanwijzing per regel.",
            "defendingCoaching"
          )}
        </div>
        <div class="field">
          <label>Omschakelcoaching</label>
          <textarea name="partTransitionCoaching" aria-label="Omschakelcoaching" placeholder="Wat coach je direct na balwinst of balverlies?">${escapeHtml(part.transitionCoaching)}</textarea>
          ${renderFieldSupport(
            "Maak onderscheid tussen het moment van balwinst en balverlies.",
            "transitionCoaching"
          )}
        </div>
        <div class="field">
          <label>Regels en puntentelling</label>
          <textarea name="partRulesScoring" aria-label="Regels en puntentelling" placeholder="Welke regels, punten of bonusvoorwaarden gelden?">${escapeHtml(part.rulesScoring)}</textarea>
          ${renderFieldSupport(
            "Zet iedere spelregel of scorevoorwaarde op een aparte regel.",
            "rulesScoring"
          )}
        </div>
        <div class="field">
          <label>Variaties</label>
          <textarea name="partVariations" aria-label="Variaties onderdeel" placeholder="Hoe maak je de vorm makkelijker of moeilijker?">${escapeHtml(part.variations)}</textarea>
          ${renderFieldSupport(
            "Eén aanpassing per regel; begin met makkelijker en bouw op.",
            "variations"
          )}
        </div>
        <div class="field">
          <label>Materialen</label>
          <textarea name="partMaterials" aria-label="Materialen onderdeel" placeholder="Welke materialen zijn hier nodig?">${escapeHtml(part.materials)}</textarea>
          ${renderFieldSupport(
            "Zet ieder materiaal op een aparte regel.",
            "partMaterials"
          )}
        </div>
        <button class="remove-exercise-button" type="button" data-remove-exercise>
          Onderdeel verwijderen
        </button>
      </div>
    </li>
  `;
}

function updateMoveButtons() {
  const rows = [...document.querySelectorAll(".exercise-editor-row")];
  rows.forEach((row, index) => {
    row.querySelector('[data-move-part="up"]').disabled = index === 0;
    row.querySelector('[data-move-part="down"]').disabled = index === rows.length - 1;
  });
}

function applyTemplateToForm(templateKey) {
  const form = document.querySelector("#training-form");
  if (!form) return;

  if (
    formDirty
    && !window.confirm("De huidige formulierinhoud wordt vervangen. Wil je doorgaan?")
  ) {
    return;
  }

  const training = createTrainingFromTemplate(templateKey);
  const values = {
    code: training.code,
    title: training.title,
    date: "",
    theme: training.theme,
    block: training.block,
    totalDuration: training.totalDuration || "",
    mainGoal: training.mainGoal,
    desiredBehavior: training.desiredBehavior,
    evaluationCriteria: training.evaluationCriteria,
    materials: training.materials
  };

  Object.entries(values).forEach(([name, value]) => {
    if (form.elements[name]) form.elements[name].value = value;
  });

  document.querySelector("#exercise-editor-list").innerHTML = training.parts
    .map(renderExerciseEditor)
    .join("");
  document.querySelector("#training-form-errors").hidden = true;
  updateMoveButtons();
  formDirty = false;
  markTrainingFormDirty();
  showToast("Sjabloon ingevuld");
}

function renderDetailText(label, value) {
  if (!String(value || "").trim()) return "";

  return `
    <div class="detail-field">
      <span class="detail-label">${escapeHtml(label)}</span>
      <p>${escapeHtml(value)}</p>
    </div>
  `;
}

function renderDetailList(label, value) {
  const list = linesToSafeList(value);
  if (!list) return "";

  return `
    <div class="detail-field">
      <span class="detail-label">${escapeHtml(label)}</span>
      ${list}
    </div>
  `;
}

function renderPartDetailCard(part, index) {
  const coaching = [
    renderDetailList("Aanvallend", part.attackingCoaching),
    renderDetailList("Verdedigend", part.defendingCoaching),
    renderDetailList("Omschakeling", part.transitionCoaching)
  ].filter(Boolean).join("");
  const meta = [
    part.type,
    part.duration ? `${part.duration} min` : ""
  ].filter(Boolean).join(" · ");

  return `
    <article class="part-detail-card">
      <header class="part-detail-card-header">
        <span class="part-number">${String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3>${escapeHtml(part.name)}</h3>
          ${meta ? `<span class="part-type">${escapeHtml(meta)}</span>` : ""}
        </div>
      </header>
      <div class="part-detail-card-body">
        ${renderDetailText("Organisatie", part.organization)}
        ${renderDetailText("Verloop", part.flow)}
        ${coaching ? `
          <section class="coaching-phase-group">
            <h4>Coachingpunten per spelfase</h4>
            ${coaching}
          </section>
        ` : ""}
        ${renderDetailList("Regels en puntentelling", part.rulesScoring)}
        ${renderDetailList("Variaties", part.variations)}
        ${renderDetailList("Materialen", part.materials)}
      </div>
    </article>
  `;
}

function renderTrainingDetail(id) {
  const training = getTraining(id);

  if (!training) {
    goTo("trainingen");
    return;
  }

  const parts = training.parts
    .filter((part) => [
      part.name,
      part.organization,
      part.flow,
      part.attackingCoaching,
      part.defendingCoaching,
      part.transitionCoaching,
      part.rulesScoring,
      part.variations,
      part.materials
    ].some((value) => String(value || "").trim()))
    .map(renderPartDetailCard)
    .join("");
  const goalContent = [
    renderDetailText("Hoofddoel", training.mainGoal),
    renderDetailList("Gewenst spelersgedrag", training.desiredBehavior),
    renderDetailList("Evaluatiecriteria", training.evaluationCriteria)
  ].filter(Boolean).join("");
  const materials = linesToSafeList(training.materials);

  app.innerHTML = `
    <article class="screen" aria-labelledby="training-title">
      <header class="detail-hero">
        <span class="detail-code">${escapeHtml(training.code)}</span>
        <h1 id="training-title">${escapeHtml(training.title)}</h1>
        <p>${escapeHtml(training.theme)}</p>
      </header>

      <div class="fact-grid">
        <div class="fact-card">
          <span class="detail-label">Duur</span>
          <span class="fact-value">${training.totalDuration || 0} minuten</span>
        </div>
        <div class="fact-card">
          <span class="detail-label">Onderdelen</span>
          <span class="fact-value">${training.parts.length} onderdelen</span>
        </div>
        ${training.date ? `
          <div class="fact-card">
            <span class="detail-label">Datum</span>
            <span class="fact-value">${escapeHtml(formatShortDate(training.date))}</span>
          </div>
        ` : ""}
        ${training.block ? `
          <div class="fact-card">
            <span class="detail-label">Trainingsblok</span>
            <span class="fact-value">${escapeHtml(training.block)}</span>
          </div>
        ` : ""}
      </div>

      <div class="content-stack">
        ${goalContent ? `
          <section class="content-card">
            <h3>Trainingsdoel</h3>
            ${goalContent}
          </section>
        ` : ""}
        ${materials ? `
          <section class="content-card">
            <h3>Materialen</h3>
            ${materials}
          </section>
        ` : ""}
        ${parts ? `
          <section class="parts-detail-section">
            <h2>Trainingsonderdelen</h2>
            <div class="part-detail-card-list">${parts}</div>
          </section>
        ` : ""}
        ${renderAttendanceSection({
          eventType: "training",
          eventId: training.id,
          title: "Aanwezigheid"
        })}
      </div>

      <div class="detail-actions">
        <button class="secondary-button" type="button" data-edit-training="${escapeHtml(training.id)}">
          Bewerken
        </button>
        <button class="secondary-button" type="button" data-duplicate-training="${escapeHtml(training.id)}">
          Training dupliceren
        </button>
        <button class="secondary-button" type="button" data-use-as-template="${escapeHtml(training.id)}">
          Als sjabloon gebruiken
        </button>
        <button class="danger-button" type="button" data-delete-training="${escapeHtml(training.id)}">
          Training verwijderen
        </button>
      </div>

      ${renderHistory(training.id)}

      <div class="sticky-action">
        <button class="primary-button" type="button" data-reflect="${training.id}">
          Training afronden
        </button>
      </div>
    </article>
  `;
}

function renderReflection(id) {
  const training = getTraining(id);

  if (!training) {
    goTo("trainingen");
    return;
  }

  app.innerHTML = `
    <section class="screen" aria-labelledby="reflection-title">
      <header class="screen-header screen-header-compact">
        <p class="eyebrow">${escapeHtml(training.code)} · Afronden</p>
        <h1 id="reflection-title">Reflectie</h1>
        <p class="lead">${escapeHtml(training.title)}</p>
      </header>

      <form class="reflection-form" id="reflection-form" data-training-id="${escapeHtml(training.id)}">
        <div class="field">
          <label for="went-well">Wat ging goed?</label>
          <textarea id="went-well" name="wentWell" placeholder="Bijvoorbeeld: de druk na balverlies was direct..." required></textarea>
        </div>
        <div class="field">
          <label for="went-less">Wat ging minder?</label>
          <textarea id="went-less" name="wentLess" placeholder="Waar verloor de groep grip?" required></textarea>
        </div>
        <div class="field">
          <label for="stood-out">Wat viel op?</label>
          <textarea id="stood-out" name="stoodOut" placeholder="Spelers, gedrag of onverwachte momenten..." required></textarea>
        </div>
        <div class="field">
          <label for="next-training">Wat neem ik mee naar de volgende training?</label>
          <textarea id="next-training" name="nextTraining" placeholder="Maak je volgende aandachtspunt concreet..." required></textarea>
        </div>
        <p class="form-note">Je reflectie wordt alleen op dit apparaat bewaard.</p>
        <button class="primary-button" type="submit">Reflectie opslaan</button>
      </form>

      ${renderHistory(training.id)}
    </section>
  `;
}

function renderHistory(trainingId) {
  const reflections = reflectionsFor(trainingId);

  if (!reflections.length) {
    return `
      <section class="history-section" aria-labelledby="history-title">
        <div class="section-heading">
          <h2 id="history-title">Historie</h2>
          <span>0 reflecties</span>
        </div>
        <div class="empty-history">
          <strong>Nog geen reflecties</strong>
          Na het afronden verschijnt je eerste notitie hier.
        </div>
      </section>
    `;
  }

  const labels = {
    wentWell: "Wat ging goed?",
    wentLess: "Wat ging minder?",
    stoodOut: "Wat viel op?",
    nextTraining: "Meenemen naar volgende training"
  };

  const cards = reflections.map((reflection) => {
    const items = Object.entries(labels).map(([key, label]) => `
      <div class="history-item">
        <span class="history-question">${label}</span>
        <p class="history-answer" data-answer="${key}"></p>
      </div>
    `).join("");

    return `
      <article class="history-card" data-reflection-id="${reflection.id}">
        <div class="history-date">${formatDate(reflection.createdAt)}</div>
        ${items}
      </article>
    `;
  }).join("");

  window.requestAnimationFrame(() => {
    reflections.forEach((reflection) => {
      const card = document.querySelector(`[data-reflection-id="${reflection.id}"]`);
      if (!card) return;

      Object.keys(labels).forEach((key) => {
        card.querySelector(`[data-answer="${key}"]`).textContent = reflection[key];
      });
    });
  });

  return `
    <section class="history-section" aria-labelledby="history-title">
      <div class="section-heading">
        <h2 id="history-title">Historie</h2>
        <span>${reflections.length} ${reflections.length === 1 ? "reflectie" : "reflecties"}</span>
      </div>
      <div class="history-list">${cards}</div>
    </section>
  `;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(new Date(value));
}

function formatShortDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

function formatAddedDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function formatFileSize(bytes) {
  if (!bytes) return "0 KB";
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function handleClick(event) {
  const routeButton = event.target.closest("[data-route]");
  const trainingButton = event.target.closest("[data-training]");
  const seasonWeekButton = event.target.closest("[data-season-week]");
  const principleButton = event.target.closest("[data-principle]");
  const reflectButton = event.target.closest("[data-reflect]");
  const upcomingButton = event.target.closest("[data-upcoming]");
  const createButton = event.target.closest("[data-create-training]");
  const createPrincipleButton = event.target.closest("[data-create-principle]");
  const editPrincipleButton = event.target.closest("[data-edit-principle]");
  const deletePrincipleButton = event.target.closest("[data-delete-principle]");
  const createSourceButton = event.target.closest("[data-create-source]");
  const editSourceButton = event.target.closest("[data-edit-source]");
  const deleteSourceButton = event.target.closest("[data-delete-source]");
  const openSourceButton = event.target.closest("[data-open-source]");
  const editButton = event.target.closest("[data-edit-training]");
  const deleteButton = event.target.closest("[data-delete-training]");
  const duplicateButton = event.target.closest("[data-duplicate-training]");
  const useAsTemplateButton = event.target.closest("[data-use-as-template]");
  const applyTemplateButton = event.target.closest("[data-apply-template]");
  const exampleButton = event.target.closest("[data-toggle-example]");
  const addExerciseButton = event.target.closest("[data-add-exercise]");
  const removeExerciseButton = event.target.closest("[data-remove-exercise]");
  const movePartButton = event.target.closest("[data-move-part]");
  const cancelButton = event.target.closest("[data-cancel-form]");
  const exportButton = event.target.closest("[data-export-backup]");
  const importButton = event.target.closest("[data-import-backup]");
  const createSeasonWeekButton = event.target.closest("[data-create-season-week]");
  const editSeasonWeekButton = event.target.closest("[data-edit-season-week]");
  const duplicateSeasonWeekButton = event.target.closest("[data-duplicate-season-week]");
  const deleteSeasonWeekButton = event.target.closest("[data-delete-season-week]");
  const unlinkTrainingButton = event.target.closest("[data-unlink-training]");
  const createPlayerButton = event.target.closest("[data-create-player]");
  const editPlayerButton = event.target.closest("[data-edit-player]");
  const togglePlayerButton = event.target.closest("[data-toggle-player]");
  const deletePlayerButton = event.target.closest("[data-delete-player]");
  const attendanceAllButton = event.target.closest("[data-attendance-all]");
  const attendanceNoteButton = event.target.closest("[data-toggle-attendance-note]");

  if (routeButton) goTo(routeButton.dataset.route);
  if (trainingButton) goTo("training", trainingButton.dataset.training);
  if (seasonWeekButton) goTo("speelweek", seasonWeekButton.dataset.seasonWeek);
  if (principleButton) goTo("spelprincipe", principleButton.dataset.principle);
  if (reflectButton) goTo("reflectie", reflectButton.dataset.reflect);
  if (upcomingButton) showToast("Komt in een volgende versie");
  if (createButton) goTo("training-nieuw");
  if (createPrincipleButton) goTo("spelprincipe-nieuw");
  if (createSeasonWeekButton) goTo("speelweek-nieuw");
  if (createPlayerButton) goTo("speler-nieuw");
  if (editPlayerButton) goTo("speler-bewerken", editPlayerButton.dataset.editPlayer);
  if (editSeasonWeekButton) {
    goTo("speelweek-bewerken", editSeasonWeekButton.dataset.editSeasonWeek);
  }
  if (editPrincipleButton) {
    goTo("spelprincipe-bewerken", editPrincipleButton.dataset.editPrinciple);
  }
  if (createSourceButton) goTo("bron-nieuw", createSourceButton.dataset.createSource);
  if (editSourceButton) {
    goTo(
      "bron-bewerken",
      createSourceRouteId(
        editSourceButton.dataset.principleId,
        editSourceButton.dataset.editSource
      )
    );
  }
  if (openSourceButton) openKnowledgeSource(openSourceButton.dataset.openSource);
  if (editButton) goTo("training-bewerken", editButton.dataset.editTraining);

  if (deletePrincipleButton) {
    const principle = getPrinciple(deletePrincipleButton.dataset.deletePrinciple);
    if (!principle) return;

    const sourceCount = getSourcesForPrinciple(principle.id).length;
    const confirmed = window.confirm(
      sourceCount
        ? `Weet je zeker dat je “${principle.title}” wilt verwijderen? Bronnen die nergens anders zijn gekoppeld worden ook verwijderd.`
        : `Weet je zeker dat je “${principle.title}” wilt verwijderen?`
    );

    if (confirmed) {
      deletePrinciple(principle.id);
      showToast("Spelprincipe verwijderd");
      goTo("playbook");
    }
  }

  if (deleteSourceButton) {
    const sourceId = deleteSourceButton.dataset.deleteSource;
    const principleId = deleteSourceButton.dataset.principleId;
    const source = getSource(sourceId);
    if (!source) return;

    const relationCount = getKnowledgeBase().principleSources
      .filter((relation) => relation.sourceId === sourceId).length;
    const confirmed = window.confirm(
      relationCount > 1
        ? `Wil je “${source.title}” loskoppelen van dit spelprincipe? De bron blijft bij andere spelprincipes bestaan.`
        : `Wil je “${source.title}” verwijderen? Het gekoppelde PDF-bestand wordt ook lokaal verwijderd.`
    );

    if (confirmed) {
      const fullyDeleted = removeSourceFromPrinciple(sourceId, principleId);
      showToast(fullyDeleted ? "Bron verwijderd" : "Bron losgekoppeld");
      renderPrincipleDetail(principleId);
    }
  }

  if (applyTemplateButton) {
    const select = document.querySelector("[data-template-select]");
    applyTemplateToForm(select.value);
  }

  if (exampleButton) {
    const field = exampleButton.closest(".field");
    const example = field.querySelector(".field-example");
    example.hidden = !example.hidden;
    exampleButton.textContent = example.hidden
      ? "Voorbeeld tonen"
      : "Voorbeeld verbergen";
  }

  if (addExerciseButton) {
    document.querySelector("#exercise-editor-list")
      .insertAdjacentHTML("beforeend", renderExerciseEditor());
    updateMoveButtons();
    markTrainingFormDirty();
  }

  if (removeExerciseButton) {
    const row = removeExerciseButton.closest(".exercise-editor-row");
    row.remove();
    updateMoveButtons();
    markTrainingFormDirty();
  }

  if (movePartButton) {
    const row = movePartButton.closest(".exercise-editor-row");
    const direction = movePartButton.dataset.movePart;

    if (direction === "up" && row.previousElementSibling) {
      row.parentElement.insertBefore(row, row.previousElementSibling);
    }

    if (direction === "down" && row.nextElementSibling) {
      row.parentElement.insertBefore(row.nextElementSibling, row);
    }

    updateMoveButtons();
    markTrainingFormDirty();
  }

  if (cancelButton) {
    goTo(
      cancelButton.dataset.cancelRoute,
      cancelButton.dataset.cancelId || null
    );
  }

  if (duplicateButton) {
    const duplicate = duplicateTraining(duplicateButton.dataset.duplicateTraining);

    if (duplicate) {
      showToast("Training gedupliceerd");
      goTo("training-bewerken", duplicate.id);
    }
  }

  if (useAsTemplateButton) {
    const templateCopy = useTrainingAsTemplate(
      useAsTemplateButton.dataset.useAsTemplate
    );

    if (templateCopy) {
      showToast("Nieuwe training vanuit sjabloon");
      goTo("training-bewerken", templateCopy.id);
    }
  }

  if (deleteButton) {
    const training = getTraining(deleteButton.dataset.deleteTraining);
    if (!training) return;
    const attendanceCount = getAttendanceForEvent("training", training.id).length;

    const confirmed = window.confirm(
      `Weet je zeker dat je ${training.code} — ${training.title} wilt verwijderen?${attendanceCount ? " De gekoppelde aanwezigheidsregistratie wordt ook verwijderd." : ""}`
    );

    if (confirmed) {
      const linkedReflections = reflectionsFor(training.id);
      const deleteLinkedReflections = linkedReflections.length
        ? window.confirm("Wil je ook de gekoppelde reflecties verwijderen?")
        : false;

      deleteTraining(training.id, deleteLinkedReflections);
      showToast("Training verwijderd");
      goTo("trainingen");
    }
  }

  if (duplicateSeasonWeekButton) {
    const duplicate = duplicateSeasonWeek(
      duplicateSeasonWeekButton.dataset.duplicateSeasonWeek
    );

    if (duplicate) {
      showToast("Speelweek gedupliceerd");
      goTo("speelweek-bewerken", duplicate.id);
    }
  }

  if (deleteSeasonWeekButton) {
    const week = getSeasonWeek(deleteSeasonWeekButton.dataset.deleteSeasonWeek);
    if (!week) return;
    const availabilityCount = getAttendanceForEvent("seasonWeek", week.id).length;

    const confirmed = window.confirm(
      `Weet je zeker dat je de speelweek ${formatSeasonDateRange(week.dateFrom, week.dateTo)} wilt verwijderen? Gekoppelde trainingen en reflecties blijven bestaan.${availabilityCount ? " De speelweekbeschikbaarheid wordt verwijderd." : ""}`
    );

    if (confirmed) {
      deleteSeasonWeek(week.id);
      showToast("Speelweek verwijderd");
      goTo("seizoen");
    }
  }

  if (togglePlayerButton) {
    const isCurrentlyActive = togglePlayerButton.dataset.playerActive === "true";
    if (setPlayerActive(togglePlayerButton.dataset.togglePlayer, !isCurrentlyActive)) {
      showToast(isCurrentlyActive ? "Speler gedeactiveerd" : "Speler geheractiveerd");
      renderPlayers();
    }
  }

  if (deletePlayerButton) {
    const player = getPlayer(deletePlayerButton.dataset.deletePlayer);
    if (!player) return;

    if (playerHasAttendance(player.id) && player.isActive) {
      const deactivate = window.confirm(
        `${player.displayName} heeft opgeslagen historie. Deactiveren bewaart die historie. Wil je de speler deactiveren?`
      );
      if (deactivate) {
        setPlayerActive(player.id, false);
        showToast("Speler gedeactiveerd");
        renderPlayers();
        return;
      }
    }

    const confirmed = window.confirm(
      playerHasAttendance(player.id)
        ? `Wil je ${player.displayName} definitief verwijderen? Alle gekoppelde aanwezigheids- en beschikbaarheidsregistraties worden ook verwijderd.`
        : `Weet je zeker dat je ${player.displayName} definitief wilt verwijderen?`
    );
    if (confirmed) {
      deletePlayer(player.id);
      showToast("Speler verwijderd");
      renderPlayers();
    }
  }

  if (attendanceAllButton) {
    const section = attendanceAllButton.closest(".attendance-section");
    section.querySelectorAll("[data-attendance-status]").forEach((select) => {
      select.value = attendanceAllButton.dataset.attendanceAll;
    });
    formDirty = true;
  }

  if (attendanceNoteButton) {
    const playerRow = attendanceNoteButton.closest("[data-attendance-player]");
    const note = playerRow.querySelector(".attendance-note");
    note.hidden = !note.hidden;
    attendanceNoteButton.setAttribute("aria-expanded", String(!note.hidden));
    attendanceNoteButton.textContent = note.hidden ? "Notitie toevoegen" : "Notitie verbergen";
    if (!note.hidden) note.querySelector("textarea").focus();
  }

  if (unlinkTrainingButton) {
    unlinkTrainingFromSeasonWeek(
      unlinkTrainingButton.dataset.weekId,
      unlinkTrainingButton.dataset.unlinkTraining
    );
    showToast("Training ontkoppeld");
    renderSeasonWeekDetail(unlinkTrainingButton.dataset.weekId);
  }

  if (exportButton) {
    downloadBackup();
    showToast("Back-up gedownload");
  }

  if (importButton) {
    document.querySelector("#backup-file").click();
  }
}

async function handleSubmit(event) {
  if (event.target.id === "training-form") {
    saveTrainingForm(event);
    return;
  }

  if (event.target.id === "principle-form") {
    savePrincipleForm(event);
    return;
  }

  if (event.target.id === "source-form") {
    await saveSourceForm(event);
    return;
  }

  if (event.target.id === "season-week-form") {
    saveSeasonWeekForm(event);
    return;
  }

  if (event.target.id === "player-form") {
    savePlayerForm(event);
    return;
  }

  if (event.target.id === "attendance-form") {
    saveAttendanceForm(event);
    return;
  }

  if (event.target.id === "season-training-link-form") {
    event.preventDefault();
    const form = event.target;
    const trainingId = form.elements.trainingId.value;

    if (!trainingId) {
      showToast("Kies eerst een training");
      return;
    }

    if (linkTrainingToSeasonWeek(form.dataset.weekId, trainingId)) {
      showToast("Training gekoppeld");
      renderSeasonWeekDetail(form.dataset.weekId);
    }
    return;
  }

  if (event.target.id !== "reflection-form") return;

  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const trainingId = form.dataset.trainingId;

  saveReflection({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    trainingId,
    trainingCode: getTraining(trainingId).code,
    createdAt: new Date().toISOString(),
    wentWell: formData.get("wentWell").trim(),
    wentLess: formData.get("wentLess").trim(),
    stoodOut: formData.get("stoodOut").trim(),
    nextTraining: formData.get("nextTraining").trim()
  });

  showToast("Reflectie opgeslagen");
  goTo("training", trainingId);
}

function savePlayerForm(event) {
  event.preventDefault();
  const form = event.target;
  const existing = getPlayer(form.dataset.playerId);
  const now = new Date().toISOString();
  const firstName = form.elements.firstName.value.trim();
  const lastName = form.elements.lastName.value.trim();
  const player = normalizePlayer({
    id: form.dataset.playerId,
    teamId: TEAM_ID,
    firstName,
    lastName,
    displayName: form.elements.displayName.value.trim() || `${firstName} ${lastName}`.trim(),
    shirtNumber: form.elements.shirtNumber.value === ""
      ? ""
      : Number(form.elements.shirtNumber.value),
    primaryPosition: form.elements.primaryPosition.value.trim(),
    secondaryPosition: form.elements.secondaryPosition.value.trim(),
    preferredFoot: form.elements.preferredFoot.value,
    isActive: existing ? existing.isActive : true,
    createdAt: form.dataset.createdAt || now,
    updatedAt: now
  });
  const errors = validatePlayer(player);
  if (errors.length) {
    showFormErrors(errors, "player-form-errors");
    return;
  }

  try {
    if (existing) updatePlayer(player);
    else savePlayer(player);
  } catch (error) {
    console.warn("De speler kon niet worden opgeslagen.", error);
    showFormErrors(["De speler kon niet lokaal worden opgeslagen."], "player-form-errors");
    return;
  }

  formDirty = false;
  showToast("Speler opgeslagen");
  goTo("spelers");
}

function saveAttendanceForm(event) {
  event.preventDefault();
  const form = event.target;
  const now = new Date().toISOString();
  const records = [...form.querySelectorAll("[data-attendance-player]")].map((row) => ({
    id: createUniqueId("aanwezigheid"),
    teamId: TEAM_ID,
    playerId: row.dataset.attendancePlayer,
    eventType: form.dataset.eventType,
    eventId: form.dataset.eventId,
    status: row.querySelector("[data-attendance-status]").value,
    note: row.querySelector('[name="note"]').value.trim(),
    createdAt: now,
    updatedAt: now
  }));

  try {
    upsertAttendanceRecords(records);
  } catch (error) {
    console.warn("De registratie kon niet worden opgeslagen.", error);
    showToast("De registratie kon niet lokaal worden opgeslagen");
    return;
  }

  formDirty = false;
  showToast(form.dataset.eventType === "training"
    ? "Aanwezigheid opgeslagen"
    : "Speelweekbeschikbaarheid opgeslagen");
}

function savePrincipleForm(event) {
  event.preventDefault();
  const form = event.target;
  const existingId = form.dataset.principleId;
  const now = new Date().toISOString();
  const principle = {
    id: existingId || createUniqueId("spelprincipe"),
    title: form.elements.title.value.trim(),
    description: form.elements.description.value.trim(),
    createdAt: form.dataset.createdAt || now,
    updatedAt: now
  };
  const errors = validatePrinciple(principle);

  if (errors.length) {
    showFormErrors(errors, "principle-form-errors");
    return;
  }

  try {
    if (existingId) {
      updatePrinciple(principle);
    } else {
      savePrinciple(principle);
    }
  } catch (error) {
    console.warn("Het spelprincipe kon niet worden opgeslagen.", error);
    showFormErrors(
      ["Het spelprincipe kon niet lokaal worden opgeslagen."],
      "principle-form-errors"
    );
    return;
  }

  showToast("Spelprincipe opgeslagen");
  goTo("spelprincipe", principle.id);
}

function readSourceForm(form) {
  const value = (name) => form.elements[name].value.trim();

  return {
    id: form.dataset.sourceId || "",
    title: value("title"),
    type: value("type"),
    url: value("url"),
    author: value("author"),
    summary: value("summary"),
    keyInsight: value("keyInsight"),
    notes: value("notes"),
    primaryPrincipleId: form.dataset.principleId,
    createdAt: form.dataset.createdAt || "",
    updatedAt: ""
  };
}

async function saveSourceForm(event) {
  event.preventDefault();
  const form = event.target;
  const principleId = form.dataset.principleId;
  const existing = form.dataset.sourceId ? getSource(form.dataset.sourceId) : null;
  const now = new Date().toISOString();
  const source = {
    ...readSourceForm(form),
    id: form.dataset.sourceId || createUniqueId("bron"),
    fileReference: existing ? existing.fileReference : null,
    createdAt: form.dataset.createdAt || now,
    updatedAt: now
  };
  const errors = validateSource(source);
  const file = form.elements.file.files[0];

  if (file) {
    const fileError = await validatePdfFile(file);
    if (fileError) errors.push(fileError);
  }

  if (errors.length) {
    showFormErrors(errors, "source-form-errors");
    return;
  }

  if (file) {
    try {
      const fileDataUrl = await readFileAsDataUrl(file);
      source.fileReference = {
        name: file.name,
        type: "application/pdf",
        size: file.size,
        dataUrl: fileDataUrl.replace(
          /^data:[^;]*;base64,/,
          "data:application/pdf;base64,"
        )
      };
    } catch (error) {
      console.warn("Het PDF-bestand kon niet worden gelezen.", error);
      showFormErrors(
        ["Het PDF-bestand kon niet worden gelezen. Kies het bestand opnieuw."],
        "source-form-errors"
      );
      return;
    }
  }

  try {
    saveSourceForPrinciple(source, principleId);
  } catch (error) {
    console.warn("De bron kon niet worden opgeslagen.", error);
    const storageMessage = error && (
      error.name === "QuotaExceededError"
      || error.code === 22
    )
      ? "Er is onvoldoende lokale opslagruimte. Verwijder een andere PDF of kies een kleiner bestand."
      : "De bron kon niet lokaal worden opgeslagen.";
    showFormErrors([storageMessage], "source-form-errors");
    return;
  }

  showToast("Bron opgeslagen");
  goTo("spelprincipe", principleId);
}

function readSeasonWeekForm(form) {
  const value = (name) => form.elements[name].value.trim();

  return {
    id: form.dataset.weekId || "",
    seasonId: form.dataset.seasonId,
    dateFrom: value("dateFrom"),
    dateTo: value("dateTo"),
    type: value("type"),
    phase: value("phase"),
    note: value("note"),
    trainingWeekNumber: value("trainingWeekNumber"),
    status: value("status"),
    trainingIds: [],
    matchId: null,
    createdAt: form.dataset.createdAt || "",
    updatedAt: ""
  };
}

function saveSeasonWeekForm(event) {
  event.preventDefault();
  const form = event.target;
  const existing = form.dataset.weekId ? getSeasonWeek(form.dataset.weekId) : null;
  const now = new Date().toISOString();
  const week = {
    ...readSeasonWeekForm(form),
    id: form.dataset.weekId || createUniqueId("speelweek"),
    trainingIds: existing ? existing.trainingIds : [],
    matchId: existing ? existing.matchId : null,
    createdAt: form.dataset.createdAt || now,
    updatedAt: now
  };
  const errors = validateSeasonWeek(week);

  if (errors.length) {
    showFormErrors(errors, "season-week-form-errors");
    return;
  }

  try {
    if (existing) {
      updateSeasonWeek(week);
    } else {
      saveSeasonWeek(week);
    }
  } catch (error) {
    console.warn("De speelweek kon niet worden opgeslagen.", error);
    showFormErrors(
      ["De speelweek kon niet lokaal worden opgeslagen."],
      "season-week-form-errors"
    );
    return;
  }

  formDirty = false;
  showToast("Speelweek opgeslagen");
  goTo("speelweek", week.id);
}

function saveTrainingForm(event) {
  event.preventDefault();
  const form = event.target;
  const existingId = form.dataset.trainingId;
  const now = new Date().toISOString();
  const training = {
    ...readTrainingForm(form),
    id: existingId || createUniqueId("training"),
    createdAt: form.dataset.createdAt || now,
    updatedAt: now
  };
  const errors = validateTraining(training);

  if (errors.length) {
    showFormErrors(errors);
    return;
  }

  if (existingId) {
    updateTraining(training);
  } else {
    saveTraining(training);
  }

  window.clearTimeout(draftTimer);
  clearDraft();
  formDirty = false;
  showToast("Training opgeslagen");
  goTo("training", training.id);
}

function readTrainingForm(form) {
  const value = (name) => {
    const field = form.elements[name];
    return field ? field.value.trim() : "";
  };
  const parts = [...form.querySelectorAll(".exercise-editor-row")].map((row) => ({
    id: row.dataset.partId || createUniqueId("onderdeel"),
    name: row.querySelector('[name="partName"]').value.trim(),
    type: row.querySelector('[name="partType"]').value,
    duration: Number(row.querySelector('[name="partDuration"]').value) || 0,
    organization: row.querySelector('[name="partOrganization"]').value.trim(),
    flow: row.querySelector('[name="partFlow"]').value.trim(),
    attackingCoaching: row.querySelector('[name="partAttackingCoaching"]').value.trim(),
    defendingCoaching: row.querySelector('[name="partDefendingCoaching"]').value.trim(),
    transitionCoaching: row.querySelector('[name="partTransitionCoaching"]').value.trim(),
    rulesScoring: row.querySelector('[name="partRulesScoring"]').value.trim(),
    variations: row.querySelector('[name="partVariations"]').value.trim(),
    materials: row.querySelector('[name="partMaterials"]').value.trim()
  }));

  return {
    id: form.dataset.trainingId || "",
    code: value("code"),
    title: value("title"),
    date: value("date"),
    theme: value("theme"),
    block: value("block"),
    totalDuration: Number(value("totalDuration")) || 0,
    mainGoal: value("mainGoal"),
    desiredBehavior: value("desiredBehavior"),
    evaluationCriteria: value("evaluationCriteria"),
    materials: value("materials"),
    parts,
    createdAt: form.dataset.createdAt || "",
    updatedAt: ""
  };
}

function showFormErrors(errors, containerId = "training-form-errors") {
  const container = document.querySelector(`#${containerId}`);
  if (!container) return;
  container.hidden = false;
  container.innerHTML = `
    <strong>Controleer het formulier:</strong>
    <ul>${errors.map((error) => `<li>${escapeHtml(error)}</li>`).join("")}</ul>
  `;
  container.scrollIntoView({ behavior: "smooth", block: "center" });
}

function markTrainingFormDirty() {
  const form = document.querySelector("#training-form");
  if (!form) return;

  formDirty = true;
  window.clearTimeout(draftTimer);
  draftTimer = window.setTimeout(persistCurrentDraft, 350);
}

function persistCurrentDraft() {
  const form = document.querySelector("#training-form");
  if (!form || !formDirty) return;

  saveDraft({
    trainingId: form.dataset.trainingId || "",
    data: readTrainingForm(form)
  });
}

function handleInput(event) {
  if (event.target.matches("[data-training-search]")) {
    trainingListState.query = event.target.value;
    updateTrainingListResults();
    return;
  }

  if (event.target.closest("#training-form")) {
    markTrainingFormDirty();
    return;
  }

  if (event.target.closest("#season-week-form")) {
    formDirty = true;
    return;
  }

  if (event.target.closest("#player-form, #attendance-form")) {
    formDirty = true;
  }
}

function handleChange(event) {
  if (event.target.matches("[data-template-select]")) {
    return;
  }

  if (event.target.matches("[data-block-filter]")) {
    trainingListState.block = event.target.value;
    updateTrainingListResults();
    return;
  }

  if (event.target.matches("[data-training-sort]")) {
    trainingListState.sort = event.target.value;
    updateTrainingListResults();
    return;
  }

  if (event.target.matches("[data-backup-file]")) {
    handleBackupFile(event.target);
    return;
  }

  if (event.target.closest("#training-form")) {
    markTrainingFormDirty();
    return;
  }

  if (event.target.closest("#season-week-form")) {
    formDirty = true;
    return;
  }

  if (event.target.closest("#player-form, #attendance-form")) {
    formDirty = true;
  }
}

function handleHashChange() {
  if (ignoreNextHashChange) {
    ignoreNextHashChange = false;
    return;
  }

  if (formDirty) {
    const leave = window.confirm(
      "Je hebt niet-opgeslagen wijzigingen. Wil je dit formulier verlaten?"
    );

    if (!leave) {
      ignoreNextHashChange = true;
      window.location.hash = currentHash;
      return;
    }

    persistCurrentDraft();
    formDirty = false;
  }

  currentHash = window.location.hash;
  renderApp();
}

async function handleBackupFile(input) {
  const file = input.files[0];
  if (!file) return;

  try {
    const data = JSON.parse(await file.text());
    const importError = validateImport(data);

    if (importError) {
      showToast(importError);
      return;
    }

    const choice = window.prompt(
      'Typ "samenvoegen" om gegevens toe te voegen, of "vervangen" om de huidige gegevens te vervangen.'
    );
    const normalizedChoice = choice
      ? choice.trim().toLocaleLowerCase("nl")
      : "";

    if (!["samenvoegen", "vervangen"].includes(normalizedChoice)) {
      showToast("Import geannuleerd");
      return;
    }

    importData(data, normalizedChoice === "vervangen" ? "replace" : "merge");
    showToast("Back-up geïmporteerd");
    renderTrainings();
  } catch (error) {
    console.warn("Importeren is mislukt.", error);
    showToast("Dit bestand kon niet worden geïmporteerd.");
  } finally {
    input.value = "";
  }
}

backButton.addEventListener("click", () => {
  const parent = backButton.dataset.parent;
  const parentId = backButton.dataset.parentId;
  goTo(parent || "home", parentId || null);
});

app.addEventListener("click", handleClick);
app.addEventListener("submit", handleSubmit);
app.addEventListener("input", handleInput);
app.addEventListener("change", handleChange);
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("beforeunload", (event) => {
  if (!formDirty) return;

  persistCurrentDraft();
  event.preventDefault();
  event.returnValue = "";
});
window.addEventListener("offline", () => {
  showToast("Je werkt offline");
});
window.addEventListener("online", () => {
  showToast("Je bent weer online");
});

setupInstallExperience();
registerServiceWorker();

if (!window.location.hash) {
  window.location.hash = "#home";
} else {
  renderApp();
}
