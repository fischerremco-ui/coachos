# CoachOS

CoachOS is een mobile-first webapp voor een jeugdvoetbaltrainer van VSV Velserbroek.
De app bevat het team JO16-1, vijf voorbeeldtrainingen, eigen trainingsprogramma’s,
reflecties, een beheerbaar Playbook, een lokale historie per training, de tactische
V4-seizoensplanner voor 2026–2027 en lokaal spelers- en aanwezigheidsbeheer.

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
- Kies op de trainingsdetailpagina `Trainingskaart printen` voor een compacte
  A4-weergave zonder navigatie, acties, registraties of meldingen.
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
- Open vanuit het dashboard of de tactische jaarlijn een weekkaart. Maak daaruit
  een maandag- of donderdagtraining; week 33 en 34 bieden ook woensdag aan.
- Open `Spelers` om spelers toe te voegen, te bewerken, te deactiveren,
  heractiveren of definitief te verwijderen.
- Registreer op een trainingsdetail de `Aanwezigheid` en op een speelweekdetail
  de `Speelweekbeschikbaarheid`.
- Open `Statistieken` vanuit Spelers voor trainingsaanwezigheid en
  speelweekbeschikbaarheid per actieve speler.

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
en de PDF-inhoud en accepteert maximaal 10 MB per bestand. Een bestand wordt één keer
als `Blob` in IndexedDB opgeslagen; in `localStorage` staat alleen de metadata. Losse
koppelingen bepalen bij welke spelprincipes die bron hoort. De interface beheert in
deze versie alleen de koppeling vanuit het geopende spelprincipe, maar het datamodel
ondersteunt meerdere koppelingen. Bestaande base64-bijlagen worden bij het opstarten
veilig naar IndexedDB gemigreerd en pas daarna uit `localStorage` verwijderd.

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

Het seizoensoverzicht vergelijkt de wedstrijdcontext van iedere V4-weekkaart met
de gecontroleerde KNVB-kalender. Afwijkingen staan in een dichtklapbaar blok en
worden nooit automatisch aangepast. De trainer kan één plannerweek per keer, na
bevestiging, aan het bijbehorende KNVB-kalenderitem gelijk trekken.

### V4-seizoensplanner en weekkaart

Naast de KNVB-kalender bevat CoachOS 39 inhoudelijke weekkaarten uit de VSV JO16
Seizoensplanner V4: voorbereiding in week 33 en 34, najaar in week 35 tot en met
50 en voorjaar in week 4 tot en met 24. Week 33 en 34 bevatten maandag, woensdag
en donderdag. Vanaf week 35 bevat de planner uitsluitend maandag en donderdag;
dinsdag wordt nooit als trainingsdag toegevoegd.

Iedere kaart gebruikt een stabiele sleutel van seizoen, ISO-jaar en ISO-week. Zo
blijft er ook bij meerdere kalenderitems in één week precies één inhoudelijke
weekkaart bestaan. De kaart bewaart het waarom: competitieblok, wedstrijdcontext,
hoofd- en ondersteunende principes, gewenst gedrag, de vijf spelfases,
coachwoorden, spelhervatting, observatiecriteria, belasting en het alternatief bij
lage opkomst. Eigen trainersnotities blijven lokaal bewaard.

Een training vanuit een weekkaart is een bewerkbaar concept in de gewone
trainingsmodule, geen tweede trainingssysteem. CoachOS vult code, datum, thema,
blok, doel, gewenst gedrag, criteria, coachwoorden, belasting, broninhoud en de
relevante spelhervatting vooraf in. Na opslaan wordt de training gekoppeld aan het
best passende kalenderitem in dezelfde ISO-week. Een tweede klik opent de
bestaande training en maakt geen duplicaat.

Bij de eerste start vult een idempotente migratie ontbrekende V4-weekkaarten en
ontbrekende bronvelden aan. Bestaande aangepaste kaartvelden en trainersnotities
gaan voor de bronwaarden. De migratie raakt trainingen, reflecties, kennisbank,
PDF’s, kalenderstatussen, kalendernotities, spelers en registraties niet aan en kan
veilig opnieuw worden uitgevoerd.

