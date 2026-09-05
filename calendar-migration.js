// Gerichte datamigratie voor de seizoenskalender.
// Een weekend met "Start nieuwe fase" is in CoachOS óók een competitieronde.
// De fase zelf blijft bewaard in week.phase; het type wordt genormaliseerd zodat
// wedstrijdweergaven en speelminutenregistratie de openingsronde niet overslaan.
(function migrateOpeningCompetitionRounds() {
  const seasonStorageKey = "coachos-season-weeks-v1";
  const weekCardStorageKey = "coachos-week-cards-v1";

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

  if (Array.isArray(SEASON_WEEKS)) {
    SEASON_WEEKS.forEach(normalizeOpeningRound);
  }

  if (typeof PLANNER_WEEK_CARDS !== "undefined" && Array.isArray(PLANNER_WEEK_CARDS)) {
    PLANNER_WEEK_CARDS.forEach(correctWeek36Context);
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
