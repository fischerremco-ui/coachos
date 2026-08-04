# CoachOS

CoachOS is een mobile-first webapp voor een jeugdvoetbaltrainer van VSV Velserbroek.
De app bevat het team JO16-1, vijf voorbeeldtrainingen, eigen trainingsprogramma’s,
reflecties, een beheerbaar Playbook, een lokale historie per training en een
seizoensplanning voor 2026–2027.

## Lokaal draaien

De gewone app kan nog steeds via `index.html` worden bekeken. Voor PWA-functies
zoals installatie, service workers en offline caching is een webserver verplicht.
Browsers staan deze functies niet toe via een `file://`-adres.

Open PowerShell in de projectmap en start een eenvoudige lokale server:

```powershell
python -m http.server 8000
```

Open daarna:

```text
http://localhost:8000
```

Laat het PowerShell-venster open zolang je CoachOS lokaal gebruikt. Voor installatie
op een telefoon is een publieke HTTPS-versie nodig; `localhost` op de laptop is niet
hetzelfde adres als `localhost` op de telefoon.

## Publiceren via GitHub Pages

CoachOS wordt zonder buildstap rechtstreeks vanuit de root van de repository
gepubliceerd. De workflow `.github/workflows/pages.yml` gebruikt de officiële
GitHub Pages-actions en draait bij iedere push naar `main` of `master`. De
`.nojekyll`-markering zorgt dat GitHub de bestanden als gewone statische site
publiceert.

Activeer GitHub Pages één keer in de repository:

1. Open de repository op GitHub.
2. Ga naar `Settings` → `Pages`.
3. Kies onder `Build and deployment` bij `Source` voor `GitHub Actions`.
4. Commit en push alle CoachOS-bestanden, inclusief `index.html`, naar de root van
   de standaardbranch.
5. Open het tabblad `Actions` en controleer of
   `CoachOS publiceren via GitHub Pages` is geslaagd.

De openbare project-URL is daarna:

```text
https://<gebruikersnaam>.github.io/<repositorynaam>/
```

De exacte URL staat ook in de samenvatting van de geslaagde deployment. Alle
app-paden zijn relatief, waardoor HTML, manifest, iconen en service worker binnen
dit repository-subpad blijven werken.

## Gebruik

- Open VSV en kies `JO16-1`.
- Ga via het teamdashboard naar `Trainingen`.
- Gebruik zoeken, trainingsblok en sortering om een training te vinden.
- Kies `+ Nieuwe training` om zelf een compleet programma samen te stellen.
- Start leeg of kies een omschakel-, opbouw-, verdedigend, aanvallend of
  observatiesjabloon en kies `Vul met sjabloon`.
- Sjablonen vullen alleen korte aanwijzingen tussen vierkante haken in; de trainer
  bepaalt altijd zelf de definitieve inhoud.
- Voeg met `+ Onderdeel toevoegen` zoveel trainingsonderdelen toe als nodig.
- Verander de volgorde met `Omhoog` en `Omlaag`.
- Gebruik de schrijfaanwijzingen en `Voorbeeld tonen` onder tekstvelden. Voorbeelden
  worden alleen getoond en overschrijven nooit ingevoerde tekst.
- Open een training om alle onderdelen en eerdere reflecties te bekijken.
- Kies `Bewerken` om een programma aan te passen.
- Met `Training dupliceren` maak je een bewerkbare kopie.
- Met `Als sjabloon gebruiken` maak je een nieuwe training met dezelfde opbouw,
  een lege datum, nieuwe id’s en zonder gekoppelde reflecties.
- Bij verwijderen vraagt CoachOS apart wat er met gekoppelde reflecties moet gebeuren.
- Kies `Training afronden`, vul de vier vragen in en sla de reflectie op.
- Open `Playbook` om spelprincipes toe te voegen, te bewerken, te openen en te
  verwijderen.
- Open een spelprincipe om bronnen in de bijbehorende Kennisbank te beheren.
- Open `Seizoen 2026–2027` vanuit het teamdashboard om speelweken in een
  chronologische tijdlijn te bekijken.
- Voeg speelweken handmatig toe en bewerk, dupliceer of verwijder ze wanneer de
  planning verandert.