Wedstrijdbeheer, automatische PDF-import en automatische trainingsadviezen maken
geen deel uit van deze versie. Reflecties in een speelweek worden afgeleid van de
gekoppelde trainingen.

## Spelers en registraties

De spelerslijst start leeg. Per speler bewaart CoachOS de naam en optioneel een
rugnummer, primaire en secundaire positie en voorkeursbeen. Niet-actieve spelers
verdwijnen uit nieuwe registraties, terwijl hun historie bewaard blijft. Bij een
speler met historie stelt CoachOS daarom eerst deactiveren voor. Definitief
verwijderen wist ook de gekoppelde registraties.

Het spelersprofiel bevat daarnaast één kwaliteit, één ontwikkelpunt met
evaluatiedatum, losse gedateerde observaties en maximaal vier lengtemetingen per
seizoen. Observaties krijgen automatisch de datum en het actuele trainingsblok.
Bij iedere lengtemeting staat het verschil met de vorige meting. Bij meer dan
3 cm groei toont CoachOS uitsluitend een neutrale aanwijzing om het sprint- en
springvolume af te stemmen.

Op een training heet de registratie `Aanwezigheid`. Op een kalenderitem heet deze
`Speelweekbeschikbaarheid`; een speelweek is nadrukkelijk nog geen wedstrijd. De
beschikbaarheidsregistratie bevat geen informatie over selectie, basisplaats,
invalbeurt, speelminuten of daadwerkelijke wedstrijddeelname.

De statussen zijn `Aanwezig`, `Afwezig`, `Ziek`, `Geblesseerd`, `Vakantie`,
`Te laat`, `Eerder weg` en `Onbekend`. Voor percentages gelden `Aanwezig`,
`Te laat` en `Eerder weg` als aanwezig. `Afwezig`, `Ziek`, `Geblesseerd` en
`Vakantie` tellen mee als bekende niet-aanwezigheid. `Onbekend` telt nooit mee in
de noemer. Daardoor tellen vrije weekenden, vakanties, feestdagen, lege
kalenderitems en speelweken met uitsluitend `Onbekend` niet mee voor het
speelweekbeschikbaarheidspercentage.

De statistieken tonen per actieve speler het aantal geregistreerde trainingen,
het trainingsaanwezigheidspercentage, het aantal speelweken met een opgeslagen
registratie en het speelweekbeschikbaarheidspercentage. Daarnaast staan er drie
compacte teamcijfers: actieve spelers, gemiddelde trainingsaanwezigheid en
gemiddelde opkomst per geregistreerde training. Er worden geen uitslagen,
medische gegevens of andere wedstrijdstatistieken bijgehouden.

### Speelminuten en belasting

Bij competitiewedstrijden, bekerwedstrijden en bekerpouleweken kunnen per actieve
speler de speelminuten en een basiselfmarkering worden opgeslagen. De snelknoppen
`0`, `45`, `60` en `90` vullen het laatst geselecteerde minutenveld. Het dashboard
toont binnen het venster van de laatste drie kalenderweken de drie spelers met de
meeste en de drie met de minste minuten. Het volledige overzicht ondersteunt de
keuze tussen herstel en een extra trainingsprikkel op maandag.

## Opslag en back-ups

Trainingen, concepten, reflecties, spelers, aanwezigheids- en
beschikbaarheidsregistraties, speelminuten, spelprincipes, bronnen, seizoenen en speelweken worden
opgeslagen in `localStorage`. PDF-bestanden staan als blobs in IndexedDB. Alles blijft
op hetzelfde apparaat en in dezelfde browser beschikbaar. Er wordt niets naar een
externe database verstuurd.

`localStorage` synchroniseert niet tussen apparaten of browsers. Gegevens op een
iPhone verschijnen dus niet automatisch op een laptop of andere telefoon. Gebruik
de back-upfunctie om gegevens handmatig over te zetten. Opslag is bovendien aan het
webadres gekoppeld: data van `localhost`, een `file://`-adres en de GitHub Pages-URL
staan los van elkaar.

