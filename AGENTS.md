# CoachOS — instructies voor code-agents

Dit bestand geldt voor elke opdracht in deze repo. Lees het vóór je iets wijzigt.

## Wat dit project is

CoachOS is een offline-first PWA voor een jeugdvoetbaltrainer (VSV Velserbroek
JO16-1). Er is geen build-stap, geen bundler, geen framework en geen enkele
externe dependency. De bestanden worden rechtstreeks geserveerd.

| Bestand | Inhoud |
|---|---|
| `index.html` | app-shell, laadt in deze volgorde `data.js`, `planner-data.js`, `app.js` |
| `app.js` | ~5100 regels, alle logica |
| `data.js` | voorbeelddata: `PRINCIPLES`, `SEASONS`, `SEASON_WEEKS`, `TRAININGS` |
| `planner-data.js` | `PLANNER_WEEK_CARDS`: 39 weekkaarten uit de papieren seizoensplanner |
| `styles.css` | alle styling |
| `sw.js` | service worker |
| `manifest.json` | PWA-manifest |
| `offline.html` | offline-fallbackpagina |

Alle data staat lokaal op het apparaat van de trainer. Er is een JSON-back-up met
import/export en per entiteit uitgeschreven validatie.

## Privacy — harde eis

De app bevat namen en gegevens van minderjarigen. Er gaat niets naar een server:
geen analytics, geen foutrapportage naar buiten, geen externe CDN's, geen fonts
van buiten. Dat blijft zo. Voeg nooit een netwerkverzoek toe.

De app doet geen medische uitspraken. Waar lichaamsgegevens worden getoond
(bijvoorbeeld lengtemetingen) blijft de tekst beperkt tot trainingsbelasting:
geen medische termen, geen diagnose, geen gezondheidsadvies.

## Huisregels — volg de bestaande stijl

Lees eerst `app.js` en houd je aan de conventies die er al in zitten:

- Function declarations (`function doeIets() {}`), geen classes, geen modules,
  geen `import`/`export`. Alles in het globale scope van `app.js`.
- Nederlandstalige UI-teksten. Engelse code-identifiers.
- Elke entiteit heeft een `normalizeX(x = {})`-functie die een volledig,
  voorspelbaar object teruggeeft met defaults. Volg dat patroon voor nieuwe
  entiteiten.
- Elke opslagsleutel is een `const` bovenin, met versiesuffix:
  `const PLAYERS_STORAGE_KEY = "coachos-players-v1";`
- Schermen zijn `renderX()`-functies die `app.innerHTML` vullen met een template
  string. Gebruik altijd `escapeHtml()` rond gebruikersinvoer.
- Nieuwe schermen worden geregistreerd in het `routes`-object met een `parent`
  voor de terugknop.
- Feedback aan de gebruiker via `showToast(message)`.
- Datums als `YYYY-MM-DD`-strings, verkregen via `getLocalDateKey()`.
- Nieuwe id's via `createUniqueId(prefix)`.
- Geen `alert()` voor gewone meldingen; `window.confirm()` alleen voor
  destructieve acties, zoals nu al gebeurt.
- Ontwerp voor een telefoon in de hand: minimale tekstgrootte 18 px,
  aanraakvlakken minimaal 48 bij 48 px, hoog contrast, geen horizontaal scrollen.

## Twee regels die altijd gelden

1. **Doe niets wat niet in de opdracht staat.** Geen refactors, geen
   hernoemingen, geen opschoning van bestaande code, geen wijzigingen aan de
   styling behalve waar expliciet gevraagd.
2. **Bestaande gebruikersdata mag nooit verloren gaan.** Elke migratie moet oude
   opslagformaten blijven lezen. Verwijder nooit oude data voordat het schrijven
   van de nieuwe vorm is gelukt.

## Testen na elke wijziging

1. Open de app in een nieuw incognitovenster: de eerste keer opstarten moet
   werken zonder bestaande `localStorage`.
2. Importeer een back-up van vóór de wijziging. Alle bestaande data moet
   zichtbaar blijven.
3. Zet het netwerk uit en herlaad. De app moet blijven werken.
4. Test op een telefoonviewport van 390 px breed. Geen horizontaal scrollen.
5. Vul de opslag kunstmatig totdat er een quota-fout optreedt en controleer of
   die zichtbaar wordt gemeld.

## Niet doen

- Geen frameworks, bundlers, npm-pakketten of externe CDN's.
- Geen netwerkverzoeken naar wat dan ook. De app blijft volledig lokaal.
- Geen analytics of foutrapportage naar buiten.
- Geen wijzigingen aan bestaande opslagsleutels zonder migratie.
- `app.js` niet opsplitsen in modules. Dat kan later, maar niet nu.
- De kalenderbotsing tussen `SEASON_WEEKS` en `PLANNER_WEEK_CARDS` niet
  automatisch oplossen. Zie sessie 2.
