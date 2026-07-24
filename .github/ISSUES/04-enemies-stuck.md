---
title: "[Bug] Gegner bleiben stehen und reagieren nicht mehr"
labels: bug
---

**Beschreibung**  
Wenn Sharkie sich mit einem Gegner überschneidet (Kollision aktiv), bleibt der Gegner stehen und seine KI-Bewegung friert ein.  
Außerdem ist es während dieser Überschneidung nicht möglich, den Gegner mit dem Fin-Slap zu treffen.

**Schritte zur Reproduktion**  
1. Einen Pufferfish oder Jellyfish auf Sharkie zuschwimmen lassen
2. Sharkie in den Gegner hineinschwimmen
3. Beobachten: Gegner friert ein, kein visuelles Feedback auf Treffer möglich

**Erwartetes Verhalten**  
- Gegner setzen ihre KI-Bewegung fort, auch wenn sie sich mit Sharkie überschneiden.  
- Fin-Slap ist weiterhin auslösbar.

**Betroffene Dateien**  
- `class/enemies.class.js` / `class/jelly-fish.class.js` / `class/puffer-fish.class.js` – KI-Bewegungslogik
- `class/world.class.js` – Kollisionsauflösung
