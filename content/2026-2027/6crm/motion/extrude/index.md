---
title: "Extrude"
date: 2026-09-29
schooljaar: "2026-2027"
klas: "6CRM"
vak: "motion"
auteurs:
  - "Vincent Vander Cruyssen"
periode: "September - Oktober"
thema: "Herhaling"
software:
  - "Blender 3D"
  - "Illustrator"
  - "Photoshop"
leerplandoelen:
  - code: "CRS01"
    criterium: "Productievereisten analyseren (resolutie 1920×1080 px, 16:9 verhouding, EEVEE Next still render, optioneel 30 fps video-animatie)."
  - code: "CRS02"
    criterium: "Doelgericht 3D-technieken selecteren (SVG-curve import, extrusie, beveling, shader nodes, studiobelichting, camerakadrering)."
  - code: "CRS06"
    criterium: "Vlot en zelfstandig werken met Blender 3D (viewport navigatie, curve data, shader editor, EEVEE Next realtime rendering) en Adobe Illustrator."
  - code: "CRS15"
    criterium: "Geschikt 2D vector- en beeldmateriaal (beeldmerk, grafische vormen of logo) gestructureerd voorbereiden en integreren in een 3D-scène."
  - code: "CRS16"
    criterium: "Een hoogwaardige 3D-render realiseren en optioneel een dynamische camera-animatie of logo-onthulling animeren."
  - code: "CRS22"
    criterium: "Vormgeving, afgeschuinde randen, shaders en lichtval esthetisch en harmonieus op elkaar afstemmen tot één hoogwaardig beeld."
  - code: "CRS23"
    criterium: "Bestanden controleren op correcte resolutie (1920×1080), kleurbeheer en ruisvrije renderkwaliteit."
  - code: "CRS27"
    criterium: "Het volledige Blender-project en de deliverables (still render en optionele video) tijdig en conform de mappenstructuur opleveren."
  - code: "SV06.72"
    criterium: "Het verband tussen ruimtelijke 3D-situaties en bijbehorende 2D-voorstellingen doelgericht analyseren en toepassen."
draft: false
---

## Briefing & Concept

In deze opdracht breng je een vlak beeldmerk of vectoren tot leven in een dynamische virtuele omgeving. Je maakt de overstap **van 2D naar 3D met Blender**. Je vertrekt vanuit een plat vectorbestand of een vlakke afbeelding, en bouwt dit in Blender om tot een 3D-object met fysieke diepte, afgeronde hoeken en blikvangende materialen.

![3D geëxtrudeerd CRM-beeldmerk met geometrische vormen](img/extrude-hero.jpg)

{{< pinboard url="https://www.pinterest.com/vincentvandercruyssen/extrude/" >}}

### Van plat vlak naar 3D-volume

Een vectorbestand (`.svg`) bestaat uit wiskundige ankerpunten en curven zonder dikte. In Blender geef je deze vorm massa door middel van:

* **Extrude:** Het uittrekken van de curve langs de diepte-as (Z-as), waardoor een vlak direct een massief 3D-blok wordt.
* **Bevel:** Het afronden of afschuinen van de scherpe randen (*Depth* en *Resolution*). Voorwerpen hebben zelden vlijmscherpe hoeken van 90 graden. Door een subtiele bevel toe te voegen, vangen de randen het licht en ontstaat een meer tastbare uitstraling.

### Materialen, belichting en diepte

Een 3D-scène staat of valt met het samenspel tussen materiaal en licht. In plaats van een standaard grijze vorm creëer je een esthetische look via:

* **Principled BSDF:** De universele shader in Blender. Je experimenteert met *Base Color* (afgestemd op je kleurenpalet), *Roughness* (van matte klei/krijt tot zijdezacht satijn) en optioneel *Metallic* of *Transmission* (voor geborsteld metaal of matglazen accenten).
* **Drie-punts studiobelichting:** Je plaatst een gericht hoofdlicht (*Key Light*), een zacht invullicht (*Fill Light*) en een krachtig tegenlicht (*Rim / Back Light*). Het tegenlicht is cruciaal: het laat de beveled randen van je 3D-vorm oplichten en scheidt je onderwerp helder af van de achtergrond.

![Studiobelichting en cameraopstelling in 3D](img/extrude-lighting.jpg)

### Render engines: EEVEE Next versus Cycles

