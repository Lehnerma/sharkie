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
  KeyD: "D",
  KeyW: "W",
  KeyA: "A",
  KeyS: "S",
};

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
  // console.log(`key  code: ${e.code}`); // logs out the key codes for the btns
  const pressedKey = keyMap[e.code];
  // console.log(pressedKey);
  
  if (pressedKey) {
    keyboard[pressedKey] = true;
  }
});

window.addEventListener("keyup", (e) => {
  // console.log(`key  code: ${e.code}`); // logs out the key codes for the btns
  const pressedKey = keyMap[e.code];
  if (pressedKey) {
    keyboard[pressedKey] = false;
  }
});
