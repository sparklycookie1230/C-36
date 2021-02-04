var ball;
var dataBase;
var position;

function setup(){
    dataBase = firebase.database();

    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";  

    var ballPosition = dataBase.ref('ball/position');
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){
    position = data.val();
    console.log(position.x);
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("Error in database.");
}

function writePosition(x,y){
    dataBase.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}