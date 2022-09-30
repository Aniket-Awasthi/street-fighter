var player1, player2;
var base;

var platformImg;
var baseImg
var player1Stand;
var player1WalkF, player1WalkB, player1jump;
var playerPunch;
var punch;
var player2state = 0;
var player2Stand;
var player1Life = 600;
var player2Life = 600;

var gameOver;
var gameOverImg;

var player2Walk;
var gameState = 1;;
var player1Dead;
var gameWin;
var gameWinImg;
var player2Punch;
var player2Jump;

var player2Dead;
var reset,resetImg;
var img;
var player1Victory;
var player2Victory;
var myInterval;
var controls;




var bgSound;
var punch1;
var punch2;
var scr;
var jumpS;
var gameOverS;
var YouWin;
function preload() {
    baseImg = loadImage("./Images/bg.jpg");
    platformImg = loadImage("./Images/platform1.jpg");
    player1Stand = loadAnimation("./Images/1.png", "./Images/2.png", "./Images/3.png");
    player1WalkF = loadAnimation("./Images/walk1.png", "./Images/walk2.png", "./Images/walk3.png", "./Images/walk4.png", "./Images/walk5.png");
    player1WalkB = loadAnimation("./Images/walk6.png", "./Images/walk7.png", "./Images/walk8.png", "./Images/walk9.png", "./Images/walk10.png");
    player1jump = loadAnimation("./Images/jump.png");
    playerPunch = loadAnimation("./Images/punch1.png", "./Images/punch2.png");
    player2Stand = loadAnimation("./Images/2p1.png", "./Images/2p2.png", "./Images/2p3.png", "./Images/2p4.png");
    player2Walk = loadAnimation("./Images/2pW1.png", "./Images/2pW2.png", "./Images/2pW3.png", "./Images/2pW4.png");
    gameOverImg = loadImage("./Images/gameover.png");
    player1Dead = loadAnimation("./Images/1PD.png");
    gameWinImg = loadImage("./Images/1PW.png");
    player2Dead = loadAnimation("./Images/p2D.png");
    player2Punch= loadAnimation("./Images/2pP1.png","./Images/2pP2.png","./Images/2pP3.png","./Images/2pP4.png");
    resetImg = loadImage("./Images/reset.png");
    img = loadImage("./Images/img.png");
    player1Victory = loadAnimation("./Images/player1Victory.png");
    player2Victory = loadAnimation("./Images/player2Victory.png");
    player2Jump = loadAnimation("./Images/player2Jump.png");
    controls = loadImage("./Images/controls.png");
    bgSound = loadSound("bg.mp3");
    punch1 = loadSound("PUNCH.mp3");
    punch2 = loadSound("punch2.mp3");
    scr = loadSound("scr.mp3")
    jumpS = loadSound("jump.mp3");
    gameOverS = loadSound("gameOver.mp3");
    YouWin = loadSound("win.wav");
}

function setup() {
    createCanvas(2304, 1082);
  
    platformImg.resize(2304, 1082 / 4);
    player1 = createSprite(2304 / 2 - 200, 660, 80, 160);
    player2 = createSprite(2304 / 2 + 200, 660, 80, 160);
    base = createSprite(2304 / 2, 1082 - 100, 2304, 1082 / 4);
    base.addImage(platformImg);
    player1.addAnimation("playerstanding", player1Stand);
    player1.addAnimation("playerWalkingForward", player1WalkF);
    player1.addAnimation("playerWalkingbackward", player1WalkB);
    player1.addAnimation("playerjump", player1jump);
    player1.addAnimation("playerPunch", playerPunch);
    player1.addAnimation("palyerDead", player1Dead);
    player1.addAnimation("player1Win",player1Victory);
    player1.scale = 3;

    player2.addAnimation("player2stand", player2Stand);
    player2.addAnimation("player2Walk", player2Walk);
    player2.addAnimation("player2Dead", player2Dead);
    player2.addAnimation("player2Punch", player2Punch);
    player2.addAnimation("player2Win",player2Victory);
    player2.addAnimation("player2Jump",player2Jump);
    player2.scale = 2;

    player1.collide(base);
    player2.velocityY = 1082 / 50;
    player2.collide(base);

    gameOver = createSprite(2304 / 2, 400, 800, 200);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 5;
    gameOver.visible = false;
    gameWin = createSprite(2304 / 2, 400, 800, 200);
    gameWin.addImage(gameWinImg);
    gameWin.scale = 2.5;
    gameWin.visible = false;

    reset = createSprite(2304 / 2, 600, 200, 200);
    reset.addImage(resetImg);
    reset.visible = false;
    document.body.style.zoom = "67%";
    
    bgSound.setVolume(0.4);
 bgSound.play();
    //punch.debug = true;

    //player2.debug =true;
    //player1.debug =true;


}

