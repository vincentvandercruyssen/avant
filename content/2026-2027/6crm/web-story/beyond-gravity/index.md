---
title: "Beyond Gravity"
date: 2026-11-16
schooljaar: "2026-2027"
klas: "6CRM"
vak: "web-story"
auteurs:
  - "Vincent Vander Cruyssen"
periode: "November - Januari"
thema: "Zwaartekracht"
software:
  - "Visual Studio Code"
  - "HTML5"
  - "CSS3"
  - "Browser DevTools (Mobile View)"
indieningen:
  - id: "onderzoek-wireframe"
    titel: "Beyond Gravity 1.1 Onderzoek en mobile-first wireframe"
    deadline: 2026-12-18
    lesuren: 2
    gewicht: 4
    leerplandoelen:
      - code: "13.01"
        gewicht: 1
        criterium: "Drie digitale expo's, poëziepagina's of mobiele artiestenwebsites doelgericht onderzoeken op smartphoneformaat."
      - code: "CRS01"
        gewicht: 1
        criterium: "De productievereisten (mobile-first, mapnaamgeving voornaam/, bestandsconventies) en naamgeving toepassen in VoornaamA_BeyondGravity-Onderzoek.pdf."
      - code: "CRS02"
        gewicht: 1
        criterium: "Doelgericht HTML5-media-elementen (video, audio) en CSS-positioneringstechnieken (relative/absolute, mix-blend-mode, @keyframes) plannen."
      - code: "CRS03"
        gewicht: 1
        criterium: "Vooraf een overzichtelijk mobile-first wireframe (390 px breed) uittekenen waarin hero, typoloops, audio en making-of logisch gestructureerd zijn."
      - code: "CRS24"
        gewicht: 1
        criterium: "Een heldere verticale leesflow en ademruimte tussen de overlay-typoloops en de collage-hero plannen."
      - code: "CRS25"
        gewicht: 1
        criterium: "Alle eigen expo-teksten (titel, gedicht, korte reflectie op zwaartekracht en credits) volledig en doelgroepgericht bundelen."
      - code: "CRS26"
        gewicht: 1
        criterium: "De gezamenlijke expo-identiteit (puur zwart #000000, eigen felle accentkleur en minimale expo-balk) opnemen in het ontwerpplan."
      - code: "CRS04"
        gewicht: 1
        criterium: "Het onderzoeksdocument, de wireframeschets en verzamelde webassets ordelijk beheren in de OneDrive-vakmap."
      - code: "GEC01"
        gewicht: 1
        criterium: "De tussentijdse deadline en inleverafspraken voor het onderzoek en wireframe stipt naleven."

  - id: "oplevering"
    titel: "Beyond Gravity 2.1 Digitale expopagina"
    deadline: 2027-01-22
    lesuren: 6
    gewicht: 14
    leerplandoelen:
      - code: "15.04"
        gewicht: 1
        criterium: "Een interactieve, crossmediale weboplossing bouwen die fysieke QR-codes in de bib naadloos verbindt met digitale media."
      - code: "CRS06"
        gewicht: 1
        criterium: "Vlot en zelfstandig werken met Visual Studio Code en Chrome/Firefox DevTools in mobiele weergave."
      - code: "CRS18"
        gewicht: 2
        criterium: "Een semantisch correcte, mobile-first HTML5/CSS3-webpagina realiseren waarin de collage-hero, zwevende typoloops, luistergedicht en making-of functioneel geïntegreerd zijn."
      - code: "CRS21"
        gewicht: 1
        criterium: "Het gedicht, de titel en korte toelichtingen typografisch sterk, contrastrijk en vlot leesbaar op een klein scherm vormgeven."
      - code: "CRS24"
        gewicht: 1
        criterium: "Een uitgebalanceerde mobiele lay-out (390 px tot desktop) bouwen met doordachte position: absolute coördinaten voor de opduikende typoloops."
      - code: "CRS26"
        gewicht: 1
        criterium: "De gemeenschappelijke zwarte expo-stijl, felle persoonlijke accentkleur en minimale header/footer consequent integreren."
      - code: "CRS29"
        gewicht: 1
        criterium: "Een eigenzinnige digitale expo-ervaring met subtiele CSS-zwaartekrachtbeweging of interactie opleveren voor Bib Couwelaar."
      - code: "CRS20"
        gewicht: 1
        criterium: "Alle media uit Motion en Beeld (collage-video, typoloops, luistergedicht MP3 en making-of video) ordelijk samenbrengen in de map assets/."
      - code: "CRS27"
        gewicht: 1
        criterium: "De volledig zelfstandige webmap voornaam/ binnen VoornaamA_BeyondGravity.zip foutloos en klaar voor publicatie op GitHub Pages opleveren."
      - code: "CRS23"
        gewicht: 1
        criterium: "De website testen op foutloze werking op smartphoneformaat (autoplay muted loop playsinline, werkende audio/video, snelle laadtijd en geldige relatieve paden)."
      - code: "GEC02"
        gewicht: 1
        criterium: "Kwaliteitsbewust handelen door nette code-indentatie, vlotte leesbaarheid, geen horizontale scrollbars op mobiel en vlekkeloze blend-effecten."
      - code: "CRS04"
        gewicht: 1
        criterium: "De projectmap en geoptimaliseerde webassets overzichtelijk beheren in de OneDrive-vakmap."
      - code: "CRS05"
        gewicht: 1
        criterium: "Correcte credits en eventuele bronvermeldingen opnemen voor de samenwerking binnen 5BK en 6CRM."
      - code: "GEC01"
        gewicht: 1
        criterium: "De finale deadline en alle inleverafspraken voor de expo-lancering stipt naleven."
