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

  START_BTN.addEventListener("click", () => createWorld());
  TRY_Again_BTN.addEventListener("click", () => location.reload());
}

window.addEventListener("keydown", (e) => {
  const pressedKey = keyMap[e.code];
  if (pressedKey) {
    keyboard[pressedKey] = true;
  }
});

window.addEventListener("keyup", (e) => {
  const pressedKey = keyMap[e.code];
  if (pressedKey) {
    keyboard[pressedKey] = false;
  }
});

function showTryAgainBtn() {
  document.getElementById("again_btn").classList.remove("hidden");
}

function createWorld() {
  showCanvas();
  world = new World(canvas, keyboard);
}

function hideCanvas() {
  canvas.classList.add("hidden");
}

function showCanvas() {
  canvas.classList.remove("hidden");
}
