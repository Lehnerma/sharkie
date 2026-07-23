const SOUND_PATH = "assets/sound/";

/**
 * every sound of the game. base is the hand tuned volume of a single
 * sound relative to the others, group decides which slider will control
 * it later. the ready to play Audio object is stored in audio.
 */
const SOUNDS = {
  BACKGROUND_MUSIC: { file: "background_music.mp3", base: 0.3, group: "music", loop: true },
  SWIM: { file: "swim_sharkie2.mp3", base: 0.5, group: "sfx", loop: true },
  SNORE: { file: "snore.wav", base: 0.5, group: "sfx", loop: true },
  BUBBLE: { file: "bubble.mp3", base: 0.2, group: "sfx" },
  BOSS_APPEAR: { file: "boss_apear.mp3", base: 0.7, group: "sfx" },
  FIN_SLAP: { file: "fin_slap.wav", base: 0.5, group: "sfx" },
  FIN_HIT: { file: "fin_hit.wav", base: 0.8, group: "sfx" },
  COIN_COLLECT: { file: "coin_collect.wav", base: 0.2, group: "sfx" },
  BOTTLE_COLLECT: { file: "bottle_collect.wav", base: 0.5, group: "sfx" },
  ELECTRIC_HIT: { file: "electric_hit.wav", base: 0.5, group: "sfx" },
  GAME_OVER: { file: "game_over.wav", base: 0.5, group: "sfx" },
  GAME_WON: { file: "game_won.wav", base: 0.5, group: "sfx" },
  POISON_HIT_SHARKIE: { file: "poison_hit_sharkie.wav", base: 0.5, group: "sfx" },
  ENEMY_HIT: { file: "poison_hit_endboss.wav", base: 0.5, group: "sfx" },
  HEALING: { file: "healing.wav", base: 0.5, group: "sfx" },
  SHOP_BUYING: { file: "shop_buying.wav", base: 0.5, group: "sfx" },
};

/** volume of every group, multiplied on top of the base volume. */
const VOLUMES = {
  master: 1,
  music: 1,
  sfx: 1,
};

const MOVEMENT_KEYS = ["UP", "DOWN", "LEFT", "RIGHT", "W", "A", "S", "D"];

const VOLUME_STORAGE_KEY = "sharkie_volumes";

let musicPreviewTimeout;

loadVolumes();
createSounds();

/**
 * restores the volumes of the last visit. a broken storage entry is
 * ignored on purpose, because a thrown error here would stop the whole
 * script and the game would never start.
 */
function loadVolumes() {
  try {
    const STORED = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (STORED) {
      Object.assign(VOLUMES, JSON.parse(STORED));
    }
  } catch (error) {
    console.warn("Stored volumes could not be read:", error);
  }
}

/**
 * keeps the volumes for the next visit, the try again button reloads
 * the page and would reset them otherwise.
 */
function saveVolumes() {
  localStorage.setItem(VOLUME_STORAGE_KEY, JSON.stringify(VOLUMES));
}

/**
 * sets the volume of one group and applies it to every sound at once.
 * @param {string} group - master, music or sfx
 * @param {number} value - volume between 0 and 1
 */
function setVolume(group, value) {
  VOLUMES[group] = value;
  applyAllVolumes();
  saveVolumes();
}

/**
 * builds the Audio object for every entry in SOUNDS and applies
 * its starting volume.
 */
function createSounds() {
  for (let name in SOUNDS) {
    const SOUND = SOUNDS[name];
    SOUND.audio = new Audio(SOUND_PATH + SOUND.file);
    SOUND.audio.loop = SOUND.loop || false;
    applyVolume(SOUND);
  }
}

/**
 * the browser only knows one absolute volume per audio element, so the
 * base volume, its group and the master volume have to be multiplied
 * by hand every time one of them changes.
 * @param {Object} sound - an entry of SOUNDS
 */
function applyVolume(sound) {
  sound.audio.volume = sound.base * VOLUMES[sound.group] * VOLUMES.master;
}

/**
 * recalculates the volume of every sound, used after a slider moved.
 */
function applyAllVolumes() {
  for (let name in SOUNDS) {
    applyVolume(SOUNDS[name]);
  }
}

/**
 * plays a short taste of a group while its slider is being adjusted, so
 * the user can hear the new volume. sfx plays one short effect, music and
 * master play the first ~1.5s of the background music and then stop it.
 * @param {string} group - master, music or sfx
 */
function previewVolume(group) {
  if (group === "sfx") {
    playSound("COIN_COLLECT");
  } else {
    playSound("BACKGROUND_MUSIC");
    clearTimeout(musicPreviewTimeout); // don't let overlapping previews cut each other short
    musicPreviewTimeout = setTimeout(() => stopSound("BACKGROUND_MUSIC"), 1500);
  }
}

/**
 * plays a sound from the beginning, so it can be retriggered while it
 * is still running.
 * @param {string} name - key of the sound in SOUNDS
 */
function playSound(name) {
  SOUNDS[name].audio.currentTime = 0;
  SOUNDS[name].audio.play();
}

/**
 * continues a sound where it stopped instead of restarting it. needed
 * for looping sounds that would stutter on a restart.
 * @param {string} name - key of the sound in SOUNDS
 */
function resumeSound(name) {
  SOUNDS[name].audio.play();
}

/**
 * stops a sound and keeps its current position.
 * @param {string} name - key of the sound in SOUNDS
 */
function stopSound(name) {
  SOUNDS[name].audio.pause();
}

/** remembers the master volume from before muting, so unmute can restore it. */
let masterVolumeBeforeMute = 1;

/**
 * whether the game is currently muted. muting simply pulls the master
 * volume down to zero, so a master of exactly 0 means muted.
 * @returns {boolean}
 */
function isMuted() {
  return VOLUMES.master === 0;
}

/**
 * mutes everything by setting the master volume to zero. the previous
 * value is kept so unmute can bring it back. on purpose this is not
 * persisted, a fresh page load always starts with sound on.
 */
function muteSound() {
  masterVolumeBeforeMute = VOLUMES.master || 1;
  VOLUMES.master = 0;
  applyAllVolumes();
}

/**
 * restores the master volume from before muting and restarts the
 * background music from the beginning.
 */
function unmuteSound() {
  VOLUMES.master = masterVolumeBeforeMute;
  applyAllVolumes();
  playSound("BACKGROUND_MUSIC");
}

/**
 * flips between muted and unmuted, used by the mute button.
 */
function toggleMute() {
  if (isMuted()) {
    unmuteSound();
  } else {
    muteSound();
  }
}

/**
 * starts the swim sound while a movement key is held down and stops it
 * as soon as all of them are released.
 */
function updateSwimSound() {
  if (!world) return;
  const isMoving = MOVEMENT_KEYS.some((key) => keyboard[key]);
  if (isMoving) {
    resumeSound("SWIM");
  } else {
    stopSound("SWIM");
  }
}