draft: false
---

## Briefing & concept

In **Bib Couwelaar** hangen tussen jouw typografische affiches en de 3D-woorden **QR-codes**. Zodra een bezoeker met de smartphone een code scant, opent jouw **digitale expopagina**, een mobiele uitbreiding waarin jouw werk uit samenkomt.

Om van de verschillende werken één herkenbare tentoonstelling te maken, vertrekken we vanuit een **gedeeld expo-stramien** met ruimte voor jouw eigen touch.

* **Mobile-first & zwart canvas**: De bezoeker bekijkt je pagina in de bib op een smartphone.
* **Collage-hero met zwevende typoloops**: Jouw collage-animatie uit Motion vormt het bewegende hoofdpodium (`position: relative;`). Daarbovenop verschijnen jouw korte typografische loopjes (`position: absolute;` + `mix-blend-mode: screen;`) op zorgvuldig gekozen plekken.
* **Luisterkamer & tekst**: Het volledige gedicht samen met jouw ingesproken luistergedicht (`<audio>`).
* **Achter de schermen**: Jouw making-of video en jouw affiches..
* **Minimale expo-header & footer**: Een sobere verwijzing naar de expo, de bib en data.

Alle pagina's worden gebundeld op één gezamenlijke **GitHub Pages**-expo. Jouw projectmap moet daarom **perfect werken met relatieve paden**.

## Onderzoek

Bestudeer vooraf hoe websites werken op een **smartphonescherm** en bereid je inhoud eerst volledig voor. Je kunt je browser-devtools gebruiken om te zien hoe websites eruitzien op een smartphonescherm. Je kan verschillende smartphoneschermformaten simuleren.

![Devtools: Mobile](img/devtools-mobiele_versie.png?w=40%)

### Mobiele analyse & inhoud

1. **Drie uiteenlopende voorbeelden op mobiel**: Zoek en bekijk drie sterk verschillende projecten op smartphoneformaat (bijvoorbeeld een digitale expo, een interactief poëzie- of storytellingproject en een mobiele artiesten- of campagnesite). Vermeld de drie links en los onderstaande vragen per voorbeeld op.
   * **Leesbaarheid & contrast**: Hoe blijft tekst goed leesbaar op bijvoorbeeld een zwarte achtergrond of boven bewegend beeld?
   * **Media zonder vertraging**: Hoe worden video en audio gepresenteerd zonder dat de pagina druk, zwaar of traag aanvoelt?
   * **Interactie & beweging**: Welke kleine beweging, animatie of scroll-interactie geeft de pagina karakter?
   * **Inhoudelijke opbouw**: Hoe wordt de bezoeker binnengeleid in het thema of verhaal (titel, korte context, volgorde van blokken)?
   * **Sfeer & betekenis**: Hoe versterken typografie, kleur en beeldkeuze samen de emotie of inhoud van het werk, en welk idee neem je daaruit mee naar jouw eigen expopagina?
