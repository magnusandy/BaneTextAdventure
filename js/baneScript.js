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
/**
*what happens when you press enter on the console box
*/
function inputEnter(e, input)
{
	if(e.keyCode == 13)
	{
		postOutput(input);
		//alert(story.getElementsByTagName("story")[0].getElementsByTagName("none")[1].getElementsByTagName("commands")[0].childNodes[0].nodeValue);
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

function command(character, place, command)
{
	var commands = story.getElementsByTagName("story")[0].getElementsByTagName(character)[place].getElementsByTagName("commands")[0].childNodes[0].nodeValue
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
	return "command not found";
	//alert(commands[0].command)
	//command is recognized, dont move on
	//command is recongnized, move on (increment place)
	//command is not recongnized, dont move on
}