function draw() {
    background(baseImg);

    image(img,2304 / 2-350,40,700,200);
    image(controls,20,200,170,200);
    stroke("black");
    strokeWeight(5);
    fill("white");
    rect(150, 100, 600, 40);
    fill("red");
    rect(150, 100, player1Life, 40);
    fill("white");
    rect(2304 - 750, 100, 600, 40);
    fill("red");
    rect(2304 - 750, 100, player2Life, 40);




    console.log(2304,1082);

    if (gameState === 1) {

        if (keyWentDown(RIGHT_ARROW)) {
            if (player1.y > 650) {
                player1.changeAnimation("playerWalkingForward", player1WalkF);
            }
            player1.velocityX = 2304 / 70;

        } else if (keyWentUp(RIGHT_ARROW)) {
            player1.changeAnimation("playerstanding", player1Stand);
            player1.velocityX = 0;


        }
        if (keyWentDown(LEFT_ARROW)) {
            if (player1.y > 650) {
                player1.changeAnimation("playerWalkingbackward", player1WalkB);
            }
            player1.velocityX -= 2304 / 70;
            player2.velocityX -= 2304 / 100;
            player2.changeAnimation("player2Walk", player2Walk);
        } else if (keyWentUp(LEFT_ARROW)) {

            player1.changeAnimation("playerstanding", player1Stand);

            player1.velocityX = 0;
            player2.velocityX = 0;
            player2.changeAnimation("player2stand", player2Stand);

        }
        if (keyDown(UP_ARROW) && player1.y > 640) {
            //     player1.changeAnimation("playerjump",player1jump);
            jumpS.play();
            player1.velocityY = -25;
        } player1.velocityY += 1.2;
        if (player1.y < 650) {
            player1.changeAnimation("playerjump", player1jump);

        }
        if (keyWentDown(32)) {
            player1.changeAnimation("playerPunch", playerPunch);
            if (player1.isTouching(player2)) {
                if (player2Life > 0) {
                    scr.play(); 
                    punch1.play();
                  
                    player2Life = player2Life - 25;

                }

                player2.x = player2.x + 200;
                console.log("Punch")
            }
            // punch.width = 180;
            //  punch.x = player1.x +120;
        } else if (keyWentUp(32)) {
            player1.changeAnimation("playerstanding", player1Stand);
        }
    }
    //else{

    //unch.x = player1.x;


    //}
    //punch.y = player1.y -70;
    player1.collide(base);
    player2.collide(base);
    player1.collide(player2);
    player2.collide(player1);


    //if(player1.isTouching(player2)){

    //console.log("Punch")
    //}


    if (player1.x > player2.x - 220) {
        player2state = round(random(1, 2));
       

        console.log(player2state);
    }

    if (player2state === 1) {
        player2.changeAnimation("player2Punch", player2Punch);
     myInterval = setInterval(changeNormal,500);

       
        console.log("punchc");
        
        if (player1Life > 0) {
            scr.play(); 
            punch2.play();
            player1Life = player1Life - 100;
        }
        player1.x = player1.x - 200;
       
        console.log("player life is :" + player1Life);
        player2state = 0;

    }
    if (player2state === 2 && player2.y > 650) {
        player2.changeAnimation("player2Jump",player2Jump);
        myInterval = setInterval(changeNormal,1200);
        jumpS.play();
        player2.velocityY = -25;
        player2.x = player2.x + 20;
        console.log("jump");
        player2state = 0;
    } player2.velocityY += 1.2;




    if (player1Life <= 0) {
        
        player1.changeAnimation("palyerDead", player1Dead);
        player2.changeAnimation("player2Win",player2Victory);
        gameOver.visible = true;
        reset.visible = true;
        if(gameState === 1){
            bgSound.pause();
  gameOverS.play();
        }
        gameState = 0;

    }
    if (player2Life <= 0) {
        bgSound.pause();
        player2.changeAnimation("player2Dead", player2Dead);
        player1.changeAnimation("player1Win",player1Victory);
        gameWin.visible = true;
        reset.visible = true;
        
        if(gameState === 1){
            bgSound.pause();
            YouWin.play();
        }
        
        gameState = 0;

    }
    if (player2state === 0) {
        //  player2.width =80;  

    }

   
   if(player1.x > 2304 || player2.x > 2304){
    player1.x = 2304 / 2 - 200;
    player1.y = 660;
    player2.x = 2304 / 2 + 200;
    player2.y = 660;


   }
if(player1.x < 0 || player2.x < 0){

    player1.x = 2304 / 2 - 200;
    player1.y = 660;
    player2.x = 2304 / 2 + 200;
    player2.y = 660;

    
   }



    drawSprites();




}

   
function mouseClicked(){
    if(gameState === 0 ){
        player1.changeAnimation("playerstanding", player1Stand);
        player2.changeAnimation("player2stand", player2Stand);
         player1Life = 600;
         player2Life = 600;
        player1.x = 2304 / 2 - 200;
        player1.y = 660;
        player2.x = 2304 / 2 + 200;
        player2.y = 660;
    
    gameWin.visible = false;
    reset.visible = false;
    gameOver.visible = false;
    bgSound.play();
    gameState = 1;
    }
}
function changeNormal(){

    player2.changeAnimation("player2stand", player2Stand);
    clearInterval(myInterval);

}
