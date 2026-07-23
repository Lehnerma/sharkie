---
title: "[Bug] Sharkie dreht sich beim Fin-Slap nicht Richtung Gegner"
labels: bug
---

**Beschreibung**  
Während der Fin-Slap-Animation dreht sich Sharkie nicht automatisch in die Richtung des Gegners.  
Das Ergebnis ist, dass der Angriff visuell in die falsche Richtung zeigt, auch wenn der Treffer intern registriert wird.

**Schritte zur Reproduktion**  
1. Einen Gegner links von Sharkie positionieren
2. Fin-Slap-Taste (E) drücken, während Sharkie nach rechts schaut
3. Beobachten: Sharkie bleibt nach rechts gedreht, obwohl der Gegner links ist

**Erwartetes Verhalten**  
Sharkie dreht sich vor dem Fin-Slap automatisch in Richtung des Zielgegners (`otherDirection` anpassen).

**Betroffene Dateien**  
- `class/sharkie.class.js` – `executeFinalSlap()` / `nudgeTowardEnemy()` (Zeile ~417)