- Open een speelweek om bestaande trainingen te koppelen of te ontkoppelen.

CoachOS bewaart een gewijzigd trainingsformulier automatisch als concept. Bij
terugkomst kun je doorgaan of het concept expliciet weggooien. Bij het verlaten
van een gewijzigd formulier verschijnt eerst een waarschuwing.

Ieder trainingsonderdeel ondersteunt organisatie, verloop, coaching per spelfase,
regels en puntentelling, variaties en eigen materialen. In de detailweergave
verschijnt ieder onderdeel in een aparte kaart. Lege velden worden weggelaten en
invoer met één punt per regel wordt als een nette opsomming getoond.

Eerder opgeslagen trainingen blijven bruikbaar. Bij het openen vertaalt CoachOS
oude velden zoals `uitleg` en algemene `coachingPoints` automatisch naar het nieuwe
onderdeelmodel.

## Playbook en Kennisbank

Spelprincipes staan los van trainingen en worden zelfstandig in het Playbook
beheerd. De startdata bevat maximaal één voorbeeldprincipe:
`Lok druk uit om een vrije man te creëren`.

Binnen ieder spelprincipe staat een Kennisbank. Een bron ondersteunt de speelwijze
met verdieping, bewijs of inspiratie en bevat een titel, type en optionele link,
auteur, samenvatting, belangrijkste inzicht en eigen notities.

PDF-bestanden kunnen lokaal worden toegevoegd. CoachOS controleert het bestandstype
en de PDF-inhoud en accepteert maximaal 2 MB per bestand. Een bestand wordt één keer
bij de bron opgeslagen; losse koppelingen bepalen bij welke spelprincipes die bron
hoort. De interface beheert in deze versie alleen de koppeling vanuit het geopende
spelprincipe, maar het datamodel ondersteunt meerdere koppelingen.

## Seizoen 2026–2027

De seizoensmodule staat binnen het dashboard van JO16-1 en vormt geen apart
hoofdmenu. De voorbeeldplanning is handmatig gecontroleerd tegen de KNVB-kolom
`Districtscompetitie Junioren categorie B, 3 fasen, O13 t/m O19`.

Iedere speelweek bevat een begin- en einddatum, type, optionele fase en notitie,
trainingsweeknummer, status en gekoppelde trainingen. Combinaties zoals
`Inh. / Bek.` zijn opgeslagen als `Inhaalweekend` met een toelichtende notitie.
Lege KNVB-cellen in juni worden niet automatisch als `Vrij` geïnterpreteerd.

Het teamdashboard toont de volgende kalenderperiode als `Volgende speelweek`, ook
als deze vrij, beker, inhaal of niet nader geclassificeerd is. De eerstvolgende
competitieronde staat er apart bij. Een huidige fase verschijnt alleen binnen het
gedateerde bereik van speelweken waarin die fase expliciet is ingevuld; daarbuiten
staat `Geen actieve competitiefase`.

Wedstrijdbeheer, automatische PDF-import en automatische trainingsadviezen maken
geen deel uit van deze versie. Reflecties in een speelweek worden afgeleid van de
gekoppelde trainingen.

## Opslag en back-ups

Trainingen, concepten, reflecties, spelprincipes, bronnen, PDF-bestanden, seizoenen
en speelweken worden opgeslagen in `localStorage`. Ze blijven op hetzelfde apparaat
en in dezelfde browser beschikbaar. Er wordt niets naar een externe database
verstuurd.

`localStorage` synchroniseert niet tussen apparaten of browsers. Gegevens op een
iPhone verschijnen dus niet automatisch op een laptop of andere telefoon. Gebruik
de back-upfunctie om gegevens handmatig over te zetten. Opslag is bovendien aan het
webadres gekoppeld: data van `localhost`, een `file://`-adres en de GitHub Pages-URL
staan los van elkaar.

PDF-bestanden worden als lokale bestandsdata opgeslagen. Browseropslag is beperkt;
CoachOS toont een duidelijke melding wanneer er onvoldoende ruimte beschikbaar is.

Onderaan het trainingsoverzicht staan twee back-upacties:

- `Back-up downloaden` maakt één JSON-bestand met trainingen, reflecties,
  spelprincipes, bronnen, lokale PDF-bestanden, seizoenen, speelweken en
  trainingkoppelingen.
