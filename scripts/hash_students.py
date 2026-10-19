#!/usr/bin/env python3
"""
Avant Local Grading Pipeline - Student Hashing & Privacy Utility
Leest leerlingnamen UITSLUITEND in vanuit een genegeerd lokaal bestand of interactieve invoer.
Er staan GEEN persoonsgegevens in deze code of repository.
"""

import hashlib
import json
import os
import sys
from pathlib import Path

def generate_hash(name: str) -> str:
    """Berekent de eerste 10 karakters van de SHA-256 hash van een genormaliseerde naam."""
    clean_name = " ".join(name.strip().split())
    return hashlib.sha256(clean_name.encode("utf-8")).hexdigest()[:10]

def main():
    root_dir = Path(__file__).resolve().parent.parent
    local_input = root_dir / "data" / "leerlingen.local.json"
    
    if not local_input.exists():
        print("Geen lokaal invoerbestand gevonden (data/leerlingen.local.json).")
        print("Tip: Gebruik scripts/encrypt_students.js om leerlinggegevens te versleutelen met een wachtwoord.")
        sys.exit(0)

    with open(local_input, "r", encoding="utf-8") as f:
        data = json.load(f)

    classes_data = data.get("classes", data)
    print("Klassen en hashes (zonder namen te loggen):")
    for class_name, students in classes_data.items():
        print(f"  Klas {class_name}: {len(students)} leerlingen geladen.")

if __name__ == "__main__":
    main()
