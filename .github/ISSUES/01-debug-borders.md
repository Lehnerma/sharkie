---
title: "[Bug] Debug-Kollisionsrahmen im Spiel sichtbar"
labels: bug
---

**Beschreibung**  
In `drawable-objects.class.js` ist die Methode `drawBorderCollision()` implementiert, die für `Sharkie`, `JellyFish`, `PufferFish` und `Endboss` einen roten Rechteck-Rahmen um die Kollisionsbox zeichnet.  
Diese Debug-Hilfe wird aktuell in `world.class.js → addToMap()` für jedes Objekt aufgerufen und ist daher im laufenden Spiel sichtbar.

**Schritte zur Reproduktion**  
1. Spiel starten
2. Im Spielfeld sind rote Rahmen um Sharkie und alle Gegner sichtbar

**Erwartetes Verhalten**  
Keine Debug-Rahmen im fertigen Spiel.

**Vorgeschlagene Lösung**  
Den Aufruf `mo.drawBorderCollision(this.ctx)` in `world.class.js → addToMap()` entfernen (oder hinter ein Debug-Flag stellen).

**Betroffene Dateien**  
- `class/drawable-objects.class.js` – Methode `drawBorderCollision()`
- `class/world.class.js` – Methode `addToMap()`, Zeile ~153
