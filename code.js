var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["cfe68976-7355-4329-8b78-9f8f6dac9aca","86fc7e3e-0eb1-4f86-ad89-54f87ef93988","7dfe71bc-c639-474a-8ba9-b8b82c122adf","b3419dd0-30ec-4f7d-9971-b904ec82c17c"],"propsByKey":{"cfe68976-7355-4329-8b78-9f8f6dac9aca":{"name":"kid_outline_1","sourceUrl":"assets/api/v1/animation-library/gamelab/SurSAnaFy8MyK4YEl10XiJLZdWI5yNl5/category_people/kid_outline.png","frameSize":{"x":180,"y":250},"frameCount":1,"looping":true,"frameDelay":2,"version":"SurSAnaFy8MyK4YEl10XiJLZdWI5yNl5","categories":["people"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":180,"y":250},"rootRelativePath":"assets/api/v1/animation-library/gamelab/SurSAnaFy8MyK4YEl10XiJLZdWI5yNl5/category_people/kid_outline.png"},"86fc7e3e-0eb1-4f86-ad89-54f87ef93988":{"name":"cny_10_1","sourceUrl":"assets/api/v1/animation-library/gamelab/GfFR49TKDB6FsLKZqtTUh.aukfrzjohd/category_emoji/cny_10.png","frameSize":{"x":198,"y":202},"frameCount":1,"looping":true,"frameDelay":2,"version":"GfFR49TKDB6FsLKZqtTUh.aukfrzjohd","categories":["emoji"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":198,"y":202},"rootRelativePath":"assets/api/v1/animation-library/gamelab/GfFR49TKDB6FsLKZqtTUh.aukfrzjohd/category_emoji/cny_10.png"},"7dfe71bc-c639-474a-8ba9-b8b82c122adf":{"name":"dart_1","sourceUrl":"assets/api/v1/animation-library/gamelab/3ehjaVxoVkY9fteEkntjtCQ10H9QWqFA/category_sports/dart.png","frameSize":{"x":393,"y":163},"frameCount":1,"looping":true,"frameDelay":2,"version":"3ehjaVxoVkY9fteEkntjtCQ10H9QWqFA","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":163},"rootRelativePath":"assets/api/v1/animation-library/gamelab/3ehjaVxoVkY9fteEkntjtCQ10H9QWqFA/category_sports/dart.png"},"b3419dd0-30ec-4f7d-9971-b904ec82c17c":{"name":"dart_2","sourceUrl":null,"frameSize":{"x":393,"y":163},"frameCount":1,"looping":true,"frameDelay":12,"version":"RSxbovYyYMrIu4bcJqc.7T3X2LjNo_hu","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":163},"rootRelativePath":"assets/b3419dd0-30ec-4f7d-9971-b904ec82c17c.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//create player
  var player = createSprite(200,380,20,20);

player.setAnimation("kid_outline_1");
player.scale = 0.2;

var flower = createSprite(randomNumber(50,350),randomNumber(50,350),20,20);

flower.setAnimation("cny_10_1");
flower.scale = 0.2;


var darts = createGroup();

var dart1 = createSprite (10, randomNumber(100,330),20,20);
var dart2 = createSprite(390,randomNumber(100,330),20,20);
dart1.setAnimation("dart_1");
darts.add(dart1);
dart1.scale = 0.10;
dart2.setAnimation("dart_2");
darts.add(dart2);
dart2.scale = 0.10;

dart1.velocityX = 10;
dart2.velocityX = -10;


var score = 0;

var gameState = "play";

function draw() {
  background("white");
  
  //show game name
  textSize(15);
  fill("green");
  text("Collect 10 flowers to win. BEWARE of Shooting Darts!", 30,15);
  
  //show score
  textSize(15);
  fill("blue");
  text("Score: " + score, 310, 385);
  
 //create edges
  createEdgeSprites();
  player.collide(edges);
  
  
  if(gameState == "play")
  {
    //movement of player and darts
      movePlayer();
      moveDart();
      
    if(flower.isTouching(player)){
      score = score + 1; 
      flower.destroy();
      flower = createSprite(randomNumber(50,350),randomNumber(50,350),20,20);
      flower.setAnimation("cny_10_1");
      flower.scale = 0.2;
    
      if(score == 10)  {
        gameState = "win";
      }
    }
    if(player.isTouching(darts)){
      playSound("assets/category_explosion/8bit_explosion.mp3");
      gameState = "lose";
      darts.setVelocityEach(0,0);
    }
  }
  
  if(gameState == "win") {
    textSize(20);
    fill("green");
    text("You Won!",150,320);
  }
  
  if(gameState == "lose") {
    textSize(20);
    fill("red");
    text("Try Again!",150,320);  
  }
  drawSprites();
}

// function to move player
function movePlayer(){
  
  if(keyDown("up")){
    player.y = player.y-15;
  }
  if(keyDown("down")){
    player.y = player.y+15;
  }
  
  if(keyDown("right")){
    player.x = player.x+15;
  }
  
  if(keyDown("left")) {
    player.x = player.x-15;
  }
}

// function to move darts

function moveDart(){
  
  if(dart1.x < 0 || dart1.x > 400) {
    dart1 = createSprite (10, randomNumber(100,330),20,20);
    dart1.setAnimation("dart_1");
    dart1.scale = 0.10;
    dart1.velocityX = 10;
    darts.add(dart1);
  }
  
  if(dart2.x < 0 || dart2.x > 400) {
    dart2 = createSprite (390, randomNumber(100,330),20,20);
    dart2.setAnimation("dart_2");
    dart2.scale = 0.10;
    darts.add(dart2);
    dart2.velocityX = -10;
  }
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
