var NUMSINES = 3; // how many of these things can we do at once?
var sines = new Array(NUMSINES); // an array to hold all the current angles
var rad; // an initial radius value for the central sine
var i; // a counter variable

// play with these to get a sense of what's going on:
var fund = 0.01; // the speed of the central sine
var ratio = .8; // what multiplier for speed is each additional sine?
var trace = false; // are we tracing?

var phrases;
whichtext = 0;

var randcol;
var secrandcol;
var thrrandcol;

var speaker = new p5.Speech();
speaker.onLoad = speechLoaded;
speaker.onEnd = speechFinished;

  
function preload(){
  phrases = loadStrings('aliceCooked.txt');
  fancyFont = loadFont('OLD.ttf');
}

function setup()
{
  createCanvas(800, 600); // OpenGL mode

  rad = height/4; // compute radius for central circle
  background(255); // clear the screen

  for (i = 0; i<sines.length; i++)
  {
    sines[i] = PI; // start EVERYBODY facing NORTH
  }
  
  speaker.setVoice('Google UK English Female');
}

function draw(){
  randcol = floor(random(255));
  secrandcol = floor(random(255));
  thrrandcol = floor(random(255));
  if (!trace) {
    background(0); // clear screen if showing geometry
    stroke(randcol,secrandcol,thrrandcol); // black pen
    noFill(); // don't fill
  } 

  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width/2, height/2); // move to middle of screen

  for (i = 0; i<sines.length; i++) // go through all the sines
  {
    var erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (trace) {
      stroke(randcol,secrandcol,thrrandcol); // rainbow
      erad = 5.0*(1.0-float(i)/sines.length); // pen width will be related to which sine
    }
    var radius = rad/(i+1); // radius for circle itself
    rotate(sines[i]); // rotate circle
    if (!trace) ellipse(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge
    if (!trace) ellipse(0, 0, 5, 5); // draw a little circle
    if (trace) ellipse(0, 0, erad, erad); // draw with erad if tracing
    pop(); // go down one level
    translate(0, radius); // move into position for next sine
    sines[i] = (sines[i]+(fund+(fund*i*ratio))); // update angle based on fundamental
    if(sines[i]>TWO_PI)
    {
      sines[i] = sines[i]%TWO_PI;
      whichtext = (whichtext+1) % phrases.length;
      speaker.speak(phrases[whichtext]);
    }
  }
  
  pop(); // pop down final transformation
  textAlign(CENTER,CENTER);
  textSize(30);
  textFont(fancyFont);
  if (phrases[whichtext] == "Time"){
    textAlign(CENTER,CENTER);
    textSize(200);
    noStroke();
    fill(255);
    text(phrases[whichtext], width/2, height/2);
    changedVoice();
  }
  text(phrases[whichtext], width/2, height/2);
  
}

function keyReleased(){
  if (key==' ') {
    trace = !trace; 
    background(255);
  }
}

function changedVoice(){
  speaker.setVoice()
}

