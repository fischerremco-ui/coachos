// Gerichte datamigratie voor de seizoenskalender.
// Een weekend met "Start nieuwe fase" is in CoachOS óók een competitieronde.
// De fase zelf blijft bewaard in week.phase; het type wordt genormaliseerd zodat
// wedstrijdweergaven en speelminutenregistratie de openingsronde niet overslaan.
(function migrateOpeningCompetitionRounds() {
  const seasonStorageKey = "coachos-season-weeks-v1";
  const weekCardStorageKey = "coachos-week-cards-v1";
  const week37NotesMarker = "[W37 trainingsplan]";

  function normalizeOpeningRound(week) {
    if (!week || week.type !== "Start nieuwe fase" || !week.phase) return false;
    week.type = "Competitiewedstrijd";
    return true;
  }

  function correctWeek36Context(card) {
    if (!card || Number(card.year) !== 2026 || Number(card.weekNumber) !== 36) return false;
    if (card.matchContext === "Competitie • speelronde 1") return false;
    card.matchContext = "Competitie • speelronde 1";
    return true;
  }

  function isWeek37Card(card) {
    return Boolean(card && Number(card.year) === 2026 && Number(card.weekNumber) === 37);
  }

  function hasLegacyWeek37Plan(card) {
    if (!isWeek37Card(card)) return false;
    return card.mainPrinciple === "Restverdediging tijdens aanvallen"
      || String(card.matchContext || "").includes("Beker");
  }

  function week37TrainerNotes() {
    return [
      week37NotesMarker,
      "MAANDAG — Onder de hoge druk uit I",
      "1. ASM / warming-up (12 min): voetenwerk → draaien → ontvangen → versnellen. Coach op hoofd omhoog, explosief uit de beweging, open lichaam en eerste aanname vooruit.",
      "2. Rondo met uitgang (15 min): 4v2 + 2 doelspelers in circa 14x14 m. Na minimaal 3 passes de overzijde bereiken. Vragen: waar komt de druk vandaan, wie wordt vrij, kun je een speler overslaan?",
      "3. Hoofdvorm (25 min): keeper + 2 centrale verdedigers + 2 backs + 6 + 8 tegen 4-5 jagers. Start steeds bij keeper. Oplossingen: DOOR via 6, LANGS via back/8, OVER achter de eerste druk. Jagers zetten vol druk. Punt na uitgespeelde druk; extra punt bij snelle vervolgactie.",
      "4. Partijvorm (28 min): 5v5/6v6/7v7. Extra beloning voor vanuit eigen opbouw de eerste druk uitspelen en binnen 8 seconden tot doelpoging komen. Bij balverlies direct 5 seconden druk. 4x5 min met circa 90 sec herstel/coaching.",
      "5. Afsluiting (10 min): vrij spel en reflectie op door, langs of over.",
      "Kernzin maandag: Lang spelen is niet fout. Blind lang spelen is fout.",
      "",
      "DONDERDAG — Onder de hoge druk uit II",
      "1. Warming-up / rondo (12 min): 5v2 of 4v2. Balbezit bewust wegspelen van de drukrichting. Scan vóór ontvangst en eerste aanname uit druk.",
      "2. Opbouwvorm (18 min): keeper + achterste lijn + middenvelders tegen actieve drukzetters. Verdedigers wisselen per start: 6 afsluiten, backs afsluiten, centrale verdedigers vol aanlopen of iedereen één-op-één vastzetten. Opbouwploeg weet vooraf niet welke variant komt.",
      "3. Grote partijvorm (35 min): 6v6/7v7/8v8 op middelgroot veld. In balbezit durven opbouwen en verbonden blijven; bij balverlies 5 seconden reageren; zonder bal horizontaal en verticaal compact. 3x8 min met circa 2 min herstel/coaching.",
      "4. Wedstrijdscenario's (15 min): doeltrap tegen hoge druk; keeper in open spel; centrale verdediger met afgeschermde 6; één-op-één hoge druk; balverlies rond middenlijn. Iedere situatie 45-60 sec uitspelen.",
      "5. Afsluiting (10 min): vrij spel en weekreflectie.",
      "Coachzin donderdag: Als de bal beweegt, beweegt ons blok."
    ].join("\n");
  }

  function applyWeek37Plan(card, preserveExistingNotes) {
    if (!isWeek37Card(card)) return false;

    card.matchContext = "Competitie • speelronde 2";
    card.mainPrinciple = "Onder de hoge druk uitspelen";
    card.supportingPrinciples = [
      "Druk lokken en vrije man herkennen",
      "5-secondenregel en compact aansluiten"
    ];
    card.desiredBehaviours = [
      "Herken of de oplossing door, langs of over de eerste druk ligt",
      "Speel een lange bal bewust wanneer de ruimte achter de druk ligt",
      "Na balverlies direct 5 seconden reageren en samen aansluiten"
    ];
    card.phaseCycle = {
      attack: "Druk lokken, vrije man vinden en bewust kiezen tussen door, langs of over de eerste druk.",
      lossTransition: "Direct 5 seconden reageren: dichtstbijzijnde speler jaagt, rest sluit aan en bewaakt de as.",
      defend: "Verbonden blijven en met de bal meeschuiven; horizontale en verticale afstanden klein houden.",
      winTransition: "Eerste blik vooruit. Ligt diepte open, speel vooruit; anders uit de drukte naar de vrije kant.",
      setPieces: "Doeltrap onder hoge druk: korte oplossing herkennen of bewust over de eerste druk spelen."
    };
    card.sessions = {
      monday: {
        day: "monday",
        date: "2026-09-07",
        objective: "Onder de hoge druk uit I — herkennen en kiezen",
        suggestedContent: "ASM 12'; rondo 4v2 + 2 doelspelers 15'; opbouw keeper + 4 + 6 + 8 tegen 4-5 jagers 25'; partijvorm eerste druk verslaan 28'; vrij spel en reflectie 10'. Kern: KIJK – LOK – HERKEN – SPEEL.",
        load: "Middel tot hoog: veel keuzes onder druk, wedstrijdintensieve blokken met korte herstelmomenten.",
        duration: 90
      },
      thursday: {
        day: "thursday",
        date: "2026-09-10",
        objective: "Onder de hoge druk uit II — wedstrijdtoepassing",
        suggestedContent: "Rondo met drukrichting 12'; opbouwvorm met wisselende drukopdracht 18'; grote partij 35' met opbouw, 5-secondenregel en compact aansluiten; wedstrijdscenario's 15'; vrij spel en weekreflectie 10'. Kern: SAMEN – KIJK – SPEEL – SLUIT AAN.",
        load: "Middel: wedstrijdgericht en scherp, met voldoende herstel zodat de ploeg fris blijft.",
        duration: 90
      }
    };
    card.setPiece = "Doeltrap B: bewust alternatief over de eerste druk.";
    card.coachWords = [
      "Kijk",
      "Lok",
      "Herken",
      "Door, langs of over",
      "5 seconden",
      "Sluit aan"
    ];
    card.matchCriteria = [
      "Keeper en 3/4 herkennen wanneer de 6 wel of niet bereikbaar is",
      "Vrije back of 8 wordt gevonden wanneer de as dichtstaat",
      "Lange bal is gericht en bewust, niet blind",
      "Na balverlies reageert de ploeg direct en blijven de linies aangesloten"
    ];
    card.expectedLoad = "Maandag middel-hoog; donderdag middel en wedstrijdgericht.";
    card.lowAttendanceAlternative = "6-10 spelers: 4v4 met keeper/mini-doelen en twee uitgangen. Beloon door, langs of over de druk spelen; na balverlies 5 seconden direct reageren.";

    const planNotes = week37TrainerNotes();
    const existingNotes = String(card.trainerNotes || "").trim();
    if (!preserveExistingNotes || !existingNotes) {
      card.trainerNotes = planNotes;
    } else if (!existingNotes.includes(week37NotesMarker)) {
      card.trainerNotes = `${existingNotes}\n\n${planNotes}`;
    }

    return true;
  }

  if (Array.isArray(SEASON_WEEKS)) {
    SEASON_WEEKS.forEach(normalizeOpeningRound);
  }

  if (typeof PLANNER_WEEK_CARDS !== "undefined" && Array.isArray(PLANNER_WEEK_CARDS)) {
    PLANNER_WEEK_CARDS.forEach(correctWeek36Context);
    PLANNER_WEEK_CARDS.forEach((card) => {
      if (isWeek37Card(card)) applyWeek37Plan(card, false);
    });
  }

  try {
    const rawWeeks = localStorage.getItem(seasonStorageKey);
    if (rawWeeks) {
      const savedWeeks = JSON.parse(rawWeeks);
      if (Array.isArray(savedWeeks)) {
        let weeksChanged = false;
        savedWeeks.forEach((week) => {
          weeksChanged = normalizeOpeningRound(week) || weeksChanged;
        });
        if (weeksChanged) {
          localStorage.setItem(seasonStorageKey, JSON.stringify(savedWeeks));
        }
      }
    }

    const rawCards = localStorage.getItem(weekCardStorageKey);
    if (rawCards) {
      const savedCards = JSON.parse(rawCards);
      if (Array.isArray(savedCards)) {
        let cardsChanged = false;
        savedCards.forEach((card) => {
          cardsChanged = correctWeek36Context(card) || cardsChanged;
          if (hasLegacyWeek37Plan(card)) {
            cardsChanged = applyWeek37Plan(card, true) || cardsChanged;
          }
        });
        if (cardsChanged) {
          localStorage.setItem(weekCardStorageKey, JSON.stringify(savedCards));
        }
      }
    }
  } catch (error) {
    console.warn("Kalendercorrectie kon niet worden uitgevoerd.", error);
  }
}());
