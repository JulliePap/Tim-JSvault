var numberButtons 	= document.getElementsByClassName("button");
var button 			= document.getElementById("numbercontainer");
var greenflash 		= document.getElementById("greenflash");
var correctCount 	= document.getElementById("correctCount");
var wrongCount 		= document.getElementById("wrongCount");
var redflash 		= document.getElementById("redflash");
var correctAudio 	= new Audio('sound/correct.mp3');
var wrongAudio 		= new Audio('sound/wrong.mp3');
var correctNumber	= 0;
var wrongNumber		= 0;
var numberCount 	= 0;
var numberValue 	= 0;
var intervalA;
var intervalB;

//Green Light flashes and stops after 3 seconds
function blinkGreen() {
  (greenflash).style.background = "Green";
  intervalA = setTimeout("setblinkGreen()", 200);
}
function setblinkGreen() {
  (greenflash).style.background = "DarkGreen";
  intervalB = setTimeout("blinkGreen()", 200);
}
//Red light flashes and stops after 3 seconds
function blinkRed() {
  (redflash).style.background = "Red";
  intervalA = setTimeout("setblinkRed()", 200);
}
function setblinkRed() {
  (redflash).style.background = "DarkRed";
  intervalB = setTimeout("blinkRed()", 200);
}
function disableButtons() {
    //used to loop through all buttons and disable them with attribute disable
    //so that it isn't possible to click more then three times
    for(i=0; i < numberButtons.length; i++) {
        numberButtons[i].setAttribute('disabled', 'disabled');
    }
}
function enableButtons() {
    //used to loop through all buttons and enable them again, remove attribute disabled
    for(i=0; i < numberButtons.length; i++) {
        numberButtons[i].removeAttribute('disabled');
    }
}
function removeText() {
	//Removes text and resets the numberCount and numberValue variables.
	numbercontainer.innerHTML = "";
	numberCount = 0;
	numberValue = 0;
}
function getNumber(button) {
	numbercontainer.innerHTML += button.value;
	numberCount++;
	numberValue += button.value;

	if (numberValue == 312)
	{
		//If the code is correct.
		correctNumber++;
		correctAudio.play();
		setTimeout(function(){ alert("The code is correct."); }, 15);
		blinkGreen();
		disableButtons();
		setTimeout(function() { clearInterval(intervalA); clearInterval(intervalB);},3000);
		setTimeout(function(){ removeText() }, 20);
		setTimeout(function(){ enableButtons() }, 3000);
		correctCount.innerHTML = "Correct = " + correctNumber;
	}
	else if (numberCount > 2)
	{
		//If the code is incorrect.
		wrongNumber++;
		wrongAudio.play();
		setTimeout(function(){ alert("The code is incorrect!"); }, 15);
		blinkRed();
		disableButtons();
		setTimeout(function() { clearInterval(intervalA); clearInterval(intervalB);},3000);
		setTimeout(function() { removeText() }, 20);
		setTimeout(function(){ enableButtons() }, 3000);
		wrongCount.innerHTML = "Wrong = " + wrongNumber;
	}
}