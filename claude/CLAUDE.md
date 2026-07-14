# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sharkie is a 2D canvas-based game built with vanilla HTML, CSS, and JavaScript using
object-oriented programming (OOP) principles. The project is a learning project, so
assistance should be **guided rather than fully pre-coded** (see Guidelines below).

The core game loop is already implemented and playable: Sharkie moves through a
side-scrolling underwater level, fights enemies with bubble attacks, collects coins and
poison bottles, can buy heals/bottles in a coin-based shop, and faces an Endboss with its
own health bar.

## Architecture

### Class Hierarchy

The game uses an inheritance-based architecture rooted in `DrawableObjects`:

```
DrawableObjects (x, y, width, height, image cache, drawObject(), drawBorderCollision())
├── MoveableObjects (movement, animation, isColliding(), hit(), isHurt(), gravity)
│   ├── Sharkie        (player: movement, bubble attack, slap, idle/long-idle, death)
│   ├── Enemies        (shared enemy behaviour)
│   │   ├── PufferFish
│   │   └── JellyFish
│   ├── Endboss        (intro animation, attack, hitByBubble, defeat)
│   ├── Bubble         (projectile; normal + poison variant)
│   └── Poisonbottle   (collectible ammo)
├── Background         (parallax layer, one Image per segment)
├── Coin               (collectible currency)
├── Endbossbar         (boss health bar, world-space then screen-fixed)
└── Statusbar          (base for the fixed HUD bars)
    ├── Healthbar
    ├── Coinbar
    └── Bottlebar      (⚠️ defined in bubblebar.class.js — file/class name mismatch)
```

Standalone (no inheritance): `World`, `Keyboard`, `Level`.

### Core Components

- **World** (`world.class.js`): Owns the canvas context, keyboard, the `Sharkie` instance,
  and the arrays for bubbles/coins/bottles. Runs two engines:
  - `draw()` — the render loop via `requestAnimationFrame`; applies the camera translate,
    draws backgrounds, sharkie, endboss, enemies, collectibles and bubbles in world space,
    then draws the fixed HUD bars in screen space.
  - `helperFunction()` — a `setInterval` (200 ms) game-logic tick running all collision
    checks (enemy, endboss, bubble, coin, bottle), bubble cleanup, shop input, and enemy
    boundary recycling.
- **Camera**: `world.camera_x` is set by Sharkie each frame (`sharkie.class.js`,
  `this.world.camera_x = -this.x + 100`) and used in `draw()` to scroll the world.
- **Keyboard** (`keyboard.clas.js`): Tracks key states. Mapped in `game.js` via `keyMap`:
  arrows + WASD (movement), SPACE (bubble), B / H (shop: buy bottles / buy heal), E.
- **Level** (`level.class.js` + `level/level1.js`): Holds `backgrounds`, `enemies`, and
  `endboss` arrays. `level1.js` builds a 7-segment parallax background and the Endboss.
- **Shop**: `buyHeal()` / `buyBottles()` in World spend coins for health / bottle refills,
  throttled by `lastShopBuy` (5 s cooldown).
- **Game entry**: `init()` in `scripts/game.js` creates the `World` on `body onload`.

### Script Load Order

Order in `index.html` matters due to class dependencies. Current order: base classes
(`DrawableObjects` → `MoveableObjects`) → `Background`, `Level`, `Keyboard`, `Sharkie` →
projectiles/enemies (`Bubble`, `Enemies`, `PufferFish`, `JellyFish`, `Endboss`) →
HUD (`Statusbar`, `Healthbar`, `Coinbar`, `Bottlebar`/bubblebar, `Endbossbar`) →
collectibles (`Coin`, `Poisonbottle`) → `World` → `level/level1.js` → `scripts/game.js`.

## Development Notes

### When the User Asks Questions

Store short, concise answers in `claude/documentation.log` for future reference.
Format: **Q:** question | **A:** answer

**At the end of every conversation session**, automatically append a keyword-style summary
of all topics discussed to `claude/documentation.log` — no user confirmation needed. Use
the same Q/A format, keep answers concise and keyword-heavy (no full sentences). Cover every
meaningful concept, decision, or pattern from the session.

### Key Implementation Patterns

1. **Canvas Drawing**: Every object implements `drawObject(ctx)` (from `DrawableObjects`);
   World's `addToMap()` handles image flipping for `otherDirection` and draws the collision
   box via `drawBorderCollision()`.
2. **Collision Detection**: Active. `isColliding()` (in `MoveableObjects`) uses per-object
   `collisionOffset` boxes. World runs all collision checks in the 200 ms tick.
3. **Animation**: `playAnimation(images, frames)` cycles a frame array on an interval;
   `playAttack()` plays a one-shot sequence with an `onFinish` callback.
4. **Movement**: Driven by the `movements` map in `MoveableObjects` keyed on Keyboard state;
   respects `levelBoundary`.
5. **Camera scrolling**: Sharkie writes `world.camera_x`; World translates by it in `draw()`.

### Current Status

- Core game loop, rendering, and camera: **implemented and playable**.
- Sharkie: movement (arrows + WASD), bubble/poison attack, slap, idle/long-idle, hurt,
  death — implemented.
- Enemies (PufferFish, JellyFish) + Endboss with intro/attack/defeat — implemented.
- Collisions (enemy, endboss, bubble→enemy, coin, bottle) — implemented.
- HUD: Healthbar, Coinbar, Bottlebar, Endbossbar — implemented.
- Shop (buy heal / buy bottles with coins) — implemented.
- Coin replenishment + enemy boundary recycling — implemented.

### Known Issues / Cleanup Candidates

- **File/class mismatch**: `bubblebar.class.js` defines class `Bottlebar`. Consider aligning
  filename and class name.
- **Enemy spawn commented out**: `level/level1.js` currently ships enemies commented out;
  only the Endboss is active in the level array.

## Commands

Vanilla project, no build step:

- **Run**: Open `index.html` in a browser (double-click or a local server; `up.sh` present).
- **Debug**: Browser DevTools (F12). Collision boxes render as red rectangles.
- **No tests/lint**: No test framework or linter configured.

## Guidelines for Assistance

1. **Avoid full solutions**: Point to where code should go and what methods/properties are
   needed, using the existing patterns as the model.
2. **Suggest, don't implement** (for game logic): e.g. "You'll override `draw()` in the new
   enemy the way `PufferFish` does" rather than writing the whole class. Docs, config, and
   obvious bug fixes may be edited directly.
3. **Reference the existing structure**: Mirror how `Enemies` → `PufferFish`/`JellyFish` or
   `Statusbar` → the HUD bars are built when guiding similar work.
4. **Save Q&A to `claude/documentation.log`**: Keep explanations easily repeatable.
