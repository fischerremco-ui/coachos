// Gerichte datamigratie voor de seizoenskalender.
// Een weekend met "Start nieuwe fase" is in CoachOS óók een competitieronde.
// De fase zelf blijft bewaard in week.phase; het type wordt genormaliseerd zodat
// wedstrijdweergaven en speelminutenregistratie de openingsronde niet overslaan.
(function migrateOpeningCompetitionRounds() {
  const storageKey = "coachos-season-weeks-v1";

  function normalizeOpeningRound(week) {
    if (!week || week.type !== "Start nieuwe fase" || !week.phase) return false;
    week.type = "Competitiewedstrijd";
    return true;
  }

  if (Array.isArray(SEASON_WEEKS)) {
    SEASON_WEEKS.forEach(normalizeOpeningRound);
  }

  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;

    const savedWeeks = JSON.parse(raw);
    if (!Array.isArray(savedWeeks)) return;

    let changed = false;
    savedWeeks.forEach((week) => {
      changed = normalizeOpeningRound(week) || changed;
    });

    if (changed) {
      localStorage.setItem(storageKey, JSON.stringify(savedWeeks));
    }
  } catch (error) {
    console.warn("Kalendercorrectie kon niet worden uitgevoerd.", error);
  }
}());
