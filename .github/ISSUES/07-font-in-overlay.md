---
title: "[Enhancement] Luckiest-Guy-Schrift auch in Dialogen/Overlays verwenden"
labels: enhancement
---

**Beschreibung**  
Die Schriftart „Luckiest Guy" wird aktuell nur für `h1`-Elemente und `.btn--main`-Buttons verwendet (`styles/fonts.css`).  
Laut Reviewer-Feedback sollte die Schrift auch im Overlay (Dialog, Beschreibung, Steuerungsanzeige) eingesetzt werden, um ein einheitliches visuelles Erscheinungsbild zu schaffen.

**Erwartetes Verhalten**  
Alle Überschriften und Hervorhebungen innerhalb von Dialogen (`dialog__title`, `dialog__subtitle` etc.) verwenden die „Luckiest Guy"-Schrift.

**Vorgeschlagene Lösung**  
In `styles/fonts.css` (oder `styles/dialog.css`) die `font-family`-Regel um die relevanten Selektoren erweitern:

```css
h1,
.btn--main,
.dialog__title,
.dialog__subtitle {
  font-family: 'Luckiest Guy', cursive;
}
```

**Betroffene Dateien**  
- `styles/fonts.css`
- `styles/dialog.css` (optional)
