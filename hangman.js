"use strict";
/**
 * @type {array of char}
 */

var guess=[]; /**user input guesses*/
var lives=8; //num lives
var correct=0; //if a letter matches wordToGuess
var wordToGuess; //word to guess
var thisguess=[];
var bodyParts=[] //array of body parts
var nextpart = 0; //iterate through body parts array
var canvas = document.getElementById("stickman");
var context = canvas.getContext("2d");
var totalwins;
var blankSpaces="";
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var list;
var myButtons;
var letters;
/**
 *Starts a new game by resetting 
 *variables, innerHTML, and retrieving
 *a new word from DATAMUSE.API. 
 *
 *
 *@author: Destiny Rogers
 *@param {none}
 */
function newGame() {
	reset();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.responseText);
			let element = document.getElementById("newgame");
			let text = this.responseText;
			let response = JSON.parse(text);
			wordToGuess = response[Math.floor(Math.random() * response.length)].word;
			console.log(wordToGuess);

			for (var i = 0; i < wordToGuess.length; i++) {
				var x = wordToGuess.charAt(i);

				if (x === " " || x === "/'") {
					blankSpaces += x;
					thisguess.push(x);
				} else {
					blankSpaces += "_ ";
					thisguess.push("_ ");
				}
			}
			document.getElementById("newgame").innerHTML = blankSpaces;
			buttons();
		}

	}
	const url='https://api.datamuse.com/words?topics=animals';
	xmlhttp.open("GET", url);
	xmlhttp.send();
}


//COMPARE THE USER GUESS TO ACTUAL WORD
function guessletter(e){
	var keynum;

	if(window.event) { // IE
		keynum = e.keyCode;
	} else if(e.which){ // Netscape/Firefox/Opera
		keynum = e.which;
	}

	let letter = String.fromCharCode(event.keyCode);
	guess.push(letter);


	if((!wordToGuess.includes(letter))&&nextpart<8){
		lives-=1;
		bodyParts[nextpart]();
		nextpart++;
		document.getElementById("showlives").innerHTML ="Attempts left: "+lives;
	}

	if(nextpart == 8){
		document.getElementById("result").innerHTML = "No more lives!";
		document.getElementById("guessWord").disabled = true;
		document.getElementById("guessWord").setAttribute("class", " button2 disabled");
	}

	for(var i=0; i<wordToGuess.length; i++){
		if(letter == wordToGuess[i]){
			thisguess[i]=letter;	
		}
	}

	let newstring ="";
	for(i=0; i<thisguess.length; i++){
		newstring+=thisguess[i];
	}

	document.getElementById("newgame").innerHTML = newstring;
	document.getElementById("lettersGuessed").innerHTML += guess[guess.length-1];
	document.getElementById("showlives").innerHTML ="Lives remaining: "+lives;
	//buttons();
}

document.onkeypress=guessletter;

function guessWord(){
	//console.log("Word value: "+wordToGuess);
	var txt;
	var userAnswer = prompt("Please enter your guess:", "Enter Guess");
	if (userAnswer == null || userAnswer == "") {
		txt = "User cancelled the prompt.";
	} else if(userAnswer == wordToGuess){
		totalwins++;
		txt="Congratulations!";
	}else{
		txt = "Sorry " + userAnswer + " is not correct.";
	}
	document.getElementById("result").innerHTML = txt;

}

function drawCircle(x, y, r){
	context.beginPath();
	context.arc(x, y, r, 0, 2*Math.PI);
}
function drawRect (x, y, width, height, r) {
	context.beginPath()
	context.moveTo(x + r, y)
	context.lineTo(x + width - r, y)
	context.arc(x + width - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI)
	context.lineTo(x + width, y + height - r)
	context.arc(x + width - r, y + height - r, r, 2 * Math.PI, 2.5 * Math.PI)
	context.lineTo(x + r, y + height)
	context.arc(x + r, y + height - r, r, 2.5 * Math.PI, 3 * Math.PI)
	context.lineTo(x, y + r)
	context.arc(x + r, y + r, r, 3 * Math.PI, 3.5 * Math.PI)
}

/**Creating each individual body part
 * to use for when user inputs
 * incorrect letter on guess.
 *
 * @param {none}
 * @return {canvas art}
 */
var head = function(){
	context.scale(1.5, 1);
	context.fillStyle = '#999999'
	context.beginPath()
	context.arc(170 + -50, -8 + 10 + 140 - 50, 45, -0.3, Math.PI + 0.3)
	context.lineTo(130 + -50, -8 + 115 - 150 + 140 - 50)
	context.lineTo(155 + -50, -8 + 133 - 150 + 140 - 50)
	context.lineTo(185 + -50, -8 + 133 - 150 + 140 - 50)
	context.lineTo(208 + -50, -8 + 114 - 150 + 140 - 50)
	context.lineTo(213 + -50, -8 + 149 - 150 + 140 - 50)
	context.stroke()
	context.fill()

	context.fillStyle = '#FF8B93'
	drawCircle(-70 + 210 + -50, -8 + 175 - 150 + 140 - 50, 10)
	context.fill()
	drawCircle(-70 + 270 + -50, -8 + 175 - 150 + 140 - 50, 10)
	context.fill()
}

