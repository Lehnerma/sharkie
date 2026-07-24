let canvas;
let keyboard = new Keyboard();
let world;

const keyMap = {
  Space: "SPACE",
  ArrowDown: "DOWN",
  ArrowUp: "UP",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  KeyB: "B",
  KeyE: "E",
  KeyH: "H",

  KeyW: "W",
  KeyA: "A",
  KeyS: "S",
  KeyD: "D",
};

/**
 * grabs the canvas element and wires up every UI event listener; runs
 * once on page load, before any world exists.
 */
function init() {
  canvas = document.getElementById("canvas");
  initEventlistener();
}

/**
 * wires the start and try-again buttons plus every other UI control
 * (dialogs, volume sliders, mute, fullscreen, touch controls).
 */
function initEventlistener() {
  const START_BTN = document.getElementById("game_start");
  const TRY_Again_BTN = document.getElementById("again_btn");

  START_BTN.addEventListener("click", () => createWorld());
  TRY_Again_BTN.addEventListener("click", () => restartGame());

  initDialogs();
  initVolumeSliders();
  initMuteButton();
  initFullscreenButton();
  initHomeButton();
  initTouchControls();
}

/**
 * wires the on-screen touch buttons. each button carries a data-key that maps
 * onto the shared keyboard state, so a tap does exactly what the matching key
 * does. touchend and touchcancel release the flag, so a finger sliding off a
 * button can never leave a direction stuck. contextmenu is blocked so a long
 * press does not open the touch-and-hold menu on top of the controls.
 */
function initTouchControls() {
  const buttons = document.querySelectorAll(".touch-btn[data-key]");
  buttons.forEach((button) => {
    const key = button.dataset.key;
    button.addEventListener("touchstart", (e) => setTouchKey(e, key, true), { passive: false });
    button.addEventListener("touchend", (e) => setTouchKey(e, key, false), { passive: false });
    button.addEventListener("touchcancel", (e) => setTouchKey(e, key, false), { passive: false });
    button.addEventListener("contextmenu", (e) => e.preventDefault());
  });
}

/**
 * writes a single touch button's pressed state into the shared keyboard object
 * and keeps the swim sound in sync, mirroring the keydown/keyup handlers.
 * @param {TouchEvent} e - the originating touch event
 * @param {string} key - the keyboard flag to toggle (e.g. "LEFT", "SPACE")
 * @param {boolean} isPressed - true on touchstart, false on release/cancel
 */
function setTouchKey(e, key, isPressed) {
  e.preventDefault();
  keyboard[key] = isPressed;
  updateSwimSound();
}

/** flags the matching keyboard key as pressed, unless the game is paused. */
window.addEventListener("keydown", (e) => {
  if (world?.paused) return;
  const pressedKey = keyMap[e.code];
  if (pressedKey) {
    keyboard[pressedKey] = true;
    updateSwimSound();
  }
});

/** flags the matching keyboard key as released. */
window.addEventListener("keyup", (e) => {
  const pressedKey = keyMap[e.code];
  if (pressedKey) {
    keyboard[pressedKey] = false;
    updateSwimSound();
  }
});

/** reveals the try-again button, shown once the game has ended. */
function showTryAgainBtn() {
  document.getElementById("again_btn").classList.remove("hidden");
}

/** hides the try-again button. */
function hideTryAgainBtn() {
  document.getElementById("again_btn").classList.add("hidden");
}

/**
 * restarts the game without reloading the page: shuts the old world down so
 * none of its loops keep running, hides the try again button, stops the end
 * sounds and starts a brand new world that runs right away.
 */
function restartGame() {
  world.stop();
  hideTryAgainBtn();
  stopSound("GAME_OVER");
  stopSound("GAME_WON");
  initWorld();
  playSound("BACKGROUND_MUSIC");
}

/**
 * starts the game from the start screen: shows the canvas, creates the
 * world, starts the music and plays the whole start screen transition
 * (title, subarea, background fade out; canvas fade in).
 */
function createWorld() {
  showCanvas();
  initWorld();
  playSound("BACKGROUND_MUSIC");
  fadeOutStartscreen();
  fadeOutSubarea();
  animateTitleUp();
  fadeOutBackground();
  fadeInCanvas();
  enableFullscreenButton();
  enableHomeButton();
  showTouchControls();
  hideStartscreenAfterDelay();
}

/** creates a fresh World instance, replacing any previous one. */
function initWorld() {
  world = new World(canvas, keyboard);
}

/**
 * leaves the running game and returns to the start screen without
 * reloading the page: stops the world, silences every game sound, exits
 * fullscreen if active and plays the start transition in reverse.
 */
function goHome() {
  clearTimeout(startscreenHideTimeout);
  world.stop();
  world.paused = false;
  hideTryAgainBtn();
  stopAllGameSounds();
  exitFullscreenIfActive();
  canvas.classList.remove("fade-in");
  hideCanvas();
  hideTouchControls();
  document.getElementById("fullscreen_toggle").disabled = true;
  document.getElementById("home_toggle").disabled = true;
  showStartscreen();
}

/** stops every sound that could still be playing when a run ends. */
function stopAllGameSounds() {
  stopSound("BACKGROUND_MUSIC");
  stopSound("SWIM");
  stopSound("SNORE");
  stopSound("GAME_OVER");
  stopSound("GAME_WON");
}

/** leaves fullscreen if the browser is currently in it. */
function exitFullscreenIfActive() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}
