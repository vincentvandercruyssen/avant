## Les 1 29/09/2026 (Motion, 09:10 - 11:00)

### Extrude: 2D vector import & 3D extrusie in Blender

### Lesverloop & inhoud
1. **Briefing:**
   * Overgang van platte 2D-vectorvormen naar ruimtelijke 3D-volumes.
   * Inspiratie en vormgevingsreferenties verkennen via het Pinterest-bord *Extrude*.
   * Overlopen van de technische productievereisten (1920 × 1080 px, 16:9 Full HD, EEVEE Next of Cycles, still render als basis en optionele video-animatie als extra uitdaging).
2. **Mappenstructuur & vectorvoorbereiding:**
   * Projectmap `VoornaamA_Extrude/` aanmaken in de persoonlijke vakmap met de vereiste submappen `01_assets/` en `02_exports/`.
   * Vectorbestand selecteren via een online bron (SVG) of zelf ontwerpen in Illustrator (typografisch beeldmerk of stramienvormen met letteromtrekken en Pathfinder Unite).
   * Opslaan als SVG (`VoornaamA_Extrude-Vector.svg`) in de submap `01_assets/`.
3. **Blender opstart, videotutorials & curve extrusie:**
   * Nieuw Blender-bestand aanmaken en opslaan als `VoornaamA_Extrude.blend` in de hoofdmap.
   * Videotutorials over SVG-import en curve-extrusie bekijken en toepassen.
   * SVG importeren via *File → Import → Scalable Vector Graphics (.svg)*, rechtop roteren (90° op de X-as) en schalen naar een hanteerbare maat.
   * Scharnierpunt centreren via *Origin to Geometry*.
   * Curve-eigenschappen instellen in de *Object Data Properties*: fysieke dikte toevoegen via *Geometry → Extrude* en afgeronde randen creëren via *Bevel: Depth & Resolution*.

### Leerplandoelen
* **CRS01:** Productievereisten en instructies analyseren (resolutie 1920×1080 px, 16:9 verhouding, EEVEE Next still render, optioneel video-animatie).
* **CRS02:** Doelgericht 3D-technieken selecteren (vectorvoorbereiding in Illustrator of online bronnen, SVG-import, curve-extrusie en beveling in Blender).
* **CRS06:** Vlot en doelgericht navigeren in de 3D-viewport van Blender en basisbewerkingen uitvoeren.
* **CRS15:** Geschikt 2D vector- en beeldmateriaal doelgericht voorbereiden voor ruimtelijke verwerking.
* **SV06.72:** Het verband tussen een tweedimensionale vectorvoorstelling en een ruimtelijke 3D-vorm analyseren.

## Les 2 29/09/2026 (Motion, 13:30 - 15:20)

### Extrude: Praktijkshoot buiten (fotografie)

### Lesverloop & inhoud
1. **Praktijkopdracht fotografie op locatie:**
   * Verplaatsing naar buiten voor een gerichte fotografische praktijkoefening.
   * Oefenen op kadrering, natuurlijk licht en camerastandpunten ter ondersteuning van visuele compositie.

### Leerplandoelen
* **CRS02:** Doelgericht fotografische technieken, standpunten en natuurlijk licht beheersen en toepassen in de praktijk.
* **CRS07:** Zelfstandig kwalitatief fotografisch bronmateriaal capteren in een buitenomgeving.

## Les 3 06/10/2026 (Motion, 09:10 - 11:00)

### Extrude: Inhaalsessie vector import, 3D extrusie & individuele opvolging

### Lesverloop & inhoud
1. **Inhaalbriefing & begeleiding afwezige leerlingen:**
   * Briefing van de opdracht *Extrude* aan de leerlingen die vorige week afwezig waren.
   * Doornemen van de overgang van 2D-vectoren naar ruimtelijke 3D-volumes en de productievereisten.
2. **Begeleide praktijk & voortgang:**
   * Aanmaken van de mappenstructuur en vectorvoorbereiding in Illustrator (of SVG-selectie).
   * SVG-curves importeren in Blender, origin centreren en diepte toevoegen via *Geometry → Extrude* en *Bevel*.
   * Individuele afstemming en bijsturing op het eigen werktempo.

### Leerplandoelen
* **CRS01:** Productievereisten en instructies analyseren (resolutie 1920×1080 px, 16:9 verhouding, still render).
* **CRS02:** Doelgericht 3D-technieken selecteren (SVG-import, curve-extrusie en beveling in Blender).
* **CRS06:** Vlot en doelgericht navigeren in de 3D-viewport van Blender en basisbewerkingen uitvoeren.
* **CRS15:** Geschikt 2D vector- en beeldmateriaal doelgericht voorbereiden voor ruimtelijke verwerking.

## Les 4 13/10/2026 (Motion, 08:20 - 10:00)

### Extrude: Herhaling modellering, Cycles render engine, studiobelichting & shaders

### Lesverloop & inhoud
1. **Herhaling modellering:**
   * Klassikale herhaling: SVG-vectorimport, rotatie, *Origin to Geometry*, diepte via extrusie (*Extrude*) en afschuinen van randen (*Bevel Depth & Resolution*). Controle van schone curvegeometrie.
   * `VoornaamA_Extrude.blend`