var body = function(){
	context.fillStyle = '#FFC993';
	context.strokeStyle = 'black';
	drawRect(0, 50 - 50, 190, 140, 20);
	context.stroke();
	context.fill();

	context.fillStyle = '#FF8CFD';
	drawRect(10, 60 - 50, 170, 140 - 20, 30);
	context.fill();
}

var foot1 = function(){
	drawCircle(40, 208 - 150 + 140 - 50, 13);
	context.stroke();
	context.fill();
}
var foot2 = function(){
	drawCircle(9, 208 - 150 + 140 - 50, 13);
	context.stroke();
	context.fill();
}

var foot3 = function(){
	drawCircle(160, 205 - 150 + 140 - 50, 13);
	context.stroke();
	context.fill();
}
var foot4 = function(){
	drawCircle(120, 207 - 150 + 140 - 50, 13);
	context.stroke();
	context.fill();
}
var eyes = function(){
	context.lineWidth = 5;
	context.beginPath();
	context.arc(5 + 155 + -50, -8 + 184 - 150 + 140 - 50, 10, 2 * Math.PI, 3 * Math.PI);
	context.stroke();
	context.beginPath();
	context.arc(5 + 175 + -50, -8 + 184 - 150 + 140 - 50, 10, 2 * Math.PI, 3 * Math.PI);
	context.stroke();
}

var mouth = function(){
	context.fillStyle = 'black';
	drawCircle(-70 + 260 + -50, -8 + 158 - 150 + 140 - 50, 7);
	context.fill();
	drawCircle(-70 + 220 + -50, -8 + 158 - 150 + 140 - 50, 7);
	context.fill();
}
var tail = function(){
	context.fillStyle = '#999999';
	context.lineWidth = 12;
	context.save();
	context.scale(4, 1);
	drawCircle(-8, 140 - 40, 9);
	context.restore();
	context.stroke();
	context.fill();
}

/**Adds body parts to my array for wrong 
 * letter guessed.
 */

bodyParts = [foot4, foot3, foot2, foot1, body, head, eyes, mouth];

var buttons = function () {
	myButtons = document.getElementById('buttons');
	for (var i = 0; i < alphabet.length; i++) {
		list = document.createElement('button');
		list.id = 'letter';
		list.innerHTML = alphabet[i];
         	list.setAttribute("class", "cuteButton");
		list.addEventListener("click", listcheck);
		myButtons.appendChild(list);
	}
}

function listcheck(){
	var giss =this.innerHTML;
	if((!wordToGuess.includes(giss))&&nextpart<8){
		lives-=1;
		bodyParts[nextpart]();
		nextpart++;
		document.getElementById("showlives").innerHTML ="Attempts left: "+lives;
	}
	//console.log(giss);
	this.setAttribute("class", "cuteButton disabled");
	this.disabled=true;
	for(var i=0; i<wordToGuess.length; i++){
		if(giss == wordToGuess[i]){
			thisguess[i]=giss;	
		}
	}
	let newstring ="";
	for(i=0; i<thisguess.length; i++){
		newstring+=thisguess[i];
	}
	if(nextpart == 8){
		document.getElementById("result").innerHTML = "No more lives!";
		document.getElementById("guessWord").disabled = true;
		document.getElementById("guessWord").setAttribute("class", " button2 disabled");
	}

	document.getElementById("newgame").innerHTML = newstring;
	document.getElementById("lettersGuessed").innerHTML +=giss ;
	document.getElementById("showlives").innerHTML ="Attempts left: "+lives;

}


/**
 * Reset all global variables and arrays
 * to their initial state.
 * @param {none}
 * @returns {none}
 */
function reset(){
	guess=[]; 
	lives=8; 
	correct=0; 
	thisguess=[];
	nextpart = 0;
	wordToGuess="";
	blankSpaces="";
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	// Restore the transform
	context.restore();
	document.getElementById("newgame").innerHTML = "";
	document.getElementById("guessWord").disabled = false;
	document.getElementById("lettersGuessed").innerHTML ="";
	document.getElementById("result").innerHTML = "";
	document.getElementById("showlives").innerHTML ="Lives remaining: "+lives;
	document.getElementById("guessWord").setAttribute("class", " button2");
	document.getElementById("totalwins").innerHTML = "Total Wins" + totalwins;
}
