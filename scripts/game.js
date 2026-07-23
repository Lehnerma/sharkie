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
  //world = new World(canvas, keyboard);
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

const MUTE_ICON = "assets/icons/mute.svg";
const SOUND_ICON = "assets/icons/sound.svg";
const FULLSCREEN_ICON = "assets/icons/fullscreen.svg";
const EXIT_FULLSCREEN_ICON = "assets/icons/exit_fullscreen.svg";

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
  showTouchControls();
  hideStartscreenAfterDelay();
}

/**
 * reveals the touch controls (movement d-pad on the canvas, action buttons
 * in the sidebar beside it); css only actually shows them on touch devices
 * (pointer: coarse), so this is a no-op on a mouse desktop. their grid columns
 * are reserved from the first paint, so revealing them causes no layout shift.
 */
function showTouchControls() {
  document.getElementById("touch_dpad")?.classList.remove("hidden");
  document.getElementById("touch_actions")?.classList.remove("hidden");
}

/** creates a fresh World instance, replacing any previous one. */
function initWorld() {
  world = new World(canvas, keyboard);
}

/** slides the game title upward as part of the start transition. */
function animateTitleUp() {
  const title = document.querySelector(".game-title");
  if (title) {
    title.classList.add("animate-up");
  }
}

/** fades out the start screen section as part of the start transition. */
function fadeOutStartscreen() {
  const startSection = document.querySelector(".start-section");
  if (startSection) {
    startSection.classList.add("fade-out");
  }
}

/** fades out the subarea wrapper as part of the start transition. */
function fadeOutSubarea() {
  const subarea = document.querySelector(".wrapper-subarea");
  if (subarea) {
    subarea.classList.add("fade-out");
  }
}

/** fades out the background layer as part of the start transition. */
function fadeOutBackground() {
  const background = document.querySelector(".background-layer");
  if (background) {
    background.classList.add("fade-out");
  }
}

/** fades the canvas in as part of the start transition. */
function fadeInCanvas() {
  canvas.classList.add("fade-in");
}

/**
 * hides the start screen once its fade-out transition has had time to
 * finish, so it doesn't just disappear mid-animation.
 */
function hideStartscreenAfterDelay() {
  setTimeout(() => {
    hideStartscreen();
  }, 2500);
}

/** hides the start screen section entirely (display: none via .hidden). */
function hideStartscreen() {
  const startSection = document.querySelector(".start-section");
  if (startSection) {
    startSection.classList.add("hidden");
  }
}

/** hides the canvas. */
function hideCanvas() {
  canvas.classList.add("hidden");
}

/** shows the canvas. */
function showCanvas() {
  canvas.classList.remove("hidden");
}

/**
 * wires the fullscreen button, mirroring the mute button. a click toggles
 * fullscreen and the fullscreenchange event keeps the icon in sync even when
 * the user leaves fullscreen with the escape key.
 */
function initFullscreenButton() {
  const FULLSCREEN_BTN = document.getElementById("fullscreen_toggle");
  FULLSCREEN_BTN.addEventListener("click", () => toggleFullscreen());
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  updateFullscreenButton();
}

/**
 * enables the fullscreen button once the game is running; it starts disabled
 * so fullscreen is only possible during play.
 */
function enableFullscreenButton() {
  document.getElementById("fullscreen_toggle").disabled = false;
}

/**
 * shows the current fullscreen state on the button: the exit icon and a
 * pressed state while in fullscreen, the enter icon otherwise.
 */
function updateFullscreenButton() {
  const FULLSCREEN_BTN = document.getElementById("fullscreen_toggle");
  const active = Boolean(document.fullscreenElement);
  FULLSCREEN_BTN.setAttribute("aria-pressed", String(active));
  FULLSCREEN_BTN.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
  FULLSCREEN_BTN.querySelector("img").src = active ? EXIT_FULLSCREEN_ICON : FULLSCREEN_ICON;
}

/**
 * toggles fullscreen on the canvas wrapper (not the bare canvas) so the mute
 * and fullscreen buttons stay visible and usable while in fullscreen.
 */
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.getElementById("canvas_wrapper").requestFullscreen();
  }
}
