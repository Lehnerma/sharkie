---
title: "[Bug] Sharkie dreht sich nicht beim horizontalen Bewegen um"
labels: bug
---

**Beschreibung**  
Wenn Sharkie nach links schwimmt, wird `this.otherDirection = true` gesetzt und das Sprite korrekt gespiegelt.  
Laut Reviewer-Feedback kann sich der Charakter jedoch nicht umdrehen – möglicherweise fehlt die Spiegelung in einer bestimmten Situation (z. B. nach einem Angriff oder wenn der Spieler aus dem Fin-Slap-Zustand zurückkehrt).

**Schritte zur Reproduktion**  
1. Spiel starten
2. Nach rechts schwimmen, dann nach links wechseln
3. Beobachten, ob Sharkie gespiegelt dargestellt wird

**Erwartetes Verhalten**  
Sharkie zeigt beim Schwimmen nach links immer nach links, beim Schwimmen nach rechts immer nach rechts.

**Betroffene Dateien**  
- `class/sharkie.class.js` – `handleMovementAnimation()`
- `class/world.class.js` – `addToMap()` / `flipImage()`
