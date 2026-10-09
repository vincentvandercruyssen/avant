---
title: "Receptenboek"
date: 2026-10-09
schooljaar: "2026-2027"
klas: "5CRM"
vak: "web-story"
aliases:
  - "/2026-2027/5crm/web/receptenboek/"
auteurs:
  - "Vincent Vander Cruyssen"
periode: "Oktober"
thema: "Introductie"
software:
  - "Visual Studio Code"
  - "HTML5"
  - "CSS3 (Flexbox & Grid)"
  - "Schetsmateriaal / Papier"
leerplandoelen:
  - code: "CRS01"
    criterium: "Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen."
  - code: "CRS02"
    criterium: "De juiste semantische HTML-elementen en CSS-eigenschappen doelgericht selecteren in functie van inhoud en lay-out."
  - code: "CRS06"
    criterium: "Vlot en efficiënt werken met een professionele code-editor (Visual Studio Code)."
  - code: "CRS18"
    criterium: "Een semantisch correcte, functionele en gestijlde multipage website (Receptenboek) met coherente navigatie realiseren."
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

In deze herhalingsopdracht bouw je een **multipage receptenboek** over een culinair thema naar keuze. Een inspirerend kookplatform is meer dan een opsomming van ingrediënten. Je gebruikt smaakvolle fotografie, een herkenbare visuele sfeer en wervende introteksten om je bezoeker mee te nemen en goesting te geven om de keuken in te duiken.

Je tilt je basiskennis van HTML en CSS naar een hoger niveau door een samenhangende website van vier pagina's te ontwerpen en te ontwikkelen: één centrale startpagina (`index.html`) en drie gedetailleerde receptpagina's (`recept_1.html`, `recept_2.html`, `recept_3.html`), vormgegeven via één centraal stijlblad (`style.css`).

### Inspiratiebronnen

Bekijk onderstaande culinaire websites om te zien hoe platformen recepten, beelden en navigatie presenteren:

* [Dagelijkse Kost](https://dagelijksekost.vrt.be/)
* [Allerhande](https://www.ah.be/allerhande)
* [Njam!](https://njam.tv/)
* [Delicious Magazine](https://deliciousmagazine.nl/)

### Je concept

Je bouwt een website bestaande uit **vier HTML-pagina's**:

1. **Landingspagina (`index.html`):** De homepage introduceert jouw culinaire thema en bevat doorklikkaarten naar de drie recepten.
2. **Drie receptpagina's (`recept_1.html`, `recept_2.html`, `recept_3.html`):** Drie detailpagina's die elk één specifiek gerecht uitwerken met een sfeerfoto, gegevens (bereidingstijd, aantal personen), een ingrediëntenlijst en genummerde bereidingsstappen.

Kies een duidelijk overkoepelend thema voor jouw receptenboek. Denk bijvoorbeeld aan: *Snelle doordeweekse pasta's*, *Zoete weekendbaksels*, *Vegetarische comfort food*, *Aziatische street food* of *Gezonde ontbijtgerechten*.

## Technische specificaties

| Instelling | Aanbevolen | Toelichting |
| :--- | :--- | :--- |
| **Aantal pagina's** | **4 HTML-bestanden** | `index.html` (homepage) en 3 receptpagina's (`recept_1.html`, `recept_2.html`, `recept_3.html`). |
| **Stijlblad** | **1 centraal extern bestand** | `style.css` in de hoofdmap, uniform gekoppeld aan alle 4 pagina's. |
| **Lay-out technieken** | **Flexbox & CSS Grid** | Flexbox voor navigatie en badges; CSS Grid voor het card-overzicht en side-by-side presentaties. |
| **Beeldmateriaal** | **JPG / WebP / PNG** | Scherp, webresolutie en ordelijk bewaard in de map `images/`. |

### Mappenstructuur

Plaats alle bestanden in je OneDrive onder het vak **Web** in een overzichtelijke structuur:

```text
VoornaamA_Receptenboek/
└─ images/
   └─ hero-landingspagina.jpg
   └─ recept1-gerecht.jpg
   └─ recept2-gerecht.jpg
   └─ recept3-gerecht.jpg
   └─ ...
└─ index.html
└─ recept_1.html
└─ recept_2.html
└─ recept_3.html
└─ style.css
```

## Stappenplan

### Onderzoek & inhoud

Verzamel alle benodigde inhoud vóór je begint met coderen.

#### Inspiratie onderzoeken

Naast de vermelde voorbeelden ga je zelf op zoek naar **drie andere culinaire websites** (zoals foodblogs, online kookmagazines of receptenplatformen). Beantwoord in je voorbereidingsdocument voor **elke website** telkens deze vijf vragen:

* Hoe zit de navigatiestructuur en de header in elkaar?
* Hoe zijn de receptkaarten (*) opgebouwd (beeldverhouding, titel, labels voor bereidingstijd of moeilijkheidsgraad)?
* Hoe zijn de ingrediënten en bereidingsstappen visueel geordend op een receptdetailpagina?
* Welke lettertypes en kleuren ondersteunen de sfeer van de website?
* Welke call-to-action knoppen of links zetten de bezoeker aan om door te klikken?

> **Wat is een kaartcomponent (card)?**  
> In UI- en webdesign is een **kaart** (*card*) een zelfstandig, afgebakend onderdeeltje dat alle gerelateerde informatie en acties over één specifiek onderwerp bundelt. Een sfeerbeeld, een duidelijke titel, informatieve labels of badges, een korte beschrijving en een actieknop vormen samen één geheel. Doordat kaarten in een consistent raster worden herhaald, kan een bezoeker vlot door de inhoud scannen. Zie ook: [The Component Gallery](https://component.gallery/components/)

#### Thema & recepten kiezen

Kies jouw centrale thema en selecteer drie recepten die hier inhoudelijk bij aansluiten.

#### Teksten & gegevens verzamelen

Noteer per recept de benodigde gegevens in je voorbereidingsdocument:
* **Landingspagina:** Een wervende hoofdtitel, een korte introductieparagraaf over jouw thema en een korte teaserzin per recept.
* **Per receptpagina:**
  * Titel van het gerecht en een korte inleiding.
  * Metadata: bereidingstijd (bv. 25 min) en porties (bv. 2 personen).
  * Ingrediëntenlijst met exacte hoeveelheden.
  * Genummerde bereidingswijze in duidelijke stappen.
  * Bronvermelding met de websitenaam en link.

#### Beeldmateriaal verzamelen

Zoek aantrekkelijke, rechtenvrije foodfoto's via platforms zoals [Unsplash](https://unsplash.com/) of [Pexels](https://www.pexels.com/), of bewaar kwalitatieve afbeeldingen van de bronwebsite. Bewaar minstens 4 foto's (één sfeerbeeld voor de homepage en één foto per recept). Hernoem de bestanden direct met kleine letters (bijvoorbeeld `recept1-tagliatelle.jpg`) en plaats ze in de map `images/`.

#### Indienen

Dien je voorbereidingsdocument in via de voorziene Smartschool-uploadmap als `.pdf` of `.odt` (`VoornaamA_Receptenboek-Onderzoek.pdf`).

### Wireframing & schetsen

Schets je pagina-indeling gewoon uit op papier of een tablet. Zo bepaal je vooraf de plaats van elk onderdeel en voorkom je verrassingen tijdens het coderen.

#### Landingspagina uitschetsen

Schets de indeling van `index.html`:
* **Header:** Logo of websitetitel links, horizontale navigatielinks naar de recepten rechts.
* **Hero-sectie:** Grote titel, introductie, sfeerbeeld en een opvallende actieknop (`Bekijk de recepten`).
* **Receptenoverzicht:** Een raster met drie kaarten (foto, titel, bereidingstijd en doorkliklink).
* **Footer:** Colofon en copyright.

#### Receptpagina-sjabloon uitschetsen

Ontwerp één vast sjabloon dat je gebruikt voor alle drie de detailpagina's (`recept_1.html`, `recept_2.html`, `recept_3.html`):
* **Header:** Identiek aan de homepage met een actieve status voor de geopende pagina.
* **Titel & metadata:** Naam van het gerecht met badges voor bereidingstijd, personen en korte toelichting.
* **Ingrediënten & foto:** Een side-by-side blok met links de ingrediëntenlijst en rechts de foto van het gerecht.
* **Bereidingswijze:** Genummerde stappen met onderaan de bronvermelding.
* **Footer:** Identiek aan de homepage.

> **Tip:** Noteer bij elk geschetst element meteen de HTML-tag die je zal gebruiken (zoals `<header>`, `<nav>`, `<h1>`, `<article>`, `<ul>`, `<ol>`, `<img>`, `<footer>`).

#### Indienen

Maak een duidelijke foto of scan van je schetsen en dien deze in via de Smartschool-uploadmap (`VoornaamA_Receptenboek-Schetsen.pdf` of `.png`).

### HTML: Semantische structuur

Zet de bestanden op in Visual Studio Code met uitsluitend betekenisvolle HTML5-elementen.

#### Basisstructuur opzetten

Maak de vier HTML-bestanden aan in je projectmap: `index.html`, `recept_1.html`, `recept_2.html` en `recept_3.html`.

Gebruik in VS Code de Emmet-snelkoppeling: typ `!` in een leeg bestand en druk op `Tab` of `Enter`. Vul de basisstructuur aan met de juiste taal (`nl`), een unieke paginatitel en de link naar het stijlblad:

```html
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receptenboek - Home</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

</body>
</html>
```

#### Consistente header en navigatie

Plaats in de `<body>` van elk bestand een identieke `<header>` met een navigatiemenu. Zorg dat alle links relatief en foutloos werkend zijn:

```html
<header>
    <a href="index.html" class="logo">Receptenboek</a>
    <nav>
        <a href="index.html">Home</a>
        <a href="recept_1.html">Citroenpasta</a>
        <a href="recept_2.html">Gegrilde groenten</a>
        <a href="recept_3.html">Bessenclafoutis</a>
    </nav>
</header>
```

#### Landingspagina uitwerken

Bouw het `<main>`-element van `index.html` op met herkenbare `id`-kenmerken:

```html
<main>
    <section id="hero">
        <h1>Smaakvolle doordeweekse gerechten</h1>
        <p>Ontdek drie snelle en gezonde gerechten die je binnen het halfuur op tafel tovert.</p>
        <a href="#recepten" class="btn-primary">Ontdek de recepten</a>
    </section>

    <section id="recepten">
        <h2>Onze favoriete recepten</h2>
        <div class="card-grid">
            <article class="card">
                <img src="images/recept1-citroenpasta.jpg" alt="Romige citroenpasta met spinazie">
                <span class="badge">⏱ 25 min</span>
                <h3>Citroenpasta met spinazie</h3>
                <p>Een frisse en romige pasta die in een handomdraai klaar is.</p>
                <a href="recept_1.html">Bekijk recept</a>
            </article>
            <!-- Voeg hier kaarten toe voor recept 2 en recept 3 -->
        </div>
    </section>
</main>
```

#### Receptpagina's uitwerken

Bouw de detailpagina's logisch op in afzonderlijke secties:

##### Inleiding & metadata

```html
<section id="inleiding">
    <h1>Citroenpasta met verse spinazie</h1>
    <div class="meta-badges">
        <span class="badge">⏱ 25 min</span>
        <span class="badge">🍽 2 personen</span>
        <span class="badge">🌱 Vegetarisch</span>
    </div>
    <p>Deze romige citroenpasta combineert frisse zuren met zachte roomkaas en verse bladspinazie. Ideaal na een drukke schooldag.</p>
</section>
```

##### Ingrediënten & foto

Gebruik voor ingrediënten altijd een ongeordende lijst (`<ul>`) en voorzie de foto van een beschrijvende `alt`-tekst:

```html
<section id="ingredienten-sectie">
    <div class="ingredienten-lijst">
        <h2>Ingrediënten</h2>
        <ul>
            <li>250 g tagliatelle of fettuccine</li>
            <li>1 biologische citroen (rasp en sap)</li>
            <li>150 g verse bladspinazie</li>
            <li>2 teentjes knoflook, fijngesneden</li>
            <li>150 g kruidenroomkaas</li>
            <li>40 g geraspte Parmezaanse kaas</li>
            <li>Peper en zout naar smaak</li>
        </ul>
    </div>
    <img src="images/recept1-citroenpasta.jpg" alt="Bord romige citroenpasta gegarneerd met Parmezaan">
</section>
```

##### Bereidingswijze & bron

Gebruik voor de bereidingsstappen altijd een geordende lijst (`<ol>`) zodat de stappen automatisch genummerd worden:

```html
<section id="instructies">
    <h2>Bereidingswijze</h2>
    <ol>
        <li>Breng een ruime pot gezouten water aan de kook en kook de pasta beetgaar volgens de verpakking.</li>
        <li>Verhit een scheutje olijfolie in een ruime pan en fruit de knoflook kort aan op laag vuur.</li>
        <li>Voeg de roomkaas, het citroensap en de helft van de citroenrasp toe. Roer op zacht vuur tot een gladde saus.</li>
        <li>Voeg de gewassen spinazie toe en laat in enkele minuten al roerend slinken in de saus.</li>
        <li>Giet de pasta af, meng direct onder de saus en werk af met geraspte Parmezaan en zwarte peper.</li>
    </ol>
    <p class="bronvermelding">Bron: <a href="https://dagelijksekost.vrt.be" target="_blank" rel="noopener noreferrer">dagelijksekost.vrt.be</a></p>
</section>
```

#### Footer toevoegen

Sluit elke pagina af met een uniforme `<footer>`:

```html
<footer>
    <p>2026 Receptenboek | Opdracht Web 5CRM | Voornaam Achternaam</p>
</footer>
```

### CSS: Vormgeving, Flexbox & Grid

Koppel alle vier HTML-bestanden aan hetzelfde bestand `style.css`. Hier verzorg je de visuele identiteit, typografie en lay-out.

#### Basisopmaak en typografie

Kies een geschikt lettertype via Google Fonts en stel de basisstijlen in:

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

body {
    margin: 0;
    background-color: #f8fafc;
    color: #1e293b;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    line-height: 1.6;
}

main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

h1, h2, h3 {
    color: #0f172a;
    line-height: 1.25;
}
```

#### Navigatiebalk stylen met Flexbox

Verdeel het logo en de navigatielinks met Flexbox:

```css
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 2rem;
    background-color: #ffffff;
    border-bottom: 1px solid #e2e8f0;
}

header .logo {
    font-weight: 700;
    font-size: 1.25rem;
    color: #0f172a;
    text-decoration: none;
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
    color: #e11d48;
}
```

#### Receptenkaarten stylen met CSS Grid

Gebruik CSS Grid voor een responsive overzicht van receptenkaarten op de landingspagina:

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
    margin-top: 0.75rem;
    color: #e11d48;
    text-decoration: none;
    font-weight: 600;
}
```

#### Badges en actieknoppen

Maak compacte labels voor metadata en knoppen:

```css
.meta-badges {
    display: flex;
    gap: 0.5rem;
    margin: 0.75rem 0 1.25rem;
}

.badge {
    display: inline-block;
    padding: 0.25rem 0.65rem;
    background-color: #f1f5f9;
    color: #475569;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 999px;
}

.btn-primary {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #e11d48;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    border-radius: 8px;
}
```

#### Ingrediënten en foto side-by-side met CSS Grid

Plaats de ingrediëntenlijst en het sfeerbeeld harmonieus naast elkaar:

```css
#ingredienten-sectie {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: center;
    margin: 2rem 0;
}

#ingredienten-sectie img {
    width: 100%;
    height: 320px;
    border-radius: 12px;
    object-fit: cover;
}

#ingredienten-sectie ul,
#instructies ol {
    padding-left: 1.5rem;
}

#instructies ol li {
    margin-bottom: 0.75rem;
}
```

#### Footer vormgeven

```css
footer {
    text-align: center;
    padding: 2rem 1.5rem;
    background-color: #ffffff;
    border-top: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 0.9rem;
}
```

### Extra uitdagingen

Ben je vlot klaar met de basis? Maak je project extra verfijnd met deze optionele toevoegingen:

* **Micro-interacties op receptkaarten:** Voeg een subtiele lift en zachte schaduw toe bij een muisbeweging:
  ```css
  .card {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
  }
  ```
* **Print-stijlblad voor de keuken:** Verberg navigatiebalken en knoppen wanneer iemand het recept afdrukt:
  ```css
  @media print {
      header, footer, .btn-primary {
          display: none;
      }
      body {
          background-color: #ffffff;
          color: #000000;
      }
  }
  ```
* **CSS-variabelen voor themakleuren:** Beheer je kleurenpalet centraal bovenaan je CSS via `:root`:
  ```css
  :root {
      --kleur-primair: #0f172a;
      --kleur-accent: #e11d48;
      --kleur-achtergrond: #f8fafc;
  }
  ```

## Oplevering

Comprimeer (zip) jouw volledige projectmap `VoornaamA_Receptenboek` en lever het ZIP-bestand in via de Smartschool Uploadzone:

```text
VoornaamA_Receptenboek.zip
└─ images/
   └─ hero-landingspagina.jpg
   └─ recept1-gerecht.jpg
   └─ recept2-gerecht.jpg
   └─ recept3-gerecht.jpg
   └─ ...
└─ index.html
└─ recept_1.html
└─ recept_2.html
└─ recept_3.html
└─ style.css
```

### Checklist

Controleer jouw project grondig aan de hand van deze controlelijst voor je definitief indient.

#### Bestanden & mappen
- De hoofdmap heet exact `VoornaamA_Receptenboek` (jouw eigen voornaam en eerste letter van je achternaam).
- Alle bestandsnamen zijn geschreven in kleine letters, zonder spaties of speciale tekens.
- In de hoofdmap staan `index.html`, `recept_1.html`, `recept_2.html`, `recept_3.html` en `style.css`.
- Alle afbeeldingen staan verzameld in de submap `images/`.

#### Voorbereiding & schetsen
- In het voorbereidingsdocument zijn drie zelfgekozen websites onderzocht aan de hand van de vijf vragen en zijn alle receptteksten gebundeld.
- De pagina-indelingen zijn duidelijk uitgeschetst op papier met vermelding van de bijhorende HTML-tags.

#### HTML: Structuur & semantiek
- Alle pagina's bevatten een geldige documentstructuur (`<!DOCTYPE html>`, `<html lang="nl">`, `<head>`, `<body>`).
- Het `<title>`-element is op elke pagina uniek aangepast.
- De `<header>` bevat een werkend navigatiemenu met relatieve links tussen alle vier pagina's.
- De inhoud is semantisch verdeeld met `<main>`, `<section>`, `<article>`, `<ul>` (ingrediënten), `<ol>` (bereidingsstappen) en `<footer>`.
- Alle afbeeldingen (`<img>`) bevatten een werkend relatief pad en een betekenisvol `alt`-kenmerk.

#### CSS: Vormgeving, Flexbox & Grid
- Alle vier HTML-pagina's linken foutloos naar hetzelfde centrale bestand `style.css`.
- Er is een passend lettertype gekozen via Google Fonts.
- Flexbox is toegepast voor de navigatiebalk en de metadata-badges.
- CSS Grid is toegepast voor het overzichtsraster op de homepage en de side-by-side indeling op de receptpagina's.
- De inhoud blijft netjes gecentreerd binnen een maximale breedte van 1200 px.

#### Kwaliteit & verzorging
- De code is overzichtelijk ingesprongen en vrij van syntaxfouten.
- De website oogt evenwichtig en straalt de sfeer uit van een samenhangend receptenboek.
