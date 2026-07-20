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

function init() {
  canvas = document.getElementById("canvas");
  //world = new World(canvas, keyboard);
  initEventlistener();
}

function initEventlistener() {
  const START_BTN = document.getElementById("game_start");
  const TRY_Again_BTN = document.getElementById("again_btn");
  const FULLSCREEN_BTN = document.getElementById("btn_fullscreen");

  START_BTN.addEventListener("click", () => createWorld());
  TRY_Again_BTN.addEventListener("click", () => location.reload());
  FULLSCREEN_BTN.addEventListener("click", () => toggleFullscreen());

  initKeyDialog();
}

/**
 * wires up the key descriptions dialog. escape is handled natively
 * by showModal(), so only opening, the close button and the backdrop
 * click need their own listeners.
 */
function initKeyDialog() {
  const OPEN_BTN = document.getElementById("key_descriptions");
  const DIALOG = document.getElementById("key_dialog");
  const CLOSE_BTN = document.getElementById("key_dialog_close");

  OPEN_BTN.addEventListener("click", () => DIALOG.showModal());
  CLOSE_BTN.addEventListener("click", () => DIALOG.close());
  DIALOG.addEventListener("click", (e) => closeOnBackdropClick(e, DIALOG));
}

/**
 * closes the dialog when the click happened outside of its content.
 * a click on the backdrop reports the dialog itself as event target,
 * a click inside reports one of the child elements.
 * @param {MouseEvent} e - the click event
 * @param {HTMLDialogElement} dialog - the dialog to close
 */
function closeOnBackdropClick(e, dialog) {
  if (e.target === dialog) {
    dialog.close();
  }
}

window.addEventListener("keydown", (e) => {
  const pressedKey = keyMap[e.code];
  if (pressedKey) {
    keyboard[pressedKey] = true;
    updateSwimSound();
  }
});

window.addEventListener("keyup", (e) => {
  const pressedKey = keyMap[e.code];
  if (pressedKey) {
    keyboard[pressedKey] = false;
    updateSwimSound();
  }
});

function showTryAgainBtn() {
  document.getElementById("again_btn").classList.remove("hidden");
}

function createWorld() {
  showCanvas();
  initWorld();
  playBackgroundMusic();
  fadeOutStartscreen();
  fadeOutSubarea();
  animateTitleUp();
  fadeOutBackground();
  fadeInCanvas();
  showFullscreenButton();
  hideStartscreenAfterDelay();
}

function initWorld() {
  world = new World(canvas, keyboard);
}

function animateTitleUp() {
  const title = document.querySelector(".game-title");
  if (title) {
    title.classList.add("animate-up");
  }
}

function fadeOutStartscreen() {
  const startSection = document.querySelector(".start-section");
  if (startSection) {
    startSection.classList.add("fade-out");
  }
}

function fadeOutSubarea() {
  const subarea = document.querySelector(".wrapper-subarea");
  if (subarea) {
    subarea.classList.add("fade-out");
  }
}

function fadeOutBackground() {
  const background = document.querySelector(".background-layer");
  if (background) {
    background.classList.add("fade-out");
  }
}

function fadeInCanvas() {
  canvas.classList.add("fade-in");
}

function hideStartscreenAfterDelay() {
  setTimeout(() => {
    hideStartscreen();
  }, 2500);
}

function hideStartscreen() {
  const startSection = document.querySelector(".start-section");
  if (startSection) {
    startSection.classList.add("hidden");
  }
}

function hideCanvas() {
  canvas.classList.add("hidden");
}

function showCanvas() {
  canvas.classList.remove("hidden");
}

function showFullscreenButton() {
  const fullscreenBtn = document.getElementById("btn_fullscreen");
  if (fullscreenBtn) {
    fullscreenBtn.classList.remove("hidden");
  }
}

function hideFullscreenButton() {
  const fullscreenBtn = document.getElementById("btn_fullscreen");
  if (fullscreenBtn) {
    fullscreenBtn.classList.add("hidden");
  }
}

function toggleFullscreen() {
  const fullscreenElement = document.fullscreenElement;

  if (fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
}
