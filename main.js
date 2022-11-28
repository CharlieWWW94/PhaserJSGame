import Phaser from "phaser";

let cursors;
let character;
let isRunning;
let isJumping;
let platforms;

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1024,
  height: 389,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      //shows box and trajectory if true
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
});

function preload() {
  //background image
  this.load.image("background", "./assets/metro_tunnel_big.png");

  //Create atlas for game objects
  this.load.atlas(
    "nature",
    "./assets/tree_spritesheet.png",
    "./assets/sprites.json"
  );

  //character directional spritesheets;

  this.load.spritesheet("idle", "./assets/idle_sheet.png", {
    frameWidth: 80,
    frameHeight: 63,
  });
  this.load.spritesheet("run", "./assets/run_sheet.png", {
    frameWidth: 80,
    frameHeight: 80,
  });
  this.load.spritesheet("jump", "./assets/jump_sheet.png", {
    frameWidth: 80,
    frameHeight: 80,
  });
}

function create() {
  //Listens for arrow key presses
  cursors = this.input.keyboard.createCursorKeys();
  //Adds image and terrain to scene
  this.add.image(512, 194, "background");
  platforms = this.physics.add.staticGroup();

  platforms.create(10, 75, "nature", "sprite13").refreshBody();
  platforms.create(25, 75, "nature", "sprite13").refreshBody();
  platforms.create(40, 75, "nature", "sprite14").refreshBody();

  for (let i = 112; i < 202; i += 15) {
    platforms.create(i, 144, "nature", "sprite2").refreshBody();
    platforms.create(i, 156, "nature", "sprite6").refreshBody();
  }
  for (let i = 342; i < 412; i += 15) {
    platforms.create(i, 204, "nature", "sprite2").refreshBody();
    platforms.create(i, 216, "nature", "sprite6").refreshBody();
  }

  for (let i = 512; i < 682; i += 15) {
    platforms.create(i, 150, "nature", "sprite2").refreshBody();
    platforms.create(i, 165, "nature", "sprite6").refreshBody();
  }
  //Adds character to screen;
  character = this.physics.add.sprite(40, 0, "idle");
  character.setScale(1.4);
  character.setBounce(0.2);
  character.setCollideWorldBounds(true);
  this.physics.add.collider(character, platforms);

  //Character animations:

  this.anims.create({
    key: "jump",
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("jump", { start: 1, end: 18 }),
  });

  this.anims.create({
    key: "left",
    frameRate: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("run", { start: 1, end: 13 }),
  });

  this.anims.create({
    key: "right",
    frameRate: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("run", { start: 1, end: 13 }),
  });

  this.anims.create({
    key: "idle",
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("idle", { start: 1, end: 13 }),
  });
}

function update() {
  //Change animation based on user input
  if (cursors.left.isDown) {
    isRunning = true;
    character.setVelocityX(-290);
    character.flipX = true;
    character.anims.play("left", true);
  } else if (cursors.right.isDown) {
    isRunning = true;
    character.flipX = false;
    character.setVelocityX(290);
    character.anims.play("right", true);
  } else if (cursors.up.isDown) {
    isJumping = true;
    character.anims.play("jump", true);
    character.setVelocityY(-180);
  } else {
    isJumping = false;
    isRunning = false;
    character.setVelocityX(0);
    character.anims.play("idle", true);
  }
}