In Blender kies je tussen twee verschillende render engines voor je eindbeeld:

* **EEVEE Next (Realtime):** Werkt via geavanceerde rasteringtechnieken (vergelijkbaar met moderne game engines). Het toont materialen en licht direct in de viewport en rendert still frames en video's in enkele seconden. Ideaal voor een vlotte workflow en snelle videorenders.
* **Cycles (Path tracing):** Berekent natuurgetrouw het pad van miljoenen individuele lichtstralen (*raytracing*). Dit resulteert in fysisch accurate zachte schaduwen, natuurlijke lichtweerkaatsing tussen oppervlakken (*indirect lighting / color bleeding*) en fraaie lichtbreking in transparante materialen. Cycles vraagt meer rekenkracht van de grafische kaart; activeer daarom *Denoising* (bv. OpenImageDenoise) om ruiskorrels weg te filteren.

### Camera en kadrering

Je bouwt een evenwichtige compositie op in het liggende **16:9-formaat** (1920 × 1080 px):

* **Experimenteer met lenzen:** Varieer de brandpuntsafstand (*Focal Length*) doelbewust om de vormentaal en dieptewerking te beïnvloeden:
  * **Breed (bv. 24 mm – 35 mm):** Versterkt de ruimtelijke diepte en overdrijft het perspectief met een dynamische, fotografische uitstraling.
  * **Tele (bv. 85 mm – 135 mm of hoger):** Drukt het perspectief samen (*perspectiefcompressie*), vlakt dieptelijnen af en geeft je 3D-scène een strakke, grafische en bijna isometrische look.
* Activeer *Depth of Field* met een lage *F-Stop* (bv. `f/2.8`) om een esthetische onscherpte in de achtergrond te verkrijgen en de focus strak op het centrale beeldmerk te leggen.
* Render een haarscherp stilstaand beeld (*still*) als basisafwerking van je 3D-scène.

### Extra uitdaging: Camera- of logo-animatie

Ben je klaar met modelleren, belichten en je still render? Ga dan de uitdaging aan en breng je 3D-scène tot leven met een dynamische video-animatie.

* **Camerabeweging:** Keyframe een vloeiende beweging (langzame push-in, dolly of subtiele orbit) rond je beeldmerk met constante focus.
* **Logo reveal:** Animeer het beeldmerk of de omringende grafische elementen zélf. Laat het beeldmerk 180° om zijn as flippen (als een openklappende tegel), trapsgewijs vanuit een plat vlak omhoog extruderen of via een dynamische schaalbeweging binnenvallen.

## Technische specificaties

| Instelling | Waarde | Toelichting |
| :--- | :--- | :--- |
| **Resolutie** | **1920 × 1080 px** | Liggende **16:9-beeldverhouding** (Full HD). |
| **Render Engine** | **EEVEE Next of Cycles** | EEVEE Next voor snelle realtime feedback en video's; Cycles voor fysisch accurate lichtval en zachte schaduwen. |
| **Camera & lenskeuze** | **24 mm t.e.m. 135 mm+** | Vrije keuze: van breed (fotografisch dynamisch) tot telelens (strakke, isometrische perspectiefcompressie). |
| **Exportformaat (Basis)** | **PNG of JPEG** | Haarscherpe still render in `02_exports/`. |

## Stappenplan

### Vectorvoorbereiding

Voor deze opdracht vertrek je vanuit een zuiver vectorbestand (`.svg`) van een beeldmerk, typografische vorm, logo of grafisch element:

