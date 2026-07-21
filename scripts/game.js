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

  initDialogs();
  initVolumeSliders();
  initMuteButton();
}

const MUTE_ICON = "assets/icons/mute.svg";
const SOUND_ICON = "assets/icons/sound.svg";

/**
 * wires the mute button to the sound module. every click toggles the
 * mute state and refreshes button and master slider to match.
 */
function initMuteButton() {
  const MUTE_BTN = document.getElementById("mute_toggle");
  MUTE_BTN.addEventListener("click", () => {
    toggleMute();
    updateMuteButton();
    syncMasterSlider();
  });
  updateMuteButton();
}

/**
 * shows the current mute state on the button: the crossed out icon and a
 * pressed state while muted, the speaker icon while sound is on.
 */
function updateMuteButton() {
  const MUTE_BTN = document.getElementById("mute_toggle");
  const muted = isMuted();
  MUTE_BTN.setAttribute("aria-pressed", String(muted));
  MUTE_BTN.setAttribute("aria-label", muted ? "Unmute sound" : "Mute sound");
  MUTE_BTN.querySelector("img").src = muted ? MUTE_ICON : SOUND_ICON;
}

/**
 * mirrors the current master volume onto its slider and value label, so
 * muting from the button keeps the sound dialog in sync.
 */
function syncMasterSlider() {
  const SLIDER = document.getElementById("volume_master");
  const PERCENT = Math.round(VOLUMES.master * 100);
  SLIDER.value = PERCENT;
  showVolumeValue("master", PERCENT);
}

/**
 * connects every slider to the sound group named in data-volume. the
 * input event fires while dragging, so the volume changes right away
 * instead of only after releasing the slider. the change event fires once
 * on release and plays a short preview at the new volume.
 */
function initVolumeSliders() {
  document.querySelectorAll("[data-volume]").forEach((slider) => {
    const GROUP = slider.dataset.volume;

    slider.value = VOLUMES[GROUP] * 100;
    showVolumeValue(GROUP, slider.value);

    slider.addEventListener("input", () => {
      setVolume(GROUP, slider.value / 100);
      showVolumeValue(GROUP, slider.value);
      if (GROUP === "master") updateMuteButton();
    });

    slider.addEventListener("change", () => {
      previewVolume(GROUP);
    });
  });
}

/**
 * writes the current percentage next to a slider.
 * @param {string} group - master, music or sfx
 * @param {string} percent - slider value between 0 and 100
 */
function showVolumeValue(group, percent) {
  document.querySelector(`[data-volume-value="${group}"]`).textContent = `${percent}%`;
}

/**
 * wires up every dialog on the page. a button opens the dialog whose id
 * it names in data-dialog, every element with data-dialog-close closes
 * its own dialog. escape is handled natively by showModal().
 */
function initDialogs() {
  document.querySelectorAll("[data-dialog]").forEach((btn) => {
    const DIALOG = document.getElementById(btn.dataset.dialog);
    btn.addEventListener("click", () => DIALOG.showModal());
  });

  document.querySelectorAll("[data-dialog-close]").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest("dialog").close());
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (e) => closeOnBackdropClick(e, dialog));
  });
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
  playSound("BACKGROUND_MUSIC");
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
