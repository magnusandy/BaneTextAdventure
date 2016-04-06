var currentPlayer = "none";
var currentPlace = 0;
var story = null;

//INITIALIZATION
var xmlhttp = new XMLHttpRequest();
var url = "js/story.xml";
xmlhttp.open("GET", url, false);
xmlhttp.send();
story = xmlhttp.responseXML;

//focus the textbox when the page loads
window.onload = function() {
  document.getElementById("consoleInput").focus();
};

/**
*what happens when you press enter on the console box
*/
function inputEnter(e, input)
{
	if(e.keyCode == 13)
	{
		postOutput(input);
		//looks up if the commmand was valid and sends proper output
		input = scrubCommands(input);
		var commandOutput = command(currentPlayer, currentPlace, input)
		postOutput(commandOutput);
		document.getElementById("consoleInput").value = "";
	}
}

function focusInput(key)
{
	var input = document.getElementById("consoleInput");
	input.value = String.fromCharCode(key.charCode);
	input.focus();
	
}

/**
* posts the given string input to the page console
*/
function postOutput(input)
{
		console = document.getElementById("consoleOutput");
		console.innerHTML = console.innerHTML + " " + input + "\n>"
		
		console.scrollTop = console.scrollHeight;
}

/**
* strips out punctuation so the scripts are easier to write,
  as well as changes all text to lower case, so a command like
  "Hi, my name is Bane" becomes "hi my name is bane"
  this makes the story.xml commands easier to write because
 there isnt a bunch of options based on punctionation and capitals.
*/
function scrubCommands(input)
{
	input = input.toLowerCase();
	input = input.replace(/'/g, '');
	input = input.replace(/\./g, '');
	input = input.replace(/\?/g, '');
	input = input.replace(/"/g, '');
	input = input.replace(/,/g, '');
	return input;
}

/**
* returns the output for the given command at a certian place in the story
* character is the current story you are playing
* place is the current part in that characters story you are in, and integer
* command is the text from the user that they are trying to attempt
*/
function command(character, place, command)
{
	//print page info if about is ever commanded
	if(command == "about")
	{
		return "this is a text based adventure of the 'bane crashing a plane' scene from the dark knight rises, it allows you to take on the role of many different characters from the beloved scene and experience it again through your fingertips";
	}
	//special case when at the start with no character picked
	if(character == "none")
	{
		//start the story as driver
		if(command == "driver")
		{
			currentPlayer = "driver";
			return "You are in a jeep, the steering wheel is before you, in the distance you see a plane \n> What would you like to do?";
		}
		//start story as cia now with game of thrones references
		if((command == "cia") || (command == "cia man") || (command == "littlefinger") || (command == "little finger") || (command == "petyr baelish"))
		{
			currentPlayer = "cia";
			return "You are standing outside, in front of a commuter plane.\n> there are Special Ops soliders with you \n> in the distance you see a jeep driving your way. \n> what would you like to do?"
		}
        if((command == "bane" )||(command == "masked man"))
        {
            currentPlayer = "bane";
            return "You are seated a moving vehicle\n>"+
            " It feels as though the vehicle is driving over rough terrain \n>"+
 "You cannot see anything,\n> from the feel of it you have a dark colored sack over your head.\n>"+
 "as well your hands are bound behind your back \n> the vehicle comes to a stop and you feel the two people beside you shift\n>"+
 "the cold barrel of a gun greets You as you are shuffled out of the vehicle\n> "+
 "From below the hood you can hear muffled voices\n> "+
 "\"Dr. Pavel, I'm CIA\" says one of the voices\n> "+
 "\"He wasn't alone\" mutters a second voice\n> "+
 "You can hear the confusion in his voice as the first man says\"Ah, you dont get to bring friends\"\n> "+
"A scared third voice breaks in \"they are not my friends\"\n>"+
"Amicably the second man continues \"dont worry, no charge for them\"\n> "+
"You are pushed from behind with the barrel of a gun, What would you like to do?\n>"
        }
	}
	//reads in the current part of the story based on your character and place, and searches through for the command you specified
	var commands = story.getElementsByTagName("story")[0].getElementsByTagName(character)[place].getElementsByTagName("commands")[0].childNodes[0].nodeValue;
	commands = JSON.parse(commands);
	for(var i = 0; i<commands.length; i++)
	{
		//check if the command is listed
		if(commands[i].command == command)
		{
			//see if command is critical
			if(commands[i].crit == "true")
			{
				currentPlace = currentPlace+1;
			}
			//game over
			if(commands[i].crit == "gameOver")
			{
				var imgLink = document.getElementById("gameOverImg");
				imgLink.href = "img/"+character+".png";
				imgLink.click();
				currentPlayer = "none";
				currentPlace = 0 ;
				return "Great job "+character+"! \n> Who would you like to play as?";
			}
			
			return commands[i].output;
		}
	}
	return "That does not seem to work";
}
