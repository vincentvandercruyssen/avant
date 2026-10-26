---
title: "Stadsgids"
date: 2026-09-23
schooljaar: "2026-2027"
klas: "6CRM"
vak: "web-story"
aliases:
  - "/2026-2027/6crm/web/stadsgids/"
auteurs:
  - "Vincent Vander Cruyssen"
periode: "September"
thema: "Herhaling"
software:
  - "Figma"
  - "Visual Studio Code"
  - "HTML5"
  - "CSS3 (Flexbox & Grid)"
leerplandoelen:
  - code: "CRS01"
    criterium: "Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen."
  - code: "CRS02"
    criterium: "De juiste semantische HTML-elementen en CSS-eigenschappen doelgericht selecteren in functie van inhoud en lay-out."
  - code: "CRS06"
    criterium: "Vlot en efficiënt werken met ontwerptools (Figma) en een professionele code-editor (Visual Studio Code)."
  - code: "CRS18"
    criterium: "Een semantisch correcte, functionele en gestijlde multipage website (Stadsgids) met coherente navigatie realiseren."
  - code: "CRS20"
    criterium: "Teksten, links en beeldassets ordelijk bundelen, categoriseren en correct integreren in een webomgeving."
  - code: "CRS21"
    criterium: "Typografische hiërarchie, card-componenten en leesbaarheid doordacht vormgeven via CSS-stijlregels."
  - code: "CRS22"
    criterium: "Lay-outsystemen (Flexbox voor navigatie en Grid voor cards en side-by-side presentaties) doelgericht opzetten."
  - code: "CRS23"
    criterium: "Afbeeldingsformaten, afmetingen en relatieve bestandspaden controleren op foutloze weergave in de browser."
  - code: "CRS27"
    criterium: "De webbestanden (HTML, CSS, assets) volgens de afgesproken structuur en naamgeving tijdig opleveren."
  - code: "GEC02"
    criterium: "Kwaliteitsbewust en nauwkeurig werken met oog voor correcte code-inspringing, nesting en syntaxregels."
draft: false
---

## Briefing & concept

Als crossmediamaker vertaal je ideeën naar krachtige visuele en interactieve ervaringen. Eerder ontdekte je al hoe HTML de fundering legt voor inhoud en hoe CSS zorgt voor de visuele identiteit van een webpagina.

In deze herhalingsopdracht til je die basiskennis naar een webproject van portfolio-niveau. Je ontwerpt en codeert een complete **multipage stadsgids** over drie steden naar keuze. Je doorloopt het gehele ontwerpproces: van doordacht vooronderzoek en desktop wireframing in Figma tot het coderen van semantische HTML5 en moderne CSS met Flexbox en Grid.

### Wat is een moderne online stadsgids?

Een eigentijdse stadsgids is veel meer dan een droge opsomming van monumenten. Het is een inspirerende gids waarin tips, sterke beelden en lokale aanraders samenkomen in een overzichtelijke lay-out.

Laat je inspireren door de onderstaande designconcepten:

* **Thematische indeling:** Deel je steden intuïtief in. Denk aan herkenbare categorieën zoals *Dicht bij huis* tegenover *Verder weg*, of werk rond thema's zoals cultuur, architectuur en gastronomie.
* **Artikels:** Verrijk de vaste lijst van bezienswaardigheden met een artikel, zoals *"Onze 5 favoriete koffiebars op een regenachtige zondag"* of *"De leukste vintage boetieks van de stad"*. Dit geeft je gids een authentiek magazinegevoel.
* **Concrete Call-to-Action (CTA):** Zorg dat pagina-onderdelen activeren. Denk aan gerichte actieknoppen zoals *"Ontdek meer"*, *"Download de wandelroute"* of *"Bekijk alle bezienswaardigheden"*.
* **Typografie met karakter:** Kies bewust voor een typografisch contrast. Combineer bijvoorbeeld een karaktervolle schreefletter (*serif*) of displayletter voor titels met een strakke, goed leesbare schreefloze letter (*sans-serif*) voor de broodtekst.

### Inspiratiebronnen

Bekijk onderstaande platformen om inspiratie op te doen voor lay-out, typografie, beeldgebruik en tone-of-voice:

