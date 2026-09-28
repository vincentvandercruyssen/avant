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

### Extrude: Shaders, studiobelichting, camerakadrering & still render

### Lesverloop & inhoud
1. **Materiaalkeuze & Principled BSDF shader:**
   * Schakelen naar de gerenderde weergave (*Viewport Shading: Rendered*, `Z → 8`).
   * Nieuw materiaal toewijzen aan het 3D-object met de Principled BSDF shader.
   * Instellen van basiskleur (*Base Color* afgestemd op de grafische identiteit), ruwheid (*Roughness* voor een matte klei- of satijnglanslook) en eventueel metaalglans (*Metallic*).
   * Toevoegen van een vloervlak (*Mesh → Plane*) met contrasterend schaduwmateriaal.
2. **Drie-punts studiobelichting:**
   * Render engine instellen: EEVEE Next (realtime met zachte schaduwen en ambient occlusion) of Cycles (fysisch accurate path tracing met GPU Compute en denoising).
   * Opbouwen van een klassieke studiobelichting: gericht hoofdlicht (*Key Light*), zacht invullicht (*Fill Light*) en een krachtig tegenlicht (*Rim Light*) achter het object.
   * Tegenlicht nauwkeurig positioneren om de afgeschuinde randen (*bevels*) van het 3D-object helder te laten glanzen en los te trekken van de achtergrond.
3. **Camerakadrering & still render:**
   * Camera instellen op het liggende 16:9-formaat (1920 × 1080 px Full HD) onder *Output Properties*.
   * Experimenteren met brandpuntsafstanden (*Focal Length*): brede fotografische lenzen (24–35 mm) versus telelenzen (85–135 mm+) voor een strakke, bijna isometrische compressie.
   * Camera centreren op het onderwerp via *Align Active Camera to View* (`Ctrl + Alt + Numpad 0`).
   * Scherptediepte (*Depth of Field*) activeren met scherpte op het 3D-object en een esthetisch vervaagde achtergrond.
   * Still frame renderen via *Render → Render Image* (`F12`) en opslaan als PNG (`VoornaamA_Extrude-Still.png`) in `02_exports/` (afronding basisopdracht).

### Leerplandoelen
* **CRS02:** Doelgericht belichtingstypen en shader-eigenschappen selecteren in functie van sfeer en tactiliteit.
* **CRS06:** Zelfstandig materialen en belichting opbouwen in de Blender 3D-omgeving.
* **CRS22:** Vormgeving, afgeschuinde randen, shaders en schaduwwerking esthetisch en harmonieus harmoniseren.
* **CRS23:** Beeldbestanden controleren op correcte resolutie (1920 × 1080 px) en ruisvrije renderkwaliteit.
* **SV06.72:** Het ruimtelijke effect van lichtinval, schaduwwerking en camerahoeken op 3D-volumes evalueren.

## Les 3 06/10/2026 (Motion, 09:10 - 11:00)

### Extrude: Extra uitdaging: Animatie, EEVEE Next video-render & oplevering

### Lesverloop & inhoud
1. **Animatie & interpolatie (extra uitdaging):**
   * Tijdlijn configureren op 120 of 150 frames (4 tot 5 seconden aan 30 fps) in 16:9-formaat.
   * Optie A: Camerabeweging keyframen (langzame push-in, subtiele boog- of dollybeweging) met constante focus op het 3D-beeldmerk.
   * Optie B: Logo reveal keyframen (180° rotatie-flip om de as of trapsgewijze doorgroei/extrusie van het object).
   * Snelheidscurves verfijnen in de Graph Editor voor soepele versnelling en vertraging (*Ease In & Out*).
2. **Render-instellingen & video-export:**
   * Output-instellingen in Blender configureren: FFmpeg Video, MPEG-4 container, H.264 videocodec met hoge kwaliteit.
   * Kleurbeheer controleren (*AgX* of *Filmic* weergave) op overbelichting en contrast.
   * Animatie renderen met EEVEE Next (`Ctrl + F12`) naar `VoornaamA_Extrude-Animatie.mp4` in `02_exports/`.
3. **Kwaliteitscontrole & oplevering:**
   * Bestanden controleren op resolutie (1920 × 1080 px), stillkwaliteit, en bij de extra uitdaging ook framerate (30 fps) en bestandsgrootte (max. 10 MB).
   * Volledige projectmap inpakken naar `VoornaamA_Extrude.zip` en indienen via de Smartschool Uploadzone.

### Leerplandoelen
* **CRS16:** Een hoogwaardige 3D-still renderen en optioneel een dynamische camera-animatie of logo-onthulling realiseren.
* **CRS23:** Bestanden controleren op correcte resolutie (1920 × 1080 px), kleurbeheer en ruisvrije renderkwaliteit.
* **CRS27:** Het volledige Blender-project en de deliverables (still render en optionele animatie) tijdig en conform de mappenstructuur opleveren.
