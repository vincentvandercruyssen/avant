---
title: "Lowpoly"
date: 2026-10-19
schooljaar: "2026-2027"
klas: "6CRM"
vak: "motion"
auteurs:
  - "Vincent Vander Cruyssen"
periode: "Oktober"
thema: "Herhaling"
software:
  - "Blender 3D"
leerplandoelen:
  - code: "CRS01"
    criterium: "Productievereisten analyseren (vrije keuze van beeldverhouding en resolutie, renderkwaliteit en oplevering van .blend en .jpg)."
  - code: "CRS02"
    criterium: "Doelgericht basismesh- en modelleertechnieken selecteren om een geometrisch lowpoly-object te construeren."
  - code: "CRS06"
    criterium: "Zelfstandig werken in Blender 3D (viewport navigatie, transformaties, edit mode, materialen, belichting en camera)."
  - code: "CRS13"
    criterium: "Zelfstandig een online tutorial analyseren en de technieken vertalen naar een eigen 3D-creatie."
  - code: "CRS17"
    criterium: "Illustratieve 3D-geometrie opbouwen en verfijnen (Loop Cut, Extrude, Inset en Shade Flat) tot een stijlvol lowpoly-beeld."
  - code: "16.04"
    criterium: "Vanuit verbeelding een eigen 3D-concept, kleurenpalet, cameracompositie en sfeerverlichting vormgeven."
  - code: "CRS23"
    criterium: "Het eindresultaat controleren op ruisvrije renderkwaliteit en strikt eigen modelleerwerk zonder externe assets."
  - code: "CRS27"
    criterium: "Het Blender-bestand en de render-afbeelding tijdig en conform de instructies inleveren via één Smartschool-indiening."
draft: false
---

## Briefing & concept

[Low poly](https://en.wikipedia.org/wiki/Low_poly) ontstond ooit uit pure technische noodzaak: vroege computers en consoles hadden te weinig rekenkracht om complexe 3D-werelden te renderen, waardoor modellen noodgedwongen uit een minimum aan polygonen (*poly count*) bestonden. Vandaag is die beperking uitgegroeid tot een minimalistische stijl, met strakke, hoekige vlakken, harde randen en eenvoudige silhouetten.

{{< pinboard url="https://www.pinterest.com/vincentvandercruyssen/lowpoly/" >}}

In deze opdracht modelleer je in Blender een eigen lowpoly-object en maak je daar een knappe render van.

> **Eigen creatie, plagiaat is 0.** Je downloadt of importeert géén 3D-modellen of kant-en-klare assets van het internet. Elk onderdeel modelleer je volledig zelf in Blender.

### Tutorial als leidraad

Gebruik onderstaande handleiding van Brad Colbow of kies zelf een andere online lowpoly-tutorial voor een object naar jouw keuze (bijvoorbeeld een voertuig, gebouw, plant of personage).

{{< youtube nESaz92SJ0w >}}

## Stappenplan

### Modelleren

* Start met een basisvorm (*primitive* zoals een kubus of cilinder).
* Schakel naar **Edit Mode** (`Tab`) en selecteer hoekpunten, ribben of vlakken (`1`, `2` of `3`).
* Bouw je vorm op met basisbewerkingen:
  * **Extrude** (`E`): trek vlakken uit om volume toe te voegen.
  * **Scale** (`S`), **Rotate** (`R`) en **Move** (`G`): pas proporties en hoeken aan.
  * **Loop cut** (`Ctrl + R`): voeg extra segmenten toe waar nodig.
  * **Inset** (`I`): creëer een binnenrand op geselecteerde vlakken.
* Behoud de typische lowpoly-stijl: vermijd *Subdivision Surface* of overdreven fijne details. Laat de vlakken spreken (*Shade Flat*).

### Materialen en kleur

* Selecteer je object of specifieke vlakken in Edit Mode en open het tabblad **Material Properties**.
* Maak materialen aan met een **Principled BSDF** shader.
* Kies een doordacht, complementair kleurenpalet (*Base Color*) en pas de *Roughness* aan (mat versus lichte glans).

### Belichting en cameracompositie

* Voeg een camera toe (`Shift + A → Camera`) en activeer het camerazicht via `Numpad 0`.
* Bepaal je compositie en kadrering via *View → Align View → Align Active Camera to View* (`Ctrl + Alt + Numpad 0`).
* Stel in **Output Properties** zelf een resolutie en beeldverhouding in die past bij jouw onderwerp:
  * **1:1 Vierkant:** 1080 × 1080 px (Instagram post)
  * **16:9 Liggend:** 1920 × 1080 px (Full HD)
  * **4:5 Staand:** 1080 × 1350 px (Instagram portrait)
* Bouw sfeervolle belichting op met één of meerdere lichtbronnen (*Sun*, *Area* of *Point*) om schaduw, contrast en diepte te genereren.

### Renderen en exporteren

* Kies onder **Render Properties** je gewenste render engine (**EEVEE** voor realtime feedback of **Cycles** voor accurate lichtval en zachte schaduwen).
* Druk op `F12` (*Render → Render Image*) om het stilstaande beeld te renderen.
* Sla je render op via *Image → Save As...* als een hoogwaardige JPEG (`.jpg`).

### Extra uitdaging: Achtergrond en omgeving

Breid je scène uit tot een compleet mini-diorama. Vul de omgeving aan met extra zelfgemodelleerde lowpoly-elementen: een bodemoppervlak, rotsen, bomen, wolken, waterpartijen of kleine decoratieve rekwisieten die jouw hoofdobject versterken.

## Oplevering

Dien beide bestanden samen in via één enkele indiening in de voorziene Smartschool-uploadmap:

```text
Uploadmap: Lowpoly
└─ VoornaamA_Lowpoly.blend
└─ VoornaamA_Lowpoly.jpg
```

### Checklist

#### Bestanden en indiening
* Beide bestanden (`.blend` en `.jpg`) zijn samen in één indiening geüpload in de juiste uploadmap.
* De bestandsnamen volgen exact de naamconventie `VoornaamA_Lowpoly.*`.
* Het `.blend`-bestand opent probleemloos in Blender zonder ontbrekende data.

#### 3D-modellering en originaliteit
* Het lowpoly-object is volledig zelfstandig gemodelleerd zonder gedownloade externe 3D-modellen (geen plagiaat).
* De geometrie toont een herkenbare, strakke lowpoly-vormtaal met zichtbare facetten en duidelijke silhouetten.

#### Materialen, belichting en render
* Alle onderdelen zijn voorzien van passende kleuren en materialen.
* De scène is belicht met gerichte lichtbronnen die diepte en schaduwwerking creëren.
* De camera heeft een evenwichtige uitsnede met een bewust gekozen resolutie en beeldverhouding.
* De JPEG-render is haarscherp en vrij van storende ruis.

#### Extra uitdaging (optioneel)
* De achtergrond en omgeving zijn aangekleed met extra zelfgemaakte lowpoly-objecten die aansluiten bij het thema.
