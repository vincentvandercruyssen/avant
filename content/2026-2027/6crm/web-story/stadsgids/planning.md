## Les 1 23/09/2026 (Web, 10:10 - 12:40)

### Stadsgids: Toets HTML 02, feedback Paspoort en onderzoek Stadsgids

### Lesverloop & inhoud
1. **Toets HTML 02:**
   * Tweede evaluatie over HTML-documentstructuur, semantiek, nesting en attributen.
2. **Bespreking Paspoort & klassikale feedback:**
   * Terugkoppeling over het ingeleverde project Paspoort.
   * Aandachtspunten bespreken (code, relatieve bestandspaden, enzomeer).
3. **Introductie Stadsgids & inspiratieonderzoek:**
   * Briefing van de herhalingsopdracht Stadsgids (multipage website bestaande uit vier pagina's).
   * Drie inspirerende reiswebsites onderzoeken op navigatie, card-opbouw, typografie en call-to-actions.
4. **Stedenkeuze & inhoudelijke voorbereiding:**
   * Drie samenhangende steden en overkoepelend thema bepalen.
   * Teksten en inhoud voorbereiden in een document (titels, introducties, bezienswaardigheden met badges en één online gevonden of bewerkt artikel).
   * Rechtenvrije beelden verzamelen in de submap `images/` binnen de OneDrive-projectmap `VoornaamA_Stadsgids`.

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen.
* **CRS02:** De juiste semantische HTML-elementen doelgericht selecteren in functie van inhoud en lay-out.
* **CRS20:** Teksten, links en beeldassets ordelijk bundelen, categoriseren en voorbereiden in een webomgeving.
* **GEC02:** Kwaliteitsbewust en nauwkeurig werken met oog voor gemaakte afspraken en bestandsstructuren.

## Les 2 30/09/2026 (Web, 10:10 - 12:40)

### Stadsgids: Voorbereiding, desktop wireframe in Figma

### Lesverloop & inhoud
1. **Onderzoek & inhoudelijke voorbereiding:**
   * Inspiratieonderzoek naar drie reiswebsites (navigatie, card-opbouw, typografie en call-to-actions).
   * Inhoudelijk document uitwerken met teksten voor landingspagina en drie stadspagina's (titels, introducties, bezienswaardigheden met badges en uitgelicht artikel).
   * Rechtenvrije afbeeldingen-assets in de map `VoornaamA_Stadsgids/images/` controleren op webresolutie en bestandsnamen (kleine letters, koppeltekens).
2. **Figma projectopzet & lay-outgrid:**
   * Nieuw bestand aanmaken binnen Figma op desktopformaat (1440 px breed).
   * Optioneel: 12-koloms lay-outgrid configureren (12 kolommen, margin 120 px, gutter 24 px) voor een maximale gecentreerde inhoudsbreedte van 1200 px.
3. **Wireframe landingspagina (desktop):**
   * Header met logo/titel en horizontale navigatie links en rechts uittekenen.
   * Hero-sectie opzetten met duidelijke hiërarchie: paginatitel, introductietekst, hero-beeld en primaire call-to-action knop.
   * Thematisch overzicht uitwerken met drie overzichtskaarten (stadsbeeld, titel, teaser en doorkliklink).
   * Footer voorzien met secundaire navigatie en copyrightvermelding.
4. **Wireframe stadspagina-stramien:**
   * Modulair standaardsjabloon uittekenen voor de drie detailpagina's (`stad_1.html` t.e.m. `stad_3.html`).
   * Secties opbouwen voor side-by-side stadsoverzicht (tekst en kernfeiten naast beeld), card-grid met minimaal vier bezienswaardigheden (beeld, badges, titel, beschrijving, actielink) en een uitgelicht artikelblok.

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen.
* **CRS06:** Vlot en efficiënt werken met ontwerptools (Figma) voor het opzetten van wireframes en lay-outgrids.
* **CRS20:** Teksten, links en beeldassets ordelijk bundelen, categoriseren en voorbereiden in een webomgeving.
* **GEC02:** Kwaliteitsbewust en nauwkeurig werken met oog voor gemaakte afspraken en bestandsstructuren.

## Les 3 07/10/2026 (Web, 10:10 - 12:40)

### Stadsgids: Wireframes uitwerken, projectopzet HTML/CSS

### Lesverloop & inhoud
1. **Wireframes uitwerken in Figma:**
   * Landingspagina en stadspagina-sjabloon uitwerken.
   * Controleren van hiërarchie, tip: gebruik 12-koloms grid (1200 px inhoud), consistente componenten (cards, badges, knoppen).
   * Exporteren van definitieve wireframes als PDF en indienen via Smartschool (Figma-link + export).
2. **Projectopzet in Visual Studio Code:**
   * Mappenstructuur `VoornaamA_Stadsgids/` met submap `images/` in de OneDrive vakmap Web.
   * Aanmaken van de vier HTML-bestanden (`index.html`, `stad_1.html`, `stad_2.html`, `stad_3.html`) en het centrale `style.css`.
   * Koppelen van `style.css` aan de HTML-pagina's via `<link>` in de `<head>`.
3. **HTML-structuur landingspagina:**
   * Opbouwen van de semantische basisstructuur: `<!DOCTYPE html>`, `<html lang="nl">`, `<head>` met `<title>`, `<body>`.
   * Toevoegen van een uniforme `<header>` met logo en navigatiemenu (relatieve links naar alle pagina's).
   * Uitwerken van `<main>` met secties: `#hero` (titel, intro, CTA-knop) en `#steden` (drie article-cards met doorkliklinks).
   * Afsluiten met een `<footer>` met colofon en copyright.
4. **Eerste CSS-stijling:**
   * Instellen van basis typografie (Google Font, lijndikte, kleuren) op `body`, `h1`, `h2`, `h3`.
   * Flexbox toepassen op `header` en `nav` voor een horizontale navigatiebalk.
   * Voorbereiden van een container met `max-width: 1200px; margin: 0 auto;` voor gecentreerde inhoud.
5. **Validatie en testen:**
   * Controleren van de HTML-structuur via browser inspector.
   * Testen van de relatieve links tussen de pagina's (header en cards).
   * Opslaan en synchroniseren van alle bestanden in OneDrive.

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen.
* **CRS02:** De juiste semantische HTML-elementen en CSS-eigenschappen doelgericht selecteren in functie van inhoud en lay-out.
* **CRS06:** Vlot en efficiënt werken met ontwerptools (Figma) en een professionele code-editor (Visual Studio Code).
* **CRS18:** Een semantisch correcte, functionele en gestijlde multipage website (Stadsgids) met coherente navigatie realiseren.
* **CRS21:** Typografische hiërarchie, card-componenten en leesbaarheid doordacht vormgeven via CSS-stijlregels.
* **CRS22:** Lay-outsystemen (Flexbox voor navigatie en Grid voor cards en side-by-side presentaties) doelgericht opzetten.
* **GEC02:** Kwaliteitsbewust en nauwkeurig werken met oog voor correcte code-inspringing, nesting en syntaxregels.

## Les 4 12/10/2026 (Web, 13:30 - 16:10)

### Stadsgids: Landingspagina uitwerken, CSS-styling en opzet stadspagina's

### Lesverloop & inhoud
1. **Klassikale feedback onderzoek en wireframes.**
2. **Semantische uitwerking landingspagina (`index.html`):**
   * Header met website-identiteit en globale navigatielijst (`nav > a`).
   * Hoofdinhoud (`main`) structureren met twee inhoudelijke onderdelen (`sections`): hero-sectie met introductie en overzichtssectie met drie stadscards (`article`).
   * Footer voorzien van secundaire links, socials, colofon.
3. **CSS-styling van de landingspagina (`style.css`):**
   * Typografie, kleuren.
   * Header en navigatie horizontaal uitlijnen via Flexbox met interactieve hover-statussen op navigatielinks.
   * Gecentreerde lay-outcontainer (`max-width: 1200px; margin: 0 auto;`) toepassen.
   * Hero-sectie en grid met stadscards stijlen (afbeeldingen, titels, teasers, knoppen).
   * Footer vormgeven met achtergrondkleur, centrering en typografische hiërarchie.
4. **Opzet stadspagina's op basis van `index.html`:**
   * Basissjabloon van de landingspagina dupliceren naar de detailpagina's (`stad_1.html`, `stad_2.html`, `stad_3.html`).
   * Paginatitels (`<title>`) en actieve navigatie-indicaties per detailpagina aanpassen.
   * Header en footer behouden voor visuele en structurele consistentie over de gehele website.
   * Inhoudelijke `main`-structuur voorbereiden met plaatshouders voor het stadsintroductieblok, bezienswaardigheden en uitgelicht artikel.
5. **Validatie en kwaliteitscontrole:**
   * Lokale werking en relatieve navigatie tussen de vier pagina's testen in de browser.
   * Codekwaliteit controleren op semantiek, correcte nesting, inspringing en geldige bestandspaden.

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen.
* **CRS02:** De juiste semantische HTML-elementen en CSS-eigenschappen doelgericht selecteren in functie van inhoud en lay-out.
* **CRS18:** Een semantisch correcte, functionele en gestijlde multipage website (Stadsgids) met coherente navigatie realiseren.
* **CRS21:** Typografische hiërarchie, card-componenten en leesbaarheid doordacht vormgeven via CSS-stijlregels.
* **CRS22:** Lay-outsystemen (Flexbox voor navigatie en Grid voor cards en side-by-side presentaties) doelgericht opzetten.
* **CRS23:** Afbeeldingsformaten, afmetingen en relatieve bestandspaden controleren op foutloze weergave in de browser.

## Les 5 19/10/2026 (Web, 13:30 - 16:10)

### Stadsgids: Flexbox, box-model herhaling en opzet stadspagina's

### Lesverloop & inhoud
1. **Lay-out met Flexbox:**
   * Didactisch Flexbox-spel als introductie op as-uitlijning (`justify-content`, `align-items`, `flex-direction`).
2. **Herhaling box-model en lay-outtechnieken:**
   * Doelgericht onderscheid tussen content, `padding`, `border` en `margin`.
   * Flexbox toepassen voor flexibele componenten: navigatiebalken, knoppen en contentblokken.
3. **Demonstratie landingspagina (`index.html`):**
   * Live coding van de hero-sectie en het card-grid met tussenruimtes (`gap`).
   * Koppeling tussen CSS-selectors, visuele hiërarchie en semantische elementen toelichten.
4. **Opzet en structuur van de stadspagina's:**
   * Afgeleide pagina's (`stad_1.html`, `stad_2.html`, `stad_3.html`) opzetten vanuit de afgewerkte structuur van de landingspagina.
   * Globale header en footer consistent doortrekken met correcte relatieve paden en actieve menustatus.
   * Paginaspecifieke structuur voorbereiden voor introductie, bezienswaardigheden en media.
5. **Zelfstandig werk en technische validatie:**
   * Uitwerken van de eigen navigatie en box-model styling in Visual Studio Code.
   * Tussentijdse browsercontrole op correcte uitlijning, schaling en linkwerking.

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen.
* **CRS02:** De juiste semantische HTML-elementen en CSS-eigenschappen doelgericht selecteren in functie van inhoud en lay-out.
* **CRS06:** Vlot en efficiënt werken met ontwerptools en een professionele code-editor (Visual Studio Code).
* **CRS18:** Een semantisch correcte, functionele en gestijlde multipage website (Stadsgids) met coherente navigatie realiseren.
* **CRS21:** Typografische hiërarchie, card-componenten en leesbaarheid doordacht vormgeven via CSS-stijlregels.
* **CRS22:** Lay-outsystemen (Flexbox voor navigatie en componenten, box-model spacing) doelgericht opzetten.

## Les 6 26/10/2026 (Web, 13:30 - 16:10)

### Stadsgids: Box-model, Flexbox & Grid, landingspagina en uitwerking stadspagina's

### Lesverloop & inhoud
1. **Herhaling box-model, Flexbox en Grid:**
   * Interactief voorbeeld en live demonstratie van lay-outprincipes.
   * Flexbox (ééndimensionale componentuitlijning voor bv. navigatie) versus Grid (tweedimensionale structuren bv. kolommen).
2. **Aankondiging en afspraken Toets 3:**
   * Toelichting van de leerstof HTML en CSS (semantiek, lay-outtechnieken, selectors en box-model).
3. **Afwerking en verfijning landingspagina (`index.html`):**
   * Volledige integratie van de hero-sectie, call-to-action en het card-grid met de drie steden.
   * Typografische hiërarchie, hover-effecten op navigatielinks en knoppen, en containercentrering afwerken in `style.css`.
4. **Zelfstandig uitwerken van de drie stadspagina's:**
   * Doorkopiëren van de gevalideerde sitestructuur naar `stad_1.html`, `stad_2.html` en `stad_3.html`.
   * Uitwerken van de stadsintroductie, bezienswaardighedengrid met badges en het thematische artikelblok.
5. **Kwaliteitscontrole en codevalidatie:**
   * Relatieve links tussen alle vier pagina's controleren in de browser.
   * Bestandsnamen, afbeeldingspaden valideren.

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen.
* **CRS02:** De juiste semantische HTML-elementen en CSS-eigenschappen doelgericht selecteren in functie van inhoud en lay-out.
* **CRS06:** Vlot en efficiënt werken met ontwerptools en een professionele code-editor (Visual Studio Code).
* **CRS18:** Een semantisch correcte, functionele en gestijlde multipage website (Stadsgids) met coherente navigatie realiseren.
* **CRS21:** Typografische hiërarchie, card-componenten en leesbaarheid doordacht vormgeven via CSS-stijlregels.
* **CRS22:** Lay-outsystemen (Flexbox voor navigatie en Grid voor cards en side-by-side presentaties) doelgericht opzetten.
* **CRS23:** Afbeeldingsformaten, afmetingen en relatieve bestandspaden controleren op foutloze weergave in de browser.
* **GEC02:** Kwaliteitsbewust en nauwkeurig werken met oog voor correcte code-inspringing, nesting en syntaxregels.
