var ball;
var position;
var database;


function setup(){

    //creating database
    database = firebase.database();

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //accessing/READ the position from the database
    //.ref() - referring to the field/node in the database
    var ballPosition = database.ref('Ball/Position');

    //.on() - listener (listens to the values of that node in the database)
    //readPosition and showError are our functions
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

function readPosition(data){
    position = data.val();

    ball.x=position.x;
    ball.y=position.y;
    
}

function showError(){
    console.log("Unable to read from the database");
}

function writePosition(x,y){

    //.ref() - referring to position field
    //.set() - setting the new value in the database
    database.ref('Ball/Position').set({
        'x':position.x + x,
        'y':position.y + y
    })
    
}
