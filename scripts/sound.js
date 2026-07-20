const BACKGROUND_MUSIC = new Audio("assets/sound/background_music.mp3");
BACKGROUND_MUSIC.loop = true;
BACKGROUND_MUSIC.volume = 0.3;

const SWIM_SOUND = new Audio("assets/sound/swim_sharkie2.mp3");
SWIM_SOUND.loop = true;
SWIM_SOUND.volume = 0.5;

const BUBBLE_SOUND = new Audio("assets/sound/bubble.mp3");
BUBBLE_SOUND.volume = 0.2;

const BOSS_APPEAR_SOUND = new Audio("assets/sound/boss_apear.mp3");
BOSS_APPEAR_SOUND.volume = 0.7;

const FIN_SLAP_SOUND = new Audio("assets/sound/fin_slap.wav");
FIN_SLAP_SOUND.volume = 0.5;

const FIN_HIT_SOUND = new Audio("assets/sound/fin_hit.wav");
FIN_HIT_SOUND.volume = 0.8;

const COIN_COLLECT_SOUND = new Audio("assets/sound/coin_collect.wav");
COIN_COLLECT_SOUND.volume = 0.2;

const BOTTLE_COLLECT_SOUND = new Audio("assets/sound/bottle_collect.wav");
BOTTLE_COLLECT_SOUND.volume = 0.5;

const ELECTRIC_HIT_SOUND = new Audio("assets/sound/electric_hit.wav");
ELECTRIC_HIT_SOUND.volume = 0.5;

const GAME_OVER_SOUND = new Audio("assets/sound/game_over.wav");
GAME_OVER_SOUND.volume = 0.5;

const GAME_WON_SOUND = new Audio("assets/sound/game_won.wav");
GAME_WON_SOUND.volume = 0.5;

const POISON_HIT_SHARKIE_SOUND = new Audio("assets/sound/poison_hit_sharkie.wav");
POISON_HIT_SHARKIE_SOUND.volume = 0.5;

const ENEMY_HIT_SOUND = new Audio("assets/sound/poison_hit_endboss.wav");
ENEMY_HIT_SOUND.volume = 0.5;

const HEALING_SOUND = new Audio("assets/sound/healing.wav");
HEALING_SOUND.volume = 0.5;

const SHOP_BUYING_SOUND = new Audio("assets/sound/shop_buying.wav");
SHOP_BUYING_SOUND.volume = 0.5;

const MOVEMENT_KEYS = ["UP", "DOWN", "LEFT", "RIGHT", "W", "A", "S", "D"];

function updateSwimSound() {
  if (!world) return;
  const isMoving = MOVEMENT_KEYS.some((key) => keyboard[key]);
  if (isMoving) {
    SWIM_SOUND.play();
  } else {
    SWIM_SOUND.pause();
  }
}

function playBackgroundMusic() {
  BACKGROUND_MUSIC.currentTime = 0;
  BACKGROUND_MUSIC.play();
}

function stopBackgroundMusic() {
  BACKGROUND_MUSIC.pause();
}

function playBubbleSound() {
  BUBBLE_SOUND.currentTime = 0;
  BUBBLE_SOUND.play();
}

function playBossAppearSound() {
  BOSS_APPEAR_SOUND.currentTime = 0;
  BOSS_APPEAR_SOUND.play();
}

function playFinSlapSound() {
  FIN_SLAP_SOUND.currentTime = 0;
  FIN_SLAP_SOUND.play();
}

function playFinHitSound() {
  FIN_HIT_SOUND.currentTime = 0;
  FIN_HIT_SOUND.play();
}

function playCoinCollectSound() {
  COIN_COLLECT_SOUND.currentTime = 0;
  COIN_COLLECT_SOUND.play();
}

function playBottleCollectSound() {
  BOTTLE_COLLECT_SOUND.currentTime = 0;
  BOTTLE_COLLECT_SOUND.play();
}

function playElectricHitSound() {
  ELECTRIC_HIT_SOUND.currentTime = 0;
  ELECTRIC_HIT_SOUND.play();
}

function playGameOverSound() {
  GAME_OVER_SOUND.currentTime = 0;
  GAME_OVER_SOUND.play();
}

function playGameWonSound() {
  GAME_WON_SOUND.currentTime = 0;
  GAME_WON_SOUND.play();
}

function playPoisonHitSharkieSound() {
  POISON_HIT_SHARKIE_SOUND.currentTime = 0;
  POISON_HIT_SHARKIE_SOUND.play();
}

function playEnemyHitSound() {
  ENEMY_HIT_SOUND.currentTime = 0;
  ENEMY_HIT_SOUND.play();
}

function playHealingSound() {
  HEALING_SOUND.currentTime = 0;
  HEALING_SOUND.play();
}

function playShopBuyingSound() {
  SHOP_BUYING_SOUND.currentTime = 0;
  SHOP_BUYING_SOUND.play();
}
