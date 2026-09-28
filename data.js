// Voorbeelddata voor CoachOS v0.3.1.
const PRINCIPLES = [
  {
    id: "lok-druk-vrije-man",
    title: "Lok druk uit om een vrije man te creëren",
    description: "Nodig de tegenstander bewust uit om druk te zetten en benut daarna de vrijgekomen ruimte via de vrije man.",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-07-31T00:00:00.000Z"
  }
];

const SEASONS = [
  {
    id: "vsv-jo16-1-2026-2027",
    teamId: "vsv-jo16-1",
    name: "Seizoen 2026–2027",
    startDate: "2026-08-15",
    endDate: "2027-06-20"
  }
];

// Handmatig gecontroleerd tegen de KNVB-kolom voor junioren categorie B.
const SEASON_WEEKS = [
  ["2026-08-15", "2026-08-16", "Vrij", "", ""],
  ["2026-08-22", "2026-08-23", "Vrij", "", ""],
  ["2026-08-29", "2026-08-30", "Vrij", "", ""],
  ["2026-09-05", "2026-09-06", "Start nieuwe fase", "Fase 1", "Start fase 1"],
  ["2026-09-12", "2026-09-13", "Competitiewedstrijd", "Fase 1", ""],
  ["2026-09-19", "2026-09-20", "Competitiewedstrijd", "Fase 1", ""],
  ["2026-09-26", "2026-09-27", "Competitiewedstrijd", "Fase 1", ""],
  ["2026-10-03", "2026-10-04", "Competitiewedstrijd", "Fase 1", ""],
  ["2026-10-10", "2026-10-11", "Inhaalweekend", "", ""],
  ["2026-10-17", "2026-10-18", "Vrij", "", ""],
  ["2026-10-24", "2026-10-25", "Vrij", "", ""],
  ["2026-10-31", "2026-11-01", "Start nieuwe fase", "Fase 2", "Start fase 2"],
  ["2026-11-07", "2026-11-08", "Competitiewedstrijd", "Fase 2", ""],
  ["2026-11-14", "2026-11-15", "Competitiewedstrijd", "Fase 2", ""],
  ["2026-11-21", "2026-11-22", "Competitiewedstrijd", "Fase 2", ""],
  ["2026-11-28", "2026-11-29", "Competitiewedstrijd", "Fase 2", ""],
  ["2026-12-05", "2026-12-06", "Competitiewedstrijd", "Fase 2", ""],
  ["2026-12-12", "2026-12-13", "Competitiewedstrijd", "Fase 2", ""],
  ["2026-12-19", "2026-12-20", "Inhaalweekend", "", "Ook bekerweekend volgens KNVB-kalender."],
  ["2027-01-09", "2027-01-10", "Vrij", "", ""],
  ["2027-01-16", "2027-01-17", "Inhaalweekend", "", ""],
  ["2027-01-23", "2027-01-24", "Beker", "", ""],
  ["2027-01-30", "2027-01-31", "Beker", "", ""],
  ["2027-02-06", "2027-02-07", "Start nieuwe fase", "Fase 3", "Start fase 3"],
  ["2027-02-13", "2027-02-14", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-02-20", "2027-02-21", "Inhaalweekend", "", "Ook bekerweekend volgens KNVB-kalender."],
  ["2027-02-27", "2027-02-28", "Inhaalweekend", "", "Ook bekerweekend volgens KNVB-kalender."],
  ["2027-03-06", "2027-03-07", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-03-13", "2027-03-14", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-03-20", "2027-03-21", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-03-27", "2027-03-27", "Inhaalweekend", "", "Ook bekerweekend volgens KNVB-kalender."],
  ["2027-03-29", "2027-03-29", "Vrij", "", ""],
  ["2027-04-03", "2027-04-04", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-04-10", "2027-04-11", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-04-17", "2027-04-18", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-04-24", "2027-04-25", "Inhaalweekend", "", "Ook bekerweekend volgens KNVB-kalender."],
  ["2027-05-01", "2027-05-02", "Inhaalweekend", "", "Ook bekerweekend volgens KNVB-kalender."],
  ["2027-05-06", "2027-05-06", "Vrij", "", ""],
  ["2027-05-08", "2027-05-09", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-05-15", "2027-05-17", "Inhaalweekend", "", "Ook bekerweekend volgens KNVB-kalender. 17 mei is vrij vanwege het Pinksterweekend."],
  ["2027-05-22", "2027-05-23", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-05-29", "2027-05-30", "Competitiewedstrijd", "Fase 3", ""],
  ["2027-06-05", "2027-06-06", "Inhaalweekend", "", "Ook bekerweekend volgens KNVB-kalender."],
  ["2027-06-12", "2027-06-13", "Overig", "", "Geen programma vermeld in de KNVB-kolom."],
  ["2027-06-19", "2027-06-20", "Overig", "", "Geen programma vermeld in de KNVB-kolom."]
].map(([dateFrom, dateTo, type, phase, note], index) => ({
  id: `speelweek-2026-2027-${String(index + 1).padStart(2, "0")}`,
  seasonId: "vsv-jo16-1-2026-2027",
  dateFrom,
  dateTo,
  type,
  phase,
  note,
  trainingWeekNumber: "",
  status: "Gepland",
  trainingIds: [],
  matchId: null,
  createdAt: "2026-08-04T00:00:00.000Z",
  updatedAt: "2026-08-04T00:00:00.000Z"
}));

// Bekende wedstrijden in fase 1. De speelweek blijft het anker voor
// speelminuten, doelpunten en de korte wedstrijdreflectie.
const KNOWN_MATCHES = {
  "speelweek-2026-2027-04": {
    matchTitle: "VSV O16-1 – Alliance '22 sv. O16-3",
    matchGoalsFor: 5,
    matchGoalsAgainst: 2
  },
  "speelweek-2026-2027-05": {
    matchTitle: "DIOS sv. O16-2 – VSV O16-1",
    matchGoalsFor: 3,
    matchGoalsAgainst: 5
  },
  "speelweek-2026-2027-06": {
    matchTitle: "VSV O16-1 – HBC O16-3",
    matchGoalsFor: 10,
    matchGoalsAgainst: 3
  },
  "speelweek-2026-2027-07": {
    matchTitle: "Geel Wit '20 sv. O16-2 – VSV O16-1",
    matchGoalsFor: 2,
    matchGoalsAgainst: 1
  },
  "speelweek-2026-2027-08": {
    matchTitle: "Overbos sv. O16-3 – VSV O16-1"
  }
};

Object.entries(KNOWN_MATCHES).forEach(([weekId, match]) => {
  const week = SEASON_WEEKS.find((item) => item.id === weekId);
  if (week) Object.assign(week, match);
});

const TRAININGS = [
  {
    id: "rm-00a",
    code: "RM-00A",
    title: "Identiteit & observatie",
    theme: "Nulmeting en teamidentiteit",
    goal: "Een gedeeld beeld vormen van onze speelwijze en observeren hoe spelers van nature handelen.",
    duration: "80 minuten",
    materials: ["12 pionnen", "8 hesjes", "6 ballen", "2 mini-doelen"],
    exercises: [
      {
        name: "Vrije partijvorm",
        detail: "6 tegen 6, 20 × 30 meter — observeer zonder veel te coachen."
      },
      {
        name: "Omschakelspel",
        detail: "4 tegen 4 + 2 kaatsers — balverlies direct herkennen."
      },
      {
        name: "Teamgesprek op het veld",
        detail: "Spelers benoemen wat zij als onze kracht en identiteit zien."
      }
    ],
    coachingPoints: [
      "Kijk eerst, stuur pas later.",
      "Wie neemt initiatief na balverlies?",
      "Welke spelers coachen hun omgeving?",
      "Benoem gedrag concreet en zonder oordeel."
    ],
    evaluationCriteria: [
      "Minimaal drie herkenbare teamkwaliteiten zijn benoemd.",
      "De trainer heeft per linie observaties genoteerd.",
      "Spelers kunnen één gewenst teamgedrag verwoorden."
    ]
  },
  {
    id: "rm-00b",
    code: "RM-00B",
    title: "Onze voetbaltaal",
    theme: "Communicatie en gezamenlijke afspraken",
    goal: "Een korte, herkenbare voetbaltaal afspreken die spelers tijdens alle spelmomenten gebruiken.",
    duration: "75 minuten",
    materials: ["10 pionnen", "2 kleuren hesjes", "8 ballen", "2 doelen"],
    exercises: [
      {
        name: "Rondo met coachwoorden",
        detail: "5 tegen 2 — vóór iedere pass actief informatie geven."
      },
      {
        name: "Lijnenspel",
        detail: "6 tegen 6 — punten voor hoorbare, bruikbare coaching."
      },
      {
        name: "Partij met taalcheck",
        detail: "8 tegen 8 — spel kort stilleggen bij onduidelijke afspraken."
      }
    ],
    coachingPoints: [
      "Gebruik steeds dezelfde korte woorden.",
      "Coach vóórdat de bal onderweg is.",
      "Informatie moet de volgende actie helpen.",
      "Laat spelers elkaar verbeteren."
    ],
    evaluationCriteria: [
      "Het team gebruikt minimaal vier afgesproken coachwoorden.",
      "Spelers geven vaker informatie vóór de balaanname.",
      "Iedere linie is hoorbaar betrokken."
    ]
  },
  {
    id: "rm-01",
    code: "RM-01",
    title: "Gegenpressing",
    theme: "Omschakelen na balverlies",
    goal: "Na balverlies rollen direct verdelen: eerste druk, opties sluiten en as bewaken. Kan verantwoord heroveren niet, dan vertragen en herstellen.",
    duration: "85 minuten",
    materials: ["16 pionnen", "3 kleuren hesjes", "10 ballen", "4 mini-doelen"],
    exercises: [
      {
        name: "Reactierondo",
        detail: "4 tegen 2 — balverlies betekent direct jagen met de dichtste twee."
      },
      {
        name: "Vierkant omschakelen",
        detail: "5 tegen 5 + 2 neutraal — heroveren of terug in compact blok."
      },
      {
        name: "Partijvorm met tijdelijke bonusprikkel",
        detail: "7 tegen 7 — tijdelijk bonuspunt voor herovering binnen vijf seconden."
      }
    ],
    coachingPoints: [
      "Dichtste speler zet direct druk op de bal.",
      "Tweede speler sluit de meest logische passlijn.",
      "Achterste spelers stappen door en bewaken de ruimte.",
      "Lukt heroveren niet, dan samen terug in de organisatie."
    ],
    evaluationCriteria: [
      "Bij minstens zes momenten reageert het hele team direct.",
      "De as blijft bij balverlies aantoonbaar vaker dicht.",
      "Spelers herkennen wanneer zij moeten doorjagen of terugzakken."
    ]
  },
  {
    id: "rm-02",
    code: "RM-02",
    title: "Opbouw en derde man",
    theme: "Opbouwen onder druk",
    goal: "Via de derde man onder de eerste druk uitspelen en met het gezicht vooruit komen.",
    duration: "90 minuten",
    materials: ["14 pionnen", "10 hesjes", "10 ballen", "2 grote doelen"],
    exercises: [
      {
        name: "Passvorm derde man",
        detail: "Drietallen in ruitvorm — kaatsen, doordraaien en versnellen."
      },
      {
        name: "Opbouw tegen twee jagers",
        detail: "4 + keeper tegen 2 — vrije speler achter de eerste druk vinden."
      },
      {
        name: "Zonepartij",
        detail: "7 tegen 7 — middenzone bereiken via een derde-manactie."
      }
    ],
    coachingPoints: [
      "Maak het veld groot vóór de eerste pass.",
      "Kaatser speelt met de juiste snelheid en richting.",
      "Derde man vertrekt terwijl de bal onderweg is.",
      "Na het uitspelen meteen vooruit denken."
    ],
    evaluationCriteria: [
      "Het team speelt minimaal vijf keer via de derde man vooruit.",
      "De ontvangende speler komt open met het gezicht naar voren.",
      "De afstanden in de opbouw blijven functioneel."
    ]
  },
  {
    id: "rm-03",
    code: "RM-03",
    title: "Compact verdedigen",
    theme: "Samen verdedigen",
    goal: "De onderlinge afstanden klein houden, de as beschermen en als blok naar de bal bewegen.",
    duration: "80 minuten",
    materials: ["18 pionnen", "12 hesjes", "8 ballen", "2 doelen"],
    exercises: [
      {
        name: "Schaduwverdedigen",
        detail: "Vier verdedigers bewegen zonder tegenstander als compacte lijn."
      },
      {
        name: "Blok tegen overtal",
        detail: "5 tegen 7 — as gesloten houden en naar buiten sturen."
      },
      {
        name: "Partij op smal veld",
        detail: "8 tegen 8 — punten voor veroveringen in de buitenzone."
      }
    ],
    coachingPoints: [
      "Beweeg als één blok, niet als losse spelers.",
      "Binnenkant dicht; dwing de tegenstander naar buiten.",
      "Achterste speler bewaakt diepte en coacht.",
      "Bij een pass zijwaarts gezamenlijk doorschuiven."
    ],
    evaluationCriteria: [
      "De afstand tussen de linies blijft meestal onder twaalf meter.",
      "De tegenstander wordt vaker naar de zijlijn gedwongen.",
      "Spelers herstellen de compacte vorm na een uitgespeelde drukactie."
    ]
  },
  {
    id: "training-rm-ma-w35",
    code: "RM-MA-35",
    title: "Opbouw: van achteruit, via de 6, vooruit denken",
    date: "2026-08-24",
    theme: "Opbouwen en de vrije man vinden",
    block: "Blok 1 — Opbouwen en de vrije man vinden",
    totalDuration: 90,
    mainGoal: "Spelers herkennen de drie stations in de opbouw en bewegen daarnaar vóórdat de bal bij hen is.",
    desiredBehavior: "3/4 lokken de eerste druk uit\n6 beweegt achter of naast die druklijn",
    evaluationCriteria: "De bal bereikt station C via station B in minstens 4 van de 6 pogingen (EX-001)\nDrie van de vijf opbouwacties bereiken een poort zonder balverlies in eigen helft (EX-002)\nHet team kiest bewust voor opbouw ook als de lange bal makkelijker was (EX-003)\nMinstens twee spelers benoemen zelf een moment waarop de opbouw werkte",
    materials: "16 pionnen\n10 hesjes in 2 kleuren\n8 ballen\n2 grote doelen\n2 mini-doelen of poortjes (3 m)",
    coachWords: "Kijk vóór je krijgt\nKeeper sluit aan\n6 achter de druk\nVerste man eerst",
    expectedLoad: "Middel, gedifferentieerd naar minuten.",
    setPiece: "Doeltrap A: 3/4 breed, 6 vrij achter druk (introductie volgt donderdag).",
    plannerWeekKey: "vsv-jo16-1-2026-2027:2026:W35",
    plannerDay: "monday",
    parts: [
      {
        id: "training-rm-ma-w35-deel-1",
        name: "Activatie met namen",
        type: "Warming-up",
        duration: 4,
        organization: "Vak 20x20 meter, alle spelers erin, twee ballen tegelijk.",
        flow: "Je mag pas inspelen nadat je de naam van de ontvanger hebt geroepen. Na 2 minuten: alleen inspelen op iemand die jou aankijkt.",
        attackingCoaching: "Kijk vóór je krijgt — aanname klaar, niet verrast.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "6-10 spelers: zelfde vak, één bal, zelfde regels.",
        materials: ""
      },
      {
        id: "training-rm-ma-w35-deel-2",
        name: "Drietal met aanname",
        type: "Warming-up",
        duration: 5,
        organization: "Drietallen, vak 8x8 meter.",
        flow: "A past naar B, B neemt aan weg van de druk en past naar C, C kaatst terug naar A. Na 2 minuten: C mag B eenmaal aantippen vóór hij doorgeeft.",
        attackingCoaching: "Aanname weg van de druk — niet naar de druk toe staan. B beweegt vóórdat de pass vertrekt.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "6-10 spelers: tweetallen, zelfde beweging, geen druk.",
        materials: ""
      },
      {
        id: "training-rm-ma-w35-deel-3",
        name: "Activatie met richting",
        type: "Warming-up",
        duration: 6,
        organization: "Vak 25x20 meter, 4v4, vrij voetballen, geen doelen.",
        flow: "Elke geslaagde pass door het centrum wordt hardop 'ja' geroepen. Geen uitleg over opbouw vooraf — spelers zoeken het centrum vanzelf op.",
        attackingCoaching: "Eén coachpunt max: als niemand door het centrum speelt, zeg je 'verste man eerst'.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "6-10 spelers: 3v3, zelfde vak en regel.",
        materials: ""
      },
      {
        id: "training-rm-ma-w35-deel-4",
        name: "EX-001 · Rondo met stations",
        type: "Positiespel",
        duration: 20,
        organization: "Vak 18x18 meter. 6v3 (of 5v2 bij lage opkomst). Drie vaste stations: A = verdediger (3 of 4), B = de 6, C = aanvaller. Rouleer het drietal elke 3 minuten, werk in blokken van 3 min met echte pauze ertussen.",
        flow: "De bal moet via B naar C om een punt te scoren. Bij verovering: rollen wisselen.",
        attackingCoaching: "Station B beweegt achter de druklijn — niet erin, niet ernaast.",
        defendingCoaching: "Station A lokt actief de druk uit: ga bewust dichtbij een jager staan.",
        transitionCoaching: "",
        rulesScoring: "Max 2 keer raken. Drietal mag alleen onderscheppen, niet tackelen.",
        variations: "6-10 spelers: 5v2 in vak van 15x15. Zelfde stationsregel.",
        materials: ""
      },
      {
        id: "training-rm-ma-w35-deel-5",
        name: "Terugkoppeling",
        type: "Introductie",
        duration: 3,
        organization: "Korte stop, staand.",
        flow: "Drie vragen, spelers beantwoorden: 'Wanneer stond B goed?' · 'Wat deed A om druk uit te lokken?' · 'Wat deed C om de bal te vragen?' Maximaal 3 minuten, geen monoloog.",
        attackingCoaching: "Laat spelers het antwoord geven. Jij vat samen in één zin.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "",
        materials: ""
      },
      {
        id: "training-rm-ma-w35-deel-6",
        name: "EX-002 · Opbouw vs. jagers",
        type: "Positiespel",
        duration: 22,
        organization: "Eigen helft ±40x34 meter. Keeper + 3 + 4 + 6 vs. 2 jagers. Twee poortjes van 3 m op de middenlijn, ±10 m uit elkaar.",
        flow: "Doel opbouwteam: bal via een poort naar de andere kant. Eerste 5 min: jagers mogen alleen op de helft druk zetten. Daarna: volledige druk incl. op de keeper. Na verovering: de twee spelers die verloren worden de nieuwe jagers.",
        attackingCoaching: "Keeper sluit aan — maak het overtal zichtbaar. De 6 staat achter de druklijn.",
        defendingCoaching: "",
        transitionCoaching: "Eén coachpunt per blok.",
        rulesScoring: "Terug naar keeper mag altijd.",
        variations: "Met 9: keeper + 3 + 4 + 6 vs. 2 jagers, twee spelers wachten als volgend jaagduo, wisselen direct na balverlies. 6-10 spelers: keeper + 2 verdedigers + 6 vs. 1 jager, zelfde poortjes.",
        materials: ""
      },
      {
        id: "training-rm-ma-w35-deel-7",
        name: "EX-003 · Partijvorm met opbouwbonus",
        type: "Partijvorm",
        duration: 20,
        organization: "Driekwart veld, 8v8 of 9v9 met keepers.",
        flow: "Normale spelregels.",
        attackingCoaching: "Kies één coachpunt op basis van wat je ziet, niet meer dan één per partij. Opties: 'kijk vóór je krijgt' · '6 achter de druk' · 'eerste blik na balwinst is vooruit'.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "Bonuspunt bij opbouwactie die de middenlijn bereikt via max. 4 passes vanuit eigen helft, alleen geldig als opbouw begint bij keeper of verdediger. Regulier doelpunt telt 2 punten.",
        variations: "Met 9: 4v4 + 1 neutrale speler naar twee grote doelen, neutrale speelt altijd mee met balbezitter, rouleer elke 4 min. 6-10 spelers: 4v4+1 naar twee doelen, neutrale roteert elke 4 min.",
        materials: ""
      },
      {
        id: "training-rm-ma-w35-deel-8",
        name: "Afsluiting",
        type: "Spelvorm",
        duration: 10,
        organization: "Korte afwerkvorm of vrije partij op klein doel.",
        flow: "Doel: eindigen met plezier. Kring: ieder noemt één moment waarop de opbouw werkte, niet wat er fout ging.",
        attackingCoaching: "Benoem drie namen van spelers bij wie je iets goeds zag — bij naam, concreet.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "6-10 spelers: werkt met elk aantal.",
        materials: ""
      }
    ],
    createdAt: "2026-08-21T09:00:00.000Z",
    updatedAt: "2026-08-21T09:00:00.000Z"
  },
  {
    id: "training-rm-do-w35",
    code: "RM-DO-35",
    title: "Opbouw onder wedstrijddruk — zelfde vorm, hogere intensiteit",
    date: "2026-08-27",
    theme: "Opbouwen en de vrije man vinden (wedstrijdgericht)",
    block: "Blok 1 — Opbouwen en de vrije man vinden",
    totalDuration: 90,
    mainGoal: "Spelers passen het opbouwprincipe toe onder wedstrijddruk en kiezen bewust voor kort of lang.",
    desiredBehavior: "Keeper heeft 2 opties\nDe 6 ontvangt de bal open (met het gezicht naar voren)",
    evaluationCriteria: "Keeper heeft 2 opties\n6 ontvangt open\nOpbouwteam kiest bewust tussen doeltrap A en B vóór uitvoering",
    materials: "16 pionnen\n10 hesjes\n8 ballen\n2 grote doelen\n2 poortjes",
    coachWords: "Kijk vóór je krijgt\nKeeper sluit aan\n6 achter de druk\nVerste man eerst",
    expectedLoad: "Middel, gedifferentieerd naar minuten.",
    setPiece: "Doeltrap A: korte ruit via 3/4 naar 6. Doeltrap B: lang over de eerste druk, tweede bal pakken.",
    plannerWeekKey: "vsv-jo16-1-2026-2027:2026:W35",
    plannerDay: "thursday",
    parts: [
      {
        id: "training-rm-do-w35-deel-1",
        name: "Activatie — directe passing",
        type: "Warming-up",
        duration: 4,
        organization: "Vak 20x20 meter, alle spelers, twee ballen.",
        flow: "Vrij passen, max 2 keer raken, naam roepen voor de pass. Na 2 min: één keer raken verplicht. Tempo hoger dan maandag, ter voorbereiding op wedstrijdintensiteit.",
        attackingCoaching: "Tempo omhoog. Wie twijfelt, speelt te laat.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "6-10 spelers: zelfde vak, één bal, één keer raken.",
        materials: ""
      },
      {
        id: "training-rm-do-w35-deel-2",
        name: "Rondo activatie",
        type: "Warming-up",
        duration: 6,
        organization: "Zelfde 6v3 als maandag, vak 18x18 meter.",
        flow: "Direct spelen, geen wachttijd. Drietal mag nu overal druk zetten, ook op de keeper-rol. Stations gelden nog: A lokt, B scharnier, C ontvangt.",
        attackingCoaching: "B staat er al vóórdat de bal vertrekt. Dat is het enige wat je coacht.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "6-10 spelers: 5v2, zelfde stations.",
        materials: ""
      },
      {
        id: "training-rm-do-w35-deel-3",
        name: "EX-002 · Opbouw vs. jagers — verhoogde druk",
        type: "Positiespel",
        duration: 20,
        organization: "Zelfde opbouw als maandag. Keeper + 3 + 4 + 6 vs. 2 jagers, twee poortjes middenlijn. Nu drie jagers in plaats van twee.",
        flow: "De derde jager mag ook op de keeper druk zetten. Doel opbouwteam: via een poort naar de andere kant. Variatie na 10 min: de opbouw mag maar 6 seconden duren — daarna telt een poort als succesvol, ook zonder bal erin.",
        attackingCoaching: "",
        defendingCoaching: "",
        transitionCoaching: "Eén coachpunt per blok van 5 min. Gaat het goed? Voeg een derde jager toe. Gaat het te slecht? Terug naar twee.",
        rulesScoring: "Keeper mag altijd de bal terugkrijgen.",
        variations: "Met 9: keeper + 3 + 4 + 6 vs. 2 jagers, twee wisselen direct bij balverlies. 6-10 spelers: keeper + 2 verdedigers + 6 vs. 1 jager.",
        materials: ""
      },
      {
        id: "training-rm-do-w35-deel-4",
        name: "Koppeling doeltrap A en B",
        type: "Techniekvorm",
        duration: 10,
        organization: "Rustig tempo — organisatie, geen intensiteit.",
        flow: "Doeltrap A: keeper gooit kort op 3 of 4, die lokken de druk en spelen naar 6. Doeltrap B: keeper gooit lang op een speler die de tweede bal pakt. Drie keer A, drie keer B, wissel dan de keeperrol.",
        attackingCoaching: "Spelers benoemen zélf wanneer je A kiest en wanneer B. Jij bevestigt alleen. 'Wanneer is de korte opbouw niet mogelijk?' — laat ze het antwoord geven.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "Met 9: twee spelers wisselen als keeper en aanvaller zodat iedereen beide varianten ervaart. 6-10 spelers: zelfde twee varianten, keeper gooit zelf in en speelt beide rollen.",
        materials: ""
      },
      {
        id: "training-rm-do-w35-deel-5",
        name: "EX-003 · Partijvorm — wedstrijdcontext",
        type: "Partijvorm",
        duration: 30,
        organization: "Driekwart veld, 8v8 of 9v9 met keepers.",
        flow: "Extra regel donderdag: de doeltrap moet via variant A of B — geen vrije ingooi van de keeper. Na 15 min: reset bonusregel naar 3 passes, hogere eis, zelfde principe.",
        attackingCoaching: "",
        defendingCoaching: "",
        transitionCoaching: "Eén coachpunt — kies wat je het meest ziet missen. Stop het spel alleen bij een systematische fout, niet bij een individuele.",
        rulesScoring: "Bonuspunt: opbouw via max 4 passes die de middenlijn bereikt vanuit eigen helft.",
        variations: "Met 9: 4v4+1 neutraal, zelfde bonusregel, doeltrap via A of B verplicht. 6-10 spelers: 4v4+1 neutraal, neutrale roteert elke 4 min.",
        materials: ""
      },
      {
        id: "training-rm-do-w35-deel-6",
        name: "Spelhervatting · doeltrap herhalen",
        type: "Techniekvorm",
        duration: 10,
        organization: "Wedstrijdtempo, tegenstander zet actief druk.",
        flow: "Vijf keer doeltrap A, vijf keer doeltrap B. Opbouwteam kiest de variant vóórdat de keeper gooit.",
        attackingCoaching: "'Welke variant kies je en waarom?' — spelers benoemen de keuze vóór uitvoering.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "Punten voor de variant die de druk breekt.",
        variations: "6-10 spelers: drie keer A, drie keer B. Keeper beslist welke.",
        materials: ""
      },
      {
        id: "training-rm-do-w35-deel-7",
        name: "Afsluiting",
        type: "Spelvorm",
        duration: 10,
        organization: "Vrije partij op klein veld.",
        flow: "Geen regels, geen bonuspunten. Eindigen met plezier. Kring: één speler per linie noemt wat hij zaterdag wil toepassen, concreet, één zin.",
        attackingCoaching: "Sluit af met energie, niet met analyse. De analyse is voor maandag.",
        defendingCoaching: "",
        transitionCoaching: "",
        rulesScoring: "",
        variations: "6-10 spelers: werkt met elk aantal.",
        materials: ""
      }
    ],
    createdAt: "2026-08-21T09:00:00.000Z",
    updatedAt: "2026-08-21T09:00:00.000Z"
  }
];

// Koppelt RM-MA-35/RM-DO-35 aan de speelweek van ISO-week 35 (Fundering),
// op dezelfde manier als linkTrainingToSeasonWeek() dat bij het opslaan doet.
SEASON_WEEKS.find((week) => week.id === "speelweek-2026-2027-03").trainingIds = [
  "training-rm-ma-w35",
  "training-rm-do-w35"
];

// Uitgewerkte trainingen volgens de V4-weekkaart; eenmalig lokaal toegevoegd.
const WEEK38_TRAININGS = [
  {
    "block": "Blok 2 — Druk zetten en reageren na balverlies",
    "coachWords": "Baldruk? Door\nGeen druk: diepte\nKeeper coacht",
    "code": "W38-MA",
    "createdAt": "2026-09-14T12:00:00.000Z",
    "date": "2026-09-14",
    "desiredBehavior": "Eerste verdediger zet richting; 8/10 sluiten aan en maken druk op de bal werkelijk mogelijk.\n6 bewaakt de as en jaagt niet blind mee.\n3/4 staan halfopen: doorstappen bij baldruk, diepte beveiligen zonder baldruk.\nKeeper coacht vóór de diepe pass.",
    "evaluationCriteria": "Observeer 10 momenten: kiest de laatste lijn bij minstens 7 passend voor doorstappen of diepte beschermen?\nObserveer 5 diepe dreigingen: coacht de keeper minstens 3 keer vóór de pass?\nLaat na afloop één speler per linie uitleggen wat hij doet als de eerste druk wordt uitgespeeld.",
    "expectedLoad": "Middel, 90 minuten inclusief uitleg, drinken en herstel. Spelers met veel wedstrijdminuten doen in de twee hoofdvormen één reeks minder of spelen tijdelijk als doelspeler. Weinig minuten: alle reeksen actief. Geen extra loopconditionering.",
    "id": "training-rm-ma-w38",
    "mainGoal": "De eerste verdediger stuurt naar buiten; de laatste lijn leest echte baldruk en kiest samen doorstappen of diepte beschermen. Competitieweek: voortbouwen op opbouw en restverdediging uit week 35–37.",
    "materials": "16–20 pionnen\nHesjes in 2 kleuren + 2 neutrale hesjes\n8–10 ballen\n1 groot doel en 2 mini-doelen (of poortjes)\nTweede groot doel indien beschikbaar",
    "parts": [
      {
        "defendingCoaching": "Baldruk betekent: de tegenstander kan niet vrij kijken en diep spelen.",
        "duration": 5,
        "flow": "Vraag twee spelers naar een moment met en zonder druk op de bal. Leg één afspraak vast: de balbezitter bepaalt ons stappen, niet alleen het roepen van een medespeler.",
        "id": "training-rm-ma-w38-deel-1",
        "name": "Start: wanneer kan onze laatste lijn door?",
        "organization": "Spelers bij het veld; ballen klaarliggen. Vraag naar gespeelde minuten en ervaren vermoeidheid.",
        "rulesScoring": "",
        "type": "Introductie",
        "variations": "Bij ieder aantal uitvoerbaar."
      },
      {
        "attackingCoaching": "Kijk vóór je krijgt; eerste aanname laat zien of vooruit spelen mogelijk is.",
        "defendingCoaching": "Eerst kijken, dan voeten verplaatsen. Bij diepte halfopen draaien; geen lange achterwaartse sprint.",
        "duration": 10,
        "flow": "3 min rustig passen en bewegen; 3 min zijwaarts bewegen, gecontroleerd remmen en halfopen teruglopen; 4 min: ontvanger neemt afwisselend vooruit of onder lichte druk aan, partner leest dit en stapt of draait mee. Rollen elke minuut wisselen.",
        "id": "training-rm-ma-w38-deel-2",
        "name": "ASM met bal: kijken, remmen en halfopen draaien",
        "organization": "Tweetallen, ieder een baan van 12×5 m; 1 bal per tweetal.",
        "rulesScoring": "",
        "type": "ASM",
        "variations": "Vermoeide spelers kleinere afstanden, rustig tempo. Geen wachtrijen."
      },
      {
        "defendingCoaching": "Druk op bal: samen aansluiten. Ontsnapt de balbezitter en kijkt hij vooruit: eerst diepte beschermen. Binnenkant dicht.",
        "duration": 15,
        "flow": "3 min uitleg en wandelvoorbeeld; 3×3 min spel met 1 min overleg ertussen; laatste minuut drinken. Aanvallers combineren en proberen de bal in de eindzone te ontvangen. Dichtste verdediger stuurt buitenom, andere twee geven dekking en lezen baldruk.",
        "id": "training-rm-ma-w38-deel-3",
        "name": "Lijncoördinatie: 3 verdedigers lezen 3 aanvallers",
        "organization": "Twee vakken van 20×15 m voor 12 spelers; per vak 3v3 naar een eindzone van 3 m. Met 14 twee wisselspelers, elke 90 sec wisselen.",
        "rulesScoring": "1 punt voor gecontroleerde ontvangst in de eindzone; verdedigers scoren na balwinst over de tegenoverliggende eindlijn.",
        "type": "Spelvorm",
        "variations": "6–10 spelers: één vak 3v3 of 4v4, overige spelers rouleren per reeks."
      },
      {
        "defendingCoaching": "Geen baldruk: sluit de pass naar de diepe man door terug te bewegen, blijf de bal zien. Wel baldruk: sluit als blok aan. Keeper kan doelspeler zijn en de lijn coachen.",
        "duration": 20,
        "flow": "2 min uitleg; 4×3 min spel, 1 min herstel na de eerste drie reeksen; 3 min drinken/overgang. Diepe doelspeler beweegt zijwaarts. Veldspelers kunnen de doelzone verdedigen. Na score start het andere team. Wissel doelspelers per reeks.",
        "id": "training-rm-ma-w38-deel-4",
        "name": "5v5 met twee diepe doelspelers",
        "organization": "Veld 36×28 m met aan beide uiteinden een doelzone van 4 m. 5v5 in het veld + per team 1 doelspeler in de eigen aanvalsdoelzone: 12 spelers. 13–14: wissel elke 2 min.",
        "rulesScoring": "1 punt bij gecontroleerde pass naar doelspeler. Niet blind terugzakken: trainer telt óók juiste momenten van doorstappen.",
        "transitionCoaching": "Na balverlies dichtste speler druk, anderen as en diepte. Na balwinst eerst vooruit kijken.",
        "type": "Positiespel",
        "variations": "10 spelers: 4v4 + 2 doelspelers; 8: 3v3 + 2; 6: 3v3 naar eindzones. Veel wedstrijdminuten: één reeks doelspeler of herstel."
      },
      {
        "attackingCoaching": "Lok druk uit en zoek de vrije man; vrije blik vooruit is de prikkel om diepte aan te vallen.",
        "defendingCoaching": "8/10 in aanvallende ploeg zetten na balverlies actief druk; 6 houdt centrum. 3/4 stappen alleen als diep spelen onder druk staat. Keeper meldt vrije balbezitter vroeg.",
        "duration": 25,
        "flow": "3 min uitleg; 4×4 min met 1 min herstel na de eerste drie reeksen; 3 min overgang. Start bij aanvallende opbouwer. Soms start diens verdediger dichtbij, soms 4–5 m verder weg: achterste lijn moet de werkelijke situatie lezen. Speel na balwinst door naar mini-doelen. Wissel rollen halverwege.",
        "id": "training-rm-ma-w38-deel-5",
        "name": "Richting groot doel: druk vóór de laatste lijn",
        "organization": "40×34 m, groot doel met keeper tegenover 2 mini-doelen. 6 verdedigers inclusief keeper (1, 2, 3, 4, 5, 6) tegen 6 aanvallers (7, 8, 9, 10, 11 en opbouwer). Met 14 krijgt ieder team één extra speler.",
        "rulesScoring": "Gewoon scoren = 1. Trainer turft 10 keuzes van de laatste lijn; korte feedback tussen reeksen.",
        "type": "Partijvorm",
        "variations": "10: keeper + 4 tegen 5; 8: keeper + 3 tegen 4; 6: 3v3 naar poorten. Veel minuten: één reeks minder, geen extra slotruns."
      },
      {
        "defendingCoaching": "Bal ligt vrij: bescherm de diepte vóór de trap. Niet op een vast fluitsignaal blind uitstappen; na wegwerken samen aansluiten.",
        "duration": 10,
        "flow": "2 min afspraken: keeper coacht startpositie, lijn ziet bal én lopers, 6 bewaakt tweede bal. 6 min: 4–6 hervattingen afwisselend kort en diep; na eerste contact doorspelen tot bal uit is. 2 min opruimen.",
        "id": "training-rm-ma-w38-deel-6",
        "name": "Vrije trap tegen: lijn en tweede bal",
        "organization": "Zelfde doel. Verdedigende lijn, keeper en 6 tegenover aanvallers. Vrije trap vanaf flank op 20–25 m; rollen aansluiten op opkomst.",
        "rulesScoring": "",
        "type": "Spelvorm",
        "variations": "Weinig spelers: 3 verdedigers + keeper tegen 2–4 aanvallers; zonder keeper naar eindzone. Neem vooral grondpasses en enkele gevarieerde leveringen."
      },
      {
        "defendingCoaching": "Laat spelers de drie coachwoorden zelf noemen.",
        "duration": 5,
        "flow": "2 min rustig uitlopen; 3 min: speler uit voorste, middelste en laatste lijn beantwoordt: wat verandert als er géén druk meer is? Benoem donderdag als toepassing onder wedstrijdweerstand.",
        "id": "training-rm-ma-w38-deel-7",
        "name": "Rustig afsluiten en terugvraag",
        "organization": "Samen rustig bewegen, materialen naar de kant.",
        "rulesScoring": "",
        "type": "Afsluiting",
        "variations": "Iedere opkomst."
      }
    ],
    "plannerDay": "monday",
    "plannerWeekKey": "vsv-jo16-1-2026-2027:2026:W38",
    "setPiece": "Vrije trap tegen: lijn, diepte en tweede bal.",
    "theme": "Baldruk stuurt laatste lijn",
    "title": "Baldruk lezen: samen stappen of diepte beschermen",
    "totalDuration": 90,
    "updatedAt": "2026-09-14T12:00:00.000Z"
  },
  {
    "block": "Blok 2 — Druk zetten en reageren na balverlies",
    "coachWords": "Baldruk? Door\nGeen druk: diepte\nKeeper coacht",
    "code": "W38-DO",
    "createdAt": "2026-09-14T12:00:00.000Z",
    "date": "2026-09-17",
    "desiredBehavior": "Eerste verdediger zet richting; 8/10 sluiten aan en maken druk op de bal werkelijk mogelijk.\n6 bewaakt de as en jaagt niet blind mee.\n3/4 staan halfopen: doorstappen bij baldruk, diepte beveiligen zonder baldruk.\nKeeper coacht vóór de diepe pass.",
    "evaluationCriteria": "Observeer 10 momenten: kiest de laatste lijn bij minstens 7 passend voor doorstappen of diepte beschermen?\nObserveer 5 diepe dreigingen: coacht de keeper minstens 3 keer vóór de pass?\nLaat na afloop één speler per linie uitleggen wat hij doet als de eerste druk wordt uitgespeeld.",
    "expectedLoad": "Middel; 90 minuten inclusief pauzes. Korte wedstrijdechte acties, ruime herstarts en geen conditionele finisher. Bij vermoeidheid een reeks inkorten of beurt overslaan; fris afsluiten voor de competitiewedstrijd.",
    "id": "training-rm-do-w38",
    "mainGoal": "De eerste verdediger stuurt naar buiten; de laatste lijn leest echte baldruk en kiest samen doorstappen of diepte beschermen. Competitieweek: voortbouwen op opbouw en restverdediging uit week 35–37.",
    "materials": "16–20 pionnen\nHesjes in 2 kleuren + 2 neutrale hesjes\n8–10 ballen\n1 groot doel en 2 mini-doelen (of poortjes)\nTweede groot doel indien beschikbaar",
    "parts": [
      {
        "defendingCoaching": "Gebruik dezelfde taal als maandag.",
        "duration": 5,
        "flow": "Laat spelers herhalen: wanneer door, wanneer diepte, wie coacht? Verdeel rollen van eerste druk, 6 en keeper. Noem geen nieuwe tactische regels.",
        "id": "training-rm-do-w38-deel-1",
        "name": "Start: drie afspraken voor zaterdag",
        "organization": "Bij het veld; doelen en ballen vooraf klaar.",
        "rulesScoring": "",
        "type": "Introductie",
        "variations": "Iedere opkomst."
      },
      {
        "attackingCoaching": "Open aannemen; kijk vóór je krijgt.",
        "defendingCoaching": "Kijk naar balbezitter en ruimte achter je; op voorvoeten kunnen reageren.",
        "duration": 12,
        "flow": "4 min bewegen en passen; 4 min halfopen draaien/remmen op beweging partner; 4 min korte passduels met oplopend tempo. Geen maximale sprintseries.",
        "id": "training-rm-do-w38-deel-2",
        "name": "Activering: passen, scannen en reageren",
        "organization": "Tweetallen in banen 12×5 m, daarna twee kleine groepen.",
        "rulesScoring": "",
        "type": "Warming-up",
        "variations": "6–10: zelfde tweetallen; oneven aantal drietal."
      },
      {
        "defendingCoaching": "Dichtste speler stuurt naar buiten, steun sluit door de as. Achterste spelers lezen of die druk werkt.",
        "duration": 15,
        "flow": "2 min uitleg; 3×3 min, 1 min herstel tussen reeksen; 2 min drinken. Scoren door medespeler in eindzone aan te spelen. Neutrale spelers helpen balbezit, maximaal 2 contacten. Bij verlies wisselen veldspelers direct van rol.",
        "id": "training-rm-do-w38-deel-3",
        "name": "4v4 + 2 steunspelers: druk echt maken",
        "organization": "28×22 m met aan twee uiteinden een eindzone. 4v4 + 2 neutrale zijsteunspelers (10). Met 12: 5v5 + 2; met 14: 6v6 + 2 in 32×26 m.",
        "rulesScoring": "1 punt per gecontroleerde eindzonepass.",
        "transitionCoaching": "Vijf seconden is een aansporing tot directe reactie: als druk faalt, samen herstellen en diepte beschermen.",
        "type": "Positiespel",
        "variations": "8: 3v3 + 2; 6: 3v3 zonder neutrale spelers. Vermoeide spelers kort als steunspeler."
      },
      {
        "attackingCoaching": "Bij vrije bal vooruit kijken en diepte bedreigen. Onder druk steun bieden en vrije kant vinden.",
        "defendingCoaching": "Bij echte baldruk lijn door; zonder druk halfopen diepte bewaken. 6 blijft tussen bal en doel. Keeper coacht vroeg. Niet doorstappen omdat het vooraf een 'drukreeks' heet.",
        "duration": 25,
        "flow": "3 min uitleg; 4×4 min met 1 min overleg tussen reeksen; 3 min drinken/overgang. Reeks 1/3: balbezitter start onder nabije druk. Reeks 2/4: vrije aanname, eerste verdediger start verder weg. Na start volledig vrij spel: de situatie kan veranderen. Halverwege speelrichting/rollen wisselen.",
        "id": "training-rm-do-w38-deel-4",
        "name": "Wedstrijdscenario: wél of geen druk vanaf middellijn",
        "organization": "Bij 16 spelers: 8v8 inclusief keepers op circa 55×40 m, start rond middellijn. Bij 12–14: 6v6/7v7 op 40×34 m; met één keeper groot doel tegenover 2 mini-doelen.",
        "rulesScoring": "Doelpunt = 1; trainer registreert 10 keuzes van de laatste lijn en 5 coachmomenten van keeper.",
        "type": "Partijvorm",
        "variations": "10: 5v5; 8: 4v4; 6: 3v3 naar twee poorten op 25×20 m. Zelfde scenario's, geen verplichte 8v8."
      },
      {
        "defendingCoaching": "Keeper organiseert; lijn ziet bal en lopers. 6 bewaakt tweede bal; na wegwerken aansluiten zodra er druk is.",
        "duration": 10,
        "flow": "2 min herinneren; 6 min 4–6 vrije trappen, doorspelen na eerste contact; 2 min door naar partij. Rollen en communicatie gaan vóór hoeveelheid herhalingen.",
        "id": "training-rm-do-w38-deel-5",
        "name": "Vrije trap tegen + tweede bal onder weerstand",
        "organization": "Groot doel, keeper, lijn en 6; tegenstanders kiezen korte of diepe vrije trap vanaf de flank.",
        "rulesScoring": "",
        "type": "Spelvorm",
        "variations": "6–10: kleinere bezetting, eerst grondvariant. Zonder keeper naar eindzone."
      },
      {
        "defendingCoaching": "Observeer of kiezen tussen stappen en diepte zonder hulp lukt.",
        "duration": 18,
        "flow": "2×7 min vrij spel met 2 min drinken/zelfoverleg; 2 min wisselen en klaarzetten afsluiting. Coach niet tijdens het spel, behalve voor veiligheid. Laat keeper en spelers elkaar corrigeren.",
        "id": "training-rm-do-w38-deel-6",
        "name": "Vrije partij: spelers sturen zelf",
        "organization": "Zelfde veld en teams als hoofdvorm; bij ongelijke aantallen één neutrale speler.",
        "rulesScoring": "Alleen gewone doelpunten; geen bonusregels.",
        "transitionCoaching": "Na balverlies rollen verdelen; na balwinst vooruit of vrije kant.",
        "type": "Partijvorm",
        "variations": "Kleinere aantallen: veld verkleinen; geen extra loopwerk ter compensatie."
      },
      {
        "defendingCoaching": "Baldruk? Door. Geen druk: diepte. Keeper coacht.",
        "duration": 5,
        "flow": "2 min rustig uitlopen; 3 min: één afspraak per linie voor zaterdag. Trainer noteert aantal juiste lijnkeuzes en vroege keepercoaching voor de teamevaluatie.",
        "id": "training-rm-do-w38-deel-7",
        "name": "Afsluiting: meenemen naar wedstrijd",
        "organization": "Rustig bewegen en korte kring.",
        "rulesScoring": "",
        "type": "Afsluiting",
        "variations": "Iedere opkomst."
      }
    ],
    "plannerDay": "thursday",
    "plannerWeekKey": "vsv-jo16-1-2026-2027:2026:W38",
    "setPiece": "Vrije trap tegen: lijn, diepte en tweede bal.",
    "theme": "Baldruk stuurt laatste lijn",
    "title": "Baldruk stuurt de lijn: toepassen richting zaterdag",
    "totalDuration": 90,
    "updatedAt": "2026-09-14T12:00:00.000Z"
  }
];

// Week 39: V4-weekkaart met steun na balwinst als wedstrijdaccent.
const WEEK39_TRAININGS = [
  {
    "id": "training-rm-ma-w39",
    "code": "W39-MA",
    "title": "Direct reageren en elkaar helpen na balwinst",
    "date": "2026-09-21",
    "theme": "Directe reactie na balverlies",
    "block": "Blok 2 — Druk zetten en reageren na balverlies",
    "totalDuration": 90,
    "mainGoal": "Week 39, V4-weekkaart: eerste druk, steun sluit en as dicht. Lukt heroveren niet, dan vertragen en compact herstellen. Extra wedstrijdaandacht: na balwinst helpt één middenvelder onder de bal om van het eigen doel weg te spelen.",
    "desiredBehavior": "Dichtste speler geeft druk; tweede speler sluit de pass naar binnen; 6 bewaakt de as. Is de eerste druk uitgespeeld: terug tussen bal en eigen doel. Na balwinst komt één van 8/10 schuin onder de bal, de ander blijft hoger. Niet allebei voorin blijven.",
    "evaluationCriteria": "Turf 10 balverliezen: bij minstens 7 direct druk door de dichtste speler en dekking in de as.\nAls eerste druk mislukt: team herstelt tussen bal en eigen doel in plaats van los doorjagen.\nTurf 5 balwinsten: bij minstens 4 biedt een middenvelder schuin onder de bal steun. Dit zijn oefendoelen, geen gemeten resultaten.",
    "coachWords": "Eerste druk\nAs dicht\nGeen kans? Herstel\nHelp na balwinst",
    "expectedLoad": "90 min inclusief uitleg en rust. Middel-hoog voor spelers met weinig wedstrijdminuten; veel minuten of vermoeid: neutrale rol en één reeks minder. Geen conditionele finisher.",
    "materials": "16–20 pionnen\nHesjes in 3 kleuren\n8–10 ballen\n1 groot doel en 2 mini-doelen, of 4 poortjes\nDrinken naast veld",
    "setPiece": "Ingooi aanvallende helft: restbezetting.",
    "plannerDay": "monday",
    "plannerWeekKey": "vsv-jo16-1-2026-2027:2026:W39",
    "parts": [
      {
        "name": "Start: één jaagt, de rest helpt",
        "duration": 5,
        "type": "Introductie",
        "organization": "Bij het klaargezette veld. Opkomst en wedstrijdminuten van zaterdag eerst controleren.",
        "flow": "Vraag: waarom kwamen we na rust moeilijk van ons eigen doel af? Toon met drie spelers druk, steun en as. Leg ook uit wie na balwinst terugkomt om te helpen.",
        "transitionCoaching": "Eerste druk — as dicht — geen kans? Herstel.",
        "variations": "",
        "rulesScoring": "",
        "id": "training-rm-ma-w39-deel-1"
      },
      {
        "name": "Warming-up en ASM: kijken, remmen, reageren",
        "duration": 12,
        "type": "Warming-up",
        "organization": "Tweetallen in banen van 12×5 m, één bal per tweetal. Bij oneven aantal één drietal.",
        "flow": "4 min rustig dribbelen en passen; 4 min zijwaarts bewegen, gecontroleerd remmen en open draaien op de beweging van je partner; 4 min pass en korte reactie van 3–5 m. Wissel iedere minuut van rol.",
        "transitionCoaching": "Eerst kijken, dan bewegen. Bouw het tempo op; geen losse lange wachtrijen.",
        "variations": "Veel minuten of vermoeid: afstanden kleiner en rustig tempo.",
        "rulesScoring": "",
        "id": "training-rm-ma-w39-deel-2"
      },
      {
        "name": "Omschakelspel 3v3 + 3: meteen nieuwe rollen",
        "duration": 18,
        "type": "Positiespel",
        "organization": "9 spelers: 3v3 + 3 neutrale spelers in 24×20 m. Neutrale spelers spelen steeds met de ploeg aan de bal. Met 12: 4v4 + 4 in 28×22 m.",
        "flow": "3 min uitleg en voorbeeld; 3×4 min spel met 1 min herstel na de eerste twee reeksen; 1 min drinken. Bij onderschepping direct doorspelen: verliezende ploeg verdedigt. Wissel neutrale rollen per reeks.",
        "transitionCoaching": "Dichtste speler druk, anderen sluiten korte passes. Neutralen hoeven niet mee te jagen. Bij herovering eerst kijken of vooruit kan.",
        "variations": "8: 3v3 + 2 in 22×18 m. 10: 4v4 + 2. 14: 5v5 + 4. Veel wedstrijdminuten: neutrale rol en eventueel één reeks rustig herstel naast het vak met een bal. Weinig minuten: actieve veldrol.",
        "rulesScoring": "5 passes = 1 punt. Geen verplichte contactlimiet. Vijf seconden is een reactieprikkel, geen bevel om blind te blijven jagen.",
        "id": "training-rm-ma-w39-deel-3"
      },
      {
        "name": "Uit de druk: middenvelder helpt achteruit",
        "duration": 20,
        "type": "Spelvorm",
        "organization": "12 spelers: 5v5 in 36×28 m + 1 doelspeler per team in de eigen aanvals-eindzone van 3 m. Iedere ploeg heeft een lage speler (6), een verbindende middenvelder en een hoge speler.",
        "flow": "3 min uitleg; 3×4 min spel, 1 min overleg na de eerste twee reeksen; 3 min drinken en overgang. Scoor door jouw doelspeler gecontroleerd aan te spelen. Bij balwinst maakt één middenvelder direct een schuine terugloopactie als afspeeloptie. Andere spelers geven breedte en diepte. Doelspelers wisselen per reeks.",
        "transitionCoaching": "Dichtste speler geeft druk; tweede speler sluit de pass naar binnen; 6 bewaakt de as. Is de eerste druk uitgespeeld: terug tussen bal en eigen doel. Na balwinst komt één van 8/10 schuin onder de bal, de ander blijft hoger. Niet allebei voorin blijven.",
        "variations": "8: 3v3 + 2 doelspelers op 28×22 m. 10: 4v4 + 2 op 32×24 m. 14: 6v6 + 2. Geen vaste verdedigers nodig: rolverdeling per reeks.",
        "rulesScoring": "Doelspeler bereiken = 1 punt. Vooruit spelen mag meteen als die pass vrij is; geen verplichte omweg via 6. Trainer telt apart hoe vaak steun onder de bal beschikbaar is.",
        "id": "training-rm-ma-w39-deel-4"
      },
      {
        "name": "Richtingspartij: bal terug of samen herstellen",
        "duration": 22,
        "type": "Partijvorm",
        "organization": "12 spelers: 6v6 inclusief eventuele keepers op 40×34 m. Eén keeper: groot doel tegenover twee mini-doelen; wissel veldrollen halverwege. Zonder keeper: twee mini-doelen per kant.",
        "flow": "3 min uitleg; 4×3 min partij met 1 min herstel na de eerste drie reeksen; 4 min drinken en ombouwen. Gewoon voetbal met directe omschakeling. Coach tijdens de rust: wie geeft druk, wie dekt de as, wie helpt na balwinst?",
        "transitionCoaching": "Dichtste speler geeft druk; tweede speler sluit de pass naar binnen; 6 bewaakt de as. Is de eerste druk uitgespeeld: terug tussen bal en eigen doel. Na balwinst komt één van 8/10 schuin onder de bal, de ander blijft hoger. Niet allebei voorin blijven.",
        "variations": "8: 4v4 op 30×24 m. 10: 5v5 op 36×28 m. 14: 7v7 op 45×34 m. Keeper telt mee in het totaal. Veel minuten: één reeks rust; andere ploeg krijgt dan één neutrale speler zodat niemand stil hoeft te wachten.",
        "rulesScoring": "Gewoon doelpunt = 1. Geen bonus voor onnodig lang jagen. Trainer observeert reactie bij balverlies en het herstel als druk mislukt.",
        "id": "training-rm-ma-w39-deel-5"
      },
      {
        "name": "Ingooi aanvallende helft: wie blijft erachter?",
        "duration": 8,
        "type": "Spelvorm",
        "organization": "Zelfde veld, start met ingooi langs de zijlijn op aanvallende helft. Ploeg van 6: ingooier, korte optie, diepe optie, steunspeler, 6 en laatste speler/keeper.",
        "flow": "2 min voordoen; 6 min afwisselend links/rechts ingooien en doorspelen tot bal uit of doelpunt. Eén speler komt kort, één dreigt diep; 6 blijft aan de binnenkant achter de bal, laatste speler bewaakt diepte.",
        "transitionCoaching": "Niet iedereen naar de zijlijn of voor de bal. Bij verlies: dichtste druk, 6 sluit binnenkant.",
        "variations": "8 spelers: 4v4; ingooier en korte optie, één asbewaker en één speler voor dieptedekking. 10–14: meer ontvangers, zelfde restbezetting.",
        "rulesScoring": "Bij ingooi geen buitenspel; zodra daarna wordt gepasst gelden de normale buitenspelafspraken van de partij.",
        "id": "training-rm-ma-w39-deel-6"
      },
      {
        "name": "Afsluiten: spelers noemen hun volgende actie",
        "duration": 5,
        "type": "Afsluiting",
        "organization": "Rustig bewegen en samen opruimen.",
        "flow": "2 min rustig uitlopen; 3 min terugvragen: wat doe je als je niet dicht bij de verloren bal staat? Wie helpt de balveroveraar? Noteer de twee observaties voor donderdag.",
        "transitionCoaching": "Eerste druk — as dicht — help na balwinst.",
        "variations": "",
        "rulesScoring": "",
        "id": "training-rm-ma-w39-deel-7"
      }
    ],
    "createdAt": "2026-09-21T08:00:00.000Z",
    "updatedAt": "2026-09-21T08:00:00.000Z"
  },
  {
    "id": "training-rm-do-w39",
    "code": "W39-DO",
    "title": "Bal terugwinnen of samen herstellen",
    "date": "2026-09-24",
    "theme": "Directe reactie na balverlies",
    "block": "Blok 2 — Druk zetten en reageren na balverlies",
    "totalDuration": 90,
    "mainGoal": "Week 39, V4-weekkaart: eerste druk, steun sluit en as dicht. Lukt heroveren niet, dan vertragen en compact herstellen. Extra wedstrijdaandacht: na balwinst helpt één middenvelder onder de bal om van het eigen doel weg te spelen.",
    "desiredBehavior": "Dichtste speler geeft druk; tweede speler sluit de pass naar binnen; 6 bewaakt de as. Is de eerste druk uitgespeeld: terug tussen bal en eigen doel. Na balwinst komt één van 8/10 schuin onder de bal, de ander blijft hoger. Niet allebei voorin blijven.",
    "evaluationCriteria": "Turf 10 balverliezen: bij minstens 7 direct druk door de dichtste speler en dekking in de as.\nAls eerste druk mislukt: team herstelt tussen bal en eigen doel in plaats van los doorjagen.\nTurf 5 balwinsten: bij minstens 4 biedt een middenvelder schuin onder de bal steun. Dit zijn oefendoelen, geen gemeten resultaten.",
    "coachWords": "Eerste druk\nAs dicht\nGeen kans? Herstel\nHelp na balwinst",
    "expectedLoad": "90 min inclusief uitleg en rust. Korte intensieve acties; donderdag minder stapeling dan maandag, fris richting zaterdag. Weinig minuten: volledige reeksen, vermoeide spelers een reeks korter of neutraal. Geen conditionele finisher.",
    "materials": "16–20 pionnen\nHesjes in 3 kleuren\n8–10 ballen\n1 groot doel en 2 mini-doelen, of 4 poortjes\nDrinken naast veld",
    "setPiece": "Ingooi aanvallende helft: restbezetting.",
    "plannerDay": "thursday",
    "plannerWeekKey": "vsv-jo16-1-2026-2027:2026:W39",
    "parts": [
      {
        "name": "Start: afspraken terughalen",
        "duration": 5,
        "type": "Introductie",
        "organization": "Bij het veld; dezelfde coachwoorden als maandag.",
        "flow": "Laat spelers zelf druk, as en herstel uitleggen. Benoem: na balwinst moet de balbezitter ook een korte optie hebben.",
        "transitionCoaching": "Geen kans? Herstel. Na balwinst: help!",
        "variations": "",
        "rulesScoring": "",
        "id": "training-rm-do-w39-deel-1"
      },
      {
        "name": "Activeren met bal en korte reacties",
        "duration": 12,
        "type": "Warming-up",
        "organization": "Tweetallen op 12×5 m met bal; oneven aantal één drietal.",
        "flow": "4 min rustig bewegen en passen, 4 min kijken en open aannemen, 4 min pass gevolgd door korte reactie op beweging partner. Wissel rollen iedere minuut.",
        "transitionCoaching": "Tempo geleidelijk omhoog; kwaliteit boven veel herhalingen.",
        "variations": "Vermoeide spelers kortere afstand.",
        "rulesScoring": "",
        "id": "training-rm-do-w39-deel-2"
      },
      {
        "name": "Omschakelen herhalen: 4v4 + 2",
        "duration": 15,
        "type": "Positiespel",
        "organization": "10 spelers: 4v4 + 2 neutraal in 26×22 m.",
        "flow": "2 min uitleg; 3×3 min spel met 1 min herstel ertussen; 2 min drinken. Bal kwijt: nieuwe rollen. Neutralen helpen balbezit. Wissel neutrale spelers per reeks.",
        "transitionCoaching": "Dichtste speler geeft druk; tweede speler sluit de pass naar binnen; 6 bewaakt de as. Is de eerste druk uitgespeeld: terug tussen bal en eigen doel. Na balwinst komt één van 8/10 schuin onder de bal, de ander blijft hoger. Niet allebei voorin blijven.",
        "variations": "8: 3v3 + 2. 12: 5v5 + 2 in 30×24 m. 14: 6v6 + 2 in 34×26 m. Geen verplichte contactlimiet.",
        "rulesScoring": "5 passes = 1 punt; na balwinst begint de telling opnieuw.",
        "id": "training-rm-do-w39-deel-3"
      },
      {
        "name": "7v7 met uitbraakzones: terugwinnen of vertragen",
        "duration": 25,
        "type": "Partijvorm",
        "organization": "14 spelers: 7v7 inclusief keepers op 45×34 m. Aan beide uiteinden een uitbraakzone van 5 m vóór de doellijn. Groot doel aan één zijde en twee mini-doelen aan andere zijde kan ook.",
        "flow": "3 min uitleg en voorbeeld; 4×4 min spel met 1 min rust na de eerste drie reeksen; 3 min drinken. Beide ploegen vallen een eigen kant aan. Na balwinst probeer je met bal of pass gecontroleerd de uitbraakzone aan de overkant te bereiken; daarna doorspelen naar doel. De ploeg die verliest reageert direct. Als de eerste druk is uitgespeeld, terug naar binnen en tussen bal en doel.",
        "transitionCoaching": "Dichtste speler geeft druk; tweede speler sluit de pass naar binnen; 6 bewaakt de as. Is de eerste druk uitgespeeld: terug tussen bal en eigen doel. Na balwinst komt één van 8/10 schuin onder de bal, de ander blijft hoger. Niet allebei voorin blijven.",
        "variations": "12: 6v6 op 40×34 m. 10: 5v5 op 36×28 m. 8: 4v4 op 30×24 m met zones van 4 m. Keeper telt mee. Geen keeper: mini-doelen/poortjes. Veel vermoeidheid: één reeks inkorten; geen extra loopwerk.",
        "rulesScoring": "Doelpunt = 1. Alleen direct na een balverovering: uitbraakzone gecontroleerd bereiken vóór nieuw balverlies geeft 1 extra punt, maximaal één uitbraakpunt per balbezit. Niet heen en weer punten verzamelen.",
        "id": "training-rm-do-w39-deel-4"
      },
      {
        "name": "Ingooi + tegenaanval: restbezetting testen",
        "duration": 10,
        "type": "Spelvorm",
        "organization": "Zelfde teams en veld. Herstart afwisselend links en rechts op aanvallende helft.",
        "flow": "2 min afspraken; 6 min ingooien en doorspelen; 2 min drinken. Verdedigers mogen na balwinst direct uitbreken. Controleer vóór de ingooi wie kort komt, wie diepte geeft en wie as/diepte beveiligt.",
        "transitionCoaching": "6 blijft binnen en achter de bal; laatste speler bewaakt rug. Eerste druk alleen door dichtste speler.",
        "variations": "8: ingooier + korte optie + asbewaker + dieptedekking per ploeg; met meer spelers extra loopopties.",
        "rulesScoring": "Gewone doelpunten. Geen verplichte risicopass; terugspelen mag.",
        "id": "training-rm-do-w39-deel-5"
      },
      {
        "name": "Vrije wedstrijd: lukt het zonder trainer?",
        "duration": 18,
        "type": "Partijvorm",
        "organization": "Zelfde veld en teams, uitbraakbonus vervalt.",
        "flow": "2×7 min partij met 2 min zelfoverleg/drinken ertussen; 2 min overgang. Coach zo weinig mogelijk. Turf bij tien balverliezen de reactie en bij vijf balwinsten de steun van het middenveld.",
        "transitionCoaching": "Laat spelers zelf eerste druk en herstel organiseren. Bespreek pas in de pauze.",
        "variations": "8: 4v4; 10: 5v5; 12–14: 6v6/7v7. Oneven aantal: één neutrale speler.",
        "rulesScoring": "Alleen normale doelpunten; vooruit spelen zodra het kan.",
        "id": "training-rm-do-w39-deel-6"
      },
      {
        "name": "Afronden: drie afspraken voor zaterdag",
        "duration": 5,
        "type": "Afsluiting",
        "organization": "Rustig bewegen en korte kring.",
        "flow": "2 min rustig uitlopen; 3 min spelers laten benoemen: dichtste druk, anderen as/diepte, na balwinst korte steun. Noteer observaties en vermoeidheid.",
        "transitionCoaching": "Eerste druk — as dicht — geen kans? Herstel.",
        "variations": "",
        "rulesScoring": "",
        "id": "training-rm-do-w39-deel-7"
      }
    ],
    "createdAt": "2026-09-21T08:00:00.000Z",
    "updatedAt": "2026-09-21T08:00:00.000Z"
  }
];

// Week 40: as sluiten, naar buiten sturen en verbonden blijven.
const WEEK40_TRAININGS = [
  {
    "id": "training-rm-ma-w40",
    "code": "W40-MA",
    "title": "As dicht, stuur naar buiten",
    "date": "2026-09-28",
    "theme": "As sluiten en naar buiten sturen",
    "block": "Blok 2 — Druk zetten en reageren na balverlies",
    "totalDuration": 90,
    "mainGoal": "De ploeg verdedigt vanuit het centrum: de eerste verdediger stuurt de balbezitter naar buiten, de rest sluit aan en houdt de as bezet. Wordt de eerste druk uitgespeeld, dan stopt het blind doorjagen en herstelt het team compact tussen bal en eigen doel.",
    "desiredBehavior": "Dichtste speler benadert van binnen naar buiten en geeft richting.
Spelers achter de druk sluiten door en bewaken de as.
Back en buitenspeler werken aan de flank samen.
Is de druk weg: herstel compact, niet één voor één blijven jagen.
Na balwinst eerst vooruit kijken; lukt dat niet, speel uit de druk.",
    "evaluationCriteria": "Turf 10 verdedigende momenten: wordt de tegenstander bij minstens 7 naar buiten gestuurd?
Bij doorbroken eerste druk: staat de as binnen enkele seconden weer bezet?
In de eindpartij: herkennen spelers zelfstandig wanneer ze doorjagen en wanneer ze herstellen?",
    "coachWords": "As dicht
Stuur naar buiten
Sluit aan
Druk weg? Herstel",
    "expectedLoad": "Middel. Twee dagen na de wedstrijd: veel balacties en korte intensieve reeksen, geen conditionele finisher. Spelers met veel wedstrijdminuten kunnen in de hoofdvorm één reeks korter; spelers met weinig minuten doen alle reeksen.",
    "materials": "16–20 pionnen
Hesjes in 2 of 3 kleuren
8–10 ballen
2 mini-doelen en bij voorkeur 1 groot doel
Drinken naast het veld",
    "setPiece": "Geen apart spelhervattingsblok; focus op teamafstand en herstel na balverlies.",
    "plannerDay": "monday",
    "plannerWeekKey": "vsv-jo16-1-2026-2027:2026:W40",
    "parts": [
      {
        "id": "training-rm-ma-w40-deel-1",
        "name": "Met bal activeren + 1v1 naar buiten sturen",
        "duration": 15,
        "type": "Warming-up",
        "organization": "Tweetallen in banen van 12×6 m. Na 6 min passen en bewegen maak je per baan een 1v1 met twee kleine poortjes aan de buitenzijde. Verdediger start centraal en probeert de aanvaller naar één kant te dwingen.",
        "flow": "6 min dynamisch met bal: passen, open aannemen, korte versnelling en gecontroleerd remmen. Daarna 3×2 min 1v1, telkens van rol wisselen, met korte drink-/wisselmomenten.",
        "attackingCoaching": "Eerste aanname vooruit als het kan; gebruik tempoverandering.",
        "defendingCoaching": "Kom niet recht op de man af. Binnenkant dicht, lichaam halfopen, stuur naar buiten en blijf op je voeten.",
        "transitionCoaching": "Na balwinst meteen uit de druk wegspelen of indribbelen.",
        "rulesScoring": "Aanvaller scoort door een poortje; verdediger scoort bij balwinst door over de startlijn te dribbelen.",
        "variations": "Oneven aantal: één drietal. Bij weinig spelers meerdere korte banen; bij veel spelers parallelle 1v1-vakken."
      },
      {
        "id": "training-rm-ma-w40-deel-2",
        "name": "4v4 + 2: centrum dicht, bal naar buiten",
        "duration": 20,
        "type": "Positiespel",
        "organization": "10 spelers: 4v4 + 2 neutrale spelers in 28×22 m. Neutralen staan aan de korte zijden en spelen met balbezit. Met 12: 5v5 + 2 in 32×24 m; met 8: 3v3 + 2 in 24×20 m.",
        "flow": "2 min uitleg; 4×3 min spel met 1 min rust/coachmoment na iedere reeks; laatste 2 min drinken en ombouwen.",
        "attackingCoaching": "Maak veld breed, speel door de as als die echt open is, anders via buitenkant.",
        "defendingCoaching": "Eerste verdediger stuurt van binnen naar buiten. Tweede en derde speler sluiten naar de balzijde zonder de as open te laten.",
        "transitionCoaching": "Bal kwijt: dichtste speler geeft richting, rest eerst centrum dicht. Druk mislukt: samen herstellen.",
        "rulesScoring": "6 passes = 1 punt. Verdedigende ploeg krijgt een coachpunt als de balbezittende ploeg onder druk naar de zijlijn wordt gedwongen en daar balverlies lijdt.",
        "variations": "Te makkelijk in balbezit: 26×20 m. Te veel flipperkast: 30×24 m. Geen verplichte contactlimiet."
      },
      {
        "id": "training-rm-ma-w40-deel-3",
        "name": "Richtingsspel: buiten vastzetten of compact herstellen",
        "duration": 25,
        "type": "Spelvorm",
        "organization": "12 spelers: 6v6 op 42×34 m, drie verticale stroken gemarkeerd. Met keeper: groot doel tegenover twee mini-doelen. Zonder keeper: twee mini-doelen per kant. Met 14: 7v7 op 46×36 m; met 10: 5v5 op 36×30 m.",
        "flow": "3 min uitleg; 4×4 min spelen met 1 min herstel na de eerste drie reeksen; 3 min drinken/overgang. Gewoon richtingsvoetbal. Bij balverlies bepaalt de eerste verdediger de kant; de rest sluit aan. Wordt de druk uitgespeeld, eerst weer compact worden.",
        "attackingCoaching": "Herken de vrije kant en speel uit de druk. Niet verplicht door het centrum.",
        "defendingCoaching": "9/10 schermen de binnenkant af. Aan de flank sluiten buitenspeler en back samen. Achterste lijn blijft verbonden en bewaakt diepte.",
        "transitionCoaching": "Dichtste druk, as dicht. Geen echte druk meer? Herstel en organiseer opnieuw.",
        "rulesScoring": "Gewoon doelpunt = 1. Extra punt voor een balverovering in een buitenstrook die binnen 8 seconden tot doelpoging leidt.",
        "variations": "Veel wedstrijdminuten: één reeks rust of neutrale rol. Weinig wedstrijdminuten: alle reeksen actief."
      },
      {
        "id": "training-rm-ma-w40-deel-4",
        "name": "Vrije partij: herkennen zonder trainer",
        "duration": 30,
        "type": "Partijvorm",
        "organization": "Zelfde teams, zo groot mogelijk passend veld. Richtlijn: 6v6 op 45×35 m, 7v7 op 50×38 m. Gebruik keepers als beschikbaar.",
        "flow": "Eerste 12 min: speel door en coach alleen met de vier coachwoorden. 2 min teamoverleg. Daarna 14 min volledig vrij spel waarin de trainer vooral observeert. Laatste 2 min korte terugvraag en opruimen.",
        "attackingCoaching": "Voetbal vooruit als het kan; anders behoud en nieuwe ruimte zoeken.",
        "defendingCoaching": "Niet allemaal naar de bal. Centrum eerst, dan druk. Flank is de val, niet de as.",
        "transitionCoaching": "Spelers bepalen zelf: doorjagen of herstellen.",
        "rulesScoring": "Gewone wedstrijdregels. Geen bonuspunten in het laatste blok.",
        "variations": "Oneven aantal: één neutrale speler die met balbezit meespeelt. Bij 8 spelers 4v4 op 30×24 m."
      }
    ],
    "createdAt": "2026-09-28T16:15:00.000Z",
    "updatedAt": "2026-09-28T16:15:00.000Z"
  }
];
