

var wordsArray = [];
var score = 0;
var input = "";
var speed = 1;
var intensity = 5;
var strings;


function setup(){
  createCanvas(720,720);
  
  strings = loadStrings("strings.txt");
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
  compareInput();
}


function drawScore(){
    fill(255);
    text("Score: " + score, 10, 20);
}

function drawInput(){
  fill(255);
  textSize(14);
  text(input, 10, height - 20);
}

function compareInput(){

  for (var i = 0; i < wordsArray.length; i++){

    if (input == wordsArray[i].value){
      score++;
      input = "";
      wordsArray.splice(i, 1);
    }

  }

}

function keyTyped(){
  input += key;
}

function keyPressed(){

  if (keyCode == BACKSPACE)
    input = input.substr(0, input.length - 1);
  
}


function Word(val){

  this.speed = 1;
  this.x = 0;
  this.y = random(height);

  this.value = val;

  this.draw = function(){
    fill(150);
    text(val, this.x, this.y);
  }

  this.update = function(){
    this.x += this.speed;
  }

}