* **Zelf ontwerpen in Illustrator:** Werk een krachtige lettercombinatie (bijvoorbeeld eigen initialen) of een geometrische stramienvorm uit. Zet tekst om naar paden via *Tekst → Letteromtrekken maken* (`Ctrl + Shift + O`) en verenig overlappende vlakken via *Venster → Pathfinder → Verenig* (*Unite*).
* **Online zoeken:** Je mag ook een bestaand vectorbestand, logo of grafisch icoon downloaden (bijvoorbeeld via betrouwbare platforms zoals [SVG Repo](https://www.svgrepo.com/) of andere openbare databanken). Let erop dat het bestand uitsluitend uit strakke vectorpaden bestaat, zonder verborgen pixelvlakken of ongewenste achtergrondkaders.
* Sla het bestand op als SVG via *Bestand → Opslaan als... → SVG (`.svg`)* als `VoornaamA_Extrude-Vector.svg` in je submap `01_assets/`.

### Importeren en extruderen in Blender

* Open Blender en start een nieuw bestand (*General*). Verwijder de standaard kubus (`X → Delete`).
* Importeer je vectorbestand via *File → Import → Scalable Vector Graphics (.svg)*.
* Schaal het geïmporteerde curve-object naar een werkbare grootte (`S`) en roteer het 90 graden rechtop langs de X-as (`R → X → 90`).
* Centreer het scharnierpunt van het object via *Object → Set Origin → Origin to Geometry*.
* Ga in het eigenschappenvenster naar het tabblad **Object Data Properties** (het groene curve-icoon):
  * Onder **Geometry → Extrude:** stel een geschikte diepte in (bijvoorbeeld `0.04 m` tot `0.08 m`).
  * Onder **Geometry → Bevel:** kies *Round*, stel de *Depth* in op een subtiele waarde (bijvoorbeeld `0.01 m`) en verhoog de *Resolution* naar `3` of `4` voor een zachte, afgeronde rand.

#### Videotutorials: SVG naar 3D in Blender

Bekijk deze twee compacte tutorials over het snel omzetten van SVG-vectorbestanden naar 3D-modellen en het instellen van afgeronde randen (*bevels*):

{{< youtube sr6M86R1RdQ >}}
{{< youtube jyp41gc-3_4 >}}

### Shading en materialen toewijzen

* Schakel de 3D Viewport om naar **Viewport Shading: Rendered** (`Z → 8`).
* Selecteer je geëxtrudeerde object en navigeer naar het tabblad **Material Properties**. Voeg een nieuw materiaal toe met de **Principled BSDF** shader.
* Stel je gewenste materiaaleigenschappen in:
  * **Base Color:** kies een karakteristieke kleur (bijvoorbeeld warm terracotta, diep indigoblauw of zacht saliegroen).
  * **Roughness:** bepaal de glansgraad. Een waarde van `0.7` tot `0.9` geeft een matte krijt- of kleilook; een waarde rond `0.2` tot `0.3` zorgt voor een satijnachtige glans.
  * **Metallic (optioneel):** verhoog naar `1.0` voor een strakke aluminium- of chroomafwerking.
* Voeg een vloervlak (*Mesh → Plane*) toe onder het object en schaal dit ruim uit (`S → 10`) om schaduwen op te vangen. Geef ook de vloer een passend, contrasterend materiaal.

### Drie-punts studiobelichting en camerakadrering

* Kies je render engine onder *Render Properties*:
  * **EEVEE Next:** Activeer *Raytracing / Screen Space Reflections*, *Ambient Occlusion* en *Shadows: Soft Shadows* voor een snelle, responsieve viewport en export.
  * **Cycles:** Schakel over naar *Cycles*, stel het apparaat in op *GPU Compute* en activeer *Denoise* onder *Render* (OpenImageDenoise) voor een fotorealistische lichtberekening.
* Bouw een klassieke studiobelichting op rond je object:
  * **Key Light (Sun of Area light):** plaats dit schuin linksboven je object op 45 graden. Stel de sterkte in zodat het object een duidelijke lichte en schaduwzijde krijgt.
  * **Fill Light (Area light):** plaats dit schuin rechts tegenover het hoofdlicht met een lagere energie (ca. 30% van het hoofdlicht) om harde schaduwen te verzachten.
  * **Rim Light (Point of Spot light):** plaats deze lamp achter en net boven het object, gericht naar de camera toe. Dit creëert een heldere glansrand over de bevels.
* Selecteer de camera en druk op `Numpad 0` voor camerazicht.
* Ga naar *Output Properties* en stel de resolutie in op **1920 px** breedte en **1080 px** hoogte (16:9 Full HD).
* Positioneer de camera netjes gecentreerd op je beeldmerk via *View → Align View → Align Active Camera to View* (`Ctrl + Alt + Numpad 0`).
* Selecteer de camera, ga naar *Camera Properties* en experimenteer met de brandpuntsafstand (*Focal Length*): kies een brede brandpuntsafstand (24–35 mm) voor een fotografisch diepte-effect of schakel over naar een telelens (85–135 mm of hoger) voor een grafisch, nagenoeg isometrisch vlak. Vink *Depth of Field* aan, selecteer je beeldmerk als *Focus Object* en verlaag het *F-Stop* getal (bv. `f/2.8`) voor een zachte onscherpe achtergrond.

### Still renderen en beeldexport

* Controleer onder *Render Properties → Color Management* of de *View Transform* ingesteld staat op **AgX** of **Filmic**.
* Render het stilstaand beeld via het topmenu *Render → Render Image* (`F12`).
* Sla het beeld op via *Image → Save As...* als PNG (`VoornaamA_Extrude-Still.png`) in de submap `02_exports/`.

### Extra uitdaging: Animatie en video-export

* Stel de tijdlijn in op een lengte van **120 frames** (4 seconden aan 30 fps) of **150 frames** (5 seconden).
* **Optie Camerabeweging:** Plaats keyframes op *Location & Rotation* (`I`) op frame 1 en frame 120 voor een langzame push-in (*Dolly-in*) of subtiele sweep rond het onderwerp.
* **Optie Logo Reveal:** Animeer de rotatie of extrusie van het beeldmerk zélf (bijvoorbeeld 180° rotatie-flip of trapsgewijze opbouw).
* Verfijn de snelheidscurves in de **Graph Editor** voor een vloeiende versnelling en vertraging (*Ease In & Out*).
* Configureer de render-output onder *Output Properties*: FFmpeg Video, MPEG-4 container, H.264 videocodec met hoge kwaliteit naar `02_exports/`.
* Start de videorender via *Render → Render Animation* (`Ctrl + F12`) en controleer `VoornaamA_Extrude-Animatie.mp4`.

## Oplevering

Lever je volledige projectmap in als één gecomprimeerd ZIP-archief via de Smartschool Uploadzone. Zorg dat alle bestanden aanwezig zijn in de mappenstructuur:

```text
VoornaamA_Extrude.zip
└─ VoornaamA_Extrude/
   ├─ 01_assets/
   │  └─ VoornaamA_Extrude-Vector.svg
   ├─ 02_exports/
   │  ├─ VoornaamA_Extrude-Still.png
   │  └─ VoornaamA_Extrude-Animatie.mp4 (bij extra uitdaging)
   └─ VoornaamA_Extrude.blend
```

### Checklist

#### Bestandsbeheer & voorbereiding
* De hoofdmap draagt de correcte naamgeving `VoornaamA_Extrude/` en is ingepakt als ZIP-bestand.
* Het oorspronkelijke vectorbestand is aanwezig als zuivere SVG in de submap `01_assets/`.
* Het Blender-projectbestand `VoornaamA_Extrude.blend` is bewaard in de hoofdmap en opent zonder foutmeldingen.

#### 3D-modellering & materialen
* Het beeldmerk of grafische element is geëxtrudeerd met een zichtbare ruimtelijke diepte.
* Alle randen zijn voorzien van een verfijnde afschuining (*Bevel*) met voldoende resolutie (geen harde facettering).
* Het materiaal is ingesteld met een Principled BSDF shader met een bewust gekozen kleur, ruwheid (*Roughness*) en afwerking.
* Het object zweeft niet ongegrond in het luchtledige, maar rust op een ondergrond of interacteert harmonieus met de ruimte.

#### Belichting & camera-instellingen
* Er is een functionele drie-puntsbelichting aanwezig (Key, Fill en Rim light).
* Het tegenlicht (*Rim light*) creëert een duidelijke contourglans langs de afgeronde randen van het 3D-volume.
* De camera is ingesteld op het liggende 16:9-formaat (1920 × 1080 px) met een weloverwogen brandpuntsafstand (van dynamisch groothoekperspectief tot grafische telelenscompressie).
* Scherptediepte (*Depth of Field*) is geactiveerd met een scherp focuspunt op het centrale onderwerp.
* De still render `VoornaamA_Extrude-Still.png` is haarscherp geëxporteerd naar `02_exports/`.

#### Extra uitdaging: Animatie & video-export (optioneel)
* De animatie heeft een duidelijke lengte van 4 tot 5 seconden (120 - 150 frames) aan 30 fps in 16:9-formaat.
* De beweging (cameratransitie of logo reveal) verloopt soepel met vloeiende *Ease In & Out* interpolatie.
* De video is gerenderd met de realtime render engine EEVEE Next naar een H.264 MP4-bestand in de submap `02_exports/` (max. 10 MB).
