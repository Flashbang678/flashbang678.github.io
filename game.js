var isGameOver;
var score;

var GRAVITY = 0.3;
var JUMP = -8;
var DIVE = -8;
var BOOST = 15;

var GroundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;

var player;
var playerImage;

var obstacleSprites;

function preload(){
playerImage=loadImage("./spaceship.png")
}



function setup() {
    isGameOver = false;
    score = 0;
    
    createCanvas(window.innerWidth-30, window.innerHeight-40);
    background(250, 300, 350);
    groundSprites = new Group();
    
    numGroundSprites = width/GROUND_SPRITE_WIDTH+1;

    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
    
    player = createSprite(100, height 75, 50, 50);
    
    obstacleSprites = new Group();
    player.addImage(playerImage);
    player.scale=.25;
}

function draw() {
    if (isGameOver) {
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
        text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
    } else {
        background(250, 300, 350);
        
        if (keyDown(UP_ARROW)) {
            player.velocity.y = JUMP;
        }
        if (keyDown(DOWN_ARROW)) {
            player.velocity.y = DIVE;
        }
        
        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
            groundSprites.add(firstGroundSprite);
        }
        
        if (random() > 0.95) {
            var obstacle = createSprite(camera.position.x + width, random(0, (height-50)-15), 30, 30);
            obstacleSprites.add(obstacle);
        }
        
        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
            removeSprite(firstObstacle);
        }
        
        groundSprites.overlap(player, endGame);
        obstacleSprites.overlap(player, endGame);
        
        drawSprites();
        
        score = score + 1;
        textAlign(CENTER);
        text(score, camera.position.x, 10);
        
        if (keyDown(RIGHT_ARROW)){
            player.position.x = player.position.x + 15 + BOOST ;
            camera.position.x = player.position.x + (width/16) + BOOST;
        }else {player.position.x = player.position.x + 10 ;
            camera.position.x = player.position.x + (width/16)}
    } 
}

function endGame() {
    isGameOver = true;
}

function mouseClicked() {
  if (isGameOver) {
      
    for (var n = 0; n < numGroundSprites; n++) {
      var groundSprite = groundSprites[n];
      groundSprite.position.x = n*50;
    }

    player.position.x = 100;
    player.position.y = height-75;

    obstacleSprites.removeSprites();
    
    score = 0;
    isGameOver = false;
  }
}
