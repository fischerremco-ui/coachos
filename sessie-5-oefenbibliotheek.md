# Sessie 5 — Oefenbibliotheek

Werk alleen deze sessie af en lever hem als één commit op.
Voer hem pas uit nadat sessie 4 is opgeleverd en getest.

## Achtergrond

De trainer haalt oefenvormen van YouTube en Instagram en wil ze koppelen aan zijn
spelprincipes. Op dit moment leven oefenvormen alleen binnen een training: ze
zijn niet herbruikbaar, niet zoekbaar op principe, en er is geen overzicht van
wat er dit seizoen al hoe vaak is gebruikt.

De papieren planner heeft een bibliotheek van vijftien kernvormen. Die willen we
in de app brengen als zelfstandige entiteit, inclusief een snelle invoerroute
voor een link die de trainer op de bank vindt.

## 5.1 Nieuwe entiteit: oefenvorm

```js
const EXERCISES_STORAGE_KEY = "coachos-exercises-v1";

function normalizeExercise(exercise = {}) {
  return {
    id:               exercise.id               ?? createUniqueId("ex"),
    title:            exercise.title             ?? "",
    principleIds:     exercise.principleIds      ?? [],   // array, verwijzing naar PRINCIPLES
    phase:            exercise.phase             ?? "",   // één van de vijf spelfases of "" voor meerdere
    organisation:     exercise.organisation      ?? "",   // afmeting, aantallen, materiaal
    rules:            exercise.rules             ?? "",   // spelregels inclusief bonusregel
    coachingPoints:   exercise.coachingPoints    ?? [],   // max 3 strings
    variations:       exercise.variations        ?? { easier: "", harder: "" },
    lowAttendance:    exercise.lowAttendance     ?? "",   // variant voor 6–10 spelers
    successCriteria:  exercise.successCriteria   ?? [],   // waaraan zie ik dat het lukt
    sourceUrl:        exercise.sourceUrl         ?? "",   // YouTube / Instagram link
    tags:             exercise.tags              ?? [],
    usageCount:       exercise.usageCount        ?? 0,    // bijgewerkt door addExerciseToTraining()
    lastUsedDate:     exercise.lastUsedDate      ?? null,
    createdAt:        exercise.createdAt         ?? new Date().toISOString(),
    updatedAt:        exercise.updatedAt         ?? new Date().toISOString(),
  };
}

function getExercises() {}
function saveExercises(exercises) {}  // via writeStorage()
```

## 5.2 Vijftien kernvormen voorvullen

Lees de vijftien kernvormen uit de papieren planner (die staan in
`planner-data.js` of het gerelateerde PDF-document in de repo). Zet ze als
starterdata in een functie:

```js
function seedExercisesIfEmpty() {}
```

Die wordt eenmalig aangeroepen bij het opstarten, alleen als de bibliotheek nog
leeg is. Markeert het met een vlag (`coachos-exercises-seeded-v1`) zodat het
niet herhaald wordt. Bestaande bibliotheken worden nooit overschreven.

## 5.3 Schermen

### Bibliotheekscherm (`oefenbibliotheek`, parent: `dashboard`)

Bereikbaar via een knop op het dashboard. Toont:

- Zoekbalk — filtert live op titel, principe en tags.
- Filterknoppen voor de vijf spelfases plus "Alle". Eén actief tegelijk.
- Lijst van oefenvormen, gesorteerd op meest recent gebruikt bovenaan. Per kaart:
  titel, gekoppelde principes (als labels), hoe vaak gebruikt dit seizoen, en een
  knop "Toevoegen aan training" (zie 5.4).
- Knop "Nieuwe oefenvorm" rechtsboven.

### Detailscherm (`oefenvorm`, parent: `oefenbibliotheek`)

Toont alle velden van de oefenvorm. Knop "Bewerken" opent het formulier. Als
`sourceUrl` gevuld is, toont het een knop "Bron bekijken" die de link opent.

Toon onder "Succesindicatoren" een aparte sectie "Waaraan zie ik dat het lukt"
in een duidelijk zichtbaar blok — dit is de inhoudelijke kern van de kaart.

### Formulierscherm (`oefenvorm-bewerken`, parent: `oefenvorm`)

Velden op volgorde:
1. Titel
2. Spelfase (keuzemenu: Aanvallen / Omschakelen na balverlies / Verdedigen /
   Omschakelen na balwinst / Dode spelmomenten / Meerdere)
3. Principes (checkboxes op basis van `PRINCIPLES`)
4. Organisatie (textarea)
5. Spelregels (textarea)
6. Coachingpunten — drie losse tekstvelden, niet een vrije textarea
7. Makkelijker (textarea)
8. Moeilijker (textarea)
9. Lage opkomst 6–10 spelers (textarea)
10. Waaraan zie ik dat het lukt — twee tot drie losse tekstvelden
11. Bron-URL (url-invoerveld met `inputmode="url"`)
12. Tags (kommagescheiden tekstveld)

Sla op met één knop onderaan.

### Snelle invoer via link (`oefenvorm-snel`, parent: `oefenbibliotheek`)

Bereikbaar via een knop "Snel toevoegen via link" in het bibliotheekscherm.

Stap 1: één veld — plak een URL. Knop "Volgende".
Stap 2: het volledige formulier uit 5.3, met de URL alvast ingevuld.

Doel: iemand ziet iets op Instagram op de bank en heeft het in twintig seconden
in de bibliotheek staan, ook al zijn de meeste velden nog leeg.

## 5.4 Oefenvorm toevoegen aan een training

Knop "Toevoegen aan training" op zowel de bibliotheeklijst als het detailscherm.

Werkwijze:
- Toon een keuze: aan welke open training toevoegen? (lijst van trainingen zonder
  datum in het verleden, of "Nieuwe training").
- Maak van de oefenvorm een `exercise`-object in `training.exercises`, in het
  bestaande formaat (`name`, `detail`, `type`).
- Verhoog `usageCount` en zet `lastUsedDate` op vandaag.

Kopieer de inhoud — verbreek de koppeling, zodat aanpassen in de training de
bibliotheekkaart niet wijzigt.

## 5.5 Principe-filter op het trainingsformulier

Op het bestaande trainingsformulier, boven het onderdelen-veld:
knop "Voeg uit bibliotheek toe" die het bibliotheekscherm opent als modal of
tussenliggend scherm, gefilterd op de principes die al aan de training zijn
gekoppeld.

## 5.6 Gebruiksoverzicht op het dashboard

Voeg toe aan het dashboard, onder het belastingblokje uit sessie 3:

**"Vaakst gebruikt dit seizoen"** — drie oefenvormen met naam en aantal keer.
**"Al een tijdje niet gebruikt"** — twee oefenvormen die meer dan vier weken
geleden voor het laatst zijn gebruikt en meer dan drie keer zijn toegepast.
Klikbaar naar het detailscherm.

Doel: voorkomen dat de trainer steeds naar dezelfde drie vormen grijpt zonder het
te merken.

## 5.7 Back-up bijwerken

Neem `exercises` op in `exportData()` en in de importvalidatie. Oude back-ups
zonder dit veld moeten blijven importeren. Importeer nooit voorgevulde
starterdata over bestaande bibliotheekkaarten heen.

## Klaar wanneer

- De vijftien kernvormen staan als starter in de app.
- Een nieuwe vorm is via een link in twintig seconden toegevoegd.
- Oefenvormen zijn doorzoekbaar op principe en fase.
- Een vorm is met één tik aan een training toegevoegd.
- Het dashboard toont welke vormen over- en onderbelast zijn.
- Een oude back-up importeert nog steeds.
