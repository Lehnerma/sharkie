/** timeout handle for hideStartscreenAfterDelay, cancelled by goHome() if a run ends early. */
let startscreenHideTimeout;

/** slides the game title upward as part of the start transition. */
function animateTitleUp() {
  const title = document.querySelector(".game-title");
  if (title) {
    title.classList.add("animate-up");
    title.addEventListener(
      "transitionend",
      () => title.classList.add("title-animation-done"),
      { once: true }
    );
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
  startscreenHideTimeout = setTimeout(() => {
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

/**
 * reverses the start transition: brings the start screen, subarea,
 * background and title back to how they looked before the game started.
 */
function showStartscreen() {
  document.querySelector(".start-section")?.classList.remove("hidden", "fade-out");
  document.querySelector(".wrapper-subarea")?.classList.remove("fade-out");
  document.querySelector(".background-layer")?.classList.remove("fade-out");
  document.querySelector(".game-title")?.classList.remove("animate-up");
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
 * reveals the touch controls (movement d-pad on the canvas, action buttons
 * in the sidebar beside it); css only actually shows them on touch devices
 * (pointer: coarse), so this is a no-op on a mouse desktop. their grid columns
 * are reserved from the first paint, so revealing them causes no layout shift.
 */
function showTouchControls() {
  document.getElementById("touch_dpad")?.classList.remove("hidden");
  document.getElementById("touch_actions")?.classList.remove("hidden");
}

/** hides the on-screen touch controls again. */
function hideTouchControls() {
  document.getElementById("touch_dpad")?.classList.add("hidden");
  document.getElementById("touch_actions")?.classList.add("hidden");
}