2. **Cycles render engine & renderinstellingen:**
   * Overschakelen naar de **Cycles** render engine onder *Render Properties*.
   * Apparaatselectie configureren (*Device: GPU Compute*) en viewport/render denoising activeren.
   * Vergelijking van realtime weergave (EEVEE) versus fysisch accurate path tracing (Cycles: zachte schaduwen, globale illuminatie en natuurgetrouwe lichtweerkaatsing).
3. **Studiobelichting opzetten:**
   * Opbouwen van een 3-punts studiobelichting met gerichte lichtbronnen (*Area Lights* / *Point Lights*): hoofdlicht (*Key Light*), zacht invullicht (*Fill Light*) en contrastrijk tegenlicht (*Rim Light*).
   * Tegenlicht nauwkeurig positioneren om de beveled randen van het 3D-volume te laten glanzen en los te trekken van de achtergrond.
   * Toevoegen van een vloervlak of achterwand (*Mesh → Plane*) voor zachte schaduwopvang.
4. **Materialen & Principled BSDF shaders:**
   * Schakelen naar de gerenderde weergave (*Viewport Shading: Rendered*).
   * Materialen aanmaken en toewijzen via de Principled BSDF shader.
   * Eigenschappen afstellen: basiskleur (*Base Color*), oppervlakteruwheid (*Roughness* voor matte of glanzende reflecties) en eventueel metaalglans (*Metallic*).

### Leerplandoelen
* **CRS02:** Doelgericht de Cycles render engine, belichtingstypen en shader-eigenschappen selecteren in functie van fysisch accurate lichtval en tactiliteit.
* **CRS06:** Zelfstandig modelleren, shaders toekennen en belichting opbouwen in de Blender 3D-omgeving.
* **CRS22:** Vormgeving, afgeschuinde randen, shaders en schaduwwerking harmonieus afstemmen in Cycles.
* **SV06.72:** Het ruimtelijke effect van lichtinval, schaduwwerking en materiaaleigenschappen op 3D-volumes evalueren.

## Les 5 15/10/2026 (Motion, 12:40 - 14:20)

### Extrude: Camera, belichting, shaders & afwerking

### Lesverloop & inhoud
1. **Scèneopbouw & camera:**
   * Toevoegen en kadreren van de camera (`Ctrl + Alt + Numpad 0` voor actieve weergave).
   * Brandpuntsafstand (*Focal Length*) en compositie instellen in liggend 16:9-formaat (1920 × 1080 px).
   * Eventueel toevoegen van een vloervlak of achterwand (*Mesh → Plane*) als zachte schaduw- en lichtopvanger.
2. **Studiobelichting & sfeer:**
   * Fijnstellen van de 3-puntsbelichting met gerichte lichtbronnen (Key, Fill en Rim light).
   * Scherpstellen van het tegenlicht (*Rim light*) om de afgeschuinde randen van het 3D-volume te laten glanzen en los te maken van de achtergrond.
   * Lichtintensiteit, lichtkleur en schaduwzachtheid afstemmen in de gerenderde weergave.
3. **Materialen & shaders:**
   * Toewijzen en finetunen van materialen via de Principled BSDF shader.
   * Aanpassen van basiskleur (*Base Color*), ruwheid (*Roughness*) en eventuele accenten (zoals *Metallic*).
4. **Render, controle & oplevering:**
   * Renderen van het finale still-beeld via *Render → Render Image* (`F12`) en opslaan als `VoornaamA_Extrude-Still.png` in de map `02_exports/`.
   * Optioneel (extra uitdaging): keyframen van een subtiele camera-animatie of rotatie en renderen naar MP4.
   * Bestandsstructuur controleren (`VoornaamA_Extrude.blend`, SVG-asset, renders in `02_exports/`), inpakken als `VoornaamA_Extrude.zip` en indienen via de Smartschool-uploadzone.

### Leerplandoelen
* **CRS01:** Productievereisten analyseren (resolutie 1920×1080 px, 16:9 verhouding, still render, optioneel animatie).
* **CRS02:** Doelgericht 3D-technieken selecteren (camerakadrering, studiobelichting, Principled BSDF shaders).
* **CRS06:** Vlot en zelfstandig werken met Blender 3D (camera-opstelling, lichtbronnen, shader-eigenschappen, rendering).
* **CRS22:** Vormgeving, afgeschuinde randen, shaders en lichtval esthetisch en harmonieus op elkaar afstemmen tot één hoogwaardig beeld.
* **CRS23:** Bestanden controleren op correcte resolutie (1920×1080 px), ruisvrije renderkwaliteit en bestandsconventies.
* **CRS27:** Het volledige Blender-project en de deliverables conform de mappenstructuur tijdig opleveren via de Smartschool-uploadzone.
* **SV06.72:** Het verband tussen ruimtelijke 3D-situaties en bijbehorende 2D-voorstellingen doelgericht analyseren en toepassen.