2. **Inhoud bundelen**: Schrijf alle teksten voor je pagina uit:
   * Titel van het werk en jouw naam.
   * Het volledige gedicht.
   * Een korte toelichting (3–4 zinnen): wat betekent *zwaartekracht* in jouw gedicht en visueel werk?
   * De kleur en hexcode van jouw **felle accentkleur**.
3. **Eigen zwaartekracht-accent**: Kies één eigen CSS-interactie of beweging waarmee jouw pagina tot leven komt (bv. `@keyframes` die het gedicht zacht laten zweven, typoloops die na enkele seconden opduiken of vertragen, een klikbaar venster, enzoverder).

Bundel in `VoornaamA_BeyondGravity-Onderzoek.pdf` en dien in via Smartschool.

### Mobile-first wireframe

Teken in Figma of Adobe XD een smal wireframe van **390 px breed** van boven naar onder:

* **Minimale header**: Expo-label (`Beyond Gravity`) + jouw werk- of gedichttitel.
* **Hero-podium**: Staande collage-animatie met aangeduide zones waar de 2 à 3 typografische loops via `position: absolute;` verschijnen.
* **Luistergedeelte**: Audio-speler + het geschreven gedicht + korte toelichting.
* **Processectie**: De verticale making-of video en je affiches.
* **Minimale footer**: `Expo Beyond Gravity • Bib Couwelaar • 28 jan – 3 feb 2027 • 6CRM Avant`.

Bundel in `VoornaamA_BeyondGravity-Wireframe.pdf` en dien in via Smartschool.

## Opdracht

Bouw je digitale expopagina in Visual Studio Code met zuivere, mobile-first HTML5 en CSS3.

### Mappenstructuur

Omdat jouw pagina straks samen met die van je klasgenoten op één centrale site wordt gepubliceerd, volg je deze exacte structuur in **kleine letters zonder spaties**:

```text
voornaam/
└─ assets/
   └─ audio/
      └─ luistergedicht.mp3
   └─ img/
      └─ [optioneel: affiche-01.jpg, ...]
   └─ video/
      └─ collage-hero.mp4
      └─ typoloop-01.mp4
      └─ typoloop-02.mp4
      └─ makingof.mp4
└─ index.html
└─ style.css
```

Let op: test elke link strikt met **relatieve paden** (bv. `assets/video/collage-hero.mp4`), nooit met een `/` vooraan en zonder verwijzingen naar je eigen C-schijf of OneDrive!

### Semantische HTML-structuur

1. Bouw `index.html` op met `<!DOCTYPE html>`, `<html lang="nl">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">` en koppel `style.css`.
2. Richt de hero in met de collage-animatie als basis en de zwevende typoloops erbovenop. **Cruciaal voor smartphones (iOS Safari & Android)**: gebruik altijd de combinatie `autoplay muted loop playsinline` voor achtergrondvideo's, anders starten ze niet automatisch op mobiel:
   ```html
   <section class="hero">
     <video class="hero-collage" autoplay muted loop playsinline>
       <source src="assets/video/collage-hero.mp4" type="video/mp4">
     </video>

     <video class="typo-loop typo-loop--1" autoplay muted loop playsinline>
       <source src="assets/video/typoloop-01.mp4" type="video/mp4">
     </video>

     <video class="typo-loop typo-loop--2" autoplay muted loop playsinline>
       <source src="assets/video/typoloop-02.mp4" type="video/mp4">
     </video>
   </section>
   ```
3. Voeg onder de hero het luistergedeelte toe met `<audio controls src="assets/audio/luistergedicht.mp3"></audio>`, gevolgd door het uitgeschreven gedicht en je korte toelichting.
4. Sluit de `<main>` af met de **Making-of video** (`<video controls playsinline preload="metadata" src="assets/video/makingof.mp4"></video>`) en eventueel je affiches.
5. Houd de `<footer>` minimaal en rustig.

### CSS: Mobile-first, zwart canvas & opduikende loops

1. **Expo-kleurvariabelen**: Zet bovenaan in `style.css` het gedeelde zwarte canvas en jouw eigen felle accentkleur:
   ```css
   :root {
     --bg: #000000;
     --fg: #f5f5f5;
     --accent: #ff2e63; /* Vervang door jouw affichekleur */
   }

   * {
     box-sizing: border-box;
   }

   body {
     margin: 0;
     background-color: var(--bg);
     color: var(--fg);
     font-family: system-ui, sans-serif;
     line-height: 1.6;
   }
   ```
