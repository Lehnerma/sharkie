---
title: "[Enhancement] Fin-Slap-Animation beschleunigen"
labels: enhancement
---

**Beschreibung**  
Der Fin-Slap-Angriff (Taste E) fühlt sich laut Reviewer-Feedback zu langsam an.  
Die Animation dauert zu lange, was den Kampf gegen Gegner erschwert.

**Erwartetes Verhalten**  
Die Fin-Slap-Animation läuft schneller ab, sodass der Angriff flüssiger und reaktionsfähiger wirkt.

**Vorgeschlagene Lösung**  
Das Intervall/die FPS der Fin-Slap-Animationsschleife in `sharkie.class.js` verringern  
(z. B. `setStoppableInterval`-Delay für die Fin-Slap-Animation reduzieren).

**Betroffene Dateien**  
- `class/sharkie.class.js` – `playFinalSlapAnimation()` / `executeFinalSlap()`
