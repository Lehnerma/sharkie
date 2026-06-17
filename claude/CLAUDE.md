# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sharkie is a 2D canvas-based game built with vanilla HTML, CSS, and JavaScript using object-oriented programming (OOP) principles. The project is designed for learning, so solutions should be guided rather than fully pre-coded.

## Architecture

### Class Hierarchy

The game uses a inheritance-based architecture:

```
DrawableObjects (base class: x, y, height, width, drawObject())
├── MoveableObjects (extends DrawableObjects)
│   └── Sharkie (the player character)
├── Background (extends DrawableObjects)
└── Level (manages enemies and background objects)
```

### Core Components

- **World** (`world.class.js`): Main game loop container, holds canvas context and keyboard state. Manages rendering via `addToMap()` and `addObjectsToMap()`.
- **Keyboard** (`keyboard.clas.js`): Tracks key states (UP, DOWN, LEFT, RIGHT, SPACE, W, A, S, D, B).
- **Level** (`level.js`): Contains arrays of enemies and background_objects, defines level_end boundary.
- **Game Loop**: Initiated by `init()` in `game.js`, creates World instance which calls `draw()`.

### Script Load Order

Order in `index.html` matters due to class dependencies:
1. Base classes first (DrawableObjects, MoveableObjects)
2. Character/object classes (Sharkie, Background)
3. Container classes (World, Level)
4. Input handler (Keyboard)
5. Level definitions
6. Game entry point (game.js)

## Development Notes

### When the User Asks Questions

Store short, concise answers in `documentation.log` in the project root for future reference. Format: **Q:** question | **A:** answer

### Key Implementation Patterns

1. **Canvas Drawing**: Objects implement `draw(ctx)` methods called by World's `addToMap()`.
2. **Collision Detection**: Framework exists in comments (see `addToMap()` in World) but not yet active—guide the user through implementation.
3. **Movement**: MoveableObjects subclasses should handle position updates based on Keyboard state.
4. **Level Design**: Populate `level1.js` arrays with enemy and background instances.

### Current Status

- Base class structure in place but mostly empty stubs
- Drawing pipeline scaffolded but not fully implemented
- Game loop initialized but `World.draw()` is empty
- Keyboard input mapped but not yet connected to object movement

### Known Issues

- `game.js` line 27 & 35: `keyboard[action]` should be `keyboard[pressedKey]` (action is undefined)
- Some class files are incomplete (Sharkie.class.js is empty)

## Commands

Since this is a vanilla project with no build step:

- **Run**: Open `index.html` in a browser (can double-click or use a local server)
- **Debug**: Use browser DevTools (F12) — console logs keyboard events and draw calls
- **No tests/lint**: Project doesn't use a test framework or linter yet

## Guidelines for Assistance

1. **Avoid full solutions**: Point to where code should go and what methods/properties are needed.
2. **Suggest, don't implement**: "You'll need to override draw() in Sharkie to render the image" rather than writing the code.
3. **Reference class structure**: Use the existing pattern (how Background extends DrawableObjects) to guide similar implementations.
4. **Save Q&A to documentation.log**: Keep explanations and answers easily repeatable.
