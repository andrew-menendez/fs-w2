/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
// I may need help with this concept. What's the alternative in this case?
//var playersGuess,

winningNumber=generateWinningNumber();
//playersGuess=playersGuessSubmission();
playersGuessArray=[];

guessLimit=5
/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
    x=0
    x=Math.random()
	x=Math.round(x*100)
 	return x;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	 
		var playersGuess = +$('#user_number').val();
		//alert(playersGuess);
		return playersGuess
	
};

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	distance=Math.abs(winningNumber-curGuess)
	var direction
	if(curGuess > winningNumber){
		direction="high"
	}else if (curGuess < winningNumber){
		direction="low"
	}
	return [direction,distance]
}

// The guessMessage function

function guessMessage(){
	guessData=lowerOrHigher();
	guessnum=playersGuessArray.length
	$('#stats').text('Guesses: '+guessnum+"  "+"Last Guess: "+curGuess + "  Remaining: "+(guessLimit-1));

	if (guessData[1] > 20) {
		hintString2=" You're off by more than 20"

	} else {
		hintString2=" But you're within 20!"
	}

	hintString1="Your guess was too " + guessData[0] + ";"
	
	console.log(hintString1,hintString2)

	gmes=hintString1+'\n'+hintString2
	$('#gmessage').text(gmes);
}

// Repeat Guess Check

function repeatCheck(){
	console.log(playersGuessArray)
	console.log(curGuess)
	console.log(jQuery.inArray(curGuess,playersGuessArray.slice(0,-1)))

	reps=jQuery.inArray(curGuess,playersGuessArray.slice(0,-1))

	if (reps !==-1){
		console.log("repeat guess")
		$('#gmessage').text("You've already guessed that; try again")
		guessLimit=(guessLimit+1)
		$('#stats').text('Guesses: '+guessnum+"  "+"Last Guess: "+curGuess + "  Remaining: "+(guessLimit-1));

	}
}


// Check if the Player's Guess is the winning number 

function checkGuess(){
	//console.log(curGuess,winningNumber)
	guessnum=playersGuessArray.length

	if (guessLimit==1){
		$('#instructions').text("Loser!");
		$('#stats').text('Guesses: '+guessnum+"  "+"Winning number: "+winningNumber);
		$('#gmessage').hide()
		$('#hintmessage').hide()
		$('#wheel').find('img').attr({"src": "img/trump-lose.jpg","width":300})
	} else if (curGuess==winningNumber){
	    $('#instructions').text("Winner!");
	    $('#stats').text('Guesses: '+guessnum+"  "+"Winning Guess: "+curGuess);
	    $('#gmessage').hide()
	    $('#hintmessage').hide()
	    $('#wheel').find('img').attr({"src": "img/trump.jpg","width":300})
    	changecolors('win');
		//return true
	} else {
		guessMessage();
		repeatCheck();
		$('#instructions').text("Try Again...");
		//return false

	}

}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	fact_array=factors(winningNumber)
	console.log(fact_array)
	fact_array.splice(0,1)
	fact_array.splice(-1,1)
	console.log(fact_array)

	if (fact_array.length > 1){
		$('#hintmessage').text("factors include "+fact_array)
	} else {
		$('#hintmessage').text("it's a prime number");
	}
	$('#hintmessage').show()
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber=generateWinningNumber(); 
	playersGuessArray=[]
	guessLimit=5
	$('#hintmessage').text("");
	$('#hintmessage').show();
	$('#instructions').text("Enter a number");
	$('#gmessage').text("");
	$('#gmessage').show()
	$('#wheel').find('img').attr({"src": "img/roulette.png","width":200})
	$('#stats').text("");
	changecolors('stop');
	
	console.log("new number is ",winningNumber)
}

//this is unneccessary; I was using it to debug something...
function setValue(playersGuessArray){
	curGuess=playersGuessArray[playersGuessArray.length - 1]
	return curGuess
}

function factors(num){
    ints=[]
    facts=[]
    for(i=num;i>0;i--){
	        ints.push(i)
	    }
	    //console.log(ints)
	    for (i in ints){
	        for (j in ints){
	            if (ints[i]*ints[j]==num){
	                facts.push(ints[i]);
	                //facts.push(ints[j]);
	            }
	        }
	    }
    return facts
}// End factors

// font color changer for winner

var c;

function changecolors(val) {
    if (val=='win'){
    	c=1
    	interID=setInterval(change, 1000);
    } else if (val=='stop'){
    	$('#instructions').css("color","black")

    	if(typeof interID != 'undefined'){
    	clearInterval(interID);
    	};
    }
    
}

function change() {
    if (c === 1) {
        color = "red";
        c = 2;
    } else {
        color = "blue";
        c = 1;
    }

    $('#instructions').css("color",color)
}


function submission(){

	if (guessLimit >0){
		var playersGuess=playersGuessSubmission();
	  	//console.log(playersGuess,winningNumber)
	  	$('#user_number').val("");
	  	playersGuessArray.push(playersGuess)

	  	curGuess=setValue(playersGuessArray);
	  	console.log(curGuess)

	  	checkGuess();
	  	//guessMessage();

	  	guessLimit=(guessLimit-1);

	  } else {
	  	playAgain()
	  }

	  	};




/* **** Event Listeners/Handlers ****  */


$(document).ready(function() {
  $('#submit').on('click', function(){
  	submission();

  	});

$('#hint_button').on('click', function(){
	provideHint(); 
  });

$('#playagain_button').on('click', function(){
	playAgain();
	
  });


// keydown listener 
$( "#user_number" ).keydown(function( event ) {
  if ( event.which == 13 ) {
   submission();
  }

	});
	



});

