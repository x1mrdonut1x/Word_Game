

var wordsArray = [];
var score = 0;
var input = "Start typing words you see!";
var speed = 0.5;
var intensity = 3;
var strings = [];
var n = 0;

function preload() {
  strings = loadStrings('strings.txt');
}

function setup(){
  createCanvas(displayWidth,720);
  wordsArray[0] = new Word(random(strings));
}

function draw(){
  background(0);

  for (var i = 0; i < wordsArray.length; i++){
    wordsArray[i].draw();
    wordsArray[i].update();
  }
  
  drawScore();
  drawInput();
  updateBoard();
  compareInput();
}


function updateBoard(){

  if (((frameCount / 60)*10) % (intensity*10) == 0){
    n++;
    wordsArray[n] = new Word(random(strings));
  }

  if (frameCount/60 % 10 == 0){
    speed += 0.3;
  }

}


function drawScore(){
    fill(255);
    textSize(18);
    text("Score: " + score, 10, 20);
}

function drawInput(){
  fill(255);
  textSize(18);
  text(input, 10, height - 20);
}

function compareInput(){

  for (var i = 0; i < wordsArray.length; i++){

    if (input == wordsArray[i].value){
      score++;
      input = "";
      n--;
      wordsArray.splice(i, 1);

    if (score % 5 == 0 && score != 0){
      if (intensity <= 0.75)
        intensity -= 0.1;
      else if (intensity < 0.4)
      {}
      else
        intensity -= 0.25;
    }
    
    } else if (wordsArray[i].x > width){
      n--;
      wordsArray.splice(i, 1);
    }

  }

}

function keyTyped(){

  if (keyCode != BACKSPACE)
    input += key;

}

function keyPressed(){

  if (input == "Start typing words you see!")
    input = "";

  if (input == " ")
    input = "";

  if (keyCode == 8)
    input = input.slice(0, -1);

  if (keyCode == 32)
    input = "";

}


function Word(val){

  this.speed = speed;
  this.x = 0;
  this.y = 50 + random(height - 100);

  this.value = val;

  this.draw = function(){
    fill(190);
    textSize(20);
    text(val, this.x, this.y);
  }

  this.update = function(){
    this.x += this.speed;
  }

}