* [Citygidsen.be](https://citygidsen.be/) – Functionele card-lay-outs, gerichte downloadknoppen en duidelijke stadsselecties.
* [Time to Momo](https://www.timetomomo.com/nl/) – Sterke inhoudelijke invalshoeken, thematische routes en wijkgerichte bezienswaardigheden, opvallende vormgeving.
* [Bart's Boekje](https://www.bartsboekje.com/) – Sfeervolle fotografie gecombineerd met persoonlijke tips.
* [Visit Gent](https://visit.gent.be/nl) – Strakke gemeentelijke gids met heldere thematische blokken en een duidelijke hiërarchie.
* [I amsterdam](https://www.iamsterdam.com/) – Krachtige beeldtaal, overzichtelijke navigatie en heldere agendablokken.

### Jouw concept

Je bouwt een samenhangende website bestaande uit **vier HTML-pagina's**:

1. **Landingspagina (`index.html`):** De centrale startpagina die de bezoeker verwelkomt, het overkoepelende thema introduceert en doorklikopties biedt naar de drie geselecteerde steden.
2. **Drie stadspagina's (`stad_1.html`, `stad_2.html`, `stad_3.html`):** Drie afzonderlijke detailpagina's die elk één specifieke stad uitdiepen met kerngegevens en bezienswaardigheden. Voor één stad naar keuze werk je tevens een uitgelicht artikel uit.

Kies drie steden die een inhoudelijke logica vertonen. Je kunt kiezen voor drie steden binnen één land of drie steden verbonden door een specifiek thema (zoals bijvoorbeeld historische havensteden, Noord-Europese designsteden of culinaire hoofdsteden).

### Technische specificaties

Je ontwerpt de website op een desktopbreedte van **1440 px**, waarbij alle leesbare inhoud netjes binnen een maximale breedte van **ongeveer 1200 px** blijft. Dit bereik je met een gecentreerde container (`max-width: 1200px; margin: 0 auto;`) of door je lay-outblokken zijwaartse binnenruimte te geven aan de hand van `padding`. Achtergrondkleuren of sfeerbeelden kunnen wel de volle 100% schermbreedte vullen.

De vier HTML-pagina's koppel je aan één centraal extern stijlblad (`style.css`). Voor de vormgeving combineer je Flexbox (navigatie, badges, footer) met CSS Grid (card-overzichten en lay-outsecties). Al het beeldmateriaal (JPG, WebP, PNG of SVG) sla je geoptimaliseerd voor web op in de submap `images/`.

#### Mappenstructuur

Plaats alle bestanden in je OneDrive onder het vak **Web-Story** in een overzichtelijke structuur:

```text
VoornaamA_Stadsgids/
└─ images/
   └─ hero-landingspagina.jpg
   └─ stad1-hero.jpg
   └─ stad1-spot1.jpg
   └─ stad1-spot2.jpg
   └─ ...
└─ index.html
└─ stad_1.html
└─ stad_2.html
└─ stad_3.html
└─ style.css
```

Plaats alle HTML-bestanden en het centrale `style.css`-bestand rechtstreeks in de hoofdmap van je project. Alle afbeeldingen bewaar je ordelijk in de submap `images/` en eventuele lettertypebestanden in `fonts/`. Gebruik uitsluitend kleine letters, cijfers en koppeltekens in bestandsnamen.

## Stappenplan

### Onderzoek & inhoud

Een doordachte website valt of staat met kwalitatieve inhoud en een duidelijke voorbereiding.

#### Inspiratie onderzoeken
Bekijk de vermelde inspiratiewebsites ([Citygidsen.be](https://citygidsen.be/), [Time to Momo](https://www.timetomomo.com/nl/), [Bart's Boekje](https://www.bartsboekje.com/), [Visit Gent](https://visit.gent.be/nl) of [I amsterdam](https://www.iamsterdam.com/)). Zoek **drie inspirerende websites** en onderzoek hun sterke punten. Noteer in een voorbereidingsdocument:
* Hoe zit de navigatiestructuur en de header in elkaar?
* Hoe zijn de cards (*) van bezienswaardigheden vormgegeven (beeldverhouding, titels, badges)?
* Welke sfeer stralen de typografie en kleurkeuzes uit?
* Hoe worden artikels of tips gepresenteerd naast de vaste bezienswaardigheden?
* Welke call-to-actions (knoppen of links) zetten de bezoeker aan tot actie?
* Is er nog iets dat je opvalt?

> **Wat is een kaartcomponent (card)?**  
> In UI- en webdesign is een **kaart** (*card*) een zelfstandig, afgebakend onderdeeltje dat alle gerelateerde informatie en acties over één specifiek onderwerp bundelt. Een sfeerbeeld, een duidelijke titel, informatieve labels of badges, een korte beschrijving en een actieknop vormen samen één geheel. Doordat kaarten in een consistent raster worden herhaald, kan een bezoeker vlot door de inhoud scannen. Zie ook: [The Component Gallery](https://component.gallery/components/)

#### Steden & thema bepalen

Kies de drie steden die je gaat presenteren en bepaal de overkoepelende invalshoek van jouw gids.

#### Teksten
Schrijf de teksten uit in je voorbereidingsdocument:
* **Landingspagina:** Een wervende hoofdtitel, een introductie over het gekozen thema en een korte introductieparagraaf per stad.
* **Per stadspagina:**
  * Een beknopte introductie met kernfeiten (ligging, karakter, sfeer, enzomeer).
  * Minimaal vier bezienswaardigheden met een titel, beschrijving en twee badges (bijvoorbeeld categorie, wijk of prijsklasse).
* **Voor één stad naar keuze:**
  * Eén artikel met lokale tips (bijvoorbeeld favoriete koffiebars of een specifieke wandelroute). Dit artikel hoef je niet zelf te schrijven: je mag gerust een bestaand reisartikel of blogbericht online opzoeken en beknopt overnemen of herwerken.

#### Beeldmateriaal verzamelen
Zoek kwalitatieve, rechtenvrije sfeerbeelden via platforms zoals [Unsplash](https://unsplash.com/), [Pexels](https://www.pexels.com/) of [Pixabay](https://pixabay.com/). Verzamel minstens 15 beelden (een hero-beeld voor de landingspagina, een hero-beeld per stad, en foto's voor alle bezienswaardigheden en het artikel). Hernoem de beelden direct naar logische, kleine bestandsnamen (zoals `stad1-gravensteen.jpg`) en plaats ze in de map `images/`.

#### Indienen

Dien je voorbereidingsdocument in via de voorziene Smartschool-uploadmap als `.pdf` of `.odt` (`VoornaamA_Stadsgids-Onderzoek.pdf`).

### Wireframing in Figma

Voordat je codeert, leg je de visuele indeling en de hiërarchie vast in Figma. Dit voorkomt dat je tijdens het coderen moet improviseren over lay-out en verhoudingen.

#### Document opzetten

Maak in Figma een nieuw bestand aan binnen je vakmap. Werk op een desktop-frame van **1440 px** breed en schakel een 12-koloms lay-outgrid in (*Layout Grid → Columns → Count: 12, Margin: 120, Gutter: 24*). Met twee zijmarges van 120 px hou je zo exact 1200 px over voor je inhoudsraster.

#### Landingspagina uittekenen

Teken het wireframe van de homepage (`index.html`) uit:
* **Header:** Logo of websitetitel aan de linkerkant, horizontale navigatielinks naar de steden aan de rechterkant.
* **Hero-sectie:** Grote titel, subtitel, sfeerbeeld en een opvallende Call-to-Action knop.
* **Thematisch overzicht:** Een sectie die de drie steden introduceert aan de hand van drie grote overzichtskaarten met beeld, titel, korte teaser en een doorklikknop.
* **Footer:** Secundaire navigatie, copyright en colofon.

#### Stadspagina-stramien ontwerpen

Ontwerp één consistent modulair sjabloon dat als basis dient voor de drie stadspagina's:
* **Header:** Identiek aan de landingspagina, met een visuele aanduiding van de actieve pagina.
* **Hero:** Paginatitel (stadsnaam) met een sfeervol panoramisch beeld.
* **Stadsoverzicht:** Een side-by-side sectie met een korte inleidende tekst en een lijstje met kernfeiten naast een typerend beeld.
* **Bezienswaardigheden:** Een grid van minstens vier cards. Elke card bevat een afbeelding, badges (categorie of wijk), een naam, een korte toelichting en een actielink.
* **Artikel (voor één stad):** Een horizontaal uitgelicht blok dat de aandacht trekt met persoonlijke tips en een foto.
* **Actiesectie (CTA):** Een gerichte actieknop (*"Download de route"* of *"Bekijk op de kaart"*).
* **Footer:** Identiek aan de landingspagina.

#### Indienen

Dien je wireframes in via de voorziene Smartschool-uploadmap:
* **Figma-link:** Bezorg de gedeelde link naar je Figma-bestand (kijkrechten inschakelen).
* **Export:** Exporteer je frames als afbeeldingen (`.png` of `.jpg`) of als pdf (`VoornaamA_Stadsgids-Wireframe.pdf`).

### Interactief voorbeeld

Bekijk hieronder het interactieve voorbeeld van de landingspagina van de stadsgids. Gebruik de knoppen **Resultaat**, **HTML** en **CSS** om te schakelen tussen de visuele weergave en de onderliggende code. Via de knop **Volledig scherm** (rechtsboven) open je de demo schermvullend met de code aan de rechterkant.

> **Let op:** In dit interactieve voorbeeld is de centrale landingspagina (`index.html`) uitgewerkt als didactische referentie. De drie afzonderlijke stadspagina's (`stad_1.html`, `stad_2.html`, `stad_3.html`) werk je zelfstandig uit volgens in dit stappenplan.

{{< demo_embed dir="voorbeelden/web-story/stadsgids" title="Stadsgids" files="stad_1.html,stad_2.html,stad_3.html" height="650px" >}}

### Basisstructuur

Maak de vier HTML-bestanden aan in je projectmap: `index.html`, `stad_1.html`, `stad_2.html` en `stad_3.html`. Maak ook het centrale CSS-bestand `style.css` aan en voorzie de submappen `images` en `fonts`.

Gebruik in Visual Studio Code de Emmet-snelkoppeling: open een leeg HTML-bestand, typ een uitroepteken (`!`) en druk op `Tab` of `Enter`. De editor genereert meteen de volledige HTML5-basisstructuur.

Vul elk bestand met deze geldige basisopbouw:

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stadsgids</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

</body>
</html>
```

* **Documenttype & taal:** `<!DOCTYPE html>` activeert de moderne HTML5-standaard. Met `<html lang="nl">` geef je aan dat de inhoud in het Nederlands is geschreven, wat essentieel is voor zoekmachines en schermlezers.
* **Tekencodering & viewport:** `<meta charset="UTF-8">` garandeert dat speciale tekens (zoals é, ç of ü) correct getoond worden. De `<meta name="viewport">`-tag zorgt ervoor dat de pagina schaalt naar de breedte van het beeldscherm.
* **Unieke paginatitel:** Pas het `<title>`-element in de `<head>` op elke pagina aan zodat het direct duidelijk maakt welke stad de bezoeker bekijkt (bijvoorbeeld `Stadsgids - Kopenhagen`).
* **Stijlbladkoppeling:** Via `<link rel="stylesheet" href="style.css">` koppel je alle vier de pagina's aan hetzelfde centrale bestand in de hoofdmap.

### Algemene stijlen & typografie

In `style.css` leg je de globale basisstijlen vast voor het hele project. Hier stel je de lettertypes, de achtergrondkleur, de tekstkleur en de standaard witruimtes in:

```css
@import url("https://use.typekit.net/txk1ice.css");

@font-face {
  font-family: "Childer";
  src: url("fonts/Childer.otf");
}

body {
  margin: 0;
  background-color: #fbfbe6;
  color: #322020;
  font-family: "basic-sans", sans-serif;
}

header,
section,
footer {
  padding: 20px 5%;
}

a {
  text-decoration: none;
  color: #322020;
}

a:hover {
  text-decoration: underline;
}

p {
  max-width: 80ch;
}

section h2 {
  margin-top: 0;
}
```

* **Lettertypes inladen:** Met `@import` laad je een webfont in (bijvoorbeeld via Adobe Fonts/Typekit of Google Fonts). Met `@font-face` kun je daarnaast een lokaal fontbestand uit je map `fonts/` declareren.
* **Standaard browserwitruimte verwijderen:** De browser kent aan het `<body>`-element standaard een buitenmarge toe. Met `body { margin: 0; }` sluiten gekleurde achtergrondvlakken en de navigatiebalk naadloos aan tegen de vensterrand.
* **Consistente binnenruimte via selector-groepering:** Met `header, section, footer { padding: 20px 5%; }` geef je alle hoofdblokken in één regel dezelfde binnenruimte: 20 pixels aan de boven- en onderkant, en 5% aan de zijkanten. Dankzij het percentage schaalt de inhoud soepel mee met bredere vensters. Zie ook: [Cursus CSS: Box Model](/cursus/css/#box-model).
* **Hyperlinks stylen:** Met `text-decoration: none;` verwijder je de standaard onderstreping van links. Via `a:hover` verschijnt de onderlijning zodra de bezoeker met de muis over de link beweegt.
* **Leesbaarheid garanderen met `max-width: 80ch;`:** Op brede schermen kunnen tekstregels te lang worden om comfortabel te lezen. Met de relatieve eenheid `ch` (de breedte van het nulteken `0`) beperk je paragrafen tot maximaal 80 tekens per regel. Zie ook: [Cursus CSS: Eenheden](/cursus/css/#eenheden).
* **Koppen ontkoppelen van bovenmarges:** Browsers geven `<h2>`-elementen standaard een forse bovenmarge. Met `margin-top: 0;` sluit de titel strak aan tegen de bovenkant van de sectie.

### Header & navigatie met Flexbox

Plaats bovenaan de `<body>` van elke pagina een identieke `<header>`. Deze bevat links het logo met de titel van de stadsgids, en rechts het navigatiemenu met doorkliklinks naar de verschillende steden:

```html
<header>
  <a href="index.html" class="logo">
    <img src="images/logo-stadsgids.svg" alt="Logo Stadsgids" width="60">
    <h1>Stadsgids</h1>
  </a>
  
  <nav>
    <a href="stad_1.html">Stad 1</a>
    <a href="stad_2.html">Stad 2</a>
    <a href="stad_3.html">Stad 3</a>
  </nav>
</header>
```

#### Flexbox

In `style.css` geef je de header vorm met **Flexbox**. In de cursus vind je meer uitleg over de werking van flexibele containers: [Cursus CSS: Flexbox](/cursus/css/#flexbox).

```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dbfbf8;
}

header .logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

header h1 {
  margin: 0;
  font-size: 1.5rem;
}

header nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
```

* **`header { display: flex; justify-content: space-between; }`** Maakt van de header een flexibele container. De logolink links en het navigatiemenu rechts worden automatisch uit elkaar geduwd naar de buitenste randen.
* **`header .logo { display: flex; align-items: center; gap: 15px; }`** De logokoppeling is zelf ook een flex container. Hierdoor staan het beeldmerk (`<img>`) en de paginatitel (`<h1>`) netjes verticaal gecentreerd naast elkaar met een tussenruimte van 15 pixels.
* **`header nav { display: flex; gap: 50px; }`** Plaatst de navigatielinks op één horizontale rij met een ruime tussenafstand van 50 pixels.

### Landingspagina: main, secties & Grid

De inhoud van `index.html` organiseer je binnen het `<main>`-element met drie semantische secties. Elke sectie krijgt een herkenbaar `id`-kenmerk:

```html
<main>
  <section id="inleiding">
    <h2>Inleiding</h2>
    <p>Een korte introductie tot de stadsgids.</p>
  </section>

  <section id="steden">
    <h2>Bekijk onze steden</h2>

    <div class="grid-container">
      <article class="card">
        <img src="images/barcelona-1.jpg" alt="Stad 1" width="200">
        <h3>Stad 1</h3>
        <p>Ontdek de historische straatjes, lokale markten en authentieke sfeer.</p>
        <a href="stad_1.html">Ontdek meer</a>
      </article>

      <!-- Voeg hier cards toe van de andere steden -->
    </div>
  </section>
</main>
```

#### Secties en achtergronden

In `style.css` geef je de secties extra ademruimte en een eigen achtergrondkleur via gerichte ID-selectors. Zie ook: [Cursus CSS: Selectors](/cursus/css/#id-selector).

```css
main {
  padding: 20px 0;
}

section {
  margin-bottom: 20px;
}

#steden {
  background-color: #fcff2060;
}

#steden h2 {
  text-align: center;
}
```

* **`#steden { background-color: ...; }`** Geeft de stedenkeuze een herkenbare achtergrondtint over de volle breedte van het venster.
* **`#steden h2 { text-align: center; }`** Centreert de titel boven het kaartenraster voor een evenwichtige presentatie.

#### CSS Grid

Voor het overzicht van de kaarten gebruik je **CSS Grid**. Waar Flexbox vooral uitblinkt in één richting, verdeelt CSS Grid een pagina in een strak tweedimensionaal raster van kolommen en rijen. Meer uitleg vind je in de cursus: [Cursus CSS: Grid](/cursus/css/#grid).

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

#nieuws .grid-container {
  grid-template-columns: 1fr 1fr;
}
```

* **`grid-template-columns: 1fr 1fr 1fr;`** De fractie-eenheid (`fr`) verdeelt de beschikbare breedte in evenredige delen. Drie keer `1fr` levert exact drie kolommen van gelijke breedte op.
* **`#nieuws .grid-container { grid-template-columns: 1fr 1fr; }`** Binnen de nieuwssectie overschrijf je het raster eenvoudig naar twee kolommen (`1fr 1fr`), waardoor de twee artikelen ruimer worden weergegeven.
* **`gap: 20px;`** Bepaalt de uniforme tussenruimte tussen alle kaarten in het raster.

#### Kaarten en knoppen vormgeven

Tot slot style je de individuele kaarten, de beeldweergave en de actieknoppen:

```css
.card {
  padding: 20px;
  background-color: #dadefe;
  border-radius: 32px;
}

main img {
  width: 100%;
  border-radius: 20px 20px 0 0;
}

.card a {
  display: block;
  width: fit-content;
  background-color: #e11d48;
  color: #ffffff;
  margin-top: 20px;
  margin-left: auto;
  padding: 10px 2ch;
  border-radius: 32px;
}

.card a:hover {
  background-color: #ffffff;
  color: #e11d48;
  text-decoration: none;
}
```

* **Card-omkadering:** Met `background-color`, `padding: 20px;` en `border-radius: 32px;` vormen de kaarten zachte, afgeronde blokken die duidelijk losstaan van de pagina-achtergrond.
* **Beeldweergave met `main img`:** Met `width: 100%;` vullen afbeeldingen de volledige breedte van de kaart. Met `border-radius: 20px 20px 0 0;` rond je enkel de twee bovenhoeken af, zodat de foto vloeiend aansluit op de rand van de kaart.
* **Van een tekstlink een knop maken met `.card a`:**
  * Met `display: block;` en `width: fit-content;` groeit de knop mee met de tekstinhoud.
  * Met `margin-left: auto;` duw je de knop automatisch naar de rechterkant van de kaart.
  * `padding: 10px 2ch;` zorgt voor een comfortabele klikzone (10 pixels boven/onder, en 2 tekenbreedtes links/rechts).
  * Via `:hover` wissel je de achtergrond- en tekstkleur om voor een duidelijke interactieve feedback.

### Footer: eenvoudige herhalende afsluiting

Plaats onderaan elke HTML-pagina dezelfde `<footer>`. Deze bevat minimaal een copyrightvermelding en een groepje pictogrammen die linken naar sociale mediakanalen. Gratis vector-icoontjes kun je downloaden via [SVG Repo](https://www.svgrepo.com/). Het voordeel van SVG (Scalable Vector Graphics) is dat vectorafbeeldingen op elk schermformaat haarscherp blijven en een minimale bestandsgrootte hebben.

```html
<footer>
  <p>Voornaam Achternaam - Stadsgids - 2026</p>
  <div>
    <img src="images/icon-facebook.svg" alt="Facebook" width="40">
    <img src="images/icon-instagram.svg" alt="Instagram" width="40">
    <img src="images/icon-pinterest.svg" alt="Pinterest" width="40">
    <img src="images/icon-youtube.svg" alt="YouTube" width="40">
  </div>
</footer>
```

Kopieer deze footer ongewijzigd naar alle vier de HTML-pagina's.

#### Flexbox & pictogrammen

In `style.css` style je de footer met Flexbox:

```css
footer {
  background-color: #dbfbf8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer img {
  width: 30px;
}
```

* **Visuele eenheid:** Door dezelfde achtergrondkleur (`#dbfbf8`) en padding als de `<header>` te gebruiken, sluit de pagina boven- en onderaan harmonieus aan.
* **Flexbox verdeling:** `display: flex; justify-content: space-between; align-items: center;` plaatst de copyrighttekst links en de iconengroep rechts, verticaal gecentreerd.
* **Iconen groeperen:** Omdat alle `<img>`-tags samen in één `<div>` zitten, behandelt Flexbox deze groep als één compact geheel. Via `footer img { width: 30px; }` schaal je alle iconen naar een uniform en rustig formaat.

### Stadspagina's: main, side-by-side & bezienswaardigheden

Op de drie afzonderlijke stadspagina's (`stad_1.html`, `stad_2.html`, `stad_3.html`) werk je telkens één specifieke bestemming uit. Je behoudt dezelfde `<header>` en `<footer>`, maar richt het `<main>`-gedeelte modulair in met drie specifieke onderdelen:

```html
<main>
  <section id="stadsoverzicht">
    <div>
      <h2>Over Kopenhagen</h2>
      <p>Kopenhagen combineert historische charme met baanbrekend Scandinavisch design, een levendige fietscultuur en een wereldberoemde gastronomie.</p>
      <ul>
        <li><strong>Land:</strong> Denemarken</li>
        <li><strong>Inwoners:</strong> ca. 650.000</li>
        <li><strong>Beste reistijd:</strong> Mei tot september</li>
      </ul>
    </div>
    <img src="images/kopenhagen-haven.jpg" alt="Kleurrijke gevels aan Nyhavn in Kopenhagen">
  </section>

  <section id="bezienswaardigheden">
    <h2>Bezienswaardigheden</h2>
    <div class="grid-container">
      <article class="card">
        <img src="images/kopenhagen-designmuseum.jpg" alt="Designmuseum Danmark">
        <span class="badge">Cultuur</span>
        <h3>Designmuseum Danmark</h3>
        <p>Iconisch Scandinavisch design, toegepaste kunst en inspirerende mode-exposities.</p>
        <a href="#">Meer info</a>
      </article>

      <!-- Voeg minstens drie extra cards toe (minimaal vier bezienswaardigheden in totaal) -->

    </div>
  </section>

  <!-- Voeg voor één stad naar keuze een uitgelicht artikel toe -->
  <section id="artikel">
    <article>
      <div>
        <span class="badge badge-accent">Tip</span>
        <h2>Onze 5 favoriete koffiebars op een regenachtige zondag</h2>
        <p>Van minimalistische branderijen in Vesterbro tot knusse hoekjes met versgebakken kaneelbroodjes in Nørrebro...</p>
        <a href="#">Lees de gids</a>
      </div>
      <img src="images/kopenhagen-koffiebar.jpg" alt="Gezellige koffiebar met warme verlichting">
    </article>
  </section>
</main>
```

#### Doelgericht lijstgebruik

Kies steeds het juiste HTML-lijstelement afhankelijk van de inhoud:
* **Ongeordende lijst (`<ul>`):** Gebruik voor de stadsfeiten een ongeordende lijst met `<li>`. De volgorde van kerngegevens (inwoners, ligging, klimaat) is immers willekeurig.
* **Opsommingslabels benadrukken:** Plaats labels in een `<strong>`-tag om direct een duidelijke typografische hiërarchie te creëren tussen label en waarde. Zie ook: [Cursus HTML: Lijsten](/cursus/html/#lijst-met-lijstitems).

#### Side-by-side informatie met CSS Grid

Op de stadspagina plaats je de introductietekst en het stadsbeeld evenwichtig naast elkaar via twee gelijke grid-kolommen:

```css
#stadsoverzicht {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

#stadsoverzicht img {
  border-radius: 20px;
}
```

* **`grid-template-columns: 1fr 1fr;`** Plaatst het tekstblok (`<div>`) links en de foto (`<img>`) rechts in twee gelijke helften.
* **`align-items: center;`** Linet beide elementen verticaal gecentreerd uit ten opzichte van elkaar.
* **`gap: 40px;`** Zorgt voor een royale tussenruimte tussen tekst en beeld.

#### Badges en bezienswaardigheden

In de bezienswaardighedensectie hergebruik je dezelfde `.grid-container` en `.card` klassen. Voeg informatieve badges toe om categorieën of buurten aan te duiden:

```css
.badge {
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 4px 12px;
  background-color: #f1f5f9;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 999px;
  text-transform: uppercase;
}

.badge-accent {
  background-color: #fef3c7;
  color: #d97706;
}
```

* **Pill-badge met `border-radius: 999px;`:** Door een zeer hoge border-radius in te stellen verandert het rechthoekige vlakje in een ronde capsule (pilvorm).
* **`text-transform: uppercase;`** Zet de categorietekst automatisch om in hoofdletters voor een compacte, labelachtige uitstraling.
* **Variatie via `.badge-accent`:** Door een extra klasse toe te voegen geef je bijzondere labels (zoals een lokale tip of aanrader) een contrasterende accentkleur.

#### Uitgelicht artikel

Voor één stad naar keuze werk je een uitgelicht artikelblok uit. Ook hier combineer je CSS Grid om tekst en beeld in een breed horizontaal blok te presenteren:

```css
#artikel article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  background-color: #dadefe;
  padding: 30px;
  border-radius: 32px;
}

#artikel img {
  border-radius: 20px;
}
```

### Extra uitdagingen

Heb je de basisstructuur en opmaak vlot afgewerkt? Verdiep je project met geavanceerde frontend-technieken om jouw stadsgids een extra professionele uitstraling te geven:

* **Micro-interacties op cards:** Voeg een subtiele lift-animatie en schaduwwisseling toe wanneer de bezoeker met de muis over een card beweegt:
  ```css
  .card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.15);
  }
  ```
* **Interactieve kaartintegratie:** Integreer onderaan je stadspagina een interactieve kaart via een responsieve Google Maps iframe embed. Zo kan de bezoeker direct bezienswaardigheden op de kaart lokaliseren:
  ```html
  <div class="map-container">
    <iframe 
      src="https://www.google.com/maps/embed?pb=..." 
      width="100%" 
      height="350" 
      style="border:0; border-radius: 20px;" 
      loading="lazy">
    </iframe>
  </div>
  ```
* **CSS-variabelen voor je kleurenpalet:** Wil je jouw kleuren eenvoudig op één centrale plek beheren? Definieer herbruikbare variabelen bovenaan je CSS via de `:root`-selector:
  ```css
  :root {
    --kleur-achtergrond: #fbfbe6;
    --kleur-tekst: #322020;
    --kleur-accent: #dbfbf8;
    --kleur-kaart: #dadefe;
    --kleur-knop: #e11d48;
  }

  body {
    background-color: var(--kleur-achtergrond);
    color: var(--kleur-tekst);
  }
  ```

## Oplevering

De finale oplevering omvat de volledige website (HTML, CSS en eventuele extra uitdagingen). Comprimeer (zip) jouw volledige projectmap `VoornaamA_Stadsgids` en upload het ZIP-bestand in de Smartschool-uploadzone:

```text
VoornaamA_Stadsgids.zip
└─ fonts/
   └─ Childer.otf
└─ images/
   └─ barcelona-1.jpg
   └─ icon-facebook.svg
   └─ icon-instagram.svg
   └─ icon-pinterest.svg
   └─ icon-youtube.svg
   └─ logo-stadsgids.svg
   └─ ...
└─ index.html
└─ stad_1.html
└─ stad_2.html
└─ stad_3.html
└─ style.css
```

### Checklist

Controleer jouw werk grondig aan de hand van onderstaande kwaliteitscontrole vóór je definitief inlevert.

#### Bestanden & mappen
- De hoofdmap heet exact `VoornaamA_Stadsgids` (met jouw eigen voornaam en eerste letter van je achternaam).
- Alle bestandsnamen zijn geschreven in kleine letters, zonder spaties of vreemde tekens.
- In de hoofdmap staan `index.html`, `stad_1.html`, `stad_2.html`, `stad_3.html` en `style.css`.
- Alle afbeeldingen staan verzameld in de submap `images/` en eventuele lettertypes in `fonts/`.

#### Wireframing & voorbereiding
- In het voorbereidingsdocument zijn drie inspirerende reiswebsites onderzocht op navigatie, card-opbouw en typografie.
- In Figma is een doordacht desktop wireframe (1440 px) uitgewerkt voor zowel de landingspagina als het sjabloon van de stadspagina's.
- De visuele zones (header, introductie, grids, artikelblok, footer) sluiten naadloos aan op de uiteindelijke HTML-code.

#### HTML: structuur & semantiek
- Alle pagina's bevatten een geldige documentstructuur (`<!DOCTYPE html>`, `<html lang="nl">`, `<head>`, `<body>`).
- Het `<title>`-element is op elke pagina uniek en inhoudelijk aangepast aan de getoonde stad.
- De `<header>` bevat een werkend navigatiemenu met relatieve links die correct tussen alle vier pagina's schakelen.
- De inhoud is semantisch verdeeld met `<main>`, `<section>`, `<article>` en `<footer>`, waarbij de belangrijkste secties een herkenbaar `id`-kenmerk dragen (`#inleiding`, `#steden`, `#nieuws`, `#stadsoverzicht`, `#bezienswaardigheden`, `#artikel`).
- Alle afbeeldingen (`<img>`) bevatten een werkend relatief pad en een betekenisvolle `alt`-tekst.

#### CSS: vormgeving, Flexbox & Grid
- Alle vier HTML-pagina's linken foutloos naar hetzelfde centrale bestand `style.css`.
- Er is een doordachte typografie ingesteld via een extern webfont of lokaal lettertype.
- Flexbox is doelgericht toegepast voor de navigatiebalk, logo-uitlijning en footer.
- CSS Grid is correct toegepast voor de card-overzichten (`.grid-container`) en side-by-side presentaties (`#stadsoverzicht` en `#artikel`).
- De cards voor steden en bezienswaardigheden hebben een consistente opbouw met afbeeldingen, titels, knoppen en informatieve badges.

#### Kwaliteit & verzorging
- De code is netjes ingesprongen (indented) zonder achtergebleven testcode of syntaxfouten.
- De website oogt evenwichtig, overzichtelijk en ademt de sfeer van een professionele stadsgids.
