const MUTE_ICON = "assets/icons/mute.svg";
const SOUND_ICON = "assets/icons/sound.svg";
const FULLSCREEN_ICON = "assets/icons/fullscreen.svg";
const EXIT_FULLSCREEN_ICON = "assets/icons/exit_fullscreen.svg";

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

/**
 * handles the home button click: either goes home if game ended,
 * or pauses and shows confirmation dialog.
 */
function handleHomeButtonClick(dialog) {
  if (world?.isGameEnded) {
    goHome();
    return;
  }
  world.paused = true;
  stopSound("SWIM");
  stopSound("SNORE");
  dialog.showModal();
}

/**
 * wires the home button: if the game has already ended it returns to the
 * start screen right away, otherwise it pauses the world and asks for
 * confirmation first, since a run in progress would otherwise be lost
 * without warning. the dialog's native close event (escape, backdrop
 * click or the cancel button) unpauses again.
 */
function initHomeButton() {
  const HOME_BTN = document.getElementById("home_toggle");
  const HOME_DIALOG = document.getElementById("home_dialog");
  HOME_BTN.addEventListener("click", () => handleHomeButtonClick(HOME_DIALOG));
  document.getElementById("home_yes").addEventListener("click", () => goHome());
  HOME_DIALOG.addEventListener("close", () => {
    if (world) world.paused = false;
  });
}

/**
 * enables the home button once the game is running; it starts disabled
 * so there is nothing to go back from before a run has started.
 */
function enableHomeButton() {
  document.getElementById("home_toggle").disabled = false;
}
