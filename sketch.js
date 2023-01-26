/*
I decide to attempt making multiple sinusoidal animations and experiment with different shapes by using vertex and curve vertex. 
Red, white, and black are my favourite combination of colours so I decided to go for this palette. I started first by making each sketch individually until I was pleased with it and I then incorporated them into the final sketch. 
I tried using cos and sin in many ways to create different shapes and movements. I also used previous knowledge from the first lecture about modulo and phasing to create these effects. 
*/


let input = 0;
let spacing, frequence, amplitude;

// TOP RIGHT VARIABLES
let nPoints = 360;

// BOTTOM LEFT VARIABLES
const nCircles = 20;
let nSegments = 0.1;
let increment = 0.02;
const minRadius = 10;
let circleSpacing = 0.01;

//TOP LEFT VARIABLES
let frequency;

function setup() {
	createCanvas(800, 800);

	input = 0;
	phasing = 10;
	frequency = 1.5;
	amplitude = 30;
	phase = 0;
  
    frequency = 60;
}


function draw() {
	background(0);

//////////////////////////////////////////////////////
// TOP LEFT // 
//////////////////////////////////////////////////////
	//NAME
	push();
	
	translate(width/4,height/4);
    let sinio = sin(frameCount * 0.1 + cos(frameCount * 0.003) * (amplitude*100/3));
    let dist = map(sinio,-1,1,0,1);
  
    let contaFrames = frameCount%50;
    
    let phase1 = dist + frameCount * 0.05;
    let phase2 = frameCount;
    let phase3 = frameCount * 0.05;
  
    push();
    stroke(255,90);
    noFill();
    beginShape();

    for (let input=0; input<TWO_PI; input+=0.001) 
    {
      let x1 = cos((frequency - 20) * input + phase1) - cos(frequency * input + phase1) * sin(input*80) * amplitude * 2;
      let y1 = 2 * sin(input + phase1) - sin(frequency * input + (phase1+frameCount*0.05)) * amplitude * 2;

      vertex(x1, y1);
    }
    endShape(CLOSE);
    pop();
  
    push();
    stroke(180, 0,40);
    noFill();
    beginShape();

    for (let input=0; input < TWO_PI; input+=0.001) 
    {
      let x2 = cos((frequency - 20) * input + phase2) - cos(frequency * input + phase3) * sin(input*80) * amplitude * 2;
      let y2 = 2 * sin(input + phase2) - sin(frequency * input + phase3) * amplitude * 3;

      vertex(x2, y2);
    }
    endShape(CLOSE);
    pop();
  
    pop();
  
  
//////////////////////////////////////////////////////
// BOTTOM LEFT // 
//////////////////////////////////////////////////////
	//SCRIBBLE
	push();

	translate(width / 4, 3 * height/4);
	strokeWeight(3);
	stroke(180, 0, 40);

	for (let i = 1; i < nCircles; i++) 
	{
		noFill();

		beginShape();
		for (let j = 0; j < TWO_PI; j += nSegments) 
		{
  			let xOff = map(cos(j), -1, 1, 0, 3);
  			let yOff = map(sin(j), -1, 1, 0, 2);

  			xOff += increment;
  			yOff += increment;

  			let r = map(14 % 3, 0, 1, minRadius,(i * circleSpacing)%71);

  			let x = (r * cos(xOff))%111;
  			let y = (r * sin(yOff))%111;

  			curveVertex(x, y);
		}

		endShape(CLOSE);
	}
	
	increment += 0.05;
	circleSpacing += 0.01;

	pop();

//////////////////////////////////////////////////////
// BOTTOM RIGHT // 
//////////////////////////////////////////////////////
	
	//SATURN
	push();

	let ampl;

	translate(3 * width / 4, 3 * height/4);
	ellipse(0, 0, 40, 40)
	strokeWeight(4);
	stroke(180, 0, 40);
	nLines = 30;

	beginShape(LINES);
	for (let i = 0; i < nLines; i++) 
	{
		let length = 60;
		ampl = map(sin(i / 5), -1, 1, 0.5, 1) + map(cos(i / 5), -1, 1, 0.05, 0.1);
		let x = length * sin(TWO_PI / nLines * i + input) + cos(input / 16);
		let y = -length * cos(TWO_PI / nLines * i) * cos(input / 4) * ampl;
		vertex(x, y);
	}
	
	endShape();
	pop();

//////////////////////////////////////////////////////
// TOP RIGHT // 
//////////////////////////////////////////////////////
	
	//FLOWER
	push();

	translate(3 * width / 4, height / 4);
	stroke(180, 0, 40);
	strokeWeight(3);
	noFill();

	for (let x = 0; x < width; x += spacing) 
	{
		let angle = map(x, 0, width, 0, TWO_PI);
		let y = sin(sin(frameCount%3) * frequency + input) * amplitude;
		y = (y + 21.5) % 71
		flower(x, y * 2, 30, 20);
		flower(x, y, 30, 20);
	}

	pop();

	input += 0.1;
}

function flower(points, rad, rad2, freq) {
  
	beginShape();
	for (let i = 0; i < nPoints; i++) {
		let angle = TWO_PI / nPoints * i;
		let r = rad + sin(freq * angle) * rad2;
		let y = sin(angle) * r;
		let x = cos(angle) * r;
		vertex(x, y);
	}
	endShape();
}
