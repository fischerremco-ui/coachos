// Gerichte datamigratie voor de seizoenskalender.
// Een weekend met "Start nieuwe fase" is in CoachOS óók een competitieronde.
// De fase zelf blijft bewaard in week.phase; het type wordt genormaliseerd zodat
// wedstrijdweergaven en speelminutenregistratie de openingsronde niet overslaan.
(function migrateOpeningCompetitionRounds() {
  const seasonStorageKey = "coachos-season-weeks-v1";
  const weekCardStorageKey = "coachos-week-cards-v1";
  const trainingStorageKey = "coachos-trainings-v1";
  const week37NotesMarker = "[W37 trainingsplan]";
  const week37PlannerKey = "vsv-jo16-1-2026-2027:2026:W37";

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

  function createWeek37TrainingParts(day) {
    if (day === "monday") {
      return [
        {
          id: "w37-ma-asm",
          name: "Voetenwerk → draaien → ontvangen → versnellen",
          type: "ASM",
          duration: 12,
          organization: "2-3 banen met pionnen. Bal aan het einde van de baan. Trainer kan als inspeelpunt fungeren.",
          flow: "Voetenwerk → zijwaarts bewegen → draai/richtingsverandering → versnellen → bal ontvangen → open draaien en indribbelen → aansluiten.",
          attackingCoaching: "Hoofd omhoog\nLicht op de voorvoeten\nOpen lichaam bij ontvangst\nEerste aanname vooruit",
          defendingCoaching: "",
          transitionCoaching: "Explosief uit de beweging",
          rulesScoring: "Continue doorstroming; na enkele rondes direct doorspelen naar volgende speler.",
          variations: "Na ontvangst direct passen en doorsluiten.",
          materials: "Pionnen\nBallen"
        },
        {
          id: "w37-ma-rondo",
          name: "Rondo met uitgang",
          type: "Positiespel",
          duration: 15,
          organization: "4v2 + 2 doelspelers in ongeveer 14 x 14 meter. Doelspelers aan tegenoverliggende zijden.",
          flow: "Na minimaal 3 passes probeert de ploeg de doelspeler aan de overzijde te bereiken. Daarna opnieuw opbouwen richting de andere kant.",
          attackingCoaching: "Waar komt de druk vandaan?\nWie wordt daardoor vrij?\nKun je één speler overslaan?\nSta open vóór ontvangst",
          defendingCoaching: "Verdedigers jagen samen en proberen een richting af te sluiten.",
          transitionCoaching: "Na balverlies direct omschakelen.",
          rulesScoring: "Overzijde bereiken = 1 punt. Balwinst verdedigers = direct wisselen of punt voor verdedigers.",
          variations: "Maximaal 2 balcontacten voor spelers in het midden.",
          materials: "Pionnen\nHesjes\nBallen"
        },
        {
          id: "w37-ma-opbouw",
          name: "Onder hoge druk uitspelen",
          type: "Spelvorm",
          duration: 25,
          organization: "Keeper + 2 centrale verdedigers + 2 backs + 6 + 8 tegen 4-5 jagers. Veld circa 45 x 40 meter. Twee kleine doeltjes of doelspelers aan de overzijde.",
          flow: "Iedere actie start bij de keeper. De opbouwploeg probeert de eerste druk uit te spelen via DOOR, LANGS of OVER.",
          attackingCoaching: "Wat zet de tegenstander dicht?\nWaar ontstaat ruimte?\nDoor, langs of over?\nKunnen we druk lokken?\nWaar is de vrije man?",
          defendingCoaching: "Vol druk op keeper en centrale verdedigers\n6 afschermen\nDoordekken wanneer mogelijk",
          transitionCoaching: "Na balverlies direct 5 seconden reageren.",
          rulesScoring: "Uitgespeelde druk + overzijde bereiken = 1 punt. Binnen 6 seconden daarna scoren = 2 punten. Jagers winnen en scoren = 2 punten.",
          variations: "Tweede deel: jagers mogen keeper volledig doordekken zodat ruimte achter de druk belangrijker wordt.",
          materials: "Pionnen\nHesjes\nBallen\n2 mini-doelen"
        },
        {
          id: "w37-ma-partij",
          name: "Eerste druk verslaan",
          type: "Partijvorm",
          duration: 28,
          organization: "5v5, 6v6 of 7v7 met keepers op middelgroot veld, ongeveer 50 x 40 meter.",
          flow: "Normaal voetbal. Extra beloning wanneer een ploeg vanuit eigen opbouw de eerste druk uitspeelt en snel tot een doelpoging komt.",
          attackingCoaching: "Niet automatisch breed\nVerbinding houden\nVooruit denken\nVrije man zoeken\nLange oplossing mag bewust",
          defendingCoaching: "Na balverlies dichtstbijzijnde speler jaagt; rest sluit aan.",
          transitionCoaching: "5 seconden direct druk na balverlies.",
          rulesScoring: "2 punten voor eerste druk uitspelen + binnen 8 seconden doelpoging. Normaal doelpunt = 1 punt. Speel 4 x 5 minuten met circa 90 sec herstel.",
          variations: "Laatste blok volledig vrij spelen.",
          materials: "Pionnen\nHesjes\nBallen\nDoelen"
        },
        {
          id: "w37-ma-slot",
          name: "Vrij spel + reflectie",
          type: "Afsluiting",
          duration: 10,
          organization: "Vrij partijspel, daarna korte kring.",
          flow: "Laat 6-7 minuten vrij spelen. Bespreek daarna wanneer door, langs of over de druk de beste oplossing was.",
          attackingCoaching: "Niet vooraf bepalen waar de bal heen moet. Eerst zien wat de tegenstander weggeeft.",
          defendingCoaching: "",
          transitionCoaching: "",
          rulesScoring: "",
          variations: "",
          materials: "Ballen"
        }
      ];
    }

    return [
      {
        id: "w37-do-rondo",
        name: "Rondo met drukrichting",
        type: "Warming-up",
        duration: 12,
        organization: "5v2 of 4v2 in circa 12 x 12 meter.",
        flow: "Balbezittende ploeg houdt balbezit en probeert bewust weg te spelen van de drukrichting.",
        attackingCoaching: "Scan vóór ontvangst\nOpen staan\nEerste aanname uit druk\nSla een speler over wanneer mogelijk",
        defendingCoaching: "Drukgever stuurt de bal naar één kant.",
        transitionCoaching: "Tempo omhoog zodra de druk is uitgespeeld.",
        rulesScoring: "",
        variations: "Beperk aantal balcontacten als het tempo te laag is.",
        materials: "Pionnen\nHesjes\nBallen"
      },
      {
        id: "w37-do-opbouw",
        name: "Wat geeft de tegenstander weg?",
        type: "Spelvorm",
        duration: 18,
        organization: "Keeper + achterste lijn + middenvelders tegen actieve drukzetters.",
        flow: "Iedere start krijgt de verdedigende ploeg een andere opdracht: 6 afsluiten, backs afsluiten, centrale verdedigers vol aanlopen of iedereen één-op-één vastzetten. Opbouwploeg weet vooraf niet welke variant komt.",
        attackingCoaching: "Wat is afgesloten?\nWie is vrij?\nWaar ligt de ruimte?\nKun je de tegenstander lokken?\nDoor, langs of over?",
        defendingCoaching: "Voer de gekozen drukopdracht vol uit.",
        transitionCoaching: "Laat een foute keuze soms uitspelen en bespreek daarna wat spelers zagen.",
        rulesScoring: "Doel is waarnemen → herkennen → beslissen, niet een vast patroon uitvoeren.",
        variations: "Wissel de drukopdracht iedere 2-3 herhalingen.",
        materials: "Pionnen\nHesjes\nBallen\nDoelen"
      },
      {
        id: "w37-do-partij",
        name: "Wedstrijdspel: opbouwen + aansluiten",
        type: "Partijvorm",
        duration: 35,
        organization: "6v6, 7v7 of 8v8 met keepers op een middelgroot veld.",
        flow: "Volledige partijvorm waarin opbouw, reactie na balverlies en compact aansluiten samenkomen.",
        attackingCoaching: "Durven opbouwen\nVrije man herkennen\nVerbinding tussen linies\nVooruit wanneer mogelijk\nOver de druk wanneer de ruimte daar ligt",
        defendingCoaching: "Horizontaal compact\nVerticaal compact\nAls de bal beweegt, beweegt ons blok",
        transitionCoaching: "5 seconden reactie: dichtstbijzijnde spelers naar de bal, rest direct aansluiten.",
        rulesScoring: "3 x 8 minuten met circa 2 minuten herstel/coaching. Laatste blok zo min mogelijk onderbreken.",
        variations: "Maak het veld iets smaller als de onderlinge afstanden te groot worden.",
        materials: "Pionnen\nHesjes\nBallen\nDoelen"
      },
      {
        id: "w37-do-scenarios",
        name: "Wat doen we als…?",
        type: "Spelvorm",
        duration: 15,
        organization: "Wedstrijdscenario's vanuit vaste startsituaties.",
        flow: "Doeltrap tegen hoge druk; keeper in open spel; centrale verdediger met afgeschermde 6; tegenstander zet één-op-één vast; balverlies rond middenlijn. Iedere situatie 45-60 sec uitspelen.",
        attackingCoaching: "Wat zag je?\nWelke oplossing koos je?\nWaar lag de ruimte?",
        defendingCoaching: "Wat deed de rest van het team?",
        transitionCoaching: "Bij balverlies direct 5 seconden reageren.",
        rulesScoring: "Na iedere korte situatie direct een nieuwe start.",
        variations: "Laat spelers zelf een scenario kiezen en oplossen.",
        materials: "Pionnen\nHesjes\nBallen\nDoelen"
      },
      {
        id: "w37-do-slot",
        name: "Vrij spel + weekreflectie",
        type: "Afsluiting",
        duration: 10,
        organization: "Vrij partijspel, daarna korte reflectie.",
        flow: "Bespreek wat we zaterdag willen herkennen als de tegenstander hoog vastzet en wat direct gebeurt na balverlies.",
        attackingCoaching: "Door – langs – over.",
        defendingCoaching: "Samen aansluiten.",
        transitionCoaching: "5 seconden reageren.",
        rulesScoring: "",
        variations: "",
        materials: "Ballen"
      }
    ];
  }

  function week37TrainingDefinition(day) {
    const monday = day === "monday";
    return {
      id: monday ? "training-2026-w37-ma" : "training-2026-w37-do",
      code: monday ? "W37-MA" : "W37-DO",
      title: monday
        ? "Maandag · Onder de hoge druk uit I — herkennen en kiezen"
        : "Donderdag · Onder de hoge druk uit II — wedstrijdtoepassing",
      date: monday ? "2026-09-07" : "2026-09-10",
      theme: "Onder de hoge druk uitspelen",
      block: "Fundering",
      totalDuration: 90,
      mainGoal: monday
        ? "Spelers herkennen waar ruimte ontstaat bij hoge druk en kiezen bewust tussen door, langs of over de eerste druk."
        : "Spelers passen de oplossingen onder hoge druk toe in wedstrijdsituaties en blijven na balverlies compact aangesloten.",
      desiredBehavior: [
        "Herken wat de tegenstander afsluit.",
        "Kies bewust tussen door, langs of over de druk.",
        "Speel een lange bal gericht wanneer de ruimte achter de druk ligt.",
        "Reageer na balverlies direct 5 seconden en sluit samen aan."
      ].join("\n"),
      evaluationCriteria: [
        "Keeper en 3/4 herkennen wanneer de 6 wel of niet bereikbaar is.",
        "Vrije back of 8 wordt gevonden wanneer de as dichtstaat.",
        "Lange bal is gericht en bewust, niet blind.",
        "Na balverlies reageert de ploeg direct en blijven de linies aangesloten."
      ].join("\n"),
      materials: "Pionnen\nHesjes\nBallen\nMini-doelen / grote doelen",
      coachWords: monday
        ? "KIJK\nLOK\nHERKEN\nDOOR, LANGS OF OVER\n5 SECONDEN"
        : "SAMEN\nKIJK\nSPEEL\nSLUIT AAN\n5 SECONDEN",
      expectedLoad: monday
        ? "Middel tot hoog: veel keuzes onder druk, wedstrijdintensieve blokken met korte herstelmomenten."
        : "Middel: wedstrijdgericht en scherp, met voldoende herstel zodat de ploeg fris blijft.",
      setPiece: monday ? "" : "Doeltrap B: bewust alternatief over de eerste druk.",
      plannerWeekKey: week37PlannerKey,
      plannerDay: day,
      parts: createWeek37TrainingParts(day),
      observationPoints: [
        "Wordt de eerste druk succesvol uitgespeeld?",
        "Wordt de vrije speler herkend?",
        "Is de lange bal bewust?",
        "Volgt na balverlies direct de 5-secondenreactie?",
        "Blijven de linies aangesloten?"
      ],
      createdAt: "2026-09-07T08:30:00.000Z",
      updatedAt: "2026-09-07T08:30:00.000Z"
    };
  }

  function upsertWeek37Trainings(trainings) {
    if (!Array.isArray(trainings)) return [];
    const ids = [];

    ["monday", "thursday"].forEach((day) => {
      const definition = week37TrainingDefinition(day);
      const index = trainings.findIndex((training) => training && (
        (training.plannerWeekKey === week37PlannerKey && training.plannerDay === day)
        || String(training.code || "").toUpperCase() === definition.code
        || training.date === definition.date
      ));

      if (index >= 0) {
        const existing = trainings[index] || {};
        const merged = {
          ...existing,
          ...definition,
          id: existing.id || definition.id,
          createdAt: existing.createdAt || definition.createdAt,
          observationPoints: Array.isArray(existing.observationPoints) && existing.observationPoints.length
            ? existing.observationPoints
            : definition.observationPoints
        };
        trainings[index] = merged;
        ids.push(merged.id);
      } else {
        trainings.push(definition);
        ids.push(definition.id);
      }
    });

    return ids;
  }

  function linkWeek37TrainingIds(weeks, trainingIds) {
    if (!Array.isArray(weeks) || !trainingIds.length) return false;
    const week = weeks.find((item) => item && item.dateFrom === "2026-09-12");
    if (!week) return false;

    const currentIds = Array.isArray(week.trainingIds) ? week.trainingIds : [];
    const nextIds = [...new Set([...currentIds, ...trainingIds])];
    const changed = JSON.stringify(currentIds) !== JSON.stringify(nextIds);
    week.trainingIds = nextIds;
    week.trainingWeekNumber = "37";
    return changed;
  }

  let inMemoryTrainingIds = [];

  if (Array.isArray(SEASON_WEEKS)) {
    SEASON_WEEKS.forEach(normalizeOpeningRound);
  }

  if (typeof TRAININGS !== "undefined" && Array.isArray(TRAININGS)) {
    inMemoryTrainingIds = upsertWeek37Trainings(TRAININGS);
    if (Array.isArray(SEASON_WEEKS)) {
      linkWeek37TrainingIds(SEASON_WEEKS, inMemoryTrainingIds);
    }
  }

  if (typeof PLANNER_WEEK_CARDS !== "undefined" && Array.isArray(PLANNER_WEEK_CARDS)) {
    PLANNER_WEEK_CARDS.forEach(correctWeek36Context);
    PLANNER_WEEK_CARDS.forEach((card) => {
      if (isWeek37Card(card)) applyWeek37Plan(card, false);
    });
  }

  try {
    let persistedTrainingIds = inMemoryTrainingIds;
    const rawTrainings = localStorage.getItem(trainingStorageKey);
    if (rawTrainings) {
      const savedTrainings = JSON.parse(rawTrainings);
      if (Array.isArray(savedTrainings)) {
        persistedTrainingIds = upsertWeek37Trainings(savedTrainings);
        localStorage.setItem(trainingStorageKey, JSON.stringify(savedTrainings));
      }
    }

    const rawWeeks = localStorage.getItem(seasonStorageKey);
    if (rawWeeks) {
      const savedWeeks = JSON.parse(rawWeeks);
      if (Array.isArray(savedWeeks)) {
        let weeksChanged = false;
        savedWeeks.forEach((week) => {
          weeksChanged = normalizeOpeningRound(week) || weeksChanged;
        });
        weeksChanged = linkWeek37TrainingIds(savedWeeks, persistedTrainingIds) || weeksChanged;
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
          if (isWeek37Card(card)) {
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
