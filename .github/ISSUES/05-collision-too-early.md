---
title: "[Bug] Kollisionserkennung löst zu früh aus (vor visueller Berührung)"
labels: bug
---

**Beschreibung**  
Die Kollisionsboxen sind zu groß im Verhältnis zu den sichtbaren Sprites.  
Schaden und Spielende werden ausgelöst, bevor sich Sharkie und Gegner/Endboss visuell tatsächlich berühren.

**Schritte zur Reproduktion**  
1. Auf den Endboss zuschwimmen
2. Kollisionsschaden tritt auf, obwohl die Figuren noch sichtbar Abstand haben

**Erwartetes Verhalten**  
Kollision wird erst registriert, wenn die Sprites sich optisch berühren.

**Vorgeschlagene Lösung**  
`collisionOffset`-Werte für Sharkie und Endboss erhöhen, damit die Kollisionsbox enger am sichtbaren Sprite anliegt.

| Objekt | Aktuelle Offsets (top/bottom/left/right) |
|--------|------------------------------------------|
| Sharkie | 90 / 40 / 40 / 40 |
| Endboss | 150 / 100 / 20 / 20 |

**Betroffene Dateien**  
- `class/sharkie.class.js` – `collisionOffset` (Zeile ~268)
- `class/endboss.class.js` – `collisionOffset` (Zeile ~42)
- `class/movable-objects.class.js` – `isColliding()`
