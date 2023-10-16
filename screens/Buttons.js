let redButton
let blueButton
let pinkButton
let orangeButton

function preload(){
  redButton = loadImage('img/redButton.png')
  blueButton = loadImage('img/blueButton.png')
  pinkButton = loadImage('img/pinkButton.png')
  orangeButton = loadImage('img/orangeButton.png')
  yellowRing = loadImage('img/yellowRing.png')
  bopitButton = loadImage('img/bopitButton.png')
}

function setup() {
  createCanvas(414, 896);
}

function draw() {
  background('black');

  image(redButton, 311,70)
  image(blueButton, 0,160,300, 230)
  image(pinkButton, 90,680, 150, 150)
  image(orangeButton, 258,620)
  image(yellowRing, 10,270, 400, 400)
  image(bopitButton, 12,335, 400, 270)
}
