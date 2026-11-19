---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date.Format "2006-01-02" }}
schooljaar: "2026-2027"
klas: "5CRM" # of 6CRM
vak: "" # motion, web-story, beeld, grafische
auteurs:
  - "Vincent Vander Cruyssen"
periode: "" # 5CRM: September | Oktober | November - Januari | Januari - Mei --- 6CRM: September | Oktober - December | Januari - Maart | April - Mei
thema: "" # 5CRM: Introductie | Kinetische kunst | Zwaartekracht | Water --- 6CRM: Herhaling | Event | Zwaartekracht | Fashion | Naar klant
software: []
indieningen:
  - id: "onderzoek"
    titel: "{{ replace .File.ContentBaseName "-" " " | title }} 1.1 Onderzoek en ontwerpplan"
    deadline: {{ .Date.Format "2006-01-02" }}
    lesuren: 2
    gewicht: 4
    leerplandoelen:
      - code: "13.01"
        gewicht: 1
        criterium: "Minimaal vijf inspirerende voorbeelden doelgericht verzamelen en analyseren."
      - code: "CRS01"
        gewicht: 1
        criterium: "De productievereisten en bestandsnaamgeving correct toepassen in VoornaamA_Opdrachtnaam-Onderzoek.pdf."
      - code: "CRS04"
        gewicht: 1
        criterium: "Het onderzoeksdocument en verzamelde bronnen ordelijk beheren in de OneDrive-vakmap."
      - code: "GEC01"
        gewicht: 1
        criterium: "De tussentijdse deadline en inleverafspraken voor het onderzoek stipt naleven."

  - id: "oplevering"
    titel: "{{ replace .File.ContentBaseName "-" " " | title }} 2.1 Oplevering"
    deadline: {{ .Date.Format "2006-01-02" }}
    lesuren: 4
    gewicht: 12
    leerplandoelen:
      - code: "CRS06"
        gewicht: 1
        criterium: "Vlot en zelfstandig werken met de gekozen software en gereedschappen."
      - code: "CRS27"
        gewicht: 1
        criterium: "Het volledige projectarchief VoornaamA_Opdrachtnaam.zip conform de mappenstructuur en naamconventie opleveren."
      - code: "CRS04"
        gewicht: 1
        criterium: "Werkbestanden en assets overzichtelijk ordenen in de OneDrive-vakmap."
      - code: "GEC01"
        gewicht: 1
        criterium: "De finale deadline en alle inleverafspraken stipt naleven."
draft: false
---

## Briefing & concept

Wervende introductie waarin je de opdracht linkt aan de praktijk of het overkoepelende thema.

* **Onderdeel 1**: Korte omschrijving van het hoofdelement en formaat.
* **Onderdeel 2**: Korte omschrijving van de technische of visuele lijn.

## Onderzoek

Verken vooraf hoe ontwerpers dit thema of deze techniek aanpakken en bereid je eigen keuzes voor.

Zoektermen: `relevante zoekterm 1, relevante zoekterm 2`.

### Inspiratie & ontwerpplan

Bundel je vijf voorbeelden en je voorbereiding in `VoornaamA_Opdrachtnaam-Onderzoek.pdf`:

1. **Inspiratieanalyse**: Verzamel minimaal vijf kwalitatieve voorbeelden en noteer per voorbeeld wat opvalt qua techniek, opbouw of sfeer.
2. **Eigen keuzes**: Motiveer welke technieken, kleuren en vormen je kiest in functie van jouw concept.
3. **Schets / opbouw**: Teken een snelle compositieschets of wireframe.

Plaats het document in `01_onderzoek/` en dien in via Smartschool.

## Opdracht

Werk je ontwerp stelselmatig uit volgens de technische en inhoudelijke afspraken.

### Voorbereiding & opzet

1. Stel je document of projectmap in volgens de vereiste specificaties (**formaat / resolutie**, **framerate / kleurmodus**).
2. Verzamel en orden je bronmateriaal lokaal in `02_assets/`.

### Productie & afwerking

1. Werk de hoofdonderdelen stap voor stap en niet-destructief uit.

### Export

Exporteer het eindresultaat volgens de gevraagde instellingen.

### Extra's

Voor wie sneller klaar is of extra diepte wil toevoegen:
* **Optie A:** Beschrijving van een gevorderde techniek of visuele verfijning.

## Oplevering

Lever jouw volledige project in als één ZIP-archief via de Smartschool Uploadzone:

```text
VoornaamA_Opdrachtnaam.zip
└─ VoornaamA_Opdrachtnaam/
   └─ 01_onderzoek/
      └─ VoornaamA_Opdrachtnaam-Onderzoek.pdf
   └─ 02_assets/
      └─ [alle gebruikte bronbestanden]
   └─ 03_exports/
      └─ VoornaamA_Opdrachtnaam.mp4
   └─ VoornaamA_Opdrachtnaam.aep
```

### Checklist

#### Bestandsbeheer & structuur
* Het ZIP-archief draagt de naam `VoornaamA_Opdrachtnaam.zip`.
* Het onderzoeksdocument met schets zit in `01_onderzoek/`.
* Alle gebruikte assets zitten lokaal in `02_assets/`.

#### Vormgeving & techniek
* Formaat, verhouding en kleurmodus zijn correct ingesteld.
* Niet-destructieve werkmethodes en een nette lagen- of codestructuur zijn consequent toegepast.

#### Exportkwaliteit
* Het eindbestand in `03_exports/` voldoet aan alle gevraagde exportinstellingen.