- `Back-up importeren` kan gegevens samenvoegen of volledig vervangen.

Bij volledig vervangen downloadt CoachOS eerst automatisch een back-up van de
huidige gegevens. Alleen geldige CoachOS-back-ups worden geaccepteerd. Back-ups uit
versie 2 zonder Playbookgegevens en versie 3 zonder seizoensgegevens blijven
bruikbaar. Bij import wissen zij geen bestaande kennisbank- of seizoensgegevens.
Het actuele back-upformaat is versie 4.

## Installeren als app

### Android — Chrome

1. Open de HTTPS-versie van CoachOS in Chrome.
2. Wacht tot `CoachOS installeren` verschijnt.
3. Kies de knop en bevestig de installatie.
4. CoachOS verschijnt tussen de apps en opent zonder browserbalk.

Je kunt ook het Chrome-menu openen en `App installeren` of `Toevoegen aan
startscherm` kiezen.

### Android — Edge

1. Open de HTTPS-versie in Edge.
2. Kies `CoachOS installeren` wanneer de knop verschijnt.
3. Je kunt ook via het Edge-menu de site als app installeren.

### iPhone — Safari

1. Open de gepubliceerde GitHub Pages-URL van CoachOS in Safari.
2. Tik op `Deel`.
3. Kies `Zet op beginscherm`.
4. Bevestig met `Voeg toe`.

CoachOS toont op een iPhone automatisch een korte kaart met deze stappen. De app
opent daarna standalone en gebruikt de ingestelde rode status- en themakleur.

## Offline werken

Na de eerste volledige online opening bewaart de service worker de complete
app-shell:

- HTML en de offlinepagina
- CSS
- JavaScript en voorbeelddata
- het manifest
- alle app-iconen

CoachOS gebruikt daarna een cache-first strategie. Trainingen, reflecties,
concepten, Playbookgegevens en de seizoensplanning blijven daarnaast in
`localStorage` staan. Lokale PDF-bestanden kunnen hierdoor eveneens offline worden geopend. Als een
niet-gecachete pagina niet kan worden geladen, verschijnt de nette
CoachOS-offlinemelding.

Open de app één keer online voordat je offline gaat. Een eerste bezoek zonder
internet kan nog geen bestanden uit de cache halen.

## Cache en nieuwe versies

De cacheversie staat bovenaan `sw.js`:

```js
const CACHE_VERSION = "coachos-v3";
```

Verhoog deze waarde bij een release, bijvoorbeeld naar `coachos-v4`. Bij activering
verwijdert de nieuwe service worker automatisch oudere CoachOS-caches. Ververs de
app daarna één keer om de nieuwe bestanden te laden.

Het vernieuwen of verwijderen van caches wist `localStorage` niet. Trainingen,
reflecties, concepten, Playbookgegevens en seizoensgegevens blijven dus behouden. Let op: opslag
hoort bij het webadres. Gebruik de bestaande back-upfunctie om gegevens van een
lokale `file://`-versie naar de gepubliceerde HTTPS-versie over te zetten.

## Projectstructuur

- `index.html` — basisstructuur van de app
- `styles.css` — mobile-first vormgeving
- `data.js` — voorbeeldtrainingen, het voorbeeldspelprincipe en de seizoensplanning
- `app.js` — navigatie, schermen en lokale opslag
- `manifest.json` — naam, kleuren, startgedrag en app-iconen
- `sw.js` — offline cache en versiebeheer
- `offline.html` — melding als een pagina niet beschikbaar is
- `icons/` — PWA- en iPhone-iconen
- `.github/workflows/pages.yml` — automatische publicatie via GitHub Pages
- `.nojekyll` — publiceert de repository als gewone statische site
- `.gitignore` — houdt lokale back-ups, tests en persoonsgegevens buiten Git
- `tools/generate-icons.ps1` — genereert alle iconformaten opnieuw
- `README.md` — uitleg

## Techniek

De app gebruikt alleen HTML, CSS en vanilla JavaScript. Alle routes werken via de
URL-hash, zodat navigatie ook bij direct openen vanuit het bestandssysteem goed
blijft functioneren.
