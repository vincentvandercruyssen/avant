## Les 1 09/10/2026 (Web)

### Receptenboek: Toets HTML 02, feedback Profiel, onderzoek & schetsen

### Lesverloop & inhoud
1. **Toets HTML 02:**
   * Evaluatie over HTML-documentstructuur, semantiek, nesting en attributen.
2. **Bespreking Profiel & klassikale feedback:**
   * Terugkoppeling over het ingeleverde project Profiel.
   * Aandachtspunten bespreken rond relatieve bestandspaden, code-inspringing, nesting en externe CSS-koppeling.
3. **Introductie Receptenboek & inspiratieonderzoek:**
   * Briefing van de herhalingsopdracht Receptenboek (multipage website bestaande uit vier pagina's).
   * Culinair vooronderzoek: drie zelfgekozen websites analyseren aan de hand van de vijf kernvragen (navigatiestructuur, kaartopbouw, receptdetailweergave, typografie/kleur en call-to-actions).
4. **Themakeuze, content & beeldassets:**
   * Culinair thema bepalen en drie recepten selecteren.
   * Teksten, ingrediënten en bereidingsstappen verzamelen in een voorbereidingsdocument.
   * Rechtenvrije sfeerbeelden verzamelen in de submap `images/` binnen de OneDrive-projectmap `VoornaamA_Receptenboek`.
5. **Wireframes uitschetsen op papier:**
   * Analoge lay-outschetsen maken voor de landingspagina (`index.html`) en het sjabloon van de receptpagina's (`recept_1.html` t.e.m. `recept_3.html`).
   * Annoteren van alle benodigde semantische HTML-elementen (`<header>`, `<nav>`, `<h1>`, `<section>`, `<article>`, `<ul>`, `<ol>`, `<img>`, `<footer>`).

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) analyseren en toepassen.
* **CRS02:** De juiste semantische HTML-elementen doelgericht selecteren in functie van inhoud en lay-out.
* **CRS20:** Teksten, links en beeldassets ordelijk bundelen, categoriseren en voorbereiden in een webomgeving.
* **GEC02:** Kwaliteitsbewust en nauwkeurig werken met oog voor gemaakte afspraken en bestandsstructuren.

## Les 2 16/10/2026 (Web)

### Receptenboek: Projectopzet, semantische HTML landingspagina & receptpagina's

### Lesverloop & inhoud
1. **Mappenstructuur & bestandsbeheer:**
   * Mappenstructuur `VoornaamA_Receptenboek/` met submap `images/` inrichten in OneDrive.
   * Aanmaken van de vier HTML-bestanden (`index.html`, `recept_1.html`, `recept_2.html`, `recept_3.html`) en het stijlblad `style.css` in Visual Studio Code.
2. **HTML-basisstructuur & navigatiemenu:**
   * Emmet-shortcuts toepassen voor HTML5-basisstructuur en unieke `<title>`-tags per pagina instellen.
   * Uniforme `<header>` opbouwen met relatieve hyperlinks tussen alle pagina's.
3. **Landingspagina uitwerken (`index.html`):**
   * Semantische indeling met `<main>`, `<section id="hero">` en `<section id="recepten">`.
   * Receptkaarten opzetten via `<article class="card">` met foto, badges, titel en doorkliklink.
4. **Receptdetailpagina's opzetten:**
   * Detailpagina's structureren via `#inleiding` (titel, meta-badges, introtekst), `#ingredienten-sectie` (`<ul>`), `#instructies` (`<ol>`) en bronvermelding.
   * Uniforme `<footer>` met copyright en colofon integreren op alle vier pagina's.

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) toepassen.
* **CRS02:** De juiste semantische HTML-elementen doelgericht selecteren in functie van inhoud en lay-out.
* **CRS06:** Vlot en efficiënt werken met een professionele code-editor (Visual Studio Code).
* **CRS18:** Een semantisch correcte, functionele en gestijlde multipage website (Receptenboek) met coherente navigatie realiseren.
* **CRS20:** Teksten, links en beeldassets correct integreren in een webomgeving.
* **GEC02:** Kwaliteitsbewust en nauwkeurig werken met oog voor correcte code-inspringing, nesting en syntaxregels.

## Les 3 23/10/2026 (Web)

### Receptenboek: CSS-styling met Flexbox & Grid, kwaliteitscontrole en oplevering

### Lesverloop & inhoud
1. **Typografie & basisopmaak:**
   * Google Font koppelen en centrale CSS-stijlen instellen voor `body`, koppen en een gecentreerde container van maximaal 1200 px.
2. **Lay-outsystemen met Flexbox & CSS Grid:**
   * Flexbox toepassen voor de navigatiebalk (`<header>`) en de metadata-badges (`.meta-badges`).
   * CSS Grid toepassen voor het card-overzicht op de homepage (`.card-grid`) en de side-by-side indeling van ingrediënten en beelden (`#ingredienten-sectie`).
3. **Verfijning & extra uitdagingen:**
   * Hover-transities op receptkaarten, optioneel print-stijlblad (`@media print`) en CSS-variabelen (`:root`).
4. **Validatie & finale oplevering:**
   * Zelfevaluatie uitvoeren aan de hand van de kwaliteitscontrole-checklist (paden, nesting, layoutweergave).
   * Projectmap comprimeren tot `VoornaamA_Receptenboek.zip` en inleveren via de Smartschool Uploadzone.

### Leerplandoelen
* **CRS01:** Productievereisten en bestandsconventies voor webprojecten (mappenstructuur, kleine letters, relatieve paden) toepassen.
* **CRS02:** De juiste semantische HTML-elementen en CSS-eigenschappen doelgericht selecteren in functie van inhoud en lay-out.
* **CRS06:** Vlot en efficiënt werken met een professionele code-editor (Visual Studio Code).
* **CRS18:** Een semantisch correcte, functionele en gestijlde multipage website (Receptenboek) met coherente navigatie realiseren.
* **CRS21:** Typografische hiërarchie, card-componenten en leesbaarheid doordacht vormgeven via CSS-stijlregels.
* **CRS22:** Lay-outsystemen (Flexbox voor navigatie en Grid voor cards en side-by-side presentaties) doelgericht opzetten.
* **CRS23:** Afbeeldingsformaten, afmetingen en relatieve bestandspaden controleren op foutloze weergave in de browser.
* **CRS27:** De webbestanden (HTML, CSS, assets) volgens de afgesproken structuur en naamgeving tijdig opleveren.
* **GEC02:** Kwaliteitsbewust en nauwkeurig werken met oog voor correcte code-inspringing, nesting en syntaxregels.
