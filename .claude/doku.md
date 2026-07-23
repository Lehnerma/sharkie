# Sharkie – Arbeitsdoku

## 2026-07-23 – Touch-Grid von Anfang an (feste Button-Spalten, kein Layout-Shift)

**Ziel:** Kein Layout-Sprung mehr beim Spielstart. Das 3-Spalten-Grid soll auf Mobile schon beim Laden stehen; die äußeren Spalten reservieren fest Platz für die Buttons (auch solange die noch versteckt sind), die Mitte (`1fr`) gehört dem Canvas. Ersetzt den `is-playing`-Ansatz von gestern.

**Entscheidung (mit Max):** linke Spalte **8rem** (D-Pad, 2-spaltig), rechte Spalte **5rem** (Action-Buttons, 1-spaltig). Gap 1rem.

**Änderungen:**
- **styles/touch-controls.css**
  - `@media (pointer: coarse)`: `main` ist jetzt **immer** `display: grid` mit `grid-template-columns: 8rem 1fr 5rem` (nicht mehr an `body.is-playing` gekoppelt).
  - Bereiche explizit zugewiesen: `.touch-dpad-panel { grid-column: 1 }`, `.main-content { grid-column: 2; justify-self: center }`, `.touch-actions-panel { grid-column: 3 }` → Canvas bleibt in Spalte 2, auch während die Panels noch `display:none` sind (kein Verrutschen).
  - `--touch-reserve` = **15rem** (8 + 5 + 2×1rem Gap), gilt bei `pointer: coarse` immer. Hält `.main-content`-width (layout.css / responsive.css) synchron mit der 1fr-Spalte.
  - Feste `width`/`flex-shrink` auf den Panels entfernt – Breite kommt jetzt aus der Grid-Spalte (Panels stretchen auf 8rem bzw. 5rem).
- **scripts/game.js** – `body.is-playing` in `showTouchControls()` entfernt (steuerte nach dem Umbau kein CSS mehr).

**Hinweis:** `layout.css` und `responsive.css` mussten nicht angefasst werden – sie lesen `--touch-reserve`, das jetzt korrekt 15rem liefert.

## 2026-07-22 – Touch-Layout erst beim Spielstart (Canvas vorher mittig)

**Ziel:** Auf Mobile soll das Canvas vor dem Start mittig und auf voller Breite stehen. Erst beim Spielstart soll das Grid greifen und die Touch-Buttons links/rechts das Canvas flankieren.

**Problem vorher:** Auf Touch (`pointer: coarse`) war `main` immer `display: grid` und `--touch-reserve` immer `13rem` → schon vor dem Start wurde Platz für die noch versteckten Buttons abgezogen, das Canvas war unnötig schmal.

**Lösung – `is-playing`-Flag auf `<body>`:**
- **styles/touch-controls.css** – `--touch-reserve: 13rem` und die `main`-Grid-Regel (`1fr auto 1fr`) hängen jetzt an `body.is-playing` statt global im `@media (pointer: coarse)`. Vor dem Start: `--touch-reserve` bleibt `0`, `main` ist normaler Block → `body`-Flexbox zentriert das Canvas auf voller Breite.
- **scripts/game.js** – `showTouchControls()` setzt zusätzlich `document.body.classList.add("is-playing")`; wird in `createWorld()` beim Start aufgerufen.

## 2026-07-22 – Footer komplett entfernt

**Ziel:** Der Footer wird nicht mehr gebraucht (Inhalte ins Canvas verlagert). Alle Footer-Reste raus, inkl. CSS-Datei.

**Änderungen:**
- **styles/footer.css** – Datei gelöscht (`git rm`).
- **index.html** – `<link>` auf `footer.css` entfernt; den bereits auskommentierten `<footer>`-Block (Burger-Menü + Social-Links LinkedIn/GitHub/Impressum) vollständig gelöscht.
- **scripts/game.js** – `initFooterMenu()`, `toggleFooterMenu()`, `closeFooterMenu()`, `closeOnMenuChoice()` entfernt; auskommentierter `//initFooterMenu();`-Aufruf raus.
- **styles/responsive.css** – `.footer-bar`-Regel entfernt; Landscape-Breite von `.main-content` von `calc((100svh - 4rem) …)` auf `calc(100svh …)` umgestellt (die 4rem-Reserve war nur für den Footer → Canvas nutzt jetzt volle Höhe).
- **styles/layout.css** – Grid-Kommentar korrigiert (Verweis auf „footer" entfernt).
- **styles/buttons.css** – ungenutzte `.btn--social`-Klassen (nur im Footer verwendet) gelöscht.

**Offen/Hinweis:** LinkedIn/GitHub-Links sind damit komplett aus der UI. Falls sie zurück sollen, neu (z.B. im Canvas) einbauen – die alten `.btn--social`-Styles sind entfernt.

## 2026-07-22 – Fullscreen-Button auf Mute-Button-Prinzip umgebaut

**Ziel:** Den alten Fullscreen-Button (eigenes `<aside>` mit PNG + Show/Hide-Logik) entfernen und stattdessen einen Icon-Toggle-Button umsetzen – analog zum Mute-Button, dauerhaft sichtbar.

**Änderungen:**
- **index.html**
  - Neuer Button `#fullscreen_toggle` (Klasse `.btn--fullscreen`) direkt neben dem Mute-Button im `#canvas_wrapper`. Icon `fullscreen.svg`, `aria-pressed`/`aria-label` wie beim Mute-Button.
  - Altes `<aside id="fullscreen_aside">` mit PNG-Button `#btn_fullscreen` komplett entfernt.
- **styles/buttons.css**
  - `.btn--fullscreen`, `:hover`, `:active`, `.btn--fullscreen-icon` neu – 1:1 nach dem Vorbild `.btn--mute`. Positioniert links neben dem Mute-Button (`right: 3.75rem`).
- **styles/responsive.css**
  - Landscape-Regel `#fullscreen_aside { display: none; }` entfernt (nicht mehr nötig, Button schwebt jetzt absolut über dem Canvas).
- **scripts/game.js**
  - `initFullscreenButton()` + `updateFullscreenButton()` neu (Muster wie `initMuteButton`/`updateMuteButton`), inkl. `fullscreenchange`-Listener, damit das Icon auch beim Verlassen per ESC synchron bleibt.
  - `toggleFullscreen()` schaltet jetzt den **`#canvas_wrapper`** in Fullscreen (statt nur das `<canvas>`), damit Mute-/Fullscreen-Button im Vollbild sichtbar/bedienbar bleiben.
  - Entfernt: alte `FULLSCREEN_BTN`-Const + Click-Listener in `initEventlistener`, `showFullscreenButton()` (inkl. Aufruf in `createWorld`), `hideFullscreenButton()` (war ungenutzt).
  - Neue Icon-Konstanten `FULLSCREEN_ICON` / `EXIT_FULLSCREEN_ICON`.

**Icons:** `assets/icons/fullscreen.svg`, `assets/icons/exit_fullscreen.svg` (werden per `filter: invert(1)` weiß auf dunklem Button dargestellt).