Browseropslag is beperkt. CoachOS meldt iedere mislukte schrijfactie zichtbaar en
maakt duidelijk wanneer de opslag vol is. Onderaan het teamdashboard staat, als de
browser dit ondersteunt, het geschatte opslaggebruik en altijd de datum van de
laatste back-up. Die regel krijgt een waarschuwingskleur als de laatste back-up ouder
dan veertien dagen is of nog nooit is gemaakt.

Onderaan het trainingsoverzicht staan drie back-upacties:

- `Back-up downloaden` maakt één JSON-bestand met trainingen, reflecties,
  spelers, aanwezigheids- en beschikbaarheidsregistraties, spelprincipes, bronnen,
  speelminuten, lokale PDF-bestanden, seizoenen, speelweken, trainingkoppelingen, weekkaarten en
  eigen trainersnotities.
- `Back-up zonder bijlagen` maakt een kleiner JSON-bestand wanneer exporteren met
  PDF-bestanden door onvoldoende geheugen niet lukt.
- `Back-up importeren` kan gegevens samenvoegen of volledig vervangen.

Bij volledig vervangen downloadt CoachOS eerst automatisch een back-up van de
huidige gegevens. Alleen geldige CoachOS-back-ups worden geaccepteerd. Back-ups uit
versie 2 zonder Playbookgegevens, versie 3 zonder seizoensgegevens, versie 4
zonder spelersgegevens, versie 5 zonder weekkaarten en versie 6 zonder speelminuten
blijven bruikbaar. Bij
import wissen oudere back-ups geen bestaande kennisbank-, seizoens-, spelers-,
registratie-, weekkaart- of speelminutengegevens. Het actuele back-upformaat is versie 7.
PDF-bijlagen worden alleen tijdens export als base64 in het zelfstandige JSON-bestand
opgenomen en bij import weer als blobs in IndexedDB geplaatst.

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
- JavaScript, voorbeelddata en V4-weekkaartdata
- het manifest
- alle app-iconen

CoachOS gebruikt netwerk-eerst met cachefallback voor de appcode, gegevensbestanden,
stylesheet, startpagina en navigaties. Daardoor wordt een nieuwe versie na verversen
direct opgehaald wanneer er verbinding is. Iconen en overige statische bestanden
gebruiken cache-eerst. Een ontbrekend optioneel icoon blokkeert de installatie van
de service worker niet. Trainingen, reflecties, concepten, spelers, registraties,
Playbookgegevens, de seizoensplanning en trainersnotities op weekkaarten blijven
daarnaast in `localStorage` staan. Lokale PDF-bestanden kunnen hierdoor eveneens offline worden geopend. Als een
niet-gecachete pagina niet kan worden geladen, verschijnt de nette
CoachOS-offlinemelding.

Open de app één keer online voordat je offline gaat. Een eerste bezoek zonder
internet kan nog geen bestanden uit de cache halen.

## Cache en nieuwe versies

De cacheversie staat bovenaan `sw.js`:

```js
const CACHE_VERSION = "coachos-v8";
```

Verhoog deze waarde bij een volgende release, bijvoorbeeld naar `coachos-v9`. Bij activering
verwijdert de nieuwe service worker automatisch oudere CoachOS-caches. Ververs de
app daarna één keer om de nieuwe bestanden te laden.

Het vernieuwen of verwijderen van caches wist `localStorage` niet. Trainingen,
reflecties, concepten, spelers, registraties, Playbookgegevens en seizoensgegevens
blijven dus behouden. Let op: opslag
hoort bij het webadres. Gebruik de bestaande back-upfunctie om gegevens van een
lokale `file://`-versie naar de gepubliceerde HTTPS-versie over te zetten.

## Projectstructuur

- `index.html` — basisstructuur van de app
- `styles.css` — mobile-first vormgeving
- `data.js` — voorbeeldtrainingen, het voorbeeldspelprincipe en de seizoensplanning
- `planner-data.js` — brongetrouwe V4-weekkaarten voor de tactische jaarlijn
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
