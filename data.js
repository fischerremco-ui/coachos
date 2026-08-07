// Voorbeelddata voor CoachOS v0.2.
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
  }
];
