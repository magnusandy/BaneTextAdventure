var currentPlayer = "none";
var currentPlace = 0;
var data = '{"name": "none", "place": "0"}';
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
		input = input.toLowerCase();
		var commandOutput = command(currentPlayer, currentPlace, input)
		postOutput(commandOutput);
		document.getElementById("consoleInput").value = "";
	}
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
			return "You are driving a jeep, in the distance you see a plane \n> What would you like to do?";
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
			return commands[i].output;
		}
	}
	return "That does not seem to work";
}