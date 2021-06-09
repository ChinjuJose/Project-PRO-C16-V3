var fruit, fruit1, fruit1Img, fruit2, fruit2Img, fruit3, fruit3Img, fruit4, fruit4Img, sword, swordImg, enemy, enemyImg;

var gameOver, gameOverImg;

var fruitsGroup, enemyGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload() {

  //Loading images
  swordImg = loadImage("sword.png");
  enemyImg = loadAnimation("alien1.png", "alien2.png");
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  gameOverImg = loadImage("gameover.png");

}

function setup() {

  //Creating canvas
  createCanvas(600, 600);

  fruitsGroup = new Group();
  enemyGroup = new Group();


  sword = createSprite(50, 200, 20, 20);
  sword.addImage(swordImg);
  sword.scale = 0.7;

  gameOver = createSprite(300, 200, 30, 30);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;

}

function draw() {
  
  background("lightpink");
  drawSprites();
  text("Score: "+score, 500,100);

  if (gameState == PLAY) {
    
    gameOver.visible = false;
    sword.x = mouseX;
    sword.y = mouseY;
    spawnFruits();
    spawnEnemies();
    if (sword.isTouching(fruitsGroup)) {
      fruitsGroup.destroyEach();
      score = score + 2;
      
    } else if (sword.isTouching(enemyGroup)) {
    
      gameState = END;

    }

  } else if (gameState == END) {
    
      gameOver.visible = true;
      sword.visible = false;
      fruitsGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      fruitsGroup.destroyEach();
      enemyGroup.destroyEach();

  }

}

function spawnFruits() {

  if (frameCount % 60 == 0) {

    var selFruit = Math.round(random(1, 4));
    fruit = createSprite(500, 200, 20, 20);
    switch (selFruit) {

      case 1:
        fruit.addImage(fruit1Img);
        break;
      case 2:
        fruit.addImage(fruit2Img);
        break;
      case 3:
        fruit.addImage(fruit3Img);
        break;
      case 4:
        fruit.addImage(fruit4Img);
        break;
    }

    fruit.scale = 0.2;
    fruit.y = Math.round(random(50, 350));
    fruit.velocityX = -3;
    fruit.setLifetime = 200;
    fruitsGroup.add(fruit);

  }

}

function spawnEnemies() {

  if (frameCount % 95 == 0) {

    enemy = createSprite(550, 200, 20, 20);
    enemy.addAnimation("e1", enemyImg);
    enemy.scale = 0.9;
    enemy.y = Math.round(random(50, 350));
    enemy.velocityX = -3;
    enemy.setLifetime = 200;
    enemyGroup.add(enemy);

  }

}