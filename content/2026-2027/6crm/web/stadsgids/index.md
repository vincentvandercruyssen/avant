---
title: "Stadsgids"
date: 2026-09-23
schooljaar: "2026-2027"
klas: "6CRM"
vak: "web"
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

## Briefing & Concept

Als crossmediamaker vertaal je ideeën naar krachtige visuele en interactieve ervaringen. Eerder ontdekte je al hoe HTML de fundering legt voor inhoud en hoe CSS zorgt voor de visuele identiteit van een webpagina. 

In deze herhalingsopdracht til je die basiskennis naar een webproject van portfolio-niveau. Je ontwerpt en codeert een complete **multipage stadsgids** over drie steden naar keuze. Je doorloopt het gehele ontwerpproces: van doordacht vooronderzoek en desktop wireframing in Figma tot het coderen van semantische HTML5 en moderne CSS met Flexbox en Grid.

### Wat is een moderne online stadsgids?

Een eigentijdse stadsgids is veel meer dan een droge opsomming van monumenten. Het is een inspirerende gids waarin tips, sterke beelden en lokale aanraders samenkomen in een overzichtelijke lay-out.

Laat je inspireren door de onderstaande designconcepten:

* **Thematische indeling:** Deel je steden intuïtief in. Denk aan herkenbare categorieën zoals *Dicht bij huis* tegenover *Verder weg*, of werk rond thema's zoals cultuur, architectuur en gastronomie.
* **Artikels:** Verrijk de vaste lijst van bezienswaardigheden met een artikel, zoals *"Onze 5 favoriete koffiebars op een regenachtige zondag"* of *"De leukste vintage boetieks van de stad"*. Dit geeft je gids een authentiek magazinegevoel.
* **Concrete Call-to-Action (CTA):** Zorg dat pagina-onderdelen activeren. Denk aan gerichte actieknoppen zoals *"Download de wandelroute als PDF"*, *"Open in Google Maps"* of *"Ontdek alle bezienswaardigheden"*.
* **Typografie met karakter:** Kies bewust voor een typografisch contrast. Combineer bijvoorbeeld een karaktervolle schreefletter (*serif*) of uitgesproken displayletter voor titels met een strakke, goed leesbare schreefloze letter (*sans-serif*) voor de broodtekst.

### Inspiratiebronnen

Bekijk onderstaande platformen om inspiratie op te doen voor lay-out, typografie, beeldgebruik en tone-of-voice:

* [Citygidsen.be](https://citygidsen.be/) – Functionele card-lay-outs, gerichte downloadknoppen en duidelijke stadsselecties.
* [Time to Momo](https://www.timetomomo.com/nl/) – Sterke inhoudelijke invalshoeken, thematische routes en wijkgerichte bezienswaardigheden, opvallende vormgeving.
* [Bart's Boekje](https://www.bartsboekje.com/) – Sfeervolle fotografie gecombineerd met persoonlijke tips.
* [Visit Gent](https://visit.gent.be/nl) – Strakke gemeentelijke gids met heldere thematische blokken en een duidelijke hiërarchie.
* [I amsterdam](https://www.iamsterdam.com/) – Krachtige beeldtaal, overzichtelijke navigatie en heldere agendablokken.

### Je concept

Je bouwt een samenhangende website bestaande uit **vier HTML-pagina's**:

1. **Landingspagina (`index.html`):** De centrale startpagina die de bezoeker verwelkomt, het overkoepelende thema introduceert en doorklikopties biedt naar de drie geselecteerde steden.
2. **Drie stadspagina's (`stad_1.html`, `stad_2.html`, `stad_3.html`):** Drie afzonderlijke detailpagina's die elk één specifieke stad uitdiepen met kerngegevens en bezienswaardigheden. Voor één stad naar keuze werk je tevens een uitgelicht artikel uit.

Kies drie steden die een inhoudelijke logica vertonen. Je kunt kiezen voor drie steden binnen één land of drie steden verbonden door een specifiek thema (zoals bijvoorbeeld historische havensteden, Noord-Europese designsteden of culinaire hoofdsteden).

## Technische specificaties

| Instelling | Aanbevolen waarde | Toelichting |
| :--- | :--- | :--- |
| **Schermbreedte (viewport)** | **1440 px (Desktop)** | De totale breedte van je Figma-frame en browsersomgeving. Achtergrondvlakken kunnen 100% vullen. |
| **Inhoudsbreedte (container)** | **Max. 1200 px** | Alle leesbare inhoud (tekst, kolommen, cards) blijft netjes binnen een gecentreerde container (`max-width: 1200px; margin: 0 auto;`). |
| **Aantal pagina's** | **4 HTML-bestanden** | `index.html` (landingspagina) en 3 stadspagina's (`stad_1.html`, `stad_2.html`, `stad_3.html`). |
| **Stijlblad** | **1 centraal extern bestand** | `style.css` in de hoofdmap, uniform gekoppeld aan alle 4 pagina's. |
| **Lay-outtechnieken** | **Flexbox & CSS Grid** | Flexbox voor navigatie, badges en knoppen; CSS Grid voor card-overzichten en side-by-side blokken. |
| **Beeldmateriaal** | **JPG / WebP / PNG** | Duidelijke resolutie, geoptimaliseerd voor web en verzameld in de submap `images/`. |

> In webdesign maak je een duidelijk onderscheid tussen de **schermbreedte** en de **inhoudsbreedte**:
> * **Schermbreedte (1440 px):** De breedte van het volledige venster. Grote sfeerfoto's of gekleurde achtergrondstroken lopen vaak over de volledige 100% schermbreedte door (*full-width*).
> * **Inhoudsbreedte (max. 1200 px):** De eigenlijke content (titels, broodtekst, cards en kolommen) hou je binnen een gecentreerd raster van maximaal 1200 px. Zo voorkom je dat zinnen op brede monitors eindeloos lang en onleesbaar worden.

### Mappenstructuur

Zet vóór je start een overzichtelijke mappenstructuur op in je OneDrive onder het vak **Web**:

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

> Plaats alle HTML-bestanden en het centrale `style.css`-bestand rechtstreeks in de hoofdmap van je project. Alle afbeeldingen bewaar je ordelijk in de submap `images/`. Gebruik uitsluitend kleine letters, cijfers en koppeltekens in bestandsnamen.

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

### HTML: Semantische structuur

Zet de structuur van alle vier pagina's op in Visual Studio Code. Gebruik uitsluitend betekenisvolle HTML5-elementen.

#### Basisstructuur opzetten
Maak de vier HTML-bestanden aan in je projectmap: `index.html`, `stad_1.html`, `stad_2.html` en `stad_3.html`.

Gebruik in Visual Studio Code de Emmet-snelkoppeling: open het lege bestand, typ een uitroepteken (`!`) en druk op `Tab` of `Enter`. De editor genereert meteen de volledige HTML5-basisstructuur.

Vul elk bestand met deze geldige basisopbouw:

```html
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stadsgids - Landingspagina</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

</body>
</html>
```

> Pas het `<title>`-element in de `<head>` op elke pagina aan zodat het direct duidelijk maakt welke stad of pagina de bezoeker bekijkt (bijvoorbeeld `Stadsgids - Kopenhagen`).

#### Consistente header en navigatie
Plaats in de `<body>` van elk bestand een identieke `<header>` met een navigatiemenu. Zorg dat alle hyperlinks relatief en functioneel zijn.

Plaats de `<a>`-elementen direct binnen `<nav>` (eventueel met `<ul>`/`<li>`-lijstjes):

```html
<header>
    <a href="index.html" class="logo">Stadsgids</a>
    <nav>
        <a href="index.html">Home</a>
        <a href="stad_1.html">Kopenhagen</a>
        <a href="stad_2.html">Stockholm</a>
        <a href="stad_3.html">Oslo</a>
    </nav>
</header>
```

#### Landingspagina uitwerken
Bouw het `<main>`-element van `index.html` op met duidelijke, Nederlandstalige `id`-kenmerken per sectie:
* Een `<section id="hero">` met een hoofdtitel (`<h1>`), een introducerende paragraaf (`<p>`) en een CTA-knop (`<a class="btn-primary" href="#steden">Ontdek de steden</a>`).
* Een `<section id="steden">` met een `<h2>` en drie `<article class="card">`-elementen waarin je doorklikt naar `stad_1.html`, `stad_2.html` en `stad_3.html`.

#### Stadspagina's uitwerken
Bouw het `<main>`-element van de stadspagina's op met herkenbare, Nederlandstalige `id`-kenmerken per sectie. Zo geef je elk onderdeel een unieke identiteit en spreek je elementen in CSS gericht aan zonder een overdaad aan klassen:

##### Stadsoverzicht

```html
<section id="inleiding">
    <div>
        <h2>Over Kopenhagen</h2>
        <p>Korte beschrijving van de sfeer, geschiedenis en dynamiek van de stad...</p>
        <ul>
            <li><strong>Land:</strong> Denemarken</li>
            <li><strong>Inwoners:</strong> ca. 650.000</li>
            <li><strong>Beste reistijd:</strong> Mei tot september</li>
        </ul>
    </div>
    <img src="images/kopenhagen-haven.jpg" alt="Kleurrijke gevels aan Nyhavn in Kopenhagen">
</section>
```

##### Bezienswaardigheden

Groepeer de bezienswaardigheden in een raster. Plaats de inhoud direct binnen `<article class="card">` zonder onnodige geneste divs:

```html
<section id="bezienswaardigheden">
    <h2>Bezienswaardigheden</h2>
    <div class="card-grid">
        <article class="card">
              <img src="images/kopenhagen-designmuseum.jpg" alt="Interieur van het Designmuseum Danmark">
              <span class="badge">Cultuur</span>
              <h3>Designmuseum Danmark</h3>
              <p>Iconisch Scandinavisch design, toegepaste kunst en inspirerende mode-exposities.</p>
              <a href="#">Meer info</a>
          </article>
          <!-- Voeg minstens drie extra cards toe -->
    </div>
</section>
```

##### Artikel

Voeg voor één stad naar keuze een uitgelicht artikel toe met een lokale tip. Ook hier hou je de HTML-structuur vlak en direct:

```html
<section id="artikel">
    <article>
        <div>
            <span class="badge badge-accent">Tip</span>
            <h2>Onze 5 favoriete koffiebars op een regenachtige zondag</h2>
            <p>Van minimalistische branderijen in Vesterbro tot knusse hoekjes met versgebakken kaneelbroodjes...</p>
            <a href="#" class="btn-secondary">Lees de gids</a>
        </div>
        <img src="images/kopenhagen-koffiebar.jpg" alt="Gezellige koffiebar met warme verlichting">
    </article>
</section>
```

#### Footer toevoegen
Sluit elke pagina af met een uniforme `<footer>` met colofon en copyright:

```html
<footer>
    <p>2026 Stadsgids | Opdracht Web 6CRM | Voornaam Achternaam</p>
</footer>
```

### CSS: Vormgeving, Flexbox & Grid

Koppel alle vier HTML-pagina's aan hetzelfde bestand `style.css`. Hier realiseer je een strakke, eigentijdse en evenwichtige vormgeving.

#### Basisopmaak en typografie
Kies een Google Font en stel de basisstijlen rechtstreeks in op de gewenste elementen. Vermijd een universele reset (`* { margin: 0; padding: 0; }`), maar pas `margin` of `padding` specifiek toe waar dat nodig is:

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

body {
    margin: 0;
    background-color: #f8fafc;
    color: #1e293b;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    line-height: 1.6;
}

h1, h2, h3 {
    color: #1a365d;
    line-height: 1.25;
}
```

#### Navigatiebalk stylen met Flexbox
Gebruik Flexbox en structurele CSS-selectors om de header en navigatielinks netjes te verdelen:

```css
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 2rem;
    background-color: #ffffff;
    border-bottom: 1px solid #e2e8f0;
}

header nav {
    display: flex;
    gap: 1.5rem;
}

header nav a {
    text-decoration: none;
    color: #64748b;
    font-weight: 500;
}

header nav a:hover,
header nav a.active {
    color: #d97706;
}
```

#### Bezienswaardigheden stylen met CSS Grid
Gebruik CSS Grid om een flexibel en responsive raster te maken voor je bezienswaardigheden:

```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.card {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.25rem;
}

.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.card h3 {
    margin: 0.75rem 0 0.5rem;
    font-size: 1.25rem;
}

.card a {
    display: inline-block;
    margin-top: 0.5rem;
    color: #d97706;
    text-decoration: none;
    font-weight: 600;
}
```

#### Badges en Call-to-Action knoppen
Geef informatieve badges en knoppen een professionele uitstraling:

```css
.badge {
    display: inline-block;
    margin-top: 0.5rem;
    margin-right: 0.25rem;
    padding: 0.25rem 0.6rem;
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

.btn-primary {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #d97706;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    border-radius: 8px;
}
```

#### Side-by-side informatie met CSS Grid
Plaats stadsfeiten en afbeeldingen evenwichtig naast elkaar door de sectie via haar `id` aan te spreken:

```css
#inleiding {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: center;
    padding: 3rem 0;
}

#inleiding img {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
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
      box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
  }
  ```
* **Interactieve kaartintegratie:** Integreer onderaan je stadspagina een interactieve kaart via een responsieve Google Maps iframe embed. Zo kan de bezoeker direct bezienswaardigheden op de kaart lokaliseren:
  ```html
  <div class="map-container">
      <iframe 
          src="https://www.google.com/maps/embed?pb=..." 
          width="100%" 
          height="350" 
          style="border:0; border-radius:12px;" 
          loading="lazy">
      </iframe>
  </div>
  ```
* **CSS-variabelen voor je kleurenpalet:** Wil je jouw kleuren eenvoudig op één centrale plek beheren? Definieer herbruikbare variabelen bovenaan je CSS via de `:root`-selector:
  ```css
  :root {
      --kleur-primair: #1a365d;
      --kleur-accent: #d97706;
      --kleur-achtergrond: #f8fafc;
  }

  body {
      background-color: var(--kleur-achtergrond);
  }
  ```

## Oplevering

Comprimeer (zip) jouw volledige projectmap `VoornaamA_Stadsgids` en upload het ZIP-bestand in de Smartschool Uploadzone:

```text
VoornaamA_Stadsgids.zip
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

### Checklist

Controleer jouw werk grondig aan de hand van onderstaande kwaliteitscontrole vóór je definitief inlevert.

#### Bestanden & mappen
- De hoofdmap heet exact `VoornaamA_Stadsgids` (met jouw eigen voornaam en eerste letter van je achternaam).
- Alle bestandsnamen zijn geschreven in kleine letters, zonder spaties of vreemde tekens.
- In de hoofdmap staan `index.html`, `stad_1.html`, `stad_2.html`, `stad_3.html` en `style.css`.
- Alle afbeeldingen staan verzameld in de submap `images/`.

#### Wireframing & voorbereiding
- In het voorbereidingsdocument zijn drie inspirerende reiswebsites onderzocht op navigatie, card-opbouw en typografie.
- In Figma is een doordacht desktop wireframe (1440 px) uitgewerkt voor zowel de landingspagina als het sjabloon van de stadspagina's.
- De visuele zones (header, hero, grids, artikelblok, footer) sluiten naadloos aan op de uiteindelijke HTML-code.

#### HTML: Structuur & semantiek
- Alle pagina's bevatten een geldige documentstructuur (`<!DOCTYPE html>`, `<html lang="nl">`, `<head>`, `<body>`).
- Het `<title>`-element is op elke pagina uniek en inhoudelijk aangepast.
- De `<header>` bevat een werkend navigatiemenu met relatieve links die correct tussen alle vier pagina's schakelen.
- De inhoud is semantisch verdeeld met `<main>`, `<section>`, `<article>` en `<footer>`, waarbij de belangrijkste secties een herkenbaar `id`-kenmerk dragen (`#inleiding`, `#bezienswaardigheden`, `#artikel`).
- Alle afbeeldingen (`<img>`) bevatten een werkend relatief pad en een betekenisvolle `alt`-tekst.

#### CSS: Vormgeving, Flexbox & Grid
- Alle vier HTML-pagina's linken foutloos naar hetzelfde centrale bestand `style.css`.
- Er is een doordacht typografisch contrast gerealiseerd via een Google Fonts combinatie.
- Flexbox is doelgericht toegepast voor de navigatiebalk, badge-rijen en knoppengroepen.
- CSS Grid is correct toegepast voor de card-overzichten en side-by-side presentaties.
- De cards voor bezienswaardigheden hebben een consistente opbouw met badges, titels en beeldmateriaal.

#### Kwaliteit & verzorging
- De code is netjes ingesprongen (indented) zonder achtergebleven testcode of syntaxfouten.
- De website oogt evenwichtig, overzichtelijk en ademt de sfeer van een professionele stadsgids.
