---
title: "[Refactor] StatusBar-Klassen in einer gemeinsamen Basisklasse zusammenfassen"
labels: refactor
---

**Beschreibung**  
Aktuell gibt es vier separate Klassen für die Statusanzeigen:

| Klasse | Datei | Basisklasse |
|--------|-------|-------------|
| `Healthbar` | `healthbar.class.js` | `Statusbar` |
| `Coinbar` | `coinbar.class.js` | `Statusbar` |
| `Bottlebar` | `bubblebar.class.js` | `Statusbar` |
| `Endbossbar` | `endbossbar.class.js` | `DrawableObjects` |

`Healthbar`, `Coinbar` und `Bottlebar` sind nahezu identisch aufgebaut (gleiches `setPercentage`-Muster, gleiche Bildpfad-Array-Logik).  
Laut Reviewer-Feedback sollen diese in **einer** `Statusbar`-Klasse zusammengefasst werden.  
`Endbossbar` kann weiterhin eigenständig bleiben oder von `Statusbar` erben, falls sie erweitert wird.

**Ziel**  
- `Healthbar`, `Coinbar` und `Bottlebar` durch Übergabe von Bildpfad-Array und Y-Position im Konstruktor in die gemeinsame `Statusbar`-Klasse integrieren.
- Doppelten Code in `collectCoin()`, `collectBottle()` und `renderCoinbar()` / `renderBottle()` eliminieren (gemeinsame `collect()`- und `render()`-Methode in `Statusbar`).

**Betroffene Dateien**  
- `class/statusbar.class.js`
- `class/healthbar.class.js`
- `class/coinbar.class.js`
- `class/bubblebar.class.js`
- `class/world.class.js` (Instanziierung anpassen)
