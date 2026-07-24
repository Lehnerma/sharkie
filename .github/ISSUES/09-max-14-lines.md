---
title: "[Code Quality] Funktionen auf maximal 14 Zeilen begrenzen"
labels: refactor, code-quality
---

**Beschreibung**  
Laut Projektvorgabe darf eine Funktion/Methode maximal **14 Zeilen** lang sein.  
Mehrere Methoden im Projekt überschreiten diese Grenze aktuell.

**Ziel**  
Alle Methoden, die länger als 14 Zeilen sind, in kleinere, klar benannte Hilfsmethoden aufteilen.

**Vorgehen**  
1. Codebase nach langen Methoden durchsuchen (z. B. mit ESLint-Regel `max-lines-per-function` oder manuell).
2. Überschreitende Methoden identifizieren und in sinnvolle Teilfunktionen auslagern.
3. Verhalten durch manuelle Tests verifizieren.

**Besonders zu prüfende Dateien**  
- `class/sharkie.class.js`
- `class/world.class.js`
- `class/endboss.class.js`
- `class/endbossbar.class.js`

**Hinweis**  
Keine externe Tooling-Änderung notwendig – die Regel ist eine Projektkonvention, keine automatisch geprüfte Linting-Regel.