2. **Hero met `position: relative` en `position: absolute`**: Geef de hero een relatieve positie en plaats elke typoloop op een bewust gekozen coördinaat. Door `mix-blend-mode: screen;` verdwijnt de zwarte achtergrond van de typoloop volledig en versmelten je bewegende letters rechtstreeks over de collage:
   ```css
   .hero {
     position: relative;
     width: 100%;
     max-width: 480px;
     margin-inline: auto;
     overflow: hidden;
   }

   .hero-collage {
     display: block;
     width: 100%;
     height: auto;
   }

   .typo-loop {
     position: absolute;
     width: 45%;
     mix-blend-mode: screen;
     pointer-events: none;
     animation: verschijn 8s ease-in-out infinite;
   }

   .typo-loop--1 {
     top: 12%;
     left: 6%;
   }

   .typo-loop--2 {
     bottom: 14%;
     right: 6%;
     animation-delay: 2.5s;
   }
   ```
3. **Verschijnen & zwaartekracht-animatie**: Gebruik `@keyframes` zodat je typoloops rustig opduiken en weer verdwijnen (of subtiel zweven), en werk verder met één eigen CSS-beweging die past bij jouw gedicht:
   ```css
   @keyframes verschijn {
     0%, 100% {
       opacity: 0;
       transform: translateY(8px);
     }
     20%, 75% {
       opacity: 1;
       transform: translateY(0);
     }
   }
   ```
4. **Desktop-uitbreiding**: Gebruik onderaan in `style.css` een `@media (min-width: 768px)` regel zodat de pagina ook op een computerscherm of tablet mooi gecentreerd en ruim oogt (bv. `max-width: 960px` met naast elkaar geplaatste blokken voor gedicht en making-of).

### Testen op smartphoneformaat

1. Open `index.html` via **Live Server** in Visual Studio Code.
2. Open DevTools (`F12`), schakel naar **mobiele weergave (390 × 844 px)** en controleer:
   * Is er nergens een horizontale scrollbar?
   * Spelen de collage-hero en typoloops automatisch en vloeiend af zonder zichtbare grijze rand?
   * Werkt de audiospeler voor het luistergedicht en de speler voor de making-of zonder foutmeldingen in de Console?
   * Lees de bestandsgroottes na: blijft je hele `voornaam/`-map compact genoeg (liefst onder **30 MB** totaal) voor GitHub Pages en vlot laden in de bib?

## Oplevering

Lever jouw onderzoeksdossier en volledig geteste website-map samen in als één ZIP-archief via Smartschool:

```text
VoornaamA_BeyondGravity.zip
└─ VoornaamA_BeyondGravity/
   └─ 01_onderzoek/
      └─ VoornaamA_BeyondGravity-Onderzoek.pdf
   └─ voornaam/
      └─ assets/
         └─ audio/
            └─ luistergedicht.mp3
         └─ img/
         └─ video/
            └─ collage-hero.mp4
            └─ typoloop-01.mp4
            └─ typoloop-02.mp4
            └─ makingof.mp4
      └─ index.html
      └─ style.css
```

### Checklist

#### Bestandsbeheer & structuur
* Het ZIP-archief heet `VoornaamA_BeyondGravity.zip`.
* De map `voornaam/` gebruikt enkel kleine letters zonder spaties of speciale tekens en werkt volledig zelfstandig met relatieve paden.
* Het onderzoek met mobile-first wireframe zit in `01_onderzoek/`.

#### Mobile-first vormgeving & expo-lijn
* De achtergrond is puur zwart (`#000000`) met jouw gekozen felle accentkleur en een minimale expo-header en -footer.
* De collage-animatie staat centraal als hero; de typoloops zijn met `position: absolute;` en `mix-blend-mode: screen;` zonder grijze kaders bovenop gepositioneerd.
* Op een schermbreedte van 390 px valt niets buiten het kader en verschijnt er geen horizontale scrollbar.

#### Werking & mediakwaliteit
* Alle video-loops hebben `autoplay muted loop playsinline` zodat ze op smartphone vanzelf afspelen.
* Het luistergedicht (`.mp3`) en de making-of video (`.mp4`) laden en spelen foutloos af.
* De HTML5- en CSS3-code is semantisch opgebouwd, netjes ingesprongen en vrij van consolefouten.
