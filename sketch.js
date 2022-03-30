var canvas;
var player,monster,ghost,background;
var playerImg,backgroundImg,monsterImg,ghostImg;
var monsterGroup;
var Play = 0;
var End = 1;
var gameState = Play;
var score = 0;
var solo;


function preload(){
    playerImg = loadAnimation('link-01.png','link-02.png','link-03.png','link-04.png','link-05.png','link-06.png','link-07.png','link-08.png','link-09.png','link-10.png')
    backgroundImg = loadImage('background.png');
    monsterImg = loadAnimation('monster_01.png','monster_02.png','monster_03.png','monster_04.png','monster_05.png')
    ghostImg = loadAnimation('ghost01.png','ghost02.png','ghost03.png','ghost04.png','ghost05.png','ghost06.png','ghost07.png','ghost08.png',)
}


function setup(){
    canvas = createCanvas(windowWidth, windowHeight)
    background = createSprite(windowWidth/2,-100);
    background.addImage(backgroundImg);
    background.scale = 4;

    background.velocityX = -4;

    solo = createSprite(windowWidth/2, windowHeight-20,windowWidth,10);
    solo.visible = false;



    monsterGroup = new Group();
    
    //criando o player 
    player = createSprite(windowWidth/5,windowHeight-100,50,50)
    player.addAnimation('link',playerImg);
    player.scale = 2;
    player.debug = true;
}


function draw(){
if(gameState == Play){
    if(background.x < 0){
        background.x = windowWidth/2;
    }
    if(keyDown("SPACE") && player.y > windowHeight-160 ){
        player.velocityY = -18;
    }
    player.velocityY = player.velocityY+ 0.65;
    player.collide(solo);
    spawnMonster();
    if(player.isTouching(monsterGroup)){
        gameState = End;
    }
    score = score+Math.round(frameCount/60);
}else if(gameState == End){
    background.velocityX = 0;
    monsterGroup.setVelocityXEach(0);
    monsterGroup.destroyEach();
}
    fill("white");
    drawSprites();
    textSize(30);
    text("pontuaçao: "+score,windowWidth -300, windowHeight-500);
    
}

function spawnMonster(){
  if(frameCount % 100 == 0){ 
    var monster = createSprite(windowWidth+20,windowHeight-100,50,50);
    monster.velocityX = -6;
    monster.lifetime = 300;
    monster.debug = true;
    var num = Math.round(random(1,2));
    switch(num){
        case 1:monster.addAnimation('monster',monsterImg);
        break;
        case 2:monster.addAnimation('ghost',ghostImg);
        monster.setCollider("rectangle",0,0,80,140)
        break;
        default: break;
    }
    monsterGroup.add(monster);

  }
}
